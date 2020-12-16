# jspec

Application J'Suis Pas En Cours par **Enzo Guilmer** et **Louna Tabbara**. Dernière édition de ce README le 12/10/2020. Ce markdown peut être converti en PDF [ici](https://www.markdowntopdf.com/).

# Table of Contents

- [Règles Git](#règles-git)
  - [Messages de commit](#messages-de-commit)
  - [Branches](#branches)
- [Cahier des charges](#cahier-des-charges)
  - [Pages](#pages)
  - [Technique](#technique)
  - [Style](#style)
  - [Contraintes](#contraintes)

## Règles Git

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

|           Page           | Description                                                                                                                                                                                   |        Fonctionnalités majeures         |     Liens vers les autres pages      |
| :----------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------: | :----------------------------------: |
|       Landing page       | Redirection vers la page de Connexion ou d'Information sur le cours                                                                                                                           |               Redirection               |                  -                   |
|        Connexion         | Permet à l'utilisateur ("Élève" ou "Professeur") de se connecter. Demande un nouveau mot de passe si l'utilisateur n'est pas vérifié en base                                                  |         Connexion, redirection          |                  -                   |
| Information sur le cours | Permet à l'utilisateur ("Élève" ou "Professeur") d'avoi des informations sur son cours actuel et de pouvoir accéder au Scan ou au Stream ("Élève" / "Professeur")                             |           Affichage de texte            | Scan ou Stream, Librairie de selfies |
|           Scan           | Permet à un utilisateur "Élève" de scanner un QR Code correspondant à son cours                                                                                                               | Scan, upload de fichier, appareil photo |                Selfie                |
|          Selfie          | Permet à un utilisateur "Élève" de se prendre en photo pour valider son scan                                                                                                                  |             Appareil photo              |                 Scan                 |
|   Librairie de selfies   | Permet à l'utilisateur ("Élève" : ses selfies, "Professeur" : les selfies de tous les élèves qui ont été absents) d'accéder à un historique des selfies avec les informations correspondantes |                Affichage                |                 Scan                 |
|    Stream de QR Code     | Permet à un utilisateur "Professeur" de streamer/télécharger le QR Code correspondant à son cours                                                                                             |  Affichage, téléchargement de fichier   |                  -                   |

Toutes les pages qui comprennent un utilisateur connecté auront une barre dans le haut de l'écran avec le logo de l'application ainsi que les informations principales de l'utilisateur. Depuis cette barre, l'utilisateur pourra se déconnecter. Les liens d'une page vers une autre seront accessibles via un drawer ouvrable depuis cette même barre.

### Technique

- **Github** pour le versionnement du code
- **Ionic** comme framework mobile
- **Firebase** pour le backend et la base de données. Nous avons choisi Firebase car c'est une techno que nous avons pu approcher l'année dernière, que la documentation est bien fournie et qu'elle est simple d'utilisation. De plus, tout est gratuit pour un environnement de développement

La création d'utilisateur (élèves ou professeurs) ainsi que la récupération des cours sera externalisée et donc ne seront pas prises en compte dans le développement de cette application (pour des besoins de tests, les données seront rentrées à la main).

### Style

Doit correspondre à la charte graphique de JSEC. Voici les codes couleurs qui seront utilisés par ionic :

```
:root {
  --ion-color-primary: #ff9801;
  --ion-color-primary-rgb: 255,152,1;
  --ion-color-primary-contrast: #000000;
  --ion-color-primary-contrast-rgb: 0,0,0;
  --ion-color-primary-shade: #e08601;
  --ion-color-primary-tint: #ffa21a;

  --ion-color-secondary: #d3d3d3;
  --ion-color-secondary-rgb: 211,211,211;
  --ion-color-secondary-contrast: #000000;
  --ion-color-secondary-contrast-rgb: 0,0,0;
  --ion-color-secondary-shade: #bababa;
  --ion-color-secondary-tint: #d7d7d7;

  --ion-color-tertiary: #090909;
  --ion-color-tertiary-rgb: 9,9,9;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-contrast-rgb: 255,255,255;
  --ion-color-tertiary-shade: #080808;
  --ion-color-tertiary-tint: #222222;

  --ion-color-success: #adcf94;
  --ion-color-success-rgb: 173,207,148;
  --ion-color-success-contrast: #000000;
  --ion-color-success-contrast-rgb: 0,0,0;
  --ion-color-success-shade: #98b682;
  --ion-color-success-tint: #b5d49f;

  --ion-color-warning: #b78e47;
  --ion-color-warning-rgb: 183,142,71;
  --ion-color-warning-contrast: #000000;
  --ion-color-warning-contrast-rgb: 0,0,0;
  --ion-color-warning-shade: #a17d3e;
  --ion-color-warning-tint: #be9959;

  --ion-color-danger: #eb445a;
  --ion-color-danger-rgb: 235,68,90;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb: 255,255,255;
  --ion-color-danger-shade: #cf3c4f;
  --ion-color-danger-tint: #ed576b;

  --ion-color-dark: #222428;
  --ion-color-dark-rgb: 34,36,40;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb: 255,255,255;
  --ion-color-dark-shade: #1e2023;
  --ion-color-dark-tint: #383a3e;

  --ion-color-medium: #9e9e9e;
  --ion-color-medium-rgb: 158,158,158;
  --ion-color-medium-contrast: #000000;
  --ion-color-medium-contrast-rgb: 0,0,0;
  --ion-color-medium-shade: #8b8b8b;
  --ion-color-medium-tint: #a8a8a8;

  --ion-color-light: #ffffff;
  --ion-color-light-rgb: 255,255,255;
  --ion-color-light-contrast: #000000;
  --ion-color-light-contrast-rgb: 0,0,0;
  --ion-color-light-shade: #e0e0e0;
  --ion-color-light-tint: #ffffff;
}
```

Le logo de l'application :

![Logo JSPEC](https://raw.githubusercontent.com/NorthBlue333/jspec/main/assets/jspecsmall.png?token=AKLGDSJMGEC5D2VIWTK2KWC7RVOHY)

Il est possible de tester l'application avec le compte `louna.tabbara@ynov.com` ou `enzo.guilmer@ynov.com` et mot de passe `Test1234!`.

### Contraintes

Le projet doit être terminé avant la fin du cours de Développement mobile.
