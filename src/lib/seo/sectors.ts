// Sector-specific editorial content. Each sector carries its own angle, mistakes,
// tips and competitive analysis so generated pages never read as duplicate content.
import type { Sector } from './businesses'

export interface SectorContent {
  // One-line positioning used in the intro paragraph
  stakes: string
  // Why local visibility specifically matters for this sector (section 1)
  whyLocal: string[]
  // Concrete, sector-flavoured mistakes (section 2)
  mistakes: { title: string; desc: string }[]
  // Sector-tuned optimisation levers (section 3) — merged with universal levers
  levers: { title: string; desc: string }[]
  // Why competitors rank ahead (section 4)
  competitors: string[]
  // Search-intent keywords woven into copy + schema
  intents: string[]
}

const UNIVERSAL_LEVERS = [
  {
    title: 'Complétez chaque champ de votre fiche Google Business',
    desc: 'Horaires, catégorie principale et secondaires, zone de service, attributs, lien de réservation. Une fiche complète à 100 % envoie un signal de fiabilité fort à l’algorithme local de Google.',
  },
  {
    title: 'Collectez des avis récents et répondez à tous',
    desc: 'Le volume, la fréquence et la note moyenne des avis pèsent lourd dans le classement local. Répondre à chaque avis — positif comme négatif — montre à Google que la fiche est active et gérée.',
  },
  {
    title: 'Publiez des photos régulièrement',
    desc: 'Les établissements avec des photos récentes reçoivent significativement plus de demandes d’itinéraire et de clics. Ajoutez vos réalisations, votre équipe et vos locaux chaque mois.',
  },
  {
    title: 'Utilisez les posts Google Business',
    desc: 'Offres, nouveautés et événements publiés directement sur votre fiche améliorent l’engagement et gardent le profil « vivant » aux yeux de l’algorithme.',
  },
]

