# 🎯 HBO Cameroun — Admin Panel & Site

## 📂 Fichiers Principaux

```
/home/user/desktop-tutorial/
├── hbo-site.html          ← Site Principal (avec boutique intégrée)
├── hbo-admin.html         ← Admin Panel (gestion du contenu)
├── hero-bg.svg            ← Image de fond (transparent)
└── README-ADMIN.md        ← Ce fichier
```

---

## 🚀 Démarrage Rapide

### 1️⃣ **Lancer le serveur**
```bash
cd /home/user/desktop-tutorial
python3 -m http.server 8765
```

### 2️⃣ **Accéder aux fichiers**

**Option A — Depuis ton ordinateur:**
- Site Principal: `http://localhost:8765/hbo-site.html`
- Admin Panel: `http://localhost:8765/hbo-admin.html`

**Option B — Fichiers locaux (sans serveur):**
- Ouvre directement les fichiers `.html` dans ton navigateur

---

## 📋 Utilisation de l'Admin Panel

### **Sections Disponibles:**

| Section | Contenu |
|---------|---------|
| 🏢 **Identité** | Nom, tagline, contact, email, téléphone, horaires |
| 🎨 **Hero** | Titres, sous-titre, boutons, statistiques |
| ⚙️ **Services** | Ajouter/modifier 6 services |
| 📋 **À Propos** | Titre, description, 4 valeurs |
| 🏗️ **Projets** | Ajouter/modifier projets réalisés |
| 🛒 **Produits** | Gérer 16 équipements de la boutique |
| 📧 **Contact** | CTA et sous-titre |
| ⚡ **Paramètres** | Couleurs primaire et accent |
| 💾 **Sauvegarde** | Export/Import/Historique |

---

## 💾 Sauvegarde des Données

### **Auto-Save**
- Les données se sauvegardent automatiquement dans le navigateur
- Stockage: `localStorage` sous la clé `hbo-site-data`

### **Export (Backup)**
1. Va à l'onglet **Sauvegarde**
2. Clique **⬇️ Exporter les données**
3. Un fichier `.json` se télécharge

### **Import (Restauration)**
1. Va à l'onglet **Sauvegarde**
2. Clique **⬆️ Importer les données**
3. Sélectionne ton fichier `.json`

### **Réinitialiser**
- Clique **🗑️ Réinitialiser** pour revenir aux valeurs par défaut

---

## 🎨 Synchronisation

✅ Les données de l'Admin se synchronisent automatiquement avec le site:
- Modifie un texte dans Admin → Voir le changement sur le site
- Ajoute un service → Apparaît immédiatement sur le site
- Change les couleurs → Site se met à jour

---

## 📱 Fonctionnalités Admin

### ✨ Interface
- ✅ Sidebar de navigation
- ✅ Formulaires organisés par section
- ✅ Édition en temps réel
- ✅ Sauvegarde automatique

### 🛠️ Gestion de Contenu
- ✅ Textes (titres, descriptions, etc.)
- ✅ Arrays (services, projets, valeurs)
- ✅ Ajouter/Supprimer items
- ✅ Édition inline

### 💾 Stockage
- ✅ localStorage (navigateur)
- ✅ Export JSON
- ✅ Import JSON
- ✅ Historique des modifications

---

## 🔗 Intégration Boutique

La boutique est déjà intégrée dans le site principal:
- **16 produits** (Siemens & Schneider Electric)
- **Filtrage** par catégorie, marque, prix
- **Multi-devises** (XAF, USD, EUR)
- **Panier** avec localStorage
- **Quotation** avec envoi email

Gère les produits depuis Admin → Onglet **Produits Boutique**

---

## 🎯 Architecture

```
Admin Panel (hbo-admin.html)
        ↓ (localStorage)
    hbo-site-data
        ↓ (sync)
Site Principal (hbo-site.html)
        ↓
    Affichage du contenu
```

---

## 📖 Notes Importantes

1. **Navigateur** — Les données sont stockées localement (navigateur)
2. **Export avant changement** — Fais un backup avant modifications importantes
3. **Synchronisation** — Rafraîchis le site pour voir les changements
4. **Historique** — Consulte l'onglet Sauvegarde pour voir l'historique

---

## 🚨 Dépannage

**"Mes changements ne s'affichent pas?"**
- Rafraîchis le site (Ctrl+R ou Cmd+R)
- Vérifiez que localStorage n'est pas désactivé

**"J'ai perdu mes données?"**
- Vérifiez le localStorage du navigateur
- Importez un fichier backup `.json`

**"Admin Panel ne charge pas?"**
- Vérifiez le serveur HTTP
- Essayez d'ouvrir directement le fichier

---

## 📞 Support

Besoin d'aide? Les fichiers incluent:
- Code bien commenté
- Console.log pour déboguer
- Gestion d'erreurs

---

**Prêt à tester! 🎉**
