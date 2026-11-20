// Données du jeu « Le carnet disparu ».
// Les champs `reponse` et `explication` restent côté serveur : l'API publique les retire.
// Types de question :
//   qcm    : `choix` = liste, `reponse` = index de la bonne réponse (0 = premier choix)
//   nombre : `reponse` = valeur attendue, `tolerance` = écart accepté
//   texte  : réponse libre, notée ensuite par l'enseignant (points en attente)

export const JEU = {
  titre: "Le carnet disparu",
  sousTitre: "Art nouveau et Art déco à Nancy",
  rayon: 50, // mètres : distance pour débloquer une étape
  points: { bonne: 10, indice: 3, solution: 6 },
};

export const ETAPES = [
  // ---------------- PARTIE 1 : LE MATIN ----------------
  {
    id: 1, partie: 1, titre: "Magasins Goudchaux", adresse: "4 rue des Dominicains",
    lat: 48.692736, lon: 6.182783, photo: "img/goudchaux.jpg",
    intro: "Façade en bois de l'ébéniste Eugène Vallin, en face de l'office de tourisme. Une seule plante dessine toute la façade : fleurs et feuilles dans la frise, tiges sur les montants, racines à la base.",
    mission: "Trouvez la poignée de porte en forme de pomme de pin.",
    question: { type: "qcm", enonce: "Quelle plante inspire tout le décor de la façade ?", choix: ["La glycine", "La berce du Caucase", "Le chardon", "Le nénuphar"] },
    indice: "Une grande ombellifère aux fleurs blanches en parasol.",
    reponse: 1, explication: "C'est la berce du Caucase : la nature donne sa forme à l'architecture, des racines jusqu'aux fleurs.",
  },
  {
    id: 2, partie: 1, titre: "Pharmacie du Point Central", adresse: "35 rue Saint-Dizier",
    lat: 48.69075, lon: 6.18255, photo: "img/pharmacie.jpg",
    intro: "Pharmacie créée en 1915. Beaucoup de plantes servent à soigner : la nature est partout. C'est la seule pharmacie Art nouveau de Nancy qui a gardé son mobilier d'origine.",
    mission: "Si elle est ouverte, entrez discrètement et observez le mobilier. Cherchez la feuille de la mosaïque au sol.",
    question: { type: "qcm", enonce: "Qui a réalisé le mobilier de la pharmacie ?", choix: ["Émile Gallé", "Jacques Gruber", "Louis Majorelle", "Les frères Daum"] },
    indice: "Ébéniste et ferronnier, il a aussi une villa à son nom dans le parcours.",
    reponse: 2, explication: "Louis Majorelle, ébéniste et ferronnier. Au sol, la feuille de la mosaïque est un ginkgo.",
  },
  {
    id: 3, partie: 1, titre: "Ancien Crédit Lyonnais", adresse: "7 bis rue Saint-Georges",
    lat: 48.691088, lon: 6.183016, photo: null,
    intro: "Travaux décidés en 1907. La façade reste classique, mais à l'intérieur se cache la plus grande verrière de Jacques Gruber à Nancy : 250 m².",
    mission: "Si la banque est fermée, entrez dans le sas et regardez la verrière à travers la porte vitrée. Lisez le monogramme au centre.",
    question: { type: "qcm", enonce: "Quelles sont les deux couleurs de la verrière, celles de la banque ?", choix: ["Bleu et or", "Vert et rouge", "Jaune et mauve", "Noir et blanc"] },
    indice: "Une couleur de soleil, une couleur de lilas.",
    reponse: 2, explication: "Jaune et mauve, les couleurs du Crédit Lyonnais, autour du monogramme « CL ».",
  },
  {
    id: 4, partie: 1, titre: "Magasins Vaxelaire", adresse: "13 rue Raugraff",
    lat: 48.690118, lon: 6.181707, photo: "img/vaxelaire.jpg",
    intro: "Ce qui reste de la façade d'un grand magasin de la Belle Époque. La faune entre aussi dans le décor. Retenez un nom : Corbin, patron des Magasins Réunis et grand mécène de l'École de Nancy.",
    mission: "Cherchez l'animal du décor. Le nom de Corbin vous servira cet après-midi.",
    question: { type: "qcm", enonce: "Quel oiseau est évoqué dans le décor ?", choix: ["Le paon", "La cigogne", "Le hibou", "L'hirondelle"] },
    indice: "Il fait la roue.",
    reponse: 0, explication: "Le paon, qu'on retrouve dans d'autres bâtiments de la ville.",
  },
  {
    id: 5, partie: 1, titre: "Graineterie Génin-Louis", adresse: "2 rue Bénit",
    lat: 48.689902, lon: 6.179222, photo: "img/genin.jpg",
    intro: "Ancienne graineterie. La structure métallique est laissée apparente, ce qui a fait scandale. L'Art nouveau est un art total : même les grilles des vitrines sont décoratives.",
    mission: "Trouvez les fleurs de la frise.",
    question: { type: "qcm", enonce: "Quel insecte dessinent les grilles des vitrines ?", choix: ["Une libellule", "Une abeille", "Un papillon", "Une coccinelle"] },
    indice: "Regardez les grandes ailes symétriques.",
    reponse: 2, explication: "Un papillon. Les fleurs de la frise sont des pavots.",
  },
  {
    id: 6, partie: 1, titre: "Banque Renauld", adresse: "8 rue Saint-Jean (BNP Paribas)",
    lat: 48.690608, lon: 6.181441, photo: "img/bnp.jpg",
    intro: "Une banque dès l'origine, en 1909. Les plantes ne sont pas choisies au hasard : le ginkgo vient d'Extrême-Orient et ses feuilles virent au jaune en automne. À l'intérieur, la monnaie du pape orne le comptoir, l'escalier de Majorelle et les vitraux de Gruber.",
    mission: "Si c'est ouvert, cherchez la monnaie du pape à l'intérieur.",
    question: { type: "qcm", enonce: "Quel est le surnom du ginkgo, parfait pour une banque ?", choix: ["L'arbre aux mille écus", "L'arbre d'or", "L'arbre du trésor", "L'arbre aux sous"] },
    indice: "On parle d'une ancienne monnaie.",
    reponse: 0, explication: "L'arbre aux mille écus : acheté 40 écus pour être ramené en Europe, et ses feuilles deviennent jaunes comme l'or.",
  },
  {
    id: 7, partie: 1, titre: "Chambre de commerce", adresse: "40 rue Henri-Poincaré",
    lat: 48.69126, lon: 6.176448, photo: "img/cci.jpg",
    intro: "Construite en 1908 pour symboliser la force de l'économie lorraine. Cinq vitraux racontent cette économie : artisanat, chimie, sidérurgie, agriculture et paysage des Vosges.",
    mission: "Repérez les feuilles et les fruits sculptés sous la corniche.",
    question: { type: "qcm", enonce: "Quel arbre, symbole de force, est sculpté sous la corniche ?", choix: ["Le hêtre", "Le chêne", "Le marronnier", "Le tilleul"] },
    indice: "Cherchez les glands.",
    reponse: 1, explication: "Le chêne, avec ses feuilles et ses glands, symbole de force.",
  },
  {
    id: 8, partie: 1, titre: "Brasserie L'Excelsior", adresse: "50 rue Henri-Poincaré",
    lat: 48.690781, lon: 6.175566, photo: "img/excelsior.jpg",
    intro: "Ouverte en 1911, elle a failli disparaître dans les années 1970. Majorelle signe le mobilier, Gruber les vitraux. C'est l'époque où l'électricité se développe.",
    mission: "Comptez les pommes de pin de verre dans la marquise. Puis, à table !",
    question: { type: "qcm", enonce: "Quelle cristallerie a fourni les abat-jour et les lustres ?", choix: ["Baccarat", "Lalique", "Daum", "Saint-Louis"] },
    indice: "Une maison nancéienne, toujours active.",
    reponse: 2, explication: "La cristallerie Daum, en collaboration avec les ateliers Majorelle pour la ferronnerie des luminaires.",
  },

  // ---------------- PARTIE 2 : L'APRÈS-MIDI ----------------
  {
    id: 9, partie: 2, titre: "L'Excelsior, l'extension", adresse: "50 rue Henri-Poincaré",
    lat: 48.690781, lon: 6.175566, photo: null,
    intro: "Après le déjeuner, ouvrez l'œil : la brasserie a été agrandie. Entre l'Art nouveau et l'Art déco, les lignes courbes et végétales laissent place aux lignes droites et géométriques.",
    mission: "Prenez une photo de la partie d'origine et une de l'extension.",
    question: { type: "nombre", enonce: "En quelle année la brasserie a-t-elle été agrandie ?", tolerance: 0 },
    indice: "Une décennie après la Première Guerre mondiale.",
    reponse: 1930, explication: "1930 : l'extension appartient déjà à l'Art déco.",
  },
  {
    id: 10, partie: 2, titre: "Ancien siège de L'Est Républicain", adresse: "5 bis avenue Foch",
    lat: 48.689368, lon: 6.176573, photo: null,
    intro: "Ancien siège du journal régional, à deux pas de la gare. Une façade Art nouveau sur l'avenue Foch.",
    mission: "Observez les piliers et les ornements.",
    question: { type: "texte", enonce: "Citez trois matériaux visibles sur la façade." },
    indice: "Pierre, métal, verre, céramique, bois : regardez de près.",
    reponse: null, explication: "Réponse notée par l'enseignant.",
  },
  {
    id: 11, partie: 2, titre: "Conciergerie du parc de Saurupt", adresse: "2 rue des Brice",
    lat: 48.679939, lon: 6.181497, photo: null,
    intro: "En 1901, Jules Villard lotit le parc de son château en cité-jardin : 88 parcelles prévues, confiées à Émile André et Henri Gutton. Cette petite loge de 1902 gardait l'entrée.",
    mission: "Faites un croquis rapide : l'entrée, la loge, la rue, les premières parcelles.",
    question: { type: "qcm", enonce: "Pourquoi un gardien à l'entrée du lotissement ?", choix: ["Pour percevoir un péage", "C'était un parc privé fermé par des grilles", "Pour surveiller un chantier", "Pour accueillir les touristes"] },
    indice: "Le parc n'était pas ouvert à tous.",
    reponse: 1, explication: "Saurupt était un parc privé, avec grilles et gardien. Il a ensuite été relié au domaine public.",
  },
  {
    id: 12, partie: 2, titre: "Villa Les Glycines", adresse: "5 rue des Brice",
    lat: 48.679439, lon: 6.182145, photo: null,
    intro: "Villa en pierre de taille, avec brique et ferronnerie, construite de 1902 à 1904.",
    mission: "Photographiez un détail végétal et un détail purement fonctionnel (gouttière, grille, cheminée).",
    question: { type: "qcm", enonce: "Qui est l'architecte de la villa ?", choix: ["Lucien Weissenburger", "Émile André", "Henri Sauvage", "Charles Masson"] },
    indice: "Il a aussi dessiné la conciergerie.",
    reponse: 1, explication: "Émile André, l'un des deux architectes du lotissement.",
  },
  {
    id: 13, partie: 2, titre: "Villa Les Roches", adresse: "6 rue des Brice",
    lat: 48.678984, lon: 6.181772, photo: null,
    intro: "Juste en face des Glycines, une autre villa du même architecte, de 1904.",
    mission: "Trouvez trois points communs avec Les Glycines.",
    question: { type: "texte", enonce: "Quels sont vos trois points communs entre les deux villas ?" },
    indice: "Matériaux, toitures, ouvertures, décor.",
    reponse: null, explication: "Réponse notée par l'enseignant.",
  },
  {
    id: 14, partie: 2, titre: "Villa Marguerite", adresse: "3 rue du Colonel-Renard",
    lat: 48.678667, lon: 6.181466, photo: null,
    intro: "Œuvre de Joseph Hornecker et Henri Gutton, quatrième maison construite dans le parc. Le grand projet de cité-jardin n'a jamais été achevé.",
    mission: "Remplissez la fiche du tribunal des styles pour cette villa.",
    question: { type: "nombre", enonce: "Combien de villas ont été construites sur la centaine imaginée ?", tolerance: 0 },
    indice: "Moins de dix.",
    reponse: 6, explication: "Seulement 6 villas. Des maisons mitoyennes ont ensuite remplacé le projet.",
  },
  {
    id: 15, partie: 2, titre: "Villa Masson", adresse: "8 rue du Maréchal-Gérard",
    lat: 48.678107, lon: 6.181446, photo: null,
    intro: "Construite en 1926 par l'architecte Charles Masson. Vingt ans après les villas voisines, le style a changé.",
    mission: "Comparez avec la villa Marguerite : lignes, décor, volumes.",
    question: { type: "qcm", enonce: "Verdict du tribunal : quel est le style de cette villa ?", choix: ["Art nouveau", "Art déco", "Néo-gothique", "Haussmannien"] },
    indice: "Regardez si les lignes sont courbes ou droites.",
    reponse: 1, explication: "Art déco : géométrie, symétrie, décor stylisé.",
  },
  {
    id: 16, partie: 2, titre: "Villa Lang", adresse: "1 boulevard Georges-Clemenceau",
    lat: 48.678639, lon: 6.180391, photo: null,
    intro: "Villa construite en 1905 et 1906 pour un industriel du textile, avec un haut toit d'ardoise.",
    mission: "Bilan de Saurupt : classez les maisons vues en Art nouveau, Art déco ou mixte.",
    question: { type: "qcm", enonce: "Qui est l'architecte de la villa Lang ?", choix: ["Lucien Weissenburger", "Émile André", "Henri Gutton", "Eugène Vallin"] },
    indice: "Il a aussi travaillé sur l'Excelsior et la villa Majorelle.",
    reponse: 0, explication: "Lucien Weissenburger.",
  },
  {
    id: 17, partie: 2, titre: "Parc Sainte-Marie", adresse: "Avenue Boffrand",
    lat: 48.680556, lon: 6.170556, photo: null,
    intro: "Pause ! Ce parc a accueilli en 1909 une grande exposition qui a fait connaître Nancy dans toute l'Europe.",
    mission: "Reprenez votre souffle et vos fiches.",
    question: { type: "nombre", enonce: "En quelle année s'est tenue l'Exposition internationale de l'Est de la France ?", tolerance: 0 },
    indice: "Deux ans après les travaux du Crédit Lyonnais.",
    reponse: 1909, explication: "1909, de mai à novembre.",
  },
  {
    id: 18, partie: 2, titre: "Nancy Thermal", adresse: "41 rue du Sergent-Blandan",
    lat: 48.679005, lon: 6.168811, photo: null,
    intro: "Une source d'eau chaude a été mise en service à l'occasion de l'exposition. Le complexe thermal a été modernisé depuis.",
    mission: "Observez la façade et rendez votre verdict de style.",
    question: { type: "qcm", enonce: "À quelle occasion la source a-t-elle été inaugurée ?", choix: ["L'Exposition universelle de Paris", "L'Exposition internationale de l'Est de la France", "La création de l'École de Nancy", "La fin de la Première Guerre mondiale"] },
    indice: "Vous venez de répondre à cette question au parc.",
    reponse: 1, explication: "Pendant l'Exposition internationale de l'Est de la France, en 1909.",
  },
  {
    id: 19, partie: 2, titre: "Rue Félix-Faure", adresse: "Vers le n° 26",
    lat: 48.678197, lon: 6.165863, photo: null,
    intro: "Avec Saurupt, c'est l'autre ensemble urbain Art nouveau de Nancy : des maisons colorées pour la classe moyenne, loties de 1903 à 1913. Le n° 36 est d'Émile André.",
    mission: "Cherchez les clous à décor de ginkgo et la maison qui rappelle Saurupt.",
    question: { type: "qcm", enonce: "Qui est l'architecte et promoteur des maisons colorées des n° 24 à 30 ?", choix: ["César Pain", "Émile André", "Charles Masson", "Henri Sauvage"] },
    indice: "Son nom se mange.",
    reponse: 0, explication: "César Pain, architecte et promoteur.",
  },
  {
    id: 20, partie: 2, titre: "Musée de l'École de Nancy", adresse: "36-38 rue du Sergent-Blandan",
    lat: 48.68053, lon: 6.166169, photo: null,
    intro: "Le musée est installé dans l'ancienne demeure du mécène rencontré ce matin à l'étape 4. Dans le jardin, le portail des ateliers Gallé.",
    mission: "Si vous visitez, cherchez une œuvre de chaque artiste rencontré aujourd'hui.",
    question: { type: "qcm", enonce: "À qui appartenait cette maison ?", choix: ["Louis Majorelle", "Eugène Corbin", "Émile Gallé", "Jules Villard"] },
    indice: "Le patron des Magasins Réunis.",
    reponse: 1, explication: "Eugène Corbin, mécène de l'École de Nancy.",
  },
  {
    id: 21, partie: 2, titre: "Villa Majorelle", adresse: "1 rue Louis-Majorelle",
    lat: 48.685486, lon: 6.163878, photo: null,
    intro: "Construite de 1901 à 1902 pour Louis Majorelle, classée monument historique. Une œuvre d'art totale : architecture, céramique, ferronnerie et vitraux.",
    mission: "Trouvez un matériau, un détail d'artisanat et un geste de composition nouveau pour l'époque.",
    question: { type: "qcm", enonce: "Quel architecte parisien a conçu la villa ?", choix: ["Hector Guimard", "Henri Sauvage", "Auguste Perret", "Émile André"] },
    indice: "Il travaillait avec Lucien Weissenburger.",
    reponse: 1, explication: "Henri Sauvage, avec Lucien Weissenburger.",
  },
  {
    id: 22, partie: 2, titre: "Immeuble Lombard", adresse: "69 avenue Foch",
    lat: 48.686416, lon: 6.167916, photo: null,
    intro: "Immeuble de rapport d'Émile André pour un maître-carrier, en béton armé, 21 mètres de haut. Façade et toiture classées.",
    mission: "Comparez avec la maison voisine au n° 71.",
    question: { type: "nombre", enonce: "Combien d'étages au-dessus du rez-de-chaussée ?", tolerance: 0 },
    indice: "On note R+? sur les plans.",
    reponse: 5, explication: "R+5 : cinq étages au-dessus du rez-de-chaussée. Bravo, le carnet est complet !",
  },
];

