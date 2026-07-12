# ePilot Excel Import Server

Serveur Node.js pour importer données Excel (Quote, JIP, Sourcing, Bill) vers la base V21 d'ePilot.

## 🚀 Installation et Démarrage

### Prérequis
- Node.js >= 14.0.0
- npm ou yarn

### Installation

```bash
cd /home/user/desktop-tutorial

# Installer les dépendances
npm install

# Vérifier l'installation
npm test
```

### Démarrage du serveur

```bash
# Mode production
npm start

# Mode développement (avec auto-reload)
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 📡 API Endpoints

### 1. POST /api/import/preview

**Description:** Prévisualiser les données Excel avant import

**Paramètres:**
- `excel` (FormData file) - Fichier Excel (.xlsx ou .xlsm)
- `dateFrom` (optionnel) - Date de début (YYYY-MM-DD)
- `dateTo` (optionnel) - Date de fin (YYYY-MM-DD)

**Réponse:**
```json
{
  "success": true,
  "preview": {
    "chantiers": {
      "total": 1936,
      "validated": 573,
      "devis": 1363,
      "sample": [...]
    },
    "sourcing": {
      "total": 1042,
      "sample": [...]
    },
    "factures": {
      "total": 507,
      "sample": [...]
    },
    "errors": []
  },
  "stats": {
    "chantiers": 1936,
    "sourcing": 1042,
    "factures": 507
  }
}
```

**Exemple curl:**
```bash
curl -X POST http://localhost:3000/api/import/preview \
  -F "excel=@ePilot.xlsm" \
  -F "dateFrom=2025-01-01" \
  -F "dateTo=2025-12-31"
```

### 2. POST /api/import/execute

**Description:** Exécuter l'import des données

**Paramètres:**
- `excel` (FormData file) - Fichier Excel
- `dateFrom` (optionnel) - Date de début
- `dateTo` (optionnel) - Date de fin

**Réponse:**
```json
{
  "success": true,
  "message": "Import completed successfully",
  "data": {
    "CHANTIERS_DATA": { ... },
    "SOURCING_DATA": [ ... ],
    "FACTURES_DATA": [ ... ]
  },
  "stats": {
    "chantiers": 1936,
    "sourcing": 1042,
    "factures": 507
  }
}
```

**Exemple curl:**
```bash
curl -X POST http://localhost:3000/api/import/execute \
  -F "excel=@ePilot.xlsm"
```

### 3. GET /api/import/status

**Description:** Vérifier l'état du serveur

**Réponse:**
```json
{
  "status": "idle",
  "lastImport": null,
  "message": "Ready for import"
}
```

### 4. GET /api/health

**Description:** Health check

**Réponse:**
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

## 🎨 Interface Web

L'interface web est accessible à `http://localhost:3000/import-excel-interface.html`

### Fonctionnalités

✓ **Upload de fichier Excel**
- Sélection du fichier .xlsx ou .xlsm
- Validation du format

✓ **Prévisualisation des données**
- Compteurs: Chantiers, Devis, Commandes, Factures
- Tableau d'exemples de données
- Filtres optionnels par date

✓ **Filtrage par date**
- Appliqué avant import
- Réduction du volume de données
- Combinable avec preview

✓ **Confirmation et import**
- Checksum de confirmation
- Import sécurisé dans V21_DB
- Rapport d'import

✓ **Gestion des erreurs**
- Affichage détaillé des erreurs
- Suggestions de correction
- Retour aux étapes précédentes

## 📊 Format des données importées

### CHANTIERS_DATA

```javascript
{
  "PI24676": {
    _id: "PI24676",
    Imputation: "PI24676",
    Client: "Boissons du Cameroun",
    Unite: "SABC_Yaounde",
    Type: "Fourniture",
    Date: "2025-06-03",
    Budget: "2887950",
    Status: "Terminé",
    NumeroOA: "3520583",
    _type: "CHANTIER",  // ou "DEVIS"
    _source: "JIP",     // ou "DEVIS"
    // ... autres champs
  }
}
```

### SOURCING_DATA

```javascript
[
  {
    _id: "PI23364_1",
    Imputation: "PI23364",
    Rank: 1,
    Description: "Gas Fittings",
    Qty: 5,
    CoutAcqXAF: 3300,
    OA: "OA123",
    // ...
  }
]
```

### FACTURES_DATA

```javascript
[
  {
    _id: "PI22600_FAC001",
    Dossier: "PI22600",
    NumeroFacture: "FAC001",
    Montant: 103000,
    Statut: "Payée",
    // ...
  }
]
```

## 🔄 Flux d'import

```
1. User sélectionne fichier Excel
                ↓
2. API /preview lit et prévisualise
   - Affiche compteurs
   - Affiche exemples
   - Retourne stats
                ↓
3. User applique filtres (optionnel)
   - Sélectionne dates
   - Preview se met à jour
                ↓
4. User confirme et lance import
   - Coche confirmation
   - Clique "IMPORTER"
                ↓
5. API /execute fusionne données
   - Fusion Quote + JIP
   - Format Sourcing
   - Format Factures
   - Applique filtres
                ↓
6. Données exportées pour V21
   - CHANTIERS_DATA (objet)
   - SOURCING_DATA (array)
   - FACTURES_DATA (array)
                ↓
7. Client merge dans localStorage
   - V21_DB = epilot_v21_complete_db
   - Merge CHANTIERS, SOURCING, FACTURES
   - Sauvegarde
                ↓
8. Confirmation affichée
   - Compteurs finaux
   - Rapport succès
```

