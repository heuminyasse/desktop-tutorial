/**
 * ePilot Excel Import Module
 * Fusionne les données Excel (Quote + JIP) vers CHANTIERS_DATA
 * Importe Sourcing et Factures
 */

const XLSX = require('xlsx'); // npm install xlsx

class ePilotExcelImporter {
  constructor() {
    this.devisData = [];
    this.jipData = [];
    this.sourcingData = [];
    this.billData = [];
    this.errors = [];
  }

  /**
   * Lire fichier Excel
   */
  async readExcelFile(filePath) {
    try {
      const workbook = XLSX.readFile(filePath);

      // Lire feuilles
      this.devisData = this._readSheet(workbook, 'Quote', 9); // Headers ligne 9
      this.jipData = this._readSheet(workbook, 'JIP', 7);     // Headers ligne 7
      this.sourcingData = this._readSheet(workbook, 'Sourcing', 7); // Headers ligne 7
      this.billData = this._readSheet(workbook, 'Bill', 8);   // Headers ligne 8

      return {
        devis: this.devisData.length,
        jip: this.jipData.length,
        sourcing: this.sourcingData.length,
        bill: this.billData.length
      };
    } catch (e) {
      this.errors.push(`Error reading Excel: ${e.message}`);
      return null;
    }
  }

  /**
   * Lire sheet avec headers à une ligne spécifique
   */
  _readSheet(workbook, sheetName, headerRow = 1) {
    if (!workbook.SheetNames.includes(sheetName)) {
      this.errors.push(`Sheet ${sheetName} not found`);
      return [];
    }

    const ws = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

    if (data.length <= headerRow) return [];

    // Get headers from specified row (convert 1-indexed to 0-indexed)
    const headers = data[headerRow - 1];
    const rows = [];

    // Read data rows after headers
    for (let i = headerRow; i < data.length; i++) {
      const row = data[i];
      if (!row || row.every(cell => !cell)) continue; // Skip empty rows

      const obj = {};
      headers.forEach((header, idx) => {
        if (header) {
          obj[header.toString().trim()] = row[idx] || null;
        }
      });

      if (Object.keys(obj).length > 0) {
        rows.push(obj);
      }
    }

    return rows;
  }

  /**
   * Fusionner DEVIS + JIP → CHANTIERS_DATA
   * Clé: Dossier (devis) = Imputation (JIP)
   */
  fusionChantiersData(filterByDateFrom = null, filterByDateTo = null) {
    const chantiers = {};
    const errors = [];

    // 1. Ajouter toutes les données de JIP d'abord
    this.jipData.forEach(jip => {
      const id = jip.Imputation || jip.imputation;
      if (!id) {
        errors.push('JIP sans Imputation');
        return;
      }

      chantiers[id] = {
        _id: id,
        Imputation: id,
        // JIP fields
        Unite: jip.Unite,
        Type: jip.Type,
        Date: jip.Date,
        Month: jip.Month,
        Year: jip.Year,
        DureeExec: jip['Duree Exec'],
        Retard: jip.Retard,
        DateDebut: jip['Date \nde debut'],
        DateFin: jip['Date \nde fin'],
        Status: jip.Status || jip.Etat,
        NumeroOA: jip.NumeroOA,
        Client: jip.Client,
        Budget: jip.Budget,
        Avancement: jip.Avancement,
        Description: jip.Description,
        _source: 'JIP',
        _type: jip.NumeroOA ? 'CHANTIER' : 'DEVIS'
      };
    });

    // 2. Enrichir avec données DEVIS (sans OA = devis non validés)
    this.devisData.forEach(devis => {
      const id = devis.Dossier;
      if (!id) {
        errors.push('Devis sans Dossier');
        return;
      }

      if (!chantiers[id]) {
        // Devis pas dans JIP = nouveau devis
        chantiers[id] = {
          _id: id,
          Imputation: id,
          Dossier: id,
          _source: 'DEVIS',
          _type: 'DEVIS'
        };
      }

      // Ajouter champs devis
      chantiers[id].Dossier = devis.Dossier;
      chantiers[id].Unite = chantiers[id].Unite || devis.Unite;
      chantiers[id].Acheteur = devis.Acheteur;
      chantiers[id].RFQ = devis.RFQ;
      chantiers[id].DateRFQ = devis.DateRFQ;
      chantiers[id].DateVisite = devis.DateVisite;
      chantiers[id].Delai = devis.Delai;
      chantiers[id].Type = chantiers[id].Type || devis.Type;
      chantiers[id].IngenieurAff = devis.IngenieurAff;
      chantiers[id].Echeance = devis.Echeance;
      chantiers[id].EtatPI = devis.EtatPI;
      chantiers[id].Client = chantiers[id].Client || devis.Client;
    });

    // 3. Appliquer filtres de date
    let result = Object.values(chantiers);
    if (filterByDateFrom || filterByDateTo) {
      result = result.filter(ch => {
        const date = new Date(ch.Date || ch.DateRFQ || ch.Echeance || '1900-01-01');
        if (filterByDateFrom && date < new Date(filterByDateFrom)) return false;
        if (filterByDateTo && date > new Date(filterByDateTo)) return false;
        return true;
      });
    }

    return { data: result, errors, count: result.length };
  }