// Textes du guide, réservés à l'espace enseignant : ce qu'on raconte devant le bâtiment.
// Les mentions « à vérifier » signalent des sources qui divergent.
export const GUIDE = {
  1: "Façade de magasin entièrement en bois, signée de l'ébéniste Eugène Vallin, autour de 1901.\n\nIdée clé : la façade est construite comme une plante, la berce du Caucase. Les fleurs et les feuilles occupent la frise haute, les tiges montent le long des montants, les racines s'étalent à la base. L'ornement n'est pas plaqué : il suit la structure.\n\nÀ montrer : la poignée de porte en pomme de pin, qui évoque un arbre. On retrouvera Vallin à l'étape 4.",
  2: "Pharmacie ouverte en 1915, à l'angle des rues Saint-Dizier et Saint-Georges. Le décor mêle Art nouveau et Art déco, à la suite de travaux en 1922.\n\nC'est la seule pharmacie Art nouveau de Nancy qui garde son mobilier d'origine, dessiné par Louis Majorelle.\n\nÀ souligner : le choix des plantes n'est pas gratuit dans une pharmacie, où les plantes soignent. Au sol, la feuille de ginkgo en mosaïque, premier ginkgo de la journée.",
  3: "Immeuble construit pour la banque en 1901 et 1902 par l'architecte Félicien César. En 1907, la banque lance des travaux intérieurs.\n\nLa façade reste classique : une banque doit rassurer. À l'intérieur, la verrière de Jacques Gruber, 250 m², la plus grande qu'il ait réalisée à Nancy, avec le monogramme CL et les couleurs jaune et mauve de l'établissement.\n\nOuverture : Gruber a aussi signé la coupole des Galeries Lafayette à Paris. Les artistes nancéiens travaillaient pour toute la France.",
  4: "Anciens magasins Vaxelaire, 1899 à 1901, par Émile André, Charles André et Eugène Vallin. Il n'en reste qu'une partie de la façade.\n\nContexte : la Belle Époque voit naître les grands magasins, où l'on trouve tout. Le décor sert aussi la publicité de l'enseigne.\n\nÀ montrer : la faune entre dans le décor avec le paon.\n\nFil rouge : Eugène Corbin, patron des Magasins Réunis, grand mécène de l'École de Nancy. Sa collection est au musée de l'École de Nancy, installé dans sa maison (étape 20).",
  5: "Ancienne graineterie Génin-Louis, vers 1900 et 1901, protégée au titre des monuments historiques. Architecte : attribution à vérifier, les sources citent Henri Gutton ou Alexandre Wellfling.\n\nIdée clé : la structure métallique rivetée est laissée apparente, ce qui a fait scandale à l'époque. L'Art nouveau ose montrer la structure moderne.\n\nÀ montrer : les grilles des vitrines en forme de papillon, les pavots de la frise, le bow-window d'angle. L'art total : même ce qui protège la vitrine est beau.",
  6: "Ancienne banque Renauld, aujourd'hui BNP Paribas, autour de 1909 et 1910. Les sources citent Émile André et Paul Charbonnier (à vérifier).\n\nIdée clé : les plantes sont choisies pour leur symbole. Le ginkgo vient d'Extrême-Orient, ses feuilles virent au jaune or à l'automne. On le surnomme l'arbre aux mille écus : parfait pour une banque.\n\nÀ l'intérieur : la monnaie du pape, plante aux disques argentés comme des pièces, sur le comptoir, la rampe d'escalier de Majorelle et les vitraux de Gruber.",
  7: "Chambre de commerce et d'industrie, 1908, pensée comme le symbole de la puissance économique lorraine.\n\nÀ montrer : sous la corniche, feuilles et glands de chêne, symbole de force.\n\nLes cinq vitraux de Jacques Gruber racontent l'économie lorraine : l'artisanat (un souffleur de verre), la chimie (Solvay et l'exploitation du sel), la sidérurgie (un mineur et les aciéries de Jarville), l'agriculture (un village lorrain) et un paysage des Vosges, réserve de ressources naturelles.",
  8: "Brasserie L'Excelsior, ouverte en 1911, architectes Alexandre Mienville et Lucien Weissenburger.\n\nLes façades sont plus géométriques que végétales, plus proches de l'Art nouveau allemand. Le décor est surtout à l'intérieur : mobilier de Majorelle, vitraux de Gruber (fougères, pins, ginkgo), luminaires Daum. L'électricité se développe : Majorelle fait la ferronnerie, Daum les abat-jour.\n\nÀ dire : elle a failli disparaître dans les années 1970, quand l'Art nouveau était passé de mode. Fin de la partie 1, déjeuner.",
  9: "L'Excelsior est agrandie en 1930. Entre les deux guerres, l'Art déco rompt avec les lignes courbes et naturalistes de l'Art nouveau : géométrie, symétrie, décor stylisé.\n\nQuestion à poser au groupe : à quoi reconnaît-on la partie d'origine et l'extension ? C'est le lancement du tribunal des styles de l'après-midi.",
  10: "Ancien siège du journal L'Est Républicain, 5 bis avenue Foch.\n\nÉtape de lecture de façade : demander aux étudiants de nommer les matériaux (pierre, métal, verre, céramique) et de dire ce qui est structurel et ce qui est décoratif.",
  11: "Parc de Saurupt. En 1901, Jules Villard lotit le parc de son château en cité-jardin : 88 parcelles de 1 200 à 2 100 m², confiées à Émile André et Henri Gutton, avec grilles de Majorelle et gardien.\n\nLa conciergerie, 1902 et 1903, agrandie ensuite par Joseph Hornecker, est inscrite pour ses façades et toitures depuis 1994. Pierre meulière, briques émaillées et boiseries peintes.\n\nLa suite : faute d'acheteurs, seules six villas sont construites. Le projet passe aux maisons mitoyennes, les rues deviennent publiques vers 1910 et les grilles sont déposées. Le château, légué à la ville, est démoli en 1936.",
  12: "Villa Les Glycines, 1902 à 1904, Émile André.\n\nÀ montrer : la variété des matériaux, pierre de taille, brique et ferronnerie. Le travail des différents corps de métiers sur une même maison est une volonté de l'École de Nancy.\n\nQuestion au groupe : où est le végétal, où est le purement fonctionnel ?",
  13: "Villa Les Roches, 6 rue des Brice, vers 1904, attribuée à Émile André (sources divergentes, à vérifier).\n\nExercice de comparaison avec Les Glycines, juste en face : matériaux, toitures, ouvertures, décor. Comment un même architecte varie-t-il son vocabulaire ?",
  14: "Villa Marguerite, 1903 à 1905, Joseph Hornecker et Henri Gutton : la quatrième maison construite dans le parc.\n\nRappel : sur la centaine de villas imaginées, six seulement ont vu le jour. Faire remplir la fiche du tribunal des styles.",
  15: "Villa Masson, 1926, par l'architecte Charles Masson, qui a construit plusieurs maisons dans le quartier (rue du Lieutenant-Crépin, rue du Général-Clinchant, villa Les Colombes).\n\nIdée clé : vingt ans après les villas voisines, l'Art déco. Comparer avec la villa Marguerite : lignes droites, symétrie, volumes simples, décor géométrique.",
  16: "Villa Lang, 1905 et 1906, par Lucien Weissenburger, pour un industriel du textile.\n\nÀ montrer : le haut toit d'ardoise.\n\nBilan de Saurupt avec le groupe : classer les maisons vues en Art nouveau, Art déco ou mixte, et dire pourquoi le lotissement a changé de nature.",
  17: "Parc Sainte-Marie. En 1909, de mai à novembre, s'y tient l'Exposition internationale de l'Est de la France, vitrine de l'industrie et des arts décoratifs lorrains.\n\nPause : faire le point sur les fiches et lancer le mini-quiz.",
  18: "Nancy Thermal. La source d'eau chaude est inaugurée pendant l'Exposition internationale de 1909.\n\nObserver la façade depuis la rue et rendre un verdict de style.",
  19: "Rue Félix-Faure, lotie surtout entre 1903 et 1913. Avec Saurupt, c'est le seul ensemble urbain Art nouveau de Nancy.\n\nL'architecte et promoteur César Pain y construit des maisons mitoyennes colorées pour la classe moyenne (n° 24 à 30, protégés depuis 1994) : brique brute et émaillée, pierre, meulière, bois, vitrail, ferronnerie. La villa Clématites porte des fresques. Le n° 36 est d'Émile André.\n\nComparer avec Saurupt : bourgeois et isolé d'un côté, mitoyen et populaire de l'autre.",
  20: "Musée de l'École de Nancy, installé dans l'ancienne demeure d'Eugène Corbin, le mécène des Magasins Réunis (fil rouge de l'étape 4).\n\nCollections : Gallé, Majorelle, Daum, Gruber, Prouvé. Dans le jardin, le portail des ateliers Gallé.\n\nFermé le lundi et le mardi (à vérifier). La visite de la villa Majorelle se réserve ici.",
  21: "Villa Majorelle, 1901 et 1902, par l'architecte parisien Henri Sauvage avec Lucien Weissenburger, pour Louis Majorelle. Classée monument historique en 1996.\n\nIdée clé : une œuvre d'art totale, architecture, céramique, ferronnerie, vitraux et mobilier pensés ensemble. La salle à manger réunit Majorelle, Alexandre Bigot pour les grès, Jacques Gruber pour les vitraux.\n\nQuestion au groupe : un matériau, un détail d'artisanat, un geste de composition nouveau pour l'époque.",
  22: "Immeuble Lombard, 69 avenue Foch, Émile André, 1902 à 1904, pour Jules Lombard, maître-carrier à Cousances-les-Forges (Meuse).\n\nUn immeuble de rapport en béton armé, 21 mètres, R+5. Façade et toiture sur rue classées monuments historiques.\n\nÀ souligner : la structure moderne derrière le décor, comme à la graineterie Génin-Louis le matin. Comparer avec la maison bourgeoise du n° 71.",
};

// Version publique, sans les réponses ni le guide
export function etapesPubliques() {
  return ETAPES.map(({ reponse, explication, ...e }) => e);
}

// Version enseignant : tout, plus le libellé de la bonne réponse
export function etapesEnseignant() {
  return ETAPES.map((e) => ({
    ...e,
    guide: GUIDE[e.id] || "",
    solution: e.question.type === "qcm" ? e.question.choix[e.reponse] : e.reponse,
  }));
}
