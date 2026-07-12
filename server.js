#!/usr/bin/env node

/**
 * ePilot Import Server
 * Fournit les API pour importer les données Excel vers V21
 */

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const Importer = require('./lib/import-excel-module.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  abortOnLimit: true,
}));

// Serve static files from ePilot Standalone directory
app.use(express.static(path.join(__dirname, 'ePilot Standalone')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

// Preview import
app.post('/api/import/preview', async (req, res) => {
  try {
    if (!req.files || !req.files.excel) {
      return res.status(400).json({ error: 'Excel file required' });
    }

    const file = req.files.excel;
    const tempPath = path.join(__dirname, 'temp_import_' + Date.now() + '.xlsx');

    // Save uploaded file temporarily
    await file.mv(tempPath);

    // Read and parse Excel
    const importer = new Importer();
    const readResult = await importer.readExcelFile(tempPath);

    if (!readResult) {
      fs.unlinkSync(tempPath);
      return res.status(400).json({ error: 'Failed to read Excel file' });
    }

    // Get preview
    const preview = importer.preview();

    // Apply date filters if provided
    const { dateFrom, dateTo } = req.body;
    const chantiersData = importer.fusionChantiersData(dateFrom, dateTo);

    // Clean up temp file
    fs.unlinkSync(tempPath);

    res.json({
      success: true,
      preview: {
        chantiers: {
          total: chantiersData.count,
          validated: chantiersData.data.filter(c => c._type === 'CHANTIER').length,
          devis: chantiersData.data.filter(c => c._type === 'DEVIS').length,
          sample: chantiersData.data.slice(0, 5)
        },
        sourcing: {
          total: preview.sourcing.total,
          sample: preview.sourcing.sample
        },
        factures: {
          total: preview.bill.total,
          sample: preview.bill.sample
        },
        errors: preview.errors
      },
      stats: {
        chantiers: chantiersData.count,
        sourcing: preview.sourcing.total,
        factures: preview.bill.total
      }
    });

  } catch (error) {
    console.error('Preview error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Execute import
app.post('/api/import/execute', async (req, res) => {
  try {
    if (!req.files || !req.files.excel) {
      return res.status(400).json({ error: 'Excel file required' });
    }

    const file = req.files.excel;
    const tempPath = path.join(__dirname, 'temp_import_' + Date.now() + '.xlsx');

    // Save uploaded file temporarily
    await file.mv(tempPath);

    // Read and parse Excel
    const importer = new Importer();
    const readResult = await importer.readExcelFile(tempPath);

    if (!readResult) {
      fs.unlinkSync(tempPath);
      return res.status(400).json({ error: 'Failed to read Excel file' });
    }

    // Export for V21
    const v21Data = importer.exportForV21();

    // Apply date filters if provided
    const { dateFrom, dateTo } = req.body;
    if (dateFrom || dateTo) {
      const chantiersData = importer.fusionChantiersData(dateFrom, dateTo);
      v21Data.CHANTIERS_DATA = chantiersData.data.reduce((acc, ch) => {
        acc[ch._id] = ch;
        return acc;
      }, {});
    }

    // Load existing V21 database
    const v21DbKey = 'epilot_v21_complete_db';
    let existingDb = {};
    try {
      // In a real app, this would come from a database
      // For now, we return the data to be merged on the client
    } catch (e) {}

    // Clean up temp file
    fs.unlinkSync(tempPath);

    res.json({
      success: true,
      message: 'Import completed successfully',
      data: v21Data,
      stats: {
        chantiers: Object.keys(v21Data.CHANTIERS_DATA).length,
        sourcing: v21Data.SOURCING_DATA.length,
        factures: v21Data.FACTURES_DATA.length
      }
    });

  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Import status (for large imports)
app.get('/api/import/status', (req, res) => {
  res.json({
    status: 'idle',
    lastImport: null,
    message: 'Ready for import'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ePilot Import Server`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n  🚀 Server running on http://localhost:${PORT}`);
  console.log(`\n  📊 Import API endpoints:`);
  console.log(`     POST /api/import/preview  - Preview Excel data`);
  console.log(`     POST /api/import/execute  - Execute import`);
  console.log(`     GET  /api/import/status   - Check import status`);
  console.log(`\n  📁 Static files: ePilot Standalone/`);
  console.log(`\n${'='.repeat(60)}\n`);
});
