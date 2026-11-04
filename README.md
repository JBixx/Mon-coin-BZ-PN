# 🇨🇬 Mon coin BZ-PN

> L'API open source qui regroupe les meilleurs coins de **Brazzaville** et **Pointe-Noire**.

[![CI](https://github.com/JBixx/Mon-coin-BZ-PN/actions/workflows/ci.yml/badge.svg)](https://github.com/JBixx/Mon-coin-BZ-PN/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
[![PRs Welcome](https://img.shields.io/badge/PRs-bienvenues-brightgreen.svg)](CONTRIBUTING.md)

Restaurants, maquis, plages, lieux de culture, marchés, coins nature… **Mon coin BZ-PN** centralise les bonnes adresses des deux plus grandes villes du Congo-Brazzaville et les expose via une API REST simple, pour que n'importe qui puisse construire une appli, un site ou un bot par-dessus.

Le projet est communautaire : **chacun peut proposer ses coins** via une Pull Request.

---

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Démarrage rapide](#démarrage-rapide)
- [Endpoints](#endpoints)
- [Modèle de données](#modèle-de-données)
- [Structure du projet](#structure-du-projet)
- [Roadmap](#roadmap)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Fonctionnalités

- 📍 Liste des lieux de Brazzaville et Pointe-Noire
- 🔎 Filtres par ville, catégorie, tag et recherche plein texte (insensible aux accents)
- 📄 Pagination
- ✍️ CRUD complet (création, modification, suppression)
- ✅ Validation des données avec [Zod](https://zod.dev)
- 🛡️ En-têtes de sécurité (Helmet) et CORS activé

## Stack technique

| Outil | Rôle |
| --- | --- |
| [Node.js](https://nodejs.org) ≥ 20 | Runtime |
| [Express 5](https://expressjs.com) | Framework HTTP |
| [Zod](https://zod.dev) | Validation |
| [Helmet](https://helmetjs.github.io) / [CORS](https://github.com/expressjs/cors) / [Morgan](https://github.com/expressjs/morgan) | Sécurité, CORS, logs |
| `node:test` + [Supertest](https://github.com/ladjs/supertest) | Tests |

## Démarrage rapide

```bash
# 1. Cloner le dépôt
git clone https://github.com/JBixx/Mon-coin-BZ-PN.git
cd Mon-coin-BZ-PN

# 2. Installer les dépendances
npm install

# 3. (optionnel) Configurer l'environnement
cp .env.example .env

# 4. Lancer en mode développement (rechargement automatique)
npm run dev
```

L'API est disponible sur `http://localhost:3000`.

| Script | Description |
| --- | --- |
| `npm start` | Lance le serveur |
| `npm run dev` | Lance le serveur avec rechargement automatique |
| `npm test` | Lance les tests |

## Endpoints

Base URL : `/api/v1`

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/health` | État du serveur |
| `GET` | `/api/v1/cities` | Liste des villes |
| `GET` | `/api/v1/categories` | Liste des catégories |
| `GET` | `/api/v1/places` | Liste des lieux (filtrable) |
| `GET` | `/api/v1/places/:id` | Détail d'un lieu |
| `POST` | `/api/v1/places` | Ajouter un lieu |
| `PATCH` | `/api/v1/places/:id` | Modifier un lieu |
| `DELETE` | `/api/v1/places/:id` | Supprimer un lieu |

### Paramètres de `GET /api/v1/places`

| Paramètre | Exemple | Description |
| --- | --- | --- |
| `city` | `brazzaville`, `pointe-noire` | Filtrer par ville |
| `category` | `plage` | Filtrer par catégorie (voir `/categories`) |
| `tag` | `coucher de soleil` | Filtrer par tag |
| `q` | `cote sauvage` | Recherche texte (nom, description, quartier, tags) |
| `page` | `1` | Numéro de page (défaut : 1) |
| `limit` | `20` | Résultats par page (défaut : 20, max : 100) |

### Exemples

```bash
# Tous les coins nature de Pointe-Noire
curl "http://localhost:3000/api/v1/places?city=pointe-noire&category=nature"

# Ajouter un lieu
curl -X POST http://localhost:3000/api/v1/places \
  -H "Content-Type: application/json" \
  -d '{"name":"Mon maquis préféré","city":"brazzaville","category":"maquis","neighborhood":"Moungali"}'
```

Réponse type :

```json
{
  "data": [
    {
      "id": "gorges-de-diosso",
      "name": "Gorges de Diosso",
      "city": "pointe-noire",
      "category": "nature",
      "neighborhood": "Diosso (environs)",
      "description": "Cirque naturel aux falaises rouges, à une courte distance de Pointe-Noire.",
      "tags": ["paysage", "excursion"]
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 20, "pages": 1 }
}
```

Les erreurs ont la forme `{ "error": "message", "details": [...] }` avec le code HTTP adapté (`400`, `404`, `500`).

## Modèle de données

| Champ | Type | Obligatoire | Description |
| --- | --- | --- | --- |
| `id` | string | auto | Identifiant unique |
| `name` | string | ✅ | Nom du lieu |
| `city` | `brazzaville` \| `pointe-noire` | ✅ | Ville |
| `category` | string | ✅ | `restaurant`, `maquis`, `bar`, `hotel`, `plage`, `nature`, `culture`, `marche`, `loisirs` |
| `neighborhood` | string | | Quartier / arrondissement |
| `description` | string | | Description courte |
| `address` | string | | Adresse |
| `phone` | string | | Téléphone |
| `website` | URL | | Site web |
| `priceRange` | `$` \| `$$` \| `$$$` | | Gamme de prix |
| `coordinates` | `{ lat, lng }` | | Coordonnées GPS |
| `tags` | string[] | | Mots-clés |
| `createdAt` / `updatedAt` | ISO date | auto | Horodatage |

## Structure du projet

```
Mon-coin-BZ-PN/
├── src/
│   ├── app.js                 # Configuration Express
│   ├── server.js              # Point d'entrée
│   ├── controllers/           # Logique des routes
│   ├── data/
│   │   ├── constants.js       # Villes et catégories
│   │   ├── places.json        # Données des lieux (à enrichir !)
│   │   └── store.js           # Accès aux données (en mémoire)
│   ├── middlewares/           # Gestion d'erreurs, validation
│   ├── routes/                # Définition des routes
│   └── validators/            # Schémas Zod
├── tests/                     # Tests d'intégration
└── .github/workflows/ci.yml   # Intégration continue
```

> ℹ️ Pour l'instant les données sont stockées **en mémoire** à partir de `places.json` : les ajouts via l'API sont perdus au redémarrage. Pour ajouter un lieu de façon permanente, modifiez `places.json` et ouvrez une PR.

## Roadmap

- [ ] Base de données persistante (PostgreSQL / MongoDB)
- [ ] Authentification pour les opérations d'écriture
- [ ] Avis et notes des utilisateurs
- [ ] Photos des lieux
- [ ] Recherche par proximité (géolocalisation)
- [ ] Documentation OpenAPI / Swagger
- [ ] Rate limiting
- [ ] Déploiement public de l'API

Une idée ? [Ouvrez une issue](https://github.com/JBixx/Mon-coin-BZ-PN/issues) !

## Contribuer

Les contributions sont les bienvenues, qu'il s'agisse d'**ajouter vos coins préférés**, de corriger une info ou d'améliorer le code. Lisez le [guide de contribution](CONTRIBUTING.md) pour démarrer.

1. Forkez le projet
2. Créez votre branche (`git checkout -b feat/ma-fonctionnalite`)
3. Commitez (`git commit -m "feat: ajoute ma fonctionnalité"`)
4. Poussez (`git push origin feat/ma-fonctionnalite`)
5. Ouvrez une Pull Request

## Licence

Distribué sous licence **MIT**. Voir [LICENSE](LICENSE).

---

Fait avec ❤️ entre Brazzaville et Pointe-Noire.
