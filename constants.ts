import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: "photo-shoot",
    nomService: "Photographie Shooting UltraRéaliste",
    subtitle: "Rendu studio Hasselblad & retouches cosmétiques haute couture",
    badge: "Moteur 8K Photoréaliste",
    description: "Génération de clichés photographiques ultra-réalistes avec simulation de focale professionnelle, gestion volumétrique de la lumière dorée et retouches naturelles peau & visage.",
    optionsFormulaire: [
      {
        nom: "Image de référence",
        type: "upload",
        required: false,
        helperText: "Optionnelle. Importez un visage ou un modèle pour préserver les traits, ou laissez vide pour créer un shooting inédit."
      },
      {
        nom: "Type de prise de vue",
        type: "dropdown",
        options: [
          "Portrait Studio Beauté",
          "Mode & Haute Couture Runway",
          "Produit Joaillerie & Horlogerie de Luxe",
          "Portrait Éditorial Lifestyle",
          "Flacon & Cosmétique Haut de Gamme",
          "Architecture Minimaliste & Intérieur d'Exception"
        ],
        default: "Portrait Studio Beauté"
      },
      {
        nom: "Style de photo",
        type: "dropdown",
        options: [
          "Hasselblad H6D Medium Format (Netteté Suprême)",
          "Leica Summilux 35mm (Rendu Cinéma Chaleureux)",
          "Studio High-Key Minimaliste (Fond Blanc / Doré)",
          "Clair-Obscur Baroque & Ambiance Dramatique",
          "Noir & Blanc Argentique de Prestige (Grain Fin)"
        ],
        default: "Hasselblad H6D Medium Format (Netteté Suprême)"
      },
      {
        nom: "Éclairage",
        type: "dropdown",
        options: [
          "Heure Dorée Naturelle (Golden Hour Warm Glow)",
          "Studio 3 Points Rembrandt avec Réflecteur Or",
          "Lumière Douce Diffusée (Softbox Géante)",
          "Spotlight Dramatique & Contre-Jour Zénithal",
          "Ambiance Nuit & Reflets Dorés Miroir"
        ],
        default: "Heure Dorée Naturelle (Golden Hour Warm Glow)"
      },
      {
        nom: "Retouches",
        type: "checkbox",
        options: [
          "Texture de peau micro-pores 8K (sans effet plastique)",
          "Reflet catchlight étincelant dans le regard",
          "Teint lumineux éclat or & champagne",
          "Correction colorimétrique 16-bit",
          "Nettoyage arrière-plan sans artefacts",
          "Bokeh d'objectif professionnel f/1.4"
        ]
      },
      {
        nom: "Cadrage / Ratio",
        type: "dropdown",
        options: ["1:1 (Carré Studio)", "3:4 (Portrait Éditorial)", "4:3 (Standard Photo)", "16:9 (Cinéma Wide)", "9:16 (Story / Mobile)"],
        default: "1:1 (Carré Studio)"
      },
      {
        nom: "Qualité & Résolution",
        type: "dropdown",
        options: ["4K Master Studio (Ultra-Détaillé)", "2K Haute Définition", "1K Rapide"],
        default: "4K Master Studio (Ultra-Détaillé)"
      },
      {
        nom: "Format rendu",
        type: "dropdown",
        options: ["PNG (Sans perte maximale)", "JPEG (100% Qualité)", "WebP (Ultra-Optimisé)"],
        default: "PNG (Sans perte maximale)"
      },
      {
        nom: "Champ de description",
        type: "textarea",
        required: false,
        placeholder: "Précisez votre vision : expression faciale, tenue en soie dorée, pose élégante, ambiance florale ou minérale..."
      },
      {
        nom: "Commentaires supplémentaires",
        type: "textarea",
        placeholder: "Instructions spécifiques (ex: teinte des cheveux, fond épuré marbre noir et veinures d'or, etc.)..."
      }
    ],
    fonctionnalités: [
      "Téléchargement gratuit instantané en haute résolution",
      "Rendu photoréaliste d'une précision microscopique (8K)",
      "Retouches de teint naturelles sans altération des expressions",
      "Éclairage volumétrique doux aux tonalités dorées chaleureuses"
    ],
    examplePresets: [
      {
        title: "Portrait Haute Couture Or & Soie",
        category: "Beauté",
        badge: "Coup de Cœur",
        prompt: "Portrait studio d'une femme élégante à l'expression sereine, vêtue d'une robe en satin noir brodée de fils d'or pur. Éclairage Rembrandt chaud, bokeh velouté, texture de peau ultra-détaillée avec pores naturels visibles, reflets dorés dans le regard.",
        description: "Éclairage studio doux et détails de peau 8K ultra-précis.",
        settings: {
          "Type de prise de vue": "Portrait Studio Beauté",
          "Style de photo": "Hasselblad H6D Medium Format (Netteté Suprême)",
          "Éclairage": "Heure Dorée Naturelle (Golden Hour Warm Glow)",
          "Cadrage / Ratio": "3:4 (Portrait Éditorial)"
        }
      },
      {
        title: "Joaillerie Diamant & Or Jaune sur Marbre Noir",
        category: "Produit de Luxe",
        badge: "Commercial",
        prompt: "Photographie macro publicitaire d'un collier de haute joaillerie en or jaune 18 carats orné d'un diamant solitaire taille brillant, posé délicatement sur une dalle de marbre noir royal aux veinures dorées. Reflets cristallins précis, gouttelettes d'eau microscopiques, éclairage zénithal tamisé.",
        description: "Macro studio ultra-nette pour catalogues et bijouteries de prestige.",
        settings: {
          "Type de prise de vue": "Produit Joaillerie & Horlogerie de Luxe",
          "Style de photo": "Hasselblad H6D Medium Format (Netteté Suprême)",
          "Éclairage": "Spotlight Dramatique & Contre-Jour Zénithal",
          "Cadrage / Ratio": "1:1 (Carré Studio)"
        }
      },
      {
        title: "Flacon de Parfum Noir & Ambre Dorée",
        category: "Cosmétique",
        badge: "Publicité",
        prompt: "Flacon de parfum artisanal en cristal facetté teinté d'ambre et d'or, posé sur un socle d'obsidienne avec de subtils reflets dorés caustiques à travers le liquide précieux. Atmosphère feutrée, brume légère en arrière-plan, éclairage latéral d'exception.",
        description: "Rendu publicitaire haut de gamme avec reflets caustiques réalistes.",
        settings: {
          "Type de prise de vue": "Flacon & Cosmétique Haut de Gamme",
          "Style de photo": "Leica Summilux 35mm (Rendu Cinéma Chaleureux)",
          "Éclairage": "Ambiance Nuit & Reflets Dorés Miroir",
          "Cadrage / Ratio": "4:3 (Standard Photo)"
        }
      }
    ]
  },
  {
    id: "photoshop-pro",
    nomService: "Générateur d'Image Photoshop",
    subtitle: "Composition créative & retouche professionnelle assistée par IA",
    badge: "Moteur Créatif Multi-Calques",
    description: "Concevez ou métamorphosez vos visuels avec la précision d'un directeur artistique Photoshop : relighting de scène, ajout d'effets visuels, composition complexe et étalonnage cinématographique.",
    optionsFormulaire: [
      {
        nom: "Image de référence (optionnelle)",
        type: "upload",
        required: false,
        helperText: "Optionnelle. Importez une image existante à retoucher ou laissez vide pour générer une composition originale de zéro."
      },
      {
        nom: "Champ de description",
        type: "textarea",
        required: true,
        placeholder: "Décrivez précisément ce que vous souhaitez concevoir ou retoucher (ex: Transformer l'ambiance avec un éclairage doré dramatique, ajouter des particules lumineuses d'or et un flou de profondeur cinématique...)"
      },
      {
        nom: "Mode d'action créative",
        type: "dropdown",
        options: [
          "Retouche Complète & Étalonnage Cinéma",
          "Relighting Studio & Ambiance Dorée Lumineuse",
          "Composition & Remplacement d'Arrière-Plan",
          "Nettoyage & Restauration Haute Définition",
          "Effets Spéciaux & Particules Lumineuses"
        ],
        default: "Retouche Complète & Étalonnage Cinéma"
      },
      {
        nom: "Retouche",
        type: "checkbox",
        options: [
          "Éclairage doré dramatique (Golden Studio Rim)",
          "Flou d'arrière-plan progressif (Depth of Field Bokeh)",
          "Correction colorimétrique & balance des blancs",
          "Ajout de reflets lumineux & caustiques",
          "Grain pellicule argentique cinématique",
          "Rehaussement des contrastes et de la netteté (Micro-Contrast)"
        ]
      },
      {
        nom: "Cadrage / Ratio",
        type: "dropdown",
        options: ["1:1 (Carré Luxe)", "16:9 (Ciné Grand Format)", "4:3 (Studio Standard)", "9:16 (Story Vertical)"],
        default: "1:1 (Carré Luxe)"
      },
      {
        nom: "Format rendu",
        type: "dropdown",
        options: ["PNG (Haute Qualité)", "JPEG (Optimisé)"],
        default: "PNG (Haute Qualité)"
      },
      {
        nom: "Commentaires supplémentaires",
        type: "textarea",
        placeholder: "Détails techniques (palette de couleurs dominante, niveau de luminosité, suppression d'éléments indésirables...)"
      }
    ],
    fonctionnalités: [
      "Processus guidé simulant un pipeline Photoshop professionnel",
      "Étalonnage des couleurs et gestion des lumières or & ambre",
      "Prise en charge de la retouche d'image existante ou création ex-nihilo",
      "Exportation immédiate en haute fidélité sans compression destructive"
    ],
    examplePresets: [
      {
        title: "Relighting Or & Ombre Mystique",
        category: "Éclairage",
        badge: "Studio",
        prompt: "Sublimer le sujet avec un rétro-éclairage doré néo-classique, ajouter un halo de lumière chaude sur les contours, fond sombre en velours noir d'encre avec micro-particules dorées en lévitation.",
        description: "Transforme n'importe quel sujet avec une aura dorée spectaculaire.",
        settings: {
          "Mode d'action créative": "Relighting Studio & Ambiance Dorée Lumineuse",
          "Cadrage / Ratio": "1:1 (Carré Luxe)"
        }
      },
      {
        title: "Composition Affiche Cinéma Cyber-Luxe",
        category: "Création",
        badge: "Directeur Artistique",
        prompt: "Créer un visuel d'art contemporain représentant une silhouette architecturale futuriste aux lignes épurées en titane sombre et or brossé, baignée par un coucher de soleil ambré et une pluie de lumière scintillante. Ambiance de film de science-fiction prestigieux.",
        description: "Création artistique conceptuelle aux finitions soignées.",
        settings: {
          "Mode d'action créative": "Retouche Complète & Étalonnage Cinéma",
          "Cadrage / Ratio": "16:9 (Ciné Grand Format)"
        }
      },
      {
        title: "Retouche Cosmétique Glamour & Teint Nacré",
        category: "Retouche",
        badge: "Éditorial",
        prompt: "Retouche éditoriale de magazine de mode : unifier subtilement le teint tout en préservant le grain authentique de la peau, souligner les pommettes avec un éclat champagne doré, lisser l'arrière-plan avec un flou optique velouté.",
        description: "Retouche digne des couvertures des plus grands magazines.",
        settings: {
          "Mode d'action créative": "Nettoyage & Restauration Haute Définition",
          "Cadrage / Ratio": "1:1 (Carré Luxe)"
        }
      }
    ]
  },
  {
    id: "veo-video",
    nomService: "Générateur Vidéo VEO IA",
    subtitle: "Production vidéo cinématique animée par le moteur VEO 3.1",
    badge: "Moteur VEO 3.1 Preview",
    description: "Donnez vie à vos idées en vidéo cinématique d'une fluidité naturelle : mouvements de caméra fluides, reflets réalistes, dynamiques de particules et cadrages immersifs.",
    optionsFormulaire: [
      {
        nom: "Champ de description",
        type: "textarea",
        required: true,
        placeholder: "Décrivez la séquence vidéo : action, sujet en mouvement, décor, éclairage et sensations visuelles..."
      },
      {
        nom: "Image de référence (optionnelle)",
        type: "upload",
        required: false,
        helperText: "Optionnelle. Importez une image fixe de départ pour l'animer en vidéo ou laissez vide pour générer directement depuis le texte."
      },
      {
        nom: "Mouvement de caméra",
        type: "dropdown",
        options: [
          "Travelling avant fluide et immersif",
          "Survol drone cinématique lent",
          "Panoramique 360° autour du sujet",
          "Zoom dramatique lent avec mise au point",
          "Caméra épaule subtile & naturelle"
        ],
        default: "Travelling avant fluide et immersif"
      },
      {
        nom: "Ambiance cinématique",
        type: "dropdown",
        options: [
          "Publicité Marque de Luxe (Tonalités Noires & Dorées)",
          "Film 35mm Hollywoodien (Éclairage Chaud Anamorphique)",
          "Documentaire Nature Photoréaliste",
          "Néo-Tokyo Cyberpunk Or & Pluie Sombre",
          "Défilé Mode & Haute Couture au Ralenti"
        ],
        default: "Publicité Marque de Luxe (Tonalités Noires & Dorées)"
      },
      {
        nom: "Format / Ratio",
        type: "dropdown",
        options: ["16:9 (Cinématique Paysage)", "9:16 (Vertical TikTok / Reels)"],
        default: "16:9 (Cinématique Paysage)"
      },
      {
        nom: "Durée vidéo (secondes)",
        type: "number",
        default: 10,
        max: 10,
        helperText: "Génération optimisée en tranches fluides de 5 à 10 secondes."
      },
      {
        nom: "Qualité",
        type: "dropdown",
        options: ["HD 720p (Rendu Stable & Fluide)", "Full HD 1080p Cinéma"],
        default: "HD 720p (Rendu Stable & Fluide)"
      },
      {
        nom: "Format",
        type: "dropdown",
        options: ["MP4 (Universel & Léger)", "MOV (Master Vidéo)"],
        default: "MP4 (Universel & Léger)"
      },
      {
        nom: "Commentaires supplémentaires",
        type: "textarea",
        placeholder: "Précisions sur la météo, le rythme (ralenti x0.5), la vitesse d'action, les transitions..."
      }
    ],
    fonctionnalités: [
      "Génération vidéo propulsée par le modèle Google VEO 3.1",
      "Téléchargement direct du fichier vidéo MP4 haute clarté",
      "Prise en charge de l'animation d'une image fixe ou génération textuelle pure",
      "Suivi de progression en temps réel avec messages d'étape rassurants"
    ],
    examplePresets: [
      {
        title: "Montre de Luxe sous une Pluie Dorée",
        category: "Publicité Luxe",
        badge: "4K VEO",
        prompt: "Plan cinématique au ralenti extrême d'une montre de luxe en or brossé tournant doucement dans les airs, traversant de minuscules gouttes d'eau scintillantes et de fines particules d'or lumineuses. Éclairage studio tamisé, reflets somptueux sur le cadran en saphir.",
        description: "Séquence publicitaire au ralenti ultra-fluide avec particules.",
        settings: {
          "Mouvement de caméra": "Travelling avant fluide et immersif",
          "Ambiance cinématique": "Publicité Marque de Luxe (Tonalités Noires & Dorées)",
          "Format / Ratio": "16:9 (Cinématique Paysage)"
        }
      },
      {
        title: "Mannequin Défilé Haute Couture au Ralenti",
        category: "Mode",
        badge: "Cinéma",
        prompt: "Une mannequin avançant avec assurance sur un podium de défilé sombre bordé de lumières dorées chaleureuses. Sa robe en soie noire ondule majestueusement au ralenti avec des reflets métalliques or sous les projecteurs. Mouvement de caméra fluide qui recule devant elle.",
        description: "Dynamique d'étoffe et d'éclairage de podium réaliste.",
        settings: {
          "Mouvement de caméra": "Travelling avant fluide et immersif",
          "Ambiance cinématique": "Défilé Mode & Haute Couture au Ralenti",
          "Format / Ratio": "9:16 (Vertical TikTok / Reels)"
        }
      },
      {
        title: "Voiture de Sport dans les Rues Nocturnes",
        category: "Automobile",
        badge: "Dynamique",
        prompt: "Une supercar d'exception noire satinée glissant à vitesse maîtrisée sur un asphalte mouillé de nuit. Les réverbères dorés de la ville se reflètent sur la carrosserie aérodynamique et les jantes dorées. Prise de vue dynamique au ras du sol avec bokeh d'arrière-plan.",
        description: "Plan cinématographique urbain avec reflets de phares et pluie.",
        settings: {
          "Mouvement de caméra": "Travelling avant fluide et immersif",
          "Ambiance cinématique": "Film 35mm Hollywoodien (Éclairage Chaud Anamorphique)",
          "Format / Ratio": "16:9 (Cinématique Paysage)"
        }
      }
    ]
  }
];
