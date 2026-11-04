# Politique de sécurité

## Versions prises en charge

Le projet est en phase de démarrage : seule la dernière version de la branche `main` reçoit des correctifs de sécurité.

| Version              | Prise en charge |
| -------------------- | --------------- |
| `main` (latest)      | ✅              |
| Versions antérieures | ❌              |

## Signaler une vulnérabilité

⚠️ **N'ouvrez pas d'issue publique, de discussion ou de Pull Request pour signaler une faille de sécurité.** Cela exposerait la faille avant qu'un correctif soit disponible.

Utilisez le **signalement privé de vulnérabilité** de GitHub :

1. Allez dans l'onglet **[Security](https://github.com/JBixx/Mon-coin-BZ-PN/security)** du dépôt.
2. Cliquez sur **[Report a vulnerability](https://github.com/JBixx/Mon-coin-BZ-PN/security/advisories/new)**.
3. Remplissez le formulaire. Seuls les mainteneurs du projet peuvent le lire.

### Informations utiles à fournir

- Le type de vulnérabilité (injection, contournement de validation, déni de service, fuite de données…)
- Les fichiers ou routes concernés (ex. `POST /api/v1/places`)
- Les étapes pour reproduire le problème, idéalement avec une requête d'exemple (`curl`…)
- L'impact potentiel et un scénario d'exploitation
- Si possible, une piste de correction

## Ce qui se passe ensuite

| Étape                                   | Délai visé       |
| --------------------------------------- | ---------------- |
| Accusé de réception                     | sous 72 heures   |
| Première évaluation (gravité, validité) | sous 7 jours     |
| Correctif et publication                | selon la gravité |

Nous vous tiendrons informé de l'avancement dans le fil du signalement. Une fois le correctif publié, un avis de sécurité (GitHub Security Advisory) sera rendu public et, si vous le souhaitez, vous y serez crédité.

## Divulgation responsable

Merci de :

- nous laisser un délai raisonnable pour corriger la faille avant toute divulgation publique ;
- ne pas accéder, modifier ou supprimer des données qui ne vous appartiennent pas ;
- ne pas dégrader le service (pas de test de charge ou de déni de service sur une instance publique).

## Hors périmètre

- Les vulnérabilités dans des dépendances tierces déjà publiquement connues et pour lesquelles une mise à jour est en attente
- L'absence d'authentification sur les routes d'écriture : il s'agit d'une limitation connue, inscrite dans la [roadmap](../README.md#roadmap)

Merci de contribuer à la sécurité de Mon coin BZ-PN ! 🔒