## ⚙️ Configuration

### Port personnalisé

```bash
PORT=8000 npm start
```

### Taille max fichier

Éditer `server.js` ligne 28:
```javascript
limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
```

### Variables d'environnement

```bash
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
```

## 🧪 Fichiers de test

### Test du module

```bash
npm test
```

Cela exécute `lib/test-import-excel.js` qui:
- Lit le fichier Excel de test
- Affiche les stats de chaque sheet
- Valide la fusion Quote + JIP
- Vérifie les exports V21
- Affiche les détails des premiers éléments

## 🔒 Sécurité

### Recommandations

✓ **Validation du fichier**
- Vérifier l'extension (.xlsx/.xlsm)
- Limiter la taille (50MB par défaut)
- Valider la structure (headers, colonnes)

✓ **Authentification**
- Ajouter middleware auth avant /api/import/*
- Requérir permission "admin"
- Logger tous les imports

✓ **Audit**
- Sauvegarder les fichiers importés
- Logger date, user, stats
- Conserver historique import

### Middleware d'authentification

À ajouter dans server.js:

```javascript
app.use('/api/import', (req, res, next) => {
  // Vérifier authentication
  const user = req.headers['x-user-id'];
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  
  // Vérifier permission admin
  if (user !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  
  next();
});
```

## 📝 Intégration avec ePilot

### Étape 1: Lancer le serveur

```bash
cd /home/user/desktop-tutorial
npm install
npm start
```

### Étape 2: Accéder à l'interface

Ouvrir `http://localhost:3000/import-excel-interface.html` dans le navigateur

### Étape 3: Upload Excel

1. Cliquer "Sélectionner fichier Excel"
2. Choisir fichier ePilot.xlsm
3. Cliquer "Lire et prévisualiser"

### Étape 4: Vérifier preview

- Vérifier les compteurs
- Vérifier les exemples de données
- Appliquer filtres si nécessaire

### Étape 5: Confirmer et importer

1. Cocher "Je confirme l'import"
2. Cliquer "IMPORTER MAINTENANT"
3. Attendre confirmation

### Étape 6: Intégrer dans localStorage

Le serveur retourne les données V21. À intégrer:

```javascript
// Dans l'app ePilot
const v21Data = // données retournées par /api/import/execute

// Récupérer la DB existante
let v21Db = JSON.parse(localStorage.getItem('epilot_v21_complete_db') || '{}');

// Merger les données
v21Db.CHANTIERS_DATA = {
  ...v21Db.CHANTIERS_DATA,
  ...v21Data.CHANTIERS_DATA
};
v21Db.SOURCING_DATA = [
  ...(v21Db.SOURCING_DATA || []),
  ...v21Data.SOURCING_DATA
];
v21Db.FACTURES_DATA = [
  ...(v21Db.FACTURES_DATA || []),
  ...v21Data.FACTURES_DATA
];

// Sauvegarder
localStorage.setItem('epilot_v21_complete_db', JSON.stringify(v21Db));
```

## 🐛 Dépannage

### Erreur: "Sheet not found"

**Cause:** Les noms des feuilles Excel ne correspondent pas

**Solution:** Vérifier les noms:
- Quote (majuscule Q)
- JIP (majuscules)
- Sourcing
- Bill

### Erreur: "Failed to read Excel"

**Cause:** Fichier corrompu ou format invalide

**Solution:**
- Vérifier le format (.xlsx ou .xlsm)
- Ouvrir dans Excel et resauvegarder
- Vérifier la taille du fichier

### Les données ne s'affichent pas

**Cause:** Headers ne sont pas à la bonne ligne

**Quelles lignes pour les headers:**
- Quote: ligne 9 (index 8)
- JIP: ligne 7 (index 6)
- Sourcing: ligne 7 (index 6)
- Bill: ligne 8 (index 7)

### Import très lent

**Cause:** Fichier très volumineux

**Solution:**
- Appliquer filtres par date
- Importer par période (ex: par trimestre)
- Vérifier les ressources du serveur

## 📚 Documentation supplémentaire

- **INTEGRATION_GUIDE.md** - Guide d'intégration détaillé
- **import-excel-module.js** - Documentation du module
- **test-import-excel.js** - Exemples d'usage

## 📞 Support

Pour les questions ou problèmes, vérifier:
1. Les logs du serveur (sortie console)
2. La console du navigateur (F12 → Console)
3. Les détails d'erreur dans la réponse API

## ✅ Checklist déploiement

- [ ] Node.js >= 14 installé
- [ ] `npm install` exécuté
- [ ] Fichier Excel prêt (Quote, JIP, Sourcing, Bill)
- [ ] Port 3000 disponible (ou configured)
- [ ] Headers Excel vérifiés
- [ ] Sauvegarde V21_DB avant import
- [ ] Test preview réussi
- [ ] Import exécuté
- [ ] Données vérifiées dans ePilot
- [ ] Audit trail configuré

---

**Version:** 1.0.0  
**Dernière mise à jour:** 2026-07-12