export const SECTORS: Record<Sector, SectorContent> = {
  restauration: {
    stakes: 'remplir sa salle et faire tourner les couverts',
    whyLocal: [
      'Plus de 80 % des clients qui choisissent où manger consultent d’abord Google Maps et les avis. Si votre fiche est incomplète ou mal notée, vous êtes éliminé avant même que le client ait goûté votre cuisine.',
      'La recherche « à proximité » domine la restauration : les requêtes du type « restaurant ouvert maintenant » explosent sur mobile. Apparaître dans le pack local de Google, c’est capter une faim immédiate et une décision en quelques secondes.',
      'Une photo de plat appétissante, un menu à jour et des horaires fiables transforment une recherche en réservation. À l’inverse, un horaire erroné un soir de service peut faire fuir un client définitivement.',
    ],
    mistakes: [
      { title: 'Menu absent ou jamais mis à jour', desc: 'Le client veut voir vos plats et vos prix avant de venir. Une fiche sans menu, ou avec une carte de l’an dernier, fait perdre des réservations chaque jour.' },
      { title: 'Photos de mauvaise qualité', desc: 'Des photos sombres prises au smartphone desservent même la meilleure cuisine. Les concurrents avec des visuels professionnels captent l’attention en premier.' },
      { title: 'Horaires non actualisés les jours fériés', desc: 'Rien ne frustre plus qu’un client devant une porte fermée alors que Google indiquait « ouvert ». Google pénalise ces incohérences.' },
      { title: 'Aucune réponse aux avis', desc: 'Ignorer les avis — surtout négatifs — signale un établissement qui ne s’occupe pas de sa réputation. Les clients le remarquent et l’algorithme aussi.' },
    ],
    levers: [
      { title: 'Activez la réservation et la commande en ligne', desc: 'Relier votre fiche à un module de réservation ou de click & collect réduit la friction et augmente le taux de conversion des visiteurs Google.' },
      { title: 'Renseignez les attributs « ambiance » et « services »', desc: 'Terrasse, accessible PMR, végétarien, livraison : ces attributs vous font remonter sur des recherches précises et qualifiées.' },
    ],
    competitors: [
      'Ils publient des photos de plats chaque semaine et répondent à 100 % des avis en moins de 24 heures.',
      'Leur fiche affiche un menu structuré, des attributs complets et un lien de réservation — Google les juge plus « utiles » pour le chercheur.',
      'Ils ont transformé chaque client satisfait en avis récent, ce qui nourrit en continu leur classement dans le pack local.',
    ],
    intents: ['restaurant', 'où manger', 'réserver une table', 'restaurant ouvert', 'meilleur restaurant'],
  },
  sante: {
    stakes: 'remplir son agenda de patients',
    whyLocal: [
      'Quand un patient cherche un praticien, il tape « dentiste près de moi » ou « médecin {ville} » et appelle l’un des trois premiers résultats. La visibilité locale détermine directement votre nombre de nouveaux patients.',
      'La confiance est décisive en santé : les avis et la complétude de la fiche rassurent un patient qui hésite. Une fiche professionnelle, à jour et bien notée convertit nettement mieux.',
      'Les recherches santé sont souvent urgentes. Être visible au bon moment, avec des horaires fiables et un numéro cliquable, c’est capter le patient avant le cabinet d’en face.',
    ],
    mistakes: [
      { title: 'Coordonnées et horaires incohérents', desc: 'Un numéro erroné ou des horaires faux font perdre des rendez-vous et nuisent à la confiance. La cohérence des informations est cruciale en santé.' },
      { title: 'Absence de prise de rendez-vous en ligne', desc: 'Sans lien de réservation (Doctolib ou autre) sur la fiche, vous obligez le patient à appeler — beaucoup abandonnent et choisissent un concurrent plus accessible.' },
      { title: 'Catégorie mal renseignée', desc: 'Une spécialité mal déclarée vous exclut des recherches pertinentes. La catégorie principale doit refléter exactement votre exercice.' },
      { title: 'Aucune gestion des avis patients', desc: 'Les avis pèsent énormément dans le choix d’un praticien. Ne pas les solliciter ni y répondre laisse le terrain aux confrères.' },
    ],
    levers: [
      { title: 'Reliez votre fiche à votre plateforme de rendez-vous', desc: 'Le bouton « Prendre rendez-vous » directement sur Google réduit les frictions et augmente fortement les prises de contact.' },
      { title: 'Précisez vos actes et services dans la description', desc: 'Détailler vos soins et spécialités vous positionne sur des recherches précises et qualifiées de patients.' },
    ],
    competitors: [
      'Ils affichent un bouton de prise de rendez-vous en ligne et un numéro cliquable — l’action est immédiate pour le patient.',
      'Leur fiche cumule des avis récents et rassurants, ce qui inspire confiance dès le premier coup d’œil.',
      'Ils ont déclaré précisément leur spécialité et leurs actes, captant des recherches que vous laissez passer.',
    ],
    intents: ['près de moi', 'prendre rendez-vous', 'spécialiste', 'urgence', 'consultation'],
  },
  beaute: {
    stakes: 'remplir son carnet de rendez-vous',
    whyLocal: [
      'Le secteur de la beauté vit du local : on choisit son salon à quelques minutes de chez soi, après avoir comparé les photos et les avis sur Google. Une fiche soignée fait toute la différence.',
      'Les visuels sont rois : avant/après, réalisations, ambiance du salon. Les établissements qui montrent leur savoir-faire en photo captent l’attention et déclenchent la réservation.',
      'La réservation en ligne est devenue un réflexe. Être visible sur Google avec un lien de prise de rendez-vous, c’est convertir l’envie en client réel.',
    ],
    mistakes: [
      { title: 'Galerie photo pauvre ou datée', desc: 'Dans la beauté, on achète d’abord avec les yeux. Sans photos de réalisations récentes, vous ne donnez aucune raison de vous choisir.' },
      { title: 'Pas de lien de réservation en ligne', desc: 'Obliger à appeler ou passer par Instagram fait perdre des clients qui veulent réserver immédiatement depuis Google.' },
      { title: 'Prestations et tarifs invisibles', desc: 'Le client veut connaître vos services et prix avant de venir. Une fiche muette envoie le client vers un concurrent plus transparent.' },
      { title: 'Avis non sollicités', desc: 'Vos clientes satisfaites sont votre meilleure publicité. Sans demande d’avis systématique, votre note stagne et vous reculez dans le classement.' },
    ],
    levers: [
      { title: 'Mettez en avant vos prestations et leurs prix', desc: 'Renseigner la liste des services avec tarifs vous fait apparaître sur des recherches précises et rassure avant la réservation.' },
      { title: 'Connectez votre logiciel de réservation', desc: 'Un bouton de prise de rendez-vous directement sur la fiche transforme les visiteurs Google en clients sans friction.' },
    ],
    competitors: [
      'Ils publient des photos avant/après chaque semaine — leur fiche donne immédiatement envie.',
      'Ils affichent un bouton de réservation en ligne et une liste de prestations claire.',
      'Ils transforment chaque cliente satisfaite en avis 5 étoiles récent, ce qui les propulse dans le pack local.',
    ],
    intents: ['près de moi', 'prendre rendez-vous', 'meilleur salon', 'pas cher', 'avis'],
  },
  batiment: {
    stakes: 'remplir son carnet de chantiers',
    whyLocal: [
      'Quand un toit fuit ou une serrure casse, le client cherche « plombier {ville} » ou « serrurier près de moi » et appelle le premier artisan crédible. La visibilité locale, c’est littéralement le téléphone qui sonne.',
      'La confiance se joue sur la fiche : photos de chantiers, avis clients et zone d’intervention claire rassurent un particulier qui va vous laisser entrer chez lui. Sans ces signaux, il passe au suivant.',
      'Beaucoup d’artisans négligent leur présence Google et comptent sur le bouche-à-oreille. Résultat : ceux qui optimisent leur fiche captent une demande qui ne les aurait jamais trouvés autrement.',
    ],
    mistakes: [
      { title: 'Aucune photo de réalisations', desc: 'Un client ne confie pas un chantier à un artisan invisible. Sans photos de vos travaux, vous n’inspirez ni confiance ni preuve de compétence.' },
      { title: 'Zone d’intervention non définie', desc: 'Si Google ne sait pas où vous intervenez, il ne vous montre pas aux bons clients. La zone de service mal réglée vous coûte des demandes.' },
      { title: 'Numéro de téléphone difficile à trouver', desc: 'Dans l’urgence, le client appelle. Un numéro absent ou non cliquable sur mobile, c’est un chantier perdu.' },
      { title: 'Peu ou pas d’avis', desc: 'Les avis sont la preuve sociale qui rassure un particulier. Sans eux, même un excellent artisan paraît risqué face à un concurrent bien noté.' },
    ],
    levers: [
      { title: 'Définissez précisément votre zone de service', desc: 'Indiquez les communes que vous couvrez : Google vous fera remonter sur les recherches de ces secteurs.' },
      { title: 'Listez vos prestations comme services', desc: 'Dépannage, rénovation, installation, urgence : détailler chaque service vous positionne sur des recherches qualifiées.' },
    ],
    competitors: [
      'Ils affichent des photos de chantiers récents — la preuve concrète de leur savoir-faire.',
      'Leur fiche précise la zone d’intervention et un numéro cliquable : le contact est immédiat.',
      'Ils accumulent les avis clients après chaque chantier, ce qui les place devant vous sur Google.',
    ],
    intents: ['près de moi', 'dépannage', 'urgence', 'devis gratuit', 'artisan'],
  },
  commerce: {
    stakes: 'attirer plus de clients en boutique',
    whyLocal: [
      'Le « repérage en ligne, achat en boutique » est devenu la norme : le client vérifie sur Google que votre magasin a ce qu’il cherche, qu’il est ouvert et bien noté, puis se déplace. Sans visibilité, il va ailleurs.',
      'Le pack local Google capte les recherches « {commerce} {ville} » et « près de moi ». Y figurer, c’est apparaître au moment exact où le client décide où aller acheter.',
      'Une fiche vivante — photos de la vitrine, des produits, des nouveautés — donne envie de pousser la porte. Les commerces qui l’animent se démarquent nettement de ceux qui la laissent à l’abandon.',
    ],
    mistakes: [
      { title: 'Vitrine et produits jamais montrés', desc: 'Sans photos de votre boutique et de vos produits, le client n’a aucune raison de se déplacer plutôt que d’acheter en ligne.' },
      { title: 'Horaires peu fiables', desc: 'Un client qui trouve porte close alors que Google annonçait « ouvert » ne reviendra pas. La fiabilité des horaires est essentielle.' },
      { title: 'Catégorie trop générique', desc: 'Une catégorie mal choisie vous noie dans la masse. Une catégorie précise vous fait remonter sur les bonnes recherches.' },
      { title: 'Aucune animation de la fiche', desc: 'Pas de posts, pas de nouveautés, pas de réponses aux avis : Google considère la fiche comme inactive et la déclasse.' },
    ],
    levers: [
      { title: 'Activez l’inventaire et les produits sur la fiche', desc: 'Mettre en avant vos produits phares vous fait apparaître sur des recherches produit précises et attire des clients prêts à acheter.' },
      { title: 'Publiez vos nouveautés et promotions', desc: 'Les posts Google sur vos arrivages et offres gardent la fiche active et donnent une raison de venir maintenant.' },
    ],
    competitors: [
      'Ils montrent leur vitrine, leurs produits et leurs nouveautés en photo — leur boutique paraît vivante et attractive.',
      'Ils publient régulièrement des posts (promotions, arrivages) qui gardent la fiche en haut du classement.',
      'Ils répondent aux avis et en sollicitent de nouveaux, ce qui renforce leur position locale semaine après semaine.',
    ],
    intents: ['près de moi', 'magasin', 'ouvert', 'acheter', 'où trouver'],
  },
  auto: {
    stakes: 'remplir son planning d’interventions',
    whyLocal: [
      'Une panne, un contrôle technique, un changement de pneus : le client cherche un professionnel « {ville} » ou « près de moi » et contacte les premiers résultats. Votre place dans le pack local détermine vos rendez-vous.',
      'La confiance est centrale dans l’automobile, où le client redoute l’arnaque. Une fiche complète, des avis rassurants et des photos de l’atelier lèvent ses doutes et déclenchent l’appel.',
      'Beaucoup de garages comptent encore sur leur enseigne physique. Ceux qui optimisent Google captent toute la demande mobile « à proximité » que les autres ignorent.',
    ],
    mistakes: [
      { title: 'Services non détaillés', desc: 'Vidange, freinage, climatisation, carrosserie : sans liste de prestations, le client ne sait pas si vous traitez son besoin et appelle ailleurs.' },
      { title: 'Atelier jamais montré', desc: 'Des photos de l’atelier et de l’équipe rassurent énormément. Leur absence laisse le client dans le doute.' },
      { title: 'Avis ignorés', desc: 'Dans un secteur où la confiance est fragile, ne pas gérer ses avis est fatal. Les concurrents bien notés raflent les rendez-vous.' },
      { title: 'Horaires et téléphone peu fiables', desc: 'Un client pressé veut appeler et venir vite. Des infos erronées le détournent immédiatement.' },
    ],
    levers: [
      { title: 'Détaillez chaque prestation en service', desc: 'Lister vos interventions vous positionne sur des recherches précises (« changement plaquettes {ville} ») et qualifiées.' },
      { title: 'Affichez vos certifications et garanties', desc: 'Agréments, marques traitées et garanties rassurent et vous différencient dans la description de la fiche.' },
    ],
    competitors: [
      'Ils détaillent toutes leurs prestations et affichent des photos de l’atelier — le client sait à quoi s’attendre.',
      'Ils cumulent les avis positifs qui lèvent la méfiance naturelle envers les garages.',
      'Leur fiche est complète et active, ce qui les place systématiquement devant vous sur Google.',
    ],
    intents: ['près de moi', 'devis', 'rendez-vous', 'pas cher', 'garage'],
  },
  services: {
    stakes: 'générer un flux régulier de nouveaux clients',
    whyLocal: [
      'Un particulier ou une entreprise qui cherche un professionnel de confiance commence sur Google : « {service} {ville} ». Votre visibilité locale conditionne directement le volume de demandes entrantes.',
      'Dans les services, la crédibilité prime. Une fiche complète, des avis solides et une présentation claire de votre expertise convertissent bien mieux qu’une simple ligne d’annuaire.',
      'Vos concurrents qui soignent leur présence Google captent des prospects qualifiés au moment précis du besoin — pendant que les autres attendent le bouche-à-oreille.',
    ],
    mistakes: [
      { title: 'Expertise mal expliquée', desc: 'Une description vague ne dit pas au client pourquoi vous choisir. Sans présentation claire de vos domaines, vous restez interchangeable.' },
      { title: 'Pas de preuve sociale', desc: 'Sans avis ni cas clients, difficile d’inspirer confiance pour un service souvent engageant. Les concurrents avec des avis gagnent le contrat.' },
      { title: 'Zone d’intervention floue', desc: 'Si Google ignore qui vous servez et où, il vous montre aux mauvaises personnes. Une zone précise améliore la qualité des contacts.' },
      { title: 'Coordonnées de contact incomplètes', desc: 'Site, téléphone, formulaire : chaque canal manquant est un prospect perdu. La fiche doit faciliter la prise de contact.' },
    ],
    levers: [
      { title: 'Décrivez précisément vos domaines d’expertise', desc: 'Détailler vos services et spécialités vous positionne sur des recherches qualifiées et démontre votre légitimité.' },
      { title: 'Ajoutez un lien de prise de contact direct', desc: 'Formulaire, prise de rendez-vous ou devis en ligne sur la fiche réduisent la friction et augmentent les conversions.' },
    ],
    competitors: [
      'Ils présentent clairement leur expertise et leurs services — le prospect comprend immédiatement leur valeur.',
      'Ils affichent des avis clients qui crédibilisent leur sérieux sur des prestations engageantes.',
      'Leur fiche complète et leurs canaux de contact facilités captent les demandes que vous laissez filer.',
    ],
    intents: ['près de moi', 'devis', 'consultation', 'expert', 'professionnel'],
  },
  sport: {
    stakes: 'remplir ses cours et fidéliser ses adhérents',
    whyLocal: [
      'On choisit sa salle ou son cours à proximité de chez soi ou du bureau. La recherche « {sport} {ville} » et « près de moi » est le premier réflexe : y être visible, c’est capter de nouveaux adhérents.',
      'L’ambiance se vend en images : photos des installations, des cours, de l’énergie du lieu. Les structures qui montrent leur atmosphère donnent envie de s’inscrire.',
      'Les avis font la décision : un futur adhérent compare les notes et les retours avant de s’engager sur un abonnement. Une bonne réputation Google remplit les cours.',
    ],
    mistakes: [
      { title: 'Installations jamais montrées', desc: 'Sans photos de la salle, des équipements et de l’ambiance, le prospect ne se projette pas et choisit un concurrent plus visuel.' },
      { title: 'Planning et tarifs absents', desc: 'Le futur adhérent veut connaître les horaires de cours et les formules avant de venir. Une fiche muette fait perdre des inscriptions.' },
      { title: 'Pas d’incitation à l’essai', desc: 'Sans lien vers une séance d’essai ou une offre découverte, vous ne convertissez pas la curiosité en visite.' },
      { title: 'Réputation non entretenue', desc: 'Les avis d’adhérents satisfaits sont décisifs. Ne pas les solliciter laisse votre note stagner face à des concurrents dynamiques.' },
    ],
    levers: [
      { title: 'Affichez votre planning et vos formules', desc: 'Renseigner les cours, horaires et abonnements répond aux questions clés et vous fait remonter sur des recherches précises.' },
      { title: 'Proposez une séance d’essai en lien direct', desc: 'Un bouton « réserver un essai » sur la fiche transforme les curieux en visiteurs, première étape vers l’abonnement.' },
    ],
    competitors: [
      'Ils publient des photos et vidéos de leurs cours qui transmettent l’énergie du lieu.',
      'Ils affichent planning, tarifs et offre d’essai — tout est clair pour décider de s’inscrire.',
      'Ils sollicitent les avis de leurs adhérents, ce qui nourrit en continu leur visibilité locale.',
    ],
    intents: ['près de moi', 'séance d’essai', 'abonnement', 'cours', 'inscription'],
  },
  hotellerie: {
    stakes: 'remplir ses chambres toute l’année',
    whyLocal: [
      'Le voyageur planifie sur Google : il compare les photos, les avis et la localisation avant de réserver. Votre visibilité sur Maps et dans la recherche locale détermine votre taux de remplissage.',
      'L’hôtellerie est ultra-concurrentielle et dépendante des avis. Une note élevée et des photos engageantes font basculer la réservation en votre faveur, même face à des prix proches.',
      'Apparaître pour « {hotellerie} {ville} » et capter le trafic en direct, c’est réduire votre dépendance aux plateformes de réservation et leurs commissions.',
    ],
    mistakes: [
      { title: 'Photos peu engageantes', desc: 'Le voyageur réserve d’abord avec les yeux. Des visuels rares ou de mauvaise qualité font préférer un établissement mieux présenté.' },
      { title: 'Avis non gérés', desc: 'Dans l’hôtellerie, les avis sont décisifs. Ne pas y répondre, surtout aux critiques, fait fuir les réservations.' },
      { title: 'Pas de lien de réservation directe', desc: 'Sans lien de réservation sur la fiche, vous renvoyez le client vers les plateformes commissionnées au lieu de réserver en direct.' },
      { title: 'Équipements et services non renseignés', desc: 'Wifi, parking, petit-déjeuner, animaux acceptés : ces attributs déterminent le choix et doivent figurer sur la fiche.' },
    ],
    levers: [
      { title: 'Renseignez tous les équipements et attributs', desc: 'Wifi, parking, climatisation, accessibilité : ces critères vous font remonter sur des recherches précises de voyageurs.' },
      { title: 'Ajoutez un lien de réservation directe', desc: 'Permettre la réservation en direct depuis Google réduit votre dépendance aux plateformes et leurs commissions.' },
    ],
    competitors: [
      'Ils soignent leurs photos et répondent à chaque avis — leur établissement inspire confiance immédiatement.',
      'Ils affichent tous leurs équipements et un lien de réservation directe.',
      'Leur réputation Google entretenue les place devant vous dans les résultats locaux et sur Maps.',
    ],
    intents: ['où dormir', 'réserver', 'près de', 'pas cher', 'avis'],
  },
  education: {
    stakes: 'remplir ses places et inspirer confiance aux familles',
    whyLocal: [
      'Les familles et clients cherchent un professionnel de confiance à proximité : « {service} {ville} ». La visibilité locale et la réputation déterminent directement le nombre de demandes que vous recevez.',
      'La confiance est primordiale, surtout quand il s’agit d’enfants ou de moments importants. Une fiche complète, des avis rassurants et une présentation claire font toute la différence.',
      'Les structures qui optimisent leur présence Google captent les familles au moment de la décision, pendant que les autres attendent passivement les recommandations.',
    ],
    mistakes: [
      { title: 'Présentation de l’activité trop vague', desc: 'Sans description claire de votre approche et de vos prestations, les familles ne savent pas pourquoi vous choisir.' },
      { title: 'Aucune preuve de qualité', desc: 'Avis, photos, références : sans ces signaux de confiance, difficile de rassurer pour un service sensible.' },
      { title: 'Coordonnées et disponibilités floues', desc: 'Les familles veulent un contact simple et des disponibilités claires. Une fiche imprécise les détourne vers un concurrent.' },
      { title: 'Réputation non entretenue', desc: 'Les avis de clients satisfaits sont votre meilleure recommandation. Ne pas les solliciter laisse votre fiche sans relief.' },
    ],
    levers: [
      { title: 'Décrivez votre approche et vos prestations', desc: 'Une présentation détaillée de votre pédagogie ou de vos services rassure et vous positionne sur des recherches précises.' },
      { title: 'Mettez en avant photos et témoignages', desc: 'Des visuels de qualité et des avis récents construisent la confiance indispensable dans votre activité.' },
    ],
    competitors: [
      'Ils présentent clairement leur approche et leurs services — les familles comprennent leur valeur immédiatement.',
      'Ils affichent des avis et des photos qui rassurent sur un sujet sensible.',
      'Leur fiche complète et entretenue les place devant vous au moment du choix.',
    ],
    intents: ['près de moi', 'avis', 'inscription', 'tarif', 'de confiance'],
  },
}

export function getLevers(sector: Sector) {
  // Sector-specific levers first, then universal ones, for a unique-but-complete section 3.
  return [...SECTORS[sector].levers, ...UNIVERSAL_LEVERS]
}
