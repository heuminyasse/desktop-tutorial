# ePilot Excel Import — Démarrage Rapide

## ⚡ 5 minutes pour démarrer

### 1️⃣ Installer les dépendances

```bash
cd /home/user/desktop-tutorial
npm install
```

### 2️⃣ Démarrer le serveur

```bash
npm start
```

Output attendu:
```
============================================================
  ePilot Import Server
============================================================

  🚀 Server running on http://localhost:3000

  📊 Import API endpoints:
     POST /api/import/preview  - Preview Excel data
     POST /api/import/execute  - Execute import
     GET  /api/import/status   - Check import status

  📁 Static files: ePilot Standalone/

============================================================
```

### 3️⃣ Ouvrir l'interface web

Aller à: **http://localhost:3000/lib/import-excel-interface.html**

### 4️⃣ Importer le fichier Excel

1. Cliquer "Sélectionner fichier Excel"
2. Choisir votre fichier `ePilot.xlsm`
3. Cliquer "Lire et prévisualiser"
4. Vérifier les compteurs et exemples
5. Cocher "Je confirme l'import"
6. Cliquer "IMPORTER MAINTENANT"

### 5️⃣ Intégrer dans ePilot

Les données retournées par le serveur doivent être mergées dans localStorage:

```javascript
// Récupérer les données du serveur (étape 4)
const v21Data = // {...} retourné par /api/import/execute

// Charger la DB existante
const v21DbKey = 'epilot_v21_complete_db';
let db = JSON.parse(localStorage.getItem(v21DbKey) || '{}');

// Merger
db.CHANTIERS_DATA = { ...db.CHANTIERS_DATA, ...v21Data.CHANTIERS_DATA };
db.SOURCING_DATA = [...(db.SOURCING_DATA || []), ...v21Data.SOURCING_DATA];
db.FACTURES_DATA = [...(db.FACTURES_DATA || []), ...v21Data.FACTURES_DATA];

// Sauvegarder
localStorage.setItem(v21DbKey, JSON.stringify(db));

// Recharger l'app
location.reload();
```

---

## 📊 Qu'est-ce qui s'importe?

| Source | Destination | Volume |
|--------|-------------|--------|
| Quote (devis) | CHANTIERS_DATA | 1,940 |
| JIP (chantiers) | CHANTIERS_DATA | 580 |
| → Fused | → 1,936 uniques | 1,936 |
| Sourcing | SOURCING_DATA | 1,042 |
| Bill | FACTURES_DATA | 507 |

---

## 🔍 Format des données

### CHANTIERS_DATA (objet)
```javascript
{
  "PI24676": {
    _id: "PI24676",
    Client: "Boissons du Cameroun",
    Budget: "2887950",
    NumeroOA: "3520583",
    Status: "Terminé",
    _type: "CHANTIER"  // ou "DEVIS"
  }
}
```

### SOURCING_DATA (array)
```javascript
[
  {
    _id: "PI23364_1",
    Imputation: "PI23364",  // FK → CHANTIERS_DATA
    Description: "Gas Fittings",
    Qty: 5,
    CoutAcqXAF: 3300
  }
]
```

### FACTURES_DATA (array)
```javascript
[
  {
    _id: "PI22600_FAC001",
    Dossier: "PI22600",      // FK → CHANTIERS_DATA
    NumeroFacture: "FAC001",
    Montant: 103000
  }
]
```

---

## 🛠️ API Endpoints

### Preview (sans import)
```bash
curl -X POST http://localhost:3000/api/import/preview \
  -F "excel=@ePilot.xlsm" \
  -F "dateFrom=2025-01-01"
```

### Execute (importe les données)
```bash
curl -X POST http://localhost:3000/api/import/execute \
  -F "excel=@ePilot.xlsm"
```

### Status
```bash
curl http://localhost:3000/api/import/status
```

---

## ⚙️ Options avancées

### Filtrer par date
```
Date début: 2025-01-01
Date fin:   2025-12-31
```

### Port personnalisé
```bash
PORT=8000 npm start
```

### Mode développement
```bash
npm run dev  # Auto-reload on file changes
```

---

## ✅ Checklist

- [ ] npm install terminé
- [ ] npm start en cours
- [ ] Interface accessible à http://localhost:3000/lib/import-excel-interface.html
- [ ] Fichier Excel prêt
- [ ] Preview réussi (affiche compteurs)
- [ ] Import exécuté
- [ ] Données intégrées dans localStorage
- [ ] ePilot rechargé
- [ ] Données visibles dans Chantiers

---

## 🐛 Problèmes?

**Erreur: "PORT 3000 déjà utilisé"**
```bash
PORT=3001 npm start
```

**Erreur: "Sheet not found"**
- Vérifier les noms des feuilles: Quote, JIP, Sourcing, Bill

**Pas de données affichées**
- Vérifier les headers: Quote (L9), JIP (L7), Sourcing (L7), Bill (L8)
- Ouvrir Excel et resauvegarder le fichier

**Interface blanche**
- Vérifier la console du navigateur (F12 → Console)
- Vérifier les logs du serveur

---

## 📚 Documentation complète

Pour plus de détails: voir **IMPORT_SERVER_README.md**

---

**Prêt à importer? Commencez à l'étape 1️⃣!**