  /**
   * Formater Sourcing avec FK vers CHANTIERS
   */
  formatSourcingData() {
    return this.sourcingData.map(row => ({
      _id: `${row.Imputation}_${row.Position || row.Rank}`,
      Imputation: row.Imputation, // FK → CHANTIERS_DATA
      Rank: row.Rank,
      Position: row.Position,
      Partnumber: row.Partnumber,
      Description: row['Description of Equip'],
      ProductCode: row.ProductCode,
      Qty: row.Qty,
      Unit: row.Unit,
      CoutAcqXAF: row.CoutAcqXAF,
      OA: row.OA,
      Poc: row.Poc,
      Unite: row.Unite
    }));
  }

  /**
   * Formater Factures avec FK vers CHANTIERS
   */
  formatBillData() {
    return this.billData.map(row => ({
      _id: `${row.Dossier}_${row.NumeroFacture || row['Ordre Fact.']}`,
      Dossier: row.Dossier, // FK → CHANTIERS_DATA
      NumeroFacture: row.NumeroFacture,
      Ordre: row.Ordre,
      Statut: row.Statut,
      Fin: row['Fin Chantier'],
      OA: row.OA,
      Unite: row.Unite,
      OrdreFacturation: row['Ordre Fact.'],
      Montant: row.Montant,
      Credit: row.Credit
    }));
  }

  /**
   * Aperçu avant import
   */
  preview() {
    const chantiers = this.fusionChantiersData();

    return {
      chantiers: {
        total: chantiers.count,
        sample: chantiers.data.slice(0, 3),
        typesRepartition: {
          CHANTIER: chantiers.data.filter(c => c._type === 'CHANTIER').length,
          DEVIS: chantiers.data.filter(c => c._type === 'DEVIS').length
        }
      },
      sourcing: {
        total: this.sourcingData.length,
        sample: this.formatSourcingData().slice(0, 3)
      },
      bill: {
        total: this.billData.length,
        sample: this.formatBillData().slice(0, 3)
      },
      errors: this.errors
    };
  }

  /**
   * Export pour localStorage (V21)
   */
  exportForV21() {
    const chantiers = this.fusionChantiersData();

    return {
      CHANTIERS_DATA: chantiers.data.reduce((acc, ch) => {
        acc[ch._id] = ch;
        return acc;
      }, {}),
      SOURCING_DATA: this.formatSourcingData(),
      FACTURES_DATA: this.formatBillData()
    };
  }
}

module.exports = ePilotExcelImporter;
