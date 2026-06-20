const fs=require('fs'),zlib=require('zlib');
const FILE='/home/user/desktop-tutorial/ePilot Standalone/ePilot v20_standalone.html';
let html=fs.readFileSync(FILE,'utf8');
const manM=html.match(/(<script type="__bundler\/manifest">)([\s\S]*?)(<\/script>)/);
const manifest=JSON.parse(manM[2]);
const key=Object.keys(manifest).find(k=>k.indexOf('d8d3bb82')===0);
let js=zlib.gunzipSync(Buffer.from(manifest[key].data,'base64')).toString('utf8');
if(js.indexOf("'PO','Montant total'")>=0){ console.log('PO table already patched'); process.exit(0); }
const fnStart=js.indexOf('function _rCommandes(el)'); if(fnStart<0) throw new Error('_rCommandes not found');
const fnEnd=js.indexOf('function _rBL', fnStart); if(fnEnd<0) throw new Error('fnEnd not found');
let fn=js.slice(fnStart,fnEnd);
// 1) header array
const OLDARR="['PI','N° OA','Code','Désignation','Unité','Qté','Valeur XAF','Statut','Vendeur']";
const NEWARR="['PO','Montant total','Vendeur','PI','Unité','Date PO','Statut','Code','Désignation','Qté']";
if(fn.indexOf(OLDARR)<0) throw new Error('header array not found'); fn=fn.replace(OLDARR,NEWARR);
// 2) align
const OLDAL="(i>=5&&i<=6?'right':'left')"; const NEWAL="(i===1||i===9?'right':'left')";
if(fn.indexOf(OLDAL)<0) throw new Error('align not found'); fn=fn.replace(OLDAL,NEWAL);
// 3) body range
const bs=fn.indexOf("body += '<tr style=\"border-bottom:1px solid #e5e7eb;\" data-row=\"'+rowIdx+'\">'");
if(bs<0) throw new Error('body start not found');
const beMark="+ '</tr>';"; const be=fn.indexOf(beMark, bs); if(be<0) throw new Error('body end not found');
const newBody=fs.readFileSync('/tmp/po_newbody.txt','utf8').replace(/\n$/,'');
fn=fn.slice(0,bs)+newBody+fn.slice(be+beMark.length);
// 4) colspan
fn=fn.replace('colspan="9" style="text-align:center;padding:30px;color:#aaa;">Aucun article trouvé','colspan="10" style="text-align:center;padding:30px;color:#aaa;">Aucun article trouvé');
js=js.slice(0,fnStart)+fn+js.slice(fnEnd);
new Function(js); // syntax gate
const gz=zlib.gzipSync(Buffer.from(js,'utf8'),{level:9}).toString('base64');
manifest[key].data=gz;
html=html.slice(0,manM.index)+manM[1]+JSON.stringify(manifest)+manM[3]+html.slice(manM.index+manM[0].length);
fs.writeFileSync(FILE,html);
console.log('PO table patched + validated. fn len',fn.length);
