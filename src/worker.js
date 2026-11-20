// Cloudflare Worker : API du jeu « Le carnet disparu »
// Les fichiers du dossier public/ sont servis automatiquement (assets).
import { JEU, ETAPES, etapesPubliques, etapesEnseignant } from "./etapes.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...CORS } });
const erreur = (message, status = 400) => json({ erreur: message }, status);
const maintenant = () => new Date().toISOString();
const texte = (v, max) => String(v ?? "").trim().slice(0, max);
const partieDe = (v) => texte(v || "nancy", 40).toLowerCase().replace(/[^a-z0-9_-]/g, "") || "nancy";
const etapeParId = (id) => ETAPES.find((e) => e.id === Number(id));

function distanceM(lat1, lon1, lat2, lon2) {
  const R = 6371000, r = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * r) / 2) ** 2 +
    Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lon2 - lon1) * r) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function libelleSolution(e) {
  const q = e.question;
  if (q.type === "qcm") return q.choix[e.reponse];
  if (q.type === "nombre") return String(e.reponse);
  return null;
}

function corriger(e, brute) {
  const q = e.question;
  if (q.type === "texte") return "a_noter";
  if (q.type === "qcm") return Number(brute) === e.reponse ? "juste" : "faux";
  const n = parseFloat(String(brute).replace(",", "."));
  return Number.isFinite(n) && Math.abs(n - e.reponse) <= (q.tolerance || 0) ? "juste" : "faux";
}

async function aidesDe(db, equipe, etape) {
  const { results } = await db.prepare("SELECT type FROM aides WHERE equipe_id = ? AND etape = ?").bind(equipe, etape).all();
  return { indice: results.some((r) => r.type === "indice"), solution: results.some((r) => r.type === "solution") };
}

async function equipeExiste(db, id) {
  return db.prepare("SELECT * FROM equipes WHERE id = ?").bind(id).first();
}

async function classement(db, partie) {
  const { results } = await db.prepare(`
    SELECT e.id, e.nom, e.membres,
      COALESCE((SELECT SUM(points) FROM reponses r WHERE r.equipe_id = e.id), 0) +
      COALESCE((SELECT SUM(points) FROM bonus b WHERE b.equipe_id = e.id), 0) AS points,
      (SELECT COUNT(*) FROM reponses r WHERE r.equipe_id = e.id) AS etapes,
      (SELECT MAX(cree_le) FROM reponses r WHERE r.equipe_id = e.id) AS derniere
    FROM equipes e WHERE e.partie = ?
    ORDER BY points DESC, etapes DESC, derniere ASC`).bind(partie).all();
  return results;
}

function estAdmin(request, env, url) {
  const cle = request.headers.get("X-Admin-Key") || url.searchParams.get("cle");
  return env.ADMIN_KEY && cle && cle === env.ADMIN_KEY;
}

function csv(lignes) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return lignes.map((l) => l.map(esc).join(";")).join("\r\n");
}

