# jspec

Application J'Suis Pas En Cours

## Règles git

**Messages de commit :**

- `feat: message explicite` pour les features
- `fix: message explicite` pour les fix
- `refacto: message explicite` pour les refactorisations de code
- `chore: message explicite` pour les corvées (tâches à faire qui ne sont pas des features, ex: changer la taille d'un bouton)
- `docs: message explicite` pour les docs

Toutes ces mentions peuvent être précédées de la lettre `w` pour `WIP (Work In Progress - en cours)`. Le message de commit doit être composé ainsi : `verbe complément` comme `add button on page`

**Branches :**
Le développement principal se réalise sur la branche `develop`, puis est merge sur la branche `main` lorsque les tests d'acceptation sont réalisés. Le développement est séparé sur plusieurs branches partant de `develop` nommées comme ceci :

- `feat/nom-de-la-feature` pour les features
- `fix/nom-du-fix` pour les fix
- `refacto/nom-du-refacto` pour les refactorisations de code
- `chore/nom-de-la-chore` pour les corvées (tâches à faire qui ne sont pas des features, ex: changer la taille d'un bouton)

Les docs seront push directement sur `main` ou les branches correspondantes lors de leur développement.

## Cahier des charges

L'application J'Suis Pas En Cours permettra de scanner (par l'appareil photo ou en uploadant le fichier) un QR Code fixe envoyé par message privé en dehors de l'application et ensuite de prendre un selfie de soi (dans un endoit autre que la salle de cours) afin de signaler que nous ne sommes pas en cours.

### Pages

| Page | Description | Fonctionnalités majeures | Liens vers les autres pages |
|:-:|-|:-:|:-:|
| Landing page | Redirection vers la page de Connexion ou de Scan | Redirection | - |
| Connexion | Permet à l'utilisateur de se connecter. Demande un nouveau mot de passe si l'utilisateur n'est pas vérifié en base | Connexion, redirection | - |
| Scan | Permet à un utilisateur "Élève" de scanner un QR Code correspondant à son cours | Scan, upload de fichier, appareil photo | Selfie, Librairie de selfies |
| Selfie | Permet à un utilisateur "Élève" de se prendre en photo pour valider son scan | Appareil photo | Scan |
| Librairie de selfies | Historique des selfies avec les informations correspondantes | Affichage | Scan |
| Stream de QR Code | Permet à un utilisateur "Professeur" de streamer/télécharger le QR Code correspondant à son cours | Affichage, téléchargement de fichier | - |

### Technique

* **Github** pour le versionnement du code
* **Ionic** comme framework mobile
* **Firebase** pour le backend et la base de données

La création d'utilisateur ainsi que la récupération des cours sera externalisée (donc pas prise en compte dans le développement de cette application)

### Style

Doit correspondre à la charte graphique de JSEC.

### Contraintes

Le projet doit être terminé avant la fin du cours de Développement mobile.
