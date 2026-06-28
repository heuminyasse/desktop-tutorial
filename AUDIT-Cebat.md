# Audit — Cebat v28

**Fichier audité :** `Cebat_v28.html` (~4,2 Mo, un seul fichier autonome)
**Date :** 2026-06-28

## 1. Vue d'ensemble

Cebat est une application de **conception d'installation électrique du bâtiment**
(niveaux → appartements → pièces → fonctions ; tableaux électriques, disjoncteurs,
départs/sources, boîtes de dérivation, interrupteurs, zones de commande), avec
génération automatique de **codes repères** (codes « CEBAT ») et un
**dimensionnement** inspiré de la NF C 15-100.

**Stack technique :**
- React (production) + Babel **compilé dans le navigateur** au chargement, le tout
  embarqué dans le HTML.
- Mini-framework maison **`dc-runtime`** (`class Component extends DCLogic`, balise
  `<x-dc>`, `<helmet>`), généré depuis des sources TypeScript.
- ~4 700 lignes de logique applicative dans une seule classe `Component`.
- Aucune dépendance réseau : le fichier s'ouvre directement dans un navigateur.

**Points forts :** code cohérent et lisible, séparation nette constantes /
helpers / générateurs de codes / vues, large couverture fonctionnelle
(8 sections), thème clair/sombre, conventions de nommage des repères soignées.

---

## 2. Problèmes confirmés

Sévérité : 🔴 Critique · 🟠 Majeur · 🟡 Mineur. *Numéros de ligne relatifs au
bloc applicatif `<script type="text/x-dc">` (commence vers la ligne 2197 du HTML).*

### 🔴 C1 — Aucune persistance des données
Aucun `localStorage` / `sessionStorage` / `indexedDB` ni import/export de fichier
dans le code applicatif (vérifié sur l'ensemble du fichier ; la seule occurrence
de `localStorage` est interne à Babel).
**Conséquence :** un rechargement de page ou la fermeture de l'onglet **efface
toute la saisie** (projet, structure, circuits, configurations). C'est le risque
le plus impactant pour l'utilisateur.
**Reco :** sauvegarder `this.state` (JSON) dans `localStorage` à chaque `setState`
et recharger au démarrage ; ajouter export/import `.json` pour archivage et partage.

### 🟠 C2 — `vCircuits` définie deux fois (code mort)
Méthode `vCircuits(circuits)` déclarée aux lignes **~3412** et **~3689**. En JS, la
seconde écrase silencieusement la première : **~277 lignes mortes** (3412-3687) qui
ne s'exécutent jamais mais alourdissent et trompent la maintenance.
**Reco :** supprimer la première définition après vérification que la seconde est
bien la version voulue.

### 🟠 C3 — Vues `vAppartements` / `vPieces` mortes + routage incohérent
`vAppartements()` (~3259) et `vPieces()` (~3299) ne sont **jamais appelées** : dans
`renderVals` (~4685), les routes `appartements` et `pieces` pointent toutes deux
vers `vLogements`, et ces identifiants **ne figurent pas dans la barre de
navigation `NAV`**. Code mort + intention de routage non aboutie.
**Reco :** soit relier `appartements`/`pieces` à leurs vraies vues et les ajouter à
`NAV`, soit supprimer les vues inutilisées.

### 🟠 C4 — Pas d'export structuré (seulement l'impression)
La sortie se limite à `window.print()` (boutons « Imprimer », ~4537 et ~4660).
Aucun export JSON/CSV/PDF.
**Reco :** ajouter au minimum un export JSON (sauvegarde projet) et un export CSV
de la nomenclature (câbles/circuits) ; le PDF peut rester via l'impression.

### 🟠 C5 — Poids et démarrage
Fichier de **4,2 Mo** : React + **Babel** + polices en base64 tout embarqués, avec
**transpilation JSX au chargement** (coûteuse, refaite à chaque ouverture). L'état
est monolithique → chaque `setState` re-render l'app entière.
**Reco :** pré-compiler le JSX au build (supprime Babel, ~1,5 Mo et la latence) ;
charger les polices via CDN ou fichiers séparés ; mémoïser les composants stables
(`Btn`, `Card`, `Stat`, icônes).