async function api(request, env, url) {
  const db = env.DB;
  const chemin = url.pathname.replace(/\/+$/, "");
  const methode = request.method;
  const corps = methode === "POST" ? await request.json().catch(() => ({})) : {};

  // ---------- Public ----------
  if (chemin === "/api/jeu" && methode === "GET") {
    return json({ jeu: JEU, etapes: etapesPubliques() });
  }

  if (chemin === "/api/equipe" && methode === "POST") {
    const nom = texte(corps.nom, 40);
    if (!nom) return erreur("Donnez un nom à votre équipe.");
    const id = crypto.randomUUID();
    await db.prepare("INSERT INTO equipes (id, partie, nom, membres, cree_le) VALUES (?, ?, ?, ?, ?)")
      .bind(id, partieDe(corps.partie), nom, texte(corps.membres, 200), maintenant()).run();
    return json({ id, nom });
  }

  const mEquipe = chemin.match(/^\/api\/equipe\/([0-9a-f-]{36})$/);
  if (mEquipe && methode === "GET") {
    const eq = await equipeExiste(db, mEquipe[1]);
    if (!eq) return erreur("Équipe inconnue.", 404);
    const rep = await db.prepare("SELECT etape, statut, points, indice, solution FROM reponses WHERE equipe_id = ?").bind(eq.id).all();
    const aides = await db.prepare("SELECT etape, type FROM aides WHERE equipe_id = ?").bind(eq.id).all();
    const bonus = await db.prepare("SELECT COALESCE(SUM(points),0) AS total FROM bonus WHERE equipe_id = ?").bind(eq.id).first();
    return json({ equipe: { id: eq.id, nom: eq.nom, partie: eq.partie }, reponses: rep.results, aides: aides.results, bonus: bonus.total });
  }

  if (chemin === "/api/aide" && methode === "POST") {
    const e = etapeParId(corps.etape);
    const type = corps.type === "solution" ? "solution" : "indice";
    if (!e) return erreur("Étape inconnue.");
    if (!(await equipeExiste(db, corps.equipe))) return erreur("Équipe inconnue.", 404);
    const deja = await db.prepare("SELECT 1 FROM reponses WHERE equipe_id = ? AND etape = ?").bind(corps.equipe, e.id).first();
    if (deja) return erreur("Étape déjà validée.");
    if (type === "solution" && e.question.type === "texte") return erreur("Pas de solution pour une réponse libre.");
    await db.prepare("INSERT OR IGNORE INTO aides (equipe_id, etape, type, cree_le) VALUES (?, ?, ?, ?)")
      .bind(corps.equipe, e.id, type, maintenant()).run();
    return json(type === "indice" ? { indice: e.indice } : { solution: libelleSolution(e) });
  }

  if ((chemin === "/api/reponse" || chemin === "/api/passer") && methode === "POST") {
    const e = etapeParId(corps.etape);
    if (!e) return erreur("Étape inconnue.");
    const eq = await equipeExiste(db, corps.equipe);
    if (!eq) return erreur("Équipe inconnue.", 404);
    const aides = await aidesDe(db, eq.id, e.id);
    const passer = chemin === "/api/passer";
    const brute = passer ? "" : texte(corps.reponse, 500);
    if (!passer && brute === "") return erreur("Réponse vide.");
    const statut = passer ? "passee" : corriger(e, brute);
    const { bonne, indice, solution } = JEU.points;
    let points = null;
    if (statut !== "a_noter") {
      points = statut === "juste" ? bonne : 0;
      points = Math.max(0, points - (aides.indice ? indice : 0) - (aides.solution ? solution : 0));
    }
    const lat = Number(corps.lat), lon = Number(corps.lon);
    const aPosition = Number.isFinite(lat) && Number.isFinite(lon);
    const dist = aPosition ? Math.round(distanceM(lat, lon, e.lat, e.lon)) : null;
    const res = await db.prepare(`INSERT OR IGNORE INTO reponses
      (equipe_id, partie, etape, reponse, statut, points, indice, solution, manuel, lat, lon, precision_m, distance_m, cree_le)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(eq.id, eq.partie, e.id, e.question.type === "qcm" && !passer ? e.question.choix[Number(brute)] ?? brute : brute,
        statut, points, aides.indice ? 1 : 0, aides.solution ? 1 : 0, corps.manuel ? 1 : 0,
        aPosition ? lat : null, aPosition ? lon : null, Number(corps.precision) || null, dist, maintenant()).run();
    if (!res.meta.changes) return erreur("Cette étape a déjà été validée par votre équipe.", 409);
    return json({ statut, points, explication: e.explication, solution: libelleSolution(e) });
  }

  if (chemin === "/api/classement" && methode === "GET") {
    const lignes = await classement(db, partieDe(url.searchParams.get("partie")));
    return json(lignes.map(({ nom, points, etapes }) => ({ nom, points, etapes })));
  }

  // ---------- Enseignant ----------
  if (chemin.startsWith("/api/admin")) {
    if (!estAdmin(request, env, url)) return erreur("Clé enseignant invalide.", 401);
    const partie = partieDe(url.searchParams.get("partie") || corps.partie);

    if (chemin === "/api/admin/donnees" && methode === "GET") {
      const equipes = await classement(db, partie);
      const reponses = await db.prepare(`SELECT r.*, e.nom AS equipe FROM reponses r JOIN equipes e ON e.id = r.equipe_id
        WHERE r.partie = ? ORDER BY r.cree_le DESC`).bind(partie).all();
      const bonus = await db.prepare(`SELECT b.*, e.nom AS equipe FROM bonus b JOIN equipes e ON e.id = b.equipe_id
        WHERE b.partie = ? ORDER BY b.cree_le DESC`).bind(partie).all();
      return json({ partie, equipes, reponses: reponses.results, bonus: bonus.results,
        etapes: etapesEnseignant() });
    }

    if (chemin === "/api/admin/noter" && methode === "POST") {
      const pts = Math.max(0, Math.min(JEU.points.bonne, parseInt(corps.points, 10) || 0));
      const r = await db.prepare("UPDATE reponses SET points = ?, statut = CASE WHEN ? > 0 THEN 'juste' ELSE 'faux' END WHERE id = ?")
        .bind(pts, pts, Number(corps.id)).run();
      return r.meta.changes ? json({ ok: true, points: pts }) : erreur("Réponse introuvable.", 404);
    }

    if (chemin === "/api/admin/bonus" && methode === "POST") {
      const eq = await equipeExiste(db, corps.equipe);
      if (!eq) return erreur("Équipe inconnue.", 404);
      const pts = parseInt(corps.points, 10);
      if (!Number.isFinite(pts) || pts === 0) return erreur("Nombre de points invalide.");
      await db.prepare("INSERT INTO bonus (equipe_id, partie, points, motif, cree_le) VALUES (?, ?, ?, ?, ?)")
        .bind(eq.id, eq.partie, pts, texte(corps.motif, 120), maintenant()).run();
      return json({ ok: true });
    }

    if (chemin === "/api/admin/export.csv" && methode === "GET") {
      const { results } = await db.prepare(`SELECT e.nom, e.membres, r.etape, r.reponse, r.statut, r.points, r.indice, r.solution,
        r.manuel, r.distance_m, r.cree_le FROM reponses r JOIN equipes e ON e.id = r.equipe_id WHERE r.partie = ? ORDER BY e.nom, r.etape`)
        .bind(partie).all();
      const lignes = [["Équipe", "Membres", "Étape", "Titre", "Réponse", "Statut", "Points", "Indice", "Solution", "Sans GPS", "Distance (m)", "Date"]];
      for (const r of results) lignes.push([r.nom, r.membres, r.etape, etapeParId(r.etape)?.titre, r.reponse, r.statut, r.points,
        r.indice ? "oui" : "", r.solution ? "oui" : "", r.manuel ? "oui" : "", r.distance_m, r.cree_le]);
      return new Response("﻿" + csv(lignes), { headers: { "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="carnet-disparu-${partie}.csv"`, ...CORS } });
    }
  }

  return erreur("Route inconnue.", 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
      try {
        return await api(request, env, url);
      } catch (err) {
        return erreur("Erreur serveur : " + err.message, 500);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
