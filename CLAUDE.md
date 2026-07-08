# Cebat — guide de développement

Application web autonome (mono-fichier) de conception d'installations électriques NF C 15-100.

## Structure (source → build → livrable)

| Fichier | Rôle | Éditer ? |
|---|---|---|
| `src/cebat.app.js` | **Code applicatif** (React via `React.createElement`, pas de balises JSX) | ✅ **OUI — c'est ici qu'on travaille** |
| `Cebat_v28.template.html` | Gabarit HTML + React & Babel *vendored* (minifiés). Contient le marqueur `/*__CEBAT_APP_SRC__*/` | ❌ généré/vendored |
| `Cebat_v28.html` | **Livrable** mono-fichier autonome (source réinjectée dans le gabarit) | ❌ **généré — ne pas éditer à la main** |

## Workflow

```bash
# éditer src/cebat.app.js, puis :
npm run build        # régénère Cebat_v28.html
npm run validate     # vérifie la syntaxe (donne la ligne exacte en cas d'erreur)
npm run check        # validate + build
```

Un hook `PostToolUse` régénère automatiquement `Cebat_v28.html` après chaque édition de
`src/cebat.app.js`, et un hook `SessionStart` valide la syntaxe à l'ouverture d'une session.

## Notes techniques

- Le code applicatif tourne dans un `<script type="text/x-dc">` : `DCLogic` et `React`
  sont injectés au runtime par `dc-runtime`. Un éditeur peut signaler ces symboles comme
  « non définis » — c'est normal (voir l'en-tête `/* global */` du fichier source).
- `node --check` suffit à valider la syntaxe (le code n'utilise pas de balises JSX).
- Le build est **sans perte** : réinjecter la source dans le gabarit reproduit le livrable
  à l'octet près.