### 🟠 C6 — Validation des saisies numériques absente
Les formulaires convertissent les champs avec `+form.x` sans garde (ex. `etage`,
`surface`, `calibre`, `puissance`, `quantite`, `section`, `ddr`). Un champ vidé
donne `0` et une valeur non numérique donne **`NaN`**, qui se propage ensuite dans
l'état et les calculs.
**Reco :** valider/normaliser avant `setState` (`Number.isFinite`, bornes min/max,
message d'erreur), ou des champs `min`/`step` + parsing défensif.

### 🟡 C7 — `getCompletion` : 20 % « offerts » (~358)
`s += 20;` **inconditionnel** en fin de calcul : le taux de complétion est
systématiquement gonflé de 20 points, indépendamment de l'avancement réel.
**Reco :** conditionner ce palier à un critère concret (ex. au moins un tableau /
un circuit défini).

### 🟡 C8 — `getNbL` / `getNbP` : `Math.max` redondant (~322-323)
`Math.max(t.minL, t.minL + Math.floor(surface/15) + bonus)` : le premier terme est
toujours ≤ au second (dès que l'extra ≥ 0), donc le `Math.max` ne protège rien et
le minimum `minL` est en pratique compté « en plus » de la part surfacique.
**Reco :** clarifier l'intention — soit `Math.max(minL, part_surfacique + bonus)`,
soit assumer `minL + extra` sans `Math.max` trompeur.

### 🟡 C9 — Générateurs de codes : motif `findIndex(...)+1 || fallback` fragile
Plusieurs générateurs (`genCEBATCode` ~89, `genTECode` ~122, `genSourceCode`
~158…) utilisent `findIndex(...)+1 || fallback`. Quand l'élément est absent,
`findIndex` renvoie `-1` → `0` (falsy) → on bascule sur le fallback ; et dans
`genCEBATCode`, une fonction sans `piece` rattachée retombe toujours sur l'indice
`1`, ce qui peut **produire des codes en collision**.
**Reco :** tester explicitement `idx = findIndex(...); idx >= 0 ? idx+1 : …` et
garder un fallback cohérent (`length + 1`).

---

## 3. À valider avec un électricien (domaine NF C 15-100)

Ces points ne sont **pas des bugs logiciels certains** mais des hypothèses métier à
faire confirmer par un professionnel :

- **`djNFCLimit` (~233)** : la limite de puissance d'un circuit est mise à l'échelle
  avec le calibre (`2300·calibre/10` pour l'éclairage, `3680·calibre/16` pour les
  prises). À vérifier vs les plafonds normatifs par type de circuit.
- **`calcDjPower` (~232)** : puissances par défaut de **500 W** pour les fonctions
  non listées (TV, RJ45, détecteurs, domotique…), surévaluées pour les courants
  faibles. À affiner si ces fonctions doivent peser dans le bilan.
- **`calcCircuits` (~361)** : valeur fixe `50 W/point` d'éclairage, sans lien avec la
  puissance réelle des luminaires (`LAMP_TYPES`). À rapprocher de la puissance saisie.

---

## 4. Sécurité

- Le framework utilise `new Function()` et la transpilation Babel au runtime : c'est
  **par conception** (chargement de la classe `Component` depuis le HTML). Acceptable
  tant que le fichier HTML n'est pas alimenté par une source externe non fiable.
- Les données projet (nom, client, e-mail…) sont rendues via `React.createElement`,
  qui **échappe** le texte : pas de `dangerouslySetInnerHTML` côté application →
  risque XSS faible.
- **Reco :** ne jamais charger un `Cebat_*.html` d'origine inconnue (le code embarqué
  s'exécute), et valider les champs projet à la saisie.

---

## 5. Priorisation suggérée

| Priorité | Élément | Effort | Impact |
|----------|---------|--------|--------|
| 1 | **C1** Persistance + export/import JSON | Moyen | Très élevé |
| 2 | **C6** Validation des saisies (anti-NaN) | Moyen | Élevé |
| 3 | **C2/C3** Supprimer le code mort (`vCircuits` ×2, vues orphelines) | Faible | Moyen |
| 4 | **C4** Export CSV nomenclature | Moyen | Moyen |
| 5 | **C9/C7/C8** Robustesse codes + calculs complétion | Faible | Moyen |
| 6 | **C5** Pré-compilation / allègement | Élevé | Moyen (perf) |
| 7 | **§3** Revue normative NF C 15-100 | Externe | Élevé (métier) |

---

*Audit réalisé par lecture statique du code. Les calculs électriques relèvent d'une
validation par un professionnel qualifié avant usage réel.*
