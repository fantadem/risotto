# RISOTTO
Projet IF08

VOICI UN RESUME DEROULEMENT DU PROJET
Il y'a un fichier pour chaque tâche, j'ai essayé de mettre un maximum de détails.

## Message pour P1 — Structure HTML

"Ton travail c'est de créer la page index.html. Tu vas utiliser Bootstrap 5.3 que tu intègres via CDN (cherche 'Bootstrap 5.3 CDN' sur Google, copie les deux lignes de lien dans ton <head>).
La page doit avoir :

Un header avec le titre de la recette et un emplacement pour une image
Une section 'Ingrédients' avec une <div> qui a l'attribut id="productList" — laisse-la vide
Une section 'Étapes' avec une <div> qui a l'attribut id="etapesList" — laisse-la vide
Un emplacement dans le header pour le badge Nutri-Score avec id="nutriscore-recette" — laisse-le vide
En bas de page avant </body>, trois balises script qui chargent : js/ingredients.js, js/nutriscore.js, js/etapes.js
Un lien vers style.css dans le <head>

La page doit s'afficher correctement sur mobile ET sur ordinateur grâce à Bootstrap. Inspire-toi de la maquette disponible ici : http://www.orkidees.com/IF08/tartiflette/
Tu ne touches qu'à index.html, rien d'autre. Quand c'est fini tu fais un git push et tu me préviens."

## Message pour P2 — Produits OpenFoodFacts

"Ton travail c'est de trouver les ingrédients de notre recette RISOTTO sur le site OpenFoodFacts (fr.openfoodfacts.org) et de remplir le fichier ingredients.json.
Pour chaque ingrédient :

Va sur fr.openfoodfacts.org et cherche le produit comme le riz, la crême...
Vérifie que le produit a un Nutri-Score affiché sur sa fiche — si pas de Nutri-Score, cherches-en un autre
Récupère le code-barre du produit, visible dans l'URL de la page produit
Vérifie que le produit existe bien
Il te faut au moins 5 ingrédients avec Nutri-Score.
Crée le fichier ingredients.json avec pour chaque produit : son code-barre, son nom, son nutriscore_grade (la lettre A B C D ou E) et son nutriscore_score (le chiffre).
Tu ne touches qu'à ingredients.json, rien d'autre. Quand c'est fini tu fais un git push et tu me préviens."


## Message pour P3 — JavaScript API (attend P2)

"Ton travail commence dès que P2 a livré son fichier ingredients.json. Tu travailles uniquement dans js/ingredients.js.
Ce que ton fichier doit faire, dans l'ordre :

Charger le fichier ingredients.json avec fetch()
Pour chaque produit dans ce fichier, appeler l'API OpenFoodFacts avec son code-barre pour récupérer : le nom du produit, son image, et son nutriscore_grade
Pour chaque produit récupéré, créer une carte Bootstrap (une div avec image, nom, badge Nutri-Score) et l'injecter dans la div qui a l'id="productList" dans la page
Le badge Nutri-Score est une image SVG, l'URL est : https://static.openfoodfacts.org/images/attributes/dist/nutriscore-GRADE.svg en remplaçant GRADE par la lettre du produit
Si un produit ne répond pas, afficher 'Produit non disponible' à la place

La page doit charger et afficher les ingrédients automatiquement à l'ouverture, sans que l'utilisateur ne clique sur rien.
Tu ne touches qu'à js/ingredients.js, rien d'autre. Quand c'est fini tu fais un git push"


## Message pour P4 — Nutri-Score moyen (attend P3)

"Ton travail commence dès que P3 a livré son fichier. Tu travailles uniquement dans js/nutriscore.js.
Ce que ton fichier doit faire :

Attendre que tous les produits soient chargés par le script de P3 — cherche comment utiliser un setTimeout ou un écouteur d'événement pour attendre que #productList soit rempli
Récupérer tous les scores numériques (nutriscore_score) des produits affichés
Calculer la moyenne de ces scores
Convertir cette moyenne en lettre selon les règles comme score ≤ -1 = A, ≤ 2 = B, ≤ 10 = C, ≤ 18 = D, au-delà = E
Mettre à jour l'image qui a l'id="nutriscore-recette" dans la page avec l'URL du badge SVG correspondant : https://static.openfoodfacts.org/images/attributes/dist/nutriscore-GRADE.svg

Tu ne touches qu'à js/nutriscore.js, rien d'autre. Quand c'est fini tu fais un git push"


## Pour P5 — Étapes de la recette

"Tu as deux fichiers à créer : etapes.json et js/etapes.js. Tu ne touches qu'à ces deux fichiers.
Fichier 1 — etapes.json :
Écris les étapes de notre recette au format JSON. Il faut au minimum 6 étapes. Chaque étape a un numéro et une description textuelle. Cherche 'format JSON tableau d'objets' si besoin.
Fichier 2 — js/etapes.js :
Ce script doit :

Charger etapes.json avec fetch()
Pour chaque étape, créer un élément HTML avec le numéro de l'étape et son texte
L'injecter dans la div qui a l'id="etapesList" dans la page

Inspire-toi de la maquette pour le rendu visuel : http://www.orkidees.com/IF08/tartiflette/ — les étapes apparaissent avec un cercle numéroté et un texte à côté.
Quand c'est fini tu fais un git push et tu me préviens."


## Pour P6 — CSS, tests & FTP (attend tout le monde)

"Ton travail commence en tout dernier, quand tout le monde a livré et que j'ai tout mergé. Tu travailles uniquement sur style.css.
Partie 1 — CSS :
Ouvre la page dans ton navigateur et compare-la à la maquette : http://www.orkidees.com/IF08/tartiflette/
Ajuste dans style.css : les tailles de texte, les couleurs, les marges entre les sections, l'apparence des cartes ingrédients et des étapes. tu affines les détails visuels.
Partie 2 — Tests responsive :
Assurer que le site utilisable en mode mobile Vérifie que rien ne déborde, que tout est lisible. Corrige ce qui cloche dans style.css.
Partie 3 — Dépôt FTP :
Télécharge FileZilla (filezilla-project.org). Configure un nouveau site avec les bons paramètres FTP. Dépose ces 4 fichiers sur le serveur : index.html, style.css, ingredients.json, etapes.json et le dossier js/ complet. Vérifie ensuite que le site s'affiche bien en ligne.

