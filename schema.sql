-- Schéma de la base D1 du jeu « Le carnet disparu »
CREATE TABLE IF NOT EXISTS equipes (
  id TEXT PRIMARY KEY,
  partie TEXT NOT NULL,
  nom TEXT NOT NULL,
  membres TEXT,
  cree_le TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reponses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  equipe_id TEXT NOT NULL,
  partie TEXT NOT NULL,
  etape INTEGER NOT NULL,
  reponse TEXT,
  statut TEXT NOT NULL,          -- juste, faux, a_noter, passee
  points INTEGER,                -- NULL tant qu'une réponse libre n'est pas notée
  indice INTEGER NOT NULL DEFAULT 0,
  solution INTEGER NOT NULL DEFAULT 0,
  manuel INTEGER NOT NULL DEFAULT 0, -- 1 si l'étape a été débloquée sans GPS
  lat REAL, lon REAL, precision_m REAL, distance_m REAL,
  cree_le TEXT NOT NULL,
  UNIQUE (equipe_id, etape)
);

CREATE TABLE IF NOT EXISTS aides (
  equipe_id TEXT NOT NULL,
  etape INTEGER NOT NULL,
  type TEXT NOT NULL,            -- indice ou solution
  cree_le TEXT NOT NULL,
  PRIMARY KEY (equipe_id, etape, type)
);

CREATE TABLE IF NOT EXISTS bonus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  equipe_id TEXT NOT NULL,
  partie TEXT NOT NULL,
  points INTEGER NOT NULL,
  motif TEXT,
  cree_le TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_equipes_partie ON equipes(partie);
CREATE INDEX IF NOT EXISTS idx_reponses_partie ON reponses(partie);
CREATE INDEX IF NOT EXISTS idx_bonus_partie ON bonus(partie);
