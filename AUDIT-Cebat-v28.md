# Audit — Cebat v28 (état actuel)

**Fichier audité :** `Cebat_v28.html` — **4,3 Mo**, **8 166 lignes**, fichier HTML autonome unique.
**Date :** 2026-06-29
**Périmètre :** bloc applicatif `<script type="text/x-dc">` (≈ lignes 2197 → 8164), une seule classe `Component extends DCLogic` (~6 000 lignes).

> Cet audit remplace l'audit initial (`AUDIT-Cebat.md`, C1–C9) : l'application a très fortement
> grossi (écran unifié « Feuille de puissance », moteur normatif complet, schéma/armoire/plans,
> dossier/autocontrôle, refonte visuelle). Les correctifs C1–C9 d'origine restent en place.

## 1. Méthodologie

- **Analyse statique** : `node --check` sur le script extrait → **0 erreur**.
- **Chargement réel** : instanciation de `Component` dans un bac à sable → OK (60 clés d'état).
- **Revue de bugs automatisée** : un agent de revue (lui-même 4 sous-audits parallèles) sur tout le
  bloc applicatif, chaque constat re-vérifié à la lecture du code.
- **Revue structurelle manuelle** : doublons, performance, cohérence des calculs, sécurité.

## 2. Synthèse

| Sévérité | Constat | Statut |
|----------|---------|--------|
| 🔴 Critique | **Validation normative obligatoire** : les calculs (ΔU, Lmax, Iz, Icc/PdC, RA, sélectivité, démarrage moteur, §771) sont **simplifiés et indicatifs** | À valider par un professionnel |
| 🟠 Majeur | **Modèle de puissance dupliqué et divergent** (3–4 copies aux constantes différentes) | À corriger |
| 🟠 Majeur | **Poids 4,3 Mo + transpilation Babel au chargement** (C5 d'origine, toujours ouvert) | Choix assumé, à reconsidérer |
| 🟡 Mineur | Pas de mémoïsation : `checkConformite` et coûts par-carte recalculés à chaque rendu (O(n²)) | À surveiller |
| 🟡 Mineur | Bruit de messages `info` dans la conformité (terre, parafoudre, SDB, PdC) | UX |
| 🟡 Mineur | Clés dupliquées (valeurs identiques) dans 2 littéraux d'objet | Cosmétique |

**Aucun bug de correction Critique/Majeur trouvé.** La base de code est saine : pas de déséquilibre
de parenthèses, pas de division par zéro non gardée, pas de `Math.min/max` sur tableau vide, pas de
mutation d'état dans les updaters `setState`, parsing numérique défensif (anti-NaN).

## 3. Constats détaillés

### 🔴 N1 — Les calculs électriques sont indicatifs et doivent être validés
L'outil produit désormais de nombreux résultats d'ingénierie **simplifiés** :
- Chute de tension cumulée et **section recommandée** (`voltageDropOf`, `recommendedSection`, l. ~3000).
- **Longueur maximale protégée** `lmaxProtege` (UTE C 15-105 simplifié, l. ~3052).
- **Courant admissible Iz** `currentCapacity` (tables IEC 60364-5-52 tronquées, K1/K2, l. ~3040).
- **Icc / pouvoir de coupure**, **parafoudre** (§534), **régime de neutre + RA** (UL 50 V).
- **Sélectivité** ampèremétrique/différentielle, **démarrage moteur**, **équipement minimal §771**.

Ces formules reposent sur des hypothèses (ρ cuivre 0,0225 ; m = 1 ; Im borne haute ; tables Iz
limitées aux sections courantes ; foisonnement cos φ = 1 ; RA piquet = ρ/L, boucle = 2ρ/L). Elles
sont **utiles pour le pré-dimensionnement** mais **ne remplacent pas une note de calcul validée**.
L'app l'indique localement (« indicatif ») — **à conserver et rendre visible dans tout export**.

### 🟠 N2 — Modèle de puissance par fonction dupliqué et incohérent
La même grandeur (puissance installée par fonction) est codée **en dur dans plusieurs endroits avec
des valeurs différentes** :
- `_fnPowerW` (l. 2980) : inclut `piscine:1500`, **défaut 500 W**.
- `calcDjPower` (l. ~2749) : table propre.
- `puissanceCumulee` (l. 5003) : **omet** `piscine`/`portail`, défaut 500 W.
- `getPow` du tableau de bord (« Charge par appartement », l. 6068) : **omet `piscine`, défaut `0`**.

Conséquence : la **charge par appartement du dashboard ne coïncide pas** avec le bilan de puissance
(`bilanPuissance`/`_fnPowerW`) pour les fonctions non listées ou la piscine.
**Reco :** une seule source de vérité (`_fnPowerW(fn)`) appelée partout ; supprimer les copies inline.

### 🟠 N3 — Poids et démarrage (C5 d'origine, toujours ouvert)
Fichier **4,3 Mo** : React + **@babel/standalone** + polices base64 embarqués, **transpilation JSX au
chargement** (ligne 305). Coût de démarrage et de mémoire significatif ; l'état monolithique
re-rend toute l'app à chaque `setState`.
**Reco :** pré-compiler le JSX au build (retire Babel, ~1,5 Mo et la latence) — **au prix de l'autonomie
hors-ligne du fichier unique**, qui reste la principale qualité de l'outil. À trancher selon l'usage.

### 🟡 N4 — Recalculs non mémoïsés (performance)
`checkConformite()` (coûteux) est appelé à chaque rendu par `renderConfCard` (l. 3448), la Feuille de
puissance (l. 7881), le dossier (l. 3338) et l'autocontrôle (l. 3359/3391). En plus, la Feuille calcule
par carte `voltageDropOf` → `boardFeederDrop` (somme des charges du tableau) → **O(n²)** sur le nombre
de disjoncteurs. Acceptable en domestique (≤ quelques dizaines de circuits) ; à mémoïser si l'app vise
de gros tertiaires.

### 🟡 N5 — Bruit de messages `info` en conformité
Les ajouts récents émettent un `info` quasi systématique (PdC OK, parafoudre déclaré, régime TT/TN,
LES par salle de bains). Sur un projet complet, la liste de conformité se charge en informations.
**Reco :** regrouper les `info` sous un repli « notes » ou les filtrer par défaut.

### 🟡 N6 — Clés dupliquées dans 2 littéraux (cosmétique)
`renderEditFonctionSpec` (l. 4255) et `renderEditFonctionExtSecuEnerg` (l. 4341) répètent
`cableRepere`, `nbConducteursConn`, `repBagues` avec des **valeurs identiques** → réécriture sans effet.
**Reco :** supprimer les doublons.

## 4. Points forts

- Code **syntaxiquement sain** sur 8 000+ lignes, conventions cohérentes, parsing défensif.
- **Architecture réutilisable** : `_schemaPrims` (SVG+DXF), conteneur d'impression partagé,
  `rangeesOf`/`_boardRows` source unique de la disposition physique, helpers de thème centralisés.
- **Couverture fonctionnelle** très large et cohérente (conception → dimensionnement → réalisation →
  contrôle), avec persistance multi-projets et exports (JSON, CSV, SVG, PNG, DXF, PDF).
- **Mode hors-ligne** intégral conservé (un seul `.html`).

## 5. Sécurité

- `new Function()` + Babel au runtime : **par conception** (chargement de `Component` depuis le HTML).
  Acceptable tant que le fichier n'est pas alimenté par une source externe non fiable.
- Données projet rendues via `React.createElement` (échappées) ; les chaînes injectées dans les SVG
  d'impression passent par des helpers d'échappement (`esc`/`T`). **Aucun `dangerouslySetInnerHTML`**
  côté application → risque XSS faible.
- **Reco :** ne jamais ouvrir un `Cebat_*.html` d'origine inconnue (le code embarqué s'exécute).

## 6. Priorisation

| Priorité | Élément | Effort | Impact |
|----------|---------|--------|--------|
| 1 | **N2** Unifier le modèle de puissance (`_fnPowerW` partout) | Faible | Élevé (cohérence) |
| 2 | **N1** Mention « indicatif » visible dans tous les exports + revue pro | Faible | Élevé (responsabilité) |
| 3 | **N5** Replier/filtrer les messages `info` | Faible | Moyen (UX) |
| 4 | **N6** Supprimer les clés dupliquées | Très faible | Faible |
| 5 | **N4** Mémoïser `checkConformite`/bilans si gros projets | Moyen | Moyen (perf) |
| 6 | **N3** Pré-compilation/allègement | Élevé | Moyen (perf) — casse l'autonomie |

---

*Audit par lecture statique + revue automatisée vérifiée. Les calculs électriques relèvent d'une
validation par un professionnel qualifié avant tout usage réel.*
