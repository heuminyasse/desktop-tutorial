# Audit ePilot v20 — Robustesse, Erreurs, Cohérence, Sécurité

_Audit automatisé dans un vrai navigateur (Chromium) + analyse statique du code._
_Périmètre : 8 sections principales + sous-onglets, **223 actions/boutons déclenchés**, parcours FR et EN._

## 1. Résultat global du runtime ✅
L'app est **globalement stable** :
- **0 plantage** en cliquant 223 boutons sur 8 pages.
- **0 erreur console**, **0 valeur NaN/undefined/[object Object]** affichée à l'écran.
- Les confirmations de suppression et les alertes de validation fonctionnent (ex. « Aucun badge à exporter », « Supprimer la dépense D0001 ? »).

Reste les points ci-dessous, classés par **gravité** (⛔ critique · ⚠️ moyen · ℹ️ mineur).

---

## 2. Sécurité

### ⛔ S1 — Évaluateur de formules = exécution de code arbitraire
`new Function('R','C','with(C){with(R){ return ' + expr + ' }}')` évalue les **formules saisies** (module Formules/KPI).
Une formule (ou une donnée Excel importée contenant une formule) peut exécuter **n'importe quel JavaScript** (vol de données locales, modification, etc.).
**Reco :** sandboxer (parseur d'expressions limité aux opérateurs/maths autorisés) ou liste blanche stricte ; ne jamais évaluer une chaîne issue d'un import.

### ⚠️ S2 — Surface XSS (injection HTML)
303 `innerHTML =`, 11 `insertAdjacentHTML`, 14 `dangerouslySetInnerHTML`, 278 gestionnaires `onclick=` en chaîne.
Beaucoup de contenus sont construits à partir des **données** (clients, articles, descriptions). Si une donnée importée (Excel/JSON) contient `<img onerror=...>` ou `<script>`, elle peut **s'exécuter**.
**Reco :** garantir `escapeHtml()` sur **toute** donnée injectée (audit ciblé des points sans échappement) ; à terme, préférer `textContent`/gabarits sûrs.

### ⚠️ S3 — Données sensibles en clair, sans authentification
179 usages `localStorage` + IndexedDB stockent **salaires, RH, clients, prix** en **clair**. Aucune authentification : **quiconque ouvre le fichier voit tout**.
**Reco :** au minimum un **code d'accès** + (option) chiffrement du stockage ; sensibiliser au fait que le `.html` = toutes les données.

### ⚠️ S4 — Champ « URL de l'API » (exfiltration potentielle)
Un réglage « URL de l'API » (placeholder `https://api.exemple.com/epilot`) permettrait d'**envoyer les données** vers un serveur configurable.
**Reco :** valider/limiter les domaines autorisés ; afficher clairement ce qui est envoyé.

---

## 3. Dépendances externes — l'app n'est pas 100% « hors-ligne »

### ⚠️ D1 — QR codes via service tiers
Les QR codes sont des images chargées depuis **`https://api.qrserver.com`** (`<img src="…create-qr-code…data=<contenu>">`).
→ **Ne fonctionnent pas hors-ligne**, et le **contenu du QR (données colis/suivi) est envoyé à un tiers**.
**Reco :** générer les QR **localement** (lib qrcode embarquée, comme c'est déjà le cas pour les codes-barres en SVG).

### ⚠️ D2 — Librairie Excel (SheetJS) depuis un CDN
Chargement de secours `https://cdn.sheetjs.com/xlsx-0.20.3/…/xlsx.full.min.js`.
→ Import/Export Excel **nécessite Internet** si la lib n'est pas embarquée.
**Reco :** embarquer xlsx en local.

### ℹ️ D3 — Polices Google
`preconnect` vers `fonts.googleapis.com`/`gstatic.com` → polices potentiellement chargées en ligne (et léger pistage).
**Reco :** embarquer les polices.

---

## 4. Robustesse / bugs

### ⚠️ R1 — Erreur récurrente au démarrage : `__epKeepApplying is not a function`
Plusieurs modules appellent `window.__epKeepApplying(...)` **avant** sa définition (course au chargement). Conséquence : certaines fonctionnalités injectées (boutons « sauvegarde/outils/réglages ») **peuvent ne pas s'initialiser**.
**Reco :** définir un **stub très tôt** (avant les modules) qui met en file d'attente, ou garantir l'ordre de chargement.

### ℹ️ R2 — 4 fichiers de police manquants (404)
4 ressources `@font-face` (graisse 300) absentes du bundle → 404, repli sur police par défaut. Cosmétique (`font-display:swap`).
**Reco :** ré-embarquer ces 4 fichiers ou retirer la déclaration.

---

## 5. Données / incohérences

### ⚠️ C1 — 59 cellules `#NAME?`
59 occurrences de **`#NAME?`** (erreur de formule Excel) figées dans les **données importées** → affichées telles quelles à l'utilisateur.
**Reco :** nettoyer les données source ; à l'affichage, remplacer toute valeur `#…?` par « — » ou vide.

### ℹ️ C2 — Données d'exemple/PII en dur
De nombreux **noms réels, clients, fournisseurs** sont en dur dans le code (données d'exemple). À vérifier avant diffusion (RGPD/confidentialité).

---

## 6. Plan d'action recommandé (priorité)
1. ⛔ **S1** Sandboxer l'évaluateur de formules.
2. ⚠️ **D1/D2** Embarquer QR + SheetJS (vrai hors-ligne + confidentialité).
3. ⚠️ **S3** Code d'accès + (option) chiffrement du stockage.
4. ⚠️ **S2** Audit d'échappement HTML sur les données importées.
5. ⚠️ **R1** Corriger la course `__epKeepApplying`.
6. ⚠️ **C1** Masquer/nettoyer les `#NAME?`.
7. ℹ️ **R2/D3/C2** Polices locales, PII d'exemple.

> Aucune **fuite de mot de passe / clé API en dur** détectée. Aucun `eval()` direct (mais voir S1).
