# Contribuer à Mon coin BZ-PN

Merci de vouloir contribuer ! 🙌 Toutes les contributions sont les bienvenues : ajout de lieux, corrections, code, documentation, idées.

En participant à ce projet, vous acceptez de respecter notre [Code de conduite](CODE_OF_CONDUCT.md).

## Sommaire

- [Signaler un bug ou proposer une idée](#signaler-un-bug-ou-proposer-une-idée)
- [Installer le projet](#installer-le-projet)
- [Lancer les contrôles](#lancer-les-contrôles)
- [Ajouter ou corriger un lieu](#ajouter-ou-corriger-un-lieu)
- [Proposer une Pull Request](#proposer-une-pull-request)
- [Intégration continue](#intégration-continue)
- [Conventions](#conventions)

## Signaler un bug ou proposer une idée

- **Bug** : ouvrez une issue avec le modèle « 🐛 Rapport de bug ».
- **Fonctionnalité** : ouvrez une issue avec le modèle « ✨ Demande de fonctionnalité ».
- **Nouveau lieu** sans toucher au code : utilisez le modèle « 📍 Proposer un lieu ».
- **Faille de sécurité** : ⚠️ **n'ouvrez pas d'issue publique**, suivez la [politique de sécurité](SECURITY.md).

Avant d'ouvrir une issue, vérifiez qu'elle n'existe pas déjà.

## Installer le projet

Prérequis : [Node.js](https://nodejs.org) **22 ou plus** et npm.

```bash
# 1. Forkez le dépôt sur GitHub, puis clonez votre fork
git clone https://github.com/<votre-utilisateur>/Mon-coin-BZ-PN.git
cd Mon-coin-BZ-PN

# 2. Ajoutez le dépôt d'origine comme "upstream"
git remote add upstream https://github.com/JBixx/Mon-coin-BZ-PN.git

# 3. Installez les dépendances
npm install

# 4. Lancez l'API en mode développement
npm run dev
```

L'API est disponible sur `http://localhost:3000`.

## Lancer les contrôles

Ce sont exactement les contrôles exécutés par la CI sur chaque Pull Request :

| Commande                | Rôle                                                            |
| ----------------------- | --------------------------------------------------------------- |
| `npm run lint`          | Analyse statique du code (ESLint)                               |
| `npm run format:check`  | Vérifie le formatage (Prettier)                                 |
| `npm test`              | Tests unitaires et d'intégration                                |
| `npm run test:coverage` | Tests + rapport de couverture (seuil minimum : 80 % des lignes) |
| `npm run build`         | Vérifie que l'application démarre et répond, sans avertissement |
| `npm run check`         | **Lance tous les contrôles ci-dessus d'un coup**                |

Corrections automatiques :

```bash
npm run lint:fix   # corrige ce qu'ESLint peut corriger
npm run format     # reformate le code avec Prettier
```

👉 Lancez `npm run check` avant chaque push : si ça passe chez vous, ça passera sur la CI.

## Ajouter ou corriger un lieu

1. Ajoutez le lieu dans [`src/data/places.json`](../src/data/places.json) en respectant le format existant :
   - `id` : identifiant unique en minuscules avec des tirets (ex. `chez-mama-ngouabi`)
   - `city` : `brazzaville` ou `pointe-noire`
   - `category` : une des catégories de [`src/data/constants.js`](../src/data/constants.js)
2. Vérifiez que les informations sont **exactes et vérifiables** (nom, quartier, description).
3. Pas de contenu publicitaire ni de données personnelles (numéro privé, etc.).

## Proposer une Pull Request

1. Synchronisez votre fork : `git fetch upstream && git checkout main && git merge upstream/main`
2. Créez une branche dédiée :
   ```bash
   git checkout -b feat/filtre-par-quartier   # nouvelle fonctionnalité
   git checkout -b fix/pagination             # correction de bug
   git checkout -b data/maquis-pointe-noire   # ajout de lieux
   ```
3. Faites vos modifications, **avec des tests** pour tout changement de code.
4. Lancez `npm run check`.
5. Commitez en suivant les [conventions](#conventions), puis poussez votre branche.
6. Ouvrez une Pull Request vers `main` et remplissez le modèle de PR.
7. Un mainteneur relira votre PR. Répondez aux commentaires en poussant de nouveaux commits sur la même branche.

Une PR doit rester **petite et ciblée** : un sujet par PR. Pour un changement important, ouvrez d'abord une issue pour en discuter.

## Intégration continue

Chaque Pull Request déclenche automatiquement le workflow [CI](workflows/ci.yml) sur les serveurs de GitHub :

| Job               | Vérifie                                                                     |
| ----------------- | --------------------------------------------------------------------------- |
| **Lint & Format** | ESLint et Prettier                                                          |
| **Tests**         | Tests sur Node 22 et 24, couverture envoyée à [Codecov](https://codecov.io) |
| **Build Check**   | Audit des dépendances, démarrage réel de l'API, contenu du paquet npm       |

Une PR ne peut être fusionnée que si **tous les jobs sont au vert**.

## Conventions

### Messages de commit

Nous suivons [Conventional Commits](https://www.conventionalcommits.org/fr/) :

```
<type>: <description courte à l'impératif>
```

Types courants : `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`, `data` (ajout/modification de lieux).

Exemples : `feat: ajoute le filtre par quartier`, `fix: corrige le calcul des pages`, `data: ajoute 3 maquis à Pointe-Noire`.

### Style de code

- ES modules (`import` / `export`), 2 espaces d'indentation, guillemets simples.
- Le style est imposé par ESLint et Prettier : pas besoin d'y penser, lancez `npm run format`.

Merci pour votre contribution ! 🇨🇬
