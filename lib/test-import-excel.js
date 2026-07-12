#!/usr/bin/env node

/**
 * Test: Import Excel → CHANTIERS_DATA
 */

const Importer = require('./import-excel-module.js');
const path = require('path');

async function main() {
  console.log('=' .repeat(80));
  console.log('TEST: Import Excel ePilot');
  console.log('=' .repeat(80) + '\n');

  const importer = new Importer();

  // Look for Excel file in common locations
  const possiblePaths = [
    '/root/.claude/uploads/e2c3937d-fe3f-5d36-9ff9-ea1840acd506/a0e1e6ed-ePilot.xlsm',
    './ePilot Standalone/ePilot.xlsm',
    './ePilot Standalone/*.xlsx'
  ];

  let excelFile = null;
  for (const searchPath of possiblePaths) {
    try {
      const fs = require('fs');
      if (searchPath.includes('*')) {
        // Skip glob patterns for now
        continue;
      }
      if (fs.existsSync(searchPath)) {
        excelFile = searchPath;
        break;
      }
    } catch (e) {}
  }

  if (!excelFile) {
    console.log('⚠️  No Excel file found for testing.');
    console.log('Expected file at:');
    possiblePaths.forEach(p => console.log(`  - ${p}`));
    console.log('\nModule is ready. Run import via API server.');
    console.log('\nExample usage:');
    console.log('  npm start');
    console.log('  curl -X POST http://localhost:3000/api/import/preview \\');
    console.log('    -F "excel=@ePilot.xlsm"');
    process.exit(0);
  }

  console.log('Step 1: Read Excel file\n');

  const readResult = await importer.readExcelFile(excelFile);
  if (!readResult) {
    console.log('❌ Failed to read Excel');
    process.exit(1);
  }

  console.log('✓ Excel loaded:');
  console.log(`  Quote: ${readResult.devis} rows`);
  console.log(`  JIP: ${readResult.jip} rows`);
  console.log(`  Sourcing: ${readResult.sourcing} rows`);
  console.log(`  Bill: ${readResult.bill} rows\n`);

  console.log('Step 2: Preview fusion\n');

  const preview = importer.preview();

  console.log('CHANTIERS (Quote + JIP fused):');
  console.log(`  Total: ${preview.chantiers.total}`);
  console.log(`  Chantiers (validés): ${preview.chantiers.typesRepartition.CHANTIER}`);
  console.log(`  Devis (non-validés): ${preview.chantiers.typesRepartition.DEVIS}`);
  console.log(`\n  Sample (premier chantier):`);
  if (preview.chantiers.sample.length > 0) {
    const ch = preview.chantiers.sample[0];
    console.log(`    ID: ${ch._id}`);
    console.log(`    Client: ${ch.Client}`);
    console.log(`    Unite: ${ch.Unite}`);
    console.log(`    Type: ${ch.Type}`);
    console.log(`    Date: ${ch.Date}`);
    console.log(`    NumeroOA: ${ch.NumeroOA || '(aucun - devis)'}`);
    console.log(`    Budget: ${ch.Budget}`);
    console.log(`    Status: ${ch.Status}`);
    console.log(`    Type: ${ch._type}`);
  }

  console.log(`\nSOURCING (Commandes):`);
  console.log(`  Total: ${preview.sourcing.total}`);
  if (preview.sourcing.sample.length > 0) {
    const s = preview.sourcing.sample[0];
    console.log(`  Sample:`);
    console.log(`    Imputation: ${s.Imputation}`);
    console.log(`    Description: ${s.Description}`);
    console.log(`    Qty: ${s.Qty}`);
    console.log(`    Cout: ${s.CoutAcqXAF}`);
  }

  console.log(`\nFACTURES (Bills):`);
  console.log(`  Total: ${preview.bill.total}`);
  if (preview.bill.sample.length > 0) {
    const b = preview.bill.sample[0];
    console.log(`  Sample:`);
    console.log(`    Dossier: ${b.Dossier}`);
    console.log(`    NumeroFacture: ${b.NumeroFacture}`);
    console.log(`    Montant: ${b.Montant}`);
    console.log(`    Statut: ${b.Statut}`);
  }

  if (preview.errors.length > 0) {
    console.log(`\n⚠️  Errors (${preview.errors.length}):`);
    preview.errors.slice(0, 5).forEach(err => console.log(`  - ${err}`));
  }

  console.log('\n' + '='.repeat(80));
  console.log('Step 3: Export format\n');

  const exported = importer.exportForV21();

  console.log(`✓ Ready to import into V21 database:`);
  console.log(`  CHANTIERS_DATA: ${Object.keys(exported.CHANTIERS_DATA).length} items`);
  console.log(`  SOURCING_DATA: ${exported.SOURCING_DATA.length} items`);
  console.log(`  FACTURES_DATA: ${exported.FACTURES_DATA.length} items`);

  console.log('\n✅ Import test complete!');
}

main().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
