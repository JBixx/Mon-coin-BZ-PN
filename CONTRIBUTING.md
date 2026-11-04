# Contribuer à Mon coin BZ-PN

Merci de vouloir contribuer ! Toutes les contributions sont les bienvenues : nouveaux lieux, corrections, code, documentation.

## Ajouter ou corriger un lieu

1. Forkez le dépôt et créez une branche : `git checkout -b ajout/nom-du-lieu`
2. Ajoutez le lieu dans [`src/data/places.json`](src/data/places.json) en respectant le format existant :
   - `id` : identifiant unique en minuscules avec des tirets (ex. `chez-mama-ngouabi`)
   - `city` : `brazzaville` ou `pointe-noire`
   - `category` : une des catégories de [`src/data/constants.js`](src/data/constants.js)
3. Vérifiez que les informations sont exactes (nom, quartier, description). Pas de publicité.
4. Lancez les tests : `npm test`
5. Ouvrez une Pull Request en expliquant brièvement le lieu ajouté.

## Contribuer au code

1. Ouvrez d'abord une [issue](https://github.com/JBixx/Mon-coin-BZ-PN/issues) pour discuter des changements importants.
2. Gardez des PR petites et ciblées, avec des tests quand c'est pertinent.
3. Style : ES modules, 2 espaces d'indentation (voir `.editorconfig`).

## Messages de commit

Format conseillé : `type: description courte` — par exemple `feat: ajoute le filtre par quartier`, `fix: corrige la pagination`, `data: ajoute 3 maquis à Pointe-Noire`.

## Comportement

Soyez respectueux et bienveillants. Les propos discriminatoires ou le harcèlement ne seront pas tolérés.
