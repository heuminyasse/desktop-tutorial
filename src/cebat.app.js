/* Cebat — code applicatif (JS via React.createElement, transpilé au runtime par Babel).
   ⚠ NE PAS éditer Cebat_v28.html directement : éditer CE fichier puis `npm run build`.
   Globals injectés au runtime par dc-runtime : DCLogic, React. */
/* eslint-env browser */
/* global DCLogic, React */

class Component extends DCLogic {
  state = {
    view:'dashboard', theme:'light',
    project:{nom:'Résidence Les Lilas',adresse:'12 Rue des Lilas, 75001 Paris',client:'M. Jean Dupont',tel:'06 12 34 56 78',email:'j.dupont@gmail.com',typeAlim:'monophase',puissanceSouscrite:12,annee:2024,typeConstruction:'immeuble'},
    projectDraft:null,
    niveaux:[{id:1,nom:'Rez-de-chaussee',etage:0,typeNiv:'rdc'}],
    appartements:[{id:1,niveauId:1,nom:'Appartement 1',type:'appartement',surface:80,code:'RDC-A',appCode:'APP01'}],
    pieces:[{id:1,appId:1,pieceCode:'PC001',nom:'Sejour',type:'sejour',surface:25,niveau:'standard',couleur:'#F5F0E8',typePlafond:'standard',typeMur:'enduit',typeSol:'carrelage',fonctions:[{id:1,type:'eclairage',typeLampe:'led_plafond',puissance:12,quantite:1,ref:'1L1'}]}],

    tableauxElec:[{id:2,nom:'Tableau General',type:'principal',appId:1,pieceId:null,description:'TGBT principal',departId:1,cb0Code:'1CB0',code:'1TE1'}],
    departs:[{id:1,nom:'Reseau ENEO',type:'comptage',calibre:60,poles:4,courbe:'S',tension:'mono',ddr:300,code:'AR01',dbCode:'DB1'}],
    inverseurs:[],
    
    boitesDeriv:[{id:3,nom:'1BD1',label:'Sejour',type:'encastre',tableauId:2,pieceId:1,position:'',hauteurPlafond:30,cote:'plafond',description:''}],
    disjoncteurs:[{id:5,code:'1CB1',recepteurs:['1L1'],pieceId:1,calibre:10,courbe:'B',poles:'1',ddr:30,section:1.5,tableauId:2}],
    interrupteurs:[],
    zonesCommande:[{id:4,nom:'Zone Sejour',pieceId:1,position:'',hauteur:120,cote:'gauche',zoneCode:'ZC1'}],
    nextNivId:2,nextAppId:2,nextPieceId:2,nextFonctionId:2,nextElemId:6,
    filterNivId:null,filterAppId:null,
    selectedLogAppId:null,selectedLogPieceId:null,selectedFnId:null,
    showModal:false,modalType:null,editId:null,
    nivForm:{nom:'',typeNiv:'etage',etage:2},
    appForm:{nom:'',type:'appartement',surface:80,niveauId:1,code:'',position:''},
    pieceForm:{nom:'',type:'sejour',surface:20,niveau:'standard',loadMode:'default',appId:1,couleur:'#FFFFFF',typePlafond:'standard',typeMur:'enduit',typeSol:'carrelage'},
    fonctionForm:{type:'eclairage',typeLampe:'led_plafond',puissance:12,quantite:1},
    selectedPieceId:null,
    tableauElecForm:{nom:'',pieceId:'',description:'',type:'principal',appId:'',departId:'',raccordType:'bornier',raccordIdx:1},departForm:{nom:'',type:'comptage',calibre:60,poles:4,courbe:'S',tableauElecId:'',pieceId:'',description:'',emplacement:'',tension:'mono',ddr:300},editDepartId:null,deletePieceTargetId:null,deleteAppTargetId:null,deleteFnTarget:{pieceId:null,fnId:null},
    
    boiteForm:{nom:'',label:'',pieceId:'',type:'encastre',tableauId:'',position:'',hauteurPlafond:30,cote:'plafond',description:'',raccordType:'connecteur',raccordIdx:1,retourDepart:false,retourEditFonction:false},
    interForm:{nom:'',pieceId:'',type:'simple',circuitRef:'',zoneId:''},
    zoneForm:{nom:'',pieceId:'',position:'',hauteur:120,cote:'gauche',retourEditFonction:false,retourInter:false},
    expandedPiece:null,tests:{},armoire:{L:600,H:800,P:250,ip:'IP55',cutouts:[]},armoireFace:'porte',armoireSel:null,armoireShape:'voyant',armoireDrag:null,realisationTab:'bord',realisationFilter:{appId:null,pieceId:null,teId:null,bdId:null},realisationChecks:{},mesures:{},nomenclatureOverrides:{},toast:null,circuitFilter:'all',circuitsTab:'distribution',circuitsSel:{srcId:null,teId:null,cbId:null,bdId:null},editFonctionForm:{type:'eclairage',typeLampe:'led_plafond',puissance:12,quantite:1,distance:0,cmdType:'simple',cmdZoneId:'',cmdZone2Id:'',newZoneNom:'',showNewZone:false,djCalibre:10,djCourbe:'B',djPoles:'1',djDDR:30,djTableauId:'',djSection:1.5,departType:'tableau',departId:'',departDist:0,cableLongueur:0,cableSection:'1.5',cableType:'H07VU',cableRepere:'',nbConducteursConn:0,repBagues:false},editFonctionPieceId:null,editFonctionId:null,
  };

  // ═══ PERSISTANCE (localStorage + export/import JSON) ═══
  _STORE_KEY='cebat_v28_state';
  _PROJ_INDEX='cebat_v28_projects';
  _PROJ_CUR='cebat_v28_current';
  _PERSIST_KEYS=['project','niveaux','appartements','pieces','tableauxElec','departs','inverseurs','boitesDeriv','disjoncteurs','interrupteurs','zonesCommande','nextNivId','nextAppId','nextPieceId','nextFonctionId','nextElemId','theme','view','nomenclatureOverrides','realisationChecks','mesures','tests','armoire','focusMode','poseStatuts','poseMeta','poseOperator'];
  _projKey(id){return 'cebat_v28_p_'+id;}
  _snapshot(){const o={};for(const k of this._PERSIST_KEYS)if(this.state[k]!==undefined)o[k]=this.state[k];return o;}
  _pickPersist(d){const o={};for(const k of this._PERSIST_KEYS)if(d&&d[k]!==undefined)o[k]=d[k];return o;}
  _loadIndex(){try{const a=JSON.parse(localStorage.getItem(this._PROJ_INDEX)||'[]');return Array.isArray(a)?a:[];}catch(e){return[];}}
  _saveIndex(idx){try{localStorage.setItem(this._PROJ_INDEX,JSON.stringify(idx));}catch(e){}}
  _nowStamp(){try{return new Date().toISOString();}catch(e){return '';}}
  _genProjId(){try{return 'P'+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);}catch(e){return 'P'+Math.floor(Math.random()*1e9).toString(36);}}
  _saveState(){
    try{
      const id=this._curProjId;if(!id)return;
      localStorage.setItem(this._projKey(id),JSON.stringify(this._snapshot()));
      const idx=this._loadIndex();const e=idx.find(p=>p.id===id);
      const nm=(this.state.project&&this.state.project.nom)||'Projet';
      if(e){e.name=nm;e.savedAt=this._nowStamp();}else{idx.push({id,name:nm,savedAt:this._nowStamp()});}
      this._saveIndex(idx);
      try{if(typeof document!=='undefined'&&this.state.project)document.title='Cebat — '+(this.state.project.nom||'Projet');}catch(e){}
    }catch(e){}
  }
  _applyProject(id,extra){
    this._curProjId=id;try{localStorage.setItem(this._PROJ_CUR,String(id));}catch(e){}
    let d={};try{const raw=localStorage.getItem(this._projKey(id));d=raw?JSON.parse(raw):{};}catch(e){d={};}
    const base=this._pristine?JSON.parse(JSON.stringify(this._pristine)):{};
    this.setState({...base,...this._pickPersist(d),showModal:false,selectedLogAppId:null,selectedLogPieceId:null,...(extra||{})});
  }
  setState(update,cb){super.setState(update,cb);this._saveState();}
  componentDidMount(){
    try{
      if(!this._pristine){this._pristine={};for(const k of this._PERSIST_KEYS)this._pristine[k]=JSON.parse(JSON.stringify(this.state[k]));}try{if(typeof document!=='undefined'&&!document.getElementById('cebat-print-css')){const st=document.createElement('style');st.id='cebat-print-css';st.textContent='@media print{@page{margin:14mm;}body *{visibility:hidden !important;}[data-print="main"],[data-print="main"] *{visibility:visible !important;}[data-print="main"]{position:absolute !important;left:0;top:0;width:100%;height:auto !important;overflow:visible !important;background:#fff !important;}[data-print="main"] *{overflow:visible !important;max-height:none !important;box-shadow:none !important;}html,body{height:auto !important;overflow:visible !important;background:#fff !important;}[data-print="hide"]{display:none !important;}}@media (max-width:1024px){.cbt-auto{grid-template-columns:repeat(3,1fr) !important;}.cbt-2to1{grid-template-columns:1fr !important;}.cbt-sidebar{width:184px !important;}}@media (max-width:680px){.cbt-auto{grid-template-columns:repeat(2,1fr) !important;}.cbt-sidebar{width:152px !important;}}@media (max-width:680px){.cbt-burger{display:inline-flex !important;}.cbt-sidebar{position:fixed !important;left:0;top:52px;bottom:0;width:210px !important;z-index:250;transform:translateX(-110%);transition:transform .2s ease;box-shadow:0 10px 40px rgba(0,0,0,.3);}.cbt-sidebar.cbt-sb-open{transform:translateX(0);}.cbt-logements{flex-direction:column !important;height:auto !important;overflow:visible !important;}.cbt-logements>div{width:100% !important;flex:0 0 auto !important;border-right:none !important;border-bottom:1px solid rgba(120,120,120,.25) !important;min-height:220px;}}@media (max-width:680px){.cbt-hide-sm{display:none !important;}}@media (max-width:1024px){.cbt-rgrid5{grid-template-columns:repeat(3,1fr) !important;}}@media (max-width:680px){.cbt-rgrid5{grid-template-columns:repeat(2,1fr) !important;}}';document.head.appendChild(st);}}catch(e){}
      let idx=this._loadIndex();let cur=null;try{cur=localStorage.getItem(this._PROJ_CUR);}catch(e){}
      if(idx.length===0){
        const id=this._genProjId();let legacy=null;try{legacy=localStorage.getItem(this._STORE_KEY);}catch(e){}
        try{localStorage.setItem(this._projKey(id),legacy||JSON.stringify(this._snapshot()));}catch(e){}
        idx=[{id,name:(this.state.project&&this.state.project.nom)||'Projet',savedAt:this._nowStamp()}];
        this._saveIndex(idx);cur=id;try{localStorage.removeItem(this._STORE_KEY);}catch(e){}
      }
      if(!cur||!idx.find(p=>p.id===cur))cur=idx[0].id;
      this._applyProject(cur);
    }catch(e){}
  }
  projSwitch(id){if(!id||id===this._curProjId)return;if(!this._loadIndex().some(p=>p.id===id)){this.showToast('Projet introuvable');return;}this._saveState();this._applyProject(id);this.showToast('Projet charge');}
  projNew(){
    this._saveState();const id=this._genProjId();
    const fresh=this._pristine?JSON.parse(JSON.stringify(this._pristine)):this._snapshot();
    fresh.project={...fresh.project,nom:'Nouveau projet'};
    const idx=this._loadIndex();idx.push({id,name:fresh.project.nom,savedAt:this._nowStamp()});this._saveIndex(idx);
    this._curProjId=id;try{localStorage.setItem(this._PROJ_CUR,String(id));localStorage.setItem(this._projKey(id),JSON.stringify(fresh));}catch(e){}
    this.setState({...fresh,showModal:false,selectedLogAppId:null,selectedLogPieceId:null,view:'projet'});
    this.showToast('Nouveau projet cree');
  }
  projDuplicate(){
    this._saveState();const id=this._genProjId();const snap=this._snapshot();
    snap.project={...snap.project,nom:((snap.project&&snap.project.nom)||'Projet')+' (copie)'};
    const idx=this._loadIndex();idx.push({id,name:snap.project.nom,savedAt:this._nowStamp()});this._saveIndex(idx);
    this._curProjId=id;try{localStorage.setItem(this._PROJ_CUR,String(id));localStorage.setItem(this._projKey(id),JSON.stringify(snap));}catch(e){}
    this.setState({...snap});this.showToast('Projet duplique');
  }
  projRename(name){if(!name||!name.trim())return;this.setState(s=>({project:{...s.project,nom:name.trim()}}));this.showToast('Projet renomme');}
  projDelete(id){
    let idx=this._loadIndex();if(idx.length<=1){this.showToast('Impossible de supprimer le dernier projet');return;}
    const wasCur=(id===this._curProjId);idx=idx.filter(p=>p.id!==id);this._saveIndex(idx);
    try{localStorage.removeItem(this._projKey(id));}catch(e){}
    if(wasCur)this._applyProject(idx[0].id);else this.setState({});
    this.showToast('Projet supprime');
  }
  renderProjMenu(){
    const c=this.C;const r=this.r;const idx=this._loadIndex();const cur=this._curProjId||'';
    const tb={background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.25)',borderRadius:7,height:26,minWidth:26,cursor:'pointer',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'#fff',fontFamily:c.font,padding:'0 7px'};
    return r('div',{style:{display:'flex',alignItems:'center',gap:5}},
      r('select',{value:cur,title:'Projet courant',onChange:e=>this.projSwitch(e.target.value),style:{...tb,fontSize:11,fontWeight:700,maxWidth:170,padding:'0 8px'}},
        idx.length===0?r('option',{value:''},'—'):null,
        ...idx.map(p=>r('option',{key:p.id,value:p.id,style:{color:'#111827'}},p.name||'Projet'))),
      r('button',{onClick:()=>this.projNew(),title:'Nouveau projet',style:tb},'+'),
      r('button',{onClick:()=>this.projDuplicate(),title:'Dupliquer ce projet',style:tb},'⧉'),
      r('button',{onClick:()=>{const n=window.prompt('Renommer le projet :',(this.state.project&&this.state.project.nom)||'');if(n)this.projRename(n);},title:'Renommer le projet',style:tb},'✎'),
      r('button',{onClick:()=>{if(idx.length>1){if(window.confirm('Supprimer definitivement ce projet ?'))this.projDelete(cur);}else this.showToast('Impossible de supprimer le dernier projet');},title:'Supprimer le projet',style:{...tb,color:'#fecaca'}},'\u{1F5D1}')
    );
  }
  printLandscape(){
    try{
      if(typeof document!=='undefined'&&!document.getElementById('cebat-land')){const st=document.createElement('style');st.id='cebat-land';st.textContent='@media print{@page{size:A4 landscape;margin:10mm;}}';document.head.appendChild(st);}
      const cleanup=()=>{const e=document.getElementById('cebat-land');if(e)e.remove();window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);
      window.print();
    }catch(e){try{window.print();}catch(_){}}
  }
  _schemaPrims(teId){
    const s=this.state;const{departs,tableauxElec,disjoncteurs,pieces}=s;
    const refPiece={},refType={};
    pieces.forEach(p=>(p.fonctions||[]).forEach(fn=>{refPiece[fn.ref]=p.nom;refType[fn.ref]=fn.type;}));
    const TYPEA=new Set(['prises_sdb','lave_linge','four','borne_ve','climatisation','chauffe_eau']);
    const prims=[];
    const RC=(x,y,w,h,f,st,rx)=>prims.push({k:'r',x,y,w,h,f,s:st,rx:rx||6});
    const TX=(x,y,t,sz,f,w)=>prims.push({k:'t',x,y,t,z:sz||11,f:f||'#111827',w:w||400});
    const LN=(x1,y1,x2,y2,col)=>prims.push({k:'l',x1,y1,x2,y2,c:col||'#9CA3AF'});
    const W=1180;let y=24;
    TX(20,y,'Schema unifilaire — '+((s.project&&s.project.nom)||''),16,'#0f172a',700);y+=16;
    TX(20,y,'Source -> AGCP -> Tete -> Differentiel -> Divisionnaire -> Recepteur',10,'#6B7280',400);y+=22;
    TX(20,y,'Fils IEC 60446 :',9,'#374151',700);let _lx=120;[['L1','#6d4c41'],['L2','#212121'],['L3','#9e9e9e'],['N','#42a5f5'],['PE','#43a047']].forEach(w=>{RC(_lx,y-8,12,9,w[1],w[1],2);TX(_lx+16,y,w[0],8,'#374151');_lx+=44;});y+=20;
    let x=20;
    (departs||[]).forEach(d=>{RC(x,y,160,48,'#E6F0F7','#0277BD',8);TX(x+10,y+18,d.code||'SRC',11,'#0277BD',700);TX(x+10,y+32,(d.calibre||'?')+'A '+(d.poles||'')+'P',9,'#6B7280');TX(x+10,y+44,'AGCP '+(d.dbCode||'DB')+(d.ddr?' '+d.ddr+'mA':''),9,'#6B7280');x+=180;});
    y+=48+26;
    const rowH=30,brkX=320,recX=452,diffX=170,teteX=20;
    (teId?(tableauxElec||[]).filter(t=>t.id===teId):(tableauxElec||[])).forEach(te=>{
      const djs=disjoncteurs.filter(d=>d.tableauId===te.id);
      const gmap={};djs.forEach(d=>{const k=(+d.ddr||0);(gmap[k]=gmap[k]||[]).push(d);});
      const groups=this.rangeesOf(te.id).map(rw=>{const ds=[...new Set(rw.brs.map(d=>+d.ddr||0))];return{ddr:ds.length===1?ds[0]:0,mixed:ds.length>1,rangee:rw.rangee,brs:rw.brs};});
      const totalRows=Math.max(1,djs.length);const teH=totalRows*rowH+24;
      const br=this._boardRows(te);TX(20,y,(te.code||'TE')+' — '+(te.nom||'')+'   ['+br.usedModules+' mod / '+br.nbRangees+' rg]',12,'#0277BD',700);
      const startY=y+10;const teteY=startY+(teH-44)/2;
      RC(teteX,teteY,96,42,'#E6F0F7','#0277BD',6);TX(teteX+8,teteY+17,'TETE',8,'#0277BD',700);TX(teteX+8,teteY+33,te.cb0Code||'CB0',12,'#0277BD',700);
      const teteCx=teteX+96,teteCy=teteY+21;let ry=startY+6;
      groups.forEach((g,gi)=>{
        const gRows=g.brs.length;const gTop=ry,gBottom=ry+gRows*rowH;const diffCy=(gTop+gBottom)/2;
        const typeA=g.brs.some(d=>(d.recepteurs||[]).some(rf=>TYPEA.has(refType[rf])));
        LN(teteCx,teteCy,diffX-12,teteCy);LN(diffX-12,teteCy,diffX-12,diffCy);LN(diffX-12,diffCy,diffX,diffCy);
        RC(diffX,diffCy-17,128,34,'#E0F7FA','#06b6d4',6);TX(diffX+8,diffCy-3,'R'+g.rangee+' ID '+(g.mixed?'mix':(g.ddr>0?g.ddr+'mA':'—')),9,'#0e7490',700);TX(diffX+8,diffCy+11,g.mixed?'mixte':(g.ddr>0?(typeA?'Type A':'Type AC'):'sans DDR'),8,'#6B7280');
        const _fb=ry+rowH/2,_lb=ry+(gRows-1)*rowH+rowH/2,_bt=Math.min(diffCy,_fb)-1,_bb=Math.max(diffCy,_lb)+1;RC(brkX-13,_bt,3,_bb-_bt,'#0277BD','#0277BD',1);
        g.brs.forEach((d,bi)=>{
          const bcy=ry+bi*rowH+rowH/2;
          LN(diffX+128,diffCy,brkX-12,diffCy,'#CBD5E1');LN(brkX-12,diffCy,brkX-12,bcy,'#CBD5E1');LN(brkX-12,bcy,brkX,bcy,'#CBD5E1');
          const okSec=this.sectionOkForCalibre(d.section,d.calibre);const col=okSec?'#16a34a':'#dc2626';
          RC(brkX,bcy-12,118,24,okSec?'#E8F5E9':'#FDECEA',col,5);TX(brkX+6,bcy-1,d.code||'CB',10,col,700);TX(brkX+6,bcy+10,(d.calibre||'?')+'A'+(d.courbe||'')+' '+(d.section||'?')+'mm2',8,'#6B7280');
          const refs=(d.recepteurs||[]);const shown=refs.slice(0,7).map(rf=>rf+(refPiece[rf]?'('+refPiece[rf]+')':'')).join('  ')+(refs.length>7?'  +'+(refs.length-7):'');
          let wc='';try{wc=this.genCableCBCode(d,s);}catch(e){}LN(brkX+118,bcy,recX-6,bcy,'#CBD5E1');if(wc)TX(brkX+122,bcy-3,wc,7,'#7c3aed',700);TX(recX,bcy+4,refs.length?shown:'(aucun)',9,'#374151');
        });
        ry=gBottom+6;
      });
      y=startY+teH+18;
    });
    const contentH=y+10;const cartH=92,fm=10;const H=contentH+cartH;
    RC(fm,fm,W-2*fm,H-2*fm,'none','#94a3b8',2);
    const cbW=480,cbH=74,cbX=W-fm-cbW,cbY=H-fm-cbH;
    RC(cbX,cbY,cbW,cbH,'#F8FAFC','#64748B',2);LN(cbX+250,cbY,cbX+250,cbY+cbH,'#64748B');
    let dateStr='';try{dateStr=new Date().toLocaleDateString('fr-FR');}catch(e){}
    const proj=s.project||{};
    TX(cbX+10,cbY+16,'PROJET : '+(proj.nom||'—'),11,'#0f172a',700);TX(cbX+10,cbY+31,'Client : '+(proj.client||'—'),9,'#374151');TX(cbX+10,cbY+46,'Adr. : '+(proj.adresse||'—'),9,'#374151');TX(cbX+10,cbY+61,'Bureau : '+(proj.bureau||'—'),9,'#374151');
    TX(cbX+260,cbY+16,'SCHEMA UNIFILAIRE',10,'#0277BD',700);TX(cbX+260,cbY+31,'Dessinateur : '+(proj.dessinateur||'—'),9,'#374151');TX(cbX+260,cbY+46,'Date : '+dateStr+'    Indice : '+(proj.indice||'—'),9,'#374151');TX(cbX+260,cbY+61,'Feuille : 1/1    NF C 15-100',9,'#374151');
    return{W,H,prims};
  }
  schemaSVG(teId){
    const o=this._schemaPrims(teId);
    const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const P=o.prims.map(p=>p.k==='r'?'<rect x="'+p.x+'" y="'+p.y+'" width="'+p.w+'" height="'+p.h+'" rx="'+(p.rx||0)+'" fill="'+(p.f==='none'?'none':p.f)+'" stroke="'+p.s+'" stroke-width="1.5"/>':p.k==='l'?'<line x1="'+p.x1+'" y1="'+p.y1+'" x2="'+p.x2+'" y2="'+p.y2+'" stroke="'+p.c+'" stroke-width="2"/>':'<text x="'+p.x+'" y="'+p.y+'" font-family="monospace" font-size="'+p.z+'" fill="'+p.f+'" font-weight="'+p.w+'">'+esc(p.t)+'</text>');
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+o.W+'" height="'+o.H+'" viewBox="0 0 '+o.W+' '+o.H+'"><rect width="'+o.W+'" height="'+o.H+'" fill="#ffffff"/>'+P.join('')+'</svg>';
  }
  schemaDXF(teId){
    const o=this._schemaPrims(teId);const H=o.H;const out=['0','SECTION','2','ENTITIES'];
    const yf=v=>(H-v).toFixed(2);
    const line=(x1,y1,x2,y2)=>{out.push('0','LINE','8','SCHEMA','10',(+x1).toFixed(2),'20',yf(y1),'11',(+x2).toFixed(2),'21',yf(y2));};
    const text=(x,y,t,h)=>{out.push('0','TEXT','8','SCHEMA','10',(+x).toFixed(2),'20',yf(y),'40',((+h)||10).toFixed(2),'1',String(t==null?'':t).replace(/\n/g,' '));};
    o.prims.forEach(p=>{
      if(p.k==='r'){line(p.x,p.y,p.x+p.w,p.y);line(p.x+p.w,p.y,p.x+p.w,p.y+p.h);line(p.x+p.w,p.y+p.h,p.x,p.y+p.h);line(p.x,p.y+p.h,p.x,p.y);}
      else if(p.k==='l'){line(p.x1,p.y1,p.x2,p.y2);}
      else{text(p.x,p.y,p.t,p.z);}
    });
    out.push('0','ENDSEC','0','EOF');return out.join('\n');
  }
  printSchemaSheets(){
    try{
      const boards=this.state.tableauxElec||[];
      if(boards.length===0){this.showToast('Aucun tableau');return;}
      const sheets=boards.map((te,i)=>'<div style="page-break-after:'+(i<boards.length-1?'always':'auto')+';text-align:center;">'+this.schemaSVG(te.id)+'</div>').join('');
      const cont=document.createElement('div');cont.id='cebat-sheets';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';cont.innerHTML=sheets;
      document.body.appendChild(cont);
      const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
      if(!document.getElementById('cebat-land')){const st=document.createElement('style');st.id='cebat-land';st.textContent='@media print{@page{size:A4 landscape;margin:8mm;}#cebat-sheets svg{max-width:100% !important;height:auto !important;}}';document.head.appendChild(st);}
      const cleanup=()=>{const e=document.getElementById('cebat-land');if(e)e.remove();cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);
      window.print();
    }catch(e){this.showToast('Echec impression feuilles');}
  }
  printLabels(){
    try{
      const djs=this.state.disjoncteurs||[];if(djs.length===0){this.showToast('Aucun disjoncteur');return;}
      const pcs=this.state.pieces||[];const refPiece={};pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{refPiece[fn.ref]=p.nom;}));
      const teName=id=>{const t=(this.state.tableauxElec||[]).find(x=>x.id===id);return t?(t.code||t.nom||''):'';};
      const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const ordered=[];(this.state.tableauxElec||[]).forEach(t=>{this.rangeesOf(t.id).forEach(rw=>rw.brs.forEach(d=>ordered.push(d)));});
      const _seen=new Set(ordered.map(d=>d.id));djs.forEach(d=>{if(!_seen.has(d.id))ordered.push(d);});
      const labels=ordered.map(d=>{
        const refs=(d.recepteurs||[]);const room=refs.map(rf=>refPiece[rf]).filter(Boolean)[0]||'';
        let wc='';try{wc=this.genCableCBCode(d,this.state);}catch(e){}
        return '<div style="display:inline-block;width:48mm;height:13mm;border:1px solid #333;border-radius:1mm;padding:1mm 2mm;margin:1mm;box-sizing:border-box;vertical-align:top;font-family:monospace;overflow:hidden;">'
          +'<div style="font-size:9pt;font-weight:800;color:#0277BD;">'+esc(d.code||'CB')+' <span style="font-size:6pt;color:#666;">'+esc(teName(d.tableauId))+'</span></div>'
          +'<div style="font-size:6.5pt;color:#333;">'+esc((d.calibre||'?')+'A '+(d.courbe||'')+' '+(d.section||'?')+'mm2 '+(d.ddr?d.ddr+'mA':'-'))+'</div>'
          +'<div style="font-size:6.5pt;color:#333;">'+esc((room||'')+(refs.length?' '+refs.slice(0,3).join(' '):''))+(wc?' <span style="color:#7c3aed;">'+esc(wc)+'</span>':'')+'</div>'
          +'</div>';
      }).join('');
      const cont=document.createElement('div');cont.id='cebat-labels';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';
      cont.innerHTML='<div style="padding:4mm;">'+labels+'</div>';
      document.body.appendChild(cont);
      const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
      if(!document.getElementById('cebat-lblcss')){const st=document.createElement('style');st.id='cebat-lblcss';st.textContent='@media print{@page{size:A4 portrait;margin:8mm;}}';document.head.appendChild(st);}
      const cleanup=()=>{const e=document.getElementById('cebat-lblcss');if(e)e.remove();cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);window.print();
    }catch(e){this.showToast('Echec impression etiquettes');}
  }
  exportSchemaDXF(teId){
    try{
      const dxf=this.schemaDXF(teId);const blob=new Blob([dxf],{type:'application/dxf'});const url=URL.createObjectURL(blob);
      const a=document.createElement('a');const slug=(((this.state.project||{}).nom)||'projet').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase()||'projet';
      a.href=url;a.download='cebat_schema_'+slug+(teId?'_t'+teId:'')+'.dxf';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      this.showToast('Schema DXF exporte');
    }catch(e){this.showToast('Echec export DXF');}
  }
  exportSchemaSVG(teId){
    try{
      const svg=this.schemaSVG();const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);
      const a=document.createElement('a');const slug=(((this.state.project||{}).nom)||'projet').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase()||'projet';
      a.href=url;a.download='cebat_schema_'+slug+(teId?'_t'+teId:'')+'.svg';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      this.showToast('Schema SVG exporte');
    }catch(e){this.showToast('Echec export SVG');}
  }
  exportSchemaPNG(teId){
    try{
      const svg=this.schemaSVG();const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);
      const img=new Image();
      img.onload=()=>{
        try{
          const scale=2;const canvas=document.createElement('canvas');canvas.width=img.width*scale;canvas.height=img.height*scale;
          const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.scale(scale,scale);ctx.drawImage(img,0,0);
          URL.revokeObjectURL(url);
          canvas.toBlob(bl=>{if(!bl){this.showToast('Echec export PNG');return;}const u=URL.createObjectURL(bl);const a=document.createElement('a');const slug=(((this.state.project||{}).nom)||'projet').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase()||'projet';a.href=u;a.download='cebat_schema_'+slug+(teId?'_t'+teId:'')+'.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);this.showToast('Schema PNG exporte');},'image/png');
        }catch(e){this.showToast('Echec export PNG');}
      };
      img.onerror=()=>{URL.revokeObjectURL(url);this.showToast('Echec export PNG');};
      img.src=url;
    }catch(e){this.showToast('Echec export PNG');}
  }
  exportJSON(){
    try{
      const data={app:'Cebat',version:'v28',exportedAt:new Date().toISOString(),state:this._snapshot()};
      const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      const slug=((this.state.project&&this.state.project.nom)||'projet').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase()||'projet';
      a.href=url;a.download='cebat_'+slug+'.json';
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
      this.showToast('Projet exporte');
    }catch(e){this.showToast("Echec de l'export");}
  }
  exportCSV(){
    try{
      const s=this.state;
      const apps=s.appartements||[],pcs=s.pieces||[],tes=s.tableauxElec||[],djs=s.disjoncteurs||[],deps=s.departs||[],bds=s.boitesDeriv||[],inters=s.interrupteurs||[],zones=s.zonesCommande||[];
      const appNom=id=>{const a=apps.find(x=>x.id===id);return a?a.nom:'';};
      const pieceNom=id=>{const p=pcs.find(x=>x.id===id);return p?p.nom:'';};
      const pieceApp=id=>{const p=pcs.find(x=>x.id===id);return p?appNom(p.appId):'';};
      const teCode=id=>{const t=tes.find(x=>x.id===id);return t?(t.code||t.nom||''):'';};
      const esc=v=>{const t=v==null?'':String(v);return /[";\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t;};
      const sep=';';const out=[];let total=0;
      const block=(title,headers,rows)=>{out.push(esc(title));out.push(headers.join(sep));rows.forEach(rw=>{out.push(rw.map(esc).join(sep));total++;});out.push('');};
      const pr=s.project||{};
      block('PROJET',['Champ','Valeur'],[['Nom',pr.nom],['Adresse',pr.adresse],['Client',pr.client],['Telephone',pr.tel],['Email',pr.email],['Alimentation',pr.typeAlim],['Puissance souscrite (kVA)',pr.puissanceSouscrite],['Type construction',pr.typeConstruction],['Annee',pr.annee]]);
      block('SOURCES / DEPARTS',['Code source','Disj. branchement','Nom','Type','Calibre (A)','Poles','Courbe','Tension','DDR (mA)'],deps.map(d=>[d.code,d.dbCode,d.nom,d.type,d.calibre,d.poles,d.courbe,d.tension,d.ddr]));
      const _ec=this.earthConductorSizing();
      block('TERRE & CONDUCTEURS DE PROTECTION (IEC 60364-5-54)',['Element','Section (mm2)','Reference'],[['Phase alimentation',_ec.phase||'-','depart comptage'],['Conducteur PE principal',_ec.pe||'-','table 54.2'],['Liaison equipotentielle principale',_ec.lep,'>= PE/2, 6-25'],['Conducteur de terre (Cu nu enterre)',_ec.terreNu,'min'],['Conducteur de terre (Cu isole)',_ec.terreIsole,'min']]);
      block('TABLEAUX ELECTRIQUES',['Code','Disj. tete','Nom','Type','Appartement','Description'],tes.map(t=>[t.code,t.cb0Code,t.nom,t.type,appNom(t.appId)||pieceApp(t.pieceId),t.description]));
      block('DISJONCTEURS',['Code','Tableau','Recepteurs','Calibre (A)','Courbe','Poles','DDR (mA)','Section (mm2)','Puissance (W)','Chute U (%)'],djs.map(d=>{let pw='';try{pw=this.calcDjPower(d,pcs);}catch(e){}let du='';try{du=this.voltageDropOf(d).pct;}catch(e){}return [d.code,teCode(d.tableauId),(d.recepteurs||[]).join(' '),d.calibre,d.courbe,d.poles,d.ddr,d.section,pw,du];}));
      block('BORNIER (numerotation bornes)',['Tableau','Borne','Rangee','Disjoncteur','Code cable','Recepteurs'],(()=>{const out=[];tes.forEach(t=>{let n=0;this.rangeesOf(t.id).forEach(rw=>rw.brs.forEach(d=>{n++;let wc='';try{wc=this.genCableCBCode(d,s);}catch(e){}out.push([t.code||t.nom,'B'+n,'R'+rw.rangee,d.code||('CB'+d.id),wc,(d.recepteurs||[]).join(' ')]);}));});return out;})());
      block('BOITES DE DERIVATION',['Code','Label','Piece','Tableau','Type','Cote','Hauteur plafond (cm)'],bds.map(b=>[b.nom,b.label,pieceNom(b.pieceId),teCode(b.tableauId),b.type,b.cote,b.hauteurPlafond]));
      block('INTERRUPTEURS / COMMANDES',['Code','Type','Piece','Circuit commande','Zone'],inters.map(i=>{let code='';try{code=this.genInterCode(i,s);}catch(e){}const z=zones.find(zz=>zz.id===i.zoneId);return [code,i.type,pieceNom(i.pieceId),i.circuitRef,z?(z.zoneCode||z.nom):''];}));
      block('ZONES DE COMMANDE',['Code','Nom','Piece','Cote','Hauteur (cm)','Position'],zones.map(z=>[z.zoneCode,z.nom,pieceNom(z.pieceId),z.cote,z.hauteur,z.position]));
      const fnRows=[];pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{let cable='';try{cable=this.genCEBATCode({...fn,piece:p},s);}catch(e){}const lbl=(this.FNS[fn.type]||{}).label||fn.type;fnRows.push([appNom(p.appId),p.nom,fn.ref,cable,lbl,fn.quantite||1,fn.puissance!=null?fn.puissance:'']);}));
      block('RECEPTEURS / FONCTIONS',['Appartement','Piece','Ref','Code cable','Fonction','Quantite','Puissance (W)'],fnRows);
      const circuits=this.calcCircuits();const CT={eclairage:'Eclairage',prises:'Prises',specialise:'Specialise'};
      block('CIRCUITS CALCULES (dimensionnement)',['Appartement','Piece','Circuit','Type','Calibre (A)','Courbe','Section (mm2)','DDR','Puissance (W)','Nb points','Longueur (m)','Reference'],circuits.map(ci=>[appNom(ci.appId),ci.piece,ci.nom,CT[ci.type]||ci.type,ci.calibre,ci.calibreType,ci.section,ci.ddr,ci.puissance,ci.nb,ci.len,ci.ref]));
      const csv='﻿'+out.join('\r\n');
      const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      const slug=(pr.nom||'projet').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase()||'projet';
      a.href=url;a.download='cebat_nomenclature_'+slug+'.csv';
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
      this.showToast('Nomenclature CSV exportee ('+total+' lignes)');
    }catch(e){this.showToast("Echec de l'export CSV");}
  }
  importJSON(){
    const input=document.createElement('input');
    input.type='file';input.accept='application/json,.json';
    input.onchange=e=>{
      const file=e.target.files&&e.target.files[0];if(!file)return;
      const reader=new FileReader();reader.onerror=()=>this.showToast('Erreur de lecture du fichier');
      reader.onload=ev=>{
        try{
          const parsed=JSON.parse(ev.target.result);
          const st=(parsed&&parsed.state&&typeof parsed.state==='object')?parsed.state:parsed;
          if(!st||typeof st!=='object'){this.showToast('Fichier invalide');return;}
          const patch={};for(const k of this._PERSIST_KEYS)if(st[k]!==undefined)patch[k]=st[k];
          if(Object.keys(patch).length===0){this.showToast('Aucune donnee Cebat trouvee');return;}
          this.setState({...patch,showModal:false,toast:null});
          this.showToast('Projet importe');
        }catch(err){this.showToast('Fichier JSON illisible');}
      };
      reader.readAsText(file);
    };
    input.click();
  }

  // ═══ CONSTANTS ═══
  TC={villa:{label:'Villa / Maison individuelle',icon:'apt_villa'},duplex:{label:'Duplex',icon:'apt_duplex'},immeuble:{label:'Immeuble résidentiel'},immeuble_mixte:{label:'Immeuble mixte',icon:'apt_appart'},commerce:{label:'Commerce / Bureau',icon:'apt_commerce'},entrepot:{label:'Entrepôt / Industriel',icon:'building2'},villa_dep:{label:'Villa avec dépendances'}};
  NIV_TYPES={sous_sol:{label:'Sous-sol',etage:-1},cave:{label:'Cave',etage:-2},parking:{label:'Parking souterrain',etage:-3},rdc:{label:'Rez-de-chaussée',etage:0},mezzanine:{label:'Mezzanine',etage:0},etage:{label:'Étage',etage:null},comble:{label:'Combles / Grenier',etage:98},terrasse:{label:'Terrasse',etage:99},toiture:{label:'Toiture-terrasse',etage:100}};
  LAMP_TYPES={led_plafond:{label:'Plafonnier LED',puissance:12},spot_led:{label:'Spot LED encastré',puissance:8},spot_halogene:{label:'Spot halogène',puissance:50},reglette_led:{label:'Réglette LED',puissance:18},suspension:{label:'Suspension déco',puissance:15},applique:{label:'Applique murale',puissance:10},dalle_led:{label:'Dalle LED',puissance:36},tube_fluo:{label:'Tube fluorescent',puissance:36},projecteur:{label:'Projecteur extérieur',puissance:30},detecteur:{label:'Détecteur + luminaire',puissance:20}};
  FN_CODES={eclairage:'L',prises:'PR',prises_sdb:'PS',tv:'TV',rj45:'RJ',camera:'CA',sono:'SO',four:'FO',lave_vaisselle:'LV',lave_linge:'LL',seche_linge:'SL',hotte:'HO',chauffe_eau:'CE',climatisation:'CL',vmc:'VM',portail:'PG',borne_ve:'VE',piscine:'PI',domotique:'DO',alarme_intrusion:'AL',detecteur_fumee:'DF',detecteur_co:'DC',visiophone:'VI',solaire:'PV',inverseur_source:'IS',controleur_tension:'CT',afficheur:'AF'};
  PLAFOND={standard:'Standard',faux_plafond:'Faux-plafond',pente:'Pente / Mansardé',voute:'Voûté',beton:'Béton brut'};
  MUR={enduit:'Enduit lisse',beton:'Enduit béton',carrelage:'Carrelé',pierre:'Pierre apparente',bois:'Lambris bois',plaque:'Plaque de plâtre'};
  SOL={carrelage:'Carrelage',parquet:'Parquet',beton_cire:'Béton ciré',moquette:'Moquette',resine:'Résine',terre_cuite:'Terre cuite',pvc:'PVC / Vinyle'};
  PIECE_COLORS=['#FFFFFF','#F5F0E8','#E8DCC8','#E8E8E8','#D0E8F0','#F0D0C0','#C8D8C0','#E0D0E8','#F0E8C0','#C8D8E8','#F8E8E8','#E8F0E8'];
  FNS={eclairage:{label:'Éclairage',ico:'eclairage',cat:'base',color:'#f59e0b'},prises:{label:'Prises 2P+T',ico:'prises',cat:'base',color:'#3b82f6'},prises_sdb:{label:'Prises SDB',ico:'prises_sdb',cat:'base',color:'#3b82f6'},tv:{label:'TV / Antenne',ico:'tv',cat:'media',color:'#8b5cf6'},rj45:{label:'RJ45 / Réseau',ico:'rj45',cat:'media',color:'#06b6d4'},camera:{label:'Caméra IP',ico:'camera',cat:'media',color:'#94a3b8'},sono:{label:'Sonorisation',ico:'sono',cat:'media',color:'#7c3aed'},four:{label:'Four / Cuisinière',ico:'four',cat:'spec',color:'#ef4444'},lave_vaisselle:{label:'Lave-vaisselle',ico:'lave_vaisselle',cat:'spec',color:'#ef4444'},lave_linge:{label:'Lave-linge',ico:'lave_linge',cat:'spec',color:'#ef4444'},seche_linge:{label:'Sèche-linge',ico:'seche_linge',cat:'spec',color:'#ef4444'},hotte:{label:'Hotte aspirante',ico:'hotte',cat:'spec',color:'#94a3b8'},chauffe_eau:{label:'Chauffe-eau ECS',ico:'chauffe_eau',cat:'spec',color:'#f97316'},climatisation:{label:'Climatisation',ico:'climatisation',cat:'spec',color:'#06b6d4'},vmc:{label:'VMC',ico:'vmc',cat:'spec',color:'#94a3b8'},portail:{label:'Portail motorisé',ico:'portail',cat:'ext',color:'#94a3b8'},borne_ve:{label:'Borne recharge VE',ico:'borne_ve',cat:'ext',color:'#22c55e'},piscine:{label:'Pompe piscine',ico:'piscine',cat:'ext',color:'#0891b2'},domotique:{label:'Domotique KNX',ico:'domotique',cat:'dom',color:'#8b5cf6'},alarme_intrusion:{label:'Alarme intrusion',ico:'alarme_intrusion',cat:'secu',color:'#ef4444'},detecteur_fumee:{label:'Détecteur fumée',ico:'detecteur_fumee',cat:'secu',color:'#f97316'},detecteur_co:{label:'Détecteur CO',ico:'detecteur_co',cat:'secu',color:'#f97316'},visiophone:{label:'Visiophone',ico:'visiophone',cat:'secu',color:'#8b5cf6'},solaire:{label:'Panneau solaire',ico:'solaire',cat:'energ',color:'#f59e0b'},inverseur_source:{label:'Inverseur source',ico:'inverseur_source',cat:'energ',color:'#06b6d4'},controleur_tension:{label:'Contrôleur tension',ico:'controleur_tension',cat:'energ',color:'#22c55e'},afficheur:{label:'Afficheur / Compteur',ico:'afficheur',cat:'energ',color:'#94a3b8'}};
  FN_CATS={base:{label:'Base',items:['eclairage','prises','prises_sdb']},media:{label:'Média / Réseau',items:['tv','rj45','camera','sono']},spec:{label:'Circuits spécialisés',items:['four','lave_vaisselle','lave_linge','seche_linge','hotte','chauffe_eau','climatisation','vmc']},ext:{label:'Extérieur / VE',items:['portail','borne_ve','piscine']},secu:{label:'Sécurité',items:['alarme_intrusion','detecteur_fumee','detecteur_co','visiophone']},energ:{label:'Énergie',items:['solaire','inverseur_source','controleur_tension','afficheur','domotique']}};
  PT={sejour:{label:'Séjour / Salon',minP:5,minL:2},cuisine:{label:'Cuisine',minP:6,minL:2},chambre:{label:'Chambre',minP:3,minL:1},bureau:{label:'Bureau',minP:4,minL:1},sdb:{label:'Salle de Bain',minP:1,minL:2},wc:{label:'WC',minP:0,minL:1},couloir:{label:'Couloir / Hall',minP:1,minL:1},garage:{label:'Garage',minP:2,minL:1},cave:{label:'Cave / Local',minP:1,minL:1},exterieur:{label:'Extérieur',minP:1,minL:1}};
  AT={villa:{label:'Villa / Maison'},appartement:{label:'Appartement'},studio:{label:'Studio'},duplex:{label:'Duplex'},commerce:{label:'Commerce / Bureau'},parking:{label:'Parking'}};
  NV={standard:{label:'Standard',bonus:0},confort:{label:'Confort',bonus:2},premium:{label:'Premium',bonus:4}};
  DEFAULT_FONCTIONS={
    sejour:[{type:'eclairage',typeLampe:'suspension',puissance:15,quantite:1},{type:'eclairage',typeLampe:'spot_led',puissance:8,quantite:3},{type:'prises',quantite:5},{type:'tv',quantite:1},{type:'rj45',quantite:2}],
    cuisine:[{type:'eclairage',typeLampe:'reglette_led',puissance:18,quantite:2},{type:'prises',quantite:6},{type:'four',quantite:1},{type:'hotte',quantite:1}],
    chambre:[{type:'eclairage',typeLampe:'led_plafond',puissance:12,quantite:1},{type:'prises',quantite:3}],
    sdb:[{type:'eclairage',typeLampe:'applique',puissance:10,quantite:2},{type:'prises_sdb',quantite:1},{type:'chauffe_eau',quantite:1}],
    wc:[{type:'eclairage',typeLampe:'led_plafond',puissance:8,quantite:1}],
    bureau:[{type:'eclairage',typeLampe:'dalle_led',puissance:36,quantite:1},{type:'prises',quantite:4},{type:'rj45',quantite:2}],
    couloir:[{type:'eclairage',typeLampe:'led_plafond',puissance:10,quantite:1},{type:'prises',quantite:1}],
    garage:[{type:'eclairage',typeLampe:'reglette_led',puissance:18,quantite:1},{type:'prises',quantite:2}],
    cave:[{type:'eclairage',typeLampe:'led_plafond',puissance:10,quantite:1},{type:'prises',quantite:1}],
    exterieur:[{type:'eclairage',typeLampe:'projecteur',puissance:30,quantite:1},{type:'prises',quantite:1}],
  };

  genPieceCode(existingPieces){const n=existingPieces.length+1;return 'PC'+String(n).padStart(3,'0');}
  genZoneCode(existingZones){const n=existingZones.length+1;return 'ZC'+String(n).padStart(2,'0');}
  genDjCode(existingDj,tableauId){
    const allTE=this.state.tableauxElec||[];
    const te=tableauId!=null?allTE.find(t=>t.id===tableauId):null;
    const teGlobalIdx=te?allTE.indexOf(te)+1:1;
    const existing=existingDj||[];
    // Compter les CB du meme tableau (null/undefined = "a assigner" regroupes)
    const sameTE=existing.filter(d=>tableauId!=null?d.tableauId===tableauId:d.tableauId==null);
    let n=sameTE.length+1;
    // Garde anti-collision : ne jamais reutiliser un code existant
    const codes=new Set(existing.map(d=>d.code));
    while(codes.has(teGlobalIdx+'CB'+n))n++;
    return teGlobalIdx+'CB'+n;
  }
  genDepartCode(type,existingDeparts,editId){const prefix={comptage:'AR',electrogene:'GE',solaire:'PV'}[type]||'DP';const n=existingDeparts.filter(d=>d.type===type&&d.id!==editId).length+1;return prefix+String(n).padStart(2,'0');}

  _fnLetter(fnType){
    return {eclairage:'L',prises:'P',prises_sdb:'P',tv:'L',rj45:'P',camera:'C',sono:'SO',
      four:'K',lave_vaisselle:'LL',lave_linge:'LL',seche_linge:'LL',hotte:'F',
      chauffe_eau:'H',climatisation:'AC',vmc:'F',portail:'M',borne_ve:'P',piscine:'M',
      alarme_intrusion:'AL',detecteur_fumee:'F',detecteur_co:'F',visiophone:'V',
      domotique:'D',solaire:'S',inverseur_source:'W',controleur_tension:'D',afficheur:'D'}[fnType]||'X';
  }

  genCEBATCode(fn,state){
    // Cable recepteur: {bdIdx}{lettre}{globalIdx} ex: 1L1, 2P3
    const letter=this._fnLetter(fn.type);
    const allFns=state.pieces.flatMap(p=>(p.fonctions||[]).map(f=>({...f,piece:p})));
    const sameType=allFns.filter(f=>this._fnLetter(f.type)===letter);
    const _gi=sameType.findIndex(f=>f.id===fn.id&&f.piece&&fn.piece&&f.piece.id===fn.piece.id);const globalIdx=_gi>=0?_gi+1:sameType.length+1;
    const allBD=state.boitesDeriv;const allTE=state.tableauxElec;
    // Trouver le prefixe: numero de BD ou de TE
    if(fn.departType==='boite'){
      const bd=allBD.find(b=>String(b.id)===String(fn.departId));
      if(bd){
        const bdIdx=allBD.findIndex(b=>b.id===bd.id)+1;
        return bdIdx+letter+globalIdx;
      }
    }
    if(fn.departType==='tableau'){
      const te=allTE.find(t=>String(t.id)===String(fn.departId));
      const teIdx=te?allTE.findIndex(t=>t.id===te.id)+1:1;
      return teIdx+letter+globalIdx;
    }
    // Fallback via disjoncteur → TE
    const dj=state.disjoncteurs.find(d=>(d.recepteurs||[]).includes(fn.ref));
    if(dj){
      const te=allTE.find(t=>t.id===dj.tableauId);
      const teIdx=te?allTE.findIndex(t=>t.id===te.id)+1:1;
      return teIdx+letter+globalIdx;
    }
    return '1'+letter+globalIdx;
  }

  genTECode(te,state){
    const allApps=state.appartements;const allTE=state.tableauxElec;
    const piece=te.pieceId?state.pieces.find(p=>p.id===te.pieceId):null;
    const app=allApps.find(a=>a.id===(te.appId||(piece&&piece.appId)));
    const appIdx=app?allApps.indexOf(app)+1:1;
    const isPrinc=(te.type||'principal')==='principal';
    const sameType=allTE.filter(t=>(t.type||'principal')===(te.type||'principal'));
    // Chercher par id pour eviter le indexOf par reference (bug 1TE0)
    const teIdx=sameType.findIndex(t=>t.id===te.id)+1||sameType.length;
    return appIdx+(isPrinc?'TE':'TES')+teIdx;
  }

  genBDCode(bd,state){
    const allBD=state.boitesDeriv;const allTE=state.tableauxElec;
    let te=allTE.find(t=>t.id===bd.tableauId);
    if(!te){const allFns=state.pieces.flatMap(p=>(p.fonctions||[]));const fnBD=allFns.find(f=>f.departType==='boite'&&String(f.departId)===String(bd.id));if(fnBD){const dj=(state.disjoncteurs||[]).find(d=>(d.recepteurs||[]).includes(fnBD.ref));if(dj)te=allTE.find(t=>t.id===dj.tableauId);}}
    const teIdx=te?allTE.indexOf(te)+1:1;
    const bdIdx=allBD.indexOf(bd)+1;
    return teIdx+'BD'+bdIdx;
  }

  genBDTenant(bd,state){
    const allDj=state.disjoncteurs;const allTE=state.tableauxElec;
    const allFns=state.pieces.flatMap(p=>(p.fonctions||[]).map(f=>({...f,piece:p})));
    const fnsDeCeBD=allFns.filter(f=>f.departType==='boite'&&String(f.departId)===String(bd.id));
    if(fnsDeCeBD.length>0){
      const dj=allDj.find(d=>(d.recepteurs||[]).includes(fnsDeCeBD[0].ref));
      if(dj){const te=allTE.find(t=>t.id===dj.tableauId);const teIdx=te?allTE.indexOf(te)+1:1;return teIdx+'CB'+(allDj.indexOf(dj)+1);}
    }
    const djInTE=allDj.filter(d=>d.tableauId===bd.tableauId);
    if(djInTE.length>0){const dj=djInTE[0];const te=allTE.find(t=>t.id===dj.tableauId);const teIdx=te?allTE.indexOf(te)+1:1;return teIdx+'CB'+(allDj.indexOf(dj)+1);}
    const te=allTE.find(t=>t.id===bd.tableauId);
    return te?this.genTECode(te,state):'TE?';
  }

  genCableCBCode(dj,state){
    const allTE=state.tableauxElec;const allDj=state.disjoncteurs;
    const te=allTE.find(t=>t.id===dj.tableauId);
    const teIdx=te?allTE.indexOf(te)+1:1;
    return teIdx+'W'+(allDj.findIndex(d=>d.id===dj.id)+1||1);
  }

  genSourceCode(dep,state){
    const letter={comptage:'R',electrogene:'G',solaire:'S'}[dep.type]||'R';
    const sameType=state.departs.filter(d=>d.type===dep.type);
    const idx=sameType.findIndex(d=>d.id===dep.id)+1||sameType.length;
    return letter+idx;
  }

  genInterCode(inter,state){
    const TYPE={simple:'SA',va_vient:'VV',poussoir:'PO',double:'DA',variateur:'VA',detecteur:'DT',domotique:'DM'};
    const prefix=TYPE[inter.type||'simple']||'SA';
    const allFns=state.pieces.flatMap(p=>(p.fonctions||[]).map(f=>({...f,piece:p})));
    // Numero du recepteur commande (global par type de lettre)
    let recepNum=1;
    if(inter.circuitRef){
      const fn=allFns.find(f=>f.ref===inter.circuitRef);
      if(fn){
        const letter=this._fnLetter(fn.type);
        const sameType=allFns.filter(f=>this._fnLetter(f.type)===letter);
        const idx=sameType.findIndex(f=>f.id===fn.id&&f.piece&&fn.piece&&f.piece.id===fn.piece.id);
        if(idx>=0)recepNum=idx+1;
      }
    }
    // Ordre parmi les interrupteurs du MEME circuit
    const sameCircuit=inter.circuitRef
      ?state.interrupteurs.filter(i=>i.circuitRef===inter.circuitRef)
      :[];
    const idxCircuit=sameCircuit.findIndex(i=>i.id===inter.id);
    const orderOnCircuit=idxCircuit>=0?idxCircuit+1:1;
    return prefix+recepNum+'.'+orderOnCircuit;
  }


  purgeNomOverridesForCode(wCode){
    // Supprimer toutes les surcharges d'un cable quand son schema change
    this.setState(s=>{
      const newOvr={...s.nomenclatureOverrides};
      Object.keys(newOvr).forEach(k=>{if(k.startsWith(wCode+'_fil'))delete newOvr[k];});
      return{nomenclatureOverrides:newOvr};
    });
  }

  getInterWCode(inter,state){
    // Calcule le wCode d'un câble interrupteur
    const allFns=state.pieces.flatMap(p=>(p.fonctions||[]).map(f=>({...f,piece:p})));
    const fn=allFns.find(f=>f.ref===inter.circuitRef);
    if(!fn)return null;
    const fnCode=this.genCEBATCode(fn,state);
    const linkedInter=state.interrupteurs.filter(i=>i.circuitRef===inter.circuitRef);
    const idx=linkedInter.findIndex(i=>i.id===inter.id);
    return fnCode+'i'+String(idx+1).padStart(2,'0');
  }


  genDBCode(dep,state){
    // DB{n} — disjoncteur de branchement, lié à la source
    const allDeps=state.departs;
    const idx=allDeps.findIndex(d=>d.id===dep.id)+1||allDeps.length;
    return 'DB'+idx;
  }

  genCB0Code(te,state){
    // {te_ordre}CB0 — disjoncteur de tête du tableau
    const allTE=state.tableauxElec;
    const teIdx=allTE.findIndex(t=>t.id===te.id)+1||allTE.length;
    return teIdx+'CB0';
  }

  checkAutoInverseur(newDeps){
    const hasCpt=newDeps.some(d=>d.type==='comptage');
    const hasAlt=newDeps.some(d=>d.type==='electrogene'||d.type==='solaire');
    if(!hasCpt||!hasAlt){this.setState({inverseurs:[]});return;}
    if((this.state.inverseurs||[]).length>0)return;
    const srcCodes=newDeps.map(d=>d.code);
    const inv={id:this.state.nextElemId,code:'IS01',nom:'Inverseur de source',sources:srcCodes,tableauElecId:newDeps[0]?.tableauElecId||null};
    this.setState(st=>({inverseurs:[inv],nextElemId:st.nextElemId+1}));
    this.showToast('Inverseur IS01 cree automatiquement');
  }
  calcDjPower(dj,allPieces){if(!dj.recepteurs||dj.recepteurs.length===0)return 0;const set=new Set(dj.recepteurs);let total=0;(allPieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.ref&&set.has(fn.ref))total+=this._fnPowerW(fn);}));return total;}
  djNFCLimit(dj){
    const allPcs=this.state.pieces||[];
    const refs=dj.recepteurs||[];
    let isEcl=false,isPrise=false;
    for(const ref of refs){
      for(const p of allPcs){
        for(const fn of (p.fonctions||[])){
          if(fn.ref===ref){
            if(fn.type==='eclairage')isEcl=true;
            if(fn.type==='prises'||fn.type==='prises_sdb')isPrise=true;
          }
        }
      }
    }
    // Puissance max reelle = calibre x 230V (monophase)
    const calibre=dj.calibre||10;
    const maxWCalibre=Math.round(calibre*230);
    if(isEcl){
      // NFC: 8 pts max, puissance = min(2300, calibre*230)
      // Si calibre > 10A, la limite puissance monte avec le calibre
      const maxW=Math.min(maxWCalibre,2300*(calibre<=10?1:calibre/10));
      const label=calibre<=10?'Max 8pts/2300W (B10A)':'Max 8pts/'+(calibre*230)+'W (B'+calibre+'A)';
      return{maxR:8,maxW:Math.round(maxW),label};
    }
    if(isPrise){
      const maxW=Math.min(maxWCalibre,3680*(calibre<=16?1:calibre/16));
      const label=calibre<=16?'Max 8 prises/3680W (C16A)':'Max 8 prises/'+(calibre*230)+'W (C'+calibre+'A)';
      return{maxR:8,maxW:Math.round(maxW),label};
    }
    return{maxR:1,maxW:maxWCalibre,label:'Circuit specialise — '+calibre+'A ('+maxWCalibre+'W max)'};
  }
  sectionMinForCalibre(calibre){
    // Retourne la section minimale requise (mm²) pour un calibre donne (NF C 15-100)
    if(calibre<=16)return 1.5;
    if(calibre<=25)return 2.5;
    if(calibre<=32)return 4;
    if(calibre<=40)return 6;
    return 10;
  }
  sectionOkForCalibre(sectionStr,calibre){
    const s=parseFloat(sectionStr)||1.5;
    return s>=this.sectionMinForCalibre(calibre);
  }
  genAppSeqCode(existingAppts){const n=existingAppts.length+1;return 'APP'+String(n).padStart(2,'0');}
  genAppCode(niveauId,existingAppts){
    const niv=this.state.niveaux.find(n=>n.id===niveauId);
    const etage=niv?niv.etage:0;
    const prefix=etage<0?'SS'+Math.abs(etage):etage===0?'RDC':'E'+etage;
    const count=existingAppts.filter(a=>a.niveauId===niveauId).length;
    return prefix+'-'+String.fromCharCode(65+count);
  }

  genDefaultFonctions(appId,pieceType,existingPieces,startId){
    const defaults=this.DEFAULT_FONCTIONS[pieceType]||[];
    const typeCount={};
    const appIdx=this.state.appartements.findIndex(a=>a.id===appId)+1;
    existingPieces.filter(p=>p.appId===appId).forEach(p=>(p.fonctions||[]).forEach(f=>{typeCount[f.type]=(typeCount[f.type]||0)+1;}));
    let id=startId;const fns=[];
    for(const d of defaults){
      const code=this.FN_CODES[d.type]||'X';
      const cnt=typeCount[d.type]||0;
      const ref=`${appIdx}${code}${cnt+1}`;
      typeCount[d.type]=(typeCount[d.type]||0)+1;
      fns.push({id:id++,...d,ref});
    }
    return{fns,nextId:id};
  }

  NAV=[
    {id:'dashboard',label:'Tableau de bord',cat:''},
    {id:'projet',label:'Projet & Structure','cat':''},
    {id:'logements',label:'Appartements & Pièces',cat:'Structure'},
    {id:'feuille',label:'Feuille de puissance',cat:'Dimensionnement'},
    {id:'circuits',label:'Circuits',cat:'Dimensionnement'},
    {id:'schema',label:'Schéma unifilaire',cat:'Dimensionnement'},
    {id:'armoire',label:'Armoire électrique',cat:'Dimensionnement'},
    {id:'implantation',label:"Plan d'implantation",cat:'Dimensionnement'},
    {id:'rangees',label:'Composition tableau',cat:'Dimensionnement'},
    
    {id:'realisation',label:'Réalisation & Contrôle',cat:'Processus'},
    {id:'cablage',label:'Câblage',cat:'Processus'},
    {id:'domotique',label:'Domotique',cat:'Processus'},
    
    {id:'devis',label:'Devis & Rapport',cat:'Validation'},
  ];

  // ═══ THEME ═══
  getC(theme){
    const shared={font:"'Calibri Light','Calibri',system-ui,sans-serif",mono:"'JetBrains Mono',monospace",accent:'#0284C7',acBlue:'#0EA5E9',success:'#16a34a',warn:'#d97706',danger:'#dc2626',cyan:'#06b6d4',purple:'#7c3aed',brand:'#C62828'};
    return theme==='dark'?{...shared,bg:'#0B0E17',surf:'#141925',surf2:'#1A2030',surf3:'#202739',bdr:'#283044',bdr2:'#374055',bdr3:'#4C5872',text:'#E8ECF6',text2:'#A7B0C5',muted:'#6B7590',accentSoft:'rgba(2,132,199,.18)',scrollThumb:'#283044',shadow:'rgba(0,0,0,.45)',elev1:'0 1px 2px rgba(0,0,0,.3),0 1px 3px rgba(0,0,0,.4)',elev2:'0 2px 6px rgba(0,0,0,.4),0 8px 20px rgba(0,0,0,.45)',elev3:'0 10px 30px rgba(0,0,0,.55),0 2px 8px rgba(0,0,0,.4)'}:{...shared,bg:'#F1F3F7',surf:'#FFFFFF',surf2:'#FFFFFF',surf3:'#F6F8FB',bdr:'#E8EBF0',bdr2:'#D5DAE2',bdr3:'#9AA3B2',text:'#0F172A',text2:'#334155',muted:'#64748B',accentSoft:'rgba(2,132,199,.10)',scrollThumb:'#D5DAE2',shadow:'rgba(15,23,42,.07)',elev1:'0 1px 2px rgba(15,23,42,.04),0 1px 3px rgba(15,23,42,.07)',elev2:'0 2px 4px rgba(15,23,42,.05),0 8px 20px rgba(15,23,42,.10)',elev3:'0 12px 30px rgba(15,23,42,.12),0 2px 8px rgba(15,23,42,.07)'};
  }

  // ═══ HELPERS ═══
  getFnTypes(p){return(p.fonctions||[]).map(f=>f.type);}
  getNbL(p){const ef=(p.fonctions||[]).filter(f=>f.type==='eclairage');if(ef.length>0)return ef.reduce((s,f)=>s+(f.quantite||1),0);const t=this.PT[p.type]||{minL:1};const n=this.NV[p.niveau]||{bonus:0};return t.minL+Math.max(0,Math.floor(p.surface/15))+n.bonus;}
  getNbP(p){const pf=(p.fonctions||[]).filter(f=>['prises','prises_sdb'].includes(f.type));if(pf.length>0)return pf.reduce((s,f)=>s+(f.quantite||1),0);const t=this.PT[p.type]||{minP:2};const n=this.NV[p.niveau]||{bonus:0};return t.minP+Math.max(0,Math.floor((p.surface-10)/5))+n.bonus;}
  getLen(p){return Math.round(Math.sqrt(p.surface)*5+10);}
  getPieceIcon(t){const k={sejour:'sejour',cuisine:'cuisine',chambre:'chambre',sdb:'sdb',wc:'wc',bureau:'bureau',couloir:'couloir',garage:'garage',cave:'cave',exterieur:'exterieur'}[t]||'sejour';return this.ico(k,15);}
  getNivLabel(niv){const label=niv.etage<0?`Niveau ${niv.etage}`:niv.etage===0?'RDC':`Étage ${niv.etage}`;return label;}

  generateRef(appId,fnType){
    const code=this.FN_CODES[fnType]||'X';
    const appIdx=this.state.appartements.findIndex(a=>a.id===appId)+1;
    const appPieces=this.state.pieces.filter(p=>p.appId===appId);
    const count=appPieces.reduce((s,p)=>s+(p.fonctions||[]).filter(f=>f.type===fnType).length,0);
    return `${appIdx}${code}${count+1}`;
  }
  formatRefs(fn){
    if((fn.quantite||1)<=1)return fn.ref;
    const refs=Array.from({length:Math.min(fn.quantite,5)},(_,i)=>`${fn.ref}.${i+1}`);
    return refs.join(' · ')+(fn.quantite>5?` …+${fn.quantite-5}`:'');
  }

  detectZoneOptimisations(){
    const opts=[];
    for(const zone of this.state.zonesCommande){
      const inters=this.state.interrupteurs.filter(i=>i.zoneId===zone.id);
      const byRef={};
      for(const inter of inters){const ref=inter.circuitRef||'';if(ref){if(!byRef[ref])byRef[ref]=[];byRef[ref].push(inter);}}
      for(const[ref,grp]of Object.entries(byRef)){
        if(grp.length>=2){
          const piece=this.state.pieces.find(p=>p.id===zone.pieceId);
          const distEst=piece?Math.round(Math.sqrt(piece.surface)*4+12):15;
          opts.push({zoneId:zone.id,zonNom:zone.nom,ref,count:grp.length,gainFils:grp.length-1,gainCable:(grp.length-1)*distEst,distEst});
        }
      }
    }
    return opts;
  }

  getCompletion(){const{pieces,niveaux,appartements,project}=this.state;let s=0;if(project.nom&&project.adresse)s+=15;if(niveaux.length>0)s+=15;if(appartements.length>0)s+=15;if(pieces.length>=1)s+=15;if(pieces.some(p=>(p.fonctions||[]).length>=2))s+=20;const te=this.state.tableauxElec||[];const dj=this.state.disjoncteurs||[];if(te.length>0&&dj.length>0)s+=20;return Math.min(s,100);}
  _poles(d){const n=parseInt(d&&d.poles,10);return Number.isFinite(n)&&n>0?n:1;}
  _boardRows(te){
    const djs=(this.state.disjoncteurs||[]).filter(d=>d.tableauId===te.id);
    const gmap={};djs.forEach(d=>{const k=(+d.ddr||0);(gmap[k]=gmap[k]||[]).push(d);});
    const rows=Object.keys(gmap).map(k=>+k).sort((a,b)=>(a||9999)-(b||9999)).map(k=>{
      const brs=gmap[k];const maxP=brs.reduce((m,d)=>Math.max(m,this._poles(d)),1);
      const idM=k>0?(maxP>2?4:2):0;const brM=brs.reduce((sm,d)=>sm+this._poles(d),0);
      return{ddr:k,brs,idModules:idM,modules:idM+brM};
    });
    const ROW=((this.state.project&&this.state.project.modulesParRangee)||13),teteModules=2;
    const usedModules=teteModules+rows.reduce((sm,rw)=>sm+rw.modules,0);
    const capacity=Math.max(usedModules,Math.ceil(usedModules/0.8));
    const nbRangees=Math.max(rows.length,Math.ceil(capacity/ROW));
    return{rows,teteModules,usedModules,capacity,nbRangees,ROW};
  }
  _peSection(S){const s=parseFloat(S)||0;if(s<=0)return 0;if(s<=16)return s;if(s<=35)return 16;return Math.ceil(s/2);}
  earthConductorSizing(){
    const s=this.state;const deps=s.departs||[];
    const main=deps.find(d=>d.type==='comptage')||deps[0]||null;
    const phase=main?parseFloat(main.section)||0:0;
    const pe=this._peSection(phase);
    const lep=pe>0?Math.min(25,Math.max(6,Math.ceil(pe/2))):6;
    return{phase,pe,lep,terreNu:25,terreIsole:16};
  }
  checkConformite(){
    const s=this.state;const issues=[];const add=(level,msg)=>issues.push({level,msg});
    const pcs=s.pieces||[],djs=s.disjoncteurs||[],tes=s.tableauxElec||[],deps=s.departs||[];
    const refType={};pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{refType[fn.ref]=fn.type;}));
    if(!deps.some(d=>d.type==='comptage'))add('warn','Aucune source de comptage (raccordement reseau) definie.');
    tes.forEach(t=>{if(!djs.some(d=>d.tableauId===t.id))add('warn','Tableau « '+(t.nom||t.code||t.id)+' » sans disjoncteur.');});
    djs.forEach(d=>{
      const code=d.code||('CB'+d.id);const refs=d.recepteurs||[];
      if(refs.length===0){add('warn','Disjoncteur '+code+' sans recepteur affecte.');return;}
      if(!this.sectionOkForCalibre(d.section,d.calibre))add('error','Disjoncteur '+code+' : section '+d.section+'mm² insuffisante pour '+d.calibre+'A (min '+this.sectionMinForCalibre(d.calibre)+'mm²).');
      const hasSdb=refs.some(rf=>refType[rf]==='prises_sdb');
      if(hasSdb&&(!d.ddr||d.ddr>30))add('error','Disjoncteur '+code+' (prises SDB) : differentiel 30 mA requis.');
      else if(!d.ddr)add('warn','Disjoncteur '+code+' sans differentiel (DDR) associe.');
      const lim=this.djNFCLimit(d);let pw=0;try{pw=this.calcDjPower(d,pcs);}catch(e){}
      if(refs.length>lim.maxR)add('warn','Disjoncteur '+code+' : '+refs.length+' recepteurs > '+lim.maxR+' max ('+lim.label+').');
      if(pw>lim.maxW)add('warn','Disjoncteur '+code+' : '+pw+'W > '+lim.maxW+'W ('+lim.label+').');
    });
    pcs.forEach(p=>{if(!(p.fonctions||[]).some(fn=>fn.type==='eclairage'))add('warn','Piece « '+p.nom+' » sans point d\'eclairage.');});
    const SPEC=['four','lave_vaisselle','lave_linge','seche_linge','chauffe_eau','climatisation','borne_ve','piscine'];
    const assigned=new Set();djs.forEach(d=>(d.recepteurs||[]).forEach(rf=>assigned.add(rf)));
    pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.ref&&!assigned.has(fn.ref))add('warn','Recepteur '+fn.ref+' (« '+p.nom+' ») non protege par un disjoncteur.');}));
    djs.forEach(d=>{
      const code=d.code||('CB'+d.id);const refs=d.recepteurs||[];if(refs.length===0)return;
      const types=refs.map(rf=>refType[rf]);const specs=types.filter(t=>SPEC.includes(t));
      if(specs.length>0&&refs.length>1)add('error','Disjoncteur '+code+' : circuit specialise ('+specs[0]+') doit etre dedie (1 seul recepteur).');
      const isEcl=types.length>0&&types.every(t=>t==='eclairage');const isPr=types.length>0&&types.every(t=>t==='prises'||t==='prises_sdb');
      if(isEcl&&d.calibre>16)add('warn','Disjoncteur '+code+' : eclairage en '+d.calibre+'A (max conseille 16A).');
      if(isPr&&d.calibre>20)add('warn','Disjoncteur '+code+' : prises en '+d.calibre+'A (max conseille 20A).');
      if(d.ddr&&d.ddr>30)add('warn','Disjoncteur '+code+' : circuit terminal devrait etre en 30 mA (actuel '+d.ddr+' mA).');
    });
    const TYPEA_FN={lave_linge:'lave-linge',four:'plaque de cuisson',borne_ve:'borne de recharge VE'};
    const typeARefs=[];djs.forEach(d=>{(d.recepteurs||[]).forEach(rf=>{if(TYPEA_FN[refType[rf]])typeARefs.push({code:d.code||('CB'+d.id),lib:TYPEA_FN[refType[rf]]});});});
    if(typeARefs.length){
      const libs=[...new Set(typeARefs.map(x=>x.lib))].join(', ');
      add('warn','Differentiel Type A obligatoire : '+typeARefs.length+' circuit(s) ('+libs+') a proteger par un ID 30 mA de Type A (NF C 15-100 §531.2.4) — composantes continues de defaut.');
    }
    const ec=this.earthConductorSizing();
    if(ec.phase>0)add('info','Conducteurs de protection (IEC 60364-5-54) : PE principal '+ec.pe+' mm² (phase '+ec.phase+' mm²), liaison equipotentielle principale '+ec.lep+' mm² (min 6), conducteur de terre 25 mm² Cu nu enterre ou 16 mm² Cu isole.');
    tes.forEach(t=>{
      const td=djs.filter(d=>d.tableauId===t.id);if(td.length===0)return;
      const byDdr={};td.forEach(d=>{const k=(+d.ddr||0);(byDdr[k]=byDdr[k]||[]).push(d);});
      Object.keys(byDdr).forEach(k=>{if(byDdr[k].length>8)add('warn','Tableau « '+(t.nom||t.code)+' » : '+byDdr[k].length+' circuits sous le differentiel '+(+k>0?k+' mA':'sans DDR')+' (max 8 conseille).');});
      if(!td.some(d=>(+d.ddr||0)>0&&(+d.ddr)<=30))add('warn','Tableau « '+(t.nom||t.code)+' » : aucun differentiel 30 mA (obligatoire pour circuits terminaux).');
    });
    tes.forEach(t=>{
      const br=this._boardRows(t);if(br.usedModules<=2)return;
      br.rows.forEach((rw,idx)=>{if(rw.modules>br.ROW)add('warn','Tableau « '+(t.nom||t.code)+' » : rangee '+(idx+1)+' ('+(rw.ddr>0?rw.ddr+'mA':'sans DDR')+') = '+rw.modules+' modules > '+br.ROW+' par rangee (a repartir).');});
      add('info','Tableau « '+(t.nom||t.code)+' » : '+br.usedModules+' modules utilises, prevoir '+br.capacity+' ('+br.nbRangees+' rangee'+(br.nbRangees>1?'s':'')+') pour 20% de reserve.');
      if(br.rows.length>=2){const mods=br.rows.map(rw=>rw.modules);const mx=Math.max.apply(null,mods),mn=Math.min.apply(null,mods);if(mx-mn>=6)add('info','Tableau « '+(t.nom||t.code)+' » : rangees desequilibrees ('+mods.join('/')+' modules) — envisager un reequilibrage.');}
    });
    const _pb=this.phaseBalance();if(_pb&&_pb.imbalance>30)add('warn','Triphase : desequilibre des phases '+_pb.imbalance+'% (L1 '+Math.round(_pb.L1)+'W / L2 '+Math.round(_pb.L2)+'W / L3 '+Math.round(_pb.L3)+'W) — a reequilibrer.');
    const downDdrs=djs.map(d=>+d.ddr||0).filter(x=>x>0);
    if(deps.some(d=>+d.ddr>0)&&downDdrs.length){
      const minDown=Math.min.apply(null,downDdrs);
      deps.filter(d=>+d.ddr>0).forEach(h=>{if((+h.ddr)<3*minDown)add('warn','Selectivite differentielle : source '+(h.code||h.nom||'')+' '+h.ddr+'mA non selective avec un differentiel aval '+minDown+'mA (rapport >=3 et type S requis).');});
    }
    tes.forEach(t=>{
      const dep=deps.find(d=>d.id===t.departId)||deps.find(d=>d.type==='comptage');if(!dep)return;const dc=+dep.calibre||0;if(!dc)return;
      djs.filter(d=>d.tableauId===t.id).forEach(d=>{if((+d.calibre||0)>=dc)add('warn','Selectivite amperometrique : '+(d.code||'CB')+' '+d.calibre+'A >= source '+(dep.code||dep.nom||'')+' '+dc+'A (calibre amont insuffisant).');});
    });
    (djs||[]).forEach(d=>{const refs=d.recepteurs||[];if(refs.length===0)return;const vd=this.voltageDropOf(d);if(vd.I<=0)return;const isEcl=refs.every(rf=>refType[rf]==='eclairage');const lim=isEcl?3:5;if(vd.pctCumul>lim){const rec=this.recommendedSection(d);const fix=rec.pct!=null&&rec.S>vd.S?' — section conseillee '+rec.S+'mm2 ('+rec.pct.toFixed(1)+'%).':'';add('warn','Chute de tension cumulee '+(d.code||'CB')+' : '+vd.pctCumul.toFixed(1)+'% > '+lim+'% (amont '+vd.pctMain.toFixed(1)+'% + circuit '+vd.pct.toFixed(1)+'%, L='+vd.L+'m'+(vd.est?' est.':'')+', S='+vd.S+'mm2, I='+vd.I.toFixed(1)+'A).'+fix);}});
    // Longueur maximale protegee (declenchement magnetique sur defaut)
    (djs||[]).forEach(d=>{if((d.recepteurs||[]).length===0)return;const L=+d.longueur;if(!(L>0))return;const lp=this.lmaxProtege(d);if(!isFinite(lp.lmax)||lp.lmax<=0)return;if(L>lp.lmax){const ddrOk=(+d.ddr>0&&+d.ddr<=500);add(ddrOk?'warn':'error','Longueur excessive '+(d.code||'CB')+' : '+L+'m > Lmax '+lp.lmax+'m (courbe '+(d.courbe||'C')+', '+d.calibre+'A, '+lp.S+'mm2) — declenchement magnetique non garanti sur court-circuit en bout de ligne'+(ddrOk?' (personnes protegees par le DDR '+d.ddr+'mA).':'. Augmenter la section, baisser la courbe, ou reduire la longueur.'));}});
    // Chute de tension au demarrage des moteurs (transitoire)
    (djs||[]).forEach(d=>{const ms=this.motorStartDrop(d);if(!ms)return;if(ms.pctStart>ms.lim)add('warn','Demarrage moteur '+(d.code||'CB')+' : chute de tension transitoire ~'+ms.pctStart.toFixed(1)+'% > '+ms.lim+'% (pointe '+ms.kd+'x In) — augmenter la section ou prevoir un demarreur progressif.');});
    // Pouvoir de coupure vs court-circuit presume
    const _icc=+((s.project||{}).iccTableau)||0;const _pdc=+((s.project||{}).pdcDisjoncteurs)||0;
    if(_icc>0&&_pdc>0&&_pdc<_icc)add('error','Pouvoir de coupure insuffisant : disjoncteurs '+_pdc+' kA < Icc presume au tableau '+_icc+' kA. Choisir des disjoncteurs '+_icc+' kA (ou superieur) ou prevoir une filiation.');
    else if(_icc>0&&_pdc>0)add('info','Pouvoir de coupure OK : disjoncteurs '+_pdc+' kA >= Icc presume '+_icc+' kA.');
    // Courant admissible Iz selon le mode de pose (IEC 60364-5-52)
    (djs||[]).forEach(d=>{if((d.recepteurs||[]).length===0)return;const cc=this.currentCapacity(d);if(cc.izBase<=0)return;if(!cc.ok)add('error','Courant admissible insuffisant '+(d.code||'CB')+' : In '+cc.inA+'A > Iz '+cc.iz+'A (pose '+cc.method+', '+cc.iso+', '+d.section+'mm2, K1='+cc.k1+' K2='+cc.k2+') — augmenter la section.');});
    // Parafoudre (NF C 15-100 §534)
    const _pf=this.parafoudreRequis();
    if(_pf.required&&!_pf.installed)add('error','Parafoudre Type 2 obligatoire : '+_pf.reason+'. Ajouter un parafoudre en tete d\'installation.');
    else if(_pf.recommended&&!_pf.installed)add('warn','Parafoudre Type 2 recommande (ligne aerienne / zone exposee) — a confirmer selon le niveau keraunique.');
    else if(_pf.installed)add('info','Parafoudre declare en tete d\'installation.');
    // Regime de neutre (SLT) et prise de terre
    const _ec=this.earthingCheck();
    if(_ec.regime==='TT'){if(_ec.RA>0&&!_ec.ulOk)add('error','Regime TT : RA '+_ec.RA+'ohm x '+_ec.Idn+'mA depasse 50V — RA doit etre <= '+_ec.limitRA+'ohm (ou differentiel plus sensible).');else if(_ec.RA>0)add('info','Regime TT : RA '+_ec.RA+'ohm conforme (<= '+_ec.limitRA+'ohm pour '+_ec.Idn+'mA).');}
    else if(_ec.regime==='IT')add('warn','Regime IT : controleur permanent d\'isolement (CPI) et limiteur de surtension requis — verifier leur presence.');
    else if(_ec.regime==='TN')add('info','Regime TN : protection des contacts indirects par les disjoncteurs (verifier Zs / longueurs maximales protegees).');
    // Equipement minimal du logement (NF C 15-100 §771)
    const _eq=this.equipmentChecklist();
    _eq.rooms.forEach(rm=>add('warn','Equipement minimal « '+rm.piece+' » : manque '+rm.manque.join(', ')+' (NF C 15-100 §771).'));
    _eq.specMissing.forEach(sp=>add('warn','Circuit specialise manquant : '+sp+' — 1 circuit dedie requis.'));
    // Salle de bains : volumes, LES, IP
    this.bathroomChecks().forEach(b=>{
      if(b.hasPriseStd)add('error','Salle de bains « '+b.piece+' » : prise standard interdite en volumes — hors volumes (>=0,6 m), IPX4 mini, DDR 30 mA. Utiliser le type « Prises SDB ».');
      add('info','Salle de bains « '+b.piece+' » : liaison equipotentielle supplementaire (LES) obligatoire · volume 0 interdit, V1 TBTS 12V/IPX4, V2 classe II/IPX4.');
    });
    return issues;
  }
  _fnPowerW(fn){const q=fn.quantite||1;if(fn.type==='eclairage')return (fn.puissance||10)*q;if(fn.type==='prises'||fn.type==='prises_sdb')return 460*q;return ({four:6000,lave_vaisselle:2200,lave_linge:2500,seche_linge:2400,chauffe_eau:3000,climatisation:2500,borne_ve:7400,hotte:300,vmc:200,portail:500,piscine:1500}[fn.type]||500)*q;}
  boardFeederDrop(tableauId,_seen){
    // Chute de tension de la liaison amont (source ou tableau parent -> tableau), recursive en cascade
    _seen=_seen||{};
    if(_seen[tableauId])return{du:0,pct:0,I:0,S:0,L:0,est:true,found:false};
    _seen[tableauId]=1;
    const tes=this.state.tableauxElec||[];const deps=this.state.departs||[];const djs=this.state.disjoncteurs||[];const pcs=this.state.pieces||[];
    const te=tes.find(t=>t.id===tableauId);
    if(!te)return{du:0,pct:0,I:0,S:0,L:0,est:true,found:false};
    let I=0;djs.filter(d=>d.tableauId===tableauId).forEach(d=>{try{I+=this.calcDjPower(d,pcs)/230;}catch(e){}});
    const triAlim=((this.state.project&&this.state.project.typeAlim)||'')==='triphase';
    const parentTe=tes.find(t=>t.id===te.departId);
    if(parentTe){
      // Tableau divisionnaire : chute du cable d'alimentation depuis le tableau parent + chute amont du parent
      const cal=+te.feederCalibre||0;
      const S=(+te.feederSection>0)?+te.feederSection:(cal?this.sectionMinForCalibre(cal):10);
      const L=(+te.feederLongueur>0)?+te.feederLongueur:8;
      const duFeeder=(triAlim?1.732:2)*0.0225*L*I/(S||1);
      const up=this.boardFeederDrop(parentTe.id,_seen);
      const du=Math.round((duFeeder+up.du)*100)/100;
      return{du,pct:Math.round(du/230*1000)/10,I:Math.round(I*10)/10,S,L,est:!(+te.feederLongueur>0),found:true,parent:parentTe.id};
    }
    const dep=deps.find(d=>d.id===te.departId)||deps.find(d=>d.type==='comptage');
    const cal=dep?(+dep.calibre||0):0;
    const S=(dep&&+dep.section>0)?+dep.section:(cal?this.sectionMinForCalibre(cal):10);
    const Ldef=(this.state.project&&+this.state.project.longArrivee>0)?+this.state.project.longArrivee:8;
    const L=(dep&&+dep.longueur>0)?+dep.longueur:Ldef;
    const tri=triAlim&&dep&&(+dep.poles>=3);
    const du=(tri?1.732:2)*0.0225*L*I/(S||1);
    return{du:Math.round(du*100)/100,pct:Math.round(du/230*1000)/10,I:Math.round(I*10)/10,S,L,est:!(dep&&+dep.longueur>0),found:!!dep};
  }
  voltageDropOf(d){
    let I=0;try{I=this.calcDjPower(d,this.state.pieces||[])/230;}catch(e){}
    const S=parseFloat(d.section)||1.5;const L=(+d.longueur>0)?+d.longueur:20;
    const tri=((this.state.project&&this.state.project.typeAlim)||'')==='triphase'&&this._poles(d)>=3;
    const du=(tri?1.732:2)*0.0225*L*I/S;
    let duMain=0;try{duMain=this.boardFeederDrop(d.tableauId).du;}catch(e){}
    const duCumul=Math.round((du+duMain)*100)/100;
    return{I,S,L,du:Math.round(du*100)/100,pct:Math.round(du/230*1000)/10,
      duMain,pctMain:Math.round(duMain/230*1000)/10,
      duCumul,pctCumul:Math.round(duCumul/230*1000)/10,est:!(+d.longueur>0)};
  }
  _circuitIsEcl(d){
    const refType={};(this.state.pieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{refType[fn.ref]=fn.type;}));
    const refs=d.recepteurs||[];return refs.length>0&&refs.every(rf=>refType[rf]==='eclairage');
  }
  recommendedSection(d){
    // Plus petite section normalisee respectant la chute de tension cumulee + le calibre
    const lim=this._circuitIsEcl(d)?3:5;
    const smin=this.sectionMinForCalibre(+d.calibre||16);
    let I=0;try{I=this.calcDjPower(d,this.state.pieces||[])/230;}catch(e){}
    const L=(+d.longueur>0)?+d.longueur:20;
    const tri=((this.state.project&&this.state.project.typeAlim)||'')==='triphase'&&this._poles(d)>=3;
    let duMain=0;try{duMain=this.boardFeederDrop(d.tableauId).du;}catch(e){}
    const SECTIONS=[1.5,2.5,4,6,10,16,25,35,50,70,95];
    for(let i=0;i<SECTIONS.length;i++){
      const S=SECTIONS[i];if(S<smin)continue;
      const du=(tri?1.732:2)*0.0225*L*I/S;const pct=(du+duMain)/230*100;
      if(pct<=lim)return{S,pct:Math.round(pct*10)/10,lim,smin,I,L};
    }
    return{S:SECTIONS[SECTIONS.length-1],pct:null,lim,smin,I,L};
  }
  IZ_TABLE={
    PVC:{B:{1.5:15.5,2.5:21,4:28,6:36,10:50,16:68,25:89,35:110,50:134},C:{1.5:17.5,2.5:24,4:32,6:41,10:57,16:76,25:96,35:119,50:144},E:{1.5:18.5,2.5:25,4:34,6:43,10:60,16:80,25:101,35:126,50:153}},
    PR:{B:{1.5:19.5,2.5:27,4:36,6:46,10:63,16:85,25:112,35:138,50:168},C:{1.5:22,2.5:30,4:40,6:51,10:70,16:94,25:119,35:147,50:179},E:{1.5:23,2.5:31,4:42,6:54,10:75,16:100,25:127,35:158,50:192}}
  };
  _izK1(temp,iso){const t=+temp||30;const tbl=iso==='PR'?{30:1,35:0.96,40:0.91,45:0.87,50:0.82,55:0.76,60:0.71}:{30:1,35:0.94,40:0.87,45:0.79,50:0.71,55:0.61,60:0.5};const keys=Object.keys(tbl).map(Number);let best=keys[0];keys.forEach(k=>{if(t>=k)best=k;});return tbl[best];}
  _izK2(n){const k={1:1,2:0.8,3:0.7,4:0.65,5:0.6,6:0.57,7:0.54,8:0.52};const v=Math.max(1,Math.round(+n||1));return v>=9?0.5:(k[v]||1);}
  currentCapacity(d){
    const pr=this.state.project||{};const iso=(pr.isolant==='PR')?'PR':'PVC';
    const method=['B','C','E'].indexOf(pr.poseMethod)>=0?pr.poseMethod:'B';
    const S=parseFloat(d.section)||1.5;const tbl=(this.IZ_TABLE[iso]||{})[method]||{};
    const izBase=tbl[S]||0;const k1=this._izK1(pr.tempAmbiante,iso);const k2=this._izK2(pr.groupement);
    const iz=Math.round(izBase*k1*k2*10)/10;const inA=+d.calibre||0;
    return{iz,izBase,k1,k2,iso,method,inA,ok:izBase>0?inA<=iz*1.05:true};
  }
  _MOTOR_TYPES=['climatisation','piscine','portail','vmc'];
  motorStartDrop(d){
    // Chute de tension transitoire au demarrage d'un circuit moteur (pointe kd x In)
    const refType={};(this.state.pieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.ref)refType[fn.ref]=fn.type;}));
    const refs=d.recepteurs||[];if(!refs.some(rf=>this._MOTOR_TYPES.indexOf(refType[rf])>=0))return null;
    const kd=(this.state.project&&+this.state.project.motorKd>0)?+this.state.project.motorKd:3;
    let vd=null;try{vd=this.voltageDropOf(d);}catch(e){}if(!vd)return null;
    const pctStart=Math.round((vd.pctMain+vd.pct*kd)*10)/10;
    return{kd,pctStart,pctNom:vd.pctCumul,lim:10};
  }
  _circuitIm(d){
    // Courant de fonctionnement magnetique (borne haute de la bande de declenchement)
    const k={B:5,C:10,D:20}[(d.courbe||'C').toUpperCase()]||10;
    return k*(+d.calibre||10);
  }
  lmaxProtege(d){
    // Longueur maximale protegee par le declenchement magnetique (UTE C 15-105, methode simplifiee)
    // Lmax = 0,8 . U0 . Sph / (rho . (1+m) . Im),  m = Sph/SPE (=1 si PE de meme section)
    const S=parseFloat(d.section)||1.5;const Im=this._circuitIm(d);
    if(Im<=0)return{lmax:Infinity,Im,S};
    const rho=0.0225,m=1,U0=230;
    const lmax=(0.8*U0*S)/(rho*(1+m)*Im);
    return{lmax:Math.round(lmax),Im,S};
  }
  phaseAssign(){
    const djs=this.state.disjoncteurs||[];const pcs=this.state.pieces||[];const ph=[0,0,0];const map={};
    djs.forEach(d=>{const pp=+d.phase;if(pp>=1&&pp<=3){let w=0;try{w=this.calcDjPower(d,pcs);}catch(e){}map[d.id]=pp;ph[pp-1]+=w;}});
    djs.filter(d=>!(+d.phase>=1&&+d.phase<=3)).map(d=>{let w=0;try{w=this.calcDjPower(d,pcs);}catch(e){}return{d,w};}).sort((a,b)=>b.w-a.w).forEach(it=>{let mi=0;if(ph[1]<ph[mi])mi=1;if(ph[2]<ph[mi])mi=2;ph[mi]+=it.w;map[it.d.id]=mi+1;});
    return{map,ph};
  }
  phaseBalance(){
    if(((this.state.project&&this.state.project.typeAlim)||'monophase')!=='triphase')return null;
    const{ph}=this.phaseAssign();
    const max=Math.max(ph[0],ph[1],ph[2]),min=Math.min(ph[0],ph[1],ph[2]);
    const imbalance=max>0?Math.round((max-min)/max*100):0;
    return{L1:ph[0],L2:ph[1],L3:ph[2],max,min,tot:ph[0]+ph[1]+ph[2],imbalance};
  }
  dropPhase(cbId,phase){if(!cbId)return;this.setState(s=>({disjoncteurs:s.disjoncteurs.map(d=>d.id===cbId?{...d,phase}:d)}));this.showToast('Phase L'+phase+' assignee');}
  autoBalancePhases(){const pcs=this.state.pieces||[];const ph=[0,0,0];const map={};(this.state.disjoncteurs||[]).map(d=>{let w=0;try{w=this.calcDjPower(d,pcs);}catch(e){}return{d,w};}).sort((a,b)=>b.w-a.w).forEach(it=>{let mi=0;if(ph[1]<ph[mi])mi=1;if(ph[2]<ph[mi])mi=2;ph[mi]+=it.w;map[it.d.id]=mi+1;});this.setState(s=>({disjoncteurs:s.disjoncteurs.map(d=>map[d.id]?{...d,phase:map[d.id]}:d)}));this.showToast('Phases equilibrees');}
  _nextBranchCalibre(I,tri){const std=tri?[10,15,30,45,60]:[15,30,45,60,90];for(let i=0;i<std.length;i++)if(std[i]>=I)return std[i];return std[std.length-1];}
  branchCurrent(){
    const pr=this.state.project||{};const tri=(pr.typeAlim==='triphase');const ks=(+pr.coefSimul||1);
    const bil=this.bilanPuissance();const W=bil.totalFoisonneW*ks;
    if(tri){
      const pb=this.phaseBalance();
      const I1=pb?pb.L1/230:0,I2=pb?pb.L2/230:0,I3=pb?pb.L3/230:0;const Imax=Math.max(I1,I2,I3);
      return{tri:true,W,I1,I2,I3,Imax,Itheo:W/(Math.sqrt(3)*400),calibre:this._nextBranchCalibre(Imax,true),imbalance:pb?pb.imbalance:0};
    }
    const I=W/230;return{tri:false,W,I,Imax:I,calibre:this._nextBranchCalibre(I,false)};
  }
  gtlDimensions(){
    // Gaine Technique Logement / ETEL — dimensionnement indicatif NF C 15-100
    const tes=this.state.tableauxElec||[];let usedModules=0,rangees=0,capacity=0;
    tes.forEach(t=>{const br=this._boardRows(t);usedModules+=br.usedModules;rangees+=br.nbRangees;capacity+=br.capacity;});
    const ROW=((this.state.project&&this.state.project.modulesParRangee)||13);
    const rowsComm=1;const rowsTotal=rangees+rowsComm;
    const etelWidth=600,etelDepth=200;// mm — largeur et profondeur mini ETEL
    const heightMM=Math.max(2000,rowsTotal*250+300);
    const reservePct=usedModules>0&&capacity>0?Math.round((capacity-usedModules)/capacity*100):20;
    return{usedModules,rangees,rowsComm,rowsTotal,capacity,etelWidth,etelDepth,heightMM,ROW,reservePct,boards:tes.length};
  }
  _soilRho(){return (this.state.project&&+this.state.project.rhoSol>0)?+this.state.project.rhoSol:150;}
  resistanceTerreEstimee(){
    const pr=this.state.project||{};const L=+pr.terreLongueur||0;if(L<=0)return null;
    const rho=this._soilRho();const type=pr.terreType||'boucle';
    const RA=type==='piquet'?rho/L:(2*rho/L);// piquet vertical ~ rho/L ; boucle fond de fouille ~ 2rho/L
    return Math.round(RA);
  }
  earthingCheck(){
    const pr=this.state.project||{};const regime=pr.regimeNeutre||'TT';
    const RAm=+pr.resistanceTerre||0;const RAest=this.resistanceTerreEstimee();
    const RA=RAm>0?RAm:(RAest||0);
    const deps=this.state.departs||[];
    const headDdr=Math.min.apply(null,[500].concat(deps.filter(d=>+d.ddr>0).map(d=>+d.ddr)));
    const IdnA=headDdr/1000;const limitRA=RA>0?Math.round(50/IdnA):0;const ulOk=RA>0?(RA*IdnA<=50):true;
    return{regime,RA,RAest,RAm,Idn:headDdr,limitRA,ulOk};
  }
  _EQUIP_MIN={sejour:{prises:5,ecl:1},cuisine:{prises:6,ecl:1},chambre:{prises:3,ecl:1},bureau:{prises:3,ecl:1},sdb:{prises:1,ecl:1},wc:{prises:0,ecl:1},couloir:{prises:1,ecl:1},garage:{prises:1,ecl:1},cave:{prises:0,ecl:1},exterieur:{prises:0,ecl:1}};
  equipmentChecklist(){
    const pcs=this.state.pieces||[];const rooms=[];
    pcs.forEach(p=>{const min=this._EQUIP_MIN[p.type];if(!min)return;let prises=0,ecl=0;
      (p.fonctions||[]).forEach(fn=>{const q=+fn.quantite||1;if(fn.type==='prises'||fn.type==='prises_sdb')prises+=q;if(fn.type==='eclairage')ecl+=q;});
      const manque=[];if(prises<min.prises)manque.push((min.prises-prises)+' prise(s)');if(ecl<min.ecl)manque.push('1 point lumineux');
      if(manque.length)rooms.push({piece:p.nom,type:p.type,manque});});
    const types=new Set();pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>types.add(fn.type)));
    const specMissing=[];if(pcs.some(p=>p.type==='cuisine')&&!types.has('four'))specMissing.push('cuisson (four / plaque)');if(!types.has('lave_linge'))specMissing.push('lave-linge');
    return{rooms,specMissing};
  }
  bathroomChecks(){
    const pcs=this.state.pieces||[];const out=[];
    pcs.forEach(p=>{if(p.type!=='sdb')return;const fns=p.fonctions||[];
      out.push({piece:p.nom,hasPriseStd:fns.some(fn=>fn.type==='prises'),prisesSdb:fns.filter(fn=>fn.type==='prises_sdb').length});});
    return out;
  }
  parafoudreRequis(){
    // NF C 15-100 §534 (simplifie) — obligation du parafoudre Type 2
    const pr=this.state.project||{};
    const aerien=(pr.alimReseau||'souterrain')==='aerien';
    const para=!!pr.paratonnerre;
    const ng=+pr.densiteFoudre||0; // densite de foudroiement Ng (coups/km2/an)
    let required=false,reason='';
    if(para){required=true;reason='presence d\'un paratonnerre sur le batiment';}
    else if(aerien&&ng>=2.5){required=true;reason='ligne aerienne en zone AQ2 (Ng '+ng+' >= 2,5)';}
    const recommended=!required&&(aerien||ng>=1.5);
    return{required,recommended,reason,aerien,para,ng,installed:!!pr.parafoudre};
  }
  vdiSummary(){
    const pcs=this.state.pieces||[];const cnt={};
    pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{const q=+fn.quantite||1;cnt[fn.type]=(cnt[fn.type]||0)+q;}));
    const rj45=cnt.rj45||0,tv=cnt.tv||0;
    const grade=(this.state.project&&+this.state.project.gradeVDI)||2;
    const minRj45=Math.max(2,pcs.length);// indicatif : >=1 socle par piece principale
    const brassage=Math.max(rj45,tv);
    const gradeLabel=grade>=3?'Grade 3 — TV + données (jusqu\'à 1,2 GHz)':grade===2?'Grade 2 TV — données + télévision':'Grade 1 — téléphone / données de base';
    return{rj45,tv,grade,minRj45,brassage,gradeLabel,ok:rj45>=minRj45};
  }
  selectivityTable(){
    const s=this.state;const tes=s.tableauxElec||[];const deps=s.departs||[];const djs=s.disjoncteurs||[];const rows=[];
    tes.forEach(te=>{
      const tdjs=djs.filter(d=>d.tableauId===te.id);
      const parentTe=tes.find(t=>t.id===te.departId);
      const ampNote=ratio=>ratio>=1.6?'Sélectif (rapport ≥1,6)':(ratio>=1?'Partiel — vérifier les courbes':'Non sélectif (calibre amont ≤ aval)');
      if(parentTe){
        const up=+te.feederCalibre||0;const upLbl='Liaison '+(parentTe.code||parentTe.nom||'TP')+(up?' '+up+'A':'');
        if(up)tdjs.forEach(d=>{const dn=+d.calibre||0;if(!dn)return;const ratio=up/dn;rows.push({te:te.code||te.nom||'TE',up:upLbl,down:(d.code||'CB')+' '+dn+'A',type:'Ampèremétrique',ratio:Math.round(ratio*100)/100,ok:ratio>=1.6,note:ampNote(ratio)});});
        return;
      }
      const dep=deps.find(d=>d.id===te.departId)||deps.find(d=>d.type==='comptage');
      if(dep){const up=+dep.calibre||0;tdjs.forEach(d=>{const dn=+d.calibre||0;if(!up||!dn)return;const ratio=up/dn;rows.push({te:te.code||te.nom||'TE',up:(dep.code||'SRC')+' '+up+'A',down:(d.code||'CB')+' '+dn+'A',type:'Ampèremétrique',ratio:Math.round(ratio*100)/100,ok:ratio>=1.6,note:ampNote(ratio)});});}
      if(dep&&+dep.ddr>0){const upd=+dep.ddr;tdjs.filter(d=>+d.ddr>0).forEach(d=>{const dnd=+d.ddr;const ratio=upd/dnd;const sel=ratio>=3;rows.push({te:te.code||te.nom||'TE',up:(dep.code||'SRC')+' '+upd+'mA',down:(d.code||'CB')+' '+dnd+'mA',type:'Différentielle',ratio:Math.round(ratio*100)/100,ok:sel,note:sel?'Sélectif (rapport ≥3 + type S amont)':'Non sélectif (rapport <3)'});});}
    });
    return rows;
  }
  renderSelectivityCard(){
    const c=this.C;const r=this.r;const rows=this.selectivityTable();
    if(rows.length===0)return null;
    const head=r('div',{style:{display:'flex',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em',paddingBottom:4,borderBottom:'2px solid '+c.bdr2}},
      r('span',{style:{width:90}},'Type'),r('span',{style:{flex:1}},'Amont'),r('span',{style:{flex:1}},'Aval'),r('span',{style:{width:48,textAlign:'right'}},'Ratio'),r('span',{style:{width:150}},'Verdict'));
    return r('div',{style:{marginTop:16}},this.Card('Sélectivité & filiation',
      r('div',{style:{paddingTop:2}},
        r('div',{style:{fontSize:10,color:c.muted,marginBottom:8,fontStyle:'italic'}},'Indicatif — sélectivité ampèremétrique (rapport ≥1,6) et différentielle (rapport ≥3, type S amont).'),
        head,
        ...rows.map((x,k)=>r('div',{key:k,style:{display:'flex',alignItems:'center',fontSize:11,padding:'4px 0',borderBottom:'1px solid '+c.bdr}},
          r('span',{style:{width:90,fontSize:9,color:c.text2}},x.type),
          r('span',{style:{flex:1,fontFamily:c.mono,color:c.text}},x.up),
          r('span',{style:{flex:1,fontFamily:c.mono,color:c.text2}},x.down),
          r('span',{style:{width:48,textAlign:'right',fontFamily:c.mono,color:c.muted}},x.ratio),
          r('span',{style:{width:150,fontSize:10,fontWeight:600,color:x.ok?c.success:c.warn}},(x.ok?'✓ ':'⚠ ')+x.note))))));
  }
  bilanPuissance(appId){
    const FAM=[{label:'Eclairage',types:['eclairage'],coef:1},{label:'Prises',types:['prises','prises_sdb'],coef:0.2},{label:'Cuisson',types:['four','hotte'],coef:0.7},{label:'Lavage',types:['lave_vaisselle','lave_linge','seche_linge'],coef:0.75},{label:'Eau chaude (ECS)',types:['chauffe_eau'],coef:1},{label:'Chauffage / Clim',types:['climatisation','vmc'],coef:1},{label:'Autres',types:['borne_ve','portail','piscine','camera','tv','rj45','sono','alarme_intrusion','detecteur_fumee','detecteur_co','visiophone','domotique','solaire','inverseur_source','controleur_tension','afficheur'],coef:0.6}];
    const pcs=(this.state.pieces||[]).filter(p=>appId==null||p.appId===appId);
    const byType={};pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{byType[fn.type]=(byType[fn.type]||0)+this._fnPowerW(fn);}));
    const fams=FAM.map(f=>{const installedW=f.types.reduce((s,t)=>s+(byType[t]||0),0);return{label:f.label,coef:f.coef,installedW,foisonneW:Math.round(installedW*f.coef)};}).filter(f=>f.installedW>0);
    const totalInstalledW=fams.reduce((s,f)=>s+f.installedW,0);
    const totalFoisonneW=fams.reduce((s,f)=>s+f.foisonneW,0);
    const kvaFoisonne=Math.round(totalFoisonneW/1000*10)/10;
    const ks=((this.state.project&&this.state.project.coefSimul)||1);
    const kvaAjuste=Math.round(totalFoisonneW*ks/1000*10)/10;
    const souscriteKva=(this.state.project&&this.state.project.puissanceSouscrite)||0;
    return{fams,totalInstalledW,totalFoisonneW,kvaFoisonne,ks,kvaAjuste,souscriteKva};
  }
  renderBilanCard(){
    const c=this.C;const r=this.r;const b=this.bilanPuissance();
    if(b.fams.length===0)return null;
    const apps=this.state.appartements||[];
    const over=b.souscriteKva>0&&b.kvaAjuste>b.souscriteKva;
    const pct=b.souscriteKva>0?Math.round(b.kvaAjuste/b.souscriteKva*100):0;
    const rowsEl=b.fams.map((f,k)=>r('div',{key:k,style:{display:'flex',alignItems:'center',fontSize:11,padding:'4px 0',borderBottom:'1px solid '+c.bdr}},
      r('span',{style:{flex:1,color:c.text}},f.label),
      r('span',{style:{width:78,textAlign:'right',color:c.muted,fontFamily:c.mono}},(f.installedW/1000).toFixed(1)+'kW'),
      r('span',{style:{width:50,textAlign:'right',color:c.muted,fontFamily:c.mono}},'×'+f.coef),
      r('span',{style:{width:80,textAlign:'right',fontWeight:700,color:c.accent,fontFamily:c.mono}},(f.foisonneW/1000).toFixed(1)+'kW')));
    return r('div',{style:{marginTop:14}},this.Card('Bilan de puissance — foisonne (indicatif)',
      r('div',{style:{paddingTop:2}},
        r('div',{style:{fontSize:10,color:c.muted,marginBottom:8,fontStyle:'italic'}},'Coefficients de foisonnement indicatifs (cosphi=1) — a valider par un professionnel.'),
        r('div',{style:{display:'flex',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em',paddingBottom:4,borderBottom:'2px solid '+c.bdr2}},
          r('span',{style:{flex:1}},'Famille'),r('span',{style:{width:78,textAlign:'right'}},'Installe'),r('span',{style:{width:50,textAlign:'right'}},'Coef'),r('span',{style:{width:80,textAlign:'right'}},'Foisonne')),
        ...rowsEl,
        r('div',{style:{display:'flex',marginTop:8,fontSize:12,fontWeight:700}},
          r('span',{style:{flex:1,color:c.text2}},'Total foisonne'),
          r('span',{style:{color:c.text2,fontFamily:c.mono}},b.kvaFoisonne.toFixed(1)+' kVA')),
        r('div',{style:{display:'flex',alignItems:'center',gap:8,margin:'8px 0 6px'}},
          r('span',{style:{fontSize:11,color:c.text2,flex:1}},'Coefficient de simultaneite (ks)'),
          r('input',{type:'number',min:0.1,max:1,step:0.05,value:b.ks,onChange:e=>{const v=+e.target.value;this.setState(st=>({project:{...st.project,coefSimul:(Number.isFinite(v)&&v>0)?v:1}}));},style:{width:74,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'4px 8px',color:c.text,fontSize:12,fontFamily:c.mono,textAlign:'right'}})),
        r('div',{style:{display:'flex',fontSize:14,fontWeight:800}},
          r('span',{style:{flex:1,color:c.text}},'Total ajuste (× '+b.ks+')'),
          r('span',{style:{color:c.accent,fontFamily:c.mono}},b.kvaAjuste.toFixed(1)+' kVA')),
        b.souscriteKva>0?r('div',null,
          r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:11,color:c.muted,margin:'8px 0 4px'}},
            r('span',null,'Puissance souscrite : '+b.souscriteKva+' kVA'),
            r('span',{style:{fontWeight:700,color:over?c.danger:c.success}},over?'Depassement !':pct+'% utilises')),
          r('div',{style:{height:7,background:c.bdr2,borderRadius:4,overflow:'hidden'}},r('div',{style:{height:'100%',width:Math.min(100,pct)+'%',background:over?c.danger:'linear-gradient(90deg,#0277BD,#0EA5E9)',borderRadius:4}}))):null,
        (()=>{const pb=this.phaseBalance();if(!pb)return null;const mx=Math.max(pb.L1,pb.L2,pb.L3,1);return r('div',{style:{marginTop:12}},r('div',{style:{fontSize:9,fontWeight:700,color:pb.imbalance>30?c.warn:c.muted,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}},'Equilibrage triphase ('+pb.imbalance+'%'+(pb.imbalance>30?' — a reequilibrer':'')+')'),...[['L1',pb.L1,'#6d4c41'],['L2',pb.L2,'#212121'],['L3',pb.L3,'#9e9e9e']].map((x,k)=>r('div',{key:k,style:{display:'flex',alignItems:'center',gap:8,marginBottom:4}},r('span',{style:{width:22,fontSize:10,fontWeight:700,color:x[2],fontFamily:c.mono}},x[0]),r('div',{style:{flex:1,height:7,background:c.bdr2,borderRadius:4,overflow:'hidden'}},r('div',{style:{height:'100%',width:(x[1]/mx*100)+'%',background:x[2],borderRadius:4}})),r('span',{style:{width:48,textAlign:'right',fontSize:10,fontFamily:c.mono,color:c.text2}},(x[1]/1000).toFixed(1)+'kW'),r('span',{style:{width:42,textAlign:'right',fontSize:10,fontFamily:c.mono,color:c.muted}},Math.round(x[1]/230)+'A'))));})(),
        (()=>{const bc=this.branchCurrent();return r('div',{style:{marginTop:12,display:'flex',alignItems:'center',gap:10,padding:'9px 12px',background:c.accentSoft||'rgba(2,132,199,.08)',border:'1px solid '+c.bdr,borderRadius:9}},
          r('div',{style:{flex:1}},r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em'}},'Disjoncteur de branchement conseille ('+(bc.tri?'triphase':'monophase')+')'),r('div',{style:{fontSize:10,color:c.muted,marginTop:1}},bc.tri?('phase la plus chargee '+Math.round(bc.Imax)+'A · theo. '+Math.round(bc.Itheo)+'A'):('courant total '+Math.round(bc.I)+'A'))),
          r('div',{style:{fontSize:22,fontWeight:800,color:c.accent,fontFamily:c.mono}},bc.calibre+'A'));})(),
        apps.length>1?r('div',{style:{marginTop:12}},
          r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5}},'Repartition par appartement'),
          ...apps.map(ap=>{const ba=this.bilanPuissance(ap.id);return r('div',{key:ap.id,style:{display:'flex',fontSize:11,padding:'3px 0',borderBottom:'1px solid '+c.bdr}},r('span',{style:{flex:1,color:c.text2}},ap.nom),r('span',{style:{fontFamily:c.mono,color:c.accent,fontWeight:700}},ba.kvaFoisonne.toFixed(1)+' kVA'))})):null,
        (()=>{const ec=this.earthConductorSizing();const ck=this.earthingCheck();const row=(l,v)=>r('div',{style:{display:'flex',fontSize:11,padding:'3px 0',borderBottom:'1px solid '+c.bdr}},r('span',{style:{flex:1,color:c.text2}},l),r('span',{style:{fontFamily:c.mono,color:c.text,fontWeight:700}},v));return r('div',{style:{marginTop:12}},
          r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5}},'Terre & conducteurs de protection (IEC 60364-5-54)'),
          row('Conducteur PE principal',(ec.pe?ec.pe+' mm²':'—')+(ec.phase?' (phase '+ec.phase+' mm²)':'')),
          row('Liaison équipotentielle principale',ec.lep+' mm²'),
          row('Conducteur de terre',ec.terreNu+' mm² Cu nu / '+ec.terreIsole+' mm² isolé'),
          ck.RA>0?r('div',{style:{display:'flex',alignItems:'center',fontSize:11,padding:'3px 0'}},r('span',{style:{flex:1,color:c.text2}},'Prise de terre ('+ck.regime+', IΔn '+ck.Idn+' mA)'),r('span',{style:{fontFamily:c.mono,fontWeight:700,color:ck.ulOk?c.success:c.danger}},'RA '+ck.RA+' Ω '+(ck.ulOk?'≤ '+ck.limitRA+' Ω ✓':'> '+ck.limitRA+' Ω ✗'))):r('div',{style:{fontSize:10,color:c.muted,fontStyle:'italic',paddingTop:3}},'Saisir la résistance/longueur de terre dans le projet pour vérifier RA·IΔn ≤ 50 V.'));})())));
  }
  FABRICANTS=['Generique','Schneider','Hager','Legrand'];
  _mfgRef(ref,fab){
    if(!fab||fab==='Generique')return ref;
    const parts=ref.split('-');const kind=parts[0];
    // poles ex "1P", courbe+cal ex "C16", ddr ex "30mA", type "A"/"AC", rows ex "3R"
    const poles=parts[1]||'';const RANGE={
      Schneider:{dj:'Acti9 iC60N',id:'Acti9 iID',cof:'Resi9'},
      Hager:{dj:'Hager MFN',id:'Hager CDC',cof:'Hager Gamma'},
      Legrand:{dj:'Legrand DX³ 6000',id:'Legrand DX³-ID',cof:'Legrand Drivia'}
    }[fab];
    if(!RANGE)return ref;
    if(kind==='DJ')return RANGE.dj+' '+(parts[2]||'')+' '+poles;
    if(kind==='ID')return RANGE.id+' '+poles+' '+(parts[2]||'')+' Type '+(parts[3]||'AC');
    if(kind==='COF')return RANGE.cof+' '+(parts[1]||'')+'×13';
    return ref;
  }
  _price(ref,base){const ov=(this.state.project&&this.state.project.priceOverrides)||{};return ov[ref]!=null?ov[ref]:base;}
  _catalog(d){
    const cal=+d.calibre||10;const poles=this._poles(d);const courbe=d.courbe||'C';
    let price=poles===1?9:poles===2?16:poles===3?28:38;if(cal>20)price*=1.3;if(cal>32)price*=1.6;
    const ref='DJ-'+poles+'P-'+courbe+cal;
    return{ref,label:'Disjoncteur '+poles+'P '+cal+'A '+courbe,price:this._price(ref,Math.round(price*100)/100)};
  }
  _catalogID(ddr,poles,typeA){
    let price=poles>=4?75:45;if(ddr<=30)price+=12;if(typeA)price+=18;
    const ref='ID-'+poles+'P-'+ddr+'mA-'+(typeA?'A':'AC');
    return{ref,label:'Inter. differentiel '+poles+'P '+ddr+'mA Type '+(typeA?'A':'AC'),price:this._price(ref,Math.round(price*100)/100)};
  }
  _catalogCoffret(rows){const ref='COF-'+rows+'R';const base=rows<=1?22:rows<=2?38:rows<=3?52:70;return{ref,label:'Coffret '+rows+' rangee'+(rows>1?'s':'')+' (13 mod.)',price:this._price(ref,base)};}
  importTarif(){
    const input=document.createElement('input');input.type='file';input.accept='.csv,text/csv';
    input.onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;const rd=new FileReader();rd.onerror=()=>this.showToast('Erreur de lecture');rd.onload=ev=>{try{const txt=String(ev.target.result).replace(/^﻿/,'');const ov={};txt.split(/\r?\n/).forEach(line=>{const parts=line.split(/[;,\t]/);if(parts.length>=2){const ref=(parts[0]||'').trim();const pr=parseFloat(String(parts[1]).replace(',','.'));if(ref&&Number.isFinite(pr))ov[ref]=pr;}});if(Object.keys(ov).length===0){this.showToast('Aucun tarif reconnu (format: reference;prix)');return;}this.setState(s=>({project:{...s.project,priceOverrides:{...(s.project.priceOverrides||{}),...ov}}}));this.showToast(Object.keys(ov).length+' tarifs importes');}catch(err){this.showToast('CSV illisible');}};rd.readAsText(f);};
    input.click();
  }
  exportChiffrageCSV(){
    try{
      const ch=this.chiffrage();const esc=v=>{const t=v==null?'':String(v);return /[";\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t;};
      const lines=[['Reference','Ref fabricant','Designation','Quantite','PU HT','Total HT'].join(';')];
      ch.items.forEach(i=>lines.push([i.ref,i.mfgRef||'',i.label,i.qty,i.unit.toFixed(2),i.total.toFixed(2)].map(esc).join(';')));
      lines.push('');lines.push(';;;Total HT;'+ch.totalHT.toFixed(2));lines.push(';;;TVA 20%;'+ch.tva.toFixed(2));lines.push(';;;Total TTC;'+ch.totalTTC.toFixed(2));
      const csv='﻿'+lines.join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);
      const a=document.createElement('a');const slug=(((this.state.project||{}).nom)||'projet').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase()||'projet';a.href=url;a.download='cebat_chiffrage_'+slug+'.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      this.showToast('Chiffrage CSV exporte');
    }catch(e){this.showToast('Echec export chiffrage');}
  }
  printBonCommande(){
    try{
      const ch=this.chiffrage();const pr=this.state.project||{};const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      let dateStr='';try{dateStr=new Date().toLocaleDateString('fr-FR');}catch(e){}
      let rows='';ch.items.forEach(i=>{rows+='<tr><td style="font-family:monospace;padding:1mm 2mm">'+esc(i.ref)+'</td><td style="font-family:monospace;padding:1mm 2mm">'+esc(i.mfgRef||'')+'</td><td style="padding:1mm 2mm">'+esc(i.label)+'</td><td style="text-align:right;padding:1mm 2mm">'+i.qty+'</td><td style="text-align:right;padding:1mm 2mm">'+i.unit.toFixed(2)+'</td><td style="text-align:right;padding:1mm 2mm">'+i.total.toFixed(2)+'</td></tr>';});
      const html='<div style="font-family:Arial,sans-serif;padding:6mm;color:#111;"><h2 style="margin:0 0 2mm">Bon de commande — '+esc(pr.nom||'')+'</h2><div style="font-size:10pt;color:#444;margin-bottom:4mm">Client : '+esc(pr.client||'-')+' &nbsp;|&nbsp; Date : '+esc(dateStr)+' &nbsp;|&nbsp; Bureau : '+esc(pr.bureau||'-')+'</div><table style="width:100%;border-collapse:collapse;font-size:9pt"><thead><tr style="background:#eef;border-bottom:1px solid #99a"><th style="text-align:left;padding:1mm 2mm">Reference</th><th style="text-align:left">Ref fab.</th><th style="text-align:left">Designation</th><th style="text-align:right">Qte</th><th style="text-align:right">PU HT</th><th style="text-align:right">Total HT</th></tr></thead><tbody>'+rows+'</tbody></table><div style="text-align:right;margin-top:4mm;font-size:10pt"><div>Total HT : <b>'+ch.totalHT.toFixed(2)+' EUR</b></div><div>TVA 20% : '+ch.tva.toFixed(2)+' EUR</div><div style="font-size:12pt">Total TTC : <b>'+ch.totalTTC.toFixed(2)+' EUR</b></div></div><div style="font-size:8pt;color:#888;margin-top:6mm">Prix indicatifs — a confronter au catalogue fournisseur.</div></div>';
      const cont=document.createElement('div');cont.id='cebat-bon';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';cont.innerHTML=html;document.body.appendChild(cont);
      const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
      const cleanup=()=>{cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);window.print();
    }catch(e){this.showToast('Echec bon de commande');}
  }
  printDossier(){
    try{
      const s=this.state;const pr=s.project||{};const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      let dateStr='';try{dateStr=new Date().toLocaleDateString('fr-FR');}catch(e){}
      const teCode=id=>{const t=(s.tableauxElec||[]).find(x=>x.id===id);return t?(t.code||t.nom||''):'';};
      const sec=(title)=>'<h2 style="margin:6mm 0 2mm;font-size:14pt;color:#0277BD;border-bottom:2px solid #0277BD;padding-bottom:1mm">'+esc(title)+'</h2>';
      let html='<div style="font-family:Arial,sans-serif;padding:8mm;color:#111;">';
      html+='<div style="text-align:center;margin-bottom:8mm"><div style="font-size:22pt;font-weight:800;color:#0277BD">Dossier technique</div><div style="font-size:13pt;margin-top:2mm">'+esc(pr.nom||'Installation electrique')+'</div><div style="font-size:9pt;color:#666;margin-top:1mm">NF C 15-100 — genere le '+esc(dateStr)+'</div></div>';
      const pf=[['Adresse',pr.adresse],['Client',pr.client],['Telephone',pr.tel],['Email',pr.email],['Alimentation',pr.typeAlim],['Puissance souscrite',(pr.puissanceSouscrite||'-')+' kVA'],['Type construction',pr.typeConstruction],['Annee',pr.annee]];
      html+='<table style="width:100%;border-collapse:collapse;font-size:10pt;margin-bottom:4mm">'+pf.map(p=>'<tr><td style="padding:1mm 2mm;color:#666;width:40mm">'+esc(p[0])+'</td><td style="padding:1mm 2mm;font-weight:600">'+esc(p[1]==null||p[1]===''?'-':p[1])+'</td></tr>').join('')+'</table>';
      html+=sec('Schema unifilaire');
      const boards=s.tableauxElec||[];
      if(boards.length)boards.forEach(te=>{let sv='';try{sv=this.schemaSVG(te.id);}catch(e){}html+='<div style="text-align:center;page-break-inside:avoid;margin-bottom:4mm">'+sv+'</div>';});
      else html+='<div style="color:#888;font-size:9pt">Aucun tableau defini.</div>';
      html+=sec('Nomenclature des circuits');
      const pcs=s.pieces||[];
      let nrows='';(s.disjoncteurs||[]).forEach(d=>{let pw='';try{pw=this.calcDjPower(d,pcs);}catch(e){}let du='';try{du=this.voltageDropOf(d).pctCumul;}catch(e){}nrows+='<tr>'+[d.code,teCode(d.tableauId),(d.recepteurs||[]).join(' '),(d.calibre||'')+'A',d.courbe||'',this._poles(d)+'P',(d.ddr?d.ddr+'mA':'-'),(d.section||'')+'mm2',(pw===''?'':pw+'W'),(du===''?'-':du+'%')].map(v=>'<td style="padding:.8mm 2mm;border-bottom:1px solid #ddd">'+esc(v)+'</td>').join('')+'</tr>';});
      html+='<table style="width:100%;border-collapse:collapse;font-size:8.5pt"><thead><tr style="background:#eef">'+['Code','Tableau','Recepteurs','Calibre','Courbe','Poles','DDR','Section','Puissance','U cum.'].map(h=>'<th style="text-align:left;padding:1mm 2mm">'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+(nrows||'<tr><td colspan="10" style="padding:2mm;color:#888">Aucun disjoncteur.</td></tr>')+'</tbody></table>';
      html+=sec('Bilan de puissance');
      const b=this.bilanPuissance();
      let brows='';b.fams.forEach(f=>{brows+='<tr><td style="padding:.8mm 2mm;border-bottom:1px solid #ddd">'+esc(f.label)+'</td><td style="text-align:right;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+f.installedW+' W</td><td style="text-align:right;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+f.coef+'</td><td style="text-align:right;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+f.foisonneW+' W</td></tr>';});
      html+='<table style="width:100%;border-collapse:collapse;font-size:9pt"><thead><tr style="background:#eef"><th style="text-align:left;padding:1mm 2mm">Famille</th><th style="text-align:right;padding:1mm 2mm">Installe</th><th style="text-align:right;padding:1mm 2mm">Coef</th><th style="text-align:right;padding:1mm 2mm">Foisonne</th></tr></thead><tbody>'+(brows||'<tr><td colspan="4" style="padding:2mm;color:#888">Aucune charge.</td></tr>')+'</tbody></table>';
      html+='<div style="text-align:right;margin-top:2mm;font-size:10pt">Total foisonne : <b>'+b.kvaFoisonne+' kVA</b>'+(b.ks!==1?' &nbsp;|&nbsp; Ajuste (ks '+b.ks+') : <b>'+b.kvaAjuste+' kVA</b>':'')+(b.souscriteKva?' &nbsp;|&nbsp; Souscrit : '+b.souscriteKva+' kVA':'')+'</div>';
      html+=sec('Conformite NF C 15-100');
      let issues=[];try{issues=this.checkConformite();}catch(e){}
      const lvlc={error:'#dc2626',warn:'#d97706',info:'#0277BD'};const lvll={error:'Erreur',warn:'Avertissement',info:'Info'};
      if(issues.length)html+='<div style="font-size:9pt">'+issues.map(i=>'<div style="padding:.6mm 0"><span style="color:'+(lvlc[i.level]||'#666')+';font-weight:700">['+(lvll[i.level]||i.level)+']</span> '+esc(i.msg)+'</div>').join('')+'</div>';
      else html+='<div style="color:#16a34a;font-size:10pt">Aucune anomalie detectee.</div>';
      html+=sec('Chiffrage estimatif');
      const ch=this.chiffrage();
      let crows='';ch.items.forEach(i=>{crows+='<tr><td style="font-family:monospace;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+esc(i.ref)+'</td><td style="padding:.8mm 2mm;border-bottom:1px solid #ddd">'+esc(i.label)+'</td><td style="text-align:right;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+i.qty+'</td><td style="text-align:right;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+i.unit.toFixed(2)+'</td><td style="text-align:right;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+i.total.toFixed(2)+'</td></tr>';});
      html+='<table style="width:100%;border-collapse:collapse;font-size:9pt"><thead><tr style="background:#eef"><th style="text-align:left;padding:1mm 2mm">Ref</th><th style="text-align:left;padding:1mm 2mm">Designation</th><th style="text-align:right;padding:1mm 2mm">Qte</th><th style="text-align:right;padding:1mm 2mm">PU HT</th><th style="text-align:right;padding:1mm 2mm">Total HT</th></tr></thead><tbody>'+(crows||'<tr><td colspan="5" style="padding:2mm;color:#888">Aucun article.</td></tr>')+'</tbody></table>';
      html+='<div style="text-align:right;margin-top:2mm;font-size:10pt"><div>Total HT : <b>'+ch.totalHT.toFixed(2)+' EUR</b></div><div>TVA 20% : '+ch.tva.toFixed(2)+' EUR</div><div style="font-size:12pt">Total TTC : <b>'+ch.totalTTC.toFixed(2)+' EUR</b></div></div>';
      html+='<div style="font-size:8pt;color:#888;margin-top:6mm">Dossier genere par Cebat — estimations indicatives a valider par un professionnel qualifie.</div></div>';
      const cont=document.createElement('div');cont.id='cebat-dossier';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';cont.innerHTML=html;document.body.appendChild(cont);
      const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
      if(!document.getElementById('cebat-doscss')){const st=document.createElement('style');st.id='cebat-doscss';st.textContent='@media print{@page{size:A4 portrait;margin:8mm;}#cebat-dossier svg{max-width:100% !important;height:auto !important;}}';document.head.appendChild(st);}
      const cleanup=()=>{const e=document.getElementById('cebat-doscss');if(e)e.remove();cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);window.print();
    }catch(e){this.showToast('Echec dossier complet');}
  }
  printAutocontrole(){
    try{
      const s=this.state;const pr=s.project||{};const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      let dateStr='';try{dateStr=new Date().toLocaleDateString('fr-FR');}catch(e){}
      const bc=this.branchCurrent();let issues=[];try{issues=this.checkConformite();}catch(e){}
      const nErr=issues.filter(i=>i.level==='error').length;const nWarn=issues.filter(i=>i.level==='warn').length;
      const mesures=s.mesures||{};
      const sec=t=>'<h3 style="margin:5mm 0 2mm;font-size:12pt;color:#0277BD;border-bottom:1px solid #0277BD;padding-bottom:1mm">'+esc(t)+'</h3>';
      let html='<div style="font-family:Arial,sans-serif;padding:8mm;color:#111;font-size:10pt">';
      html+='<div style="display:flex;justify-content:space-between;align-items:flex-start"><div><div style="font-size:18pt;font-weight:800;color:#0277BD">Fiche d\'autocontrole</div><div style="font-size:11pt">'+esc(pr.nom||'')+'</div></div><div style="text-align:right;font-size:9pt;color:#555">NF C 15-100<br>'+esc(dateStr)+'</div></div>';
      html+=sec('Identification');
      const idf=[['Client',pr.client],['Adresse',pr.adresse],['Installateur / Bureau',pr.bureau],['Alimentation',(pr.typeAlim==='triphase'?'Triphase 400V':'Monophase 230V')],['Disjoncteur de branchement','env. '+bc.calibre+' A'],['Puissance souscrite',(pr.puissanceSouscrite||'-')+' kVA'],['Pouvoir de coupure',(pr.pdcDisjoncteurs?pr.pdcDisjoncteurs+' kA':'-')+' (Icc '+(pr.iccTableau?pr.iccTableau+' kA':'-')+')']];
      html+='<table style="width:100%;border-collapse:collapse">'+idf.map(p=>'<tr><td style="padding:1mm 2mm;color:#666;width:55mm">'+esc(p[0])+'</td><td style="padding:1mm 2mm;font-weight:600">'+esc(p[1]==null||p[1]===''?'-':p[1])+'</td></tr>').join('')+'</table>';
      html+=sec('Mesures de controle');
      const mrows=[['Resistance de prise de terre','terre','ohm','<= 100 ohm (avec DDR 30 mA)'],['Isolement (500 V DC)','isolement','Mohm','>= 0,5 Mohm'],['Continuite des conducteurs PE','continuite','ohm','< 2 ohm']];
      html+='<table style="width:100%;border-collapse:collapse;font-size:9pt"><thead><tr style="background:#eef"><th style="text-align:left;padding:1mm 2mm">Mesure</th><th style="text-align:left;padding:1mm 2mm">Valeur relevee</th><th style="text-align:left;padding:1mm 2mm">Unite</th><th style="text-align:left;padding:1mm 2mm">Critere</th></tr></thead><tbody>';
      mrows.forEach(m=>{const val=mesures[m[1]]||mesures['m_'+m[1]]||'';html+='<tr><td style="padding:1mm 2mm;border-bottom:1px solid #ddd">'+esc(m[0])+'</td><td style="padding:1mm 2mm;border-bottom:1px solid #ddd;font-weight:700">'+(val?esc(val):'____________')+'</td><td style="padding:1mm 2mm;border-bottom:1px solid #ddd">'+esc(m[2])+'</td><td style="padding:1mm 2mm;border-bottom:1px solid #ddd;color:#666">'+esc(m[3])+'</td></tr>';});
      html+='</tbody></table>';
      const _pp=this.poseProgress();
      if(_pp.total>0){html+=sec('Avancement du cablage (pose)');
        html+='<div style="font-size:10pt;margin-bottom:2mm">'+_pp.done+' / '+_pp.total+' cables poses ('+_pp.pct+'%)'+(_pp.nc?' &middot; '+_pp.nc+' anomalie(s)':'')+'</div>';
        if(_pp.perTe.length)html+='<table style="width:100%;border-collapse:collapse;font-size:9pt"><thead><tr style="background:#eef"><th style="text-align:left;padding:1mm 2mm">Tableau</th><th style="text-align:right;padding:1mm 2mm">Poses</th><th style="text-align:right;padding:1mm 2mm">%</th></tr></thead><tbody>'+_pp.perTe.map(t=>'<tr><td style="padding:.8mm 2mm;border-bottom:1px solid #ddd">'+esc(t.code+(t.nom?' '+t.nom:''))+'</td><td style="text-align:right;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+t.done+'/'+t.total+'</td><td style="text-align:right;padding:.8mm 2mm;border-bottom:1px solid #ddd">'+t.pct+'%</td></tr>').join('')+'</tbody></table>';}
      html+=sec('Points de controle visuels');
      const cks=['Identification et reperage des circuits','Serrage des connexions','Section des conducteurs conforme aux calibres','Differentiel 30 mA sur tous les circuits terminaux','Liaison equipotentielle de la salle de bains','Presence du parafoudre si requis','GTL/ETEL conforme et reserve 20%'];
      html+='<div style="font-size:9pt">'+cks.map(t=>'<div style="padding:.6mm 0">&#9744; '+esc(t)+'</div>').join('')+'</div>';
      html+=sec('Synthese conformite (auto)');
      html+='<div style="font-size:10pt;margin-bottom:2mm">'+(nErr===0?'<span style="color:#16a34a;font-weight:700">Aucune non-conformite bloquante detectee par l\'outil.</span>':'<span style="color:#dc2626;font-weight:700">'+nErr+' non-conformite(s) a lever</span>')+(nWarn?' &middot; <span style="color:#d97706">'+nWarn+' avertissement(s)</span>':'')+'</div>';
      html+='<div style="font-size:8.5pt;color:#444">'+issues.slice(0,12).map(i=>'<div>['+({error:'NC',warn:'!',info:'i'}[i.level]||'')+'] '+esc(i.msg)+'</div>').join('')+'</div>';
      html+=sec('Attestation');
      html+='<div style="font-size:9pt;margin-bottom:6mm">Je soussigne(e) atteste avoir realise les controles ci-dessus conformement a la norme NF C 15-100. Document d\'autocontrole interne — ne se substitue pas a l\'attestation de conformite Consuel.</div>';
      html+='<div style="display:flex;gap:18mm;margin-top:10mm"><div style="flex:1"><div style="border-top:1px solid #333;padding-top:1mm;font-size:9pt;color:#666">Nom &amp; signature</div></div><div style="flex:1"><div style="border-top:1px solid #333;padding-top:1mm;font-size:9pt;color:#666">Date</div></div><div style="flex:1"><div style="border-top:1px solid #333;padding-top:1mm;font-size:9pt;color:#666">Cachet</div></div></div>';
      html+='</div>';
      const cont=document.createElement('div');cont.id='cebat-auto';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';cont.innerHTML=html;document.body.appendChild(cont);
      const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
      if(!document.getElementById('cebat-autocss')){const st=document.createElement('style');st.id='cebat-autocss';st.textContent='@media print{@page{size:A4 portrait;margin:10mm;}}';document.head.appendChild(st);}
      const cleanup=()=>{const e=document.getElementById('cebat-autocss');if(e)e.remove();cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);window.print();
    }catch(e){this.showToast('Echec fiche autocontrole');}
  }
  _autocontroleData(){
    const s=this.state;const pr=s.project||{};const bc=this.branchCurrent();let issues=[];try{issues=this.checkConformite();}catch(e){}
    let genere='';try{genere=new Date().toISOString();}catch(e){}
    return{
      meta:{outil:'Cebat',norme:'NF C 15-100',genere},
      projet:{nom:pr.nom||'',client:pr.client||'',adresse:pr.adresse||'',installateur:pr.bureau||'',typeAlim:pr.typeAlim||'',puissanceSouscrite:pr.puissanceSouscrite||'',iccTableau:pr.iccTableau||'',pdcDisjoncteurs:pr.pdcDisjoncteurs||'',parafoudre:!!pr.parafoudre},
      branchement:{type:bc.tri?'triphase':'monophase',calibreConseille:bc.calibre,courant:Math.round((bc.Imax||bc.I||0)*10)/10},
      mesures:s.mesures||{},
      conformite:{erreurs:issues.filter(i=>i.level==='error').length,avertissements:issues.filter(i=>i.level==='warn').length,details:issues},
      circuits:(s.disjoncteurs||[]).map(d=>({code:d.code||'',calibre:d.calibre,courbe:d.courbe,section:d.section,ddr:d.ddr,recepteurs:d.recepteurs||[]}))
    };
  }
  _downloadBlob(content,type,name){
    const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');
    a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  _slug(){return (((this.state.project||{}).nom)||'projet').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase()||'projet';}
  exportAutocontroleJSON(){
    try{this._downloadBlob(JSON.stringify(this._autocontroleData(),null,2),'application/json','cebat_autocontrole_'+this._slug()+'.json');this.showToast('Autocontrôle JSON exporté');}catch(e){this.showToast('Echec export JSON');}
  }
  exportAutocontroleCSV(){
    try{
      const d=this._autocontroleData();const esc=v=>{const t=v==null?'':String(v);return /[";\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t;};
      const L=[['Section','Champ','Valeur'].join(';')];
      const add=(sec,k,v)=>L.push([sec,k,v].map(esc).join(';'));
      add('Projet','Nom',d.projet.nom);add('Projet','Client',d.projet.client);add('Projet','Adresse',d.projet.adresse);add('Projet','Installateur',d.projet.installateur);
      add('Alimentation','Type',d.projet.typeAlim);add('Alimentation','Puissance souscrite (kVA)',d.projet.puissanceSouscrite);add('Alimentation','Icc (kA)',d.projet.iccTableau);add('Alimentation','PdC (kA)',d.projet.pdcDisjoncteurs);add('Alimentation','Parafoudre',d.projet.parafoudre?'oui':'non');
      add('Branchement','Type',d.branchement.type);add('Branchement','Calibre conseillé (A)',d.branchement.calibreConseille);add('Branchement','Courant (A)',d.branchement.courant);
      Object.keys(d.mesures).forEach(k=>add('Mesures',k,d.mesures[k]));
      add('Conformité','Erreurs',d.conformite.erreurs);add('Conformité','Avertissements',d.conformite.avertissements);
      d.conformite.details.forEach(i=>add('Conformité — '+i.level,'',i.msg));
      this._downloadBlob('﻿'+L.join('\r\n'),'text/csv;charset=utf-8','cebat_autocontrole_'+this._slug()+'.csv');this.showToast('Autocontrôle CSV exporté');
    }catch(e){this.showToast('Echec export CSV');}
  }
  chiffrage(){
    const TYPEA=new Set(['prises_sdb','lave_linge','four','borne_ve','climatisation','chauffe_eau']);
    const refType={};(this.state.pieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{refType[fn.ref]=fn.type;}));
    const items=[];const add=(ref,label,unit)=>{const e=items.find(i=>i.ref===ref);if(e)e.qty++;else items.push({ref,label,unit,qty:1});};
    (this.state.disjoncteurs||[]).forEach(d=>{const cc=this._catalog(d);add(cc.ref,cc.label,cc.price);});
    (this.state.tableauxElec||[]).forEach(t=>{const br=this._boardRows(t);br.rows.forEach(rw=>{if(rw.ddr>0){const typeA=rw.brs.some(d=>(d.recepteurs||[]).some(rf=>TYPEA.has(refType[rf])));const poles=rw.idModules>=4?4:2;const id=this._catalogID(rw.ddr,poles,typeA);add(id.ref,id.label,id.price);}});const cof=this._catalogCoffret(br.nbRangees);add(cof.ref,cof.label,cof.price);});
    const _fab=(this.state.project&&this.state.project.fabricant)||'Generique';items.forEach(i=>{i.total=Math.round(i.qty*i.unit*100)/100;i.mfgRef=this._mfgRef(i.ref,_fab);});
    const totalHT=Math.round(items.reduce((s,i)=>s+i.total,0)*100)/100;
    return{items,totalHT,tva:Math.round(totalHT*0.2*100)/100,totalTTC:Math.round(totalHT*1.2*100)/100};
  }
  renderChiffrageCard(){
    const c=this.C;const r=this.r;const ch=this.chiffrage();
    if(ch.items.length===0)return null;
    return r('div',{style:{marginTop:14}},this.Card('Chiffrage fournisseur — indicatif',
      r('div',{style:{paddingTop:2}},
        r('div',{style:{fontSize:10,color:c.muted,marginBottom:8,fontStyle:'italic'}},'References et prix indicatifs — a confronter au catalogue fournisseur.'),r('div',{style:{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10,alignItems:'center'}},r('select',{value:(this.state.project&&this.state.project.fabricant)||'Generique',onChange:e=>this.setState(s=>({project:{...s.project,fabricant:e.target.value}})),title:'Fabricant',style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'4px 7px',fontSize:11,color:c.text,outline:'none'}},...this.FABRICANTS.map(f=>r('option',{key:f,value:f},f))),this.Btn('Importer tarif (CSV)',()=>this.importTarif(),'sec','sm'),this.Btn('Export CSV',()=>this.exportChiffrageCSV(),'sec','sm'),this.Btn('Bon de commande',()=>this.printBonCommande(),'sec','sm')),
        r('div',{style:{display:'flex',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em',paddingBottom:4,borderBottom:'2px solid '+c.bdr2}},r('span',{style:{flex:1}},'Reference'),r('span',{style:{width:36,textAlign:'right'}},'Qte'),r('span',{style:{width:58,textAlign:'right'}},'PU'),r('span',{style:{width:68,textAlign:'right'}},'Total')),
        ...ch.items.map((i,k)=>r('div',{key:k,style:{display:'flex',alignItems:'center',fontSize:11,padding:'4px 0',borderBottom:'1px solid '+c.bdr}},r('div',{style:{flex:1,minWidth:0}},r('div',{style:{fontFamily:c.mono,fontSize:10,color:c.accent,fontWeight:700}},i.ref),(i.mfgRef&&i.mfgRef!==i.ref)?r('div',{style:{fontFamily:c.mono,fontSize:8,color:c.muted}},'fab: '+i.mfgRef):null,r('div',{style:{fontSize:9,color:c.muted}},i.label)),r('span',{style:{width:36,textAlign:'right',fontFamily:c.mono}},i.qty),r('input',{type:'number',min:0,step:0.5,value:i.unit,onChange:e=>{const v=+e.target.value;this.setState(s=>({project:{...s.project,priceOverrides:{...(s.project.priceOverrides||{}),[i.ref]:(Number.isFinite(v)&&v>=0)?v:0}}}));},title:'Prix unitaire HT (editable)',style:{width:58,textAlign:'right',fontFamily:c.mono,fontSize:10,color:c.text,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:4,padding:'2px 4px',outline:'none'}}),r('span',{style:{width:68,textAlign:'right',fontFamily:c.mono,fontWeight:700}},i.total.toFixed(2)+'EUR'))),
        r('div',{style:{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:12}},r('span',{style:{color:c.muted}},'Total HT'),r('span',{style:{fontFamily:c.mono,fontWeight:700,color:c.text}},ch.totalHT.toFixed(2)+' EUR')),
        r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:11,color:c.muted}},r('span',null,'TVA 20%'),r('span',{style:{fontFamily:c.mono}},ch.tva.toFixed(2)+' EUR')),
        r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:14,fontWeight:800,marginTop:2}},r('span',{style:{color:c.text}},'Total TTC'),r('span',{style:{color:c.success,fontFamily:c.mono}},ch.totalTTC.toFixed(2)+' EUR')))));
  }
  renderConfCard(){
    const c=this.C;const r=this.r;
    const iss=this.checkConformite();
    const err=iss.filter(i=>i.level==='error').length;
    const wrn=iss.filter(i=>i.level==='warn').length;
    const inf=iss.filter(i=>i.level==='info').length;
    const body=iss.length===0
      ? r('div',{style:{fontSize:12,color:c.success,fontWeight:600}},'✓ Aucune anomalie detectee')
      : r('div',null,
          (err===0&&wrn===0)?r('div',{style:{fontSize:12,color:c.success,fontWeight:600,marginBottom:8}},'✓ Aucune non-conformite — notes informatives :'):null,
          r('div',{style:{display:'flex',gap:8,marginBottom:10}},
            err>0?r('span',{style:{fontSize:11,fontWeight:700,color:c.danger,background:'rgba(220,38,38,.1)',border:'1px solid rgba(220,38,38,.3)',borderRadius:6,padding:'2px 8px'}},err+' erreur'+(err>1?'s':'')):null,
            wrn>0?r('span',{style:{fontSize:11,fontWeight:700,color:c.warn,background:'rgba(217,119,6,.1)',border:'1px solid rgba(217,119,6,.3)',borderRadius:6,padding:'2px 8px'}},wrn+' avertissement'+(wrn>1?'s':'')):null,inf>0?r('button',{onClick:()=>this.setState(st=>({confShowInfo:!st.confShowInfo})),title:'Afficher / masquer les notes informatives',style:{fontSize:11,fontWeight:700,color:c.accent,background:c.accent+'14',border:'1px solid '+c.accent+'55',borderRadius:6,padding:'2px 8px',cursor:'pointer'}},inf+' info '+(this.state.confShowInfo?'▾':'▸')):null),
          r('div',{style:{display:'flex',flexDirection:'column',gap:5,maxHeight:240,overflowY:'auto'}},
            ...iss.filter(i=>i.level!=='info'||this.state.confShowInfo).map((i,k)=>r('div',{key:k,style:{display:'flex',alignItems:'flex-start',gap:7,fontSize:11,color:c.text2,padding:'5px 8px',background:i.level==='error'?'rgba(220,38,38,.05)':i.level==='warn'?'rgba(217,119,6,.05)':c.accent+'0d',borderRadius:6,borderLeft:'3px solid '+(i.level==='error'?c.danger:i.level==='warn'?c.warn:c.accent)}},
              r('span',{style:{flexShrink:0}},i.level==='error'?'⛔':i.level==='warn'?'⚠️':'ℹ️'),
              r('span',null,i.msg)))));
    return r('div',{style:{marginTop:14}},this.Card('Conformite NF C 15-100 — indicatif',
      r('div',{style:{paddingTop:2}},
        r('div',{style:{fontSize:10,color:c.muted,marginBottom:8,fontStyle:'italic'}},'Verifications automatiques indicatives — a valider par un professionnel qualifie.'),
        body)));
  }

  // ═══ CALC ═══
  calcCircuits(){
    const C=[];let id=1;
    for(const p of this.state.pieces){
      const fns=this.getFnTypes(p);
      const nL=this.getNbL(p);const nCE=Math.ceil(nL/8);
      if(nL>0)for(let i=0;i<nCE;i++)C.push({id:id++,pid:p.id,appId:p.appId,piece:p.nom,ptype:p.type,nom:`Éclairage — ${p.nom}${nCE>1?' '+(i+1):''}`,type:'eclairage',section:1.5,calibre:10,calibreType:'B',ddr:['sdb','wc'].includes(p.type)?2:1,puissance:nL*50,nb:nL,unite:'pts lum.',len:this.getLen(p),color:'#f59e0b',ref:'§771.5 B10A max 8pts'});
      if(fns.some(f=>['prises','prises_sdb'].includes(f))){const nP=this.getNbP(p);const nCP=Math.ceil(nP/8);for(let i=0;i<nCP;i++)C.push({id:id++,pid:p.id,appId:p.appId,piece:p.nom,ptype:p.type,nom:`Prises — ${p.nom}${nCP>1?' '+(i+1):''}`,type:'prises',section:2.5,calibre:16,calibreType:'C',ddr:['sdb','cuisine'].includes(p.type)?2:1,puissance:Math.min(this.getNbP(p)*460,3680),nb:nP,unite:'prises',len:this.getLen(p)+5,color:'#3b82f6',ref:'§771.6 C16A max 8 prises'});}
      const specs=[['four','Four / Cuisinière',6,32,'C',2,6000,8,'#ef4444'],['lave_vaisselle','Lave-vaisselle',2.5,16,'C',2,2200,6,'#ef4444'],['lave_linge','Lave-linge',2.5,16,'C',2,2500,6,'#ef4444'],['seche_linge','Sèche-linge',2.5,16,'C',2,2400,6,'#ef4444'],['chauffe_eau','Chauffe-eau ECS',2.5,20,'C',2,3000,10,'#f97316'],['climatisation',`Clim — ${p.nom}`,2.5,20,'C',1,2500,12,'#06b6d4'],['portail','Portail motorisé',2.5,16,'C',1,500,25,'#94a3b8'],['borne_ve','Borne recharge VE',6,32,'C',1,7400,20,'#22c55e'],['hotte','Hotte aspirante',1.5,10,'C',2,300,4,'#94a3b8'],['vmc','VMC',1.5,10,'C',1,200,15,'#94a3b8'],['piscine','Pompe piscine',2.5,16,'C',2,1500,20,'#0891b2'],['solaire','Onduleur solaire',6,25,'C',1,5000,15,'#f59e0b'],['inverseur_source','Inverseur source',6,32,'C',1,10000,8,'#06b6d4']];
      const seen=new Set();for(const[k,n,sec,cal,calT,ddr,pw,len,col]of specs){if(fns.includes(k)&&!seen.has(k)){seen.add(k);C.push({id:id++,pid:p.id,appId:p.appId,piece:p.nom,ptype:p.type,nom:n,type:'specialise',section:sec,calibre:cal,calibreType:calT,ddr,puissance:pw,nb:1,unite:'appar.',len,color:col,ref:'NF C 15-100'});}}
    }
    C.forEach(c=>{c.phase=1;});
    return C;
  }
  calcTableau(circuits){
    const pwr=this.state.project.puissanceSouscrite;const calibreDG={3:15,6:30,9:40,12:60,15:60,18:80,24:100}[pwr]||60;
    const d1=circuits.filter(c=>c.ddr===1),d2=circuits.filter(c=>c.ddr===2);const ddrs=[];
    if(d1.length)ddrs.push({id:1,label:'DDR 1 — Circuits secs',calibre:40,sensib:30,type:'AC',circuits:d1});
    if(d2.length)ddrs.push({id:2,label:'DDR 2 — Circuits humides',calibre:40,sensib:30,type:'A',circuits:d2});
    return{calibreDG,parafoudre:pwr>=9,ddrs,nbMod:2+(pwr>=9?2:0)+ddrs.length*2+circuits.length};
  }
  estCost(circuits){
    const prices={c15:0.95,c25:1.45,c6:3.50,dj10:12,dj16:14,dj20:16,dj25:18,dj32:22,ddr:42,dg:55,pf:68,coffret:90,prise:6.5,inter:8,boite:1.5};
    let mat=prices.coffret+prices.dg+(this.state.project.puissanceSouscrite>=9?prices.pf:0);
    for(const c of circuits){mat+=({1.5:prices.c15,2.5:prices.c25,6:prices.c6}[c.section]||prices.c15)*c.len*1.3;mat+=({10:prices.dj10,16:prices.dj16,20:prices.dj20,25:prices.dj25,32:prices.dj32}[c.calibre]||prices.dj16);if(c.type==='prises')mat+=c.nb*(prices.prise+prices.boite);if(c.type==='eclairage')mat+=c.nb*(prices.inter+prices.boite);}
    mat+=new Set(circuits.map(c=>c.ddr)).size*prices.ddr;
    const moH=Math.round(circuits.length*1.5+this.state.pieces.reduce((s,p)=>s+p.surface,0)*0.05);
    const moh=moH*55;const ht=Math.round(mat+moh);
    return{materiaux:Math.round(mat),mainOeuvre:Math.round(moh),moH,ht,tva:Math.round(ht*.1),ttc:Math.round(ht*1.1)};
  }

  // ═══ UI HELPERS ═══
  r=React.createElement;
  Btn(text,onClick,v='primary',sz='md',ico=null,disabled=false){
    const c=this.C;
    const vs={primary:{background:'#0284C7',color:'#fff',border:'none'},sec:{background:c.surf,color:c.text,border:`1px solid ${c.bdr2}`},ghost:{background:'transparent',color:c.text2,border:`1px solid ${c.bdr}`},danger:{background:'rgba(220,38,38,.08)',color:c.danger,border:'1px solid rgba(220,38,38,.25)'},success:{background:'rgba(22,163,74,.1)',color:c.success,border:'1px solid rgba(22,163,74,.3)'}};
    const ss={sm:{fontSize:11,padding:'4px 10px',borderRadius:6},md:{fontSize:13,padding:'7px 14px',borderRadius:8},lg:{fontSize:14,padding:'10px 20px',borderRadius:9}};
    return this.r('button',{onClick:disabled?undefined:onClick,style:{...(vs[v]||vs.primary),...(ss[sz]||ss.md),fontFamily:c.font,fontWeight:600,cursor:disabled?'not-allowed':'pointer',opacity:disabled?0.5:1,display:'inline-flex',alignItems:'center',gap:6,transition:'all .15s',flexShrink:0}},ico&&this.r('span',null,ico),text);
  }
  Card(title,children,extra=null,p=20){
    const c=this.C;
    return this.r('div',{className:'cbt-card',style:{background:c.surf,border:`1px solid ${c.bdr}`,borderRadius:12,padding:p,boxShadow:c.elev1}},
      title&&this.r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}},
        this.r('h3',{style:{fontSize:11,fontWeight:700,color:c.text2,textTransform:'uppercase',letterSpacing:'.07em'}},title),extra),children);
  }
  Bdg(text,color='#0284C7'){return this.r('span',{style:{display:'inline-block',fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:8,background:color+'22',color,border:`1px solid ${color}44`,fontFamily:this.C.mono,whiteSpace:'nowrap'}},text);}
  Stat(val,label,color='#0284C7',sub=''){const c=this.C;return this.r('div',{className:'cbt-stat',style:{background:c.surf,border:`1px solid ${c.bdr}`,borderRadius:12,padding:'16px 18px',boxShadow:c.elev1}},this.r('div',{style:{fontSize:10,color:c.muted,marginBottom:5,textTransform:'uppercase',letterSpacing:'.05em',fontWeight:600}},label),this.r('div',{style:{fontSize:24,fontWeight:800,color,fontFamily:c.mono}},val),sub&&this.r('div',{style:{fontSize:10,color:c.muted,marginTop:3}},sub));}
  SH(title,sub='',extra=null){const c=this.C;return this.r('div',{style:{marginBottom:24}},this.r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}},this.r('div',null,this.r('h1',{style:{fontSize:21,fontWeight:800,color:c.text,marginBottom:3,letterSpacing:'-.4px'}},title),sub&&this.r('p',{style:{fontSize:13,color:c.muted}},sub)),extra));}
  showToast(msg){this.setState({toast:msg});clearTimeout(this._tt);this._tt=setTimeout(()=>this.setState({toast:null}),3000);}
  Inp(field,label,type='text',form,setForm,opts={}){const c=this.C;return this.r('div',{style:{marginBottom:14}},this.r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},label),this.r('input',{type,value:form[field]??'',onChange:e=>setForm(f=>({...f,[field]:type==='number'?(e.target.value===''?'':(Number.isFinite(+e.target.value)?+e.target.value:f[field])):e.target.value})),...opts,style:{width:'100%',background:c.surf3,border:`1px solid ${c.bdr2}`,borderRadius:7,padding:'8px 11px',color:c.text,fontSize:13,outline:'none',fontFamily:c.font,...(opts.style||{})}}));}
  Sel(field,label,options,form,setForm,onChangeCb=null){const c=this.C;return this.r('div',{style:{marginBottom:14}},this.r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},label),this.r('select',{value:form[field]??'',onChange:e=>{const v=e.target.value;setForm(f=>({...f,[field]:v}));if(onChangeCb)onChangeCb(v);},style:{width:'100%',background:c.surf3,border:`1px solid ${c.bdr2}`,borderRadius:7,padding:'8px 11px',color:c.text,fontSize:13,outline:'none',fontFamily:c.font,appearance:'auto'}},...options.map(([v,l])=>this.r('option',{key:v,value:v},l))));}
  ModalShell(title,onClose,children,footer){const c=this.C;return this.r('div',null,this.r('div',{style:{padding:'22px 26px 0'}},this.r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}},this.r('h2',{style:{fontSize:16,fontWeight:700,color:c.text}},title),this.r('button',{onClick:onClose,style:{background:'transparent',border:'none',color:c.muted,fontSize:22,cursor:'pointer',lineHeight:1}},'×')),children),this.r('div',{style:{padding:'14px 26px 22px',borderTop:`1px solid ${c.bdr}`,display:'flex',gap:8,justifyContent:'flex-end'}},footer));}
  deleteItem(arr,id){this.setState(s=>({[arr]:s[arr].filter(x=>x.id!==id)}))}
  openEdit(type,obj,formKey,formData){this.setState({showModal:true,modalType:type,editId:obj.id,[formKey]:{...formData}});}
  moveFonction(fnId,toPieceId){
    // Deplace une fonction d'une piece vers une autre (conserve son ref/id => liens circuits/interrupteurs preserves)
    const src=(this.state.pieces||[]).find(p=>(p.fonctions||[]).some(f=>f.id===fnId));
    if(!src||src.id===toPieceId)return;
    const fn=(src.fonctions||[]).find(f=>f.id===fnId);if(!fn)return;
    const dst=(this.state.pieces||[]).find(p=>p.id===toPieceId);
    this.setState(s=>({pieces:s.pieces.map(p=>{
      if(p.id===src.id)return{...p,fonctions:(p.fonctions||[]).filter(f=>f.id!==fnId)};
      if(p.id===toPieceId)return{...p,fonctions:[...(p.fonctions||[]),fn]};
      return p;
    }),logDragFn:null}));
    this.showToast((this.FNS[fn.type]?this.FNS[fn.type].label:'Fonction')+' déplacée vers '+(dst?dst.nom:'la pièce'));
  }
  duplicateAppart(appId){
    this.setState(s=>{
      const app=s.appartements.find(a=>a.id===appId);if(!app)return{};
      const newAppId=s.nextAppId;const appIdx=s.appartements.length+1;
      const sameNiv=s.appartements.filter(a=>a.niveauId===app.niveauId).length;
      const niv=s.niveaux.find(n=>n.id===app.niveauId);const et=niv?niv.etage:0;
      const prefix=et<0?'SS'+Math.abs(et):et===0?'RDC':'E'+et;
      const newApp={...app,id:newAppId,nom:app.nom+' (copie)',code:prefix+'-'+String.fromCharCode(65+sameNiv),appCode:'APP'+String(s.appartements.length+1).padStart(2,'0')};
      const srcPieces=s.pieces.filter(p=>p.appId===appId);let pid=s.nextPieceId,fid=s.nextFonctionId;const tc={};
      const newPieces=srcPieces.map((p,i)=>{
        const newFns=(p.fonctions||[]).map(fn=>{const code=this.FN_CODES[fn.type]||'X';tc[fn.type]=(tc[fn.type]||0)+1;return{...fn,id:fid++,ref:appIdx+code+tc[fn.type]};});
        return{...p,id:pid++,appId:newAppId,pieceCode:'PC'+String(s.pieces.length+1+i).padStart(3,'0'),fonctions:newFns};
      });
      return{appartements:[...s.appartements,newApp],pieces:[...s.pieces,...newPieces],nextAppId:newAppId+1,nextPieceId:pid,nextFonctionId:fid,selectedLogAppId:newAppId,selectedLogPieceId:null};
    });
    this.showToast('Appartement dupliqué ✓');
  }
  duplicatePiece(pieceId){
    this.setState(s=>{
      const p=s.pieces.find(x=>x.id===pieceId);if(!p)return{};
      const appIdx=s.appartements.findIndex(a=>a.id===p.appId)+1;const tc={};
      s.pieces.filter(x=>x.appId===p.appId).forEach(x=>(x.fonctions||[]).forEach(fn=>{tc[fn.type]=(tc[fn.type]||0)+1;}));
      let fid=s.nextFonctionId;
      const newFns=(p.fonctions||[]).map(fn=>{const code=this.FN_CODES[fn.type]||'X';tc[fn.type]=(tc[fn.type]||0)+1;return{...fn,id:fid++,ref:appIdx+code+tc[fn.type]};});
      const newPiece={...p,id:s.nextPieceId,nom:p.nom+' (copie)',pieceCode:'PC'+String(s.pieces.length+1).padStart(3,'0'),fonctions:newFns};
      return{pieces:[...s.pieces,newPiece],nextPieceId:s.nextPieceId+1,nextFonctionId:fid,selectedLogPieceId:newPiece.id};
    });
    this.showToast('Pièce dupliquée ✓');
  }

  // ═══ ICON LIBRARY ═══
  ico(id,sz=14){
    const r=this.r;
    const S=(children,sw=1.5)=>r('svg',{width:sz,height:sz,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:sw,strokeLinecap:'round',strokeLinejoin:'round'},...(Array.isArray(children)?children:[children]));
    const p=d=>r('path',{d});
    const ci=(cx,cy,rr)=>r('circle',{cx,cy,r:rr});
    const rc=(x,y,w,h,rx)=>r('rect',{x,y,width:w,height:h,rx:rx||0});
    const m={
      // Piece types
      sejour:S([rc(2,7,20,13,2),p('M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'),p('M6 19v2M18 19v2')]),
      cuisine:S([p('M3 3v18h18'),p('M8 21V8a4 4 0 0 1 8 0v13'),p('M8 12h8'),p('M12 8v4')]),
      chambre:S([rc(2,7,20,14,2),p('M2 11h20'),p('M6 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'),p('M14 7V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2')]),
      sdb:S([p('M9 6C9 4.34 10.34 3 12 3s3 1.34 3 3'),p('M4 11h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2z'),p('M5 19v2M19 19v2')]),
      wc:S([ci(12,7,3),p('M8.5 10.5 6 20h12l-2.5-9.5'),p('M10 20v2M14 20v2')]),
      bureau:S([rc(2,3,20,14,2),p('M8 21h8M12 17v4')]),
      couloir:S([p('M3 12h18'),p('M12 5l7 7-7 7'),p('M5 5v14')]),
      garage:S([p('M19 17H5v-8l7-6 7 6v8z'),ci(8,17,2),ci(16,17,2),p('M5 9h14')]),
      cave:S([p('M21 8 12 3 3 8v13h18V8z'),p('M9 21V12h6v9')]),
      exterieur:S([p('M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'),ci(12,9,3)]),
      // Electrical functions  
      eclairage:S([p('M12 2a6 6 0 0 1 6 6c0 2-1 3.5-2.5 5H8.5C7 13.5 6 12 6 8a6 6 0 0 1 6-6z'),p('M9 18h6M10 22h4')]),
      prises:S([rc(6,4,12,16,2),p('M9 4V2M15 4V2'),ci(12,14,2),p('M12 10v2')]),
      prises_sdb:S([rc(6,4,12,16,2),p('M9 4V2M15 4V2'),ci(12,14,2),p('M3 12h2M19 12h2')]),
      tv:S([rc(2,3,20,14,2),p('M8 21h8M12 17v4'),p('M7 8h10M7 11h6')]),
      rj45:S([p('M5 12.55a11 11 0 0 1 14.08 0'),p('M1.42 9a16 16 0 0 1 21.16 0'),p('M8.53 16.11a6 6 0 0 1 6.95 0'),ci(12,20,1)]),
      camera:S([rc(1,6,22,16,3),p('M1 10h22'),p('M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2')],[ci(12,15,3)]),
      sono:S([p('M11 5 6 9H2v6h4l5 4V5z'),p('M15.54 8.46a5 5 0 0 1 0 7.07'),p('M19.07 4.93a10 10 0 0 1 0 14.14')]),
      four:S([rc(3,3,18,18,2),p('M3 9h18'),p('M9 21V9'),p('M7 3v6M17 3v6')]),
      lave_vaisselle:S([rc(3,3,18,18,2),p('M3 9h18'),[ci(12,15,3)],p('M7 3v6M17 3v6')]),
      lave_linge:S([rc(3,3,18,18,3)],[ci(12,12,4),p('M10 12a2 2 0 0 1 4 0')]),
      seche_linge:S([p('M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m13.41-4.59A2 2 0 1 1 20 8v8')]),
      hotte:S([p('M4 15h16'),p('M8 15V9a4 4 0 0 1 8 0v6'),p('M6 19h12a2 2 0 0 0 2-2v-2H4v2a2 2 0 0 0 2 2z')]),
      chauffe_eau:S([p('M14 14.76V3.5a2.5 2.5 0 0 0-5 0V14.76a5 5 0 1 0 5 0z')]),
      climatisation:S([p('M8 19l4-4 4 4'),p('M12 15V3'),p('M4 12h4M16 12h4'),p('M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83')]),
      vmc:S([ci(12,12,2),p('M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41')]),
      portail:S([rc(2,7,20,15,2),p('M2 12h20'),p('M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2'),p('M12 7v5'),ci(12,17,1)]),
      borne_ve:S([p('M13 2L3 14h9l-1 8 10-12h-9l1-8z'),ci(12,12,2)]),
      piscine:S([p('M2 6c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'),p('M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'),p('M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1')]),
      domotique:S([p('M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'),p('M9 21V12h6v9'),ci(12,8,1.5)]),
      alarme_intrusion:S([p('M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'),p('M12 9v4'),ci(12,17,1)]),
      detecteur_fumee:S([ci(12,5,3),p('M6.6 8.6C5 9.7 4 11.5 4 13.5A8 8 0 0 0 20 13.5c0-2-.9-3.8-2.4-5'),p('M8 18h8'),p('M9 22h6')]),
      detecteur_co:S([ci(12,12,9),p('M8.5 12a3.5 3.5 0 0 1 7 0'),ci(12,12,1)]),
      visiophone:S([rc(2,5,15,14,2),p('M17 9l6 3-6 3V9z')]),
      solaire:S([ci(12,12,4),p('M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41')]),
      inverseur_source:S([p('M21 2v6h-6'),p('M3 12a9 9 0 0 1 15-6.7L21 8'),p('M3 22v-6h6'),p('M21 12a9 9 0 0 1-15 6.7L3 16')]),
      controleur_tension:S([ci(12,12,10),p('M12 6v6l4 2')]),
      afficheur:S([rc(2,3,20,14,2),p('M8 21h8M12 17v4'),p('M7 8h10M7 11h4')]),
      // Circuit elements
      tableau_elec:S([rc(2,3,20,5,1),rc(2,10,20,5,1),rc(2,17,20,5,1),ci(5.5,5.5,1),ci(5.5,12.5,1),ci(5.5,19.5,1)]),
      tableau_comptage:S([rc(4,4,16,4,1),p('M4 12h16M4 16h16'),rc(4,8,16,12,1)]),
      boite_deriv:S([rc(3,3,18,18,3),p('M8 12h8M12 8v8')]),
      interrupteur:S([rc(2,8,20,8,4),ci(16,12,3)]),
      zone_commande:S([ci(12,12,2),p('M12 2a10 10 0 0 1 10 10c0 4-2.5 7.5-6 9.5'),p('M12 2C8 6 8 18 12 22'),p('M12 2C6 5 4 10 4 12'),p('M2 12h4M18 12h4')]),
      // Apartment types
      apt_villa:S([p('M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'),p('M9 21V12h6v9')]),
      apt_appart:S([rc(3,3,18,18,2),p('M3 9h18M3 15h18'),p('M9 3v18M15 3v18')]),
      apt_studio:S([rc(4,4,16,16,3),p('M4 12h16'),p('M12 4v16')]),
      apt_duplex:S([rc(2,3,20,8,2),rc(2,13,20,8,2),p('M6 8v5M18 8v5')]),
      apt_commerce:S([rc(2,7,20,14,3),p('M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2'),p('M2 12h20'),p('M7 12v7M17 12v7')]),
      apt_parking:S([p('M5 17H3v-6l2-4h14l2 4v6h-2'),p('M9 17H7m10 0h-2'),ci(8,17,2),ci(16,17,2),p('M3 11h18')]),
      // GRAFCET process icons
      g_study:S([rc(9,2,6,4,1),p('M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2'),p('M8 12h8M8 16h5')]),
      g_plan:S([p('M12 20h9'),p('M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z')]),
      g_order:S([p('M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'),p('M3 6h18'),p('M16 10a4 4 0 0 1-8 0')]),
      g_panel:S([rc(2,3,20,5,1),rc(2,10,20,5,1),rc(2,17,20,5,1),ci(5.5,5.5,1),ci(5.5,12.5,1),ci(5.5,19.5,1)]),
      g_conduit:S([p('M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'),p('M12 22.08V12')]),
      g_cable:S([p('M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'),p('M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71')]),
      g_connect:S([p('M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z')]),
      g_wiring:S([rc(2,3,20,5,1),p('M12 8v4'),p('M8 14l4 4 4-4'),p('M5 21v-4M19 21v-4')]),
      g_device:S([p('M18 8H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z'),p('M12 3v5'),ci(12,16,2)]),
      g_test:S([p('M9 3H5a2 2 0 0 0-2 2v4'),p('M9 3h10a2 2 0 0 1 2 2v4'),p('M3 13v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4'),p('M3 9h18')],[ci(12,16,2)]),
      g_power:S([p('M13 2L3 14h9l-1 8 10-12h-9l1-8z')]),
      g_done:S([ci(12,12,9),p('M9 12l2 2 4-4')]),
      // UI actions
      pencil:S([p('M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'),p('M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z')]),
      trash:S([p('M3 6h18'),p('M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2')]),
      save_ico:S([p('M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'),p('M17 21v-8H7v8'),p('M7 3v5h8')]),
      print_ico:S([p('M6 9V2h12v7'),p('M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'),p('M6 14h12v8H6z')]),
      building2:S([rc(3,3,18,18,2),p('M3 9h18M9 3v18M15 3v6')]),
      hoist:S([p('M5 8h14'),p('M5 12h14'),p('M5 16h14'),p('M3 4h18v16H3z')]),
      // Test group icons
      link_icon:S([p('M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'),p('M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71')]),
      shield_ico:S([p('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z')]),
      zap_ico:S([p('M13 2L3 14h9l-1 8 10-12h-9l1-8z')]),
      chart_ico:S([p('M18 20V10M12 20V4M6 20v-6')]),
      earth_ico:S([ci(12,12,10),p('M2 12h20'),p('M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z')]),
      lock_ico:S([rc(3,11,18,11,2),ci(12,11,3),p('M7 11V7a5 5 0 0 1 10 0v4')]),
      // Protocol icons
      broadcast:S([ci(12,12,2),p('M8.56 2.9a8 8 0 0 0-5.66 5.66'),p('M5.46 5.46A5 5 0 0 0 3.01 12'),p('M8.56 21.1a8 8 0 0 0 6.88 0'),p('M18.54 18.54A8 8 0 0 0 20.99 12'),p('M15.44 5.46A5 5 0 0 1 20.99 12'),p('M15.44 18.54a5 5 0 0 1-6.88 0')]),
      wifi_ico:S([p('M5 12.55a11 11 0 0 1 14.08 0'),p('M1.42 9a16 16 0 0 1 21.16 0'),p('M8.53 16.11a6 6 0 0 1 6.95 0'),ci(12,20,1)]),
      signal_ico:S([p('M2 20h.01'),p('M7 20v-4'),p('M12 20V10'),p('M17 20V4'),p('M22 20v-8')]),
      // Misc
      info_ico:S([ci(12,12,10),p('M12 16v-4'),p('M12 8h.01')]),
      check_ico:S([ci(12,12,10),p('M9 12l2 2 4-4')]),
      bulb_ico:S([p('M9 18h6M10 22h4'),p('M12 2a6 6 0 0 1 6 6c0 2-1 3.5-2.5 5H8.5C7 13.5 6 12 6 8a6 6 0 0 1 6-6z')]),
      // Generic fallback
      default:S([ci(12,12,9),p('M12 8v4M12 16h.01')]),
    };
    return m[id]||m.default;
  }

  // ═══ NAV SVG ICONS ═══
  getNavIcon(id){
    const r=this.r;
    const ico=(ws,children)=>r('svg',{width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:ws||1.6,strokeLinecap:'round',strokeLinejoin:'round'},...(Array.isArray(children)?children:[children]));
    const p=d=>r('path',{d});
    const c=(cx,cy,rr)=>r('circle',{cx,cy,r:rr});
    const rc=(x,y,w,h,rx)=>r('rect',{x,y,width:w,height:h,rx:rx||0});
    const m={
      dashboard:ico(1.6,[p('M13 2L3 14h9l-1 8 10-12h-9l1-8z')]),
      projet:ico(1.6,[p('M9 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z'),p('M9 2v6h6'),p('M8 13h8M8 17h6')]),
      appartements:ico(1.6,[p('M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'),p('M9 21V12h6v9')]),
      pieces:ico(1.6,[rc(3,3,7,7,1),rc(14,3,7,7,1),rc(3,14,7,7,1),rc(14,14,7,7,1)]),
      logements:ico(1.6,[p('M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'),p('M9 21V12h6v9'),r('rect',{x:14,y:14,width:7,height:7,rx:1}),r('rect',{x:14,y:3,width:7,height:7,rx:1})]),
      circuits:ico(1.6,[p('M5 12h14'),p('M12 5v14'),c(12,12,3),p('M6.34 6.34 8.46 8.46'),p('M15.54 15.54l2.12 2.12'),p('M17.66 6.34l-2.12 2.12'),p('M6.34 17.66l2.12-2.12')]),
      tableau:ico(1.6,[rc(2,3,20,5,1),rc(2,10,20,5,1),rc(2,17,20,5,1),c(5.5,5.5,1),c(5.5,12.5,1),c(5.5,19.5,1)]),
      realisation:ico(1.6,[p('M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2'),p('M9 12l2 2 4-4'),p('M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2'),p('M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2')]),
      cablage:ico(1.6,[p('M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'),p('M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71')]),
      domotique:ico(1.6,[p('M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'),p('M12 8.5a3 3 0 0 1 3 3'),p('M12 8.5a5 5 0 0 1 5 5'),p('M12 14.5v.5')]),
      tests:ico(1.6,[p('M22 11.08V12a10 10 0 1 1-5.93-9.14'),p('M22 4 12 14.01l-3-3')]),
      devis:ico(1.6,[p('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'),p('M14 2v6h6'),p('M8 13h8M8 17h6')]),
    };
    return m[id]||ico(1.6,[p('M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5')]);
  }

  // ═══ SIDEBAR ═══
  renderSidebar(circuits){
    const{view,niveaux,appartements,pieces,interrupteurs,zonesCommande,boitesDeriv,tableauxElec}=this.state;const c=this.C;const r=this.r;
    const comp=this.getCompletion();
    const groups=[{label:'',items:this.NAV.filter(n=>!n.cat)},{label:'STRUCTURE',items:this.NAV.filter(n=>n.cat==='Structure')},{label:'DIMENSIONNEMENT',items:this.NAV.filter(n=>n.cat==='Dimensionnement')},{label:'PROCESSUS',items:this.NAV.filter(n=>n.cat==='Processus')},{label:'VALIDATION',items:this.NAV.filter(n=>n.cat==='Validation')}];
    const elemTotal=tableauxElec.length+boitesDeriv.length+interrupteurs.length+zonesCommande.length;
    const bdgMap={appartements:appartements.length,pieces:pieces.length,circuits:circuits.length+elemTotal};
    const red='#0277BD';
    return r('aside',{'data-print':'hide',className:'cbt-sidebar'+(this.state.sidebarOpen?' cbt-sb-open':'')+(this.state.focusMode?' cbt-focus':''),style:{width:220,background:c.surf,borderRight:`1px solid ${c.bdr}`,display:'flex',flexDirection:'column',flexShrink:0,overflow:'hidden'}},
      r('div',{style:{width:220,minWidth:220,height:'100%',display:'flex',flexDirection:'column'}},
      // Project card
      r('div',{style:{padding:'14px 16px',borderBottom:`1px solid ${c.bdr}`}},
        r('div',{style:{fontSize:9,color:c.muted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:4}},'PROJET ACTIF'),
        r('div',{style:{fontSize:13,fontWeight:700,color:c.text,marginBottom:6,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},this.state.project.nom),
        r('div',{style:{display:'flex',alignItems:'center',gap:7}},
          r('div',{style:{flex:1,height:3,background:c.bdr,borderRadius:2,overflow:'hidden'}},
            r('div',{style:{height:'100%',width:comp+'%',background:red,borderRadius:2,transition:'width .5s'}})),
          r('span',{style:{fontSize:9,color:red,fontWeight:700,fontFamily:c.mono}},comp+'%')
        )
      ),
      // Nav label
      r('div',{style:{padding:'14px 16px 4px'}},
        r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.1em'}},'NAVIGATION')
      ),
      // Nav items
      r('nav',{style:{flex:1,overflowY:'auto',padding:'2px 0 8px'}},
        ...groups.map(g=>r('div',{key:g.label},
          g.label&&r('div',{style:{fontSize:8,fontWeight:700,color:c.bdr3,textTransform:'uppercase',letterSpacing:'.1em',padding:'10px 16px 2px'}},g.label),
          ...g.items.map(item=>{
            const active=view===item.id;const bdg=bdgMap[item.id]??null;
            return r('button',{key:item.id,onClick:()=>this.setState({view:item.id,sidebarOpen:false}),style:{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'8px 16px',border:'none',cursor:'pointer',textAlign:'left',background:'transparent',borderLeft:`3px solid ${active?red:'transparent'}`,color:active?red:c.text2,fontSize:12,fontFamily:c.font,fontWeight:active?600:400,transition:'all .12s'}},
              r('span',{style:{width:16,height:16,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:active?red:c.muted}},this.getNavIcon(item.id)),
              r('span',{style:{flex:1}},item.label),
              bdg!==null&&r('span',{style:{fontSize:9,background:active?'#FFEBEE':c.surf3,color:active?red:c.muted,padding:'1px 6px',borderRadius:10,fontFamily:c.mono,fontWeight:600}},bdg)
            );})
        ))
      ),
      r('div',{style:{padding:'10px 16px',borderTop:`1px solid ${c.bdr}`}},
        r('div',{style:{fontSize:9,color:c.muted,fontFamily:c.mono,textAlign:'center'}},'CEBAT by HBO · 2024')))
    );
  }

  // ═══ TOPBAR ═══
  renderTopBar(){
    const{view,project,theme}=this.state;const c=this.C;const r=this.r;
    const nav=this.NAV.find(n=>n.id===view);
    const red='#0277BD';
    return r('header',{'data-print':'hide',style:{height:54,background:'linear-gradient(180deg,#0288CE 0%,#0277BD 100%)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 20px',flexShrink:0,boxShadow:'0 4px 16px rgba(2,46,77,.28),0 1px 0 rgba(255,255,255,.12) inset',position:'relative',zIndex:20}},
      r('div',{style:{display:'flex',alignItems:'center',gap:14}},
        r('button',{className:'cbt-burger',onClick:()=>this.setState(st=>({sidebarOpen:!st.sidebarOpen})),title:'Menu',style:{display:'none',background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.25)',borderRadius:7,width:32,height:28,cursor:'pointer',color:'#fff',fontSize:15,alignItems:'center',justifyContent:'center'}},'☰'),
        r('div',{style:{display:'flex',flexDirection:'column',lineHeight:1.1}},
          r('span',{style:{fontSize:16,fontWeight:800,color:'#fff',letterSpacing:'-.4px'}},'CEBAT'),
          r('span',{style:{fontSize:9,color:'rgba(255,255,255,.55)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em'}},'by HBO')
        ),
        r('div',{style:{width:1,height:26,background:'rgba(255,255,255,.22)',margin:'0 4px'}}),
        r('div',{className:'cbt-hide-sm',style:{display:'flex',alignItems:'center',gap:5,fontSize:12,color:'rgba(255,255,255,.7)'}},
          r('span',null,'Installation électrique'),
          r('span',{style:{color:'rgba(255,255,255,.35)'}},'›'),
          r('span',{style:{color:'#fff',fontWeight:600}},nav?nav.label:'Dashboard')
        )
      ),
      r('div',{style:{display:'flex',alignItems:'center',gap:10}},
        r('div',{className:'cbt-hide-sm',style:{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'rgba(255,255,255,.55)'}},
          r('div',{style:{width:5,height:5,borderRadius:'50%',background:'#4ade80',flexShrink:0}}),
          'NF C 15-100'
        ),
        r('div',{style:{width:1,height:18,background:'rgba(255,255,255,.2)'}}),
        r('span',{className:'cbt-hide-sm',style:{fontSize:11,color:'rgba(255,255,255,.6)'}},project.client),
        this.renderProjMenu(),r('div',{style:{width:1,height:18,background:'rgba(255,255,255,.2)'}}),r('button',{onClick:()=>this.importJSON(),title:'Importer un projet (.json)',style:{background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.25)',borderRadius:7,height:26,padding:'0 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontSize:11,fontWeight:600,color:'rgba(255,255,255,.9)',fontFamily:c.font,whiteSpace:'nowrap'}},'📥 Importer'),
        r('button',{onClick:()=>this.exportJSON(),title:'Exporter le projet (.json)',style:{background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.25)',borderRadius:7,height:26,padding:'0 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontSize:11,fontWeight:600,color:'rgba(255,255,255,.9)',fontFamily:c.font,whiteSpace:'nowrap'}},'📤 Exporter'),
        r('button',{onClick:()=>this.setState(s=>({focusMode:!s.focusMode})),title:this.state.focusMode?'Quitter le mode focus (afficher le menu)':'Mode focus (masquer le menu)',style:{background:this.state.focusMode?'rgba(255,255,255,.32)':'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,'+(this.state.focusMode?'.5':'.25')+')',borderRadius:7,width:30,height:26,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,color:'#fff',transition:'all .2s'}},this.state.focusMode?'⤢':'⤡'),
        r('button',{onClick:()=>this.setState(s=>({theme:s.theme==='dark'?'light':'dark'})),style:{background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.25)',borderRadius:7,width:30,height:26,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,color:'rgba(255,255,255,.8)',transition:'all .2s'}},theme==='dark'?'☀️':'🌙')
      )
    );
  }

  // ═══ MODAL SYSTEM ═══
  renderModal(){
    const{showModal,modalType}=this.state;const c=this.C;const r=this.r;
    if(!showModal)return null;
    const content={
      addNiveau:()=>this.renderNiveauForm(),addAppart:()=>this.renderAppartForm(),
      addPiece:()=>this.renderPieceForm(),addFonction:()=>this.renderFonctionForm(),
      addTableauElec:()=>this.renderTableauElecForm(),
      addBoite:()=>this.renderBoiteForm(),addInter:()=>this.renderInterForm(),addZone:()=>this.renderZoneForm(),editFonction:()=>{const{editFonctionId,editFonctionPieceId}=this.state;const p=this.state.pieces.find(x=>x.id===editFonctionPieceId);const fn=p&&(p.fonctions||[]).find(f=>f.id===editFonctionId);const cat=fn?this.FNS[fn.type]?.cat:'base';if(cat==='media')return this.renderEditFonctionMedia();if(cat==='spec')return this.renderEditFonctionSpec();if(cat==='ext'||cat==='secu'||cat==='energ'||cat==='dom')return this.renderEditFonctionExtSecuEnerg();if(cat==='base'&&fn?.type!=='eclairage')return this.renderEditFonctionPrises();return this.renderEditFonctionForm();},addDepart:()=>this.renderDepartForm(),editDepart:()=>this.renderDepartForm(),editDisjoncteur:()=>this.renderEditDisjoncteurForm(),selectCB:()=>this.renderSelectCBForm(),deletePiece:()=>this.renderDeletePieceForm(),deleteApp:()=>this.renderDeleteAppForm(),deleteFn:()=>this.renderDeleteFnForm(),
    }[modalType];
    if(!content)return null;
    return r('div',{style:{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(6px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',animation:'bdIn .18s ease'},onClick:()=>this.setState({showModal:false,selectedPieceId:null})},
      r('div',{onClick:e=>e.stopPropagation(),style:{background:c.surf2,border:`1px solid ${c.bdr2}`,borderRadius:16,width:640,maxHeight:'88vh',overflowY:'auto',boxShadow:'0 24px 80px rgba(0,0,0,.6)',animation:'modalIn .26s cubic-bezier(.16,1,.3,1)'}},content()));
  }

  renderNiveauForm(){
    const{editId}=this.state;const c=this.C;const r=this.r;
    const setForm=fn=>this.setState(s=>({nivForm:fn(s.nivForm)}));
    const form=this.state.nivForm;
    const close=()=>this.setState({showModal:false});
    const onTypeChange=(typeNiv)=>{
      const nt=this.NIV_TYPES[typeNiv];
      const autoNom=nt?nt.label:form.nom;
      const autoEtage=nt&&nt.etage!==null?nt.etage:form.etage;
      setForm(f=>({...f,typeNiv,nom:autoNom,etage:autoEtage===null?f.etage:autoEtage}));
    };
    const save=()=>{
      if(!form.nom.trim())return;
      if(editId!==null)this.setState(s=>({niveaux:s.niveaux.map(n=>n.id===editId?{...n,nom:form.nom,etage:+form.etage,typeNiv:form.typeNiv}:n),showModal:false,editId:null}));
      else this.setState(s=>({niveaux:[...s.niveaux,{id:s.nextNivId,nom:form.nom,etage:+form.etage,typeNiv:form.typeNiv}],nextNivId:s.nextNivId+1,showModal:false}));
      this.showToast('Niveau enregistré ✓');
    };
    return this.ModalShell(editId?'Modifier le niveau':'Ajouter un niveau',close,
      r('div',null,
        r('div',{style:{marginBottom:14}},
          r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:8,fontWeight:600}},'Type de niveau'),
          r('div',{style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}},
            ...Object.entries(this.NIV_TYPES).map(([k,nt])=>r('button',{key:k,onClick:()=>onTypeChange(k),style:{padding:'8px 10px',border:`1px solid ${form.typeNiv===k?c.acBlue:c.bdr2}`,borderRadius:7,background:form.typeNiv===k?'rgba(59,130,246,.12)':'transparent',color:form.typeNiv===k?c.acBlue:c.text2,fontSize:11,fontWeight:form.typeNiv===k?600:400,cursor:'pointer',fontFamily:c.font,textAlign:'center'}},nt.label)))),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 18px'}},
          this.Inp('nom','Nom du niveau *','text',form,setForm),
          this.Inp('etage','N° d\'étage (−2=cave, 0=RDC, 1=Étage 1…)','number',form,setForm,{min:-5,max:200})
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','✓')]);
  }

  renderAppartForm(){
    const{editId,niveaux,appartements}=this.state;
    const setForm=fn=>this.setState(s=>({appForm:fn(s.appForm)}));
    const form=this.state.appForm;
    const close=()=>this.setState({showModal:false});
    const autoCode=this.genAppCode(+form.niveauId,appartements);
    const displayCode=editId?form.code||autoCode:autoCode;
    const save=()=>{
      if(!form.nom.trim())return;
      const code=editId?form.code||autoCode:autoCode;
      const _as=+form.surface;if(!Number.isFinite(_as)||_as<=0){this.showToast('Surface invalide (m²)');return;}const appCodeVal=editId?form.appCode||(this.state.appartements.find(a=>a.id===editId)?.appCode||'APP??'):this.genAppSeqCode(this.state.appartements);const obj={nom:form.nom,type:form.type||'appartement',surface:+form.surface,niveauId:+form.niveauId,code,position:form.position||'',appCode:appCodeVal};
      if(editId!==null)this.setState(s=>({appartements:s.appartements.map(a=>a.id===editId?{...a,...obj}:a),showModal:false,editId:null}));
      else this.setState(s=>({appartements:[...s.appartements,{...obj,id:s.nextAppId}],nextAppId:s.nextAppId+1,showModal:false}));
      this.showToast('Appartement enregistré ✓');
    };
    const nivSorted=[...niveaux].sort((a,b)=>b.etage-a.etage);
    const c=this.C;const r=this.r;
    return this.ModalShell(editId?'Modifier le logement':'Ajouter un logement',close,
      r('div',null,
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 18px'}},
          this.Inp('nom','Nom du logement (ex: Appt A, Studio 101)','text',form,setForm),
          this.Inp('surface','Surface (m²)','number',form,setForm,{min:10,max:10000}),
          this.Sel('niveauId','Niveau',nivSorted.map(n=>[String(n.id),`${n.nom}`]),form,setForm),
          this.Sel('position','Position dans le bâtiment',[['','Non définie'],['gauche','Gauche'],['milieu','Milieu'],['droite','Droite'],['avant','Avant'],['arriere','Arrière']],form,setForm),
        ),
        r('div',{style:{background:'rgba(2,119,189,.06)',border:'1px solid rgba(2,119,189,.18)',borderRadius:8,padding:'10px 14px',display:'flex',alignItems:'center',gap:10}},
          r('div',{style:{fontSize:10,color:'#0277BD',fontWeight:700,textTransform:'uppercase',letterSpacing:'.06em'}},'CODE AUTO'),
          r('div',{style:{fontFamily:c.mono,fontSize:18,fontWeight:800,color:'#0277BD',letterSpacing:'1px'}},displayCode),
          r('div',{style:{fontSize:10,color:c.muted}},nivSorted.find(n=>n.id===+form.niveauId)?.nom||'')
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','✓')]);
  }

  renderPieceForm(){
    const{editId,appartements}=this.state;const c=this.C;const r=this.r;
    const setForm=fn=>this.setState(s=>({pieceForm:fn(s.pieceForm)}));
    const form=this.state.pieceForm;
    const close=()=>this.setState({showModal:false});
    const save=()=>{
      if(!form.nom.trim())return;
      const _ps=+form.surface;if(!Number.isFinite(_ps)||_ps<=0){this.showToast('Surface invalide (m²)');return;}const pcCode=editId?(this.state.pieces.find(p=>p.id===editId)?.pieceCode||this.genPieceCode(this.state.pieces)):this.genPieceCode(this.state.pieces);const obj={nom:form.nom,type:form.type,surface:+form.surface,niveau:form.niveau,appId:+form.appId,couleur:form.couleur,typePlafond:form.typePlafond,typeMur:form.typeMur,typeSol:form.typeSol,pieceCode:pcCode};
      if(editId!==null)this.setState(s=>({pieces:s.pieces.map(p=>p.id===editId?{...p,...obj,fonctions:p.fonctions}:p),showModal:false,editId:null}));
      else this.setState(s=>{
        const useDef=form.loadMode!=='manual';
        const{fns,nextId}=useDef?this.genDefaultFonctions(+form.appId,form.type,s.pieces,s.nextFonctionId):{fns:[],nextId:s.nextFonctionId};
        return{pieces:[...s.pieces,{...obj,id:s.nextPieceId,fonctions:fns}],nextPieceId:s.nextPieceId+1,nextFonctionId:nextId,showModal:false};
      });
      this.showToast('Pièce enregistrée ✓');
    };
    return this.ModalShell(editId?'Modifier la pièce':'Ajouter une pièce',close,
      r('div',null,
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 18px'}},
          this.Inp('nom','Nom de la pièce *','text',form,setForm),
          this.Inp('surface','Surface (m²)','number',form,setForm,{min:1,max:500}),
          this.Sel('appId','Appartement',appartements.map(a=>[String(a.id),a.nom]),form,setForm),
          this.Sel('type','Type de pièce',Object.entries(this.PT).map(([v,{label}])=>[v,label]),form,setForm),
          this.Sel('niveau','Niveau équipement',[['standard','Standard'],['confort','Confort'],['premium','Premium']],form,setForm),
          this.Sel('typePlafond','Plafond',Object.entries(this.PLAFOND).map(([v,l])=>[v,l]),form,setForm),
          this.Sel('typeMur','Murs',Object.entries(this.MUR).map(([v,l])=>[v,l]),form,setForm),
          this.Sel('typeSol','Sol',Object.entries(this.SOL).map(([v,l])=>[v,l]),form,setForm),
        ),
        !editId&&r('div',{style:{marginBottom:14}},
          r('div',{style:{fontSize:11,color:c.text2,marginBottom:8,fontWeight:600}},'Fonctions initiales'),
          r('div',{style:{display:'flex',gap:8}},
            r('button',{
              onClick:()=>setForm(f=>({...f,loadMode:'default'})),
              style:{flex:1,padding:'10px 12px',borderRadius:8,cursor:'pointer',border:'2px solid '+(form.loadMode!=='manual'?c.accent:c.bdr2),background:form.loadMode!=='manual'?'rgba(2,132,199,.08)':'transparent',textAlign:'left',transition:'all .15s'}
            },
              r('div',{style:{fontSize:11,fontWeight:700,color:form.loadMode!=='manual'?c.accent:c.text,marginBottom:2}},'Fonctions par défaut'),
              r('div',{style:{fontSize:9,color:c.muted}},(()=>{const defs=this.DEFAULT_FONCTIONS[form.type]||[];return defs.length>0?defs.map(d=>this.FNS[d.type]?.label||d.type).join(', '):'Aucune fonction prédéfinie pour ce type';})())
            ),
            r('button',{
              onClick:()=>setForm(f=>({...f,loadMode:'manual'})),
              style:{flex:1,padding:'10px 12px',borderRadius:8,cursor:'pointer',border:'2px solid '+(form.loadMode==='manual'?'#7c3aed':c.bdr2),background:form.loadMode==='manual'?'rgba(124,58,237,.08)':'transparent',textAlign:'left',transition:'all .15s'}
            },
              r('div',{style:{fontSize:11,fontWeight:700,color:form.loadMode==='manual'?'#7c3aed':c.text,marginBottom:2}},'Manuellement'),
              r('div',{style:{fontSize:9,color:c.muted}},'Pièce vide — ajout des fonctions une par une')
            )
          )
        ),
        r('div',{style:{marginBottom:14}},
          r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:8,fontWeight:600}},'Couleur de la pièce'),
          r('div',{style:{display:'flex',gap:6,flexWrap:'wrap'}},
            ...this.PIECE_COLORS.map(col=>r('button',{key:col,onClick:()=>setForm(f=>({...f,couleur:col})),style:{width:28,height:28,borderRadius:6,border:`2px solid ${form.couleur===col?c.accent:c.bdr2}`,background:col,cursor:'pointer',flexShrink:0}})),
            r('div',{style:{display:'flex',alignItems:'center',gap:8,marginLeft:4}},
              r('input',{type:'color',value:form.couleur,onChange:e=>setForm(f=>({...f,couleur:e.target.value})),style:{width:28,height:28,border:'none',borderRadius:6,cursor:'pointer',background:'transparent'}}),
              r('span',{style:{fontSize:11,color:c.muted,fontFamily:c.mono}},form.couleur))
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','✓')]);
  }

  renderFonctionForm(){
    const{selectedPieceId,fonctionForm}=this.state;const c=this.C;const r=this.r;
    const piece=this.state.pieces.find(p=>p.id===selectedPieceId);if(!piece)return null;
    const setForm=fn=>this.setState(s=>({fonctionForm:fn(s.fonctionForm)}));
    const form=fonctionForm;
    const close=()=>this.setState({showModal:false,selectedPieceId:null});
    const previewRef=this.generateRef(piece.appId,form.type);
    const isEcl=form.type==='eclairage';
    const isPrise=['prises','prises_sdb'].includes(form.type);
    const qty=form.quantite||1;
    const fnInfo=this.FNS[form.type];

    const onLampChange=(v)=>{
      const lt=this.LAMP_TYPES[v];
      setForm(f=>({...f,typeLampe:v,puissance:lt?lt.puissance:f.puissance}));
    };
    const save=()=>{
      const ref=this.generateRef(piece.appId,form.type);
      const base={id:this.state.nextFonctionId,type:form.type,ref};
      const extra=isEcl?{typeLampe:form.typeLampe,puissance:+form.puissance,quantite:+form.quantite}:isPrise?{quantite:+form.quantite}:{quantite:1};
      this.setState(s=>({pieces:s.pieces.map(p=>p.id===selectedPieceId?{...p,fonctions:[...(p.fonctions||[]),{...base,...extra}]}:p),nextFonctionId:s.nextFonctionId+1,showModal:false,selectedPieceId:null}));
      this.showToast('Fonction ajoutée ✓');
    };

    return this.ModalShell(`+ Ajouter une fonction — ${piece.nom}`,close,
      r('div',null,
        r('div',{style:{marginBottom:16}},
          r('div',{style:{fontSize:11,color:c.text2,marginBottom:8,fontWeight:600}},'Type de fonction'),
          ...Object.entries(this.FN_CATS).map(([cat,{label,items}])=>r('div',{key:cat,style:{marginBottom:10}},
            r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:5}},label),
            r('div',{style:{display:'flex',flexWrap:'wrap',gap:4}},
              ...items.map(key=>{const fn=this.FNS[key];if(!fn)return null;const active=form.type===key;return r('button',{key,onClick:()=>setForm(f=>({...f,type:key,typeLampe:key==='eclairage'?f.typeLampe:'led_plafond',puissance:key==='eclairage'?(this.LAMP_TYPES[f.typeLampe]?.puissance||12):12,quantite:1})),style:{display:'inline-flex',alignItems:'center',gap:4,padding:'4px 9px',borderRadius:6,border:`1px solid ${active?fn.color+'80':c.bdr}`,background:active?fn.color+'18':'transparent',color:active?fn.color:c.muted,fontSize:11,fontFamily:c.font,fontWeight:active?600:400,cursor:'pointer',transition:'all .12s'}},r('span',{style:{filter:'grayscale(1) opacity(.55)'}},fn.icon),' ',fn.label);})
            )))
        ),
        isEcl&&r('div',{style:{background:c.surf3,borderRadius:9,padding:'14px 16px',marginBottom:14}},
          r('div',{style:{fontSize:11,color:c.text2,fontWeight:600,marginBottom:10}},'Paramètres éclairage'),
          r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 18px'}},
            r('div',{style:{marginBottom:14}},
              r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},'Type de lampe'),
              r('select',{value:form.typeLampe,onChange:e=>onLampChange(e.target.value),style:{width:'100%',background:c.surf,border:`1px solid ${c.bdr2}`,borderRadius:7,padding:'8px 11px',color:c.text,fontSize:13,outline:'none',fontFamily:c.font,appearance:'auto'}},
                ...Object.entries(this.LAMP_TYPES).map(([k,v])=>r('option',{key:k,value:k},v.label)))),
            this.Inp('puissance','Puissance unitaire (W)','number',form,setForm,{min:1,max:2000}),
            this.Inp('quantite','Quantité','number',form,setForm,{min:1,max:50})
          )
        ),
        isPrise&&r('div',{style:{background:c.surf3,borderRadius:9,padding:'14px 16px',marginBottom:14}},
          r('div',{style:{fontSize:11,color:c.text2,fontWeight:600,marginBottom:10}},'Paramètres prises'),
          this.Inp('quantite','Nombre de prises','number',form,setForm,{min:1,max:20})
        ),
        r('div',{style:{background:'rgba(37,99,235,.07)',border:`1px solid rgba(37,99,235,.2)`,borderRadius:9,padding:'12px 16px'}},
          r('div',{style:{fontSize:10,color:c.muted,marginBottom:4,fontWeight:700,textTransform:'uppercase',letterSpacing:'.07em'}},'RÉFÉRENCE AUTOMATIQUE'),
          r('div',{style:{fontSize:22,fontWeight:800,color:c.accent,fontFamily:c.mono,marginBottom:qty>1?4:0}},previewRef),
          qty>1&&r('div',{style:{fontSize:11,color:c.text2,fontFamily:c.mono}},Array.from({length:Math.min(qty,6)},(_,i)=>`${previewRef}.${i+1}`).join(' · ')+(qty>6?` …+${qty-6}`:'')),
          qty>1&&r('div',{style:{fontSize:10,color:c.muted,marginTop:4}},`${qty} lampes en parallèle sur le même disjoncteur`)
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Ajouter la fonction',save,'primary','md',fnInfo?this.ico(fnInfo.ico,14):null)]);
  }

  // ────────── HELPER: blocs partagés ──────────
  _editFnCableBloc(r,c,form,fn,setForm){
    const djCurr=this.state.disjoncteurs.find(d=>(d.recepteurs||[]).includes(fn.ref));
    const djSection=djCurr?String(djCurr.section||'1.5'):null;
    const djCalibre=djCurr?djCurr.calibre||10:null;
    const sectionInsuf=djCalibre&&!this.sectionOkForCalibre(form.cableSection,djCalibre);
    const sectionMinNeeded=djCalibre?this.sectionMinForCalibre(djCalibre):null;
    const nfcSection=djCurr?String(djCurr.section||'1.5'):'1.5';
    const cableTypes=[{v:'H07VU',l:'H07V-U — Rigide',sections:['1.5','2.5','4','6','10']},{v:'H07VR',l:'H07V-R — Souple',sections:['1.5','2.5','4','6','10']},{v:'H07VK',l:'H07V-K — Multibrin',sections:['1.5','2.5','4','6','10']},{v:'H05VV',l:'H05VV-F — Gaine',sections:['1.5','2.5','3x1.5','3x2.5']},{v:'XVB',l:'XVB-F2 — Blinde',sections:['1.5','2.5','4','6']},{v:'SYT',l:'SYT — Incendie',sections:['1.5','2.5']},{v:'MONO',l:'Mono conducteur nu',sections:['1.5','2.5','4','6','10','16']}];
    const selType=cableTypes.find(t=>t.v===(form.cableType||'H07VU'))||cableTypes[0];
    const hasMismatch=(djSection&&form.cableSection!==djSection)||sectionInsuf;
    return r('div',{style:{background:hasMismatch?'rgba(220,38,38,.04)':c.surf3,borderRadius:9,border:'1px solid '+(hasMismatch?c.danger:c.bdr),padding:'12px 14px'}},
      r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:10}},'Cable'),
      r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:10}},
        r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Longueur'),
        r('input',{type:'number',value:form.cableLongueur||0,min:0,max:500,step:0.5,onChange:e=>setForm({cableLongueur:+e.target.value}),style:{width:70,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:6,padding:'5px 8px',color:c.text,fontSize:13,fontWeight:700,outline:'none',fontFamily:c.mono}}),
        r('span',{style:{fontSize:10,color:c.muted}},'m'),
        form.cableLongueur>0&&r('span',{style:{fontSize:9,color:c.muted,marginLeft:4}},'~'+Math.round((form.cableLongueur||0)*1.15)+' m pose')
      ),
      r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:10}},
        r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Section'),
        r('select',{value:form.cableSection||'1.5',onChange:e=>setForm({cableSection:e.target.value}),style:{flex:1,background:c.surf,border:'2px solid '+(sectionInsuf?c.danger:(djSection&&form.cableSection!==djSection)?c.danger:(djCalibre&&this.sectionOkForCalibre(form.cableSection,djCalibre)&&(!djSection||form.cableSection===djSection))?'#22c55e':c.bdr2),borderRadius:6,padding:'5px 8px',color:c.text,fontSize:12,fontWeight:600,outline:'none',fontFamily:c.mono}},
          ...selType.sections.map(s=>{const tooSmall=djCalibre&&!this.sectionOkForCalibre(s,djCalibre);const isGood=djCalibre&&this.sectionOkForCalibre(s,djCalibre)&&(!djSection||s===djSection);return r('option',{key:s,value:s},s+'mm2'+(tooSmall?' (trop petit)':'')+(isGood?' ok':''));})
        )
      ),
      r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:8}},
        r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Type'),
        r('select',{value:form.cableType||'H07VU',onChange:e=>{const t=cableTypes.find(x=>x.v===e.target.value);setForm({cableType:e.target.value,cableSection:t&&t.sections.includes(form.cableSection)?form.cableSection:t?t.sections[0]:'1.5'});},style:{flex:1,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 7px',color:c.text,fontSize:11,outline:'none',appearance:'auto'}},
          ...cableTypes.map(t=>r('option',{key:t.v,value:t.v},t.l))
        )
      ),
      sectionInsuf&&r('div',{style:{marginTop:6,padding:'5px 8px',background:'rgba(220,38,38,.08)',border:'1px solid rgba(220,38,38,.2)',borderRadius:5,fontSize:9,color:c.danger,fontWeight:700}},'Section '+form.cableSection+'mm2 insuffisante pour CB '+djCalibre+'A — min '+sectionMinNeeded+'mm2'),
      !sectionInsuf&&djSection&&form.cableSection!==djSection&&r('div',{style:{marginTop:6,fontSize:9,color:c.danger}},'Cable '+form.cableSection+'mm2 diff. section CB '+nfcSection+'mm2')
    );
  }

  _editFnDepartBloc(r,c,form,setForm){
    const allTabx=this.state.tableauxElec;
    const allBoites=this.state.boitesDeriv;
    const allZones=this.state.zonesCommande;
    const dType=form.departType||'tableau';
    const dDist=form.departDist||0;
    const lenEst=dDist>0?Math.round(dDist*1.15+1)+' m (x1.15)':'';
    return r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
      r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:8}},
        this.ico('boite_deriv',12),
        r('span',{style:{fontSize:11,fontWeight:700,color:c.text,flex:1}},'Depart cable'),
        dDist>0&&r('span',{style:{fontSize:9,fontFamily:c.mono,color:'#0277BD',fontWeight:700}},lenEst)
      ),
      r('div',{style:{marginBottom:7}},
        r('label',{style:{display:'block',fontSize:9,color:c.text2,marginBottom:3,fontWeight:600}},'Type'),
        r('select',{value:dType,onChange:e=>setForm({departType:e.target.value,departId:'',departDist:0}),style:{width:'100%',background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 8px',color:c.text,fontSize:11,outline:'none',appearance:'auto'}},
          r('option',{value:'tableau'},'Tableau electrique'),
          r('option',{value:'boite'},'Boite de derivation'),
          r('option',{value:'zone'},'Zone de commande')
        )
      ),
      r('div',{style:{marginBottom:7}},
        dType==='boite'&&allBoites.length===0?
          r('div',{style:{padding:'8px 10px',background:'rgba(0,0,0,.03)',border:'1px dashed '+c.bdr2,borderRadius:6,textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucune boite'):
          r('select',{value:form.departId||'',onChange:e=>setForm({departId:e.target.value}),style:{width:'100%',background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 8px',color:c.text,fontSize:11,outline:'none'}},
            r('option',{value:''},'-- Choisir --'),
            ...(dType==='tableau'?allTabx:dType==='boite'?allBoites:allZones).map(x=>r('option',{key:x.id,value:String(x.id)},dType==='zone'?((x.zoneCode||'')+(x.zoneCode?' — ':'')+x.nom):(x.nom||(x.id+''))))
          )
      ),
      r('div',{style:{display:'flex',alignItems:'center',gap:6}},
        r('label',{style:{fontSize:9,color:c.text2,fontWeight:600,flexShrink:0}},'Distance (m)'),
        r('input',{type:'number',min:0,max:300,step:0.5,value:dDist,onChange:e=>setForm({departDist:+e.target.value}),style:{width:60,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 7px',color:c.text,fontSize:12,fontWeight:700,outline:'none',fontFamily:c.mono}})
      )
    );
  }

  _editFnCBBloc(r,c,fn,form,fnPuissanceLive,fnPuissanceSaved){
    const allDj=this.state.disjoncteurs;
    const allPieces=this.state.pieces;
    const djCurrent=allDj.find(d=>(d.recepteurs||[]).includes(fn.ref))||null;
    const openCBModal=()=>this.setState({showModal:true,modalType:'selectCB'});
    if(!djCurrent){
      return r('div',{style:{background:c.surf3,borderRadius:9,border:'1px dashed '+c.bdr2,padding:'12px 14px',display:'flex',alignItems:'center',gap:10}},
        r('div',{style:{width:32,height:32,borderRadius:7,background:'rgba(239,68,68,.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'#ef4444',flexShrink:0}},this.ico('tableau_elec',15)),
        r('div',{style:{flex:1}},r('div',{style:{fontSize:11,fontWeight:700,color:c.text}},'Disjoncteur CB'),r('div',{style:{fontSize:10,color:c.muted,fontStyle:'italic'}},'Non assigne')),
        r('button',{onClick:openCBModal,style:{background:'#ef4444',color:'#fff',border:'none',borderRadius:7,padding:'7px 13px',fontSize:11,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:5,flexShrink:0}},this.ico('tableau_elec',12),' Assigner CB')
      );
    }
    const tab=this.state.tableauxElec.find(t=>t.id===djCurrent.tableauId);
    const totW=this.calcDjPower(djCurrent,allPieces)-fnPuissanceSaved+fnPuissanceLive;
    const lim=this.djNFCLimit(djCurrent);
    const pct=Math.min(Math.round(totW/lim.maxW*100),100);
    const nPct=Math.min(Math.round((djCurrent.recepteurs||[]).length/lim.maxR*100),100);
    const mPct=Math.max(pct,nPct);
    const over=totW>lim.maxW||(djCurrent.recepteurs||[]).length>lim.maxR;
    const warn=!over&&mPct>80;
    return r('div',{style:{background:c.surf3,borderRadius:9,border:'2px solid '+(over?c.danger:warn?c.warn:'#ef4444'),padding:'12px 14px',cursor:'pointer'},onClick:openCBModal},
      r('div',{style:{display:'flex',alignItems:'center',gap:7,marginBottom:6}},
        r('div',{style:{fontFamily:c.mono,fontSize:13,fontWeight:900,color:'#ef4444',flex:1}},djCurrent.code),
        this.Bdg(djCurrent.courbe+djCurrent.calibre+'A','#ef4444'),
        this.Bdg((djCurrent.section||'?')+'mm',c.muted),
        djCurrent.ddr>0&&this.Bdg(djCurrent.ddr+'mA','#0284C7'),
        r('span',{style:{fontSize:9,color:c.muted,fontFamily:c.mono}},this.ico('pencil',9),' Modifier')
      ),
      tab&&r('div',{style:{fontSize:9,color:'#0277BD',marginBottom:5}},'Tableau: '+tab.nom),
      r('div',null,
        r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:9,marginBottom:2}},
          r('span',{style:{color:over?c.danger:c.muted}},totW+'W / '+lim.maxW+'W — '+(djCurrent.recepteurs||[]).length+' rec.'),
          r('span',{style:{fontWeight:800,color:over?c.danger:warn?c.warn:'#22c55e',fontFamily:c.mono}},mPct+'%')
        ),
        r('div',{style:{height:5,background:c.bdr2,borderRadius:3,overflow:'hidden'}},
          r('div',{style:{height:'100%',width:mPct+'%',background:over?c.danger:warn?c.warn:'#22c55e',borderRadius:3}})
        )
      ),
      over&&r('div',{style:{marginTop:4,fontSize:9,color:c.danger,fontWeight:700}},'DEPASSE NFC: '+lim.label),
      warn&&!over&&r('div',{style:{marginTop:4,fontSize:9,color:c.warn,fontWeight:600}},'Proche limite ('+mPct+'%)')
    );
  }

  // ────────── Modifier Prises ──────────
  renderEditFonctionPrises(){
    const{editFonctionForm:form,editFonctionPieceId,editFonctionId}=this.state;
    const c=this.C;const r=this.r;const sky='#0277BD';
    const piece=this.state.pieces.find(p=>p.id===editFonctionPieceId);
    const fn=piece&&(piece.fonctions||[]).find(f=>f.id===editFonctionId);
    if(!piece||!fn)return null;
    const fnInfo=this.FNS[fn.type];
    const setForm=upd=>this.setState(s=>({editFonctionForm:{...s.editFonctionForm,...upd}}));
    const close=()=>this.setState({showModal:false,editFonctionId:null,editFonctionPieceId:null});
    const isPriseSDB=fn.type==='prises_sdb';
    const puissanceUnitaire=460; // W par prise (NF C 15-100)
    const save=()=>{
      const updated={...fn,quantite:+form.quantite,departType:form.departType||'tableau',departId:form.departId?+form.departId:null,departDist:+form.departDist||0,cableLongueur:+form.cableLongueur||0,cableSection:form.cableSection||'2.5',cableType:form.cableType||'H07VU',cableRepere:form.cableRepere||'',nbConducteursConn:+form.nbConducteursConn||0,repBagues:!!form.repBagues};
      (()=>{
      if(fn.type!==updated.type||fn.departType!==updated.departType||String(fn.departId)!==String(updated.departId)){
        // Type change: purge cable overrides for this fn
        const oldWCode2=this.genCEBATCode(fn,this.state);
        this.purgeNomOverridesForCode(oldWCode2);
      }
      this.setState(s=>({pieces:s.pieces.map(p=>p.id===piece.id?{...p,fonctions:(p.fonctions||[]).map(f=>f.id===fn.id?updated:f)}:p),showModal:false,editFonctionId:null,editFonctionPieceId:null}));
    })();
      this.showToast('Prises mises a jour');
    };
    const fnPuissanceLive=puissanceUnitaire*(+form.quantite||1);
    const fnPuissanceSaved=puissanceUnitaire*(fn.quantite||1);
    return this.ModalShell('Modifier '+(fnInfo?fnInfo.label:fn.type)+' ('+fn.ref+')',close,
      r('div',null,
        r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:16,padding:'10px 14px',background:fnInfo?fnInfo.color+'12':'#f0f0f0',borderRadius:8,border:'1px solid '+(fnInfo?fnInfo.color+'30':'#ddd')}},
          r('div',{style:{width:36,height:36,borderRadius:8,background:fnInfo?fnInfo.color+'20':'#eee',display:'flex',alignItems:'center',justifyContent:'center',color:fnInfo?fnInfo.color:'#666',flexShrink:0}},this.ico(fnInfo?fnInfo.ico:'prises',18)),
          r('div',{style:{flex:1,minWidth:0}},
            r('div',{style:{fontSize:13,fontWeight:700,color:c.text}},fnInfo?fnInfo.label:fn.type),
            r('div',{style:{fontSize:12,fontFamily:c.mono,fontWeight:700,color:fnInfo?fnInfo.color:sky}},fn.ref),
            r('div',{style:{fontSize:10,color:c.muted}},piece.nom+' — '+puissanceUnitaire+'W/prise (NF C 15-100)')
          ),
          isPriseSDB&&r('div',{style:{padding:'4px 9px',background:'rgba(3,132,199,.1)',border:'1px solid rgba(3,132,199,.3)',borderRadius:6,fontSize:9,fontWeight:700,color:'#0284C7'}},'IP44 · Zone SDB')
        ),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}},
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:10}},'Quantite de prises'),
              r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:8}},
                r('button',{onClick:()=>setForm({quantite:Math.max(1,(form.quantite||1)-1)}),style:{width:26,height:26,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'-'),
                r('span',{style:{fontSize:18,fontWeight:800,color:c.text,fontFamily:c.mono,minWidth:28,textAlign:'center'}},form.quantite||1),
                r('button',{onClick:()=>setForm({quantite:(form.quantite||1)+1}),style:{width:26,height:26,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'+'),
                r('span',{style:{fontSize:10,color:c.muted,marginLeft:4}},'prises 2P+T 16A')
              ),
              r('div',{style:{display:'flex',justifyContent:'space-between',padding:'5px 8px',background:'rgba(59,130,246,.06)',borderRadius:6,border:'1px solid rgba(59,130,246,.15)'}},
                r('span',{style:{fontSize:10,color:c.muted,fontWeight:600}},'Puissance totale'),
                r('span',{style:{fontSize:13,fontWeight:800,color:'#3b82f6',fontFamily:c.mono}},fnPuissanceLive+'W')
              ),
              isPriseSDB&&r('div',{style:{marginTop:8,padding:'6px 10px',background:'rgba(3,132,199,.06)',border:'1px solid rgba(3,132,199,.2)',borderRadius:6,fontSize:9,color:'#0284C7'}},'Protection differentielle 30mA type A obligatoire en SDB (NF C 15-100 sect.701)')
            ),
            this._editFnCableBloc(r,c,{...form,cableSection:form.cableSection||'2.5'},fn,setForm),
            this._editFnDepartBloc(r,c,form,setForm)
          ),
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:8}},'Specifications prises'),
              r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:10}},
                r('div',{style:{padding:'6px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,marginBottom:2}},'Norme'),r('div',{style:{fontWeight:700,color:c.text}},'NF C 15-100')),
                r('div',{style:{padding:'6px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,marginBottom:2}},'Calibre'),r('div',{style:{fontWeight:700,color:c.text}},'16A / 2P+T')),
                r('div',{style:{padding:'6px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,marginBottom:2}},'Section min.'),r('div',{style:{fontWeight:700,color:c.text}},'2.5mm²')),
                r('div',{style:{padding:'6px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,marginBottom:2}},'DDR'),r('div',{style:{fontWeight:700,color:isPriseSDB?'#0284C7':c.text}},isPriseSDB?'30mA type A':'30mA type AC'))
              ),
              r('div',{style:{marginTop:8,padding:'6px 10px',background:'rgba(59,130,246,.04)',borderRadius:6,fontSize:9,color:c.muted}},'Hauteur standard: 0.35m · Max 8 prises/circuit · DDR 30mA obligatoire')
            ),
            this._editFnCBBloc(r,c,fn,form,fnPuissanceLive,fnPuissanceSaved)
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','ok')]
    );
  }

  // ────────── Modifier Media ──────────
  renderEditFonctionMedia(){
    const{editFonctionForm:form,editFonctionPieceId,editFonctionId}=this.state;
    const c=this.C;const r=this.r;const sky='#0277BD';
    const piece=this.state.pieces.find(p=>p.id===editFonctionPieceId);
    const fn=piece&&(piece.fonctions||[]).find(f=>f.id===editFonctionId);
    if(!piece||!fn)return null;
    const fnInfo=this.FNS[fn.type];
    const setForm=upd=>this.setState(s=>({editFonctionForm:{...s.editFonctionForm,...upd}}));
    const close=()=>this.setState({showModal:false,editFonctionId:null,editFonctionPieceId:null});
    // Puissances standard par type media
    const mediaPuissances={tv:200,rj45:0,camera:15,sono:150};
    const puissanceRef=mediaPuissances[fn.type]||0;
    const isDataOnly=fn.type==='rj45';
    const save=()=>{
      const updated={...fn,quantite:+form.quantite,puissance:+form.puissance||puissanceRef,departType:form.departType||'tableau',departId:form.departId?+form.departId:null,departDist:+form.departDist||0,cableLongueur:+form.cableLongueur||0,cableSection:form.cableSection||'1.5',cableType:form.cableType||'H07VU',cableRepere:form.cableRepere||'',nbConducteursConn:+form.nbConducteursConn||0,repBagues:!!form.repBagues};
      (()=>{
      if(fn.type!==updated.type||fn.departType!==updated.departType||String(fn.departId)!==String(updated.departId)){
        // Type change: purge cable overrides for this fn
        const oldWCode2=this.genCEBATCode(fn,this.state);
        this.purgeNomOverridesForCode(oldWCode2);
      }
      this.setState(s=>({pieces:s.pieces.map(p=>p.id===piece.id?{...p,fonctions:(p.fonctions||[]).map(f=>f.id===fn.id?updated:f)}:p),showModal:false,editFonctionId:null,editFonctionPieceId:null}));
    })();
      this.showToast('Media mis a jour');
    };
    const fnPuissanceLive=(+form.puissance||puissanceRef)*(+form.quantite||1);
    const fnPuissanceSaved=(fn.puissance||puissanceRef)*(fn.quantite||1);
    const mediaLabels={tv:'Prise antenne coaxiale (IEC)',rj45:'Prise reseau RJ45 Cat.6',camera:'Camera IP PoE',sono:'Sortie enceinte / ampli'};
    return this.ModalShell('Modifier '+(fnInfo?fnInfo.label:fn.type)+' ('+fn.ref+')',close,
      r('div',null,
        r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:16,padding:'10px 14px',background:fnInfo?fnInfo.color+'12':'#f0f0f0',borderRadius:8,border:'1px solid '+(fnInfo?fnInfo.color+'30':'#ddd')}},
          r('div',{style:{width:36,height:36,borderRadius:8,background:fnInfo?fnInfo.color+'20':'#eee',display:'flex',alignItems:'center',justifyContent:'center',color:fnInfo?fnInfo.color:'#666',flexShrink:0}},this.ico(fnInfo?fnInfo.ico:'tv',18)),
          r('div',{style:{flex:1,minWidth:0}},
            r('div',{style:{fontSize:13,fontWeight:700,color:c.text}},fnInfo?fnInfo.label:fn.type),
            r('div',{style:{fontSize:12,fontFamily:c.mono,fontWeight:700,color:fnInfo?fnInfo.color:sky}},fn.ref),
            r('div',{style:{fontSize:10,color:c.muted}},piece.nom+' — '+(mediaLabels[fn.type]||'Circuit media'))
          ),
          isDataOnly&&r('div',{style:{padding:'4px 9px',background:'rgba(6,182,212,.1)',border:'1px solid rgba(6,182,212,.3)',borderRadius:6,fontSize:9,fontWeight:700,color:'#06b6d4'}},'Courant faible · Cat.6')
        ),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}},
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:10}},'Quantite & Puissance'),
              r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:8}},
                r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Points'),
                r('button',{onClick:()=>setForm({quantite:Math.max(1,(form.quantite||1)-1)}),style:{width:26,height:26,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'-'),
                r('span',{style:{fontSize:18,fontWeight:800,color:c.text,fontFamily:c.mono,minWidth:28,textAlign:'center'}},form.quantite||1),
                r('button',{onClick:()=>setForm({quantite:(form.quantite||1)+1}),style:{width:26,height:26,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'+')
              ),
              !isDataOnly&&r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:6}},
                r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'W/unite'),
                r('input',{type:'number',value:form.puissance||puissanceRef,min:0,max:2000,onChange:e=>setForm({puissance:+e.target.value}),style:{flex:1,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:6,padding:'5px 8px',color:c.text,fontSize:13,fontWeight:700,outline:'none',fontFamily:c.mono}})
              ),
              r('div',{style:{display:'flex',justifyContent:'space-between',padding:'5px 8px',background:fnInfo?fnInfo.color+'08':'rgba(0,0,0,.04)',borderRadius:6,border:'1px solid '+(fnInfo?fnInfo.color+'25':'#eee')}},
                r('span',{style:{fontSize:10,color:c.muted,fontWeight:600}},isDataOnly?'Circuit courant faible':'Total'),
                r('span',{style:{fontSize:13,fontWeight:800,color:fnInfo?fnInfo.color:sky,fontFamily:c.mono}},isDataOnly?'NC (data)':fnPuissanceLive+'W')
              )
            ),
            this._editFnCableBloc(r,c,form,fn,setForm),
            this._editFnDepartBloc(r,c,form,setForm)
          ),
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:8}},'Specifications media'),
              r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:10}},
                r('div',{style:{padding:'6px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,marginBottom:2}},'Type'),r('div',{style:{fontWeight:700,color:c.text}},mediaLabels[fn.type]||fn.type)),
                r('div',{style:{padding:'6px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,marginBottom:2}},'Circuit'),r('div',{style:{fontWeight:700,color:c.text}},isDataOnly?'Courant faible':'Courant fort')),
                r('div',{style:{padding:'6px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,marginBottom:2}},'Section'),r('div',{style:{fontWeight:700,color:c.text}},isDataOnly?'Cable data':'1.5mm2')),
                r('div',{style:{padding:'6px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,marginBottom:2}},'CB type'),r('div',{style:{fontWeight:700,color:c.text}},isDataOnly?'N/A':'B10A'))
              ),
              fn.type==='camera'&&r('div',{style:{marginTop:8,padding:'6px 10px',background:'rgba(148,163,184,.06)',borderRadius:6,fontSize:9,color:c.muted}},'PoE 802.3af — alim. via reseau — prise RJ45 en plus si enregistreur'),
              fn.type==='rj45'&&r('div',{style:{marginTop:8,padding:'6px 10px',background:'rgba(6,182,212,.06)',borderRadius:6,fontSize:9,color:'#06b6d4'}},'Gaine ICTA separee des circuits de puissance (NF C 15-100 sect.444) — distance min 10cm'),
              fn.type==='tv'&&r('div',{style:{marginTop:8,padding:'6px 10px',background:'rgba(139,92,246,.06)',borderRadius:6,fontSize:9,color:'#8b5cf6'}},'Coaxial 75 ohms — amplificateur antenne si signal faible')
            ),
            !isDataOnly&&this._editFnCBBloc(r,c,fn,form,fnPuissanceLive,fnPuissanceSaved),
            isDataOnly&&r('div',{style:{background:c.surf3,borderRadius:9,border:'1px dashed '+c.bdr2,padding:'12px 14px',textAlign:'center'}},
              r('div',{style:{fontSize:10,color:c.muted,fontStyle:'italic'}},'Courant faible — pas de disjoncteur de puissance'),
              r('div',{style:{fontSize:9,color:c.muted,marginTop:4}},'Alim. par switch/baie reseau (PoE si necessaire)')
            )
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','ok')]
    );
  }

  // ────────── Modifier Circuits Specialises ──────────
  renderEditFonctionSpec(){
    const{editFonctionForm:form,editFonctionPieceId,editFonctionId}=this.state;
    const c=this.C;const r=this.r;const sky='#0277BD';
    const piece=this.state.pieces.find(p=>p.id===editFonctionPieceId);
    const fn=piece&&(piece.fonctions||[]).find(f=>f.id===editFonctionId);
    if(!piece||!fn)return null;
    const fnInfo=this.FNS[fn.type];
    const setForm=upd=>this.setState(s=>({editFonctionForm:{...s.editFonctionForm,...upd}}));
    const close=()=>this.setState({showModal:false,editFonctionId:null,editFonctionPieceId:null});
    // Puissances et specs NFC par type
    const specData={
      four:{puissance:6000,section:'6',calibre:32,courbe:'C',ddr:30,ddrType:'A',label:'Four / Cuisiniere',note:'NF C 15-100 sect.733 — circuit dedie obligatoire'},
      lave_vaisselle:{puissance:2200,section:'2.5',calibre:20,courbe:'C',ddr:30,ddrType:'A',label:'Lave-vaisselle',note:'Circuit dedie — prise 2P+T 16A ou connexion directe'},
      lave_linge:{puissance:2500,section:'2.5',calibre:20,courbe:'C',ddr:30,ddrType:'A',label:'Lave-linge',note:'Circuit dedie — NF C 15-100 — prise avec terre'},
      seche_linge:{puissance:2400,section:'2.5',calibre:20,courbe:'C',ddr:30,ddrType:'A',label:'Seche-linge',note:'Circuit dedie — evacuation vapeur obligatoire'},
      hotte:{puissance:300,section:'1.5',calibre:10,courbe:'B',ddr:30,ddrType:'AC',label:'Hotte aspirante',note:'Circuit dedie recommande — eviter prise de cuisson'},
      chauffe_eau:{puissance:3000,section:'2.5',calibre:20,courbe:'C',ddr:30,ddrType:'AC',label:'Chauffe-eau ECS',note:'Circuit dedie obligatoire — contacteur heures creuses possible'},
      climatisation:{puissance:2500,section:'2.5',calibre:20,courbe:'C',ddr:30,ddrType:'A',label:'Climatisation',note:'Circuit dedie — voire 3x2.5mm2 si unite exterieure'},
      vmc:{puissance:200,section:'1.5',calibre:10,courbe:'B',ddr:30,ddrType:'AC',label:'VMC',note:'Circuit dedie — fonctionne en permanence — protection type B recommandee'}
    };
    const spec=specData[fn.type]||{puissance:1000,section:'2.5',calibre:20,courbe:'C',ddr:30,ddrType:'A',label:fnInfo?.label||fn.type,note:''};
    const fnPuissanceLive=spec.puissance; // fixe pour specialises
    const fnPuissanceSaved=fn.puissance||spec.puissance;
    const save=()=>{
      const updated={...fn,quantite:1,puissance:spec.puissance,departType:form.departType||'tableau',departId:form.departId?+form.departId:null,departDist:+form.departDist||0,cableLongueur:+form.cableLongueur||0,cableSection:form.cableSection||spec.section,cableType:form.cableType||'H07VU',cableRepere:form.cableRepere||'',nbConducteursConn:+form.nbConducteursConn||0,repBagues:!!form.repBagues};
      (()=>{
      if(fn.type!==updated.type||fn.departType!==updated.departType||String(fn.departId)!==String(updated.departId)){
        // Type change: purge cable overrides for this fn
        const oldWCode2=this.genCEBATCode(fn,this.state);
        this.purgeNomOverridesForCode(oldWCode2);
      }
      this.setState(s=>({pieces:s.pieces.map(p=>p.id===piece.id?{...p,fonctions:(p.fonctions||[]).map(f=>f.id===fn.id?updated:f)}:p),showModal:false,editFonctionId:null,editFonctionPieceId:null}));
    })();
      this.showToast('Circuit specialise mis a jour');
    };
    return this.ModalShell('Modifier '+(fnInfo?fnInfo.label:fn.type)+' ('+fn.ref+')',close,
      r('div',null,
        r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:16,padding:'10px 14px',background:fnInfo?fnInfo.color+'12':'#f0f0f0',borderRadius:8,border:'1px solid '+(fnInfo?fnInfo.color+'30':'#ddd')}},
          r('div',{style:{width:36,height:36,borderRadius:8,background:fnInfo?fnInfo.color+'20':'#eee',display:'flex',alignItems:'center',justifyContent:'center',color:fnInfo?fnInfo.color:'#666',flexShrink:0}},this.ico(fnInfo?fnInfo.ico:'four',18)),
          r('div',{style:{flex:1,minWidth:0}},
            r('div',{style:{fontSize:13,fontWeight:700,color:c.text}},fnInfo?fnInfo.label:fn.type),
            r('div',{style:{fontSize:12,fontFamily:c.mono,fontWeight:700,color:fnInfo?fnInfo.color:sky}},fn.ref),
            r('div',{style:{fontSize:10,color:c.muted}},piece.nom+' — Circuit dedie NF C 15-100')
          ),
          r('div',{style:{padding:'4px 9px',background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.2)',borderRadius:6,fontSize:9,fontWeight:700,color:'#ef4444'}},'Circuit dedie')
        ),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}},
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            r('div',{style:{background:c.surf3,borderRadius:9,border:'2px solid '+(fnInfo?fnInfo.color+'40':'#eee'),padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:10}},'Specifications electriques (NF C 15-100)'),
              r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:10,marginBottom:10}},
                r('div',{style:{padding:'7px 10px',background:c.surf,borderRadius:7,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,fontSize:8,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:2}},'Puissance nominale'),r('div',{style:{fontWeight:800,color:fnInfo?fnInfo.color:c.text,fontFamily:c.mono,fontSize:14}},spec.puissance+'W')),
                r('div',{style:{padding:'7px 10px',background:c.surf,borderRadius:7,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,fontSize:8,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:2}},'Calibre CB'),r('div',{style:{fontWeight:800,color:'#ef4444',fontFamily:c.mono,fontSize:14}},spec.courbe+spec.calibre+'A')),
                r('div',{style:{padding:'7px 10px',background:c.surf,borderRadius:7,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,fontSize:8,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:2}},'Section min.'),r('div',{style:{fontWeight:800,color:c.text,fontFamily:c.mono,fontSize:14}},spec.section+'mm2')),
                r('div',{style:{padding:'7px 10px',background:c.surf,borderRadius:7,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,fontSize:8,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:2}},'DDR'),r('div',{style:{fontWeight:800,color:'#0284C7',fontFamily:c.mono,fontSize:14}},spec.ddr+'mA '+spec.ddrType))
              ),
              spec.note&&r('div',{style:{padding:'7px 10px',background:fnInfo?fnInfo.color+'06':'rgba(0,0,0,.03)',border:'1px solid '+(fnInfo?fnInfo.color+'20':'#eee'),borderRadius:6,fontSize:9,color:c.muted,lineHeight:1.6}},spec.note)
            ),
            this._editFnCableBloc(r,c,{...form,cableSection:form.cableSection||spec.section},fn,setForm),
            this._editFnDepartBloc(r,c,form,setForm)
          ),
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:8}},'Circuit dedie — 1 seul recepteur'),
              r('div',{style:{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'rgba(239,68,68,.04)',border:'1px solid rgba(239,68,68,.15)',borderRadius:7}},
                r('div',{style:{fontFamily:c.mono,fontSize:28,fontWeight:900,color:fnInfo?fnInfo.color:'#ef4444'}},'1'),
                r('div',null,
                  r('div',{style:{fontSize:11,fontWeight:700,color:c.text}},spec.label),
                  r('div',{style:{fontSize:9,color:c.muted}},'Circuit dedie — quantite fixe a 1')
                )
              ),
              r('div',{style:{marginTop:8,padding:'6px 10px',background:'rgba(0,0,0,.03)',borderRadius:6,fontSize:9,color:c.muted}},'Un circuit specialise ne peut pas etre partage. Puissance et calibre fixes par la norme.')
            ),
            this._editFnCBBloc(r,c,fn,form,fnPuissanceLive,fnPuissanceSaved)
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','ok')]
    );
  }

  // ────────── Modifier Exterieur / Securite / Energie ──────────
  renderEditFonctionExtSecuEnerg(){
    const{editFonctionForm:form,editFonctionPieceId,editFonctionId}=this.state;
    const c=this.C;const r=this.r;const sky='#0277BD';
    const piece=this.state.pieces.find(p=>p.id===editFonctionPieceId);
    const fn=piece&&(piece.fonctions||[]).find(f=>f.id===editFonctionId);
    if(!piece||!fn)return null;
    const fnInfo=this.FNS[fn.type];
    const setForm=upd=>this.setState(s=>({editFonctionForm:{...s.editFonctionForm,...upd}}));
    const close=()=>this.setState({showModal:false,editFonctionId:null,editFonctionPieceId:null});
    const typeData={
      portail:{puissance:500,section:'2.5',calibre:16,note:'Circuit dedie — chemin de cables arme si en terre — gaine ICTA sinon',color:'#94a3b8',tag:'Exterieur motorise'},
      borne_ve:{puissance:7400,section:'6',calibre:32,note:'NF C 15-100 sect.703 — disjoncteur differentiel 30mA type A obligatoire — pilotage IRVE recommande',color:'#22c55e',tag:'IRVE T2'},
      piscine:{puissance:1500,section:'2.5',calibre:16,note:'NF C 15-100 sect.702 — protection IP68 en zone 0/1 — liaison equipotentielle supplementaire',color:'#0891b2',tag:'Zone piscine'},
      alarme_intrusion:{puissance:50,section:'1.5',calibre:10,note:'Circuit dedie — batterie secours integree — separation totale des circuits de puissance',color:'#ef4444',tag:'Securite'},
      detecteur_fumee:{puissance:5,section:'1.5',calibre:10,note:'NF C 15-100 — detecteur interconnectable — courant faible, alimentation 230V ou pile',color:'#f97316',tag:'SSI'},
      detecteur_co:{puissance:5,section:'1.5',calibre:10,note:'Obligatoire en presence de chaudiere gaz — interconnectable avec detecteur fumee',color:'#f97316',tag:'Securite'},
      visiophone:{puissance:20,section:'1.5',calibre:10,note:'Courant faible pour visiophone bus (2 fils) ou 4 fils — alimentation centrale',color:'#8b5cf6',tag:'Controle acces'},
      solaire:{puissance:-3000,section:'6',calibre:25,note:'Production — puissance negative (injection reseau) — onduleur obligatoire — schema specifique',color:'#f59e0b',tag:'Production PV'},
      inverseur_source:{puissance:0,section:'6',calibre:40,note:'NF C 15-100 — inverseur de source automatique — consignation obligatoire',color:'#06b6d4',tag:'Securite electrique'},
      controleur_tension:{puissance:10,section:'1.5',calibre:10,note:'Moniteur qualite reseau — alarme sur depassement tension',color:'#22c55e',tag:'Monitoring'},
      afficheur:{puissance:5,section:'1.5',calibre:10,note:'Compteur energie — affichage consommation — connexion Linky ou capteur CT',color:'#94a3b8',tag:'Comptage'},
      domotique:{puissance:100,section:'1.5',calibre:10,note:'Bus KNX / ZigBee — alimenter depuis tableau dedie — cables bus shieldes',color:'#8b5cf6',tag:'Domotique KNX'}
    };
    const td=typeData[fn.type]||{puissance:200,section:'2.5',calibre:20,note:'',color:fnInfo?.color||c.muted,tag:'Specialise'};
    const isProduction=td.puissance<0;
    const fnPuissanceLive=Math.abs(+form.puissance||td.puissance)*(+form.quantite||1);
    const fnPuissanceSaved=Math.abs(fn.puissance||td.puissance)*(fn.quantite||1);
    const save=()=>{
      const updated={...fn,quantite:+form.quantite||1,puissance:Math.abs(+form.puissance||td.puissance),departType:form.departType||'tableau',departId:form.departId?+form.departId:null,departDist:+form.departDist||0,cableLongueur:+form.cableLongueur||0,cableSection:form.cableSection||td.section,cableType:form.cableType||'H07VU',cableRepere:form.cableRepere||'',nbConducteursConn:+form.nbConducteursConn||0,repBagues:!!form.repBagues};
      (()=>{
      if(fn.type!==updated.type||fn.departType!==updated.departType||String(fn.departId)!==String(updated.departId)){
        // Type change: purge cable overrides for this fn
        const oldWCode2=this.genCEBATCode(fn,this.state);
        this.purgeNomOverridesForCode(oldWCode2);
      }
      this.setState(s=>({pieces:s.pieces.map(p=>p.id===piece.id?{...p,fonctions:(p.fonctions||[]).map(f=>f.id===fn.id?updated:f)}:p),showModal:false,editFonctionId:null,editFonctionPieceId:null}));
    })();
      this.showToast('Circuit mis a jour');
    };
    return this.ModalShell('Modifier '+(fnInfo?fnInfo.label:fn.type)+' ('+fn.ref+')',close,
      r('div',null,
        r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:16,padding:'10px 14px',background:fnInfo?fnInfo.color+'12':'#f0f0f0',borderRadius:8,border:'1px solid '+(fnInfo?fnInfo.color+'30':'#ddd')}},
          r('div',{style:{width:36,height:36,borderRadius:8,background:fnInfo?fnInfo.color+'20':'#eee',display:'flex',alignItems:'center',justifyContent:'center',color:fnInfo?fnInfo.color:'#666',flexShrink:0}},this.ico(fnInfo?fnInfo.ico:'portail',18)),
          r('div',{style:{flex:1,minWidth:0}},
            r('div',{style:{fontSize:13,fontWeight:700,color:c.text}},fnInfo?fnInfo.label:fn.type),
            r('div',{style:{fontSize:12,fontFamily:c.mono,fontWeight:700,color:fnInfo?fnInfo.color:sky}},fn.ref),
            r('div',{style:{fontSize:10,color:c.muted}},piece.nom+' — '+td.tag)
          ),
          r('div',{style:{padding:'4px 9px',background:(td.color||fnInfo?.color||c.muted)+'15',border:'1px solid '+(td.color||fnInfo?.color||c.muted)+'35',borderRadius:6,fontSize:9,fontWeight:700,color:td.color||fnInfo?.color||c.muted}},td.tag)
        ),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}},
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:10}},'Quantite & Puissance'),
              r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:8}},
                r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Quantite'),
                r('button',{onClick:()=>setForm({quantite:Math.max(1,(form.quantite||1)-1)}),style:{width:26,height:26,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'-'),
                r('span',{style:{fontSize:18,fontWeight:800,color:c.text,fontFamily:c.mono,minWidth:28,textAlign:'center'}},form.quantite||1),
                r('button',{onClick:()=>setForm({quantite:(form.quantite||1)+1}),style:{width:26,height:26,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'+')
              ),
              r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:6}},
                r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'W/unite'),
                r('input',{type:'number',value:Math.abs(+form.puissance||td.puissance),min:0,max:50000,onChange:e=>setForm({puissance:+e.target.value}),style:{flex:1,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:6,padding:'5px 8px',color:c.text,fontSize:13,fontWeight:700,outline:'none',fontFamily:c.mono}})
              ),
              r('div',{style:{display:'flex',justifyContent:'space-between',padding:'5px 8px',background:fnInfo?fnInfo.color+'08':'rgba(0,0,0,.04)',borderRadius:6,border:'1px solid '+(fnInfo?fnInfo.color+'20':'#eee')}},
                r('span',{style:{fontSize:10,color:c.muted,fontWeight:600}},isProduction?'Production estimee':'Puissance totale'),
                r('span',{style:{fontSize:13,fontWeight:800,color:fnInfo?fnInfo.color:sky,fontFamily:c.mono}},(isProduction?'-':'')+fnPuissanceLive+'W')
              ),
              td.note&&r('div',{style:{marginTop:8,padding:'7px 10px',background:(td.color||fnInfo?.color||c.muted)+'06',border:'1px solid '+(td.color||fnInfo?.color||c.muted)+'20',borderRadius:6,fontSize:9,color:c.muted,lineHeight:1.6}},td.note)
            ),
            this._editFnCableBloc(r,c,{...form,cableSection:form.cableSection||td.section},fn,setForm),
            this._editFnDepartBloc(r,c,form,setForm)
          ),
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:8}},'Preconisations NF C 15-100'),
              r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:10}},
                r('div',{style:{padding:'7px 10px',background:c.surf,borderRadius:7,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,fontSize:8,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:2}},'Section preconisee'),r('div',{style:{fontWeight:800,color:c.text,fontFamily:c.mono,fontSize:13}},td.section+'mm2')),
                r('div',{style:{padding:'7px 10px',background:c.surf,borderRadius:7,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,fontSize:8,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:2}},'Calibre CB'),r('div',{style:{fontWeight:800,color:'#ef4444',fontFamily:c.mono,fontSize:13}},'C'+td.calibre+'A')),
                r('div',{style:{padding:'7px 10px',background:c.surf,borderRadius:7,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,fontSize:8,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:2}},'Protection diff.'),r('div',{style:{fontWeight:800,color:'#0284C7',fontFamily:c.mono,fontSize:13}},'30mA')),
                r('div',{style:{padding:'7px 10px',background:c.surf,borderRadius:7,border:'1px solid '+c.bdr}},r('div',{style:{color:c.muted,fontSize:8,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:2}},'Categorie'),r('div',{style:{fontWeight:700,color:td.color||fnInfo?.color||c.muted,fontSize:11}},td.tag))
              )
            ),
            this._editFnCBBloc(r,c,fn,form,fnPuissanceLive,fnPuissanceSaved)
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','ok')]
    );
  }

  renderEditFonctionForm(){
    const{editFonctionForm:form,editFonctionPieceId,editFonctionId,interrupteurs,zonesCommande}=this.state;
    const c=this.C;const r=this.r;const sky='#0277BD';
    const piece=this.state.pieces.find(p=>p.id===editFonctionPieceId);
    const fn=piece&&(piece.fonctions||[]).find(f=>f.id===editFonctionId);
    if(!piece||!fn)return null;
    const fnInfo=this.FNS[fn.type];
    const setForm=upd=>this.setState(s=>({editFonctionForm:{...s.editFonctionForm,...upd}}));
    const close=()=>this.setState({showModal:false,editFonctionId:null,editFonctionPieceId:null});
    const isEcl=fn.type==='eclairage';
    const isPrise=['prises','prises_sdb'].includes(fn.type);
    const cmdsLinked=interrupteurs.filter(i=>i.circuitRef===fn.ref);

    // Generate command code - checks for duplicates
    const genCmdCode=(refStr,cmdType,allInters)=>{
      const num=refStr.replace(/[^0-9]/g,'').slice(-3)||'001';
      const appNum=refStr.match(/^(\d+)/)?.[1]||'1';
      const prefixMap={simple:appNum+'SA',va_vient:appNum+'VV',poussoir:appNum+'PO',double:appNum+'DA',variateur:appNum+'VA',detecteur:appNum+'DT',domotique:appNum+'DM'};
      const prefix=prefixMap[cmdType]||appNum+'SA';
      const isMulti=['va_vient','poussoir'].includes(cmdType);
      if(isMulti){
        const base1=prefix+num+'.1';const base2=prefix+num+'.2';
        // Check if .1 already exists, if so increment
        let n=1;
        while(allInters.some(i=>(i.code||i.nom)===prefix+num+'.'+n)){n++;}
        const code1=prefix+num+'.'+n;
        const code2=prefix+num+'.'+(n+1);
        return [code1,code2];
      }
      // For single: check duplicate, add suffix if needed
      let base=prefix+num;
      if(allInters.some(i=>(i.code||i.nom)===base)){
        let n=2;
        while(allInters.some(i=>(i.code||i.nom)===base+'.'+n)){n++;}
        return [base+'.'+n];
      }
      return [base];
    };

    const isMultiPoint=['va_vient','poussoir'].includes(form.cmdType||'simple');
    const addCmd=()=>{
      const cmdType=form.cmdType||'simple';
      const allInters=this.state.interrupteurs;
      const zone1Id=form.cmdZoneId?+form.cmdZoneId:null;
      const zone2Id=form.cmdZone2Id?+form.cmdZone2Id:zone1Id;

      // BLOC 1: zone obligatoire
      if(!zone1Id){
        this.showToast('Zone de commande obligatoire pour ajouter une commande');
        return;
      }
      if(isMultiPoint&&!zone2Id){
        this.showToast('Zone du Point 2 obligatoire pour ce type de commande');
        return;
      }

      const codes=genCmdCode(fn.ref,cmdType,allInters);

      // BLOC 2: doublon de code
      const dupCode=codes.filter(code=>allInters.some(i=>(i.code||i.nom)===code));
      if(dupCode.length>0){
        this.showToast('Code deja utilise: '+dupCode.join(', ')+' — verifier les commandes existantes');
        return;
      }

      // BLOC 3: meme circuit + meme zone = avertissement
      const sameZoneSameCircuit=allInters.filter(i=>i.circuitRef===fn.ref&&i.zoneId===zone1Id);
      if(sameZoneSameCircuit.length>0){
        const existing=sameZoneSameCircuit.map(i=>i.code||i.nom).join(', ');
        if(!window.confirm('Attention : une commande pour ce meme luminaire ('+fn.ref+') existe deja dans cette zone ('+existing+'). Cela peut etre une erreur.\n\nAjouter quand meme ?')){return;}
      }

      const newCmds=codes.map((code,idx)=>({
        id:this.state.nextElemId+idx,
        nom:code,code,
        pieceId:piece.id,
        type:cmdType,
        circuitRef:fn.ref,
        zoneId:idx===0?zone1Id:zone2Id,
        point:isMultiPoint?(idx===0?'Point 1':'Point 2'):null
      }));
      this.setState(s=>({interrupteurs:[...s.interrupteurs,...newCmds],nextElemId:s.nextElemId+codes.length}));
      this.showToast('Commande ajoutee: '+codes.join(' · '));
    };

    const save=()=>{
      const updated={...fn,quantite:+form.quantite,departType:form.departType||'tableau',departId:form.departId?+form.departId:null,departDist:+form.departDist||0,cableLongueur:+form.cableLongueur||0,cableSection:form.cableSection||'1.5',cableType:form.cableType||'H07VU',cableRepere:form.cableRepere||'',nbConducteursConn:+form.nbConducteursConn||0,repBagues:!!form.repBagues};
      if(isEcl){updated.typeLampe=form.typeLampe;updated.puissance=+form.puissance;updated.distance=+form.distance||0;}
      (()=>{
      if(fn.type!==updated.type||fn.departType!==updated.departType||String(fn.departId)!==String(updated.departId)){
        // Type change: purge cable overrides for this fn
        const oldWCode2=this.genCEBATCode(fn,this.state);
        this.purgeNomOverridesForCode(oldWCode2);
      }
      this.setState(s=>({pieces:s.pieces.map(p=>p.id===piece.id?{...p,fonctions:(p.fonctions||[]).map(f=>f.id===fn.id?updated:f)}:p),showModal:false,editFonctionId:null,editFonctionPieceId:null}));
    })();
      this.showToast('Fonction mise a jour ok');
    };

    const cmdTypeOpts=[['simple','Interrupteur Simple (SA)'],['va_vient','Va-et-vient (VV) — 2 points'],['poussoir','Poussoir (PO) — 2 points'],['double','Double allumage (DA)'],['variateur','Variateur (VA)'],['detecteur','Detecteur mvt (DT)'],['domotique','Platine domotique (DM)']];
    const previewCodes=genCmdCode(fn.ref,form.cmdType||'simple',interrupteurs);

    return this.ModalShell('Modifier '+(fnInfo?fnInfo.label:fn.type)+' ('+fn.ref+')',close,
      r('div',null,
        // Header badge
        r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:16,padding:'10px 14px',background:fnInfo?fnInfo.color+'12':'#f0f0f0',borderRadius:8,border:'1px solid '+(fnInfo?fnInfo.color+'30':'#ddd')}},
          r('div',{style:{width:36,height:36,borderRadius:8,background:fnInfo?fnInfo.color+'20':'#eee',display:'flex',alignItems:'center',justifyContent:'center',color:fnInfo?fnInfo.color:'#666',flexShrink:0}},this.ico(fnInfo?fnInfo.ico:'default',18)),
          r('div',{style:{flex:1,minWidth:0}},
            r('div',{style:{fontSize:13,fontWeight:700,color:c.text}},fnInfo?fnInfo.label:fn.type),
            r('div',{style:{fontSize:12,fontFamily:c.mono,fontWeight:700,color:fnInfo?fnInfo.color:sky}},fn.ref),
            r('div',{style:{fontSize:10,color:c.muted}},piece.nom+' · '+(piece.pieceCode||''))
          ),
          (form.quantite||1)>1&&r('div',{style:{textAlign:'right',flexShrink:0}},
            r('div',{style:{fontSize:8,color:c.muted,fontWeight:600,textTransform:'uppercase',marginBottom:3}},'Refs'),
            r('div',{style:{fontFamily:c.mono,fontSize:9,color:fnInfo?fnInfo.color:sky,lineHeight:1.6}},
              Array.from({length:Math.min(form.quantite,5)},(_,i)=>fn.ref+'.'+(i+1)).join(' · ')+(form.quantite>5?' …':'')
            )
          )
        ),

        // 2-COLUMN LAYOUT (eclairage) / single-col (autres)
        isEcl?r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}},

          // === COLONNE GAUCHE: Quantite/Puissance | Cable | Depart ===
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},

            // Bloc A: Quantite + Puissance
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:10}},'Quantite & Puissance'),
              r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:8}},
                r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Luminaires'),
                r('button',{onClick:()=>setForm({quantite:Math.max(1,(form.quantite||1)-1)}),style:{width:26,height:26,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'-'),
                r('span',{style:{fontSize:18,fontWeight:800,color:c.text,fontFamily:c.mono,minWidth:28,textAlign:'center'}},form.quantite||1),
                r('button',{onClick:()=>setForm({quantite:(form.quantite||1)+1}),style:{width:26,height:26,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'+'),
                (form.quantite||1)>1&&r('span',{style:{fontSize:8,color:c.muted,fontFamily:c.mono}},
                  Array.from({length:Math.min(form.quantite,3)},(_,i)=>fn.ref+'.'+(i+1)).join(' ')+(form.quantite>3?' …':'')
                )
              ),
              r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:6}},
                r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'W/unite'),
                r('input',{type:'number',value:form.puissance||12,min:1,max:2000,onChange:e=>setForm({puissance:+e.target.value}),style:{flex:1,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:6,padding:'5px 8px',color:c.text,fontSize:13,fontWeight:700,outline:'none',fontFamily:c.mono}})
              ),
              r('div',{style:{display:'flex',justifyContent:'space-between',padding:'5px 8px',background:'rgba(2,119,189,.06)',borderRadius:6,border:'1px solid rgba(2,119,189,.15)'}},
                r('span',{style:{fontSize:10,color:c.muted,fontWeight:600}},'Total'),
                r('span',{style:{fontSize:13,fontWeight:800,color:sky,fontFamily:c.mono}},((form.puissance||12)*(form.quantite||1))+'W')
              )
            ),

            // Bloc B: Longueur cable + Type & Section (fusionnes)
            (()=>{
              const djCurr=this.state.disjoncteurs.find(d=>(d.recepteurs||[]).includes(fn.ref));
              const djSection=djCurr?String(djCurr.section||'1.5'):null;
              const djCalibre=djCurr?djCurr.calibre||10:null;
              const sectionInsuf=djCalibre&&!this.sectionOkForCalibre(form.cableSection,djCalibre);
              const sectionMinNeeded=djCalibre?this.sectionMinForCalibre(djCalibre):null;
              const nfcSection=djCurr?String(djCurr.section||'1.5'):'1.5';
              // Cable types with sections as pill lists; added Mono conducteur (rigide nu)
              const cableTypes=[
                {v:'H07VU',l:'H07V-U — Rigide',sections:['1.5','2.5','4','6','10']},
                {v:'H07VR',l:'H07V-R — Souple',sections:['1.5','2.5','4','6','10']},
                {v:'H07VK',l:'H07V-K — Multibrin',sections:['1.5','2.5','4','6','10']},
                {v:'H05VV',l:'H05VV-F — Gaine',sections:['1.5','2.5','3x1.5','3x2.5']},
                {v:'XVB',l:'XVB-F2 — Blindé',sections:['1.5','2.5','4','6']},
                {v:'SYT',l:'SYT — Incendie',sections:['1.5','2.5']},
                {v:'MONO',l:'Mono conducteur nu',sections:['1.5','2.5','4','6','10','16']}
              ];
              const selType=cableTypes.find(t=>t.v===(form.cableType||'H07VU'))||cableTypes[0];
              const hasMismatch=(djSection&&form.cableSection!==djSection)||sectionInsuf;
              return r('div',{style:{background:hasMismatch?'rgba(220,38,38,.04)':c.surf3,borderRadius:9,border:'1px solid '+(hasMismatch?c.danger:c.bdr),padding:'12px 14px'}},
                r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:10}},'Cable'),
                // Longueur
                r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:10}},
                  r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Longueur'),
                  r('input',{type:'number',value:form.cableLongueur||0,min:0,max:500,step:0.5,onChange:e=>setForm({cableLongueur:+e.target.value}),style:{width:70,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:6,padding:'5px 8px',color:c.text,fontSize:13,fontWeight:700,outline:'none',fontFamily:c.mono}}),
                  r('span',{style:{fontSize:10,color:c.muted}},'m'),
                  form.cableLongueur>0&&r('span',{style:{fontSize:9,color:c.muted,marginLeft:4}},'~'+Math.round((form.cableLongueur||0)*1.15)+' m posé')
                ),
                // Section: select deroulant apres longueur
                r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:10}},
                  r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Section'),
                  r('select',{
                    value:form.cableSection||'1.5',
                    onChange:e=>setForm({cableSection:e.target.value}),
                    style:{
                      flex:1,background:c.surf,
                      border:'2px solid '+(sectionInsuf?c.danger:(djSection&&form.cableSection!==djSection)?c.danger:(djCalibre&&this.sectionOkForCalibre(form.cableSection,djCalibre)&&(!djSection||form.cableSection===djSection))?'#22c55e':c.bdr2),
                      borderRadius:6,padding:'5px 8px',color:c.text,fontSize:12,fontWeight:600,outline:'none',fontFamily:c.mono
                    }
                  },
                    ...selType.sections.map(s=>{
                      const tooSmall=djCalibre&&!this.sectionOkForCalibre(s,djCalibre);
                      const isGood=djCalibre&&this.sectionOkForCalibre(s,djCalibre)&&(!djSection||s===djSection);
                      return r('option',{key:s,value:s},s+'mm²'+(tooSmall?' ⚠ trop petit':'')+(isGood?' ✓':''));
                    })
                  )
                ),
                // Type de cable (select compact) - apres section
                r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:8}},
                  r('label',{style:{fontSize:10,color:c.text2,fontWeight:600,minWidth:70}},'Type'),
                  r('select',{value:form.cableType||'H07VU',onChange:e=>{const t=cableTypes.find(x=>x.v===e.target.value);setForm({cableType:e.target.value,cableSection:t&&t.sections.includes(form.cableSection)?form.cableSection:t?t.sections[0]:'1.5'});},style:{flex:1,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 7px',color:c.text,fontSize:11,outline:'none',appearance:'auto'}},
                    ...cableTypes.map(t=>r('option',{key:t.v,value:t.v},t.l))
                  )
                ),
                sectionInsuf&&r('div',{style:{marginTop:6,padding:'5px 8px',background:'rgba(220,38,38,.08)',border:'1px solid rgba(220,38,38,.2)',borderRadius:5,fontSize:9,color:c.danger,fontWeight:700}},
                  '⚠ '+form.cableSection+'mm² insuffisant pour CB '+djCalibre+'A — min '+sectionMinNeeded+'mm²'
                ),
                !sectionInsuf&&djSection&&form.cableSection!==djSection&&r('div',{style:{marginTop:6,fontSize:9,color:c.danger}},'Cable '+form.cableSection+'mm² ≠ section CB '+nfcSection+'mm²')
              );
            })(),

            // Bloc C: Depart cable
            (()=>{
              const allTabx=this.state.tableauxElec;
              const allBoites=this.state.boitesDeriv;
              const allZones=this.state.zonesCommande;
              const dType=form.departType||'tableau';
              const dDist=form.departDist||0;
              const lenEst=dDist>0?Math.round(dDist*1.15+1)+' m (x1.15)':'—';
              return r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
                r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:8}},
                  this.ico('boite_deriv',12),
                  r('span',{style:{fontSize:11,fontWeight:700,color:c.text,flex:1}},'Depart cable'),
                  dDist>0&&r('span',{style:{fontSize:9,fontFamily:c.mono,color:sky,fontWeight:700}},lenEst)
                ),
                r('div',{style:{marginBottom:7}},
                  r('label',{style:{display:'block',fontSize:9,color:c.text2,marginBottom:3,fontWeight:600}},'Type'),
                  r('select',{value:dType,onChange:e=>setForm({departType:e.target.value,departId:'',departDist:0}),style:{width:'100%',background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 8px',color:c.text,fontSize:11,outline:'none',appearance:'auto'}},
                    r('option',{value:'tableau'},'Tableau electrique'),
                    r('option',{value:'boite'},'Boite de derivation'),
                    r('option',{value:'zone'},'Zone de commande')
                  )
                ),
                r('div',{style:{marginBottom:7}},
                  dType==='boite'&&allBoites.length===0?
                    r('div',{style:{padding:'8px 10px',background:'rgba(0,0,0,.03)',border:'1px dashed '+c.bdr2,borderRadius:6,textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucune boite — utilisez le bouton + Boite ci-dessous'):
                    r('div',{style:{display:'flex',gap:5,alignItems:'center'}},
                      r('select',{value:form.departId||'',onChange:e=>setForm({departId:e.target.value}),style:{flex:1,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 8px',color:c.text,fontSize:11,outline:'none'}},
                        r('option',{value:''},'-- Choisir --'),
                        ...(dType==='tableau'?allTabx:dType==='boite'?allBoites:allZones).map(x=>r('option',{key:x.id,value:String(x.id)},dType==='zone'?((x.zoneCode||'')+(x.zoneCode?' — ':'')+x.nom):(x.nom||(x.id+''))))
                      ),
                    )
                ),
                r('div',{style:{display:'flex',alignItems:'center',gap:6}},
                  r('label',{style:{fontSize:9,color:c.text2,fontWeight:600,flexShrink:0}},'Distance (m)'),
                  r('input',{type:'number',min:0,max:300,step:0.5,value:dDist,onChange:e=>setForm({departDist:+e.target.value}),style:{width:60,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 7px',color:c.text,fontSize:12,fontWeight:700,outline:'none',fontFamily:c.mono}})
                )
              );
            })()
          ),

          // === COLONNE DROITE: Type luminaire | CB | Commandes/Interrupteur ===
          r('div',{style:{display:'flex',flexDirection:'column',gap:12}},

            // Bloc D: Type de luminaire
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:8}},'Type de luminaire'),
              r('select',{value:form.typeLampe||'led_plafond',onChange:e=>{const lt=this.LAMP_TYPES[e.target.value];setForm({typeLampe:e.target.value,puissance:lt?lt.puissance:form.puissance});},style:{width:'100%',background:c.surf,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 10px',color:c.text,fontSize:12,outline:'none',fontFamily:c.font,appearance:'auto'}},
                ...Object.entries(this.LAMP_TYPES).map(([k,lt])=>r('option',{key:k,value:k},lt.label+' — '+lt.puissance+'W'))
              )
            ),

            // Bloc E: Disjoncteur CB — compact + bouton modal
            (()=>{
              const allDj=this.state.disjoncteurs;
              const allPieces=this.state.pieces;
              const djCurrent=allDj.find(d=>(d.recepteurs||[]).includes(fn.ref))||null;
              const fnPuissanceLive=(+form.puissance||10)*(+form.quantite||1);
              const fnPuissanceSaved=(fn.puissance||10)*(fn.quantite||1);
              const openCBModal=()=>this.setState({showModal:true,modalType:'selectCB'});

              if(!djCurrent){
                return r('div',{style:{background:c.surf3,borderRadius:9,border:'1px dashed '+c.bdr2,padding:'12px 14px',display:'flex',alignItems:'center',gap:10}},
                  r('div',{style:{width:32,height:32,borderRadius:7,background:'rgba(239,68,68,.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'#ef4444',flexShrink:0}},this.ico('tableau_elec',15)),
                  r('div',{style:{flex:1}},
                    r('div',{style:{fontSize:11,fontWeight:700,color:c.text}},'Disjoncteur CB'),
                    r('div',{style:{fontSize:10,color:c.muted,fontStyle:'italic'}},'Non assigne')
                  ),
                  r('button',{onClick:openCBModal,style:{background:'#ef4444',color:'#fff',border:'none',borderRadius:7,padding:'7px 13px',fontSize:11,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:5,flexShrink:0}},this.ico('tableau_elec',12),' Assigner CB')
                );
              }

              // CB assigne: carte compacte avec barre de charge
              const tab=this.state.tableauxElec.find(t=>t.id===djCurrent.tableauId);
              const totW=this.calcDjPower(djCurrent,allPieces)-fnPuissanceSaved+fnPuissanceLive;
              const lim=this.djNFCLimit(djCurrent);
              const pct=Math.min(Math.round(totW/lim.maxW*100),100);
              const nPct=Math.min(Math.round((djCurrent.recepteurs||[]).length/lim.maxR*100),100);
              const mPct=Math.max(pct,nPct);
              const over=totW>lim.maxW||(djCurrent.recepteurs||[]).length>lim.maxR;
              const warn=!over&&mPct>80;
              return r('div',{style:{background:c.surf3,borderRadius:9,border:'2px solid '+(over?c.danger:warn?c.warn:'#ef4444'),padding:'12px 14px',cursor:'pointer'},onClick:openCBModal},
                r('div',{style:{display:'flex',alignItems:'center',gap:7,marginBottom:6}},
                  r('div',{style:{fontFamily:c.mono,fontSize:13,fontWeight:900,color:'#ef4444',flex:1}},djCurrent.code),
                  this.Bdg(djCurrent.courbe+djCurrent.calibre+'A','#ef4444'),
                  this.Bdg((djCurrent.section||'?')+'mm',c.muted),
                  djCurrent.ddr>0&&this.Bdg(djCurrent.ddr+'mA','#0284C7'),
                  r('span',{style:{fontSize:9,color:c.muted,fontFamily:c.mono}},this.ico('pencil',9),' Modifier')
                ),
                tab&&r('div',{style:{fontSize:9,color:'#0277BD',marginBottom:5}},'Tableau: '+tab.nom),
                r('div',null,
                  r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:9,marginBottom:2}},
                    r('span',{style:{color:over?c.danger:c.muted}},totW+'W / '+lim.maxW+'W · '+(djCurrent.recepteurs||[]).length+' rec.'),
                    r('span',{style:{fontWeight:800,color:over?c.danger:warn?c.warn:'#22c55e',fontFamily:c.mono}},mPct+'%')
                  ),
                  r('div',{style:{height:5,background:c.bdr2,borderRadius:3,overflow:'hidden'}},
                    r('div',{style:{height:'100%',width:mPct+'%',background:over?c.danger:warn?c.warn:'#22c55e',borderRadius:3}})
                  )
                ),
                over&&r('div',{style:{marginTop:4,fontSize:9,color:c.danger,fontWeight:700}},'⚠ DEPASSE NFC: '+lim.label),
                warn&&!over&&r('div',{style:{marginTop:4,fontSize:9,color:c.warn,fontWeight:600}},'Proche limite ('+mPct+'%)')
              );
            })(),

            // Bloc F: Commandes existantes + bouton Ajouter interrupteur
            // Bloc F1: Commandes / Interrupteurs
            r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
              r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:8}},
                r('span',{style:{fontSize:11,fontWeight:700,color:c.text,flex:1,display:'flex',alignItems:'center',gap:5}},this.ico('interrupteur',12),' Commandes',cmdsLinked.length>0&&r('span',{style:{fontSize:9,color:c.muted,fontWeight:400}},'('+cmdsLinked.length+')')),
                r('button',{
                  onClick:()=>this.setState({showModal:true,modalType:'addInter',editId:null,interForm:{nom:'',pieceId:String(piece.id),type:form.cmdType||'simple',circuitRef:fn.ref,zoneId:form.cmdZoneId?+form.cmdZoneId:'',retourEditFonction:true}}),
                  style:{background:sky,color:'#fff',border:'none',borderRadius:6,padding:'5px 10px',fontSize:10,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:4}
                },this.ico('interrupteur',11),' + Interrupteur')
              ),
              cmdsLinked.length===0?
                r('div',{style:{fontSize:10,color:c.muted,fontStyle:'italic',textAlign:'center',padding:'6px'}},'Aucune commande'):
                r('div',null,
                  ...cmdsLinked.map(i=>{
                    const zone=zonesCommande.find(z=>z.id===i.zoneId);
                    return r('div',{key:i.id,style:{display:'flex',alignItems:'center',gap:6,padding:'5px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr,marginBottom:4}},
                      r('div',{style:{flex:1}},
                        r('div',{style:{fontFamily:c.mono,fontSize:10,fontWeight:700,color:sky}},this.genInterCode(i,this.state)),
                        r('div',{style:{fontSize:8,color:c.muted}},i.type+(zone?' · '+(zone.zoneCode||'')+' '+zone.nom:''))
                      ),
                      r('button',{
                        onClick:()=>this.openEdit('addInter',i,'interForm',{nom:i.nom||'',pieceId:i.pieceId?String(i.pieceId):'',type:i.type||'simple',circuitRef:i.circuitRef||'',zoneId:i.zoneId?String(i.zoneId):''}),
                        style:{background:'transparent',border:'1px solid '+c.bdr2,borderRadius:4,color:c.muted,cursor:'pointer',padding:'2px 5px',fontSize:10,display:'flex',alignItems:'center'}
                      },this.ico('pencil',9)),
                      r('button',{onClick:()=>this.setState(s=>({interrupteurs:s.interrupteurs.filter(x=>x.id!==i.id)})),style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:12,padding:0}},'x')
                    );
                  })
                )
            ),

            // Bloc F2: Boites de derivation
            (()=>{
              const allBoitesFn=this.state.boitesDeriv;
              // BD liees = toutes les BD de la meme piece
              const bdLinked=allBoitesFn.filter(b=>b.pieceId===piece.id);
              return r('div',{style:{background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr,padding:'12px 14px'}},
                r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:bdLinked.length>0?8:0}},
                  r('span',{style:{fontSize:11,fontWeight:700,color:c.text,flex:1,display:'flex',alignItems:'center',gap:5}},
                    this.ico('boite_deriv',12),' Boites de derivation',
                    bdLinked.length>0&&r('span',{style:{fontSize:9,color:c.muted,fontWeight:400}},'('+bdLinked.length+')')
                  ),
                  r('button',{
                    onClick:()=>this.setState({showModal:true,modalType:'addBoite',editId:null,boiteForm:{nom:'',label:'',pieceId:String(piece.id),type:'encastre',tableauId:'',position:'',hauteurPlafond:30,cote:'plafond',description:'',retourDepart:false,retourEditFonction:true}}),
                    style:{background:'#94a3b8',color:'#fff',border:'none',borderRadius:6,padding:'5px 10px',fontSize:10,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:4}
                  },this.ico('boite_deriv',11),' + Boite')
                ),
                bdLinked.length===0?
                  r('div',{style:{fontSize:10,color:c.muted,fontStyle:'italic',textAlign:'center',padding:'6px'}},'Aucune BD — definir dans Depart cable'):
                  r('div',null,
                    ...bdLinked.map(b=>{
                      const bPiece=this.state.pieces.find(p=>p.id===b.pieceId);
                      const typeLabel={encastre:'Encastree',saillie:'En saillie',etanche:'Etanche IP55',plafond:'Plafond DCL'}[b.type]||b.type;
                      return r('div',{key:b.id,style:{display:'flex',alignItems:'center',gap:6,padding:'5px 8px',background:c.surf,borderRadius:6,border:'1px solid '+c.bdr,marginBottom:4}},
                        r('div',{style:{flex:1}},
                          r('div',{style:{fontFamily:c.mono,fontSize:10,fontWeight:700,color:'#94a3b8'}},b.nom||(b.id+'')),
                          r('div',{style:{fontSize:8,color:c.muted}},typeLabel+(bPiece?' · '+bPiece.nom:'')+(b.hauteurPlafond!=null?' · '+b.hauteurPlafond+'cm plafond':''))
                        )
                      );
                    })
                  )
              );
            })()
          )
        ):
        // === LAYOUT SIMPLE (non eclairage) ===
        r('div',null,
          r('div',{style:{display:'grid',gridTemplateColumns:'1fr',gap:12,marginBottom:14}},
            r('div',null,
              r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:6,fontWeight:600}},isPrise?'Prises':'Quantite'),
              r('div',{style:{display:'flex',alignItems:'center',gap:6}},
                r('button',{onClick:()=>setForm({quantite:Math.max(1,(form.quantite||1)-1)}),style:{width:28,height:28,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf3,cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'-'),
                r('span',{style:{fontSize:20,fontWeight:800,color:c.text,fontFamily:c.mono,minWidth:32,textAlign:'center'}},form.quantite||1),
                r('button',{onClick:()=>setForm({quantite:(form.quantite||1)+1}),style:{width:28,height:28,borderRadius:5,border:'1px solid '+c.bdr2,background:c.surf3,cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',color:c.text}},'+')
              )
            )
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','ok')]
    );
  }

  renderSelectCBForm(){
    const c=this.C;const r=this.r;const sky='#0277BD';
    const{editFonctionId,editFonctionPieceId}=this.state;
    const piece=this.state.pieces.find(p=>p.id===editFonctionPieceId);
    const fn=piece&&(piece.fonctions||[]).find(f=>f.id===editFonctionId);
    if(!piece||!fn)return null;
    const allDj=this.state.disjoncteurs;
    const allPieces=this.state.pieces;
    const djCurrent=allDj.find(d=>(d.recepteurs||[]).includes(fn.ref))||null;
    const fnPuissanceLive=(fn.puissance||10)*(fn.quantite||1);
    const calcLive=(dj)=>{const base=this.calcDjPower(dj,allPieces);return (dj.recepteurs||[]).includes(fn.ref)?base:base+fnPuissanceLive;};
    const close=()=>this.setState({showModal:true,modalType:'editFonction'});
    const unlinkCurrent=()=>{
      if(!djCurrent)return;
      this.setState(s=>({disjoncteurs:s.disjoncteurs.map(d=>d.id===djCurrent.id?{...d,recepteurs:(d.recepteurs||[]).filter(r=>r!==fn.ref)}:d).filter(d=>(d.recepteurs||[]).length>0)}));
      this.showToast(fn.ref+' retire de '+djCurrent.code);
    };
    const assignToDj=(djId)=>{
      if(djCurrent){this.showToast('Retirez de '+djCurrent.code+' dabord');return;}
      const dj=allDj.find(d=>d.id===djId);if(!dj)return;
      const lim=this.djNFCLimit(dj);
      const pw=calcLive(dj);const cnt=(dj.recepteurs||[]).length+1;
      if(cnt>lim.maxR||pw>lim.maxW){if(!window.confirm('NF C 15-100: '+lim.label+' — '+pw+'W/'+lim.maxW+'W. Ajouter quand meme ?')){return;}}
      this.setState(s=>({disjoncteurs:s.disjoncteurs.map(d=>d.id===djId?{...d,recepteurs:[...(d.recepteurs||[]),fn.ref]}:d)}));
      this.showToast(fn.ref+' assigne a '+dj.code);
    };
    const createAndAssign=()=>{
      if(djCurrent){this.showToast('Retirez de '+djCurrent.code+' dabord');return;}
      const code=this.genDjCode(allDj);
      const sf=this.state.editFonctionForm;
      const newDj={id:this.state.nextElemId,code,recepteurs:[fn.ref],pieceId:piece.id,calibre:+sf.djCalibre,courbe:sf.djCourbe,poles:sf.djPoles,ddr:sf.djDDR!=null?+sf.djDDR:30,section:+sf.djSection,tableauId:null};
      this.setState(s=>({disjoncteurs:[...s.disjoncteurs,newDj],nextElemId:s.nextElemId+1}));
      this.showToast('CB '+code+' cree et assigne');
    };
    const setForm=upd=>this.setState(s=>({editFonctionForm:{...s.editFonctionForm,...upd}}));
    const form=this.state.editFonctionForm;
    const availDj=allDj.filter(d=>!(d.recepteurs||[]).includes(fn.ref));
    const newDjCode=this.genDjCode(allDj);

    const djRow=(d,isCurrent)=>{
      const tab=this.state.tableauxElec.find(t=>t.id===d.tableauId);
      const totW=isCurrent?this.calcDjPower(d,allPieces):calcLive(d);
      const lim=this.djNFCLimit(d);
      const pct=Math.min(Math.round(totW/lim.maxW*100),100);
      const nPct=Math.min(Math.round((isCurrent?(d.recepteurs||[]).length:(d.recepteurs||[]).length+1)/lim.maxR*100),100);
      const mPct=Math.max(pct,nPct);
      const over=totW>lim.maxW||(isCurrent?(d.recepteurs||[]).length:(d.recepteurs||[]).length+1)>lim.maxR;
      const warn=!over&&mPct>80;
      return r('div',{key:d.id,style:{padding:'10px 12px',background:c.surf,borderRadius:8,border:'2px solid '+(isCurrent?'#ef4444':over?c.danger:warn?c.warn:c.bdr),marginBottom:8}},
        r('div',{style:{display:'flex',alignItems:'center',gap:7,marginBottom:6}},
          r('div',{style:{fontFamily:c.mono,fontSize:14,fontWeight:900,color:'#ef4444',flex:1}},d.code),
          isCurrent&&r('span',{style:{fontSize:8,fontWeight:700,color:'#fff',background:'#ef4444',borderRadius:3,padding:'1px 5px'}},'ASSIGNE'),
          this.Bdg(d.courbe+d.calibre+'A','#ef4444'),
          this.Bdg(d.section+'mm',c.muted),
          d.ddr>0&&this.Bdg(d.ddr+'mA','#0284C7'),
          tab&&r('span',{style:{fontSize:9,color:'#0277BD',fontFamily:c.mono}},tab.nom),
          isCurrent
            ?r('button',{onClick:unlinkCurrent,style:{marginLeft:'auto',background:'transparent',border:'1px solid '+c.danger,borderRadius:5,color:c.danger,cursor:'pointer',fontSize:10,padding:'2px 8px',flexShrink:0}},'Retirer')
            :r('button',{onClick:()=>assignToDj(d.id),style:{marginLeft:'auto',background:over?'rgba(220,38,38,.07)':'rgba(2,119,189,.08)',border:'1px solid '+(over?c.danger:'#0277BD'),borderRadius:5,color:over?c.danger:'#0277BD',cursor:'pointer',fontSize:10,padding:'2px 8px',flexShrink:0,fontWeight:700}},over?'Surcharge':'Assigner')
        ),
        tab&&r('div',{style:{fontSize:9,color:'#0277BD',marginBottom:5}},tab.nom),
        r('div',null,
          r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:9,marginBottom:2}},
            r('span',{style:{color:over?c.danger:c.muted}},totW+'W / '+lim.maxW+'W · '+(isCurrent?(d.recepteurs||[]).length:(d.recepteurs||[]).length+1)+' rec.'),
            r('span',{style:{fontWeight:800,color:over?c.danger:warn?c.warn:'#22c55e',fontFamily:c.mono}},mPct+'%')
          ),
          r('div',{style:{height:5,background:c.bdr2,borderRadius:3,overflow:'hidden'}},
            r('div',{style:{height:'100%',width:mPct+'%',background:over?c.danger:warn?c.warn:'#22c55e',borderRadius:3,transition:'width .3s'}})
          )
        ),
        over&&r('div',{style:{marginTop:4,fontSize:9,color:c.danger,fontWeight:700}},'DEPASSE NFC: '+lim.label),
        // Inline edit if current
        isCurrent&&r('div',{style:{marginTop:8,borderTop:'1px solid rgba(239,68,68,.15)',paddingTop:8,display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}},
          r('div',null,r('label',{style:{display:'block',fontSize:9,color:c.text2,marginBottom:2,fontWeight:600}},'Tableau'),r('select',{value:String(d.tableauId||''),onChange:e=>this.setState(s=>({disjoncteurs:s.disjoncteurs.map(x=>x.id===d.id?{...x,tableauId:e.target.value?+e.target.value:null}:x)})),style:{width:'100%',background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 6px',color:c.text,fontSize:10,outline:'none'}},r('option',{value:''},'-- Aucun --'),...this.state.tableauxElec.map(t=>r('option',{key:t.id,value:String(t.id)},(t.type==='secondaire'?'[D] ':'[T] ')+t.nom)))),
          r('div',null,r('label',{style:{display:'block',fontSize:9,color:c.text2,marginBottom:2,fontWeight:600}},'Section'),r('select',{value:String(d.section||'1.5'),onChange:e=>{this.setState(s=>({disjoncteurs:s.disjoncteurs.map(x=>x.id===d.id?{...x,section:+e.target.value}:x)}));setForm({cableSection:e.target.value});},style:{width:'100%',background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 6px',color:c.text,fontSize:10,outline:'none'}},r('option',{value:'1.5'},'1.5mm'),r('option',{value:'2.5'},'2.5mm'),r('option',{value:'4'},'4mm'),r('option',{value:'6'},'6mm'))),
          r('div',null,r('label',{style:{display:'block',fontSize:9,color:c.text2,marginBottom:2,fontWeight:600}},'Courbe+Cal.'),r('div',{style:{display:'flex',gap:2}},r('select',{value:d.courbe||'B',onChange:e=>this.setState(s=>({disjoncteurs:s.disjoncteurs.map(x=>x.id===d.id?{...x,courbe:e.target.value}:x)})),style:{width:34,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 3px',color:c.text,fontSize:10,outline:'none'}},r('option',{value:'B'},'B'),r('option',{value:'C'},'C'),r('option',{value:'D'},'D')),r('select',{value:d.calibre||10,onChange:e=>{const nc=+e.target.value;this.setState(s=>({disjoncteurs:s.disjoncteurs.map(x=>x.id===d.id?{...x,calibre:nc}:x)}));const ms=this.sectionMinForCalibre(nc);if(parseFloat(form.cableSection)<ms)setForm({cableSection:String(ms)});},style:{flex:1,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 3px',color:c.text,fontSize:10,outline:'none'}},...[6,10,16,20,25,32,40,63].map(v=>r('option',{key:v,value:v},v+'A'))))),
          r('div',null,r('label',{style:{display:'block',fontSize:9,color:c.text2,marginBottom:2,fontWeight:600}},'DDR'),r('select',{value:d.ddr!=null?d.ddr:30,onChange:e=>this.setState(s=>({disjoncteurs:s.disjoncteurs.map(x=>x.id===d.id?{...x,ddr:+e.target.value}:x)})),style:{width:'100%',background:c.surf,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 6px',color:c.text,fontSize:10,outline:'none'}},r('option',{value:0},'Sans'),r('option',{value:30},'30mA'),r('option',{value:100},'100mA'),r('option',{value:300},'300mA')))
        )
      );
    };

    return this.ModalShell('Disjoncteur — '+fn.ref,close,
      r('div',null,
        // CB assigne
        djCurrent&&r('div',{style:{marginBottom:14}},
          r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}},'CB assigne'),
          djRow(djCurrent,true)
        ),
        // Bloque reassignation
        djCurrent&&availDj.length>0&&r('div',{style:{padding:'7px 10px',background:'rgba(239,68,68,.05)',border:'1px solid rgba(239,68,68,.15)',borderRadius:6,fontSize:10,color:c.muted,marginBottom:14}},'Retirez ce recepteur de '+djCurrent.code+' pour changer de CB.'),
        // Liste CB disponibles
        !djCurrent&&r('div',{style:{marginBottom:14}},
          r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}},availDj.length>0?'CB disponibles — cliquer pour assigner':'Aucun CB existant'),
          availDj.length>0
            ?r('div',null,...availDj.map(d=>djRow(d,false)))
            :r('div',{style:{padding:'10px',background:'rgba(0,0,0,.03)',borderRadius:6,textAlign:'center',fontSize:11,color:c.muted,fontStyle:'italic'}},'Creer un nouveau CB ci-dessous')
        ),
        // Creer nouveau CB
        r('div',{style:{borderTop:'1px solid '+c.bdr,paddingTop:12}},
          r('div',{style:{fontSize:10,fontWeight:700,color:c.text,marginBottom:10}},'+ Creer un nouveau CB'),
          r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}},
            r('div',null,r('label',{style:{display:'block',fontSize:10,color:c.text2,marginBottom:4,fontWeight:600}},'Courbe + Calibre'),r('div',{style:{display:'flex',gap:4}},r('select',{value:form.djCourbe||'B',onChange:e=>setForm({djCourbe:e.target.value}),style:{width:44,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'6px 5px',color:c.text,fontSize:12,outline:'none'}},r('option',{value:'B'},'B'),r('option',{value:'C'},'C'),r('option',{value:'D'},'D')),r('select',{value:form.djCalibre||10,onChange:e=>setForm({djCalibre:+e.target.value}),style:{flex:1,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'6px 5px',color:c.text,fontSize:12,outline:'none'}},...[6,10,16,20,25,32,40,63].map(v=>r('option',{key:v,value:v},v+'A'))))),
            r('div',null,r('label',{style:{display:'block',fontSize:10,color:c.text2,marginBottom:4,fontWeight:600}},'Section'),r('select',{value:form.djSection||'1.5',onChange:e=>setForm({djSection:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 9px',color:c.text,fontSize:12,outline:'none'}},r('option',{value:'1.5'},'1.5mm'),r('option',{value:'2.5'},'2.5mm'),r('option',{value:'4'},'4mm'),r('option',{value:'6'},'6mm'))),
            r('div',null,r('label',{style:{display:'block',fontSize:10,color:c.text2,marginBottom:4,fontWeight:600}},'DDR'),r('select',{value:form.djDDR!=null?form.djDDR:30,onChange:e=>setForm({djDDR:+e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 9px',color:c.text,fontSize:12,outline:'none'}},r('option',{value:0},'Sans DDR'),r('option',{value:30},'30 mA'),r('option',{value:100},'100 mA'),r('option',{value:300},'300 mA'))),
            r('div',null,r('label',{style:{display:'block',fontSize:10,color:c.text2,marginBottom:4,fontWeight:600}},'Tableau (optionnel)'),r('select',{value:form.djTableauId||'',onChange:e=>setForm({djTableauId:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 9px',color:c.text,fontSize:12,outline:'none'}},r('option',{value:''},'-- Assigner plus tard --'),...this.state.tableauxElec.map(t=>r('option',{key:t.id,value:String(t.id)},(t.type==='secondaire'?'[D] ':'[T] ')+t.nom))))
          ),
          r('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 12px',background:'rgba(239,68,68,.05)',borderRadius:7,border:'1px solid rgba(239,68,68,.2)'}},
            r('div',null,
              r('div',{style:{fontSize:9,color:c.muted,fontWeight:600,textTransform:'uppercase'}},'Code'),
              r('div',{style:{fontFamily:c.mono,fontSize:16,fontWeight:900,color:'#ef4444'}},(djCurrent?'—':newDjCode)),
              r('div',{style:{fontSize:9,color:c.muted}},fnPuissanceLive+'W — '+fn.ref)
            ),
            r('button',{onClick:!djCurrent?createAndAssign:()=>this.showToast('Retirez '+djCurrent.code+' dabord'),style:{background:!djCurrent?'#ef4444':'#ccc',color:'#fff',border:'none',borderRadius:7,padding:'9px 18px',fontSize:12,fontWeight:700,cursor:!djCurrent?'pointer':'not-allowed',display:'flex',alignItems:'center',gap:6}},this.ico('tableau_elec',13),' Creer & Assigner')
          )
        )
      ),
      [this.Btn('Retour',close,'ghost','md')]
    );
  }

  renderEditDisjoncteurForm(){
    const c=this.C;const r=this.r;
    const{editId}=this.state;
    const dj=this.state.disjoncteurs.find(d=>d.id===editId);
    if(!dj)return null;
    const sf=upd=>this.setState(st=>({disjoncteurs:st.disjoncteurs.map(d=>d.id===editId?{...d,...upd}:d)}));
    const close=()=>this.setState({showModal:false,editId:null});
    const allPieces=this.state.pieces;
    const totW=this.calcDjPower(dj,allPieces);
    const lim=this.djNFCLimit(dj);
    const over=totW>lim.maxW||(dj.recepteurs||[]).length>lim.maxR;
    return this.ModalShell('Modifier '+dj.code,close,
      r('div',null,
        r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:14,padding:'9px 14px',background:'rgba(239,68,68,.07)',borderRadius:8,border:'1px solid rgba(239,68,68,.2)'}},
          r('div',{style:{fontFamily:c.mono,fontSize:18,fontWeight:900,color:'#ef4444',flex:1}},dj.code),
          r('div',{style:{fontSize:10,color:over?c.danger:c.muted,fontWeight:700}},(dj.recepteurs||[]).length+' rec — '+totW+'W/'+lim.maxW+'W')
        ),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}},
          r('div',null,
            r('label',{style:{display:'block',fontSize:10,color:c.text2,marginBottom:3,fontWeight:600}},'Tableau electrique'),
            r('select',{value:String(dj.tableauId||''),onChange:e=>sf({tableauId:e.target.value?+e.target.value:null}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 9px',color:c.text,fontSize:12,outline:'none'}},
              r('option',{value:''},'-- Aucun --'),
              ...this.state.tableauxElec.map(t=>r('option',{key:t.id,value:String(t.id)},(t.type==='secondaire'?'[DIV] ':'[TGBT] ')+t.nom))
            )
          ),
          r('div',null,
            r('label',{style:{display:'block',fontSize:10,color:c.text2,marginBottom:3,fontWeight:600}},'Section cable'),
            r('select',{value:String(dj.section||1.5),onChange:e=>sf({section:+e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 9px',color:c.text,fontSize:12,outline:'none'}},
              r('option',{value:'1.5'},'1.5mm — eclairage'),r('option',{value:'2.5'},'2.5mm — prises'),r('option',{value:'4'},'4mm'),r('option',{value:'6'},'6mm — four/VE')
            )
          ),
          r('div',null,
            r('label',{style:{display:'block',fontSize:10,color:c.text2,marginBottom:3,fontWeight:600}},'Courbe + Calibre'),
            r('div',{style:{display:'flex',gap:3}},
              r('select',{value:dj.courbe||'B',onChange:e=>sf({courbe:e.target.value}),style:{width:46,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'6px 5px',color:c.text,fontSize:12,outline:'none'}},r('option',{value:'B'},'B'),r('option',{value:'C'},'C'),r('option',{value:'D'},'D')),
              r('select',{value:dj.calibre||10,onChange:e=>sf({calibre:+e.target.value}),style:{flex:1,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'6px 5px',color:c.text,fontSize:12,outline:'none'}},...[6,10,16,20,25,32,40,63].map(v=>r('option',{key:v,value:v},v+'A')))
            )
          ),
          r('div',null,
            r('label',{style:{display:'block',fontSize:10,color:c.text2,marginBottom:3,fontWeight:600}},'DDR + Poles'),
            r('div',{style:{display:'flex',gap:3}},
              r('select',{value:dj.ddr!=null?dj.ddr:30,onChange:e=>sf({ddr:+e.target.value}),style:{width:64,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'6px 5px',color:c.text,fontSize:12,outline:'none'}},r('option',{value:0},'Sans'),r('option',{value:30},'30mA'),r('option',{value:100},'100mA'),r('option',{value:300},'300mA')),
              r('select',{value:dj.poles||'1',onChange:e=>sf({poles:e.target.value}),style:{flex:1,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'6px 5px',color:c.text,fontSize:12,outline:'none'}},r('option',{value:'1'},'1P'),r('option',{value:'1+N'},'1P+N'),r('option',{value:'2'},'2P'),r('option',{value:'3+N'},'3P+N'))
            )
          )
        ),
        over&&r('div',{style:{padding:'8px 12px',background:'rgba(220,38,38,.07)',border:'1px solid rgba(220,38,38,.2)',borderRadius:7,fontSize:11,color:c.danger,fontWeight:600}},'Depassement NF C 15-100: '+lim.label),
        (dj.recepteurs||[]).length>0&&r('div',{style:{marginTop:12}},
          r('div',{style:{fontSize:9,color:c.muted,fontWeight:700,textTransform:'uppercase',marginBottom:5}},'Recepteurs ('+( dj.recepteurs||[]).length+')'),
          r('div',{style:{display:'flex',flexWrap:'wrap',gap:4}},
            ...(dj.recepteurs||[]).map(ref=>{
              let fnNom='';
              for(const p of allPieces){for(const fn of(p.fonctions||[])){if(fn.ref===ref){fnNom=p.nom;}}}
              return r('div',{key:ref,style:{display:'flex',alignItems:'center',gap:4,padding:'3px 8px',background:'rgba(239,68,68,.07)',border:'1px solid rgba(239,68,68,.15)',borderRadius:5}},
                r('span',{style:{fontFamily:c.mono,fontSize:9,fontWeight:700,color:'#ef4444'}},ref),
                fnNom&&r('span',{style:{fontSize:9,color:c.muted}},fnNom),
                r('button',{onClick:()=>sf({recepteurs:(dj.recepteurs||[]).filter(x=>x!==ref)}),style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:10,padding:0}},'x')
              );
            })
          )
        )
      ),
      [this.Btn('Fermer',close,'primary','md','ok')]
    );
  }

  renderDepartForm(){
    const c=this.C;const r=this.r;const sky='#16a34a';
    const{editDepartId}=this.state;
    const sf=upd=>this.setState(st=>({departForm:{...st.departForm,...upd}}));
    const form=this.state.departForm;
    const allPieces=this.state.pieces;
    const allApps=this.state.appartements;
    const close=()=>this.setState({showModal:false,editDepartId:null});
    const tConf={
      comptage:{label:'Arrivee reseau (Comptage)',col:'#16a34a',icon:'⚡',puissMax:function(cal){return cal*230;}},
      electrogene:{label:'Groupe electrogene',col:'#ef4444',icon:'🔧',puissMax:function(cal){return cal*400*1.73;}},
      solaire:{label:'Centrale solaire / Onduleur',col:'#f59e0b',icon:'☀',puissMax:function(cal){return cal*230;}}
    };
    const cf=tConf[form.type||'comptage'];
    const depPreview={id:-1,type:form.type||'comptage'};const depStatePreview={...this.state,departs:[...this.state.departs,depPreview]};const code=editDepartId?this.genSourceCode(this.state.departs.find(d=>d.id===editDepartId)||depPreview,this.state):this.genSourceCode(depPreview,depStatePreview);
    // Puissance cumulee: somme des fonctions de toutes les pieces
    const allFns=allPieces.flatMap(p=>p.fonctions||[]);
    const puissanceCumulee=allFns.reduce((s,fn)=>{
      const p=this._fnPowerW(fn);
      return s+p;
    },0);
    const puissMax=(()=>{const cal=+form.calibre||60;const t=form.tension||'mono';if(t==='tri'||t==='tri_it')return cal*(t==='tri'?400:220)*1.73;return cal*230;})();
    const pct=puissMax>0?Math.min(Math.round(puissanceCumulee/puissMax*100),999):0;
    const save=()=>{
      if(!form.type){alert('Le type est obligatoire.');return;}
      const obj={code:code||'?',nom:form.nom,type:form.type,calibre:+form.calibre||60,poles:+form.poles||4,courbe:form.courbe||'S',tableauElecId:form.tableauElecId?+form.tableauElecId:null,pieceId:form.pieceId?+form.pieceId:null,description:form.description||'',emplacement:form.emplacement||'',tension:form.tension||'mono',ddr:form.ddr!=null?+form.ddr:300};
      if(editDepartId){
        const newDeps=this.state.departs.map(d=>d.id===editDepartId?{...d,...obj}:d);
        const updatedDep={...this.state.departs.find(d=>d.id===editDepartId),...obj};
        // Regenerer les cables source dans nomenclatureOverrides
        const newNomOvr2={...this.state.nomenclatureOverrides};
        // Supprimer les anciens fils de ce depart
        const oldSrcCode=this.genSourceCode(this.state.departs.find(d=>d.id===editDepartId)||updatedDep,this.state);
        const newSrcCode=code;
        // Supprimer toutes les cles de l'ancienne source vers tous les TE
        Object.keys(newNomOvr2).forEach(k=>{if(k.startsWith(oldSrcCode+'to')||k.startsWith(newSrcCode+'to'))delete newNomOvr2[k];});
        // Recreer les fils selon nouveau type de tension
        const isTri2=obj.tension==='tri'||obj.tension==='tri_it';
        const poles2=+obj.poles||4;
        const srcFils2=isTri2?
          (poles2>=4?[{k:'L1',l:'L1'},{k:'L2',l:'L2'},{k:'L3',l:'L3'},{k:'N',l:'N'},{k:'PE',l:'PE'}]:[{k:'L1',l:'L1'},{k:'L2',l:'L2'},{k:'L3',l:'L3'},{k:'PE',l:'PE'}]):
          [{k:'L',l:'L'},{k:'N',l:'N'},{k:'PE',l:'PE'}];
        this.state.tableauxElec.forEach(te=>{
          if(te.departId===editDepartId){
            const teCode=this.genTECode(te,this.state);
            const ck=newSrcCode+'to'+teCode;
            const depObj2=this.state.departs.find(d=>d.id===editDepartId)||{};
            const dbCodeE=depObj2.dbCode||('DB'+(this.state.departs.findIndex(d=>d.id===editDepartId)+1));
            const cb0CodeE=te.cb0Code||(this.state.tableauxElec.findIndex(t=>t.id===te.id)+1+'CB0');
            srcFils2.forEach((f,i)=>{newNomOvr2[ck+'_fil'+(i+1)]={tenant:newSrcCode+' — '+dbCodeE,bt:f.k,aboutissant:teCode+' — '+cb0CodeE,ba:f.k,rep:'',racc:'',test:'',statut:''};});
          }
        });
        this.setState({departs:newDeps,nomenclatureOverrides:newNomOvr2,showModal:false,editDepartId:null});
        this.showToast('Source modifiee: '+code);
      } else {
        const newDepId=this.state.nextElemId;
        const dbCode='DB'+(this.state.departs.length+1);
        const newDep={...obj,id:newDepId,dbCode};
        const newDeps=[...this.state.departs,newDep];
        this.setState(st=>({departs:newDeps,nextElemId:st.nextElemId+1,showModal:false,editDepartId:null,circuitsSel:{srcId:null,teId:null,cbId:null,bdId:null}}));
        this.showToast('Source creee: '+code);
        setTimeout(()=>this.checkAutoInverseur(newDeps),80);
      }
    };
    const Lbl=(label,req)=>r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},req?r('span',null,label,' ',r('span',{style:{color:c.danger}},'*')):label);
    const inp=(field,ph)=>r('input',{type:'text',placeholder:ph,value:form[field]||'',onChange:e=>sf({[field]:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none'}});

    return this.ModalShell(editDepartId?'Modifier la source':'Nouvelle source / depart',close,
      r('div',null,
        // Header code + type color
        r('div',{style:{display:'flex',alignItems:'center',gap:12,marginBottom:14,padding:'8px 14px',background:cf?cf.col+'12':'rgba(0,0,0,.04)',border:'1px solid '+(cf?cf.col+'30':c.bdr),borderRadius:8}},
          r('div',{style:{fontFamily:c.mono,fontSize:20,fontWeight:900,color:cf?cf.col:sky,flex:0}},(code||'?')),
          r('div',{style:{flex:1,fontSize:12,fontWeight:700,color:cf?cf.col:c.text}},cf?cf.label:'Source'),
          r('div',{style:{fontSize:9,color:c.muted,fontStyle:'italic'}},'Code auto')
        ),

        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px 14px'}},

          // COL 1: Type + Identification
          r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
            r('div',null,
              Lbl('Type',true),
              r('select',{value:form.type||'comptage',onChange:e=>sf({type:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:'comptage'},'Arrivee reseau (Comptage)'),
                r('option',{value:'electrogene'},'Groupe electrogene'),
                r('option',{value:'solaire'},'Centrale solaire / Onduleur')
              )
            ),
            r('div',null,Lbl('Nom / repere',true),inp('nom','Ex: ENEO, GE 15kVA, Solaire 6kWc')),
            r('div',null,Lbl('Emplacement'),inp('emplacement','Ex: Coffret exterieur, local compteur')),
            r('div',null,Lbl('Notes / description'),inp('description','Informations complementaires'))
          ),

          // COL 2: Tension, courbe, calibre, poles, DDR
          r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
            r('div',null,
              Lbl('Type de tension'),
              r('select',{value:form.tension||'mono',onChange:e=>sf({tension:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 9px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:'mono'},'Monophase 230V'),
                r('option',{value:'tri'},'Triphase 400V'),
                r('option',{value:'tri_it'},'Triphase IT 220V'),
                r('option',{value:'basse'},'Tres basse tension (TBT)')
              )
            ),
            r('div',null,
              Lbl('Courbe + Calibre'),
              r('div',{style:{display:'flex',gap:4}},
                r('select',{value:form.courbe||'S',onChange:e=>sf({courbe:e.target.value}),style:{width:44,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 4px',color:c.text,fontSize:12,outline:'none'}},r('option',{value:'S'},'S'),r('option',{value:'B'},'B'),r('option',{value:'C'},'C'),r('option',{value:'D'},'D')),
                r('select',{value:form.calibre||60,onChange:e=>sf({calibre:+e.target.value}),style:{flex:1,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 5px',color:c.text,fontSize:12,outline:'none'}},...[15,30,45,60,90,100,125,160,200,250,400].map(v=>r('option',{key:v,value:v},v+'A')))
              )
            ),
            r('div',null,
              Lbl('Poles'),
              r('select',{value:form.poles||4,onChange:e=>sf({poles:+e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 9px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:1},'1P — Monophase'),
                r('option',{value:2},'2P — Monophase + N'),
                r('option',{value:3},'3P — Triphase'),
                r('option',{value:4},'4P — Triphase + N')
              )
            ),
            r('div',null,
              Lbl('DDR (differentiel)'),
              r('select',{value:form.ddr!=null?form.ddr:300,onChange:e=>sf({ddr:+e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'7px 9px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:0},'Sans DDR'),
                r('option',{value:30},'30 mA — Haute sensibilite'),
                r('option',{value:100},'100 mA — Moyenne sensibilite'),
                r('option',{value:300},'300 mA — Selectif'),
                r('option',{value:500},'500 mA — Selectif renforce')
              )
            ),
            r('div',null,
              Lbl('Piece'),
              r('select',{value:form.pieceId||'',onChange:e=>sf({pieceId:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:''},'-- Non definie --'),
                ...allPieces.map(p=>r('option',{key:p.id,value:String(p.id)},p.nom))
              )
            )
          ),

          // COL 3: Puissance
          r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
            r('div',{style:{padding:'12px',background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)',borderRadius:9}},
              r('div',{style:{fontSize:10,fontWeight:700,color:'#16a34a',textTransform:'uppercase',marginBottom:10}},'Puissance source'),
              r('div',{style:{fontFamily:c.mono,fontSize:24,fontWeight:900,color:c.text,marginBottom:2}},(()=>{const cal=+form.calibre||60;const t=form.tension||'mono';const v=t==='tri'?400:t==='tri_it'?220:230;const f=t==='tri'||t==='tri_it'?cal*v*1.73:cal*v;return Math.round(f)+' W';})()),
              r('div',{style:{fontSize:9,color:c.muted,marginBottom:10}},(()=>{const t=form.tension||'mono';const label={mono:'230V monophase',tri:'400V triphase',tri_it:'220V triphase IT',basse:'TBT'}[t]||'230V';return (+form.calibre||60)+'A × '+label;})())
            ),
            r('div',{style:{padding:'12px',background:pct>100?'rgba(220,38,38,.06)':pct>80?'rgba(217,119,6,.06)':'rgba(2,119,189,.06)',border:'1px solid '+(pct>100?'rgba(220,38,38,.2)':pct>80?'rgba(217,119,6,.2)':'rgba(2,119,189,.2)'),borderRadius:9}},
              r('div',{style:{fontSize:10,fontWeight:700,color:pct>100?c.danger:pct>80?c.warn:'#0277BD',textTransform:'uppercase',marginBottom:8}},'Charge installee'),
              r('div',{style:{fontFamily:c.mono,fontSize:22,fontWeight:900,color:pct>100?c.danger:pct>80?c.warn:c.text,marginBottom:2}},(puissanceCumulee/1000).toFixed(2)+' kW'),
              r('div',{style:{marginBottom:6,fontSize:9,color:c.muted}},allFns.length+' recepteurs'),
              r('div',{style:{height:8,background:c.bdr2,borderRadius:4,overflow:'hidden',marginBottom:4}},
                r('div',{style:{height:'100%',width:Math.min(pct,100)+'%',background:pct>100?c.danger:pct>80?c.warn:'#22c55e',borderRadius:4}})
              ),
              r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:9}},
                r('span',{style:{color:pct>100?c.danger:pct>80?c.warn:c.muted}},pct+'% de la capacite'),
                r('span',{style:{fontWeight:700,color:pct>100?c.danger:pct>80?c.warn:'#22c55e'}},pct>100?'SURCHARGE':pct>80?'ATTENTION':'OK')
              ),
              pct>100&&r('div',{style:{marginTop:6,fontSize:9,color:c.danger,fontWeight:700}},'Augmenter le calibre ou reduire la charge')
            )
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn(editDepartId?'Enregistrer':'Creer',save,'primary','md','ok')]
    );
  }

  renderTableauElecForm(){
    const{editId}=this.state;const c=this.C;const r=this.r;const sky='#0277BD';
    const sf=upd=>this.setState(s=>({tableauElecForm:{...s.tableauElecForm,...upd}}));const sf2=sf;
    const form=this.state.tableauElecForm;
    const close=()=>this.setState({showModal:false});
    const allPieces=this.state.pieces;
    const allApps=this.state.appartements;
    const allDeparts=this.state.departs;
    const allTabElec=this.state.tableauxElec;
    const teObj=editId?allTabElec.find(t=>t.id===editId):null;const autoCode=teObj?this.genTECode(teObj,this.state):this.genTECode({id:-1,type:form.type||'principal',appId:form.appId?+form.appId:null,pieceId:form.pieceId?+form.pieceId:null},{...this.state,tableauxElec:[...allTabElec,{id:-1,type:form.type||'principal'}],appartements:this.state.appartements});
    const isPrinc=(form.type||'principal')==='principal';
    const selPiece=form.pieceId?allPieces.find(p=>String(p.id)===String(form.pieceId)):null;
    const selApp=selPiece?allApps.find(a=>a.id===selPiece.appId):null;
    const reqSpan=(label)=>r('span',null,label,' ',r('span',{style:{color:c.danger,fontWeight:700}},'*'));
    const save=()=>{
      if(!form.type){alert('Le type est obligatoire.');return;}
      if(!editId&&!form.departId&&isPrinc){alert('Un tableau principal doit etre lie a une source.');return;}
      if(!editId&&!form.departId&&!isPrinc){alert('Un tableau secondaire doit etre lie a un tableau principal.');return;}
      if(!form.pieceId){alert('La piece est obligatoire.');return;}
      const selPc=form.pieceId?this.state.pieces.find(p=>String(p.id)===String(form.pieceId)):null;const selAp=selPc?this.state.appartements.find(a=>a.id===selPc.appId):null;const autoNom=selPc?(selAp?selAp.nom+' — ':'')+selPc.nom:'Tableau';const obj={nom:autoNom,type:form.type||'principal',description:form.description||'',pieceId:form.pieceId?+form.pieceId:null,appId:selPc?selPc.appId:(form.appId?+form.appId:null),departId:form.departId?+form.departId:null,code:autoCode,raccordType:form.raccordType||'bornier',raccordIdx:form.raccordIdx||1,feederCalibre:form.feederCalibre?+form.feederCalibre:null,feederSection:form.feederSection?+form.feederSection:null,feederLongueur:form.feederLongueur?+form.feederLongueur:null};
      if(editId!==null)this.setState(s=>({tableauxElec:s.tableauxElec.map(t=>t.id===editId?{...t,...obj}:t),showModal:false,editId:null}));
      else {
        const newNomOvr={...this.state.nomenclatureOverrides};
        if(obj.type==='principal'&&obj.departId){
          const dep=this.state.departs.find(d=>d.id===+obj.departId);
          if(dep){
            const srcCode=this.genSourceCode(dep,{...this.state,departs:[...this.state.departs]});
            const ck=srcCode+'to'+autoCode;
            // Schema fils selon type tension source
            const isTri=dep.tension==='tri'||dep.tension==='tri_it';
            const poles=+dep.poles||4;
            const srcFils=isTri?
              (poles>=4?[{k:'L1',l:'L1'},{k:'L2',l:'L2'},{k:'L3',l:'L3'},{k:'N',l:'N'},{k:'PE',l:'PE'}]:[{k:'L1',l:'L1'},{k:'L2',l:'L2'},{k:'L3',l:'L3'},{k:'PE',l:'PE'}]):
              [{k:'L',l:'L'},{k:'N',l:'N'},{k:'PE',l:'PE'}];
            const dbCode2=dep.dbCode||('DB'+(this.state.departs.findIndex(d=>d.id===dep.id)+1));
            const newTEIdx=this.state.tableauxElec.length+1;
            const cb0Code2=newTEIdx+'CB0';
            srcFils.forEach((f,i)=>{ newNomOvr[ck+'_fil'+(i+1)]={tenant:srcCode+' — '+dbCode2,bt:f.k,aboutissant:autoCode+' — '+cb0Code2,ba:f.k,rep:'',racc:'',test:'',statut:''}; });
          }
        }
        const cb0CodeTE=this.state.tableauxElec.length+1+'CB0';
        this.setState(s=>({tableauxElec:[...s.tableauxElec,{...obj,id:s.nextElemId,cb0Code:cb0CodeTE}],nextElemId:s.nextElemId+1,nomenclatureOverrides:newNomOvr,showModal:false}));
      }
      this.showToast('Tableau enregistre: '+autoCode);
    };
    const Lbl=(label,req)=>r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},req?reqSpan(label):label);
    const inp=(field,ph)=>r('input',{type:'text',placeholder:ph,value:form[field]||'',onChange:e=>sf({[field]:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 12px',color:c.text,fontSize:12,outline:'none'}});
    const srcOpts=isPrinc?allDeparts.map(d=>([String(d.id),'['+this.genSourceCode(d,this.state)+'] '+d.nom])):allTabElec.filter(t=>t.type==='principal'||!t.type).map(t=>([String(t.id),'[TP] '+t.nom]));
    return this.ModalShell(editId?'Modifier le tableau':'Ajouter un tableau electrique',close,
      r('div',null,
        r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:14,padding:'8px 14px',background:'rgba(2,119,189,.06)',border:'1px solid rgba(2,119,189,.2)',borderRadius:7}},
          r('div',{style:{fontSize:9,color:c.muted,fontWeight:600,textTransform:'uppercase'}},'Code auto'),
          r('div',{style:{fontFamily:c.mono,fontSize:18,fontWeight:900,color:sky}},(editId?allTabElec.find(t=>t.id===editId)?.code:null)||autoCode),
          r('div',{style:{fontSize:9,color:c.muted,fontStyle:'italic',marginLeft:'auto'}},'Genere automatiquement')
        ),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px 16px'}},
          r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
            r('div',null,Lbl('Type',true),
              r('select',{value:form.type||'principal',onChange:e=>sf({type:e.target.value,departId:''}),style:{width:'100%',background:c.surf3,border:'1px solid '+(form.type?c.bdr2:c.danger),borderRadius:7,padding:'8px 12px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:''},'-- Choisir --'),r('option',{value:'principal'},'Tableau principal (TGBT)'),r('option',{value:'secondaire'},'Tableau secondaire (DIV)')
              )
            ),
            r('div',null,Lbl('Description'),inp('description','Ex: Tableau general basse tension...')),
            r('div',null,
              Lbl('Raccordement dans le tableau'),
              r('div',{style:{display:'flex',gap:5}},
                ...['bornier','connecteur','repartiteur'].map(v=>r('button',{key:v,onClick:()=>sf({raccordType:v}),style:{flex:1,padding:'5px 6px',borderRadius:6,border:'1px solid '+(form.raccordType===v?'#0277BD':c.bdr2),background:form.raccordType===v?'rgba(2,132,199,.08)':'transparent',color:form.raccordType===v?'#0277BD':c.text2,fontSize:9,fontWeight:form.raccordType===v?700:400,cursor:'pointer'}},{bornier:'Bornier (X)',connecteur:'Connecteur (W)',repartiteur:'Repartiteur (R)'}[v]))
              ),
              r('div',{style:{fontSize:8,color:c.muted,marginTop:4,fontStyle:'italic'}},'Définit le code des bornes (X/W/R) dans la nomenclature.')
            )
          ),
          r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
            r('div',null,
              Lbl('Piece',true),
              r('select',{value:String(form.pieceId||''),onChange:e=>{const pc=allPieces.find(p=>String(p.id)===e.target.value);sf({pieceId:e.target.value,appId:pc?String(pc.appId):''});},style:{width:'100%',background:c.surf3,border:'1px solid '+(form.pieceId?c.bdr2:c.danger),borderRadius:7,padding:'8px 12px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:''},'-- Choisir une piece --'),
                ...allPieces.map(p=>{const app=allApps.find(a=>a.id===p.appId);return r('option',{key:p.id,value:String(p.id)},(app?app.nom+' / ':'')+p.nom);})
              )
            ),
            selPiece&&r('div',{style:{padding:'7px 10px',background:'rgba(2,132,199,.06)',border:'1px solid rgba(2,132,199,.2)',borderRadius:7,fontSize:11}},
              r('span',{style:{color:c.muted,fontSize:9,fontWeight:700,textTransform:'uppercase'}},'Appartement : '),
              r('span',{style:{fontWeight:700,color:c.text}},selApp?selApp.nom:'—')
            ),
            r('div',null,
              Lbl(isPrinc?'Source (depart/arrivee)':'Tableau principal de rattachement',true),
              srcOpts.length===0?
                r('div',{style:{padding:'8px 10px',background:'rgba(220,38,38,.06)',border:'1px solid rgba(220,38,38,.2)',borderRadius:6,fontSize:10,color:c.danger}},'Aucune source — creez dabord un Depart'):
                r('select',{value:String(form.departId||''),onChange:e=>sf({departId:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+(form.departId?c.bdr2:c.danger),borderRadius:7,padding:'8px 12px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                  r('option',{value:''},'-- Choisir --'),...srcOpts.map(([v,l])=>r('option',{key:v,value:v},l))
                )
            ),
            (!isPrinc)?r('div',null,
              Lbl('Liaison depuis le tableau parent'),
              r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0 10px'}},
                r('select',{value:String(form.feederCalibre||''),onChange:e=>sf({feederCalibre:e.target.value}),title:'Calibre de la protection amont (A)',style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 8px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},r('option',{value:''},'Calibre'),...['16','20','25','32','40','63'].map(v=>r('option',{key:v,value:v},v+'A'))),
                r('select',{value:String(form.feederSection||''),onChange:e=>sf({feederSection:e.target.value}),title:'Section du câble de liaison (mm²)',style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 8px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},r('option',{value:''},'Section'),...['2.5','4','6','10','16','25'].map(v=>r('option',{key:v,value:v},v+'mm²'))),
                r('input',{type:'number',min:0,value:form.feederLongueur||'',onChange:e=>sf({feederLongueur:e.target.value}),placeholder:'Long. m',title:'Longueur de la liaison (m)',style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 8px',color:c.text,fontSize:12,outline:'none'}}))
            ):null
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','ok')]
    );
  }

  renderDeleteAppForm(){
    const c=this.C;const r=this.r;
    const{editId,deleteAppTargetId}=this.state;
    const app=this.state.appartements.find(a=>a.id===editId);
    if(!app)return null;
    const appPieces=this.state.pieces.filter(p=>p.appId===app.id);
    const allFns=appPieces.flatMap(p=>p.fonctions||[]);
    const otherApps=this.state.appartements.filter(a=>a.id!==app.id);
    const close=()=>this.setState({showModal:false,editId:null,deleteAppTargetId:null});
    const setTarget=id=>this.setState({deleteAppTargetId:id});
    const deleteAll=()=>{
      const refs=allFns.map(fn=>fn.ref);
      this.setState(s=>({
        appartements:s.appartements.filter(a=>a.id!==editId),
        pieces:s.pieces.filter(p=>p.appId!==editId),
        disjoncteurs:s.disjoncteurs.map(d=>({...d,recepteurs:(d.recepteurs||[]).filter(ref=>!refs.includes(ref))})).filter(d=>(d.recepteurs||[]).length>0),
        interrupteurs:s.interrupteurs.filter(i=>!refs.includes(i.circuitRef)),
        boitesDeriv:s.boitesDeriv.filter(b=>!appPieces.some(p=>p.id===b.pieceId)),
        tableauxElec:s.tableauxElec.filter(t=>t.appId!==editId&&!appPieces.some(p=>p.id===t.pieceId)),
        selectedLogAppId:null,selectedLogPieceId:null,showModal:false,editId:null,deleteAppTargetId:null
      }));
      this.showToast('Appartement '+app.nom+' supprime ('+appPieces.length+' pieces)');
    };
    const transferAndDelete=()=>{
      if(!deleteAppTargetId){this.showToast('Choisir un appartement de destination');return;}
      const target=this.state.appartements.find(a=>a.id===+deleteAppTargetId);
      if(!target)return;
      this.setState(s=>({
        appartements:s.appartements.filter(a=>a.id!==editId),
        pieces:s.pieces.map(p=>p.appId===editId?{...p,appId:+deleteAppTargetId}:p),
        selectedLogAppId:+deleteAppTargetId,selectedLogPieceId:null,showModal:false,editId:null,deleteAppTargetId:null
      }));
      this.showToast(appPieces.length+' piece(s) transferee(s) vers '+target.nom);
    };
    return this.ModalShell('Supprimer lappartement : '+app.nom,close,
      r('div',null,
        r('div',{style:{padding:'10px 14px',background:'rgba(220,38,38,.07)',border:'1px solid rgba(220,38,38,.25)',borderRadius:8,marginBottom:14}},
          r('div',{style:{fontSize:13,fontWeight:700,color:c.danger,marginBottom:4}},'Action irreversible'),
          r('div',{style:{fontSize:11,color:c.text}},'Lappartement ',r('strong',null,app.nom),' contient ',r('strong',null,appPieces.length+' piece(s)'),' et ',r('strong',null,allFns.length+' fonction(s)'),'.'),
          appPieces.length>0&&r('div',{style:{marginTop:6,display:'flex',flexWrap:'wrap',gap:4}},
            ...appPieces.map(p=>r('span',{key:p.id,style:{fontFamily:c.mono,fontSize:9,padding:'2px 6px',background:'rgba(220,38,38,.1)',border:'1px solid rgba(220,38,38,.2)',borderRadius:4,color:c.danger}},p.nom+' ('+(p.fonctions||[]).length+' fn)'))
          )
        ),
        appPieces.length>0&&otherApps.length>0&&r('div',{style:{marginBottom:14}},
          r('div',{style:{fontSize:12,fontWeight:700,color:c.text,marginBottom:8}},'Transferer les pieces vers un autre appartement'),
          r('select',{value:deleteAppTargetId||'',onChange:e=>setTarget(e.target.value),style:{width:'100%',background:c.surf3,border:'1px solid '+(deleteAppTargetId?'#16a34a':c.bdr2),borderRadius:7,padding:'9px 12px',color:c.text,fontSize:12,outline:'none',appearance:'auto',marginBottom:8}},
            r('option',{value:''},'-- Choisir lappartement de destination --'),
            ...otherApps.map(a=>r('option',{key:a.id,value:String(a.id)},a.nom+' ('+(a.appCode||'')+')'))
          ),
          deleteAppTargetId&&r('div',{style:{padding:'8px 12px',background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)',borderRadius:6,fontSize:11,color:'#16a34a'}},'Les ',r('strong',null,appPieces.length+' pieces'),' seront deplacees avec leurs fonctions et circuits.'),
          r('div',{style:{display:'flex',gap:8,marginTop:8}},
            this.Btn('Annuler',close,'ghost','md'),
            this.Btn('Transferer & Supprimer',transferAndDelete,'primary','md',this.ico('ok',12))
          )
        ),
        r('div',{style:{borderTop:'1px solid '+c.bdr,paddingTop:10,marginTop:appPieces.length>0&&otherApps.length>0?4:0}},
          appPieces.length>0&&r('div',{style:{fontSize:10,color:c.muted,marginBottom:6,fontStyle:'italic'}},appPieces.length>0&&otherApps.length>0?'Ou supprimer tout sans transfert (toutes les donnees seront perdues)':'Supprimer sans transfert — toutes les donnees seront perdues'),
          r('div',{style:{display:'flex',gap:8}},
            appPieces.length===0||otherApps.length===0?this.Btn('Annuler',close,'ghost','md'):null,
            this.Btn('Supprimer tout',deleteAll,'danger',appPieces.length===0?'md':'sm',this.ico('trash',11))
          )
        )
      ),
      []
    );
  }

  renderDeleteFnForm(){
    const c=this.C;const r=this.r;
    const{deleteFnTarget,deletePieceTargetId}=this.state;
    const{pieceId,fnId}=deleteFnTarget||{};
    const piece=this.state.pieces.find(p=>p.id===pieceId);
    const fn=piece?(piece.fonctions||[]).find(f=>f.id===fnId):null;
    if(!piece||!fn)return null;
    const fnInfo=this.FNS[fn.type];
    const close=()=>this.setState({showModal:false,deleteFnTarget:{pieceId:null,fnId:null},deletePieceTargetId:null});
    const ref=fn.ref;
    const linkedCB=this.state.disjoncteurs.filter(d=>(d.recepteurs||[]).includes(ref));
    const linkedInter=this.state.interrupteurs.filter(i=>i.circuitRef===ref);
    const hasLinks=linkedCB.length>0||linkedInter.length>0;
    // Autres pieces du meme appartement (hors piece courante)
    const otherPieces=this.state.pieces.filter(p=>p.appId===piece.appId&&p.id!==piece.id);
    const targetId=deletePieceTargetId||'';
    const setTarget=id=>this.setState({deletePieceTargetId:id});

    const deleteOnly=()=>{
      const refs=[ref];
      this.setState(s=>({
        pieces:s.pieces.map(p=>p.id===pieceId?{...p,fonctions:(p.fonctions||[]).filter(f=>f.id!==fnId)}:p),
        disjoncteurs:s.disjoncteurs.map(d=>({...d,recepteurs:(d.recepteurs||[]).filter(r2=>!refs.includes(r2))})).filter(d=>(d.recepteurs||[]).length>0),
        interrupteurs:s.interrupteurs.filter(i=>!refs.includes(i.circuitRef)),
        showModal:false,deleteFnTarget:{pieceId:null,fnId:null},deletePieceTargetId:null
      }));
      this.showToast('Fonction '+ref+' supprimee');
    };

    const transferAndDelete=()=>{
      if(!targetId){this.showToast('Choisir une piece de destination');return;}
      const target=this.state.pieces.find(p=>p.id===+targetId);
      if(!target)return;
      // Check ref conflict
      const targetRefs=new Set((target.fonctions||[]).map(f=>f.ref));
      const newRef=targetRefs.has(ref)?ref+'_x':ref;
      const transferredFn={...fn,ref:newRef};
      const refMap=newRef!==ref?{[ref]:newRef}:{};
      this.setState(s=>({
        pieces:s.pieces.map(p=>{
          if(p.id===+targetId)return{...p,fonctions:[...(p.fonctions||[]),transferredFn]};
          if(p.id===pieceId)return{...p,fonctions:(p.fonctions||[]).filter(f=>f.id!==fnId)};
          return p;
        }),
        disjoncteurs:s.disjoncteurs.map(d=>({...d,recepteurs:(d.recepteurs||[]).map(r2=>refMap[r2]||r2)})),
        interrupteurs:s.interrupteurs.map(i=>({...i,circuitRef:refMap[i.circuitRef]||i.circuitRef})),
        showModal:false,deleteFnTarget:{pieceId:null,fnId:null},deletePieceTargetId:null
      }));
      this.showToast('Fonction '+ref+' transferee vers '+target.nom);
    };

    return this.ModalShell('Supprimer la fonction : '+ref,close,
      r('div',null,
        r('div',{style:{padding:'10px 14px',background:'rgba(220,38,38,.07)',border:'1px solid rgba(220,38,38,.25)',borderRadius:8,marginBottom:14}},
          r('div',{style:{fontSize:13,fontWeight:700,color:c.danger,marginBottom:4}},'Action irreversible'),
          r('div',{style:{fontSize:11,color:c.text}},'La fonction ',r('strong',null,fnInfo?fnInfo.label:fn.type),' sera definitivement supprimee.'),
          r('div',{style:{marginTop:6,display:'flex',flexWrap:'wrap',gap:4}},
            r('span',{style:{fontFamily:c.mono,fontSize:9,padding:'2px 6px',background:'rgba(220,38,38,.1)',border:'1px solid rgba(220,38,38,.2)',borderRadius:4,color:c.danger,display:'inline-flex',alignItems:'center',gap:4}},
              r('span',{style:{display:'inline-flex',alignItems:'center',color:fnInfo?.color||c.danger}},this.ico(fnInfo?.ico||'bulb_ico',10)),
              ref+' — '+(fnInfo?fnInfo.label:fn.type)+(fn.quantite>1?' x'+fn.quantite:'')+(fn.puissance?' — '+(fn.puissance||0)*(fn.quantite||1)+'W':'')
            ),
            r('span',{style:{fontSize:9,padding:'2px 6px',background:'rgba(0,0,0,.05)',borderRadius:4,color:c.muted}},piece.nom)
          ),
          hasLinks&&r('div',{style:{marginTop:6,display:'flex',flexWrap:'wrap',gap:4}},
            ...linkedCB.map(d=>r('span',{key:d.id,style:{fontFamily:c.mono,fontSize:9,padding:'2px 6px',background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.2)',borderRadius:4,color:'#ef4444'}},d.code+' — CB '+(d.courbe||'B')+d.calibre+'A')),
            ...linkedInter.map(i=>r('span',{key:i.id,style:{fontFamily:c.mono,fontSize:9,padding:'2px 6px',background:'rgba(100,116,139,.1)',border:'1px solid rgba(100,116,139,.2)',borderRadius:4,color:'#64748b'}},(i.code||i.nom)+' — Interrupteur'))
          )
        ),

        r('div',{style:{marginBottom:14}},
          r('div',{style:{fontSize:12,fontWeight:700,color:c.text,marginBottom:8}},'Transferer la fonction vers une autre piece'),
          otherPieces.length===0?
            r('div',{style:{padding:'10px',background:'rgba(0,0,0,.04)',borderRadius:6,fontSize:11,color:c.muted,textAlign:'center'}},'Aucune autre piece dans cet appartement'):
            r('div',null,
              r('select',{
                value:targetId,
                onChange:e=>setTarget(e.target.value),
                style:{width:'100%',background:c.surf3,border:'1px solid '+(targetId?'#16a34a':c.bdr2),borderRadius:7,padding:'9px 12px',color:c.text,fontSize:12,outline:'none',appearance:'auto',marginBottom:8}
              },
                r('option',{value:''},'-- Choisir la piece de destination --'),
                ...otherPieces.map(p=>r('option',{key:p.id,value:String(p.id)},(p.pieceCode||'???')+' — '+p.nom+' ('+(p.fonctions||[]).length+' fn)'))
              ),
              targetId&&r('div',{style:{padding:'8px 12px',background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)',borderRadius:6,fontSize:11,color:'#16a34a'}},
                r('span',{style:{fontWeight:700}},'Les codes existants sont preserves.'),
                ' CB et interrupteurs lies suivront automatiquement.'
              )
            )
        ),

        otherPieces.length>0&&r('div',{style:{display:'flex',gap:8,marginBottom:8}},
          this.Btn('Annuler',close,'ghost','md'),
          this.Btn('Transferer & Supprimer',transferAndDelete,'primary','md',this.ico('ok',12))
        ),
        r('div',{style:{borderTop:'1px solid '+c.bdr,paddingTop:10,marginTop:otherPieces.length>0?4:0}},
          r('div',{style:{fontSize:10,color:c.muted,marginBottom:6,fontStyle:'italic'}},otherPieces.length>0?'Ou supprimer sans transfert (la fonction sera perdue)':''),
          r('div',{style:{display:'flex',gap:8}},
            otherPieces.length===0?this.Btn('Annuler',close,'ghost','md'):null,
            this.Btn('Supprimer sans transfert',deleteOnly,'danger','sm',this.ico('trash',11))
          )
        )
      ),
      []
    );
  }

  renderDeletePieceForm(){
    const c=this.C;const r=this.r;
    const{editId}=this.state; // piece to delete
    const piece=this.state.pieces.find(p=>p.id===editId);
    if(!piece)return null;
    const fns=piece.fonctions||[];
    const appPieces=this.state.pieces.filter(p=>p.appId===piece.appId&&p.id!==piece.id);
    const close=()=>this.setState({showModal:false,editId:null,deletePieceTargetId:null});

    // targetPieceId: piece to transfer fonctions to
    const targetId=this.state.deletePieceTargetId||'';
    const setTarget=id=>this.setState({deletePieceTargetId:id});

    const deleteEmpty=()=>{
      if(fns.length>0&&!window.confirm('Cette piece contient '+fns.length+' fonction(s). Supprimer quand meme sans transfert ?'))return;
      // Remove piece, clean up orphan refs in disjoncteurs/interrupteurs
      const refs=fns.map(fn=>fn.ref);
      this.setState(s=>({
        pieces:s.pieces.filter(p=>p.id!==editId),
        disjoncteurs:s.disjoncteurs.map(d=>({...d,recepteurs:(d.recepteurs||[]).filter(r=>!refs.includes(r))})).filter(d=>(d.recepteurs||[]).length>0),
        interrupteurs:s.interrupteurs.filter(i=>!refs.includes(i.circuitRef)),
        showModal:false,editId:null,deletePieceTargetId:null
      }));
      this.showToast('Piece supprimee');
    };

    const transferAndDelete=()=>{
      if(!targetId){this.showToast('Choisir une piece de destination');return;}
      const target=this.state.pieces.find(p=>p.id===+targetId);
      if(!target){return;}
      // Check ref conflicts: if target already has same ref, keep target's
      const targetRefs=new Set((target.fonctions||[]).map(f=>f.ref));
      // Transfer fns: keep ref if not used in target, update if conflict
      const transferredFns=fns.map(fn=>{
        if(!targetRefs.has(fn.ref)){return fn;}
        // Conflict: generate new ref for transferred fn
        const newRef=fn.ref+'_x';
        return {...fn,ref:newRef};
      });
      // Update disjoncteurs and interrupteurs for renamed refs
      const refMap={};
      fns.forEach((fn,i)=>{if(transferredFns[i].ref!==fn.ref)refMap[fn.ref]=transferredFns[i].ref;});

      this.setState(s=>({
        pieces:s.pieces.map(p=>{
          if(p.id===+targetId)return{...p,fonctions:[...(p.fonctions||[]),...transferredFns]};
          if(p.id===editId)return null;
          return p;
        }).filter(Boolean),
        disjoncteurs:s.disjoncteurs.map(d=>({...d,recepteurs:(d.recepteurs||[]).map(ref=>refMap[ref]||ref)})),
        interrupteurs:s.interrupteurs.map(i=>({...i,circuitRef:refMap[i.circuitRef]||i.circuitRef})),
        showModal:false,editId:null,deletePieceTargetId:null
      }));
      this.showToast(fns.length+' fonction(s) transferee(s) vers '+target.nom+' — Piece supprimee');
    };

    return this.ModalShell('Supprimer la piece : '+piece.nom,close,
      r('div',null,
        // Warning
        r('div',{style:{padding:'10px 14px',background:'rgba(220,38,38,.07)',border:'1px solid rgba(220,38,38,.25)',borderRadius:8,marginBottom:14}},
          r('div',{style:{fontSize:13,fontWeight:700,color:c.danger,marginBottom:4}},'⚠ Attention — action irreversible'),
          r('div',{style:{fontSize:11,color:c.text}},'La piece '+r('strong',null,piece.nom)+' contient '+fns.length+' fonction(s) preconfiguree(s).'),
          fns.length>0&&r('div',{style:{marginTop:6,display:'flex',flexWrap:'wrap',gap:4}},
            ...fns.map(fn=>r('span',{key:fn.ref,style:{fontFamily:c.mono,fontSize:9,padding:'2px 6px',background:'rgba(220,38,38,.1)',border:'1px solid rgba(220,38,38,.2)',borderRadius:4,color:c.danger}},fn.ref+' — '+(this.FNS[fn.type]?.label||fn.type)))
          )
        ),

        fns.length>0&&r('div',null,
          // Transfer section
          r('div',{style:{marginBottom:14}},
            r('div',{style:{fontSize:12,fontWeight:700,color:c.text,marginBottom:8}},'Transferer les fonctions vers une autre piece'),
            appPieces.length===0?
              r('div',{style:{padding:'10px',background:'rgba(0,0,0,.04)',borderRadius:6,fontSize:11,color:c.muted,textAlign:'center'}},'Aucune autre piece dans cet appartement'):
              r('div',null,
                r('select',{
                  value:targetId,
                  onChange:e=>setTarget(e.target.value),
                  style:{width:'100%',background:c.surf3,border:'1px solid '+(targetId?'#16a34a':c.bdr2),borderRadius:7,padding:'9px 12px',color:c.text,fontSize:12,outline:'none',appearance:'auto',marginBottom:8}
                },
                  r('option',{value:''},'-- Choisir la piece de destination --'),
                  ...appPieces.map(p=>r('option',{key:p.id,value:String(p.id)},(p.pieceCode||'???')+' — '+p.nom+' ('+(p.fonctions||[]).length+' fn)'))
                ),
                targetId&&r('div',{style:{padding:'8px 12px',background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)',borderRadius:6,fontSize:11,color:'#16a34a'}},
                  r('span',{style:{fontWeight:700}},'Les codes existants sont preserves.'),
                  ' Les composants lies (CB, interrupteurs) se mettront a jour automatiquement. Echange uniquement entre pieces du meme appartement.'
                )
              )
          ),

          // Action buttons with transfer
          appPieces.length>0&&r('div',{style:{display:'flex',gap:8,marginBottom:8}},
            this.Btn('Annuler',close,'ghost','md'),
            this.Btn('Transferer & Supprimer',transferAndDelete,'primary','md',this.ico('ok',12))
          ),
          r('div',{style:{borderTop:'1px solid '+c.bdr,paddingTop:10,marginTop:4}},
            r('div',{style:{fontSize:10,color:c.muted,marginBottom:6,fontStyle:'italic'}},'Ou supprimer sans transfert (les fonctions seront perdues)'),
            this.Btn('Supprimer sans transfert',deleteEmpty,'danger','sm',this.ico('trash',11))
          )
        ),

        fns.length===0&&r('div',{style:{display:'flex',gap:8,justifyContent:'flex-end'}},
          this.Btn('Annuler',close,'ghost','md'),
          this.Btn('Supprimer',deleteEmpty,'danger','md',this.ico('trash',12))
        )
      ),
      []
    );
  }

  renderBoiteForm(){
    const{editId}=this.state;const c=this.C;const r=this.r;const sky='#0277BD';
    const sf=upd=>this.setState(s=>({boiteForm:{...s.boiteForm,...upd}}));
    const form=this.state.boiteForm;
    const allPieces=this.state.pieces;
    const allApps=this.state.appartements;
    const allTabx=this.state.tableauxElec;
    const close=()=>this.setState({showModal:false});
    // Code BD auto: {te_ordre}BD{bd_ordre_global}
    const existingBD=this.state.boitesDeriv;
    const previewBD=editId?existingBD.find(b=>b.id===editId):{id:-1,tableauId:form.tableauId?+form.tableauId:null};
    const previewState=editId?this.state:{...this.state,boitesDeriv:[...existingBD,previewBD]};
    const autoCode=this.genBDCode(previewBD,previewState);
    const save=()=>{
      if(!editId){
        if(!form.pieceId){alert('La boite doit etre dans une piece. Choisissez une piece.');return;}
      }
      const bdCodeFinal=editId?this.genBDCode(existingBD.find(b=>b.id===editId)||previewBD,this.state):autoCode;
      const obj={
        nom:form.label?bdCodeFinal+' — '+form.label:bdCodeFinal,type:form.type,raccordType:form.raccordType||'connecteur',raccordIdx:form.raccordIdx||1,
        pieceId:form.pieceId?+form.pieceId:null,
        tableauId:form.tableauId?+form.tableauId:null,
        position:form.position||'',
        hauteurPlafond:+form.hauteurPlafond||30,
        cote:form.cote||'plafond',
        description:form.description||''
      };
      if(editId!==null){
        this.setState(s=>({boitesDeriv:s.boitesDeriv.map(b=>b.id===editId?{...b,...obj}:b),showModal:false,editId:null}));
      } else {
        const newBId=this.state.nextElemId;
        if(form.retourDepart){
          this.setState(s=>({boitesDeriv:[...s.boitesDeriv,{...obj,id:newBId}],nextElemId:newBId+1,showModal:true,modalType:'editFonction'}));
        } else if(form.retourEditFonction){
          this.setState(s=>({boitesDeriv:[...s.boitesDeriv,{...obj,id:newBId}],nextElemId:newBId+1,showModal:true,modalType:'editFonction'}));
        } else {
          this.setState(s=>({boitesDeriv:[...s.boitesDeriv,{...obj,id:newBId}],nextElemId:newBId+1,showModal:false,circuitsSel:{srcId:null,teId:null,cbId:null,bdId:null}}));
        }
      }
      this.showToast(editId?'Boite modifiee':'BD creee : '+bdCodeFinal);
    };

    const piecesByApp=allApps.map(app=>({app,pieces:allPieces.filter(p=>p.appId===app.id)})).filter(g=>g.pieces.length>0);
    const selPiece=form.pieceId?allPieces.find(p=>p.id===+form.pieceId):null;

    const typeOpts=[
      ['encastre','Encastree en plafond / mur'],
      ['saillie','En saillie'],
      ['etanche','Etanche IP55 (ext/humide)'],
      ['plafond','Plafond (DCL luminaire)']
    ];
    const coteOpts=[
      ['plafond','Plafond (centre)'],
      ['plafond_coin','Plafond (angle)'],
      ['mur_haut','Mur — en haut'],
      ['mur_mi','Mur — mi-hauteur'],
      ['angle','Angle mur/plafond']
    ];

    // Tableaux filtres par appartement de la piece selectionnee
    const selApp=selPiece?allApps.find(a=>a.id===selPiece.appId):null;
    const filteredTabx=allTabx;
    const Lbl=(label,req)=>r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},req?r('span',null,label,' ',r('span',{style:{color:c.danger}},'*')):label);

    return this.ModalShell(editId?'Modifier la boite de derivation':'Nouvelle boite de derivation',close,
      r('div',null,
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px 14px'}},

          // COL 1: Identification
          r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
            r('div',{style:{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',background:'rgba(245,158,11,.06)',border:'1px solid rgba(245,158,11,.25)',borderRadius:7}},
              r('div',{style:{fontSize:9,color:'#d97706',fontWeight:700,textTransform:'uppercase'}},'Code auto'),
              r('div',{style:{fontFamily:c.mono,fontSize:18,fontWeight:900,color:'#f59e0b'}},(editId&&existingBD.find(b=>b.id===editId))?this.genBDCode(existingBD.find(b=>b.id===editId),this.state):autoCode),
              r('div',{style:{fontSize:9,color:c.muted,fontStyle:'italic',marginLeft:'auto'}},'Genere automatiquement')
            ),
            r('div',null,
              Lbl('Libelle (optionnel)'),
              r('input',{type:'text',autoFocus:true,placeholder:'Ex: Sejour, Cuisine...',value:form.label||'',onChange:e=>sf({label:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:13,outline:'none'}})
            ),
            r('div',{style:{marginBottom:10}},
              Lbl('Raccordement dans la boite'),
              r('div',{style:{display:'flex',gap:5}},
                ...['bornier','connecteur','repartiteur'].map(v=>r('button',{key:v,onClick:()=>sf({raccordType:v}),style:{flex:1,padding:'5px 6px',borderRadius:6,border:'1px solid '+(form.raccordType===v?'#0277BD':c.bdr2),background:form.raccordType===v?'rgba(2,132,199,.08)':'transparent',color:form.raccordType===v?'#0277BD':c.text2,fontSize:9,fontWeight:form.raccordType===v?700:400,cursor:'pointer'}},{bornier:'Bornier (X)',connecteur:'Connecteur (W)',repartiteur:'Repartiteur (R)'}[v]))
              )
            ),
            r('div',null,
              Lbl('Type de boite'),
              r('select',{value:form.type||'encastre',onChange:e=>sf({type:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                ...typeOpts.map(([v,l])=>r('option',{key:v,value:v},l))
              )
            ),
            r('div',null,
              Lbl('Notes / description'),
              r('input',{type:'text',placeholder:'Ex: Derive eclairage sejour...',value:form.description||'',onChange:e=>sf({description:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none'}})
            )
          ),

          // COL 2: Localisation
          r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
            r('div',null,
              Lbl('Piece de localisation',true),
              r('select',{value:form.pieceId||'',onChange:e=>sf({pieceId:e.target.value,tableauId:''}),style:{width:'100%',background:c.surf3,border:'1px solid '+(form.pieceId?c.bdr2:c.danger),borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:''},'-- Choisir --'),
                ...piecesByApp.map(({app,pieces})=>
                  r('optgroup',{key:app.id,label:app.nom+' ('+(app.appCode||'APP??')+')'},
                    ...pieces.map(p=>r('option',{key:p.id,value:String(p.id)},(p.pieceCode||'???')+' — '+p.nom))
                  )
                )
              )
            ),
            r('div',null,
              Lbl('Tableau de rattachement (optionnel)'),
              r('select',{value:form.tableauId||'',onChange:e=>sf({tableauId:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                r('option',{value:''},'-- Aucun (déduit des circuits) --'),
                ...(selPiece?filteredTabx:allTabx).map(t=>r('option',{key:t.id,value:String(t.id)},(t.type==='secondaire'?'[DIV] ':'[TGBT] ')+t.nom))
              ),
              r('div',{style:{fontSize:9,color:c.muted,marginTop:3,fontStyle:'italic'}},'Facultatif : une boîte peut être alimentée par plusieurs tableaux. Les câbles entrants sont déduits des disjoncteurs dont un récepteur part de cette boîte.')
            ),
            r('div',null,
              Lbl('Position dans la piece'),
              r('input',{type:'text',placeholder:'Ex: Centre plafond, Angle NE...',value:form.position||'',onChange:e=>sf({position:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none'}})
            ),
            r('div',null,
              Lbl('Emplacement'),
              r('select',{value:form.cote||'plafond',onChange:e=>sf({cote:e.target.value}),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
                ...coteOpts.map(([v,l])=>r('option',{key:v,value:v},l))
              )
            )
          ),

          // COL 3: Hauteur plafond
          r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
            r('div',null,
              Lbl('Hauteur par rapport au plafond'),
              r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:8}},
                r('input',{type:'range',min:0,max:100,step:5,value:form.hauteurPlafond||30,onChange:e=>sf({hauteurPlafond:+e.target.value}),style:{flex:1,accentColor:sky}}),
                r('div',{style:{textAlign:'center',minWidth:52}},
                  r('div',{style:{fontSize:22,fontWeight:900,color:c.text,fontFamily:c.mono,lineHeight:1}},form.hauteurPlafond||30),
                  r('div',{style:{fontSize:9,color:c.muted}},'cm')
                )
              ),
              r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}},
                ...[{v:0,l:'Plafond'},{v:15,l:'15 cm'},{v:30,l:'30 cm'},{v:50,l:'50 cm'}].map(({v,l})=>
                  r('button',{key:v,onClick:()=>sf({hauteurPlafond:v}),style:{padding:'5px 4px',border:'1px solid '+(form.hauteurPlafond===v?sky:c.bdr2),borderRadius:5,background:form.hauteurPlafond===v?'rgba(2,119,189,.1)':'transparent',color:form.hauteurPlafond===v?sky:c.muted,fontSize:10,fontWeight:form.hauteurPlafond===v?700:400,cursor:'pointer',textAlign:'center'}},l)
                )
              )
            ),
            selPiece&&r('div',{style:{padding:'9px 11px',background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)',borderRadius:7,fontSize:10,color:c.text,marginTop:'auto'}},
              r('div',{style:{fontWeight:700,color:'#16a34a',marginBottom:4}},'Resume'),
              r('div',null,(form.nom||'?')+' · '+selPiece.nom),
              r('div',{style:{color:c.muted,marginTop:2}},(form.cote||'plafond')+' · '+(form.hauteurPlafond||30)+'cm plafond'),
              form.tableauId&&r('div',{style:{color:'#0277BD',marginTop:2,fontFamily:c.mono,fontSize:9}},(filteredTabx.find(t=>t.id===+form.tableauId)||allTabx.find(t=>t.id===+form.tableauId))?.nom||'')
            )
          )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn(editId?'Enregistrer':'Creer la boite',save,'primary','md','ok')]
    );
  }

  renderInterForm(){
    const{editId,zonesCommande}=this.state;const c=this.C;const r=this.r;const sky='#0277BD';
    const setForm=fn=>this.setState(s=>({interForm:fn(s.interForm)}));
    const form=this.state.interForm;const allPieces=this.state.pieces;
    const close=()=>this.setState({showModal:false});
    const save=()=>{
      if(!form.nom.trim())return;
      if(!form.zoneId){this.showToast('Zone de commande obligatoire');return;}
      // Heriter du depart de la fonction commandee
      let inheritedDept={departType:'tableau',departId:null};
      if(form.circuitRef){
        const allFnsI=this.state.pieces.flatMap(p=>(p.fonctions||[]).map(f=>({...f,piece:p})));
        const linkedFn=allFnsI.find(f=>f.ref===form.circuitRef);
        if(linkedFn&&linkedFn.departType){
          inheritedDept={departType:linkedFn.departType,departId:linkedFn.departId};
        }
      }
      const obj={nom:form.nom,pieceId:form.pieceId?+form.pieceId:null,type:form.type,circuitRef:form.circuitRef,zoneId:form.zoneId?+form.zoneId:null,...inheritedDept};
      // Retour au formulaire de fonction si l'interrupteur a ete ouvert depuis celui-ci
      const back=form.retourEditFonction?{showModal:true,modalType:'editFonction',editId:null}:{showModal:false};
      if(editId!==null){
        const oldInter=this.state.interrupteurs.find(i=>i.id===editId);
        if(oldInter&&oldInter.type!==form.type){
          // Type change: purge old overrides
          const oldWCode=this.getInterWCode(oldInter,this.state);
          if(oldWCode)this.purgeNomOverridesForCode(oldWCode);
        }
        this.setState(s=>({interrupteurs:s.interrupteurs.map(i=>i.id===editId?{...i,...obj}:i),...back}));
      } else {
        if(form.type==='va_vient'){
          // Creer automatiquement la paire VV1.1 + VV1.2
          // Chercher d'autres zones disponibles pour le 2e interrupteur
          const zonesDispos=this.state.zonesCommande;
          const zone2=zonesDispos.find(z=>z.id!==+(form.zoneId));
          this.setState(s=>{
            const id1=s.nextElemId;
            const id2=s.nextElemId+1;
            const inter1={...obj,id:id1};
            const inter2={...obj,id:id2,
              nom:(form.nom||'VV')+' 2',
              zoneId:zone2?zone2.id:+(form.zoneId), // 2e zone si dispo, sinon meme zone
            };
            return{interrupteurs:[...s.interrupteurs,inter1,inter2],nextElemId:id2+1,...back};
          });
          this.showToast('Paire VV créée automatiquement ✓');
        } else {
          this.setState(s=>({interrupteurs:[...s.interrupteurs,{...obj,id:s.nextElemId}],nextElemId:s.nextElemId+1,circuitsSel:{srcId:null,teId:null,cbId:null,bdId:null},...back}));
          this.showToast('Interrupteur ajouté ✓');
        }
      }
    };
    return this.ModalShell(editId?'Modifier l\'interrupteur':'Ajouter un interrupteur',close,
      r('div',null,
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 18px'}},
          this.Inp('nom','Nom / repère (ex: Inter Séjour 1)','text',form,setForm),
          this.Sel('type','Type',[['simple','Interrupteur simple'],['va_vient','Va-et-vient'],['poussoir','Poussoir'],['double','Double interrupteur'],['variateur','Variateur de lumière'],['domotique','Platine domotique']],form,setForm),
          this.Sel('pieceId','Position — pièce',[['','Non définie'],...allPieces.map(p=>[String(p.id),p.nom])],form,setForm),
          r('div',{style:{marginBottom:14}},
          r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},'Circuit commandé'),
          r('select',{value:form.circuitRef||'',onChange:e=>setForm(f=>({...f,circuitRef:e.target.value})),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 10px',color:c.text,fontSize:12,outline:'none',appearance:'auto'}},
            r('option',{value:''},'-- Choisir un circuit --'),
            ...allPieces.flatMap(p=>(p.fonctions||[]).map(fn=>({fn,p}))).map(({fn,p})=>
              r('option',{key:fn.ref||fn.id,value:fn.ref||(fn.id+'')},
                (fn.ref||'?')+' — '+p.nom+' ('+( this.FNS[fn.type]?.label||fn.type)+')'
              )
            )
          )
        )
        ),
        // Zone de commande avec bouton créer
        r('div',{style:{marginTop:12}},
          r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},'Zone de commande *'),
          zonesCommande.length===0?
            r('div',{style:{padding:'12px',background:'rgba(2,119,189,.05)',border:'1px dashed rgba(2,119,189,.3)',borderRadius:8,textAlign:'center'}},
              r('div',{style:{fontSize:11,color:c.muted,marginBottom:8}},'Aucune zone — créez-en une d\'abord'),
              r('button',{
                onClick:()=>this.setState({showModal:true,modalType:'addZone',editId:null,zoneForm:{nom:'',pieceId:form.pieceId||'',position:'',hauteur:120,cote:'gauche',retourEditFonction:false,retourInter:true}}),
                style:{background:sky,color:'#fff',border:'none',borderRadius:7,padding:'7px 14px',fontSize:11,fontWeight:700,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:5}
              },this.ico('zone_commande',13),' Créer une zone de commande')
            ):
            r('div',{style:{display:'flex',gap:6,alignItems:'center'}},
              r('select',{
                value:String(form.zoneId||''),
                onChange:e=>setForm(f=>({...f,zoneId:e.target.value})),
                style:{flex:1,background:c.surf,border:'1px solid '+c.bdr2,borderRadius:7,padding:'8px 12px',color:c.text,fontSize:12,outline:'none'}
              },
                r('option',{value:''},'-- Choisir une zone --'),
                ...zonesCommande.map(z=>r('option',{key:z.id,value:String(z.id)},(z.zoneCode?z.zoneCode+' — ':'')+z.nom))
              ),
              r('button',{
                onClick:()=>this.setState({showModal:true,modalType:'addZone',editId:null,zoneForm:{nom:'',pieceId:form.pieceId||'',position:'',hauteur:120,cote:'gauche',retourEditFonction:false,retourInter:true}}),
                title:'Créer une nouvelle zone',
                style:{background:sky,color:'#fff',border:'none',borderRadius:6,padding:'8px 10px',fontSize:11,fontWeight:700,cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',gap:4}
              },this.ico('zone_commande',13),' + Zone')
            )
        )
      ),
      [this.Btn('Annuler',close,'ghost','md'),this.Btn('Enregistrer',save,'primary','md','✓')]);
  }

  renderZoneForm(){
    const{editId}=this.state;const c=this.C;const r=this.r;const sky='#0277BD';
    const setForm=fn=>this.setState(s=>({zoneForm:fn(s.zoneForm)}));
    const form=this.state.zoneForm;
    const allPieces=this.state.pieces;
    const allApps=this.state.appartements;
    const allNiveaux=this.state.niveaux;
    const close=()=>this.setState({showModal:false});
    const save=()=>{
      if(!form.nom.trim())return;
      const zoneCode=editId?(this.state.zonesCommande.find(z=>z.id===editId)?.zoneCode||'ZC??'):this.genZoneCode(this.state.zonesCommande);
      const obj={
        nom:form.nom,
        zoneCode,
        pieceId:form.pieceId?+form.pieceId:null,
        position:form.position||'',
        hauteur:+form.hauteur||120,
        cote:form.cote||'gauche'
      };
      if(editId!==null){
        this.setState(s=>({zonesCommande:s.zonesCommande.map(z=>z.id===editId?{...z,...obj}:z),showModal:false,editId:null}));
      } else {
        const newId=this.state.nextElemId;
        if(form.retourEditFonction){
          this.setState(s=>({zonesCommande:[...s.zonesCommande,{...obj,id:newId}],nextElemId:newId+1,editFonctionForm:{...s.editFonctionForm,cmdZoneId:String(newId),showNewZone:false,newZoneNom:''},showModal:true,modalType:'editFonction'}));
        } else if(form.retourInter){
          this.setState(s=>({zonesCommande:[...s.zonesCommande,{...obj,id:newId}],nextElemId:newId+1,interForm:{...s.interForm,zoneId:String(newId)},showModal:true,modalType:'addInter'}));
        } else {
          this.setState(s=>({zonesCommande:[...s.zonesCommande,{...obj,id:newId}],nextElemId:newId+1,showModal:false}));
        }
      }
      this.showToast('Zone de commande créée ✓');
    };

    // Group pieces by apartment for display
    const piecesByApp=allApps.map(app=>({app,pieces:allPieces.filter(p=>p.appId===app.id)})).filter(g=>g.pieces.length>0);
    const selPiece=form.pieceId?allPieces.find(p=>p.id===+form.pieceId):null;

    const coteOpts=[['gauche',"Gauche (entrée)"],['droite',"Droite (entrée)"],['face',"Face à l'entrée"],['milieu','Milieu'],['angle_gd','Angle gauche-droite'],['angle_gf','Angle gauche-fond'],['angle_df','Angle droite-fond']];

    return this.ModalShell(editId?'Modifier la zone de commande':'Nouvelle zone de commande',close,
      r('div',null,
        // Info banner
        r('div',{style:{marginBottom:16,padding:'10px 14px',background:'rgba(2,119,189,.06)',borderRadius:8,border:'1px solid rgba(2,119,189,.15)',display:'flex',gap:10,alignItems:'flex-start'}},
          r('div',{style:{color:sky,flexShrink:0,marginTop:1}},this.ico('zone_commande',16)),
          r('div',null,
            r('div',{style:{fontSize:11,color:sky,fontWeight:700,marginBottom:2}},'Zone de commande'),
            r('div',{style:{fontSize:11,color:c.muted,lineHeight:1.5}},"Une zone regroupe plusieurs interrupteurs au même endroit (ex: boîte de commande à l'entrée d'un couloir). Chaque interrupteur aura son propre code auto-généré.")
          )
        ),

        // Nom
        r('div',{style:{marginBottom:14}},
          r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},'Nom de la zone *'),
          r('input',{type:'text',autoFocus:true,placeholder:'Ex: Commandes entrée, Tableau salon, Tête de lit...',value:form.nom||'',onChange:e=>setForm(f=>({...f,nom:e.target.value})),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'9px 12px',color:c.text,fontSize:13,outline:'none',fontFamily:c.font}})
        ),

        // Pièce — grouped select
        r('div',{style:{marginBottom:14}},
          r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},"Pièce d'emplacement"),
          r('select',{value:form.pieceId||'',onChange:e=>setForm(f=>({...f,pieceId:e.target.value})),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'9px 12px',color:c.text,fontSize:13,outline:'none',fontFamily:c.font,appearance:'auto'}},
            r('option',{value:''},'-- Choisir une pièce --'),
            ...piecesByApp.map(({app,pieces})=>
              r('optgroup',{key:app.id,label:app.nom+' ('+( app.appCode||'APP??')+')',style:{fontWeight:700}},
                ...pieces.map(p=>r('option',{key:p.id,value:String(p.id)},(p.pieceCode||'???')+' — '+p.nom+' ('+p.surface+'m²)'))
              )
            )
          )
        ),

        // Position + Côté (grid)
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}},
          r('div',null,
            r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},'Position dans la pièce'),
            r('input',{type:'text',placeholder:'Ex: Mur nord, près de la porte, angle fenêtre...',value:form.position||'',onChange:e=>setForm(f=>({...f,position:e.target.value})),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'9px 12px',color:c.text,fontSize:12,outline:'none',fontFamily:c.font}})
          ),
          r('div',null,
            r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},'Côté / orientation'),
            r('select',{value:form.cote||'gauche',onChange:e=>setForm(f=>({...f,cote:e.target.value})),style:{width:'100%',background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:7,padding:'9px 12px',color:c.text,fontSize:12,outline:'none',fontFamily:c.font,appearance:'auto'}},
              ...coteOpts.map(([v,l])=>r('option',{key:v,value:v},l))
            )
          )
        ),

        // Hauteur
        r('div',{style:{marginBottom:6}},
          r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:6,fontWeight:600}},'Hauteur par rapport au sol'),
          r('div',{style:{display:'flex',alignItems:'center',gap:12}},
            r('input',{type:'range',min:60,max:200,step:5,value:form.hauteur||120,onChange:e=>setForm(f=>({...f,hauteur:+e.target.value})),style:{flex:1,accentColor:sky}}),
            r('div',{style:{minWidth:60,textAlign:'center'}},
              r('div',{style:{fontSize:22,fontWeight:800,color:c.text,fontFamily:c.mono,lineHeight:1}},form.hauteur||120),
              r('div',{style:{fontSize:10,color:c.muted}},' cm')
            )
          ),
          r('div',{style:{display:'flex',justifyContent:'space-between',marginTop:6,gap:6}},
            ...[{v:90,l:'Plan de travail',sub:'90cm'},{v:105,l:'Standard FR',sub:'105cm'},{v:120,l:'Standard internat.',sub:'120cm'},{v:150,l:'Tableau élec.',sub:'150cm'}].map(({v,l,sub})=>
              r('button',{key:v,onClick:()=>setForm(f=>({...f,hauteur:v})),style:{flex:1,padding:'5px 4px',border:'1px solid '+(form.hauteur===v?sky:c.bdr2),borderRadius:6,background:form.hauteur===v?'rgba(2,119,189,.1)':'transparent',color:form.hauteur===v?sky:c.muted,fontSize:9,fontWeight:form.hauteur===v?700:400,cursor:'pointer',textAlign:'center',lineHeight:1.3,display:'flex',flexDirection:'column',alignItems:'center',gap:2}},r('span',null,l),r('span',{style:{fontFamily:c.mono,fontSize:9,fontWeight:700}},sub))
            )
          )
        ),

        // Recap visuel
        selPiece&&r('div',{style:{marginTop:14,padding:'10px 14px',background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)',borderRadius:8,fontSize:11,color:c.text}},
          r('span',{style:{fontWeight:700,color:'#16a34a'}},'Résumé : '),
          (form.nom||'Zone sans nom')+' · '+selPiece.nom+' · '+(form.position||'position non précisée')+' · '+( form.cote||'gauche')+' · h='+( form.hauteur||120)+'cm'
        )
      ),
      [
        this.Btn('Annuler',close,'ghost','md'),
        this.Btn(editId?'Enregistrer':'Créer la zone',save,'primary','md','✓')
      ]
    );
  }

  // ═══ VIEWS ═══

  vDashboard(circuits){
    const{project,niveaux,appartements,pieces}=this.state;const c=this.C;const r=this.r;
    const costs=this.estCost(circuits);const totalW=circuits.reduce((s,ci)=>s+ci.puissance,0);const comp=this.getCompletion();
    const milestones=['Projet','Niveaux','Appartements','Pièces','Circuits','Rapport'].map((l,i)=>({l,done:i<(comp>=95?6:comp>=75?5:comp>=55?4:comp>=35?3:comp>=20?2:1)}));
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease'}},
      r('div',{className:'cbt-card',style:{background:c.surf,border:`1px solid ${c.bdr}`,borderRadius:14,padding:'16px 20px',marginBottom:16,boxShadow:c.elev2,borderLeft:`3px solid ${c.accent}`}},
        r('div',{style:{marginBottom:4,display:'flex',alignItems:'center',gap:8}},r('div',{style:{width:6,height:6,borderRadius:'50%',background:c.success,animation:'pulse 2s infinite'}}),r('span',{style:{fontSize:11,color:c.muted}},'Projet actif — '+new Date().toLocaleDateString('fr-FR'))),
        r('h1',{style:{fontSize:24,fontWeight:800,color:c.text,marginBottom:2,letterSpacing:'-.5px'}},project.nom),
        r('div',{style:{display:'flex',gap:8,alignItems:'center'}},
          r('span',{style:{fontSize:12,color:c.muted}},project.adresse),
          this.Bdg((this.TC[project.typeConstruction]||{label:project.typeConstruction||'Projet'}).label,c.purple)
        )),
      niveaux.length===0&&r('div',{style:{background:'rgba(2,119,189,.06)',border:'1px dashed '+c.acBlue,borderRadius:10,padding:'14px 18px',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}},r('div',null,r('div',{style:{fontSize:13,fontWeight:700,color:c.text,marginBottom:2}},'Bienvenue 👋 Commencez votre installation'),r('div',{style:{fontSize:11,color:c.muted}},'Ajoutez un niveau et un appartement pour démarrer.')),this.Btn('Configurer le projet →',()=>this.setState({view:'projet'}),'primary','sm')),
      r('div',{className:'cbt-card',style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:14,padding:'14px 20px',marginBottom:16,boxShadow:c.elev1}},
        r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}},r('span',{style:{fontSize:12,fontWeight:600,color:c.text}},'Progression du projet'),r('span',{style:{fontSize:13,fontWeight:800,color:c.accent,fontFamily:c.mono}},comp+'%')),
        r('div',{style:{height:6,background:c.bdr2,borderRadius:3,overflow:'hidden',marginBottom:12}},r('div',{style:{height:'100%',width:comp+'%',background:'linear-gradient(90deg,#0277BD,#0EA5E9)',borderRadius:3,transition:'width .6s'}})),
        r('div',{style:{display:'flex',gap:0}},...milestones.map((m,i)=>r('div',{key:m.l,style:{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}},r('div',{style:{width:18,height:18,borderRadius:'50%',background:m.done?c.success:c.bdr2,border:`2px solid ${m.done?c.success:c.bdr3}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'#fff',fontWeight:700}},m.done?'✓':String(i+1)),r('div',{style:{fontSize:9,color:m.done?c.success:c.muted,fontWeight:m.done?600:400,textAlign:'center'}},m.l))))
      ),
      r('div',{className:'cbt-auto',style:{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,marginBottom:16}},
        this.Stat(niveaux.length,'Niveaux',c.acBlue),this.Stat(appartements.length,'Appartements',c.purple),
        this.Stat(pieces.length,'Pièces',c.acBlue,'configurées'),this.Stat(circuits.length,'Circuits','#22c55e','NF C 15-100'),
        this.Stat((totalW/1000).toFixed(1)+' kW','Charge totale',c.warn),this.Stat(costs.ttc.toLocaleString('fr-FR')+'€','Devis TTC',c.success,'TVA 10%')),
      r('div',{className:'cbt-2to1',style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}},
        this.Card('Structure',r('div',null,
          ...[...niveaux].sort((a,b)=>b.etage-a.etage).map(niv=>r('div',{key:niv.id,style:{marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${c.bdr}`}},
            r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:5}},r('span',{style:{fontSize:13,fontWeight:700,color:c.text}},niv.nom),this.Bdg(niv.etage<0?`SS${Math.abs(niv.etage)}`:'E'+niv.etage,c.muted)),
            r('div',{style:{display:'flex',flexWrap:'wrap',gap:5,paddingLeft:4}},
              ...appartements.filter(a=>a.niveauId===niv.id).map(a=>r('div',{key:a.id,style:{background:c.surf3,border:`1px solid ${c.bdr}`,borderRadius:7,padding:'4px 10px',fontSize:11,color:c.text2}},
                a.nom+' ('+pieces.filter(p=>p.appId===a.id).length+' pcs)'))))),
          r('div',{style:{paddingTop:8}},this.Btn('Configurer →',()=>this.setState({view:'projet'}),'ghost','sm')))),
        this.Card('Répartition circuits',r('div',{style:{paddingTop:4}},
          ...[{type:'eclairage',label:'Éclairage',color:'#f59e0b'},{type:'prises',label:'Prises',color:'#3b82f6'},{type:'specialise',label:'Spécialisés',color:'#ef4444'}].map(s=>r('div',{key:s.type,style:{marginBottom:12}},
            r('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:4}},r('span',{style:{fontSize:12,color:c.text}},s.label),r('span',{style:{fontSize:12,fontWeight:700,color:s.color,fontFamily:c.mono}},circuits.filter(ci=>ci.type===s.type).length)),
            r('div',{style:{height:5,background:c.bdr2,borderRadius:3}},r('div',{style:{height:'100%',width:(circuits.length?circuits.filter(ci=>ci.type===s.type).length/circuits.length*100:0)+'%',background:s.color,borderRadius:3}}))))
        ))
      ),
      r('div',{style:{marginTop:14}},this.Card('Charge par appartement',r('div',{style:{paddingTop:4}},appartements.length===0?r('div',{style:{fontSize:12,color:c.muted,padding:'8px 0'}},'Aucun appartement'):(()=>{const ap=appartements.map(a=>({a,w:pieces.filter(p=>p.appId===a.id).reduce((s,p)=>s+(p.fonctions||[]).reduce((ss,fn)=>ss+this._fnPowerW(fn),0),0)}));const max=Math.max(1,...ap.map(x=>x.w));return ap.map(({a,w})=>r('div',{key:a.id,style:{marginBottom:10}},r('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:4}},r('span',{style:{fontSize:12,color:c.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},a.nom),r('span',{style:{fontSize:12,fontWeight:700,color:c.accent,fontFamily:c.mono}},w>=1000?(w/1000).toFixed(1)+' kW':w+' W')),r('div',{style:{height:6,background:c.bdr2,borderRadius:3}},r('div',{style:{height:'100%',width:(w/max*100)+'%',background:'linear-gradient(90deg,#0277BD,#0EA5E9)',borderRadius:3}}))));})()))),
      this.renderPoseCard(),
      this.renderConfCard(),
      this.renderBilanCard(),
      this.renderChiffrageCard()
    );
  }

  vProjet(){
    const{project,niveaux,appartements,pieces}=this.state;const c=this.C;const r=this.r;
    const d=this.state.projectDraft||project;
    const upd=(k,v)=>this.setState(s=>({projectDraft:{...(s.projectDraft||s.project),[k]:v}}));
    const fi=(k,l,type='text',opts={})=>r('div',{style:{marginBottom:14}},r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},l),r('input',{type,value:d[k]??'',onChange:e=>upd(k,type==='number'?(e.target.value===''?'':(Number.isFinite(+e.target.value)?+e.target.value:d[k])):e.target.value),...opts,style:{width:'100%',background:c.surf3,border:`1px solid ${c.bdr2}`,borderRadius:7,padding:'8px 11px',color:c.text,fontSize:13,outline:'none',fontFamily:c.font}}));
    const se=(k,l,opts)=>r('div',{style:{marginBottom:14}},r('label',{style:{display:'block',fontSize:11,color:c.text2,marginBottom:5,fontWeight:600}},l),r('select',{value:d[k]??'',onChange:e=>upd(k,e.target.value),style:{width:'100%',background:c.surf3,border:`1px solid ${c.bdr2}`,borderRadius:7,padding:'8px 11px',color:c.text,fontSize:13,outline:'none',fontFamily:c.font,appearance:'auto'}},...opts.map(([v,l2])=>r('option',{key:v,value:v},l2))));
    const cdg={3:15,6:30,9:40,12:60,15:60,18:80,24:100}[d.puissanceSouscrite]||60;
    const openAddNiv=()=>this.setState({showModal:true,modalType:'addNiveau',editId:null,nivForm:{nom:'',typeNiv:'etage',etage:niveaux.length>0?Math.max(...niveaux.map(n=>n.etage))+1:0}});
    const nivSorted=[...niveaux].sort((a,b)=>b.etage-a.etage);

    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease'}},
      this.SH('Projet & Structure','Paramètres du projet, type de construction et niveaux du bâtiment',
        this.Btn(r('span',{style:{display:'inline-flex',alignItems:'center',gap:5}},this.ico('save_ico',13),'Enregistrer'),()=>{if(this.state.projectDraft)this.setState(s=>({project:{...s.projectDraft},projectDraft:null}));this.showToast('Projet enregistré ✓');},'primary','md')),

      r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}},

        // ── COL 1 : Infos projet + Client ──
        r('div',{style:{display:'flex',flexDirection:'column',gap:14}},
          this.Card('Informations générales',r('div',null,fi('nom','Nom du projet *'),fi('adresse','Adresse des travaux'),fi('annee','Année','number',{min:1900,max:2030})),null,18),
          this.Card('Client',r('div',null,fi('client','Nom client'),fi('tel','Téléphone','tel'),fi('email','Email','email')),null,18),
          this.Card('Cartouche du plan',r('div',null,fi('bureau','Bureau / Société'),fi('dessinateur','Dessinateur'),fi('indice','Indice / Révision')),null,18)
        ),

        // ── COL 2 : Construction + Alimentation ──
        r('div',{style:{display:'flex',flexDirection:'column',gap:14}},
          this.Card('Type de construction',r('div',null,
            r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}},
              ...Object.entries(this.TC).map(([k,tc])=>r('button',{key:k,onClick:()=>upd('typeConstruction',k),style:{padding:'10px 10px',border:`1px solid ${d.typeConstruction===k?c.accent:c.bdr2}`,borderRadius:8,background:d.typeConstruction===k?'rgba(37,99,235,.12)':'transparent',color:d.typeConstruction===k?c.accent:c.text2,fontSize:11,fontWeight:d.typeConstruction===k?700:400,cursor:'pointer',fontFamily:c.font,textAlign:'center'}},r('span',{style:{display:'inline-flex',alignItems:'center',gap:5}},this.ico(tc.icon,13),tc.label))))),null,18),
          this.Card('Alimentation électrique',r('div',null,
            se('typeAlim','Type',[['monophase','Monophasé 230V'],['triphase','Triphasé 400V']]),
            se('puissanceSouscrite','Puissance souscrite',[['3','3 kVA'],['6','6 kVA'],['9','9 kVA'],['12','12 kVA'],['15','15 kVA'],['18','18 kVA'],['24','24 kVA']]),
            r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 14px'}},
              se('iccTableau','Icc présumé au tableau',[['','— non défini —'],['1.5','1,5 kA'],['3','3 kA'],['4.5','4,5 kA'],['6','6 kA'],['10','10 kA'],['15','15 kA'],['25','25 kA']]),
              se('pdcDisjoncteurs','Pouvoir de coupure (PdC)',[['','— non défini —'],['3','3 kA'],['4.5','4,5 kA'],['6','6 kA (standard)'],['10','10 kA'],['15','15 kA'],['25','25 kA']])),
            r('div',{style:{marginTop:4,padding:'11px 13px',border:`1px solid ${c.bdr2}`,borderRadius:8}},
              r('div',{style:{fontSize:10,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:8}},'Protection foudre (parafoudre)'),
              r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 14px'}},
                se('alimReseau','Raccordement réseau',[['souterrain','Souterrain'],['aerien','Aérien']]),
                se('densiteFoudre','Densité foudroiement Ng',[['','— inconnu —'],['1','1 (faible)'],['1.5','1,5'],['2','2'],['2.5','2,5 (AQ2)'],['3','3'],['4','4 (élevé)']])),
              r('label',{style:{display:'flex',alignItems:'center',gap:7,fontSize:11,color:c.text2,marginTop:6,cursor:'pointer'}},r('input',{type:'checkbox',checked:!!d.paratonnerre,onChange:e=>upd('paratonnerre',e.target.checked)}),'Bâtiment équipé d\'un paratonnerre'),
              r('label',{style:{display:'flex',alignItems:'center',gap:7,fontSize:11,color:c.text2,marginTop:4,cursor:'pointer'}},r('input',{type:'checkbox',checked:!!d.parafoudre,onChange:e=>upd('parafoudre',e.target.checked)}),'Parafoudre Type 2 installé'),
              (()=>{const aerien=(d.alimReseau||'souterrain')==='aerien';const ng=+d.densiteFoudre||0;const para=!!d.paratonnerre;const req=para||(aerien&&ng>=2.5);const reco=!req&&(aerien||ng>=1.5);const st=req?'Obligatoire':reco?'Recommandé':'Non requis';const col=req?c.danger:reco?c.warn:c.success;return r('div',{style:{marginTop:8,fontSize:11,fontWeight:700,color:col}},'Parafoudre : '+st+(req&&!d.parafoudre?' — à ajouter':d.parafoudre?' ✓ déclaré':''));})()),
            r('div',{style:{background:'rgba(2,132,199,.07)',border:`1px solid rgba(2,132,199,.2)`,borderRadius:7,padding:'11px 13px',marginTop:4}},
              r('div',{style:{fontSize:10,color:c.acBlue,fontWeight:700,marginBottom:2,textTransform:'uppercase',letterSpacing:'.06em'}},'Disjoncteur général auto-calculé'),
              r('div',{style:{fontSize:26,fontWeight:800,color:c.text,fontFamily:c.mono}},cdg+'A'),
              r('div',{style:{fontSize:10,color:c.muted,marginTop:2}},'NF C 15-100 — type S · le PdC des disjoncteurs doit couvrir l\'Icc présumé'))),null,18),
          this.Card('Conditions de pose (courant admissible Iz)',r('div',null,
            se('isolant','Isolant du câble',[['PVC','PVC — H07V-U/R'],['PR','PR / XLPE — U-1000 R2V']]),
            se('poseMethod','Mode de pose (méthode réf.)',[['B','B — conduit encastré (paroi isolante)'],['C','C — câbles fixés au mur / apparent'],['E','E — chemin de câbles perforé']]),
            r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 14px'}},
              se('tempAmbiante','Température ambiante',[['30','30 °C'],['35','35 °C'],['40','40 °C'],['45','45 °C'],['50','50 °C']]),
              se('groupement','Circuits groupés',[['1','1'],['2','2'],['3','3'],['4','4'],['5','5'],['6','6'],['8','8']])),
            r('div',{style:{fontSize:9,color:c.muted,marginTop:6,fontStyle:'italic'}},'Iz = Iz(table) × K1 (température) × K2 (groupement). La protection doit vérifier In ≤ Iz.')),null,18),
          this.Card('Régime de neutre & mise à la terre',r('div',null,
            se('regimeNeutre','Régime de neutre (SLT)',[['TT','TT — neutre à la terre (domestique)'],['TN','TN — masses au neutre'],['IT','IT — neutre isolé']]),
            r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 14px'}},
              se('terreType','Type de prise de terre',[['boucle','Boucle fond de fouille'],['piquet','Piquet vertical']]),
              fi('terreLongueur','Longueur électrode (m)','number',{min:0,step:0.5})),
            r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 14px'}},
              fi('rhoSol','Résistivité sol ρ (Ω·m)','number',{min:0,step:10}),
              fi('resistanceTerre','RA mesurée (Ω, sinon estimée)','number',{min:0,step:1})),
            (()=>{const ec=this.earthingCheck();if(ec.regime!=='TT')return r('div',{style:{fontSize:10,color:c.muted,marginTop:6,fontStyle:'italic'}},ec.regime==='IT'?'IT : CPI + limiteur de surtension requis.':'TN : vérifier les longueurs maximales protégées.');if(ec.RA<=0)return r('div',{style:{fontSize:10,color:c.muted,marginTop:6,fontStyle:'italic'}},'Renseignez la longueur d\'électrode ou la RA mesurée.');return r('div',{style:{fontSize:11,fontWeight:700,marginTop:6,color:ec.ulOk?c.success:c.danger}},'RA '+ec.RA+' Ω '+(ec.RAm>0?'(mesurée)':'(estimée)')+' — '+(ec.ulOk?'✓ ≤ '+ec.limitRA+' Ω':'⚠ > '+ec.limitRA+' Ω pour '+ec.Idn+' mA (UL 50V)'));})()),null,18)
        ),

        // ── COL 3 : Niveaux du bâtiment ──
        r('div',{style:{display:'flex',flexDirection:'column',gap:14}},
          r('div',{style:{background:c.surf,border:`1px solid ${c.bdr}`,borderRadius:12,padding:'16px 18px'}},
            r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}},
              r('div',null,
                r('div',{style:{fontSize:13,fontWeight:700,color:c.text,marginBottom:2}},'Niveaux du bâtiment'),
                r('div',{style:{fontSize:11,color:c.muted}},'Du plus haut au plus bas')
              ),
              this.Btn('+ Niveau',openAddNiv,'primary','sm','+')
            ),
            niveaux.length===0
              ?r('div',{style:{textAlign:'center',padding:'24px 0',color:c.muted}},
                  r('div',{style:{fontSize:12,marginBottom:8}},'Aucun niveau'),
                  this.Btn('+ Ajouter',openAddNiv,'ghost','sm','+'))
              :r('div',{style:{display:'flex',flexDirection:'column',gap:8}},
                ...nivSorted.map(niv=>{
                  const apps=appartements.filter(a=>a.niveauId===niv.id);
                  const pcs=pieces.filter(p=>apps.some(a=>a.id===p.appId));
                  const etageLabel=niv.etage<0?`N${niv.etage}`:niv.etage===0?'RDC':`E${niv.etage}`;
                  return r('div',{key:niv.id,style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:8,overflow:'hidden'}},
                    r('div',{style:{padding:'8px 12px',display:'flex',alignItems:'center',gap:8,borderBottom:apps.length?`1px solid ${c.bdr}`:'none'}},
                      r('div',{style:{width:32,height:32,borderRadius:6,background:niv.etage<0?'rgba(239,68,68,.12)':niv.etage===0?'rgba(37,99,235,.12)':'rgba(34,197,94,.12)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
                        r('div',{style:{fontSize:10,fontWeight:800,color:niv.etage<0?c.danger:niv.etage===0?c.accent:c.success,fontFamily:c.mono}},etageLabel)),
                      r('div',{style:{flex:1}},
                        r('div',{style:{fontSize:12,fontWeight:700,color:c.text}},niv.nom),
                        r('div',{style:{fontSize:10,color:c.muted}},apps.length+' app · '+pcs.length+' pcs')),
                      r('button',{onClick:()=>this.openEdit('addNiveau',niv,'nivForm',{nom:niv.nom,typeNiv:niv.typeNiv,etage:niv.etage}),style:{background:'transparent',border:`1px solid ${c.bdr2}`,borderRadius:4,padding:'2px 6px',color:c.muted,cursor:'pointer',fontSize:10}},this.ico('pencil',10)),
                      r('button',{onClick:()=>{this.deleteItem('niveaux',niv.id);this.showToast('Niveau supprimé');},style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:11,padding:0}},'x')
                    ),
                    apps.length>0&&r('div',{style:{padding:'6px 12px',display:'flex',gap:4,flexWrap:'wrap'}},
                      ...apps.map(a=>r('div',{key:a.id,style:{display:'inline-flex',alignItems:'center',gap:4,padding:'2px 8px',background:c.surf3,borderRadius:5,fontSize:10,color:c.text2,border:`1px solid ${c.bdr}`}},
                        r('span',{style:{fontWeight:600}},a.nom),
                        this.Bdg(pieces.filter(p=>p.appId===a.id).length+' pcs',c.acBlue)
                      ))
                    )
                  );
                })
              )
          )
        )
      )
    );
  }

  vLogements(circuits){
    const{pieces,appartements,niveaux,selectedLogAppId,selectedLogPieceId,interrupteurs,zonesCommande,boitesDeriv,tableauxElec}=this.state;
    const c=this.C;const r=this.r;const sky='#0277BD';
    const selApp=selectedLogAppId!==null?appartements.find(a=>a.id===selectedLogAppId)||null:null;
    const selAppId=selApp?.id||null;
    const appPieces=selAppId?pieces.filter(p=>p.appId===selAppId):[...pieces];
    const selPiece=selAppId?appPieces.find(p=>p.id===selectedLogPieceId)||null:null;
    const openAddApp=()=>this.setState({showModal:true,modalType:'addAppart',editId:null,appForm:{nom:'',type:'appartement',surface:80,niveauId:niveaux[0]?.id||1}});
    const openAddPiece=()=>this.setState({showModal:true,modalType:'addPiece',editId:null,pieceForm:{nom:'',type:'sejour',surface:20,niveau:'standard',loadMode:'default',appId:selAppId||1,couleur:'#FFFFFF',typePlafond:'standard',typeMur:'enduit',typeSol:'carrelage'}});
    const openAddFn=()=>this.setState({showModal:true,modalType:'addFonction',selectedPieceId:selPiece?.id,fonctionForm:{type:'eclairage',typeLampe:'led_plafond',puissance:12,quantite:1}});
    const getPow=(p)=>(p.fonctions||[]).reduce((s,fn)=>s+this._fnPowerW(fn),0);
    const fmtW=(w)=>w>=1000?(w/1000).toFixed(1)+' kW':w+' W';
    const getAppPow=(app)=>pieces.filter(p=>p.appId===app.id).reduce((s,p)=>s+getPow(p),0);
    const colHdr=(label,btn)=>r('div',{style:{padding:'11px 14px',borderBottom:`1px solid ${c.bdr}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0,background:c.surf}},r('span',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.1em'}},label),btn);
    const addBtn=(label,onClick)=>r('button',{onClick,style:{background:sky,color:'#fff',border:'none',borderRadius:6,padding:'3px 9px',fontSize:11,fontWeight:700,cursor:'pointer'}},label);

    // Col1: Appartements (no icons, with power)
    const col1=r('div',{style:{width:200,flexShrink:0,borderRight:`1px solid ${c.bdr}`,display:'flex',flexDirection:'column',background:c.surf,overflow:'hidden'}},
      colHdr('APPARTEMENTS',r('div',{style:{display:'flex',gap:4,alignItems:'center'}},
        
        addBtn('+',openAddApp)
      )),
      r('div',{style:{flex:1,overflowY:'auto',padding:'4px 0'}},
        r('button',{onClick:()=>this.setState({selectedLogAppId:null,selectedLogPieceId:null}),
          style:{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'9px 12px',border:'none',cursor:'pointer',textAlign:'left',background:!selAppId?'rgba(2,119,189,.1)':'transparent',borderLeft:`3px solid ${!selAppId?sky:'transparent'}`,transition:'all .12s',borderBottom:`1px solid ${c.bdr}`}},
          r('div',{style:{width:22,height:22,borderRadius:5,background:!selAppId?'rgba(2,119,189,.2)':'rgba(0,0,0,.05)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
            this.ico('building2',12)
          ),
          r('div',{style:{flex:1,minWidth:0}},
            r('div',{style:{fontSize:12,fontWeight:!selAppId?700:400,color:!selAppId?sky:c.text}},'Tous les appartements'),
            r('div',{style:{fontSize:9,color:c.muted}},appartements.length+' logements · '+pieces.length+' pièces')
          ),
          r('span',{style:{fontSize:10,fontWeight:700,color:!selAppId?sky:c.muted,fontFamily:c.mono}},fmtW(appartements.reduce((s,a)=>s+getAppPow(a),0)))
        ),
        appartements.length===0&&r('div',{style:{padding:'24px 12px',textAlign:'center'}},r('div',{style:{fontSize:12,color:c.muted,marginBottom:10}},'Aucun appartement pour le moment'),r('button',{onClick:openAddApp,style:{background:sky,color:'#fff',border:'none',borderRadius:6,padding:'6px 12px',fontSize:11,fontWeight:700,cursor:'pointer'}},'+ Ajouter un appartement')),
        ...appartements.map(app=>{
          const pcount=pieces.filter(p=>p.appId===app.id).length;
          const niv=niveaux.find(n=>n.id===app.niveauId);
          const pow=getAppPow(app);
          const active=app.id===selAppId;
          return r('button',{key:app.id,onClick:()=>this.setState({selectedLogAppId:app.id===selAppId?null:app.id,selectedLogPieceId:null}),
            style:{width:'100%',display:'flex',flexDirection:'column',gap:3,padding:'9px 14px',border:'none',cursor:'pointer',textAlign:'left',background:active?'rgba(2,119,189,.07)':'transparent',borderLeft:`3px solid ${active?sky:'transparent'}`,transition:'all .12s'}},
            r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
              r('span',{style:{fontSize:12,fontWeight:active?700:400,color:active?sky:c.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}},app.nom),
              app.appCode&&r('span',{style:{fontSize:9,fontFamily:c.mono,fontWeight:700,color:'#fff',background:'#0277BD',borderRadius:3,padding:'1px 4px',flexShrink:0}},app.appCode),
              pow>0&&r('span',{style:{fontSize:10,fontWeight:600,color:active?sky:c.muted,fontFamily:c.mono,flexShrink:0,marginLeft:6}},fmtW(pow))
            ),
            r('div',{style:{display:'flex',gap:4}},
              niv&&r('span',{style:{fontSize:9,padding:'1px 5px',borderRadius:4,background:active?'rgba(2,119,189,.12)':'rgba(0,0,0,.06)',color:active?sky:c.muted,fontWeight:600}},niv.nom),
              r('span',{style:{fontSize:9,color:c.muted}},pcount+' pce')
            ),
            active&&r('div',{style:{display:'flex',gap:3,marginTop:3}},
              r('button',{onClick:e=>{e.stopPropagation();this.openEdit('addAppart',app,'appForm',{nom:app.nom,type:app.type,surface:app.surface,niveauId:app.niveauId,code:app.code||''});},style:{background:'transparent',border:`1px solid ${c.bdr2}`,borderRadius:5,padding:'2px 5px',cursor:'pointer',color:c.muted,display:'inline-flex',alignItems:'center'}},this.ico('pencil',10)),
              r('button',{onClick:e=>{e.stopPropagation();this.duplicateAppart(app.id);},title:'Dupliquer',style:{background:'transparent',border:'1px solid '+c.bdr2,borderRadius:5,padding:'2px 6px',cursor:'pointer',color:c.muted,display:'inline-flex',alignItems:'center',fontSize:11,lineHeight:1}},'⧉'),r('button',{onClick:e=>{e.stopPropagation();this.setState({showModal:true,modalType:'deleteApp',editId:app.id,deleteAppTargetId:null});},style:{background:'transparent',border:'1px solid rgba(239,68,68,.35)',borderRadius:5,padding:'2px 5px',cursor:'pointer',color:c.danger,display:'inline-flex',alignItems:'center'}},this.ico('trash',10))
            )
          );
        })
      )
    );

    // Col2: Pièces
    const col2=r('div',{style:{width:190,flexShrink:0,borderRight:`1px solid ${c.bdr}`,display:'flex',flexDirection:'column',background:c.surf3,overflow:'hidden'}},
      colHdr(!selApp?'TOUTES LES PIÈCES':'PIÈCES',r('div',{style:{display:'flex',gap:4,alignItems:'center'}},
        selPiece&&r('button',{onClick:()=>this.setState({selectedLogPieceId:null}),title:'Tout afficher',style:{background:'transparent',border:`1px solid ${c.bdr2}`,borderRadius:5,padding:'2px 6px',cursor:'pointer',color:c.muted,fontSize:12,display:'inline-flex',alignItems:'center'}},'✕'),
        selApp?addBtn('+',openAddPiece):null
      )),
      r('div',{style:{flex:1,overflowY:'auto',padding:'4px 0'}},
        appPieces.length===0&&r('div',{style:{padding:'20px 12px',textAlign:'center',fontSize:12,color:c.muted}},'Aucune pièce'),
        ...appPieces.map(p=>{
          const active=p.id===selPiece?.id;
          const pow=getPow(p);
          const dragActive=this.state.logDragFn!=null;
          return r('button',{key:p.id,onClick:()=>this.setState({selectedLogPieceId:p.id===selPiece?.id?null:p.id}),
            onDragOver:(e)=>{if(dragActive){e.preventDefault();try{e.dataTransfer.dropEffect='move';}catch(_){}}},
            onDrop:(e)=>{e.preventDefault();let id=0;try{id=+e.dataTransfer.getData('text/plain');}catch(_){}if(id)this.moveFonction(id,p.id);},
            style:{width:'100%',display:'flex',alignItems:'center',gap:9,padding:'8px 12px',border:'none',cursor:'pointer',textAlign:'left',background:active?'#fff':'transparent',borderLeft:`3px solid ${active?sky:'transparent'}`,outline:dragActive?'2px dashed '+sky:'none',outlineOffset:'-3px',boxShadow:active?`0 1px 4px ${c.shadow}`:'none',transition:'all .12s',marginBottom:1}},
            r('div',{style:{width:28,height:28,borderRadius:7,background:{sejour:'#f59e0b',cuisine:'#ef4444',chambre:'#8b5cf6',sdb:'#0284C7',wc:'#64748b',bureau:'#6366f1',couloir:'#94a3b8',garage:'#374151',cave:'#78716c',exterieur:'#16a34a'}[p.type]+'15'||c.surf3,display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:{sejour:'#f59e0b',cuisine:'#ef4444',chambre:'#8b5cf6',sdb:'#0284C7',wc:'#64748b',bureau:'#6366f1',couloir:'#94a3b8',garage:'#374151',cave:'#78716c',exterieur:'#16a34a'}[p.type]||c.muted}},this.ico(p.type,15)),
            r('div',{style:{flex:1,minWidth:0,display:'flex',alignItems:'center',gap:6}},
              r('div',{style:{flex:1,minWidth:0}},
                r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
                  r('span',{style:{fontSize:12,fontWeight:active?700:400,color:active?sky:c.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}},p.nom),
                  pow>0&&r('span',{style:{fontSize:10,fontWeight:600,color:active?sky:c.muted,fontFamily:c.mono,flexShrink:0,marginLeft:4}},fmtW(pow))
                ),
                r('div',{style:{display:'flex',gap:4,alignItems:'center',marginTop:1}},p.pieceCode&&r('span',{style:{fontSize:8,fontFamily:c.mono,fontWeight:700,color:'#fff',background:'#6366f1',borderRadius:3,padding:'1px 4px'}},p.pieceCode),r('span',{style:{fontSize:9,color:c.muted}},(()=>{const a=appartements.find(x=>x.id===p.appId);return (a&&!selApp?a.nom+' · ':'')+p.surface+'m² · '+(p.fonctions||[]).length+' fn'})()))
              ),
              active&&r('div',{style:{display:'flex',gap:3,flexShrink:0}},
                r('button',{onClick:e=>{e.stopPropagation();this.openEdit('addPiece',p,'pieceForm',{nom:p.nom,type:p.type,surface:p.surface,niveau:p.niveau,appId:p.appId,couleur:p.couleur||'#FFFFFF',typePlafond:p.typePlafond||'standard',typeMur:p.typeMur||'enduit',typeSol:p.typeSol||'carrelage'});},style:{background:'transparent',border:`1px solid ${c.bdr2}`,borderRadius:5,padding:'2px 5px',cursor:'pointer',display:'inline-flex',alignItems:'center',color:c.muted}},this.ico('pencil',11)),
                r('button',{onClick:e=>{e.stopPropagation();this.duplicatePiece(p.id);},title:'Dupliquer',style:{background:'transparent',border:'1px solid '+c.bdr2,borderRadius:5,padding:'2px 6px',cursor:'pointer',color:c.muted,display:'inline-flex',alignItems:'center',fontSize:11,lineHeight:1}},'⧉'),r('button',{onClick:e=>{e.stopPropagation();this.setState({showModal:true,modalType:'deletePiece',editId:p.id,deletePieceTargetId:null});},style:{background:'transparent',border:'1px solid rgba(239,68,68,.35)',borderRadius:5,padding:'2px 5px',cursor:'pointer',display:'inline-flex',alignItems:'center',color:c.danger}},this.ico('trash',11))
              )
            )
          );
        })
      )
    );

    // Col3: Fonctions (no × delete)
    const col3=r('div',{style:{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:200}},
      !selPiece?
        r('div',{style:{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}},
          r('div',{style:{padding:'10px 14px',background:c.surf,borderBottom:`1px solid ${c.bdr}`,fontSize:11,color:c.muted,flexShrink:0,display:'flex',alignItems:'center',gap:6}},
            this.ico('bulb_ico',13),' Toutes les fonctions — '+(selApp?selApp.nom:'tous les appartements')
          ),
          r('div',{style:{flex:1,overflowY:'auto',padding:'10px 14px',background:c.bg}},
            appPieces.length===0&&r('div',{style:{padding:'30px 0',textAlign:'center',fontSize:12,color:c.muted}},'Aucune pièce configurée'),
            ...appPieces.map(p=>{
              const fns=(p.fonctions||[]);if(fns.length===0)return null;
              const fnPow=fns.reduce((s,fn)=>s+(fn.type==='eclairage'?(fn.puissance||10)*(fn.quantite||1):0),0);
              return r('div',{key:p.id,style:{marginBottom:12}},
                r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:6,padding:'5px 0',borderBottom:`1px solid ${c.bdr}`}},
                  r('div',{style:{width:14,height:14,borderRadius:3,background:p.couleur||'#f0f0f0',border:`1px solid ${c.bdr}`,flexShrink:0}}),
                  r('span',{style:{fontSize:12,fontWeight:600,color:c.text}},p.nom),
                  r('span',{style:{fontSize:10,color:c.muted}},p.surface+'m²'),
                  fnPow>0&&r('span',{style:{fontSize:10,fontWeight:700,color:'#0277BD',fontFamily:c.mono}},fmtW(fnPow)),
                  r('button',{onClick:()=>this.setState({selectedLogPieceId:p.id}),style:{marginLeft:'auto',fontSize:10,color:'#0277BD',background:'transparent',border:'none',cursor:'pointer',textDecoration:'underline'}},'Détails →')
                ),
                r('div',{style:{display:'flex',flexWrap:'wrap',gap:5}},
                  ...fns.map(fn=>{const fi=this.FNS[fn.type];if(!fi)return null;return r('div',{key:fn.id,style:{display:'inline-flex',alignItems:'center',gap:5,padding:'3px 8px',background:c.surf,border:`1px solid ${c.bdr}`,borderRadius:6,fontSize:11}},
                    r('span',{style:{display:'inline-flex',color:fi.color}},this.ico(fi.ico,12)),
                    r('span',{style:{color:c.text}},fi.label),
                    r('span',{style:{color:c.muted,fontFamily:'monospace',fontSize:10}},fn.ref)
                  );})
                )
              );
            }).filter(Boolean)
          )
        ):
        r('div',{style:{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}},
          r('div',{style:{padding:'11px 14px',background:c.surf,borderBottom:`1px solid ${c.bdr}`,display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}},
            r('span',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.1em'}},'FONCTIONS'),
            r('button',{onClick:openAddFn,style:{background:sky,color:'#fff',border:'none',borderRadius:6,padding:'3px 9px',fontSize:11,fontWeight:700,cursor:'pointer'}},'+')
          ),
          r('div',{style:{flex:1,overflowY:'auto',padding:'10px 14px',background:c.bg}},
            (selPiece.fonctions||[]).length===0&&r('div',{style:{textAlign:'center',padding:'30px 0'}},
              r('div',{style:{display:'inline-flex',color:c.bdr3,marginBottom:8}},this.ico('eclairage',28)),
              r('div',{style:{fontSize:12,color:c.muted,marginBottom:10}},'Aucune fonction'),
              r('button',{onClick:openAddFn,style:{background:sky,color:'#fff',border:'none',borderRadius:7,padding:'6px 16px',fontSize:11,fontWeight:700,cursor:'pointer'}},'+  Ajouter')
            ),
            r('div',{style:{display:'flex',flexDirection:'column',gap:6}},
              ...(selPiece.fonctions||[]).map(fn=>{
                const fnInfo=this.FNS[fn.type];if(!fnInfo)return null;
                const isEcl=fn.type==='eclairage';const isPrise=['prises','prises_sdb'].includes(fn.type);
                const ltLabel=isEcl?(this.LAMP_TYPES[fn.typeLampe]?.label||fn.typeLampe):'';
                const pcircs=circuits.filter(ci=>ci.pid===selPiece.id&&ci.type===fn.type);
                const fnPow=isEcl?(fn.puissance||10)*(fn.quantite||1):0;
                const fnActive=this.state.selectedFnId===fn.id;
                return r('div',{key:fn.id,draggable:true,
                  onDragStart:(e)=>{try{e.dataTransfer.setData('text/plain',String(fn.id));e.dataTransfer.effectAllowed='move';}catch(_){}this.setState({logDragFn:fn.id});},
                  onDragEnd:()=>this.setState({logDragFn:null}),
                  onClick:()=>this.setState({selectedFnId:fn.id===this.state.selectedFnId?null:fn.id}),style:{background:fnActive?'rgba(2,119,189,.05)':'#fff',border:'1px solid '+(fnActive?sky:c.bdr),borderRadius:9,padding:'10px 12px',display:'flex',alignItems:'flex-start',gap:10,boxShadow:`0 1px 3px ${c.shadow}`,cursor:'grab',transition:'all .12s'}},
                  r('span',{style:{color:c.bdr3,fontSize:13,flexShrink:0,cursor:'grab',userSelect:'none',alignSelf:'center'},title:'Glisser vers une autre pièce'},'⠿'),
                  r('div',{style:{width:32,height:32,borderRadius:7,background:fnInfo.color+'18',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:fnInfo.color}},this.ico(fnInfo.ico,16)),
                  r('div',{style:{flex:1,minWidth:0}},
                    r('div',{style:{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap',marginBottom:3}},
                      r('span',{style:{fontSize:12,fontWeight:600,color:c.text}},fnInfo.label),
                      isEcl&&r('span',{style:{fontSize:10,color:c.muted}},ltLabel),
                      (isEcl||isPrise)&&(fn.quantite||1)>1&&this.Bdg('×'+(fn.quantite||1),c.muted),
                      fnPow>0&&r('span',{style:{fontSize:10,fontWeight:600,color:sky,fontFamily:c.mono}},fnPow+'W')
                    ),
                    r('div',{style:{fontFamily:c.mono,fontSize:10,color:fnInfo.color,fontWeight:700}},this.formatRefs(fn)),
                    pcircs.length>0&&r('div',{style:{display:'flex',gap:3,flexWrap:'wrap',marginTop:3}},
                      ...pcircs.map(ci=>r('span',{key:ci.id,style:{fontSize:9,padding:'1px 5px',borderRadius:4,background:ci.color+'15',color:ci.color,fontFamily:c.mono}},ci.calibreType+ci.calibre+'A'))
                    )
                  ),
                  r('div',{style:{display:'flex',flexDirection:'column',gap:3,flexShrink:0}},
                    r('button',{onClick:e=>{e.stopPropagation();this.setState({showModal:true,modalType:'editFonction',editFonctionPieceId:selPiece.id,editFonctionId:fn.id,editFonctionForm:{type:fn.type,typeLampe:fn.typeLampe||'led_plafond',puissance:fn.puissance||12,quantite:fn.quantite||1,distance:fn.distance||0,cmdType:'simple',cmdZoneId:'',cmdZone2Id:'',newZoneNom:'',showNewZone:false,djCalibre:10,djCourbe:'B',djPoles:'1',djDDR:30,djTableauId:'',djSection:1.5,departType:fn.departType||'tableau',departId:fn.departId?String(fn.departId):'',departDist:fn.departDist||0,cableLongueur:fn.cableLongueur||0,cableSection:fn.cableSection||'1.5',cableType:fn.cableType||'H07VU'}});},style:{flexShrink:0,background:'transparent',border:'1px solid '+c.bdr2,borderRadius:6,padding:'4px 8px',color:c.muted,cursor:'pointer',fontSize:10,display:'flex',alignItems:'center',gap:3}},this.ico('pencil',11),' Modifier'),
                    r('button',{onClick:e=>{e.stopPropagation();this.setState({showModal:true,modalType:'deleteFn',deleteFnTarget:{pieceId:selPiece.id,fnId:fn.id}});},style:{flexShrink:0,background:'transparent',border:'1px solid rgba(239,68,68,.35)',borderRadius:6,padding:'4px 8px',color:c.danger,cursor:'pointer',fontSize:10,display:'flex',alignItems:'center',gap:3}},this.ico('trash',11),' Supprimer')
                  )
                );
              }).filter(Boolean)
            )
          )
        )
    );

    // Col4: Distribution — shows fn details when fn selected, else piece overview
    const pCircuits=selPiece?circuits.filter(ci=>ci.pid===selPiece.id):[];
    const pBoites=selPiece?boitesDeriv.filter(b=>b.pieceId===selPiece.id):[];
    const pInters=selPiece?interrupteurs.filter(i=>i.pieceId===selPiece.id||(i.circuitRef&&(selPiece.fonctions||[]).some(fn=>fn.ref&&i.circuitRef.startsWith(fn.ref.substring(0,4))))):[];
    const pZones=selPiece?zonesCommande.filter(z=>z.pieceId===selPiece.id):[];

    const selFn=selPiece&&this.state.selectedFnId?(selPiece.fonctions||[]).find(f=>f.id===this.state.selectedFnId)||null:null;
    const selFnInfo=selFn?this.FNS[selFn.type]:null;
    const fnCirqs=selFn?circuits.filter(ci=>ci.pid===selPiece.id&&ci.type===selFn.type):[];
    const fnCmds=selFn?interrupteurs.filter(i=>i.circuitRef===selFn.ref):[];
    const fnDjs=selFn?this.state.disjoncteurs.filter(d=>(d.recepteurs||[]).includes(selFn.ref)):[];

    const col4=r('div',{style:{width:276,flexShrink:0,borderLeft:`1px solid ${c.bdr}`,display:'flex',flexDirection:'column',background:c.surf,overflow:'hidden'}},
      // Header
      r('div',{style:{padding:'11px 14px',borderBottom:`1px solid ${c.bdr}`,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between'}},
        r('span',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.1em'}},selFn?'DÉTAILS FONCTION':'DISTRIBUTION'),
        selFn&&r('button',{onClick:()=>this.setState({selectedFnId:null}),style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',fontSize:13,padding:0}},'✕')
      ),

      !selPiece?
        r('div',{style:{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:16}},
          r('div',{style:{fontSize:11,color:c.muted,textAlign:'center'}},'Sélectionnez une pièce')
        ):
      selFn?
        // ── MODE DÉTAIL FONCTION ──
        r('div',{style:{flex:1,overflowY:'auto',padding:0}},
          // Fn header
          r('div',{style:{padding:'12px 14px',background:selFnInfo?selFnInfo.color+'0d':'#f9f9f9',borderBottom:`1px solid ${c.bdr}`}},
            r('div',{style:{display:'flex',alignItems:'center',gap:9,marginBottom:8}},
              r('div',{style:{width:34,height:34,borderRadius:8,background:selFnInfo?selFnInfo.color+'20':'#eee',display:'flex',alignItems:'center',justifyContent:'center',color:selFnInfo?selFnInfo.color:'#666',flexShrink:0}},this.ico(selFnInfo?selFnInfo.ico:'default',17)),
              r('div',null,
                r('div',{style:{fontSize:12,fontWeight:700,color:c.text}},selFnInfo?selFnInfo.label:selFn.type),
                r('div',{style:{fontFamily:c.mono,fontSize:11,fontWeight:800,color:selFnInfo?selFnInfo.color:sky}},selFn.ref)
              )
            ),
            r('div',{style:{display:'flex',flexWrap:'wrap',gap:5}},
              selFn.quantite>1&&this.Bdg('×'+selFn.quantite,c.muted),
              selFn.typeLampe&&this.Bdg(this.LAMP_TYPES[selFn.typeLampe]?.label||selFn.typeLampe,'#f59e0b'),
              selFn.puissance&&r('span',{style:{fontSize:10,color:sky,fontWeight:700,fontFamily:c.mono}},(selFn.puissance*(selFn.quantite||1))+'W'),
              selFn.distance>0&&this.Bdg(selFn.distance+'m tableau',c.muted)
            )
          ),

          // Disjoncteurs CB manuels
          r('div',{style:{borderBottom:`1px solid ${c.bdr}`}},
            r('div',{style:{padding:'7px 14px',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.07em',background:'rgba(239,68,68,.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}},
              r('span',null,'Disjoncteurs CB'),
              r('button',{onClick:()=>this.setState({showModal:true,modalType:'editFonction',editFonctionPieceId:selPiece.id,editFonctionId:selFn.id,editFonctionForm:{type:selFn.type,typeLampe:selFn.typeLampe||'led_plafond',puissance:selFn.puissance||12,quantite:selFn.quantite||1,distance:selFn.distance||0,cmdType:'simple',cmdZoneId:'',cmdZone2Id:'',newZoneNom:'',showNewZone:false,djCalibre:10,djCourbe:'B',djPoles:'1',djDDR:30,djTableauId:'',djSection:1.5}}),style:{fontSize:9,color:'#ef4444',background:'transparent',border:'none',cursor:'pointer',fontWeight:700}},fnDjs.length===0?'+ Assigner':'Modifier')
            ),
            fnDjs.length===0?
              r('div',{style:{padding:'8px 14px',fontSize:11,color:c.muted,fontStyle:'italic'}},'Aucun CB — cliquer Assigner'):
              r('div',{style:{padding:'6px 8px'}},
                ...fnDjs.map(d=>{
                  const tab=this.state.tableauxElec.find(t=>t.id===d.tableauId);
                  const totW=this.calcDjPower(d,this.state.pieces);
                  const lim=this.djNFCLimit(d);
                  const pct=Math.min(Math.round(totW/lim.maxW*100),100);
                  const nPct=Math.min(Math.round((d.recepteurs||[]).length/lim.maxR*100),100);
                  const mPct=Math.max(pct,nPct);
                  const over=totW>lim.maxW||(d.recepteurs||[]).length>lim.maxR;
                  const warn=!over&&mPct>80;
                  const cv=d.courbe||'?';
                  const cb=d.calibre||'?';
                  const cs=d.section!=null?d.section:'?';
                  const cd=d.ddr!=null?d.ddr:0;
                  const cp=d.poles||'?';
                  return r('div',{key:d.id,style:{padding:'8px 10px',marginBottom:4,borderRadius:7,border:'2px solid '+(over?c.danger:warn?c.warn:'rgba(239,68,68,.25)'),background:c.surf}},
                    r('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:5}},
                      r('div',{style:{fontFamily:c.mono,fontSize:12,fontWeight:900,color:'#ef4444',flex:1}},d.code),
                      this.Bdg(cv+cb+'A','#ef4444'),
                      this.Bdg(cs+'mm',c.muted),
                      cd>0&&this.Bdg(cd+'mA','#0284C7'),
                      this.Bdg(cp+'P',c.muted)
                    ),
                    r('div',{style:{display:'flex',alignItems:'center',gap:5,padding:'3px 7px',background:tab?'rgba(2,119,189,.05)':'rgba(0,0,0,.03)',borderRadius:4,border:'1px solid '+(tab?'rgba(2,119,189,.15)':c.bdr),marginBottom:5}},
                      r('span',{style:{fontSize:9,color:tab?'#0277BD':c.muted,flex:1,fontStyle:tab?'normal':'italic'}},tab?tab.nom:'Aucun tableau — assigner depuis Circuits electriques')
                    ),
                    r('div',null,
                      r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:8,marginBottom:2}},
                        r('span',{style:{color:over?c.danger:c.muted}},(d.recepteurs||[]).length+' rec. '+totW+'W/'+lim.maxW+'W'),
                        r('span',{style:{fontWeight:800,color:over?c.danger:warn?c.warn:'#22c55e',fontFamily:c.mono}},mPct+'%')
                      ),
                      r('div',{style:{height:4,background:c.bdr2,borderRadius:2,overflow:'hidden'}},
                        r('div',{style:{height:'100%',width:mPct+'%',background:over?c.danger:warn?c.warn:'#22c55e',borderRadius:2}})
                      )
                    ),
                    over&&r('div',{style:{marginTop:4,padding:'3px 7px',background:'rgba(220,38,38,.08)',borderRadius:4,fontSize:8,color:c.danger,fontWeight:700}},'DEPASSE NF C 15-100: '+lim.label),
                    warn&&!over&&r('div',{style:{marginTop:4,padding:'3px 7px',background:'rgba(217,119,6,.07)',borderRadius:4,fontSize:8,color:c.warn,fontWeight:600}},'Proche limite ('+mPct+'%): '+lim.label)
                  );
                })
              )
          ),

          // Recommandation NF C 15-100
          r('div',{style:{borderBottom:`1px solid ${c.bdr}`}},
            r('div',{style:{padding:'7px 14px',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.07em',background:c.surf3}},'Recommandation NF C 15-100'),
            fnCirqs.length===0?
              r('div',{style:{padding:'8px 14px',fontSize:11,color:c.muted,fontStyle:'italic'}},'Non applicable'):
              fnCirqs.map(ci=>r('div',{key:ci.id,style:{padding:'7px 14px',display:'flex',flexDirection:'column',gap:3}},
                r('div',{style:{display:'flex',alignItems:'center',gap:6}},
                  r('div',{style:{width:6,height:6,borderRadius:'50%',background:ci.color,flexShrink:0}}),
                  r('span',{style:{fontSize:10,fontWeight:600,color:c.text,flex:1}},ci.nom)
                ),
                r('div',{style:{display:'flex',flexWrap:'wrap',gap:3,paddingLeft:12}},
                  this.Bdg(ci.calibreType+ci.calibre+'A',ci.color),
                  this.Bdg(ci.section+'mm²',c.muted),
                  this.Bdg('DDR '+ci.ddr,ci.ddr===2?'#0284C7':'#94a3b8'),
                  r('span',{style:{fontSize:9,color:c.muted,fontFamily:c.mono}},'~'+ci.len+'m')
                ),
                r('div',{style:{paddingLeft:12,fontSize:9,color:c.muted}},ci.ref)
              ))
          ),
          // Commandes / Interrupteurs
          r('div',null,
            r('div',{style:{padding:'7px 14px',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.07em',background:c.surf3,display:'flex',justifyContent:'space-between',alignItems:'center'}},
              'Commandes ('+fnCmds.length+')',
              r('button',{onClick:()=>this.setState({showModal:true,modalType:'editFonction',editFonctionPieceId:selPiece.id,editFonctionId:selFn.id,editFonctionForm:{type:selFn.type,typeLampe:selFn.typeLampe||'led_plafond',puissance:selFn.puissance||12,quantite:selFn.quantite||1,distance:selFn.distance||0,cmdType:'simple',cmdZoneId:'',cmdZone2Id:'',newZoneNom:'',showNewZone:false}}),style:{fontSize:9,color:sky,background:'transparent',border:'none',cursor:'pointer',fontWeight:700}},'+')
            ),
            fnCmds.length===0?
              r('div',{style:{padding:'10px 14px',fontSize:11,color:c.muted,fontStyle:'italic'}},'Aucune commande associée'):
              r('div',{style:{padding:'4px 0'}},
                ...fnCmds.map(i=>{
                  const zone=zonesCommande.find(z=>z.id===i.zoneId);
                  const typeLabel={simple:'SA',va_vient:'VV',poussoir:'PO',double:'DA',variateur:'VA',detecteur:'DT',domotique:'DM'}[i.type]||i.type;
                  return r('div',{key:i.id,style:{padding:'7px 14px',borderBottom:`1px solid ${c.surf3}`,display:'flex',alignItems:'flex-start',gap:8}},
                    r('div',{style:{width:24,height:24,borderRadius:5,background:'rgba(2,119,189,.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:sky}},this.ico('interrupteur',12)),
                    r('div',{style:{flex:1,minWidth:0}},
                      r('div',{style:{fontFamily:c.mono,fontSize:11,fontWeight:800,color:sky}},i.code||i.nom),
                      r('div',{style:{fontSize:9,color:c.muted,marginTop:2}},typeLabel+(i.point?' · '+i.point:'')),
                      zone&&r('div',{style:{display:'flex',alignItems:'center',gap:4,marginTop:3}},
                        r('span',{style:{fontSize:8,fontFamily:c.mono,fontWeight:700,color:'#fff',background:'#7c3aed',borderRadius:3,padding:'1px 4px'}},zone.zoneCode||'ZC??'),
                        r('span',{style:{fontSize:9,color:c.muted}},zone.nom),
                        zone.hauteur&&r('span',{style:{fontSize:8,color:c.muted,fontFamily:c.mono}},zone.hauteur+'cm')
                      ),
                      !zone&&r('div',{style:{fontSize:9,color:c.danger,marginTop:2}},'⚠ Aucune zone')
                    ),
                    r('button',{onClick:()=>this.setState(s=>({interrupteurs:s.interrupteurs.filter(x=>x.id!==i.id)})),style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:12,padding:0,flexShrink:0}},'×')
                  );
                })
              )
          ),

          // Refs paralleles
          selFn.quantite>1&&r('div',null,
            r('div',{style:{padding:'7px 14px',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.07em',background:c.surf3}},'Références parallèles'),
            r('div',{style:{padding:'8px 14px',display:'flex',flexWrap:'wrap',gap:4}},
              ...Array.from({length:Math.min(selFn.quantite,12)},(_,i)=>
                r('span',{key:i,style:{fontFamily:c.mono,fontSize:10,fontWeight:700,color:selFnInfo?selFnInfo.color:sky,background:(selFnInfo?selFnInfo.color:sky)+'12',padding:'2px 6px',borderRadius:4}},selFn.ref+'.'+(i+1))
              ),
              selFn.quantite>12&&r('span',{style:{fontSize:9,color:c.muted}},'+'+( selFn.quantite-12)+' …')
            )
          )
        ):

        // ── MODE PIÈCE (vue générale) ──
        r('div',{style:{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}},
          r('div',{style:{padding:'8px 12px',fontSize:10,color:c.muted,background:c.surf3,borderBottom:`1px solid ${c.bdr}`}},'Cliquez sur une fonction pour voir ses détails'),
          // Disjoncteurs
          r('div',{style:{flex:'0 0 auto',borderBottom:`1px solid ${c.bdr}`,overflow:'hidden'}},
            r('div',{style:{padding:'7px 12px',borderBottom:`1px solid ${c.bdr}`,fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.08em'}},'Circuits'),
            r('div',{style:{maxHeight:130,overflowY:'auto',padding:'2px 0'}},
              pCircuits.length===0&&r('div',{style:{padding:'8px 12px',fontSize:11,color:c.muted,fontStyle:'italic'}},'Aucun circuit'),
              ...pCircuits.map(ci=>r('div',{key:ci.id,style:{padding:'5px 12px',display:'flex',alignItems:'center',gap:7,borderBottom:`1px solid ${c.surf3}`}},
                r('div',{style:{width:6,height:6,borderRadius:'50%',background:ci.color,flexShrink:0}}),
                r('div',{style:{flex:1,minWidth:0}},
                  r('div',{style:{fontSize:10,color:c.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},ci.nom),
                  r('div',{style:{fontSize:8,color:c.muted,fontFamily:c.mono}},ci.calibreType+ci.calibre+'A · '+ci.section+'mm²')
                )
              ))
            )
          ),
          // Zones & interrupteurs
          r('div',{style:{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}},
            r('div',{style:{padding:'7px 12px',borderBottom:`1px solid ${c.bdr}`,fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.08em'}},'Zones & commandes'),
            r('div',{style:{flex:1,overflowY:'auto',padding:'4px 0'}},
              pInters.length===0&&pZones.length===0&&r('div',{style:{padding:'10px 12px',fontSize:11,color:c.muted,fontStyle:'italic'}},'Aucune commande'),
              ...pZones.map(z=>{
                const zInters=interrupteurs.filter(i=>i.zoneId===z.id);
                return r('div',{key:z.id,style:{padding:'5px 12px',marginBottom:1}},
                  r('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:3}},
                    r('span',{style:{display:'inline-flex',color:'#7c3aed'}},this.ico('zone_commande',11)),
                    r('span',{style:{fontSize:10,fontWeight:600,color:c.text}},z.nom),
                    z.zoneCode&&r('span',{style:{fontSize:8,fontFamily:c.mono,fontWeight:700,color:'#fff',background:'#7c3aed',borderRadius:3,padding:'1px 4px',marginLeft:2}},z.zoneCode)
                  ),
                  ...zInters.map(i=>r('div',{key:i.id,style:{paddingLeft:16,marginBottom:3,display:'flex',alignItems:'center',gap:4}},
                    r('span',{style:{fontFamily:c.mono,fontSize:9,fontWeight:700,color:'#0891b2',flex:1}},this.genInterCode(i,this.state)),
                    i.circuitRef&&r('span',{style:{fontSize:8,color:c.muted,fontFamily:c.mono}},i.circuitRef),
                    r('button',{
                      onClick:()=>this.openEdit('addInter',i,'interForm',{nom:i.nom||'',pieceId:i.pieceId?String(i.pieceId):'',type:i.type||'simple',circuitRef:i.circuitRef||'',zoneId:i.zoneId?String(i.zoneId):''}),
                      style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',padding:'1px 3px',fontSize:10,lineHeight:1,flexShrink:0}
                    },this.ico('pencil',9)),
                    r('button',{
                      onClick:()=>{this.deleteItem('interrupteurs',i.id);this.showToast('Interrupteur supprimé');},
                      style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',padding:'1px 3px',fontSize:10,lineHeight:1,flexShrink:0}
                    },'×')
                  ))
                );
              }),
              ...pInters.filter(i=>!i.zoneId).map(i=>r('div',{key:i.id,style:{padding:'4px 12px',display:'flex',alignItems:'center',gap:5}},
                r('span',{style:{fontFamily:c.mono,fontSize:9,fontWeight:700,color:'#0891b2',flex:1}},this.genInterCode(i,this.state)),
                i.circuitRef&&r('span',{style:{fontSize:8,color:c.muted,fontFamily:c.mono}},i.circuitRef),
                r('button',{
                  onClick:()=>this.openEdit('addInter',i,'interForm',{nom:i.nom||'',pieceId:i.pieceId?String(i.pieceId):'',type:i.type||'simple',circuitRef:i.circuitRef||'',zoneId:i.zoneId?String(i.zoneId):''}),
                  style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',padding:'1px 3px',fontSize:10,flexShrink:0}
                },this.ico('pencil',9)),
                r('button',{
                  onClick:()=>{this.deleteItem('interrupteurs',i.id);this.showToast('Supprimé');},
                  style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',padding:'1px 3px',fontSize:10,flexShrink:0}
                },'×')
              ))
            )
          )
        )
    );

    return r('div',{className:'cbt-logements',style:{display:'flex',height:'100%',overflow:'hidden'}},col1,col2,col3,col4);
  }

  TEMPLATES=[
    {name:'Tableau minimal',breakers:[{label:'Eclairage',calibre:16,courbe:'B',section:1.5},{label:'Prises',calibre:16,courbe:'C',section:2.5},{label:'Chauffe-eau',calibre:20,courbe:'C',section:2.5}]},
    {name:'Logement T2',breakers:[{label:'Eclairage',calibre:16,courbe:'B',section:1.5},{label:'Prises sejour',calibre:16,courbe:'C',section:2.5},{label:'Prises cuisine',calibre:20,courbe:'C',section:2.5},{label:'Cuisson',calibre:32,poles:2,courbe:'C',section:6},{label:'Lave-linge',calibre:20,courbe:'C',section:2.5},{label:'Chauffe-eau',calibre:20,courbe:'C',section:2.5},{label:'Salle de bain',calibre:16,courbe:'C',section:2.5}]},
    {name:'Logement T4',breakers:[{label:'Eclairage 1',calibre:16,courbe:'B',section:1.5},{label:'Eclairage 2',calibre:16,courbe:'B',section:1.5},{label:'Prises sejour',calibre:16,courbe:'C',section:2.5},{label:'Prises chambres',calibre:16,courbe:'C',section:2.5},{label:'Prises cuisine',calibre:20,courbe:'C',section:2.5},{label:'Cuisson',calibre:32,poles:2,courbe:'C',section:6},{label:'Lave-linge',calibre:20,courbe:'C',section:2.5},{label:'Lave-vaisselle',calibre:20,courbe:'C',section:2.5},{label:'Chauffe-eau',calibre:20,courbe:'C',section:2.5},{label:'Salle de bain',calibre:16,courbe:'C',section:2.5},{label:'VMC',calibre:2,courbe:'C',section:1.5}]},
    {name:'Maison T5 (chauffage elec)',breakers:[{label:'Eclairage RDC',calibre:16,courbe:'B',section:1.5},{label:'Eclairage etage',calibre:16,courbe:'B',section:1.5},{label:'Prises sejour',calibre:16,courbe:'C',section:2.5},{label:'Prises chambres',calibre:16,courbe:'C',section:2.5},{label:'Prises cuisine',calibre:20,courbe:'C',section:2.5},{label:'Cuisson',calibre:32,poles:2,courbe:'C',section:6},{label:'Lave-linge',calibre:20,courbe:'C',section:2.5},{label:'Lave-vaisselle',calibre:20,courbe:'C',section:2.5},{label:'Seche-linge',calibre:20,courbe:'C',section:2.5},{label:'Chauffe-eau',calibre:20,courbe:'C',section:2.5},{label:'Convecteurs RDC',calibre:20,courbe:'C',section:2.5},{label:'Convecteurs etage',calibre:20,courbe:'C',section:2.5},{label:'Salle de bain',calibre:16,courbe:'C',section:2.5},{label:'VMC',calibre:2,courbe:'C',section:1.5}]},
    {name:'Tertiaire triphase',breakers:[{label:'Eclairage bureaux',calibre:16,poles:1,courbe:'C',section:1.5},{label:'Eclairage circulation',calibre:16,poles:1,courbe:'C',section:1.5},{label:'Prises bureaux 1',calibre:20,poles:1,courbe:'C',section:2.5},{label:'Prises bureaux 2',calibre:20,poles:1,courbe:'C',section:2.5},{label:'Informatique ondulee',calibre:16,poles:1,courbe:'C',section:2.5},{label:'Climatisation',calibre:25,poles:3,courbe:'D',section:6},{label:'CTA / VMC',calibre:16,poles:3,courbe:'D',section:2.5},{label:'Chauffe-eau',calibre:20,poles:1,courbe:'C',section:2.5}]},
    {name:'Local commercial',breakers:[{label:'Eclairage vitrine',calibre:16,courbe:'C',section:1.5},{label:'Eclairage magasin',calibre:16,courbe:'C',section:1.5},{label:'Prises caisse',calibre:16,courbe:'C',section:2.5},{label:'Prises reserve',calibre:20,courbe:'C',section:2.5},{label:'Enseigne',calibre:10,courbe:'C',section:1.5},{label:'Climatisation',calibre:25,poles:3,courbe:'D',section:6},{label:'Chauffe-eau',calibre:20,courbe:'C',section:2.5}]}
  ];
  applyTemplate(tpl){
    this.setState(s=>{
      const newTeId=Math.max(0,...s.tableauxElec.map(t=>t.id))+1;const teIdx=s.tableauxElec.length+1;
      const newTE={id:newTeId,nom:tpl.name||'Tableau',type:'principal',appId:(s.appartements[0]&&s.appartements[0].id)||null,pieceId:null,code:teIdx+'TE'+teIdx,cb0Code:teIdx+'CB0'};
      let maxDj=Math.max(0,...s.disjoncteurs.map(d=>d.id));
      const newDjs=(tpl.breakers||[]).map((br,i)=>{maxDj++;return{id:maxDj,code:teIdx+'CB'+(i+1),nom:br.label||'',recepteurs:[],calibre:br.calibre||16,courbe:br.courbe||'C',poles:String(br.poles||1),ddr:br.ddr||30,section:br.section||2.5,tableauId:newTeId,rangee:br.rangee||1,ordre:i};});
      return{tableauxElec:[...s.tableauxElec,newTE],disjoncteurs:[...s.disjoncteurs,...newDjs],rangeeTeId:newTeId};
    });
    this.showToast('Gabarit « '+(tpl.name||'')+' » applique');
  }
  exportBoardTemplate(teId){
    try{
      const t=(this.state.tableauxElec||[]).find(x=>x.id===teId);if(!t){this.showToast('Aucun tableau');return;}
      const breakers=(this.state.disjoncteurs||[]).filter(d=>d.tableauId===teId).map(d=>({label:d.nom||'',calibre:d.calibre,courbe:d.courbe,ddr:d.ddr,section:d.section,poles:+d.poles||1}));
      const data={app:'Cebat',type:'board-template',name:t.nom||t.code||'Tableau',breakers};
      const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);
      const a=document.createElement('a');const slug=(t.nom||t.code||'tableau').replace(/[^a-z0-9]+/gi,'_').toLowerCase();a.href=url;a.download='cebat_gabarit_'+slug+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      this.showToast('Gabarit exporte');
    }catch(e){this.showToast('Echec export gabarit');}
  }
  importBoardTemplate(){
    const input=document.createElement('input');input.type='file';input.accept='application/json,.json';
    input.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onerror=()=>this.showToast('Erreur de lecture');reader.onload=ev=>{try{const d=JSON.parse(ev.target.result);const breakers=Array.isArray(d.breakers)?d.breakers:(Array.isArray(d)?d:null);if(!breakers){this.showToast('Gabarit invalide');return;}this.applyTemplate({name:d.name||'Tableau importe',breakers});}catch(err){this.showToast('JSON illisible');}};reader.readAsText(file);};
    input.click();
  }
  rangeesOf(teId){
    const djs=(this.state.disjoncteurs||[]).filter(d=>d.tableauId===teId).map(d=>({...d}));
    if(!djs.some(d=>d.rangee!=null)){
      const gmap={};djs.forEach(d=>{const k=(+d.ddr||0);(gmap[k]=gmap[k]||[]).push(d);});
      Object.keys(gmap).map(k=>+k).sort((a,b)=>(a||9999)-(b||9999)).forEach((k,gi)=>gmap[k].forEach((d,oi)=>{d.rangee=gi+1;d.ordre=oi;}));
    }
    const byR={};djs.forEach(d=>{const rr=d.rangee||1;(byR[rr]=byR[rr]||[]).push(d);});
    return Object.keys(byR).map(k=>+k).sort((a,b)=>a-b).map(rr=>({rangee:rr,brs:byR[rr].sort((a,b)=>(a.ordre||0)-(b.ordre||0))}));
  }
  compactRangees(teId){
    this.setState(s=>{const rows=this.rangeesOf(teId);const map={};rows.forEach((rw,i)=>{rw.brs.forEach((d,oi)=>{map[d.id]={rangee:i+1,ordre:oi};});});return{disjoncteurs:s.disjoncteurs.map(d=>map[d.id]?{...d,...map[d.id]}:d)};});
    this.showToast('Rangees compactees');
  }
  dropCb(cbId,targetRangee,beforeCbId){
    if(!cbId)return;
    this.setState(s=>{
      const src=(s.disjoncteurs||[]).find(d=>d.id===cbId);if(!src)return{};
      const teId=src.tableauId;
      const djs=s.disjoncteurs.map(d=>d.tableauId===teId?{...d}:d);
      const tdjs=djs.filter(d=>d.tableauId===teId);
      if(!tdjs.some(d=>d.rangee!=null)){
        const gmap={};tdjs.forEach(d=>{const k=(+d.ddr||0);(gmap[k]=gmap[k]||[]).push(d);});
        Object.keys(gmap).map(k=>+k).sort((a,b)=>(a||9999)-(b||9999)).forEach((k,gi)=>gmap[k].forEach((d,oi)=>{d.rangee=gi+1;d.ordre=oi;}));
      }
      const moved=djs.find(d=>d.id===cbId);moved.rangee=targetRangee;
      const row=tdjs.filter(d=>d.rangee===targetRangee&&d.id!==cbId).sort((a,b)=>(a.ordre||0)-(b.ordre||0));
      const idx=beforeCbId?row.findIndex(d=>d.id===beforeCbId):row.length;
      row.splice(idx<0?row.length:idx,0,moved);
      row.forEach((d,i)=>{d.ordre=i;});
      return{disjoncteurs:djs};
    });
  }
  vRangees(circuits){
    const s=this.state;const c=this.C;const r=this.r;const{tableauxElec,disjoncteurs}=s;const ROW=((s.project&&s.project.modulesParRangee)||13);
    const teId=s.rangeeTeId||(tableauxElec[0]&&tableauxElec[0].id)||null;
    const rows=teId?this.rangeesOf(teId):[];
    const cardW=p=>Math.max(36,p*24);
    const card=(d,rangee)=>{
      const okSec=this.sectionOkForCalibre(d.section,d.calibre);const col=okSec?'#16a34a':'#dc2626';const p=this._poles(d);
      return r('div',{key:d.id,draggable:true,
        onDragStart:()=>this.setState({dragCb:d.id}),
        onDragOver:e=>e.preventDefault(),
        onDrop:e=>{e.preventDefault();e.stopPropagation();const dc=this.state.dragCb;if(dc&&dc!==d.id)this.dropCb(dc,rangee,d.id);this.setState({dragCb:null,dragOverCb:null});},
        onDragEnter:e=>{e.preventDefault();if(this.state.dragCb&&this.state.dragCb!==d.id)this.setState({dragOverCb:d.id});},
        title:'Glisser pour deplacer',
        style:{width:cardW(p),height:56,background:col+'14',border:'1px solid '+col,borderRadius:6,outline:this.state.dragOverCb===d.id?'2px dashed '+c.accent:'none',outlineOffset:'1px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'grab',flexShrink:0,padding:'2px'}},
        r('div',{style:{fontSize:9,fontWeight:800,color:col,fontFamily:c.mono,textAlign:'center'}},d.code||('CB'+d.id)),
        r('div',{style:{fontSize:7,color:c.muted,fontFamily:c.mono}},(d.calibre||'?')+'A'+(d.courbe||'')),
        r('div',{style:{fontSize:7,color:c.muted}},p+'M'));
    };
    const rowEl=(row)=>{
      const used=row.brs.reduce((a,d)=>a+this._poles(d),0)+2;const over=used>ROW;
      return r('div',{key:row.rangee,className:'cbt-card',onDragOver:e=>e.preventDefault(),onDrop:e=>{e.preventDefault();const dc=this.state.dragCb;if(dc)this.dropCb(dc,row.rangee,null);this.setState({dragCb:null,dragOverCb:null});},
        style:{border:'1px solid '+(over?c.danger:c.bdr2),borderRadius:11,padding:'8px 10px',marginBottom:10,background:c.surf,boxShadow:c.elev1}},
        r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:6}},
          r('span',{style:{fontSize:11,fontWeight:800,color:c.accent}},'Rangee '+row.rangee),
          r('span',{style:{fontSize:9,fontFamily:c.mono,color:over?c.danger:c.muted}},used+'/'+ROW+' modules'+(over?' — surcharge':''))),
        r('div',{style:{display:'flex',gap:6,flexWrap:'wrap',minHeight:56,alignItems:'center'}},
          r('div',{style:{width:30,height:56,borderRadius:6,background:'#06b6d414',border:'1px solid #06b6d4',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:700,color:'#0e7490',flexShrink:0}},'ID'),
          ...row.brs.map(d=>card(d,row.rangee)),
          row.brs.length===0?r('span',{style:{fontSize:10,color:c.muted,fontStyle:'italic'}},'(deposer ici)'):null));
    };
    const maxR=rows.reduce((m,r2)=>Math.max(m,r2.rangee),0);
    const tbtn={padding:'4px 9px',borderRadius:6,fontSize:10,fontWeight:700,border:'1px solid '+c.accent,background:'rgba(2,119,189,.08)',color:c.accent,cursor:'pointer',fontFamily:c.font};
    const lib=r('div',{style:{display:'flex',flexWrap:'wrap',gap:8,alignItems:'center',marginBottom:14,padding:'10px 12px',background:c.surf3,borderRadius:9,border:'1px solid '+c.bdr2}},
      r('span',{style:{fontSize:10,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em'}},'Bibliotheque de gabarits'),
      ...this.TEMPLATES.map((tpl,k)=>r('button',{key:k,onClick:()=>this.applyTemplate(tpl),title:tpl.breakers.length+' disjoncteurs',style:tbtn},'+ '+tpl.name)),
      r('span',{style:{flex:1}}),
      teId?this.Btn('Exporter ce tableau',()=>this.exportBoardTemplate(teId),'sec','sm'):null,
      this.Btn('Importer JSON',()=>this.importBoardTemplate(),'sec','sm'));
    const _tri=((s.project&&s.project.typeAlim)||'')==='triphase';
    const phasePanel=(_tri&&teId)?(()=>{const pa=this.phaseAssign();const tdjs=(disjoncteurs||[]).filter(d=>d.tableauId===teId);const cc={1:'#6d4c41',2:'#212121',3:'#9e9e9e'};const pw=p2=>tdjs.filter(d=>pa.map[d.id]===p2).reduce((a,d)=>{let w=0;try{w=this.calcDjPower(d,s.pieces||[]);}catch(e){}return a+w;},0);
      return r('div',{style:{marginBottom:14}},
        r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}},r('span',{style:{fontSize:10,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em'}},'Repartition des phases (glisser-deposer)'),this.Btn('Equilibrer auto',()=>this.autoBalancePhases(),'sec','sm')),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}},
          ...[1,2,3].map(p2=>r('div',{key:p2,onDragOver:e=>e.preventDefault(),onDrop:e=>{e.preventDefault();const dc=this.state.dragCb;if(dc)this.dropPhase(dc,p2);this.setState({dragCb:null});},style:{border:'1px solid '+cc[p2],borderRadius:8,padding:'8px',minHeight:64,background:cc[p2]+'0d'}},
            r('div',{style:{fontSize:11,fontWeight:800,color:cc[p2],marginBottom:6,fontFamily:c.mono}},'L'+p2+' · '+(pw(p2)/1000).toFixed(1)+'kW'),
            r('div',{style:{display:'flex',flexWrap:'wrap',gap:4}},
              ...tdjs.filter(d=>pa.map[d.id]===p2).map(d=>r('div',{key:d.id,draggable:true,onDragStart:()=>this.setState({dragCb:d.id}),title:'Glisser vers une autre phase',style:{fontSize:9,fontFamily:c.mono,fontWeight:700,padding:'3px 6px',borderRadius:5,background:c.surf,border:'1px solid '+c.bdr2,cursor:'grab'}},d.code||('CB'+d.id))))))));
    })():null;
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease',overflowY:'auto',height:'100%'}},
      this.SH('Composition du tableau','Glisser-deposer les disjoncteurs entre rangees (1 rangee = '+ROW+' modules, ID compris)',r('div',{style:{display:'flex',alignItems:'center',gap:8}},r('div',{style:{display:'flex',alignItems:'center',gap:5}},r('span',{style:{fontSize:10,color:c.muted}},'Modules/rangee'),r('select',{value:String(ROW),onChange:e=>this.setState(st=>({project:{...st.project,modulesParRangee:+e.target.value}})),style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'4px 7px',fontSize:11,color:c.text,outline:'none'}},...[12,13,18,24].map(n=>r('option',{key:n,value:String(n)},n)))),teId?this.Btn('Compacter',()=>this.compactRangees(teId),'sec','sm'):null)),
      tableauxElec.length>1?r('div',{style:{display:'flex',gap:6,marginBottom:14,flexWrap:'wrap'}},...tableauxElec.map(t=>r('button',{key:t.id,onClick:()=>this.setState({rangeeTeId:t.id}),style:{padding:'5px 12px',borderRadius:7,fontSize:11,fontWeight:t.id===teId?700:400,border:'1px solid '+(t.id===teId?c.accent:c.bdr2),background:t.id===teId?'rgba(2,119,189,.1)':'transparent',color:t.id===teId?c.accent:c.text2,cursor:'pointer'}},t.code||t.nom))):null,
      lib,phasePanel,
      rows.length===0?r('div',{style:{fontSize:12,color:c.muted,padding:'16px 0'}},'Aucun disjoncteur dans ce tableau.'):r('div',null,...rows.map(rowEl)),
      r('div',{onDragOver:e=>e.preventDefault(),onDrop:e=>{e.preventDefault();const dc=this.state.dragCb;if(dc)this.dropCb(dc,maxR+1,null);this.setState({dragCb:null,dragOverCb:null});},
        style:{border:'2px dashed '+c.bdr3,borderRadius:9,padding:'14px',textAlign:'center',fontSize:11,color:c.muted,cursor:'copy',marginTop:4}},'+ Deposer ici pour creer une nouvelle rangee'),
      (()=>{const g=this.gtlDimensions();return r('div',{className:'cbt-card',style:{marginTop:14,background:c.surf,border:'1px solid '+c.bdr,borderRadius:12,padding:'12px 16px',boxShadow:c.elev1}},
        r('div',{style:{fontSize:11,fontWeight:800,color:c.text,marginBottom:8}},'GTL / ETEL — dimensionnement indicatif'),
        r('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}},
          ...[['Modules utilises',g.usedModules],['Rangees tableau',g.rangees],['+ Rangee comm. VDI',g.rowsComm],['Reserve','~'+g.reservePct+'%'],['Largeur ETEL',g.etelWidth+' mm'],['Profondeur ETEL',g.etelDepth+' mm'],['Hauteur indicative',g.heightMM+' mm'],['Rangees totales',g.rowsTotal]].map((x,k)=>r('div',{key:k},r('div',{style:{fontSize:9,color:c.muted,textTransform:'uppercase',letterSpacing:'.04em'}},x[0]),r('div',{style:{fontSize:15,fontWeight:800,color:c.accent,fontFamily:c.mono}},String(x[1]))))),
        r('div',{style:{fontSize:9,color:c.muted,marginTop:8,fontStyle:'italic'}},'ETEL 600×200 mm mini (NF C 15-100) · prevoir une rangee pour la GTL communication (VDI) et 20% de reserve.'));})(),
      (()=>{const v=this.vdiSummary();return r('div',{className:'cbt-card',style:{marginTop:14,background:c.surf,border:'1px solid '+c.bdr,borderRadius:12,padding:'12px 16px',boxShadow:c.elev1}},
        r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:8,flexWrap:'wrap'}},
          r('div',{style:{fontSize:11,fontWeight:800,color:c.text}},'Réseau VDI / communication'),
          r('div',{style:{flex:1}}),
          r('span',{style:{fontSize:9,color:c.muted}},'Grade'),
          r('select',{value:String(v.grade),onChange:e=>this.setState(st=>({project:{...st.project,gradeVDI:+e.target.value}})),style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'4px 7px',fontSize:11,color:c.text,outline:'none'}},...[['1','Grade 1'],['2','Grade 2 TV'],['3','Grade 3']].map(x=>r('option',{key:x[0],value:x[0]},x[1])))),
        r('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}},
          ...[['Socles RJ45',v.rj45],['Prises TV',v.tv],['Mini conseillé',v.minRj45],['Brassage coffret',v.brassage+' ports']].map((x,k)=>r('div',{key:k},r('div',{style:{fontSize:9,color:c.muted,textTransform:'uppercase',letterSpacing:'.04em'}},x[0]),r('div',{style:{fontSize:15,fontWeight:800,color:c.accent,fontFamily:c.mono}},String(x[1]))))),
        r('div',{style:{fontSize:10,color:v.ok?c.success:c.warn,marginTop:8,fontWeight:600}},(v.ok?'✓ ':'⚠ ')+v.gradeLabel+(v.ok?'':' — prévoir au moins '+v.minRj45+' socles RJ45 (1 par pièce principale).')),
        r('div',{style:{fontSize:9,color:c.muted,marginTop:4,fontStyle:'italic'}},'Coffret de communication (DTI + répartiteur) dans la GTL · Grade 2 TV minimum recommandé en logement neuf.'));})());
  }
  renderBoitesRaccord(){
    const s=this.state;const c=this.C;const r=this.r;const{boitesDeriv,pieces,disjoncteurs,tableauxElec}=s;
    if(!boitesDeriv||boitesDeriv.length===0)return null;
    const refPiece={};pieces.forEach(p=>(p.fonctions||[]).forEach(fn=>{refPiece[fn.ref]=p.nom;}));
    const teCode=id=>{const t=tableauxElec.find(x=>x.id===id);return t?(t.code||t.nom||''):'';};
    return r('div',{style:{marginTop:16}},this.Card('Boites de derivation — raccordements internes',
      r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
        ...boitesDeriv.map(bd=>{
          let bdCode=bd.nom;try{bdCode=this.genBDCode?this.genBDCode(bd,s):bd.nom;}catch(e){}
          const served=[];pieces.forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.departType==='boite'&&String(fn.departId)===String(bd.id))served.push(fn.ref);}));
          let feeder='';for(const rf of served){const dj=disjoncteurs.find(d=>(d.recepteurs||[]).includes(rf));if(dj){feeder=dj.code;break;}}
          if(!feeder)feeder=teCode(bd.tableauId);
          const pc=(pieces.find(p=>p.id===bd.pieceId)||{}).nom||'';
          const conn=Math.max(served.length+1,2);
          return r('div',{key:bd.id,style:{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',padding:'8px 0',borderBottom:'1px solid '+c.bdr}},
            r('div',{style:{border:'1px solid '+c.accent+'66',borderRadius:6,padding:'5px 9px',background:c.accent+'10',fontSize:10,fontFamily:c.mono,color:c.accent,fontWeight:700}},feeder||'TE'),
            r('span',{style:{color:c.bdr3,fontSize:13}},'→'),
            r('div',{style:{border:'1px solid '+c.cyan+'66',borderRadius:8,padding:'6px 11px',background:c.cyan+'14',minWidth:130}},
              r('div',{style:{fontSize:11,fontWeight:800,color:c.cyan,fontFamily:c.mono}},(bdCode||'BD')+(bd.label?' · '+bd.label:'')),
              r('div',{style:{fontSize:8,color:c.muted}},(pc?pc+' · ':'')+(({encastre:'Encastree',saillie:'Saillie',etanche:'IP55',plafond:'DCL'}[bd.type]||bd.type||''))+' · '+conn+' connexions')),
            r('span',{style:{color:c.bdr3,fontSize:13}},'→'),
            r('div',{style:{display:'flex',flexWrap:'wrap',gap:4}},
              served.length===0?r('span',{style:{fontSize:10,color:c.muted,fontStyle:'italic'}},'(aucun depart routé)'):null,
              ...served.map(rf=>r('span',{key:rf,style:{fontSize:9,fontFamily:c.mono,padding:'2px 6px',borderRadius:5,background:c.surf3,border:'1px solid '+c.bdr2,color:c.text2}},rf+(refPiece[rf]?' '+refPiece[rf]:'')))));
        }))));
  }
  renderMultifilaire(){
    const s=this.state;const c=this.C;const r=this.r;const{tableauxElec,disjoncteurs,pieces}=s;
    const refPiece={};pieces.forEach(p=>(p.fonctions||[]).forEach(fn=>{refPiece[fn.ref]=p.nom;}));
    const wire=(lbl,col,sec)=>r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:2}},
      r('span',{style:{width:24,fontSize:8,fontWeight:700,color:col==='grad'?'#43a047':col,fontFamily:c.mono}},lbl),
      r('div',{style:{flex:1,height:4,borderRadius:2,background:col==='grad'?'repeating-linear-gradient(45deg,#43a047 0 4px,#fdd835 4px 8px)':col}}),
      r('span',{style:{fontSize:8,color:c.muted,fontFamily:c.mono}},sec));
    return r('div',{style:{display:'flex',flexDirection:'column',gap:14}},
      tableauxElec.length===0?r('div',{style:{fontSize:12,color:c.muted}},'Aucun tableau'):null,
      ...tableauxElec.map(te=>{
        const djs=disjoncteurs.filter(d=>d.tableauId===te.id);
        return r('div',{key:te.id,style:{border:'1px solid '+c.bdr2,borderRadius:10,background:c.surf,overflow:'hidden',boxShadow:'0 1px 4px '+c.shadow}},
          r('div',{style:{padding:'10px 14px',background:c.surf3,borderBottom:'1px solid '+c.bdr,fontSize:12,fontWeight:700,color:c.accent,fontFamily:c.mono}},(te.code||'TE')+' — '+(te.nom||'')),
          r('div',{style:{padding:'8px 14px',display:'flex',flexDirection:'column'}},
            djs.length===0?r('div',{style:{fontSize:11,color:c.muted,fontStyle:'italic',padding:'6px 0'}},'Aucun disjoncteur'):null,
            ...djs.map(d=>{
              const np=this._poles(d);const isTri=np>=3;const sec=(d.section||1.5)+'mm2';const okSec=this.sectionOkForCalibre(d.section,d.calibre);const col=okSec?'#16a34a':'#dc2626';
              const refs=(d.recepteurs||[]);const room=refs.map(rf=>refPiece[rf]).filter(Boolean)[0]||'';
              const phs=isTri?[['L1','#6d4c41'],['L2','#212121'],['L3','#9e9e9e']]:[['L','#6d4c41']];
              const conductors=[...phs,['N','#42a5f5'],['PE','grad']];
              let wc='';try{wc=this.genCableCBCode(d,s);}catch(e){}
              return r('div',{key:d.id,style:{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid '+c.bdr}},
                r('div',{style:{minWidth:120}},r('div',{style:{fontSize:11,fontWeight:800,color:col,fontFamily:c.mono}},d.code||('CB'+d.id)),r('div',{style:{fontSize:9,color:c.muted}},(d.calibre||'?')+'A '+(d.courbe||'')),wc?r('div',{style:{fontSize:8,color:c.purple,fontFamily:c.mono,fontWeight:700}},wc):null,r('div',{style:{display:'flex',alignItems:'center',gap:4,marginTop:2}},r('input',{type:'number',min:0,step:1,value:d.longueur||'',placeholder:'L m',onChange:e=>{const v=+e.target.value;this.setState(st=>({disjoncteurs:st.disjoncteurs.map(x=>x.id===d.id?{...x,longueur:(Number.isFinite(v)&&v>0)?v:undefined}:x)}));},title:'Longueur du circuit (m)',style:{width:42,fontSize:8,padding:'1px 3px',border:'1px solid '+c.bdr2,borderRadius:3,background:c.surf3,color:c.text,outline:'none'}}),(()=>{const v=this.voltageDropOf(d);const lim=this._circuitIsEcl(d)?3:5;return r('span',{style:{fontSize:8,fontFamily:c.mono,fontWeight:700,color:v.pctCumul>lim?c.danger:c.muted},title:(v.est?'longueur estimee. ':'')+'cumulee = amont '+v.pctMain.toFixed(1)+'% + circuit '+v.pct.toFixed(1)+'% (limite '+lim+'%)'},'ΔU '+v.pctCumul.toFixed(1)+'%');})(),
                  (()=>{const v=this.voltageDropOf(d);const lim=this._circuitIsEcl(d)?3:5;if(v.pctCumul<=lim)return null;const rec=this.recommendedSection(d);if(rec.pct==null||!(rec.S>v.S))return null;return r('button',{onClick:()=>{this.setState(st=>({disjoncteurs:st.disjoncteurs.map(x=>x.id===d.id?{...x,section:String(rec.S)}:x)}));},title:'Appliquer la section conseillee ('+rec.pct.toFixed(1)+'% cumule)',style:{fontSize:8,fontFamily:c.mono,fontWeight:700,color:'#fff',background:c.purple,border:'none',borderRadius:3,padding:'1px 4px',cursor:'pointer'}},'→'+rec.S);})())),
                r('div',{style:{flex:1,maxWidth:300}},...conductors.map(x=>wire(x[0],x[1],sec))),
                r('div',{style:{minWidth:130,fontSize:10,color:c.text2,fontFamily:c.mono}},(refs.join(' ')||'(aucun)')+(room?' · '+room:'')));
            })));
      }));
  }
  _nomencTabsBar(){
    const c=this.C;const r=this.r;const v=this.state.nomencView||'table';
    const b=(id,lbl)=>r('button',{onClick:()=>this.setState({nomencView:id}),style:{padding:'6px 14px',borderRadius:7,fontSize:12,fontWeight:v===id?700:400,cursor:'pointer',border:'1px solid '+(v===id?c.accent:c.bdr2),background:v===id?'rgba(2,119,189,.1)':'transparent',color:v===id?c.accent:c.text2,fontFamily:c.font}},lbl);
    return r('div',{style:{display:'flex',gap:6,marginBottom:14}},b('table','Tableau'),b('cable','Vue Câble'));
  }
  POSE_STATES=[{k:'',l:'À poser',col:'#94a3b8'},{k:'pose',l:'Posé ✓',col:'#16a34a'},{k:'nc',l:'Anomalie ✗',col:'#dc2626'}];
  _poseState(key){const v=((this.state.poseStatuts||{})[key])||'';return this.POSE_STATES.find(x=>x.k===v)||this.POSE_STATES[0];}
  _fmtStamp(iso){if(!iso)return'';try{const d=new Date(iso);const p=n=>String(n).padStart(2,'0');return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear()+' '+p(d.getHours())+':'+p(d.getMinutes());}catch(e){return'';}}
  _cyclePose(key){
    const cur=((this.state.poseStatuts||{})[key])||'';const i=this.POSE_STATES.findIndex(x=>x.k===cur);const next=this.POSE_STATES[(i+1)%this.POSE_STATES.length].k;
    let at='';try{at=new Date().toISOString();}catch(e){}
    this.setState(s=>{const pm={...(s.poseMeta||{})};if(next)pm[key]={at,by:(s.poseOperator||'').trim()};else delete pm[key];return{poseStatuts:{...(s.poseStatuts||{}),[key]:next},poseMeta:pm};});
  }
  poseProgress(){
    const s=this.state;const ps=s.poseStatuts||{};const perTe=[];const allKeys=new Set();
    (s.tableauxElec||[]).forEach(te=>{const d=this._vueCableData('te',te.id);const cables=[...d.entrants,...d.sortants];
      let done=0,nc=0;cables.forEach(cb=>{const v=ps[cb.statutKey]||'';if(v==='pose')done++;else if(v==='nc')nc++;allKeys.add(cb.statutKey);});
      perTe.push({code:(d.center&&d.center.code)||te.code||('TE'+te.id),nom:te.nom||'',total:cables.length,done,nc,pct:cables.length?Math.round(done/cables.length*100):0});});
    (s.boitesDeriv||[]).forEach(bd=>{const d=this._vueCableData('bd',bd.id);[...d.entrants,...d.sortants].forEach(cb=>allKeys.add(cb.statutKey));});
    let total=0,done=0,nc=0;allKeys.forEach(k=>{total++;const v=ps[k]||'';if(v==='pose')done++;else if(v==='nc')nc++;});
    return{perTe,total,done,nc,pct:total?Math.round(done/total*100):0};
  }
  poseProgressByPiece(){
    const s=this.state;const ps=s.poseStatuts||{};
    const refPieceId={};(s.pieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.ref)refPieceId[fn.ref]=p.id;}));
    const acc={};const add=(pid,key)=>{if(pid==null)return;const a=acc[pid]=acc[pid]||{total:0,done:0,nc:0};a.total++;const v=ps[key]||'';if(v==='pose')a.done++;else if(v==='nc')a.nc++;};
    (s.disjoncteurs||[]).forEach(d=>{[...new Set((d.recepteurs||[]).map(rf=>refPieceId[rf]).filter(x=>x!=null))].forEach(pid=>add(pid,'dj'+d.id));});
    (s.pieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.departType==='boite')add(p.id,'fn'+fn.id);}));
    const pieces=(s.pieces||[]).filter(p=>acc[p.id]).map(p=>{const a=acc[p.id];const ap=(s.appartements||[]).find(x=>x.id===p.appId);return{nom:p.nom,appNom:ap?ap.nom:'',appId:p.appId,total:a.total,done:a.done,nc:a.nc,pct:a.total?Math.round(a.done/a.total*100):0};});
    const byApp={};pieces.forEach(p=>{const k=p.appId==null?'_':p.appId;const b=byApp[k]=byApp[k]||{nom:p.appNom||'—',total:0,done:0,nc:0};b.total+=p.total;b.done+=p.done;b.nc+=p.nc;});
    const apps=Object.keys(byApp).map(k=>{const b=byApp[k];return{nom:b.nom,total:b.total,done:b.done,nc:b.nc,pct:b.total?Math.round(b.done/b.total*100):0};});
    return{pieces,apps};
  }
  exportPoseCSV(){
    try{
      const s=this.state;const ps=s.poseStatuts||{};const pm=s.poseMeta||{};
      const esc=v=>{const t=v==null?'':String(v);return /[";\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t;};
      const stLbl=k=>(this.POSE_STATES.find(x=>x.k===(ps[k]||''))||this.POSE_STATES[0]).l;
      const rows=[['Cle','Equipement','Sens','Repere cable','Tenant','Aboutissant','Section','Bornes','Statut pose','Pose par','Pose le'].join(';')];
      const seen=new Set();
      const emit=(cc,dir,cab)=>{if(seen.has(cab.statutKey))return;seen.add(cab.statutKey);const m=pm[cab.statutKey]||{};rows.push([cab.statutKey,cc,dir,cab.wcode,cab.from,cab.to,cab.sec,cab.bornes,stLbl(cab.statutKey),m.by||'',m.at?this._fmtStamp(m.at):''].map(esc).join(';'));};
      (s.tableauxElec||[]).forEach(te=>{const d=this._vueCableData('te',te.id);const cc=(d.center&&d.center.code)||'';d.entrants.forEach(cb=>emit(cc,'Entrant',cb));d.sortants.forEach(cb=>emit(cc,'Sortant',cb));});
      (s.boitesDeriv||[]).forEach(bd=>{const d=this._vueCableData('bd',bd.id);const cc=(d.center&&d.center.code)||'';d.entrants.forEach(cb=>emit(cc,'Entrant',cb));d.sortants.forEach(cb=>emit(cc,'Sortant',cb));});
      const pp=this.poseProgress();rows.push('');rows.push([';;;;;;;TOTAL : posés '+pp.done+'/'+pp.total+' ('+pp.pct+'%)'+(pp.nc?' · '+pp.nc+' anomalie(s)':'')].join(''));
      this._downloadBlob('﻿'+rows.join('\r\n'),'text/csv;charset=utf-8','cebat_pose_'+this._slug()+'.csv');this.showToast('État de pose exporté (CSV)');
    }catch(e){this.showToast('Echec export pose');}
  }
  renderPoseCard(){
    const c=this.C;const r=this.r;const pp=this.poseProgress();
    if(pp.total===0)return null;
    const bar=(pct,col)=>r('div',{style:{height:7,background:c.bdr2,borderRadius:4,overflow:'hidden'}},r('div',{style:{height:'100%',width:Math.min(100,pct)+'%',background:col,borderRadius:4}}));
    const grpRow=(t,k)=>r('div',{key:k,style:{marginBottom:7}},
      r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:2}},
        r('span',{style:{color:c.text}},t.label),
        r('span',{style:{fontFamily:c.mono,color:c.muted}},t.done+'/'+t.total+' · '+t.pct+'%'+(t.nc?' · '+t.nc+' NC':''))),
      bar(t.pct,t.nc?c.warn:c.accent));
    const grp=(title,items)=>{if(!items.length)return null;return r('div',{style:{marginTop:10}},r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:5}},title),...items.map(grpRow));};
    const pbp=this.poseProgressByPiece();
    const teItems=pp.perTe.map(t=>({label:t.code+(t.nom?' · '+t.nom:''),done:t.done,total:t.total,nc:t.nc,pct:t.pct}));
    const appItems=pbp.apps.map(a=>({label:a.nom,done:a.done,total:a.total,nc:a.nc,pct:a.pct}));
    const pieceItems=pbp.pieces.map(p=>({label:(p.appNom?p.appNom+' · ':'')+p.nom,done:p.done,total:p.total,nc:p.nc,pct:p.pct}));
    return r('div',{style:{marginTop:14}},this.Card('Avancement du câblage (pose)',r('div',{style:{paddingTop:2}},
      r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}},
        r('span',{style:{fontSize:12,color:c.text2}},pp.done+' / '+pp.total+' câbles posés'+(pp.nc?' · '+pp.nc+' anomalie(s)':'')),
        r('span',{style:{fontSize:14,fontWeight:800,color:pp.pct>=100?c.success:c.accent,fontFamily:c.mono}},pp.pct+'%')),
      bar(pp.pct,pp.nc?c.warn:'linear-gradient(90deg,#0277BD,#0EA5E9)'),
      teItems.length>1?grp('Par tableau',teItems):null,
      appItems.length>1?grp('Par appartement',appItems):null,
      pieceItems.length?grp('Par pièce',pieceItems):null
    ),this.Btn('⤓ CSV',()=>this.exportPoseCSV(),'sec','sm')));
  }
  _condsFor(poles){return poles>=3?[['L1','#6d4c41'],['L2','#212121'],['L3','#9e9e9e'],['N','#42a5f5'],['PE','grad']]:[['L','#6d4c41'],['N','#42a5f5'],['PE','grad']];}
  // Numéro de bloc de raccordement d'un équipement (TE puis BD) → X1, X2...
  _raccordBlock(el){
    if(!el)return 1;
    const tes=this.state.tableauxElec||[];const bds=this.state.boitesDeriv||[];
    let i=tes.findIndex(t=>t.id===el.id);if(i>=0)return i+1;
    i=bds.findIndex(b=>b.id===el.id);if(i>=0)return tes.length+i+1;
    return el.raccordIdx||1;
  }
  // Repère de borne d'un conducteur sur un équipement à raccordement (bornier X / connecteur W / répartiteur R).
  // Le PE n'a pas de repère (tous raccordés ensemble). condKeys = liste des conducteurs du câble.
  _borneOf(el,conductor,condKeys){
    if(conductor==='PE')return 'PE';
    if(!el||el.id==null)return conductor;
    const rt=el.raccordType||'connecteur';
    if(rt==='bornier'){
      // Bornier : un repère par fil, numéroté par bloc d'équipement (X1 tableau, X2 boîte…)
      const block=this._raccordBlock(el);
      const nonPE=(condKeys||[]).filter(k=>k!=='PE');
      const seq=nonPE.indexOf(conductor);
      return 'X'+block+'.'+(seq>=0?seq+1:1);
    }
    // Connecteur / répartiteur : un connecteur PAR potentiel (toutes bornes en court-circuit).
    // W1 = phase, W2 = neutre, W3 = retour, W4 = navette 1, W5 = navette 2, etc.
    const pfx=rt==='repartiteur'?'R':'W';
    const POT={L:1,L1:1,N:2,NAV:3,Nv:3,CMD:3,NAV1:4,NAV2:5,L2:6,L3:7,NAVB:8,'BUS+':9,'BUS-':10};
    return pfx+(POT[conductor]||1)+'.1';
  }
  // Repère de borne pour une extrémité de câble (Vue Câble) : équipement à raccordement, borne d'appareil, ou récepteur.
  _endBorne(cond,el,devCode,condKeys){
    if(cond==='PE')return 'PE';
    if(el)return this._borneOf(el,cond,condKeys);
    if(devCode)return devCode+'.'+cond;
    return cond;
  }
  // Numérotation « avec état » des bornes d'un équipement (TE/BD). Un connecteur regroupe un potentiel :
  // chaque fil qui s'y raccorde occupe une borne court-circuitée distincte, d'où W3.1 puis W3.2, navettes W4.1/W4.2…
  // Retourne { statutKey: { conducteur: repère } }. Résultat commun aux vues Tableau et Câble.
  _equipTermMap(el){
    if(!el||el.id==null)return {};
    this._tmCache=this._tmCache||{};
    const tes=this.state.tableauxElec||[];const bds=this.state.boitesDeriv||[];
    const kind=tes.indexOf(el)>=0?'te':(bds.indexOf(el)>=0?'bd':(bds.some(b=>b.id===el.id)?'bd':'te'));
    const ckey=kind+':'+el.id;
    if(this._tmCache[ckey])return this._tmCache[ckey];
    const d=this._vueCableData(kind,el.id);
    // Ordre déterministe : d'abord les interrupteurs (sortants), puis les autres récepteurs, puis les entrants.
    // Ainsi l'interrupteur prend le retour W3.1 et la lampe le W3.2 (bornes court-circuitées du même connecteur).
    const sortSw=d.sortants.filter(cb=>cb.edit&&cb.edit.type==='inter');
    const sortOther=d.sortants.filter(cb=>!(cb.edit&&cb.edit.type==='inter'));
    const ordered=[...sortSw,...sortOther,...d.entrants];
    const rt=el.raccordType||'connecteur';
    const map={};
    if(rt==='bornier'){
      // Bornier : un repère unique et séquentiel par fil (hors PE), numéroté par bloc d'équipement.
      const block=this._raccordBlock(el);let n=0;
      ordered.forEach(cb=>{if(cb.bTel!==el&&cb.bAel!==el)return;const mm=map[cb.statutKey]||{};(cb.conds||[]).forEach(x=>{const cond=x[0];if(cond==='PE'){mm[cond]='PE';return;}mm[cond]='X'+block+'.'+(++n);});map[cb.statutKey]=mm;});
    } else {
      // Connecteur / répartiteur : un potentiel par connecteur, une borne (rang) par fil raccordé.
      const pfx=rt==='repartiteur'?'R':'W';
      const POT={L:1,L1:1,N:2,NAV:3,Nv:3,CMD:3,NAV1:4,NAV2:5,L2:6,L3:7,NAVB:8,'BUS+':9,'BUS-':10};
      const counts={};
      ordered.forEach(cb=>{if(cb.bTel!==el&&cb.bAel!==el)return;const mm=map[cb.statutKey]||{};(cb.conds||[]).forEach(x=>{const cond=x[0];if(cond==='PE'){mm[cond]='PE';return;}const pot=POT[cond]||1;counts[pot]=(counts[pot]||0)+1;mm[cond]=pfx+pot+'.'+counts[pot];});map[cb.statutKey]=mm;});
    }
    this._tmCache[ckey]=map;
    return map;
  }
  _vueCableData(kind,id){
    const s=this.state;const entrants=[],sortants=[];
    const teCode=t=>{try{return this.genTECode(t,s);}catch(e){return t.code||('TE'+t.id);}};
    const bdCode=b=>{try{return this.genBDCode(b,s);}catch(e){return b.nom||('BD'+b.id);}};
    const refPiece={};(s.pieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{refPiece[fn.ref]=p.nom;}));
    const fnByRef={};(s.pieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{fnByRef[fn.ref]={fn,piece:p};}));
    const triAlim=((s.project&&s.project.typeAlim)||'')==='triphase';
    if(kind==='te'){
      const te=(s.tableauxElec||[]).find(t=>t.id===id);if(!te)return{entrants,sortants,center:null};
      const center={code:teCode(te),nom:te.nom||'',type:'TE'};
      const tePiece=((s.pieces||[]).find(p=>p.id===te.pieceId)||{}).nom||'';
      const parentTe=(s.tableauxElec||[]).find(t=>t.id===te.departId);
      if(parentTe){entrants.push({wcode:'',from:teCode(parentTe)+(parentTe.nom?' '+parentTe.nom:''),to:center.code,conds:this._condsFor(triAlim?3:1),sec:(te.feederSection||'?')+'mm²',bornes:(te.cb0Code||'CB0'),borneT:(parentTe.cb0Code||''),borneA:(te.cb0Code||'CB0'),bTel:null,bAel:null,pieceT:(((s.pieces||[]).find(p=>p.id===parentTe.pieceId)||{}).nom||tePiece),pieceA:tePiece,edit:{type:'te',id:te.id},statutKey:'te'+te.id+'feed'});}
      else{const dep=(s.departs||[]).find(d=>d.id===te.departId)||(s.departs||[]).find(d=>d.type==='comptage');if(dep){let sc='';try{sc=this.genSourceCode(dep,s);}catch(e){sc=dep.code||'SRC';}const tri=dep.tension==='tri'||dep.tension==='tri_it'||(+dep.poles>=3);entrants.push({wcode:dep.dbCode||'DB',from:sc+(dep.nom?' '+dep.nom:''),to:center.code,conds:this._condsFor(tri?3:1),sec:(dep.section||'16')+'mm²',bornes:(te.cb0Code||'CB0'),borneT:(dep.dbCode||'DB'),borneA:(te.cb0Code||'CB0'),bTel:null,bAel:null,pieceT:(((s.pieces||[]).find(p=>p.id===dep.pieceId)||{}).nom||tePiece),pieceA:tePiece,edit:{type:'dep',id:dep.id},statutKey:'dep'+dep.id+'te'+te.id});}}
      (s.disjoncteurs||[]).filter(d=>d.tableauId===te.id).forEach(d=>{
        const refs=d.recepteurs||[];const room=refs.map(rf=>refPiece[rf]).filter(Boolean)[0]||'';
        let wc='';try{wc=this.genCableCBCode(d,s);}catch(e){}
        const bdIds=[];const directRefs=[];
        refs.forEach(rf=>{const e=fnByRef[rf];if(e&&e.fn.departType==='boite'&&e.fn.departId!=null){const k=String(e.fn.departId);if(bdIds.indexOf(k)<0)bdIds.push(k);}else{directRefs.push(rf);}});
        bdIds.forEach(k=>{const bd=(s.boitesDeriv||[]).find(b=>String(b.id)===k);if(!bd)return;sortants.push({wcode:wc||d.code||'',from:center.code+(d.code?' '+d.code:''),to:bdCode(bd)+(bd.nom?' '+bd.nom:''),conds:this._condsFor(this._poles(d)),sec:(d.section||'1.5')+'mm²',bornes:d.code||'',bTel:te,bAel:bd,borneT:'',borneA:'',pieceT:tePiece,pieceA:((s.pieces||[]).find(p=>p.id===bd.pieceId)||{}).nom||'',edit:{type:'dj',id:d.id},statutKey:'dj'+d.id+'bd'+bd.id});});
        if(directRefs.length){sortants.push({wcode:wc||d.code||'',from:center.code+(d.code?' '+d.code:''),to:directRefs.join(' ')+(room?' · '+room:''),conds:this._condsFor(this._poles(d)),sec:(d.section||'1.5')+'mm²',bornes:d.code||'',bTel:te,bAel:null,borneT:'',borneA:'',pieceT:tePiece,pieceA:room,edit:{type:'dj',id:d.id},statutKey:'dj'+d.id});}
      });
      return{entrants,sortants,center};
    }
    if(kind==='bd'){
      const bd=(s.boitesDeriv||[]).find(b=>b.id===id);if(!bd)return{entrants,sortants,center:null};
      const center={code:bdCode(bd),nom:bd.nom||'',type:'BD'};
      // Câbles entrants = tous les câbles de disjoncteurs dont un récepteur part de cette boîte
      // (une boîte peut être alimentée par plusieurs tableaux). Pas de lien tableauId obligatoire.
      const bdPiece=bd.pieceId?(((s.pieces||[]).find(p=>p.id===bd.pieceId)||{}).nom||''):'';
      (s.disjoncteurs||[]).filter(d=>(d.recepteurs||[]).some(rf=>{const e=fnByRef[rf];return e&&e.fn.departType==='boite'&&String(e.fn.departId)===String(bd.id);})).forEach(d=>{
        const te=(s.tableauxElec||[]).find(t=>t.id===d.tableauId);if(!te)return;
        let wc='';try{wc=this.genCableCBCode(d,s);}catch(e){wc=d.code||'';}
        entrants.push({wcode:wc,from:teCode(te)+(d.code?' '+d.code:''),to:center.code,conds:this._condsFor(this._poles(d)),sec:(d.section||'1.5')+'mm²',bornes:'',bTel:te,bAel:bd,borneT:'',borneA:'',pieceT:((s.pieces||[]).find(p=>p.id===te.pieceId)||{}).nom||'',pieceA:bdPiece,edit:{type:'dj',id:d.id},statutKey:'dj'+d.id+'bd'+bd.id});
      });
      const _NAV=['NAV','#7c3aed'],_L=['L','#6d4c41'],_N=['N','#42a5f5'],_PE=['PE','grad'],_NAV1=['NAV1','#f59e0b'],_NAV2=['NAV2','#ec4899'],_NAVB=['NAVB','#c2185b'],_BUSA=['BUS+','#d32f2f'],_BUSB=['BUS-','#212121'];
      (s.pieces||[]).forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.departType==='boite'&&String(fn.departId)===String(bd.id)){const fi=this.FNS[fn.type]||{};
        const fnCmds=(s.interrupteurs||[]).filter(it=>it.circuitRef===fn.ref&&((it.departType||fn.departType)==='boite')&&String(it.departId!=null?it.departId:fn.departId)===String(bd.id));
        const lampConds=fn.type==='eclairage'&&fnCmds.length?[_NAV,_N,_PE]:this._condsFor(1);
        sortants.push({wcode:fn.ref||'',from:center.code,to:(fi.label||fn.type)+(fn.ref?' '+fn.ref:'')+' · '+(p.nom||''),conds:lampConds,sec:(fn.cableSection||'1.5')+'mm²',bornes:fn.ref||'',bTel:bd,bAel:null,borneT:'',borneA:'',pieceT:bdPiece,pieceA:(p.nom||''),edit:{type:'fn',pieceId:p.id,fnId:fn.id},statutKey:'fn'+fn.id});
        const vvCmds=fnCmds.filter(it=>it.type==='va_vient');const otherCmds=fnCmds.filter(it=>it.type!=='va_vient');
        const pushSw=(it,condsI)=>{let ic='';try{ic=this.genInterCode(it,s);}catch(e){ic=it.nom||'SA';}const itp=it.pieceId?(((s.pieces||[]).find(x=>x.id===it.pieceId)||{}).nom||''):(p.nom||'');sortants.push({wcode:ic,from:center.code,to:ic+(it.nom?' — '+it.nom:''),conds:condsI,sec:'1.5mm²',bornes:ic,bTel:bd,bAel:null,borneT:'',borneA:'',pieceT:bdPiece,pieceA:itp,edit:{type:'inter',id:it.id},statutKey:'int'+it.id});};
        // Va-et-vient : 1er inter = phase + 2 navettes ; suivants = retour + 2 navettes (navettes partagées W4/W5, pas de PE)
        vvCmds.forEach((it,idx)=>pushSw(it,idx===0?[_L,_NAV1,_NAV2]:[_NAV,_NAV1,_NAV2]));
        // Variateur : phase + neutre + retour + PE ; domotique (KNX) : bus 2 fils (+/−) ;
        // double allumage : phase commune + 2 retours SÉPARÉS (connecteurs distincts W3/W8, circuits indépendants) + PE ;
        // simple / poussoir : phase + retour + PE
        otherCmds.forEach(it=>pushSw(it,
          it.type==='variateur'?[_L,_N,_NAV,_PE]:
          it.type==='domotique'?[_BUSA,_BUSB]:
          it.type==='double'?[_L,_NAV,_NAVB,_PE]:
          [_L,_NAV,_PE]));
      }}));
      return{entrants,sortants,center};
    }
    return{entrants,sortants,center:null};
  }
  renderVueCable(){
    const s=this.state;const c=this.C;const r=this.r;
    this._tmCache={};
    const tes=s.tableauxElec||[];const bds=s.boitesDeriv||[];
    const tc=t=>{try{return this.genTECode(t,s);}catch(e){return t.code||('TE'+t.id);}};
    const bc=b=>{try{return this.genBDCode(b,s);}catch(e){return b.nom||('BD'+b.id);}};
    const equipOpts=[...tes.map(t=>({val:'te:'+t.id,label:tc(t)+(t.nom?' — '+t.nom:''),kind:'te',id:t.id})),...bds.map(b=>({val:'bd:'+b.id,label:bc(b)+(b.nom?' — '+b.nom:''),kind:'bd',id:b.id}))];
    if(equipOpts.length===0)return r('div',{style:{fontSize:13,color:c.muted,fontStyle:'italic',padding:'20px 0'}},'Aucun tableau ni boîte de dérivation — à créer dans « Circuits électriques ».');
    const opts=[{val:'all',label:'Tous les équipements',kind:'all',id:null},...equipOpts];
    const sel=opts.find(o=>o.val===s.nomencEquip)||opts[0];
    const equips=sel.kind==='all'?equipOpts.map(o=>({kind:o.kind,id:o.id,label:o.label})):[{kind:sel.kind,id:sel.id,label:sel.label}];
    const datas=equips.map(eq=>({eq,data:this._vueCableData(eq.kind,eq.id)}));
    const data={entrants:datas.flatMap(d=>d.data.entrants),sortants:datas.flatMap(d=>d.data.sortants)};
    const filt=s.vueCableFilter||'all';
    const fmatch=cb=>filt==='all'||((s.poseStatuts||{})[cb.statutKey]||'')===filt;
    const endB=(cond,el,devCode,cab,condKeys)=>{if(cond==='PE')return 'PE';if(el){const m=this._equipTermMap(el)[cab.statutKey];if(m&&m[cond]!=null)return m[cond];return this._borneOf(el,cond,condKeys);}if(devCode)return devCode+'.'+cond;return cond;};
    const bars=(cab)=>{const condKeys=(cab.conds||[]).map(x=>x[0]);return r('div',{style:{display:'flex',flexDirection:'column',gap:2,flex:1,minWidth:150}},...(cab.conds||[]).map((x,k)=>r('div',{key:k,style:{display:'flex',alignItems:'center',gap:4}},
      r('span',{style:{fontSize:7,color:c.muted,fontFamily:c.mono,minWidth:40,textAlign:'right'}},endB(x[0],cab.bTel,cab.borneT,cab,condKeys)),
      r('span',{style:{width:16,fontSize:8,fontWeight:700,color:x[1]==='grad'?'#43a047':x[1],fontFamily:c.mono}},x[0]),
      r('div',{style:{flex:1,height:4,borderRadius:2,background:x[1]==='grad'?'repeating-linear-gradient(45deg,#43a047 0 4px,#fdd835 4px 8px)':x[1]}}),
      r('span',{style:{fontSize:8,color:c.muted,fontFamily:c.mono,minWidth:28,textAlign:'right'}},cab.sec),
      r('span',{style:{fontSize:7,color:c.muted,fontFamily:c.mono,minWidth:40}},endB(x[0],cab.bAel,cab.borneA,cab,condKeys)))));};
    const endBlk=(code,piece,align)=>r('div',{style:{minWidth:74,maxWidth:140,fontSize:9,textAlign:align,flexShrink:0}},
      r('div',{style:{color:c.text2,fontWeight:600,whiteSpace:'normal',lineHeight:1.25}},code||'—'),
      piece?r('div',{style:{color:c.muted,fontSize:8,fontStyle:'italic'}},piece):null);
    const repCenter=(cab)=>r('div',{style:{flex:1,minWidth:150,display:'flex',flexDirection:'column',gap:3}},
      cab.wcode?r('div',{style:{textAlign:'center',fontFamily:c.mono,fontWeight:800,color:c.accent,fontSize:10}},cab.wcode):r('div',{style:{textAlign:'center',fontSize:8,color:c.muted}},'(sans repère)'),
      bars(cab));
    const rowSt={display:'flex',alignItems:'center',gap:6,padding:'7px 9px',background:c.surf,border:'1px solid '+c.bdr,borderRadius:8,marginBottom:6,boxShadow:c.elev1,cursor:'pointer'};
    const poseBadge=(key)=>{const st=this._poseState(key);const m=(s.poseMeta||{})[key];const tt='Statut de pose — cliquer pour changer'+(m&&m.at?'\n'+st.l+(m.by?' par '+m.by:'')+' le '+this._fmtStamp(m.at):'');return r('button',{onClick:(e)=>{e.stopPropagation();this._cyclePose(key);},title:tt,style:{flexShrink:0,fontSize:8,fontWeight:700,color:st.col,background:st.col+'18',border:'1px solid '+st.col+'66',borderRadius:5,padding:'2px 6px',cursor:'pointer',whiteSpace:'nowrap'}},st.l);};
    const cableRow=(cab,k,dir)=>r('div',{key:dir+k,onClick:()=>this._openCableEdit(cab.edit),title:'Modifier ce câble / cet équipement',style:rowSt},
      endBlk(cab.from,cab.pieceT,'left'),
      r('span',{style:{color:c.muted,fontSize:12,flexShrink:0}},'→'),
      repCenter(cab),
      r('span',{style:{color:c.muted,fontSize:12,flexShrink:0}},'→'),
      endBlk(cab.to,cab.pieceA,'right'),
      poseBadge(cab.statutKey));
    const inRow=(cab,k)=>cableRow(cab,k,'in');const outRow=(cab,k)=>cableRow(cab,k,'out');
    const equipBlock=(d,key)=>{
      const dd=d.data;const fE=dd.entrants.filter(fmatch),fS=dd.sortants.filter(fmatch);
      const centerCol=dd.center?r('div',{onClick:()=>this._openCableEdit({type:d.eq.kind,id:d.eq.id}),title:'Modifier '+dd.center.code,style:{flexShrink:0,width:96,alignSelf:'center',background:'linear-gradient(180deg,#0288CE,#0277BD)',borderRadius:10,padding:'16px 8px',textAlign:'center',color:'#fff',boxShadow:c.elev2,cursor:'pointer'}},
        r('div',{style:{fontSize:8,fontWeight:700,opacity:.8,letterSpacing:'.1em'}},dd.center.type),
        r('div',{style:{fontSize:15,fontWeight:900,fontFamily:c.mono,margin:'2px 0'}},dd.center.code),
        r('div',{style:{fontSize:9,opacity:.85}},dd.center.nom),
        r('div',{style:{fontSize:7,opacity:.7,marginTop:4}},'✎ modifier')):null;
      return r('div',{key:key,style:{display:'flex',gap:14,alignItems:'flex-start',marginBottom:18}},
        r('div',{style:{flex:1,minWidth:220}},r('div',{style:{fontSize:10,fontWeight:800,color:c.success,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}},'Entrants (amont)'),fE.length?fE.map(inRow):r('div',{style:{fontSize:11,color:c.muted,fontStyle:'italic'}},dd.entrants.length?'Aucun câble dans ce filtre':'Aucun câble entrant')),
        centerCol,
        r('div',{style:{flex:1,minWidth:220}},r('div',{style:{fontSize:10,fontWeight:800,color:c.accent,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8,textAlign:'right'}},'Sortants (aval)'),fS.length?fS.map(outRow):r('div',{style:{fontSize:11,color:c.muted,fontStyle:'italic',textAlign:'right'}},dd.sortants.length?'Aucun câble dans ce filtre':'Aucun câble sortant')));
    };
    return r('div',{style:{padding:'2px 0'}},
      r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:14,flexWrap:'wrap'}},
        r('span',{style:{fontSize:10,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em'}},'Équipement'),
        r('select',{value:sel.val,onChange:e=>this.setState({nomencEquip:e.target.value}),style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'6px 9px',fontSize:12,color:c.text,outline:'none'}},...opts.map(o=>r('option',{key:o.val,value:o.val},o.label))),
        r('span',{style:{fontSize:10,color:c.muted}},data.entrants.length+' entrant(s) · '+data.sortants.length+' sortant(s)'),
        (()=>{const all=[...data.entrants,...data.sortants];const done=all.filter(cb=>((s.poseStatuts||{})[cb.statutKey]||'')==='pose').length;const ko=all.filter(cb=>((s.poseStatuts||{})[cb.statutKey]||'')==='nc').length;return r('span',{style:{fontSize:10,fontWeight:700,color:done===all.length&&all.length?c.success:ko?c.danger:c.muted,fontFamily:c.mono}},'posés '+done+'/'+all.length+(ko?' · '+ko+' anomalie(s)':''));})(),
        r('div',{style:{flex:1}}),
        r('input',{value:s.poseOperator||'',onChange:e=>this.setState({poseOperator:e.target.value}),placeholder:'Opérateur',title:'Nom horodaté sur chaque pose',style:{width:88,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'5px 8px',fontSize:11,color:c.text,outline:'none'}}),
        ...[['all','Tous'],['','À poser'],['pose','Posés'],['nc','Anomalies']].map(f=>r('button',{key:f[0]||'todo',onClick:()=>this.setState({vueCableFilter:f[0]}),style:{padding:'4px 9px',borderRadius:6,fontSize:10,fontWeight:filt===f[0]?700:400,cursor:'pointer',border:'1px solid '+(filt===f[0]?c.accent:c.bdr2),background:filt===f[0]?'rgba(2,119,189,.1)':'transparent',color:filt===f[0]?c.accent:c.text2}},f[1])),
        this.Btn('⤓ CSV',()=>this.exportPoseCSV(),'sec','sm'),this.Btn('⤒ Import',()=>this.importPoseCSV(),'sec','sm'),this.Btn('Imprimer',()=>this.printVueCable(),'sec','sm'),this.Btn('Carnet',()=>this.printAllVueCable(),'sec','sm'),this.Btn('Repères',()=>this.printCableMarkers(),'sec','sm')),
      r('div',{style:{display:'flex',flexWrap:'wrap',gap:'4px 10px',alignItems:'center',padding:'6px 10px',marginBottom:12,background:c.surf2,border:'1px solid '+c.bdr,borderRadius:8,fontSize:9,color:c.muted}},
        r('span',{style:{fontWeight:700,color:c.text2,textTransform:'uppercase',letterSpacing:'.04em'}},'Repères bornes'),
        r('span',null,r('b',{style:{color:c.text2}},'Bornier'),' X{bloc}.{fil} — X1 tableau, X2 boîte…'),
        r('span',{style:{color:c.bdr2}},'│'),
        r('span',null,r('b',{style:{color:c.text2}},'Connecteur'),' W1 phase · W2 neutre · W3 retour · W4/W5 navettes · W8 retour 2 (double) · W9/W10 bus KNX — bornes court-circuitées : W3.1 puis W3.2…'),
        r('span',{style:{color:c.bdr2}},'│'),
        r('span',null,r('b',{style:{color:c.text2}},'PE'),' commun (sans repère)'),
        r('span',{style:{color:c.bdr2}},'│'),
        ...[['Phase','#6d4c41'],['Neutre','#42a5f5'],['Retour','#7c3aed'],['Retour 2','#c2185b'],['Nav.1','#f59e0b'],['Nav.2','#ec4899'],['Bus+','#d32f2f'],['Bus−','#212121'],['Terre','#43a047']].map(x=>r('span',{key:x[0],style:{display:'inline-flex',alignItems:'center',gap:3}},r('span',{style:{width:8,height:8,borderRadius:2,background:x[1],display:'inline-block'}}),x[0]))),
      sel.kind==='all'?r('div',null,...datas.map((d,i)=>r('div',{key:i},
        r('div',{style:{fontSize:11,fontWeight:800,color:c.text,margin:'4px 0 8px',paddingTop:i?10:0,borderTop:i?'1px solid '+c.bdr:'none'}},((d.data.center&&d.data.center.code)||'')+' — '+(equips[i].label||'')),
        equipBlock(d,i)))):equipBlock(datas[0],0));
  }
  _openCableEdit(edit){
    if(!edit)return;const s=this.state;
    if(edit.type==='dj'){this.setState({showModal:true,modalType:'editDisjoncteur',editId:edit.id});return;}
    if(edit.type==='dep'){const d=(s.departs||[]).find(x=>x.id===edit.id);if(!d)return;this.setState({showModal:true,modalType:'editDepart',editDepartId:d.id,departForm:{nom:d.nom,type:d.type,calibre:d.calibre,poles:d.poles,courbe:d.courbe,tableauElecId:d.tableauElecId?String(d.tableauElecId):'',pieceId:d.pieceId?String(d.pieceId):'',description:d.description||'',emplacement:d.emplacement||'',tension:d.tension||'mono',ddr:d.ddr!=null?d.ddr:300}});return;}
    if(edit.type==='fn'){const p=(s.pieces||[]).find(x=>x.id===edit.pieceId);const fn=p&&(p.fonctions||[]).find(f=>f.id===edit.fnId);if(!fn)return;this.setState({showModal:true,modalType:'editFonction',editFonctionPieceId:p.id,editFonctionId:fn.id,editFonctionForm:{type:fn.type,typeLampe:fn.typeLampe||'led_plafond',puissance:fn.puissance||12,quantite:fn.quantite||1,distance:fn.distance||0,cmdType:'simple',cmdZoneId:'',cmdZone2Id:'',newZoneNom:'',showNewZone:false,djCalibre:10,djCourbe:'B',djPoles:'1',djDDR:30,djTableauId:'',djSection:1.5,departType:fn.departType||'tableau',departId:fn.departId?String(fn.departId):'',departDist:fn.departDist||0,cableLongueur:fn.cableLongueur||0,cableSection:fn.cableSection||'1.5',cableType:fn.cableType||'H07VU'}});return;}
    if(edit.type==='bd'){const b=(s.boitesDeriv||[]).find(x=>x.id===edit.id);if(!b)return;this.openEdit('addBoite',b,'boiteForm',{nom:b.nom,label:b.label||'',pieceId:b.pieceId?String(b.pieceId):'',type:b.type||'encastre',tableauId:b.tableauId?String(b.tableauId):'',position:b.position||'',hauteurPlafond:b.hauteurPlafond||30,cote:b.cote||'plafond',description:b.description||'',raccordType:b.raccordType||'connecteur',raccordIdx:b.raccordIdx||1});return;}
    if(edit.type==='inter'){const it=(s.interrupteurs||[]).find(x=>x.id===edit.id);if(!it)return;this.openEdit('addInter',it,'interForm',{nom:it.nom||'',pieceId:it.pieceId?String(it.pieceId):'',type:it.type||'simple',circuitRef:it.circuitRef||'',zoneId:it.zoneId?String(it.zoneId):''});return;}
    if(edit.type==='te'){const t=(s.tableauxElec||[]).find(x=>x.id===edit.id);if(!t)return;const pc=(s.pieces||[]).find(p=>p.id===t.pieceId);this.openEdit('addTableauElec',t,'tableauElecForm',{nom:t.nom,pieceId:t.pieceId?String(t.pieceId):'',description:t.description||'',type:t.type||'principal',appId:pc?String(pc.appId):'',departId:t.departId?String(t.departId):'',raccordType:t.raccordType||'bornier',raccordIdx:t.raccordIdx||1,feederCalibre:t.feederCalibre||'',feederSection:t.feederSection||'',feederLongueur:t.feederLongueur||''});return;}
  }
  _vueCableSheetHtml(kind,id){
    const data=this._vueCableData(kind,id);if(!data.center)return '';
    const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const barH=(conds,sec)=>conds.map(x=>{const col=x[1]==='grad'?'repeating-linear-gradient(45deg,#43a047 0 4px,#fdd835 4px 8px)':x[1];return '<div style="display:flex;align-items:center;gap:4px;margin-bottom:1px"><span style="width:22px;font:700 8px monospace;color:'+(x[1]==='grad'?'#43a047':x[1])+'">'+x[0]+'</span><div style="flex:1;height:4px;border-radius:2px;background:'+col+'"></div><span style="font:8px monospace;color:#888">'+esc(sec)+'</span></div>';}).join('');
    const lblH=(rep,txt,brn,align)=>'<div style="min-width:120px;font-size:9px;text-align:'+(align||'left')+'">'+(rep?'<b style="font-family:monospace;color:#0277BD">'+esc(rep)+'</b>':'')+'<div>'+esc(txt)+'</div>'+(brn?'<div style="color:#888;font-family:monospace">bornes: '+esc(brn)+'</div>':'')+'</div>';
    const poseH=(key)=>{const st=this._poseState(key);const m=(this.state.poseMeta||{})[key];return '<span style="font:700 8px sans-serif;color:'+st.col+';border:1px solid '+st.col+';border-radius:4px;padding:1px 5px;white-space:nowrap">'+esc(st.l)+(m&&m.at?' · '+esc((m.by?m.by+' ':'')+this._fmtStamp(m.at)):'')+'</span>';};
    const rowH=(cab,dir)=>'<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border:1px solid #ddd;border-radius:6px;margin-bottom:5px;page-break-inside:avoid">'+(dir==='in'?lblH(cab.wcode,cab.from,cab.bornes,'left'):'')+'<div style="flex:1;min-width:90px">'+barH(cab.conds,cab.sec)+'</div>'+poseH(cab.statutKey)+(dir==='out'?lblH(cab.wcode,cab.to,cab.bornes,'right'):'')+'</div>';
    const cen=data.center;
    return '<div style="page-break-inside:avoid;margin-bottom:8mm"><h3 style="margin:0 0 3mm;font-size:13pt">Vue câble — '+esc(cen.code)+(cen.nom?' '+esc(cen.nom):'')+'</h3>'
      +'<div style="display:flex;gap:14px;align-items:flex-start">'
      +'<div style="flex:1"><div style="font:700 10px sans-serif;color:#16a34a;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Entrants (amont)</div>'+(data.entrants.map(cb=>rowH(cb,'in')).join('')||'<i style="color:#888;font-size:10px">Aucun</i>')+'</div>'
      +'<div style="width:96px;text-align:center;background:#0277BD;color:#fff;border-radius:8px;padding:14px 6px;align-self:center"><div style="font:700 8px sans-serif;opacity:.85;letter-spacing:.1em">'+esc(cen.type)+'</div><div style="font:900 14px monospace;margin:2px 0">'+esc(cen.code)+'</div><div style="font-size:8px;opacity:.85">'+esc(cen.nom)+'</div></div>'
      +'<div style="flex:1"><div style="font:700 10px sans-serif;color:#0277BD;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;text-align:right">Sortants (aval)</div>'+(data.sortants.map(cb=>rowH(cb,'out')).join('')||'<i style="color:#888;font-size:10px">Aucun</i>')+'</div>'
      +'</div></div>';
  }
  _printVueCableHtml(html){
    const cont=document.createElement('div');cont.id='cebat-vuecable';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';cont.innerHTML=html;document.body.appendChild(cont);
    const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
    if(!document.getElementById('cebat-vccss')){const st=document.createElement('style');st.id='cebat-vccss';st.textContent='@media print{@page{size:A4 landscape;margin:10mm;}}';document.head.appendChild(st);}
    const cleanup=()=>{const e=document.getElementById('cebat-vccss');if(e)e.remove();cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
    window.addEventListener('afterprint',cleanup);window.print();
  }
  printVueCable(){
    try{
      const s=this.state;const tes=s.tableauxElec||[];const bds=s.boitesDeriv||[];
      const opts=[...tes.map(t=>({val:'te:'+t.id,kind:'te',id:t.id})),...bds.map(b=>({val:'bd:'+b.id,kind:'bd',id:b.id}))];
      if(opts.length===0){this.showToast('Aucun équipement');return;}
      const sel=opts.find(o=>o.val===s.nomencEquip)||opts[0];const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const html='<div style="font-family:Arial,sans-serif;padding:8mm;color:#111"><div style="font-size:9pt;color:#555;margin-bottom:4mm">'+esc((s.project||{}).nom||'')+' — entrants (amont) / sortants (aval)</div>'+this._vueCableSheetHtml(sel.kind,sel.id)+'</div>';
      this._printVueCableHtml(html);
    }catch(e){this.showToast('Echec impression vue câble');}
  }
  printAllVueCable(){
    try{
      const s=this.state;const tes=s.tableauxElec||[];const bds=s.boitesDeriv||[];
      if(tes.length+bds.length===0){this.showToast('Aucun équipement');return;}
      const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const sheets=[...tes.map(t=>this._vueCableSheetHtml('te',t.id)),...bds.map(b=>this._vueCableSheetHtml('bd',b.id))].filter(Boolean).join('');
      const html='<div style="font-family:Arial,sans-serif;padding:8mm;color:#111"><h2 style="margin:0 0 2mm">Carnet de câbles — '+esc((s.project||{}).nom||'')+'</h2><div style="font-size:9pt;color:#555;margin-bottom:5mm">Une vue par équipement (entrants/sortants, statut de pose)</div>'+sheets+'</div>';
      this._printVueCableHtml(html);
    }catch(e){this.showToast('Echec impression carnet');}
  }
  printCableMarkers(){
    try{
      const s=this.state;const tes=s.tableauxElec||[];const bds=s.boitesDeriv||[];
      if(tes.length+bds.length===0){this.showToast('Aucun équipement');return;}
      const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const seen=new Set();const cables=[];
      const collect=(kind,id)=>{const d=this._vueCableData(kind,id);[...d.entrants,...d.sortants].forEach(cb=>{if(seen.has(cb.statutKey))return;seen.add(cb.statutKey);cables.push(cb);});};
      tes.forEach(t=>collect('te',t.id));bds.forEach(b=>collect('bd',b.id));
      if(cables.length===0){this.showToast('Aucun câble à repérer');return;}
      const marker=(cb,end)=>'<div style="display:inline-block;width:42mm;height:15mm;border:1px solid #333;border-radius:1mm;padding:1.5mm 2mm;margin:1mm;box-sizing:border-box;vertical-align:top;font-family:monospace;overflow:hidden;page-break-inside:avoid">'
        +'<div style="display:flex;align-items:baseline;justify-content:space-between"><span style="font-size:11pt;font-weight:800;color:#7c3aed">'+esc(cb.wcode||'—')+'</span><span style="font-size:6pt;color:#999">'+esc(end)+'</span></div>'
        +'<div style="font-size:6.5pt;color:#222;line-height:1.25;margin-top:.5mm">'+esc(cb.from||'')+'</div>'
        +'<div style="font-size:6.5pt;color:#0277BD;line-height:1.25">→ '+esc(cb.to||'')+'</div>'
        +'<div style="font-size:6pt;color:#666">'+esc(cb.sec||'')+(cb.bornes?' · bornes '+esc(cb.bornes):'')+'</div>'
        +'</div>';
      const body=cables.map(cb=>marker(cb,'origine')+marker(cb,'extrémité')).join('');
      const html='<div style="font-family:Arial,sans-serif;padding:4mm;color:#111"><div style="font-size:9pt;color:#555;margin-bottom:3mm">Repères de câbles — '+esc((s.project||{}).nom||'')+' · '+cables.length+' câble(s), 2 repères chacun (à poser aux deux extrémités)</div><div>'+body+'</div></div>';
      const cont=document.createElement('div');cont.id='cebat-markers';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';cont.innerHTML=html;document.body.appendChild(cont);
      const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
      if(!document.getElementById('cebat-mkcss')){const st=document.createElement('style');st.id='cebat-mkcss';st.textContent='@media print{@page{size:A4 portrait;margin:8mm;}}';document.head.appendChild(st);}
      const cleanup=()=>{const e=document.getElementById('cebat-mkcss');if(e)e.remove();cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);window.print();
    }catch(e){this.showToast('Echec impression repères');}
  }
  importPoseCSV(){
    const input=document.createElement('input');input.type='file';input.accept='.csv,text/csv';
    input.onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;const rd=new FileReader();rd.onerror=()=>this.showToast('Erreur de lecture');rd.onload=ev=>{try{
      const txt=String(ev.target.result).replace(/^﻿/,'');const lines=txt.split(/\r?\n/);if(lines.length<2){this.showToast('CSV vide');return;}
      const delim=(lines[0].indexOf(';')>=0)?';':(lines[0].indexOf('\t')>=0?'\t':',');
      const header=lines[0].split(delim).map(h=>h.trim().toLowerCase());
      const idx=name=>header.findIndex(h=>h.indexOf(name)>=0);
      const iCle=idx('cle'),iStat=idx('statut'),iBy=idx('pose par'),iAt=idx('pose le');
      if(iCle<0){this.showToast('Colonne « Cle » absente — réexportez puis remplissez le CSV');return;}
      const parse=line=>{const out=[];let cur='',q=false;for(let i=0;i<line.length;i++){const ch=line[i];if(q){if(ch==='"'){if(line[i+1]==='"'){cur+='"';i++;}else q=false;}else cur+=ch;}else{if(ch==='"')q=true;else if(ch===delim){out.push(cur);cur='';}else cur+=ch;}}out.push(cur);return out;};
      const lbl2k=l=>{const x=(l||'').toLowerCase();if(x.indexOf('anomalie')>=0||x.indexOf('non conf')>=0||x.trim()==='nc')return 'nc';if(x.indexOf('pos')>=0)return 'pose';return '';};
      const pdate=str=>{const m=String(str||'').match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/);if(!m)return '';try{return new Date(+m[3],+m[2]-1,+m[1],+m[4],+m[5]).toISOString();}catch(e2){return '';}};
      const ps={},pm={};let n=0;
      for(let i=1;i<lines.length;i++){const ln=lines[i];if(!ln.trim())continue;const cols=parse(ln);const cle=(cols[iCle]||'').trim();if(!cle)continue;const k=lbl2k(iStat>=0?cols[iStat]:'');ps[cle]=k;if(k)pm[cle]={by:(iBy>=0?(cols[iBy]||'').trim():''),at:(iAt>=0?pdate(cols[iAt]):'')};n++;}
      if(n===0){this.showToast('Aucune ligne reconnue');return;}
      this.setState(s=>{const meta={...(s.poseMeta||{})};Object.keys(ps).forEach(k=>{if(pm[k])meta[k]=pm[k];else delete meta[k];});return{poseStatuts:{...(s.poseStatuts||{}),...ps},poseMeta:meta};});
      this.showToast(n+' statut(s) de pose importé(s)');
    }catch(err){this.showToast('CSV illisible');}};rd.readAsText(f);};
    input.click();
  }
  ARMOIRE_COMP={voyant:{label:'Voyant Ø22',shape:'circle',w:22,h:22,color:'#ef4444'},bouton:{label:'Bouton Ø22',shape:'circle',w:22,h:22,color:'#22c55e'},afficheur:{label:'Afficheur 92x45',shape:'rect',w:92,h:45,color:'#0277BD'},presse_etoupe:{label:'Presse-etoupe Ø20',shape:'circle',w:20,h:20,color:'#94a3b8'},ventilation:{label:'Ventilation 100x100',shape:'square',w:100,h:100,color:'#06b6d4'},passage:{label:'Passage cable 60x30',shape:'rect',w:60,h:30,color:'#f59e0b'},decoupe:{label:'Decoupe libre',shape:'rect',w:50,h:50,color:'#7c3aed'}};
  ARMOIRE_FACES=[['porte','Porte'],['platine','Platine'],['couvercle','Couvercle'],['gauche','Cote gauche'],['droit','Cote droit'],['haut','Dessus'],['derriere','Derriere']];
  faceDims(a,face){const L=+a.L||600,H=+a.H||800,P=+a.P||250;if(face==='platine')return{w:Math.max(50,L-40),h:Math.max(50,H-40)};if(face==='gauche'||face==='droit')return{w:P,h:H};if(face==='haut')return{w:L,h:P};return{w:L,h:H};}
  armoireConflicts(a){
    const cuts=a.cutouts||[];const conf={};const msgs=[];
    const ov=(c1,c2)=>!(c1.x+c1.w<=c2.x||c2.x+c2.w<=c1.x||c1.y+c1.h<=c2.y||c2.y+c2.h<=c1.y);
    for(let i=0;i<cuts.length;i++)for(let j=i+1;j<cuts.length;j++){if(cuts[i].face===cuts[j].face&&ov(cuts[i],cuts[j])){conf[cuts[i].id]=1;conf[cuts[j].id]=1;}}
    const porte=cuts.filter(c=>c.face==='porte'),plat=cuts.filter(c=>c.face==='platine');
    porte.forEach(p=>plat.forEach(q=>{if(ov({x:p.x,y:p.y,w:p.w,h:p.h},{x:q.x+20,y:q.y+20,w:q.w,h:q.h})){conf[p.id]=2;conf[q.id]=2;msgs.push('« '+(p.label||'Porte')+' » (porte) en conflit avec « '+(q.label||'Platine')+' » (platine) — meme emplacement.');}}));
    cuts.forEach(c=>{const fd=this.faceDims(a,c.face);if(c.x<0||c.y<0||c.x+c.w>fd.w||c.y+c.h>fd.h){conf[c.id]=conf[c.id]||3;msgs.push('« '+(c.label||c.shape)+' » sort du gabarit de la face '+c.face+'.');}});
    return{conf,msgs};
  }
  vArmoire(){
    const s=this.state;const c=this.C;const r=this.r;
    const a=s.armoire||{L:600,H:800,P:250,ip:'IP55',cutouts:[]};
    const face=s.armoireFace||'porte';const fd=this.faceDims(a,face);
    const SCALE=Math.min(520/Math.max(fd.w,1),560/Math.max(fd.h,1));const W=fd.w*SCALE,Hpx=fd.h*SCALE;
    const allCuts=a.cutouts||[];const cuts=allCuts.filter(x=>x.face===face);
    const cc=this.armoireConflicts(a);const conf=cc.conf;
    const selId=s.armoireSel;const selCut=allCuts.find(x=>x.id===selId);
    const upCut=(id,patch)=>this.setState(st=>({armoire:{...st.armoire,cutouts:st.armoire.cutouts.map(x=>x.id===id?{...x,...patch}:x)}}));
    const ni=(lbl,val,onch,w)=>r('div',{style:{display:'flex',flexDirection:'column',gap:2}},r('label',{style:{fontSize:9,color:c.muted}},lbl),r('input',{type:'number',value:val,onChange:e=>onch(+e.target.value),style:{width:w||62,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 6px',color:c.text,fontSize:12,outline:'none'}}));
    const dims=r('div',{style:{display:'flex',gap:10,flexWrap:'wrap',alignItems:'flex-end',marginBottom:12}},
      ni('Largeur (mm)',a.L,v=>this.setState(st=>({armoire:{...st.armoire,L:v}})),70),
      ni('Hauteur (mm)',a.H,v=>this.setState(st=>({armoire:{...st.armoire,H:v}})),70),
      ni('Profondeur (mm)',a.P,v=>this.setState(st=>({armoire:{...st.armoire,P:v}})),70),
      r('div',{style:{display:'flex',flexDirection:'column',gap:2}},r('label',{style:{fontSize:9,color:c.muted}},'Indice IP'),r('select',{value:a.ip||'IP55',onChange:e=>this.setState(st=>({armoire:{...st.armoire,ip:e.target.value}})),style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 6px',color:c.text,fontSize:12}},...['IP20','IP30','IP44','IP55','IP65','IP66'].map(x=>r('option',{key:x,value:x},x)))),
      ((s.tableauxElec||[]).length>0)?r('div',{style:{display:'flex',flexDirection:'column',gap:2}},r('label',{style:{fontSize:9,color:c.muted}},'Tableau implanté'),r('select',{value:a.tableauId!=null?a.tableauId:((s.tableauxElec[0]||{}).id),onChange:e=>this.setState(st=>({armoire:{...st.armoire,tableauId:+e.target.value}})),style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 6px',color:c.text,fontSize:12}},...(s.tableauxElec||[]).map(t=>r('option',{key:t.id,value:t.id},(t.code||t.nom||('TE'+t.id)))))):null,
      ni('Pas rail (mm)',a.railPitch||150,v=>this.setState(st=>({armoire:{...st.armoire,railPitch:v}})),70),
      r('label',{style:{display:'flex',alignItems:'center',gap:4,fontSize:10,color:c.text2,cursor:'pointer'}},r('input',{type:'checkbox',checked:a.showImplant!==false,onChange:e=>this.setState(st=>({armoire:{...st.armoire,showImplant:e.target.checked}}))}),'Implantation'),
      r('label',{style:{display:'flex',alignItems:'center',gap:4,fontSize:10,color:c.text2,cursor:'pointer'}},r('input',{type:'checkbox',checked:!!a.showCotation,onChange:e=>this.setState(st=>({armoire:{...st.armoire,showCotation:e.target.checked}}))}),'Cotation'),
      r('div',{style:{flex:1}}),this.Btn('Export DXF',()=>this.exportArmoireDXF(),'sec','sm'),this.Btn('Imprimer calques',()=>this.printArmoire(),'sec','sm'));
    const tabs=r('div',{style:{display:'flex',gap:5,flexWrap:'wrap',marginBottom:12}},...this.ARMOIRE_FACES.map(f=>{const n=allCuts.filter(x=>x.face===f[0]).length;const on=f[0]===face;return r('button',{key:f[0],onClick:()=>this.setState({armoireFace:f[0],armoireSel:null}),style:{padding:'5px 11px',borderRadius:7,fontSize:11,fontWeight:on?700:400,border:'1px solid '+(on?c.accent:c.bdr2),background:on?'rgba(2,119,189,.1)':'transparent',color:on?c.accent:c.text2,cursor:'pointer',fontFamily:c.font}},f[1]+(n?' ('+n+')':''));}));
    const addbar=r('div',{style:{display:'flex',gap:8,alignItems:'center',marginBottom:12,flexWrap:'wrap'}},
      r('span',{style:{fontSize:10,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em'}},'Ajouter'),
      r('select',{value:s.armoireShape||'voyant',onChange:e=>this.setState({armoireShape:e.target.value}),style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'4px 7px',fontSize:11,color:c.text}},...Object.keys(this.ARMOIRE_COMP).map(k=>r('option',{key:k,value:k},this.ARMOIRE_COMP[k].label))),
      this.Btn('+ Decoupe',()=>{const comp=this.ARMOIRE_COMP[s.armoireShape||'voyant'];const id='K'+Date.now().toString(36)+Math.floor(Math.random()*100);const nc={id,face,shape:comp.shape,x:Math.max(0,Math.round(fd.w/2-comp.w/2)),y:Math.max(0,Math.round(fd.h/2-comp.h/2)),w:comp.w,h:comp.h,label:(comp.label||'').split(' ')[0],comp:s.armoireShape||'voyant'};this.setState(st=>({armoire:{...st.armoire,cutouts:[...(st.armoire.cutouts||[]),nc]},armoireSel:id}));},'primary','sm'));
    const grid=[];for(let gx=50;gx<fd.w;gx+=50)grid.push(r('line',{key:'gx'+gx,x1:gx*SCALE,y1:0,x2:gx*SCALE,y2:Hpx,stroke:c.bdr,strokeWidth:0.5}));for(let gy=50;gy<fd.h;gy+=50)grid.push(r('line',{key:'gy'+gy,x1:0,y1:gy*SCALE,x2:W,y2:gy*SCALE,stroke:c.bdr,strokeWidth:0.5}));
    const onMove=(e)=>{const d=s.armoireDrag;if(!d)return;const dx=(e.clientX-d.cx)/SCALE,dy=(e.clientY-d.cy)/SCALE;upCut(d.id,{x:Math.max(0,Math.round(d.ox+dx)),y:Math.max(0,Math.round(d.oy+dy))});};
    const shapeEl=(ct)=>{const comp=this.ARMOIRE_COMP[ct.comp]||{};const isC=conf[ct.id];const col=isC?'#dc2626':(comp.color||c.accent);const seld=ct.id===selId;const common={onMouseDown:(e)=>{this.setState({armoireSel:ct.id,armoireDrag:{id:ct.id,cx:e.clientX,cy:e.clientY,ox:ct.x,oy:ct.y}});},fill:col+'33',stroke:col,strokeWidth:seld?2.5:1.3,style:{cursor:'move'}};if(ct.shape==='circle')return r('circle',{key:ct.id,cx:(ct.x+ct.w/2)*SCALE,cy:(ct.y+ct.h/2)*SCALE,r:Math.max(2,ct.w/2*SCALE),...common});return r('rect',{key:ct.id,x:ct.x*SCALE,y:ct.y*SCALE,width:ct.w*SCALE,height:ct.h*SCALE,...common});};
    const implantEls=[];
    if(face==='platine'&&a.showImplant!==false){const pl=this._armoirePlatineLayout(a);pl.rails.forEach((rl,ri)=>{
      implantEls.push(r('line',{key:'rl'+ri,x1:rl.x0*SCALE,y1:rl.y*SCALE,x2:(rl.x0+rl.w)*SCALE,y2:rl.y*SCALE,stroke:c.bdr3,strokeWidth:3}));
      rl.devices.forEach((dv,di)=>{const y0=(rl.y-22)*SCALE,hh=44*SCALE;const col=dv.kind==='tete'?c.accent:(dv.kind==='diff'?'#06b6d4':'#16a34a');
        implantEls.push(r('rect',{key:'dv'+ri+'_'+di,x:dv.x*SCALE,y:y0,width:dv.w*SCALE,height:hh,fill:col+'22',stroke:col,strokeWidth:1,rx:2}));
        implantEls.push(r('text',{key:'dt'+ri+'_'+di,x:(dv.x+dv.w/2)*SCALE,y:y0+hh/2+3,fontSize:7,textAnchor:'middle',fill:c.text2,style:{pointerEvents:'none'}},dv.label));});});}
    const cotaEls=[];
    if(a.showCotation){cuts.forEach((ct,ci)=>{const cx=(ct.x+ct.w/2),cy=(ct.y+ct.h/2);
      cotaEls.push(r('line',{key:'cv'+ci,x1:cx*SCALE,y1:0,x2:cx*SCALE,y2:cy*SCALE,stroke:c.accent,strokeWidth:0.6,strokeDasharray:'3 2'}));
      cotaEls.push(r('line',{key:'ch'+ci,x1:0,y1:cy*SCALE,x2:cx*SCALE,y2:cy*SCALE,stroke:c.accent,strokeWidth:0.6,strokeDasharray:'3 2'}));
      cotaEls.push(r('text',{key:'cxt'+ci,x:cx*SCALE+2,y:9,fontSize:8,fill:c.accent,style:{pointerEvents:'none'}},String(Math.round(cx))));
      cotaEls.push(r('text',{key:'cyt'+ci,x:2,y:cy*SCALE-2,fontSize:8,fill:c.accent,style:{pointerEvents:'none'}},String(Math.round(cy))));});}
    const svg=r('svg',{width:W,height:Hpx,viewBox:'0 0 '+W+' '+Hpx,onMouseMove:onMove,onMouseUp:()=>this.setState({armoireDrag:null}),onMouseLeave:()=>this.setState({armoireDrag:null}),style:{background:c.surf,border:'2px solid '+c.bdr3,borderRadius:6,maxWidth:'100%'}},...grid,...implantEls,...cuts.map(shapeEl),...cuts.map(ct=>r('text',{key:'t'+ct.id,x:(ct.x+ct.w/2)*SCALE,y:(ct.y+ct.h/2)*SCALE+3,fontSize:9,textAnchor:'middle',fill:c.text,style:{pointerEvents:'none'}},ct.label||'')),...cotaEls);
    const linkWH=(ct)=>ct.shape==='circle'||ct.shape==='square';
    const editor=selCut?r('div',{style:{border:'1px solid '+c.bdr2,borderRadius:9,padding:12,marginBottom:12}},
      r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:8}},'Decoupe selectionnee — '+(this.ARMOIRE_COMP[selCut.comp]||{label:selCut.shape}).label),
      r('div',{style:{display:'flex',gap:8,flexWrap:'wrap',alignItems:'flex-end'}},
        ni('X (mm)',selCut.x,v=>upCut(selCut.id,{x:v})),ni('Y (mm)',selCut.y,v=>upCut(selCut.id,{y:v})),
        ni(linkWH(selCut)?'Ø/Cote (mm)':'Largeur (mm)',selCut.w,v=>upCut(selCut.id,linkWH(selCut)?{w:v,h:v}:{w:v})),
        linkWH(selCut)?null:ni('Hauteur (mm)',selCut.h,v=>upCut(selCut.id,{h:v})),
        r('div',{style:{display:'flex',flexDirection:'column',gap:2}},r('label',{style:{fontSize:9,color:c.muted}},'Libelle'),r('input',{value:selCut.label||'',onChange:e=>upCut(selCut.id,{label:e.target.value}),style:{width:96,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 6px',color:c.text,fontSize:12,outline:'none'}})),
        this.Btn('Supprimer',()=>this.setState(st=>({armoire:{...st.armoire,cutouts:st.armoire.cutouts.filter(x=>x.id!==selCut.id)},armoireSel:null})),'danger','sm'))
    ):r('div',{style:{fontSize:11,color:c.muted,fontStyle:'italic',marginBottom:12}},'Cliquez une decoupe pour l\'editer (ou glissez-la), ou ajoutez-en une.');
    const confCount=Object.keys(conf).length;
    const confBox=confCount>0?r('div',{style:{border:'1px solid rgba(220,38,38,.3)',background:'rgba(220,38,38,.06)',borderRadius:9,padding:'10px 12px'}},
      r('div',{style:{fontSize:11,fontWeight:700,color:c.danger,marginBottom:6}},'⚠️ '+confCount+' decoupe(s) en conflit / hors-limites'),
      ...cc.msgs.slice(0,12).map((m,k)=>r('div',{key:k,style:{fontSize:10,color:c.text2,marginBottom:2}},'• '+m))
    ):r('div',{style:{fontSize:11,color:c.success,fontWeight:600}},'✓ Aucun conflit d\'encombrement');
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease',overflowY:'auto',height:'100%'}},
      this.SH('Armoire electrique','Dimensionnement et plan de percage par face — '+a.L+'×'+a.H+'×'+a.P+' mm · '+(a.ip||'IP55')),
      dims,tabs,addbar,
      r('div',{style:{display:'flex',gap:18,flexWrap:'wrap',alignItems:'flex-start'}},
        r('div',{style:{flexShrink:0}},r('div',{style:{fontSize:10,color:c.muted,marginBottom:4,fontFamily:c.mono}},(this.ARMOIRE_FACES.find(f=>f[0]===face)||[0,face])[1]+' — '+fd.w+'×'+fd.h+' mm'),svg),
        r('div',{style:{flex:1,minWidth:260}},editor,confBox)));
  }
  printArmoire(){
    try{
      const a=this.state.armoire||{};const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const sheets=this.ARMOIRE_FACES.map(f=>{const fd=this.faceDims(a,f[0]);const SC=Math.min(170/Math.max(fd.w,1),240/Math.max(fd.h,1));const W=fd.w*SC,H=fd.h*SC;const cuts=(a.cutouts||[]).filter(x=>x.face===f[0]);
        let sh='';
        if(f[0]==='platine'&&a.showImplant!==false){const pl=this._armoirePlatineLayout(a);pl.rails.forEach(rl=>{sh+='<line x1="'+(rl.x0*SC)+'" y1="'+(rl.y*SC)+'" x2="'+((rl.x0+rl.w)*SC)+'" y2="'+(rl.y*SC)+'" stroke="#888" stroke-width="2"/>';rl.devices.forEach(dv=>{const y0=(rl.y-22)*SC,hh=44*SC;sh+='<rect x="'+(dv.x*SC)+'" y="'+y0+'" width="'+(dv.w*SC)+'" height="'+hh+'" fill="#eef" stroke="#555" stroke-width="0.8"/><text x="'+((dv.x+dv.w/2)*SC)+'" y="'+(y0+hh/2+2)+'" font-size="6" text-anchor="middle" fill="#333">'+esc(dv.label)+'</text>';});});}
        cuts.forEach(ct=>{if(ct.shape==='circle')sh+='<circle cx="'+((ct.x+ct.w/2)*SC)+'" cy="'+((ct.y+ct.h/2)*SC)+'" r="'+(ct.w/2*SC)+'" fill="none" stroke="#111" stroke-width="1"/>';else sh+='<rect x="'+(ct.x*SC)+'" y="'+(ct.y*SC)+'" width="'+(ct.w*SC)+'" height="'+(ct.h*SC)+'" fill="none" stroke="#111" stroke-width="1"/>';sh+='<text x="'+((ct.x+ct.w/2)*SC)+'" y="'+((ct.y+ct.h/2)*SC+3)+'" font-size="7" text-anchor="middle" fill="#333">'+esc(ct.label||'')+'</text>';
          if(a.showCotation){const cx=(ct.x+ct.w/2),cy=(ct.y+ct.h/2);sh+='<line x1="'+(cx*SC)+'" y1="0" x2="'+(cx*SC)+'" y2="'+(cy*SC)+'" stroke="#0277BD" stroke-width="0.4" stroke-dasharray="3 2"/><line x1="0" y1="'+(cy*SC)+'" x2="'+(cx*SC)+'" y2="'+(cy*SC)+'" stroke="#0277BD" stroke-width="0.4" stroke-dasharray="3 2"/><text x="'+(cx*SC+1)+'" y="8" font-size="6" fill="#0277BD">'+Math.round(cx)+'</text><text x="1" y="'+(cy*SC-1)+'" font-size="6" fill="#0277BD">'+Math.round(cy)+'</text>';}});
        return '<div style="display:inline-block;margin:6mm;vertical-align:top;page-break-inside:avoid"><div style="font:bold 10pt monospace;color:#0277BD;margin-bottom:2mm">'+esc(f[1])+' — '+fd.w+'x'+fd.h+' mm</div><svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><rect x="0" y="0" width="'+W+'" height="'+H+'" fill="#fff" stroke="#111" stroke-width="1.5"/>'+sh+'</svg></div>';}).join('');
      const html='<div style="font-family:Arial,sans-serif;padding:6mm"><h2 style="margin:0 0 3mm">Plan de percage armoire — '+esc((this.state.project||{}).nom||'')+'</h2><div style="font-size:9pt;color:#555;margin-bottom:4mm">Armoire '+a.L+'x'+a.H+'x'+a.P+' mm · '+esc(a.ip||'IP55')+' — calques par face</div>'+sheets+'</div>';
      const cont=document.createElement('div');cont.id='cebat-armoire';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';cont.innerHTML=html;document.body.appendChild(cont);
      const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
      const cleanup=()=>{cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);window.print();
    }catch(e){this.showToast('Echec impression calques');}
  }
  _armoirePlatineLayout(a){
    // Implantation reelle sur la platine : rails DIN + appareils modulaires (18 mm/module)
    const tes=this.state.tableauxElec||[];const deps=this.state.departs||[];
    const te=tes.find(t=>t.id===a.tableauId)||tes[0];
    const fd=this.faceDims(a,'platine');const moduleW=18,left=20,top=45;
    const pitch=(+a.railPitch>0?+a.railPitch:150);const rails=[];
    if(!te)return{rails,pitch,te:null,fd,moduleW};
    let ry=top;
    const dep=deps.find(d=>d.id===te.departId)||deps.find(d=>d.type==='comptage');
    if(dep){rails.push({y:ry,x0:left,w:Math.max(0,fd.w-2*left),devices:[{x:left,w:moduleW*Math.max(2,this._poles(dep)),label:(dep.code||'Arrivee'),kind:'tete'}]});ry+=pitch;}
    this.rangeesOf(te.id).forEach(row=>{
      const ds=[...new Set(row.brs.map(d=>+d.ddr||0))];const ddr=ds.length===1?ds[0]:0;
      const maxP=row.brs.reduce((m,d)=>Math.max(m,this._poles(d)),1);
      let dx=left;const devices=[];
      if(ddr>0){const w=moduleW*(maxP>2?4:2);devices.push({x:dx,w,label:ddr+'mA',kind:'diff'});dx+=w;}
      row.brs.forEach(d=>{const w=moduleW*this._poles(d);devices.push({x:dx,w,label:d.code||'CB',kind:'cb'});dx+=w;});
      rails.push({y:ry,x0:left,w:Math.max(0,fd.w-2*left),devices,over:dx>left+(fd.w-2*left)});ry+=pitch;
    });
    return{rails,pitch,te,fd,moduleW};
  }
  armoireDXF(a){
    const out=['0','SECTION','2','ENTITIES'];let xo=0;const gap=60;
    this.ARMOIRE_FACES.forEach(f=>{
      const face=f[0];const fd=this.faceDims(a,face);const H=fd.h;const layer=face.toUpperCase();
      const X=v=>(xo+(+v)).toFixed(2);const Y=v=>(H-(+v)).toFixed(2);
      const line=(x1,y1,x2,y2,lay)=>out.push('0','LINE','8',lay||layer,'10',X(x1),'20',Y(y1),'11',X(x2),'21',Y(y2));
      const rect=(x,y,w,h,lay)=>{line(x,y,x+w,y,lay);line(x+w,y,x+w,y+h,lay);line(x+w,y+h,x,y+h,lay);line(x,y+h,x,y,lay);};
      const circle=(cx,cy,rr,lay)=>out.push('0','CIRCLE','8',lay||layer,'10',X(cx),'20',Y(cy),'40',(+rr).toFixed(2));
      const text=(x,y,t,h,lay)=>out.push('0','TEXT','8',lay||layer,'10',X(x),'20',Y(y),'40',((+h)||10).toFixed(2),'1',String(t==null?'':t).replace(/\n/g,' '));
      rect(0,0,fd.w,fd.h);text(0,-14,f[1]+' '+fd.w+'x'+fd.h+'mm',10);
      if(face==='platine'){const pl=this._armoirePlatineLayout(a);pl.rails.forEach(rl=>{line(rl.x0,rl.y,rl.x0+rl.w,rl.y,'RAILS');rl.devices.forEach(dv=>{const y0=rl.y-22,hh=44;rect(dv.x,y0,dv.w,hh,'APPAREILS');text(dv.x+1,y0+hh/2,dv.label,7,'APPAREILS');});});}
      (a.cutouts||[]).filter(x=>x.face===face).forEach(ct=>{const cx=ct.x+ct.w/2,cy=ct.y+ct.h/2;
        if(ct.shape==='circle')circle(cx,cy,ct.w/2);else rect(ct.x,ct.y,ct.w,ct.h);
        text(cx-ct.w/2+1,cy,ct.label||'',6);
        line(cx,0,cx,cy,'COTATION');line(0,cy,cx,cy,'COTATION');
        text(cx+2,3,String(Math.round(cx)),6,'COTATION');text(3,cy+2,String(Math.round(cy)),6,'COTATION');});
      xo+=fd.w+gap;
    });
    out.push('0','ENDSEC','0','EOF');return out.join('\n');
  }
  exportArmoireDXF(){
    try{
      const a=this.state.armoire||{};const dxf=this.armoireDXF(a);const blob=new Blob([dxf],{type:'application/dxf'});const url=URL.createObjectURL(blob);
      const el=document.createElement('a');const slug=(((this.state.project||{}).nom)||'projet').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase()||'projet';
      el.href=url;el.download='cebat_armoire_'+slug+'.dxf';document.body.appendChild(el);el.click();el.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      this.showToast('Armoire DXF exportee (calques par face)');
    }catch(e){this.showToast('Echec export DXF armoire');}
  }
  vSchema(circuits){
    const s=this.state;const c=this.C;const r=this.r;
    const{departs,tableauxElec,disjoncteurs,inverseurs,boitesDeriv,interrupteurs,zonesCommande,pieces}=s;
    const refPiece={},refType={};
    pieces.forEach(p=>(p.fonctions||[]).forEach(fn=>{refPiece[fn.ref]=p.nom;refType[fn.ref]=fn.type;}));
    const fnColor={eclairage:'#f59e0b',prises:'#3b82f6',prises_sdb:'#3b82f6'};
    const rail=c.bdr3,rail2=c.bdr2;const cTete='#0277BD',cDiff='#06b6d4';
    const zoneName=id=>{const z=(zonesCommande||[]).find(zz=>zz.id===id);return z?(z.zoneCode||z.nom||''):'';};
    const interByRef={};(interrupteurs||[]).forEach(i=>{if(i.circuitRef){(interByRef[i.circuitRef]=interByRef[i.circuitRef]||[]).push(i);}});
    const TYPEA=new Set(['prises_sdb','lave_linge','four','borne_ve','climatisation','chauffe_eau']);
    const box=(label,code,sub,color,strong)=>r('div',{style:{border:(strong?'2px':'1px')+' solid '+color+(strong?'':'66'),borderRadius:8,background:color+(strong?'22':'12'),padding:'7px 11px',minWidth:106,flexShrink:0}},
      label?r('div',{style:{fontSize:7.5,fontWeight:800,color,textTransform:'uppercase',letterSpacing:'.07em',marginBottom:2,opacity:.9}},label):null,
      r('div',{style:{fontSize:12,fontWeight:800,color,fontFamily:c.mono}},code),
      sub?r('div',{style:{fontSize:9,color:c.muted,marginTop:2,whiteSpace:'pre-line'}},sub):null);
    const chip=(rf)=>{
      const col=fnColor[refType[rf]]||'#94a3b8';const inters=interByRef[rf]||[];
      const cmd=inters.length?inters.map(i=>{let cd='';try{cd=this.genInterCode(i,s);}catch(e){cd=i.type||'';}const zn=zoneName(i.zoneId);return cd+(zn?'/'+zn:'');}).join(','):'';
      return r('span',{key:rf,style:{display:'inline-flex',alignItems:'center',gap:4,fontSize:10,fontFamily:c.mono,color:c.text2,background:col+'18',border:'1px solid '+col+'44',borderRadius:5,padding:'2px 6px'}},
        rf,refPiece[rf]?r('span',{style:{fontFamily:c.font,color:c.muted}},'· '+refPiece[rf]):null,
        cmd?r('span',{style:{fontFamily:c.font,color:c.purple},title:'Commande'},'⌥'+cmd):null);
    };
    const subHdr=(t)=>r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.07em',margin:'12px 0 6px'}},t);
    const legend=r('div',{style:{display:'flex',flexWrap:'wrap',gap:14,marginBottom:14,fontSize:10,color:c.muted}},
      ...[['Source / AGCP',cTete],['Tête de tableau',cTete],['Inter. différentiel',cDiff],['Disjoncteur divisionnaire','#16a34a'],['Section insuffisante','#dc2626']].map((x,k)=>r('div',{key:k,style:{display:'flex',alignItems:'center',gap:5}},r('span',{style:{width:11,height:11,borderRadius:3,background:x[1]+'22',border:'1px solid '+x[1]}}),x[0])));
    const wireLegend=r('div',{style:{display:'flex',flexWrap:'wrap',gap:12,marginBottom:14,fontSize:10,color:c.muted,alignItems:'center'}},r('span',{style:{fontWeight:700,color:c.text2}},'Fils (IEC 60446) :'),...[['Phase L1','#6d4c41'],['Phase L2','#212121'],['Phase L3','#9e9e9e'],['Neutre N','#42a5f5'],['Terre PE','grad']].map((x,k)=>r('div',{key:k,style:{display:'flex',alignItems:'center',gap:4}},r('span',{style:{width:16,height:9,borderRadius:2,border:'1px solid rgba(0,0,0,.15)',background:x[1]==='grad'?'repeating-linear-gradient(45deg,#43a047 0 4px,#fdd835 4px 8px)':x[1]}}),x[0])));
    // ALIMENTATION
    const sources=r('div',{style:{display:'flex',gap:18,flexWrap:'wrap',alignItems:'center'}},
      departs.length===0?r('div',{style:{fontSize:11,color:c.muted}},'Aucune source — ajoutez un depart'):null,
      ...departs.map(d=>r('div',{key:d.id,style:{display:'flex',alignItems:'center',gap:8}},
        box('Source',d.code||'SRC',(d.nom||'')+'\n'+(d.calibre||'?')+'A · '+(d.poles||'?')+'P',cTete,true),
        r('div',{style:{width:16,height:2,background:rail}}),
        box('AGCP / Branchement',d.dbCode||'DB',(d.ddr?d.ddr+'mA':'')+(d.courbe?' · '+d.courbe:''),cTete))),
      (inverseurs&&inverseurs.length>0)?box('Inverseur',inverseurs[0].code||'IS','Source de secours','#7c3aed'):null);
    // TABLEAUX
    const boards=tableauxElec.length===0
      ? r('div',{style:{fontSize:12,color:c.muted,padding:'10px 0'}},'Aucun tableau electrique')
      : r('div',{style:{display:'flex',flexDirection:'column',gap:18}},
          ...tableauxElec.map(te=>{
            const djs=disjoncteurs.filter(d=>d.tableauId===te.id);
            const bds=(boitesDeriv||[]).filter(b=>b.tableauId===te.id);
            const teCode=te.code||te.nom||('TE'+te.id);
            const gmap={};djs.forEach(d=>{const key=(+d.ddr||0);(gmap[key]=gmap[key]||[]).push(d);});
            const groups=this.rangeesOf(te.id).map(rw=>{const ds=[...new Set(rw.brs.map(d=>+d.ddr||0))];return{ddr:ds.length===1?ds[0]:0,mixed:ds.length>1,rangee:rw.rangee,brs:rw.brs};});
            const breakerRow=(d,rangee)=>{
              const refs=d.recepteurs||[];const okSec=this.sectionOkForCalibre(d.section,d.calibre);let wcode='';try{wcode=this.genCableCBCode?this.genCableCBCode(d,s):'';}catch(e){}
              return r('div',{key:d.id,draggable:true,onDragStart:()=>this.setState({dragCb:d.id}),onDragOver:e=>e.preventDefault(),onDragEnter:e=>{e.preventDefault();if(this.state.dragCb&&this.state.dragCb!==d.id)this.setState({dragOverCb:d.id});},onDragLeave:()=>{if(this.state.dragOverCb===d.id)this.setState({dragOverCb:null});},onDrop:e=>{e.preventDefault();e.stopPropagation();const dc=this.state.dragCb;if(dc&&dc!==d.id)this.dropCb(dc,rangee,d.id);this.setState({dragCb:null,dragOverCb:null});},title:'Glisser pour deplacer',style:{position:'relative',display:'flex',alignItems:'center',gap:8,padding:'4px 0',cursor:'grab',outline:this.state.dragOverCb===d.id?'2px dashed '+c.accent:'none',outlineOffset:'2px'}},
                r('div',{style:{position:'absolute',left:-14,top:'50%',width:14,height:2,background:rail2}}),
                box('Divisionnaire',d.code||('CB'+d.id),(d.calibre||'?')+'A '+(d.courbe||'')+' · '+(d.section||'?')+'mm²',okSec?'#16a34a':'#dc2626'),
                r('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',lineHeight:1}},wcode?r('span',{style:{fontSize:8,fontFamily:c.mono,color:c.purple,fontWeight:700}},wcode):null,r('span',{style:{color:c.bdr3,fontSize:13}},'→')),
                r('div',{style:{display:'flex',flexWrap:'wrap',gap:5,alignItems:'center'}},
                  refs.length===0?r('span',{style:{fontSize:10,color:c.muted,fontStyle:'italic'}},'(aucun récepteur)'):null,
                  ...refs.map(rf=>chip(rf))));
            };
            const br=this._boardRows(te);
            const groupBlock=(g,gi)=>{
              const typeA=g.brs.some(d=>(d.recepteurs||[]).some(rf=>TYPEA.has(refType[rf])));
              const idLabel=g.mixed?'différentiels mixtes':(g.ddr>0?g.ddr+' mA · '+(typeA?'Type A':'Type AC'):'SANS DIFFÉRENTIEL');
              return r('div',{key:g.ddr,style:{position:'relative',display:'flex',gap:16,alignItems:'flex-start',padding:'10px 0 2px 18px'}},
                r('div',{style:{position:'absolute',left:0,top:20,width:16,height:2,background:rail}}),
                box('Rangée '+g.rangee,g.mixed?'ID mix':(g.ddr>0?('ID '+g.ddr):'—'),idLabel,(g.ddr>0||g.mixed)?cDiff:'#dc2626'),
                r('div',{onDragOver:e=>e.preventDefault(),onDrop:e=>{e.preventDefault();const dc=this.state.dragCb;if(dc)this.dropCb(dc,g.rangee,null);this.setState({dragCb:null});},style:{borderLeft:'3px solid '+c.accent,paddingLeft:14,display:'flex',flexDirection:'column',gap:2,minHeight:30}},
                  ...g.brs.map(d=>breakerRow(d,g.rangee))));
            };
            return r('div',{key:te.id,className:'cbt-card',style:{border:'1px solid '+c.bdr2,borderRadius:12,background:c.surf,boxShadow:c.elev1,overflow:'hidden'}},
              r('div',{style:{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:c.surf3,borderBottom:'1px solid '+c.bdr}},
                r('span',{style:{fontSize:12,fontWeight:800,color:c.accent,fontFamily:c.mono}},teCode),
                r('span',{style:{fontSize:12,color:c.text,fontWeight:600}},te.nom||''),
                (()=>{const pt=(this.state.tableauxElec||[]).find(t=>t.id===te.departId);return pt?r('span',{style:{fontSize:9,fontFamily:c.mono,color:c.purple,background:c.purple+'18',border:'1px solid '+c.purple+'44',borderRadius:5,padding:'1px 6px'}},'⇡ alimenté par '+(pt.code||pt.nom||'TP')):null;})(),
                r('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:8}},r('span',{style:{fontSize:9,color:c.muted}},br.usedModules+' mod · '+br.nbRangees+' rangée'+(br.nbRangees>1?'s':'')+' · '+djs.length+' dép.'),r('button',{onClick:()=>this.exportSchemaSVG(te.id),title:'Exporter ce tableau en SVG',style:{fontSize:9,fontWeight:700,color:c.accent,background:'transparent',border:'1px solid '+c.bdr2,borderRadius:5,padding:'2px 7px',cursor:'pointer'}},'SVG'),r('button',{onClick:()=>this.exportSchemaDXF(te.id),title:'Exporter ce tableau en DXF',style:{fontSize:9,fontWeight:700,color:c.accent,background:'transparent',border:'1px solid '+c.bdr2,borderRadius:5,padding:'2px 7px',cursor:'pointer'}},'DXF'),r('button',{onClick:()=>this.exportSchemaPNG(te.id),title:'Exporter ce tableau en PNG',style:{fontSize:9,fontWeight:700,color:c.accent,background:'transparent',border:'1px solid '+c.bdr2,borderRadius:5,padding:'2px 7px',cursor:'pointer'}},'PNG'))),
              r('div',{style:{padding:'14px 16px',overflowX:'auto'}},
                r('div',{style:{display:'inline-flex',alignItems:'flex-start',gap:0}},
                  r('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:6}},
                    box('Disj. de tête',te.cb0Code||'CB0','Général',cTete,true)),
                  r('div',{style:{width:18,height:2,background:rail,marginTop:24}}),
                  r('div',{style:{borderLeft:'2px solid '+rail,marginLeft:0}},
                    djs.length===0?r('div',{style:{fontSize:11,color:c.muted,fontStyle:'italic',padding:'8px 0 8px 18px'}},'Aucun disjoncteur'):null,
                    ...groups.map((g,gi)=>groupBlock(g,gi))))),
              bds.length>0?r('div',{style:{padding:'0 16px 12px'}},subHdr('Boîtes de dérivation'),
                r('div',{style:{display:'flex',flexWrap:'wrap',gap:8}},
                  ...bds.map(b=>{
                    let bdCode=b.nom;try{bdCode=this.genBDCode?this.genBDCode(b,s):b.nom;}catch(e){bdCode=b.nom;}
                    const served=pieces.flatMap(p=>(p.fonctions||[]).filter(fn=>fn.departType==='boite'&&String(fn.departId)===String(b.id)).map(fn=>fn.ref));
                    const pc=(pieces.find(p=>p.id===b.pieceId)||{}).nom||'';
                    return r('div',{key:b.id,style:{border:'1px solid '+c.bdr2,borderRadius:7,background:c.surf3,padding:'6px 9px'}},
                      r('div',{style:{fontSize:10,fontWeight:800,color:cDiff,fontFamily:c.mono}},(bdCode||'BD')+(b.label?' · '+b.label:'')),
                      pc?r('div',{style:{fontSize:9,color:c.muted}},pc):null,
                      served.length>0?r('div',{style:{fontSize:9,color:c.muted,marginTop:2,fontFamily:c.mono}},'→ '+served.join(' ')):null);
                  }))):null);
          }));
    const cmdSection=(interrupteurs&&interrupteurs.length>0)?r('div',{style:{marginTop:16}},this.Card('Commandes & zones',r('div',{style:{display:'flex',flexWrap:'wrap',gap:8}},
      ...interrupteurs.map(i=>{
        let cd='';try{cd=this.genInterCode(i,s);}catch(e){cd=i.type||'INT';}
        const zn=zoneName(i.zoneId);const pc=(pieces.find(p=>p.id===i.pieceId)||{}).nom||'';
        return r('div',{key:i.id,style:{border:'1px solid '+c.bdr2,borderRadius:7,background:c.surf3,padding:'6px 9px'}},
          r('div',{style:{fontSize:10,fontWeight:800,color:c.purple,fontFamily:c.mono}},cd),
          r('div',{style:{fontSize:9,color:c.muted}},(i.type||'')+(i.circuitRef?' → '+i.circuitRef:'')+(pc?' · '+pc:'')+(zn?' · '+zn:'')));
      })))):null;
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease',overflowY:'auto',height:'100%'}},
      this.SH('Schéma unifilaire','Source → AGCP → Tête → Différentiel → Disjoncteur divisionnaire → Récepteur',r('div',{style:{display:'flex',gap:8}},this.Btn('DXF',()=>this.exportSchemaDXF(),'sec','md'),this.Btn('SVG',()=>this.exportSchemaSVG(),'sec','md'),this.Btn('PNG',()=>this.exportSchemaPNG(),'sec','md'),this.Btn('PDF feuilles',()=>this.printSchemaSheets(),'sec','md'),this.Btn('Étiquettes',()=>this.printLabels(),'sec','md'),this.Btn(r('span',{style:{display:'inline-flex',alignItems:'center',gap:5}},this.ico('print_ico',13),'PDF paysage'),()=>this.printLandscape(),'ghost','md'))),
      r('div',{style:{display:'flex',gap:6,marginBottom:12}},...[['uni','Unifilaire'],['multi','Multifilaire']].map(m2=>r('button',{key:m2[0],onClick:()=>this.setState({schemaMode:m2[0]}),style:{padding:'5px 14px',borderRadius:7,fontSize:12,fontWeight:(this.state.schemaMode||'uni')===m2[0]?700:400,border:'1px solid '+((this.state.schemaMode||'uni')===m2[0]?c.accent:c.bdr2),background:(this.state.schemaMode||'uni')===m2[0]?'rgba(2,119,189,.1)':'transparent',color:(this.state.schemaMode||'uni')===m2[0]?c.accent:c.text2,cursor:'pointer',fontFamily:c.font}},m2[1]))),
      legend,wireLegend,
      r('div',{className:'cbt-card',style:{background:c.surf2,border:'1px solid '+c.bdr,borderRadius:12,padding:'16px 18px',marginBottom:16,boxShadow:c.elev1}},
        r('div',{style:{fontSize:10,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}},'Alimentation générale'),
        sources),
      (this.state.schemaMode==='multi')?this.renderMultifilaire():boards,
      (this.state.schemaMode==='multi')?null:this.renderBoitesRaccord(),
      (this.state.schemaMode==='multi')?null:cmdSection,
      (this.state.schemaMode==='multi')?null:this.renderSelectivityCard());
  }
  vCircuits(circuits){
    const{circuitsTab,tableauxElec,boitesDeriv,interrupteurs,zonesCommande,pieces,circuitFilter,departs}=this.state;const c=this.C;const r=this.r;
    const opts=this.detectZoneOptimisations();
    const tabBtn=(id,label,ico)=>r('button',{onClick:()=>this.setState({circuitsTab:id}),style:{padding:'6px 14px',borderRadius:7,fontSize:12,fontWeight:circuitsTab===id?700:400,cursor:'pointer',border:`1px solid ${circuitsTab===id?c.accent:c.bdr2}`,background:circuitsTab===id?'rgba(37,99,235,.12)':'transparent',color:circuitsTab===id?c.accent:c.text2,fontFamily:c.font,display:'flex',alignItems:'center',gap:5}},ico,' ',label);
    const getPieceNom=id=>{const p=pieces.find(x=>x.id===id);return p?p.nom:'Non définie';};

    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease'}},
      this.SH('Circuits électriques','Distribution physique et circuits NF C 15-100',
        r('div',{style:{display:'flex',gap:6}},tabBtn('distribution','Distribution',this.ico('circuits',13)),tabBtn('auto','Circuits auto NF C 15-100',this.ico('tableau_elec',13)))),

      // ── DISTRIBUTION TAB ──
      circuitsTab==='distribution'&&(()=>{
        const deps=this.state.departs||[];
        const allDj=this.state.disjoncteurs||[];
        const allPieces=this.state.pieces;
        const tabPrinc=tableauxElec.filter(t=>!t.type||t.type==='principal');
        const tabSec=tableauxElec.filter(t=>t.type==='secondaire');
        const djForTab=id=>allDj.filter(d=>d.tableauId===id);
        const djPwr=d=>this.calcDjPower(d,allPieces);
        const openDep=()=>this.setState({showModal:true,modalType:'addDepart',departForm:{nom:'',type:'comptage',calibre:60,poles:4,courbe:'S',tableauElecId:'',pieceId:'',description:'',emplacement:'',tension:'mono',ddr:300}});
        const openTP=()=>this.setState({showModal:true,modalType:'addTableauElec',editId:null,tableauElecForm:{nom:'',pieceId:'',description:'',type:'principal',appId:'',departId:'',raccordType:'bornier',raccordIdx:1}});
        const openTS=()=>this.setState({showModal:true,modalType:'addTableauElec',editId:null,tableauElecForm:{nom:'',pieceId:'',description:'',type:'secondaire',appId:'',departId:''}});
        const addCB=tabId=>{const code=this.genDjCode(allDj,tabId);this.setState(s=>({disjoncteurs:[...s.disjoncteurs,{id:s.nextElemId,code,recepteurs:[],pieceId:null,calibre:10,courbe:'B',poles:'1',ddr:30,section:1.5,tableauId:tabId}],nextElemId:s.nextElemId+1}));this.showToast(code+' cree');};

        const cbCard=d=>{
          const totW=djPwr(d);const l=this.djNFCLimit(d);
          const pct=Math.min(Math.round(totW/l.maxW*100),100);
          const nPct=Math.min(Math.round((d.recepteurs||[]).length/l.maxR*100),100);
          const over=totW>l.maxW||(d.recepteurs||[]).length>l.maxR;
          const mPct=Math.max(pct,nPct);
          return r('div',{key:d.id,style:{background:c.surf,border:'1px solid '+(over?c.danger:c.bdr),borderRadius:7,padding:'8px 10px'}},
            r('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:5}},
              r('div',{style:{fontFamily:c.mono,fontSize:11,fontWeight:800,color:over?c.danger:'#ef4444',flex:1}},d.code),
              this.Bdg(d.courbe+d.calibre+'A','#ef4444'),this.Bdg(d.section+'mm',c.muted),
              d.ddr>0&&this.Bdg(d.ddr+'mA','#0284C7'),
              r('button',{onClick:()=>this.setState({showModal:true,modalType:'editDisjoncteur',editId:d.id}),style:{background:'transparent',border:'1px solid '+c.bdr2,borderRadius:4,color:c.muted,cursor:'pointer',padding:'1px 4px',display:'inline-flex',alignItems:'center'}},this.ico('pencil',9)),
              r('button',{onClick:()=>this.setState(st=>({disjoncteurs:st.disjoncteurs.filter(x=>x.id!==d.id)})),style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:12,padding:0}},'x')
            ),
            r('div',{style:{marginBottom:4}},
              r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:9,color:over?c.danger:c.muted,marginBottom:2}},
                r('span',null,(d.recepteurs||[]).length+' rec. '+totW+'W/'+l.maxW+'W'),
                r('span',{style:{fontWeight:700,color:over?c.danger:mPct>80?c.warn:'#22c55e'}},mPct+'%')
              ),
              r('div',{style:{height:3,background:c.bdr2,borderRadius:2,overflow:'hidden'}},
                r('div',{style:{height:'100%',width:mPct+'%',background:over?c.danger:mPct>80?c.warn:'#22c55e',borderRadius:2}})
              ),
              over&&r('div',{style:{fontSize:8,color:c.danger,fontWeight:700}},'NFC15100: '+l.label)
            ),
            (d.recepteurs||[]).length>0&&r('div',{style:{display:'flex',flexWrap:'wrap',gap:2}},
              ...(d.recepteurs||[]).map(ref=>r('span',{key:ref,style:{fontFamily:c.mono,fontSize:8,padding:'1px 4px',borderRadius:3,background:'rgba(239,68,68,.08)',color:'#ef4444'}},ref))
            )
          );
        };

        const bloc=(num,label,col,note,btn,body)=>r('div',{style:{marginBottom:16,background:c.surf2,border:'1px solid '+c.bdr,borderRadius:12,padding:'14px 16px'}},
          r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:8,paddingBottom:6,borderBottom:'2px solid '+col}},
            r('span',{style:{fontSize:10,fontWeight:800,color:col,textTransform:'uppercase',letterSpacing:'.07em',flex:1}},num+' — '+label),btn),
          note&&r('div',{style:{fontSize:9,color:c.muted,marginBottom:8,padding:'4px 8px',background:col+'0d',borderRadius:5,border:'1px solid '+col+'25'}},note),
          body
        );

        const tabCard=(te,col)=>{
          const cbList=djForTab(te.id);
          const totW=cbList.reduce((s,d)=>s+djPwr(d),0);
          return r('div',{key:te.id,style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:9,overflow:'hidden',marginBottom:6}},
            r('div',{style:{padding:'9px 12px',borderBottom:'1px solid '+c.bdr,display:'flex',alignItems:'center',gap:9}},
              r('div',{style:{width:30,height:40,background:col==='#0277BD'?'linear-gradient(180deg,#1f3a6e,#0f1f3a)':'linear-gradient(180deg,#2d1f5e,#18103a)',border:'2px solid '+col,borderRadius:4,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flexShrink:0}},
                r('div',{style:{fontSize:6,color:col==='#0277BD'?'#6ba3ff':'#c4b5fd',fontWeight:800}},col==='#0277BD'?'TGBT':'DIV'),r('div',{style:{fontSize:5,color:col==='#0277BD'?'#93c5fd':'#a78bfa'}},'|||')
              ),
              r('div',{style:{flex:1}},
                r('div',{style:{fontSize:12,fontWeight:700,color:c.text}},te.nom),
                r('div',{style:{display:'flex',gap:4,marginTop:2}},
                  this.Bdg(cbList.length+' CB',col),
                  totW>0&&r('span',{style:{fontSize:9,fontWeight:700,color:col,fontFamily:c.mono}},(totW/1000).toFixed(2)+' kW')
                )
              ),
              r('button',{onClick:()=>addCB(te.id),style:{padding:'4px 8px',border:'1px dashed #ef4444',borderRadius:5,background:'rgba(239,68,68,.04)',color:'#ef4444',fontSize:10,fontWeight:700,cursor:'pointer'}},'+CB'),
              r('button',{onClick:()=>(()=>{const _pc=this.state.pieces.find(p=>p.id===te.pieceId);this.openEdit('addTableauElec',te,'tableauElecForm',{nom:te.nom,pieceId:te.pieceId?String(te.pieceId):'',description:te.description||'',type:te.type||'principal',appId:_pc?String(_pc.appId):'',departId:te.departId?String(te.departId):'',raccordType:te.raccordType||'bornier',raccordIdx:te.raccordIdx||1,feederCalibre:te.feederCalibre||'',feederSection:te.feederSection||'',feederLongueur:te.feederLongueur||''});})(),style:{background:'transparent',border:'1px solid '+c.bdr2,borderRadius:5,padding:'3px 6px',color:c.muted,cursor:'pointer',fontSize:11}},this.ico('pencil',11))
            ),
            cbList.length===0?r('div',{style:{padding:'8px 12px',fontSize:11,color:c.muted,fontStyle:'italic'}},'Aucun CB'):
            r('div',{style:{padding:'8px 12px',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))',gap:5}},cbList.map(d=>cbCard(d)))
          );
        };

        const invs=this.state.inverseurs||[];
        const hasCpt=deps.some(d=>d.type==='comptage');
        const hasAlt=deps.some(d=>d.type==='electrogene'||d.type==='solaire');
        const orphanCBs=allDj.filter(d=>!d.tableauId);

        const colW={flex:'0 0 auto',display:'flex',flexDirection:'column',borderRight:'1px solid '+c.bdr,height:'100%',overflow:'hidden'};
        const colHdrSt=(col)=>({padding:'10px 12px',borderBottom:'2px solid '+col,background:col+'15',display:'flex',alignItems:'center',gap:6,flexShrink:0});
        const colBody={flex:1,overflowY:'auto',paddingBottom:8};
        const sel=this.state.circuitsSel||{srcId:null,teId:null,cbId:null,bdId:null};
        const setSel=(u)=>this.setState(s=>({circuitsSel:{...(s.circuitsSel||{}),...u}}));
        const toggleSel=(key,id)=>{const cur=(this.state.circuitsSel||{})[key];setSel({srcId:null,teId:null,cbId:null,bdId:null,[key]:cur===id?null:id});};
        const filtSrcId=sel.srcId,filtTeId=sel.teId,filtCbId=sel.cbId,filtBdId=sel.bdId;
        const selRing=(on,col)=>on?'2px solid '+(col||'#0277BD'):'none';

        // ── Cascade filter helpers ──
        // Which TE are visible given current selection?
        const visibleTeIds=(()=>{
          if(filtSrcId) return tableauxElec.filter(t=>t.departId===filtSrcId).map(t=>t.id);
          if(filtCbId){const dj=allDj.find(d=>d.id===filtCbId);return dj?[dj.tableauId]:[];}
          if(filtBdId){const bd=boitesDeriv.find(b=>b.id===filtBdId);return bd?[bd.tableauId]:[];}
          return null; // null = show all
        })();
        // Which CB are visible?
        const visibleCbIds=(()=>{
          if(filtTeId) return allDj.filter(d=>d.tableauId===filtTeId).map(d=>d.id);
          if(filtCbId) return [filtCbId];
          if(filtSrcId){const teIds=tableauxElec.filter(t=>t.departId===filtSrcId).map(t=>t.id);return allDj.filter(d=>teIds.includes(d.tableauId)).map(d=>d.id);}
          if(filtBdId){const bd=boitesDeriv.find(b=>b.id===filtBdId);const bdFns=pieces.flatMap(p=>p.fonctions||[]).filter(fn=>fn.departType==='boite'&&String(fn.departId)===String(filtBdId));const dj=allDj.find(d=>(d.recepteurs||[]).some(ref=>bdFns.some(fn=>fn.ref===ref)));return dj?[dj.id]:[];}
          return null;
        })();
        // Which BD are visible?
        const visibleBdIds=(()=>{
          if(filtBdId) return [filtBdId];
          if(filtCbId){const dj=allDj.find(d=>d.id===filtCbId);const refs=(dj&&dj.recepteurs)||[];const allFnsX=pieces.flatMap(p=>p.fonctions||[]);const bds=refs.map(ref=>{const fn=allFnsX.find(f=>f.ref===ref);return fn&&fn.departType==='boite'?+fn.departId:null;}).filter(Boolean);return [...new Set(bds)];}
          if(filtTeId){const cbsOfTE=allDj.filter(d=>d.tableauId===filtTeId);const refs=cbsOfTE.flatMap(d=>d.recepteurs||[]);const allFnsX=pieces.flatMap(p=>p.fonctions||[]);const bds=refs.map(ref=>{const fn=allFnsX.find(f=>f.ref===ref);return fn&&fn.departType==='boite'?+fn.departId:null;}).filter(Boolean);return [...new Set(bds)];}
          if(filtSrcId){const teIds=tableauxElec.filter(t=>t.departId===filtSrcId).map(t=>t.id);return boitesDeriv.filter(b=>teIds.includes(b.tableauId)).map(b=>b.id);}
          return null;
        })();
        // Which Src are visible?
        const visibleSrcIds=(()=>{
          if(filtSrcId) return [filtSrcId];
          if(filtTeId){const te=tableauxElec.find(t=>t.id===filtTeId);return te&&te.departId?[te.departId]:null;}
          if(filtCbId){const dj=allDj.find(d=>d.id===filtCbId);const te=dj?tableauxElec.find(t=>t.id===dj.tableauId):null;return te&&te.departId?[te.departId]:null;}
          return null;
        })();

        const srcCard=(d)=>{const cf={comptage:{l:'Reseau',col:'#16a34a'},electrogene:{l:'GE',col:'#ef4444'},solaire:{l:'Solaire',col:'#f59e0b'}}[d.type]||{l:d.type,col:c.muted};if(visibleSrcIds&&!visibleSrcIds.includes(d.id))return null;const sOn=filtSrcId===d.id;return r('div',{key:d.id,onClick:()=>toggleSel('srcId',d.id),style:{margin:'6px 8px',background:sOn?cf.col+'14':'#fff',border:'1px solid '+(sOn?cf.col:c.bdr),borderRadius:7,padding:'8px 10px',cursor:'pointer',outline:selRing(sOn,cf.col)}},r('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:3}},r('span',{style:{fontFamily:c.mono,fontSize:11,fontWeight:800,color:cf.col}},'['+this.genSourceCode(d,this.state)+']'),r('span',{style:{fontSize:11,fontWeight:600,color:c.text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},d.nom),r('button',{onClick:()=>this.setState({showModal:true,modalType:'editDepart',editDepartId:d.id,departForm:{nom:d.nom,type:d.type,calibre:d.calibre,poles:d.poles,courbe:d.courbe,tableauElecId:d.tableauElecId?String(d.tableauElecId):'',pieceId:d.pieceId?String(d.pieceId):'',description:d.description||'',emplacement:d.emplacement||'',tension:d.tension||'mono',ddr:d.ddr!=null?d.ddr:300}}),style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',padding:2}},this.ico('pencil',9)),r('button',{onClick:()=>this.setState(st=>({departs:st.departs.filter(x=>x.id!==d.id),inverseurs:st.departs.filter(x=>x.id!==d.id).length<2?[]:st.inverseurs})),style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:11,padding:0}},'x')),r('div',{style:{display:'flex',gap:3,flexWrap:'wrap'}},this.Bdg(cf.l,cf.col),this.Bdg(d.courbe+d.calibre+'A',cf.col),this.Bdg(d.poles+'P',c.muted),this.Bdg(d.dbCode||('DB'+(this.state.departs.findIndex(x=>x.id===d.id)+1)),'#7c3aed')));};

        const tabCardCol=(te,col)=>{const cbList=djForTab(te.id);const totW=cbList.reduce((s,d)=>s+djPwr(d),0);const pc=pieces.find(p=>p.id===te.pieceId);const teCode=this.genTECode(te,this.state);if(visibleTeIds&&!visibleTeIds.includes(te.id))return null;const tOn=filtTeId===te.id;return r('div',{key:te.id,onClick:(e)=>{if(e.target.closest&&e.target.closest('button'))return;toggleSel('teId',te.id);},style:{margin:'6px 8px',background:tOn?col+'14':'#fff',border:'1px solid '+(tOn?col:c.bdr),borderRadius:7,padding:'8px 10px',cursor:'pointer',outline:selRing(tOn,col)}},r('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:4}},r('span',{style:{fontFamily:c.mono,fontSize:10,fontWeight:900,color:col,flexShrink:0}},teCode),r('span',{style:{fontSize:11,fontWeight:700,color:c.text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginLeft:4}},te.nom),r('button',{onClick:()=>addCB(te.id),style:{padding:'1px 5px',border:'1px dashed #ef4444',borderRadius:4,background:'rgba(239,68,68,.04)',color:'#ef4444',fontSize:9,cursor:'pointer',flexShrink:0}},'+CB'),r('button',{onClick:()=>(()=>{const _pc=this.state.pieces.find(p=>p.id===te.pieceId);this.openEdit('addTableauElec',te,'tableauElecForm',{nom:te.nom,pieceId:te.pieceId?String(te.pieceId):'',description:te.description||'',type:te.type||'principal',appId:_pc?String(_pc.appId):'',departId:te.departId?String(te.departId):'',raccordType:te.raccordType||'bornier',raccordIdx:te.raccordIdx||1,feederCalibre:te.feederCalibre||'',feederSection:te.feederSection||'',feederLongueur:te.feederLongueur||''});})(),style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',padding:2}},this.ico('pencil',9)),r('button',{onClick:()=>this.setState(s=>({tableauxElec:s.tableauxElec.filter(x=>x.id!==te.id)})),style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:11,padding:0}},'x')),r('div',{style:{display:'flex',gap:3,flexWrap:'wrap'}},this.Bdg(te.cb0Code||(this.state.tableauxElec.findIndex(t=>t.id===te.id)+1+'CB0'),'#ef4444'),this.Bdg(cbList.length+' CB',col),pc&&this.Bdg(pc.nom,c.muted),totW>0&&this.Bdg((totW/1000).toFixed(1)+'kW',col)));};

        const boiteCardCol=(b)=>{const pc=pieces.find(p=>p.id===b.pieceId);const tab=tableauxElec.find(t=>t.id===b.tableauId);const typeLabel={encastre:'Encastree',saillie:'Saillie',etanche:'IP55',plafond:'DCL'}[b.type]||b.type;if(visibleBdIds&&!visibleBdIds.includes(b.id))return null;const bdOn=filtBdId===b.id;return r('div',{key:b.id,onClick:(e)=>{if(e.target.closest&&e.target.closest('button'))return;toggleSel('bdId',b.id);},style:{margin:'6px 8px',background:bdOn?'rgba(245,158,11,.08)':'#fff',border:'1px solid '+(bdOn?'#f59e0b':c.bdr),borderRadius:7,padding:'8px 10px',cursor:'pointer',outline:selRing(bdOn,'#f59e0b')}},r('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:3}},r('span',{style:{fontSize:11,fontWeight:700,color:'#64748b',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},b.nom||(b.id+'')),r('button',{onClick:()=>this.openEdit('addBoite',b,'boiteForm',{nom:b.nom||'',label:b.label||'',pieceId:b.pieceId?String(b.pieceId):'',type:b.type,tableauId:b.tableauId?String(b.tableauId):'',position:b.position||'',hauteurPlafond:b.hauteurPlafond||30,cote:b.cote||'plafond',description:b.description||'',raccordType:b.raccordType||'connecteur',raccordIdx:b.raccordIdx||1,retourDepart:false,retourEditFonction:false}),style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',padding:2}},this.ico('pencil',9)),r('button',{onClick:()=>{this.deleteItem('boitesDeriv',b.id);this.showToast('Supprimee');},style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:11,padding:0}},'x')),r('div',{style:{display:'flex',gap:3,flexWrap:'wrap'}},this.Bdg(typeLabel,'#94a3b8'),pc&&this.Bdg(pc.nom,c.muted),tab&&this.Bdg(tab.nom,'#94a3b8')));};

        const zoneCardCol=(z)=>{const zInters=interrupteurs.filter(i=>i.zoneId===z.id);const pc=pieces.find(p=>p.id===z.pieceId);return r('div',{key:z.id,style:{margin:'6px 8px',background:c.surf,border:'1px solid '+c.bdr,borderRadius:7,overflow:'hidden'}},r('div',{style:{padding:'8px 10px',borderBottom:zInters.length?'1px solid '+c.bdr:'none'}},r('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:3}},z.zoneCode&&r('span',{style:{fontSize:8,fontWeight:800,color:'#fff',background:'#7c3aed',borderRadius:3,padding:'1px 4px',flexShrink:0}},z.zoneCode),r('span',{style:{fontSize:11,fontWeight:700,color:c.text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},z.nom),r('button',{onClick:()=>this.openEdit('addZone',z,'zoneForm',{nom:z.nom,pieceId:z.pieceId?String(z.pieceId):'',position:z.position||'',hauteur:z.hauteur||120,cote:z.cote||'gauche',retourEditFonction:false}),style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',padding:2}},this.ico('pencil',9)),r('button',{onClick:()=>{this.deleteItem('zonesCommande',z.id);this.showToast('Zone supprimee');},style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:11,padding:0}},'x')),r('div',{style:{display:'flex',gap:3,flexWrap:'wrap'}},pc&&this.Bdg(pc.nom,c.muted),this.Bdg(zInters.length+' inter.','#7c3aed'))),zInters.length>0&&r('div',{style:{padding:'4px 6px',display:'flex',flexDirection:'column',gap:2}},zInters.map(i=>r('div',{key:i.id,style:{display:'flex',alignItems:'center',gap:4,padding:'2px 4px',background:c.surf3,borderRadius:4}},r('span',{style:{fontFamily:c.mono,fontSize:9,fontWeight:700,color:'#0277BD',flex:1}},this.genInterCode(i,this.state)),this.Bdg({simple:'SA',va_vient:'VV',poussoir:'PO',double:'DA',variateur:'VA',detecteur:'DT',domotique:'DM'}[i.type]||i.type,'#0277BD'),r('button',{onClick:()=>{this.deleteItem('interrupteurs',i.id);this.showToast('Supprime');},style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:10,padding:0}},'x')))));};

        const cbColCard2=d=>{
          const tw2=djPwr(d);const l2=this.djNFCLimit(d);const pct2=Math.min(Math.round(tw2/l2.maxW*100),100);const over2=tw2>l2.maxW;
          const teCB2=tableauxElec.find(t=>t.id===d.tableauId);
          const teCode2=teCB2?this.genTECode(teCB2,this.state):'ND';
          const cbCode2=this.genDjCode(allDj.slice(0,allDj.indexOf(d)),d.tableauId);
          if(visibleCbIds&&!visibleCbIds.includes(d.id))return null;
          const cbOn2=filtCbId===d.id;
          return r('div',{key:d.id,onClick:(e)=>{if(e.target.tagName==='BUTTON'||e.target.closest('button'))return;toggleSel('cbId',d.id);},style:{margin:'4px 8px',background:cbOn2?'rgba(239,68,68,.08)':'#fff',border:'1px solid '+(cbOn2?'#ef4444':over2?c.danger:c.bdr),borderRadius:6,padding:'7px 9px',cursor:'pointer',outline:selRing(cbOn2,'#ef4444'),transition:'all .15s'}},
            r('div',{style:{display:'flex',alignItems:'center',gap:4,marginBottom:3}},
              r('span',{style:{fontFamily:c.mono,fontSize:11,fontWeight:900,color:'#ef4444',flex:1}},cbCode2),
              this.Bdg(d.courbe+d.calibre+'A','#ef4444'),
              d.ddr>0&&this.Bdg(d.ddr+'mA','#0284C7'),
              r('button',{onClick:()=>this.setState({showModal:true,modalType:'editDisjoncteur',editId:d.id}),style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',padding:1}},this.ico('pencil',8)),
              r('button',{onClick:()=>this.setState(st=>({disjoncteurs:st.disjoncteurs.filter(x=>x.id!==d.id)})),style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:10,padding:0}},'x')
            ),
            r('div',{style:{fontSize:8,color:'#94a3b8',fontFamily:c.mono,marginBottom:3}},teCode2+(d.tableauId?'':' — sans tableau')),
            r('div',{style:{height:3,background:c.bdr2,borderRadius:2,overflow:'hidden'}},r('div',{style:{height:'100%',width:pct2+'%',background:over2?c.danger:pct2>80?c.warn:'#22c55e',borderRadius:2}})),
            over2&&r('div',{style:{fontSize:7,color:c.danger,fontWeight:700,marginTop:2}},'DEPASSE NFC')
          );
        };
        const anySel=filtSrcId||filtTeId||filtCbId||filtBdId;
        return r('div',null,
          anySel&&r('div',{style:{display:'flex',alignItems:'center',gap:6,padding:'5px 10px',marginBottom:6,background:'rgba(2,119,189,.06)',border:'1px solid rgba(2,119,189,.2)',borderRadius:7,fontSize:10}},
            r('span',{style:{color:'#0277BD',fontWeight:600}},'Filtre :'),
            filtSrcId&&r('span',{style:{padding:'2px 7px',background:'#16a34a20',borderRadius:4,color:'#16a34a',fontWeight:700}},this.genSourceCode(departs.find(d=>d.id===filtSrcId)||{type:'comptage',id:filtSrcId},this.state)),
            filtTeId&&r('span',{style:{padding:'2px 7px',background:'#0277BD20',borderRadius:4,color:'#0277BD',fontWeight:700}},this.genTECode(tableauxElec.find(t=>t.id===filtTeId)||{id:filtTeId},this.state)),
            filtCbId&&r('span',{style:{padding:'2px 7px',background:'#ef444420',borderRadius:4,color:'#ef4444',fontWeight:700}},(()=>{const dj=this.state.disjoncteurs.find(d=>d.id===filtCbId);return dj?this.genDjCode(this.state.disjoncteurs.slice(0,this.state.disjoncteurs.indexOf(dj)),dj.tableauId):'CB?';})()),
            filtBdId&&r('span',{style:{padding:'2px 7px',background:'#f59e0b20',borderRadius:4,color:'#f59e0b',fontWeight:700}},this.genBDCode(boitesDeriv.find(b=>b.id===filtBdId)||{id:filtBdId},this.state)),
            r('button',{onClick:()=>setSel({srcId:null,teId:null,cbId:null,bdId:null}),style:{marginLeft:'auto',padding:'2px 8px',background:'transparent',border:'1px solid #94a3b8',borderRadius:4,fontSize:9,cursor:'pointer',color:'#64748b'}},'× Réinitialiser')
          ),
          r('div',{style:{display:'flex',height:'calc(100vh - 250px)',overflowX:'auto',overflowY:'hidden',border:'1px solid '+c.bdr,borderRadius:10,background:c.surf2}},

          r('div',{style:{...colW,minWidth:180}},
            r('div',{style:colHdrSt('#16a34a')},r('span',{style:{fontSize:10,fontWeight:800,color:'#16a34a',textTransform:'uppercase',letterSpacing:'.06em',flex:1}},'Sources'),r('button',{onClick:openDep,style:{background:'#16a34a',color:'#fff',border:'none',borderRadius:5,padding:'3px 7px',fontSize:9,fontWeight:700,cursor:'pointer'}},'+Src')),
            r('div',{style:colBody},
              deps.length===0?r('div',{style:{padding:'14px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucune source'):deps.map(d=>srcCard(d)),
              (hasCpt&&hasAlt||invs.length>0)&&r('div',{style:{margin:'6px 8px',padding:'7px 10px',background:'rgba(6,182,212,.06)',border:'1px solid rgba(6,182,212,.25)',borderRadius:7}},
                r('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:invs.length?4:0}},this.ico('inverseur_source',12),r('span',{style:{fontSize:10,fontWeight:700,color:'#0891b2',flex:1}},'Inverseur IS'),invs.length===0&&r('button',{onClick:()=>this.checkAutoInverseur(deps),style:{background:'#0891b2',color:'#fff',border:'none',borderRadius:4,padding:'2px 7px',fontSize:9,cursor:'pointer'}},'Creer IS')),
                invs.map(inv=>r('div',{key:inv.id,style:{fontSize:9,color:'#0891b2',fontFamily:c.mono,display:'flex',alignItems:'center',gap:4}},inv.code,r('button',{onClick:()=>this.setState(st=>({inverseurs:st.inverseurs.filter(x=>x.id!==inv.id)})),style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:10,padding:0}},'x')))
              )
            )
          ),

          r('div',{style:{...colW,minWidth:220,display:'flex',flexDirection:'column'}},
            r('div',{style:{display:'flex',flexDirection:'column',flex:'0 0 50%',minHeight:0,borderBottom:'2px solid '+c.bdr}},
              r('div',{style:colHdrSt('#0277BD')},r('span',{style:{fontSize:10,fontWeight:800,color:'#0277BD',textTransform:'uppercase',letterSpacing:'.06em',flex:1}},'Tableaux principaux'),r('button',{onClick:openTP,style:{background:'#0277BD',color:'#fff',border:'none',borderRadius:5,padding:'3px 7px',fontSize:9,fontWeight:700,cursor:'pointer'}},'+TP')),
              r('div',{style:{...colBody,flex:1,minHeight:0}},
                tabPrinc.length===0?r('div',{style:{padding:'14px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucun tableau principal'):tabPrinc.map(te=>tabCardCol(te,'#0277BD'))
              )
            ),
            r('div',{style:{display:'flex',flexDirection:'column',flex:'0 0 50%',minHeight:0}},
              r('div',{style:colHdrSt('#7c3aed')},r('span',{style:{fontSize:10,fontWeight:800,color:'#7c3aed',textTransform:'uppercase',letterSpacing:'.06em',flex:1}},'Tableaux secondaires'),r('button',{onClick:openTS,style:{background:'#7c3aed',color:'#fff',border:'none',borderRadius:5,padding:'3px 7px',fontSize:9,fontWeight:700,cursor:'pointer'}},'+TS')),
              r('div',{style:{...colBody,flex:1,minHeight:0}},tabSec.length===0?r('div',{style:{padding:'14px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucun tableau secondaire'):tabSec.map(te=>tabCardCol(te,'#7c3aed')))
            )
          ),

          r('div',{style:{...colW,minWidth:190}},
            r('div',{style:colHdrSt('#ef4444')},r('span',{style:{fontSize:10,fontWeight:800,color:'#ef4444',textTransform:'uppercase',letterSpacing:'.06em',flex:1}},'Protection'),r('button',{onClick:()=>addCB(tableauxElec[0]&&tableauxElec[0].id),style:{background:'#ef4444',color:'#fff',border:'none',borderRadius:5,padding:'3px 7px',fontSize:9,fontWeight:700,cursor:'pointer'}},'+CB')),
            r('div',{style:colBody},allDj.length===0?r('div',{style:{padding:'14px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucun disjoncteur'):allDj.map(d=>cbColCard2(d)),orphanCBs.length>0&&r('div',{style:{margin:'4px 8px',padding:'5px 8px',background:'rgba(0,0,0,.03)',border:'1px dashed '+c.bdr2,borderRadius:5}},r('div',{style:{fontSize:8,color:c.muted,marginBottom:2}},'CB sans tableau'),orphanCBs.map(d=>cbColCard2(d))))
          ),

          r('div',{style:{...colW,minWidth:200,display:'flex',flexDirection:'column'}},
            r('div',{style:{display:'flex',flexDirection:'column',flex:'0 0 50%',minHeight:0,borderBottom:'2px solid '+c.bdr}},
              r('div',{style:colHdrSt('#94a3b8')},r('span',{style:{fontSize:10,fontWeight:800,color:'#64748b',textTransform:'uppercase',letterSpacing:'.06em',flex:1}},'Boites de derivation'),r('button',{onClick:()=>{this.setState({showModal:true,modalType:'addBoite',editId:null,boiteForm:{nom:'',label:'',pieceId:'',type:'encastre',tableauId:'',position:'',hauteurPlafond:30,cote:'plafond',description:'',raccordType:'connecteur',raccordIdx:1,retourDepart:false,retourEditFonction:false}});},style:{background:'#94a3b8',color:'#fff',border:'none',borderRadius:5,padding:'3px 7px',fontSize:9,fontWeight:700,cursor:'pointer'}},'+BD')),
              r('div',{style:{...colBody,flex:1,minHeight:0}},boitesDeriv.length===0?r('div',{style:{padding:'14px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucune boite'):boitesDeriv.map(b=>boiteCardCol(b)))
            ),
            r('div',{style:{display:'flex',flexDirection:'column',flex:'0 0 50%',minHeight:0}},
              r('div',{style:colHdrSt('#7c3aed')},r('span',{style:{fontSize:10,fontWeight:800,color:'#7c3aed',textTransform:'uppercase',letterSpacing:'.06em',flex:1}},'Zones de commande'),r('button',{onClick:()=>this.setState({showModal:true,modalType:'addZone',editId:null,zoneForm:{nom:'',pieceId:'',position:'',hauteur:120,cote:'gauche',retourEditFonction:false}}),style:{background:'#7c3aed',color:'#fff',border:'none',borderRadius:5,padding:'3px 7px',fontSize:9,fontWeight:700,cursor:'pointer'}},'+Zone')),
              r('div',{style:{...colBody,flex:1,minHeight:0}},zonesCommande.length===0?r('div',{style:{padding:'14px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucune zone'):r('div',null,zonesCommande.map(z=>zoneCardCol(z))))
            )
          ),

          r('div',{style:{...colW,minWidth:190}},
            r('div',{style:colHdrSt('#0891b2')},
              r('span',{style:{fontSize:10,fontWeight:800,color:'#0891b2',textTransform:'uppercase',letterSpacing:'.06em',flex:1}},'Interrupteurs'),
              r('button',{onClick:()=>this.setState({showModal:true,modalType:'addInter',editId:null,interForm:{nom:'',pieceId:'',type:'simple',circuitRef:'',zoneId:''}}),style:{background:'#0891b2',color:'#fff',border:'none',borderRadius:5,padding:'3px 7px',fontSize:9,fontWeight:700,cursor:'pointer'}},'+Inter')
            ),
            r('div',{style:colBody},
              interrupteurs.length===0
                ?r('div',{style:{padding:'14px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucun interrupteur')
                :r('div',null,interrupteurs.map(i=>{
                  const zone=zonesCommande.find(z=>z.id===i.zoneId);
                  const pc=pieces.find(p=>p.id===i.pieceId);
                  const TYPE_LBL={simple:'Simple',va_vient:'Va-et-vient',poussoir:'Poussoir',double:'Double',variateur:'Variateur',detecteur:'Detecteur',domotique:'Domotique'};
                  const sel=this.state.selectedInterId===i.id;
                  return r('div',{key:i.id,onClick:()=>this.setState({selectedInterId:sel?null:i.id}),title:'Cliquer pour voir les lampes commandées',style:{margin:'4px 8px',background:sel?'rgba(8,145,178,.06)':c.surf,border:'1px solid '+(sel?'#0891b2':c.bdr),borderRadius:6,padding:'7px 9px',cursor:'pointer'}},
                    r('div',{style:{display:'flex',alignItems:'center',gap:4,marginBottom:2}},
                      r('span',{style:{fontFamily:c.mono,fontSize:11,fontWeight:900,color:'#0891b2',flex:1}},this.genInterCode(i,this.state)),
                      this.Bdg(TYPE_LBL[i.type]||i.type,'#0891b2'),
                      r('button',{onClick:e=>{e.stopPropagation();this.openEdit('addInter',i,'interForm',{nom:i.nom||'',pieceId:i.pieceId?String(i.pieceId):'',type:i.type||'simple',circuitRef:i.circuitRef||'',zoneId:i.zoneId?String(i.zoneId):''});},style:{background:'transparent',border:'none',color:c.muted,cursor:'pointer',padding:1}},this.ico('pencil',8)),
                      r('button',{onClick:e=>{e.stopPropagation();this.deleteItem('interrupteurs',i.id);this.showToast('Supprime');},style:{background:'transparent',border:'none',color:c.danger,cursor:'pointer',fontSize:10,padding:0}},'x')
                    ),
                    r('div',{style:{display:'flex',gap:3,flexWrap:'wrap'}},
                      i.circuitRef&&this.Bdg(i.circuitRef,'#64748b'),
                      zone&&this.Bdg(zone.zoneCode||zone.nom,'#7c3aed'),
                      pc&&this.Bdg(pc.nom,c.muted)
                    )
                  );
                }))
            )
          ),

          r('div',{style:{...colW,minWidth:200,borderRight:'none'}},
            r('div',{style:colHdrSt('#f59e0b')},r('span',{style:{fontSize:10,fontWeight:800,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'.06em',flex:1}},'Lampes commandées')),
            r('div',{style:colBody},(()=>{
              const i=interrupteurs.find(x=>x.id===this.state.selectedInterId);
              if(!i)return r('div',{style:{padding:'14px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Cliquez un interrupteur pour afficher les lampes commandées');
              const refs=[i.circuitRef].filter(Boolean);
              if(i.zoneId)interrupteurs.forEach(o=>{if(o.zoneId===i.zoneId&&o.circuitRef&&refs.indexOf(o.circuitRef)<0)refs.push(o.circuitRef);});
              const linked=refs.map(rf=>({rf,x:pieces.flatMap(p=>(p.fonctions||[]).map(fn=>({fn,p}))).find(y=>y.fn.ref===rf)}));
              return r('div',{style:{padding:'6px 8px'}},
                r('div',{style:{fontSize:10,fontFamily:c.mono,fontWeight:800,color:'#0891b2',marginBottom:6,display:'flex',alignItems:'center',gap:5}},this.genInterCode(i,this.state),r('span',{style:{color:c.muted,fontSize:12}},'→')),
                ...linked.map(({rf,x},k)=>{
                  if(!x)return r('div',{key:k,style:{fontSize:9,color:c.muted,fontStyle:'italic',padding:'6px 0'}},'Circuit '+rf+' introuvable');
                  const fn=x.fn;const isEcl=fn.type==='eclairage';const q=fn.quantite||1;const fi=this.FNS[fn.type]||{};
                  const lamp=isEcl?(this.LAMP_TYPES[fn.typeLampe]?.label||fn.typeLampe||''):'';
                  const pw=isEcl?(fn.puissance||10)*q:0;
                  return r('div',{key:k,style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:6,padding:'8px 9px',marginBottom:5,display:'flex',alignItems:'flex-start',gap:8}},
                    r('div',{style:{width:28,height:28,borderRadius:6,background:(fi.color||'#f59e0b')+'18',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:fi.color||'#f59e0b'}},this.ico(fi.ico||'eclairage',15)),
                    r('div',{style:{flex:1,minWidth:0}},
                      r('div',{style:{fontSize:11,fontWeight:700,color:c.text}},isEcl?q+' point'+(q>1?'s':'')+' lumineux':(fi.label||fn.type)),
                      lamp&&r('div',{style:{fontSize:9,color:c.muted}},lamp),
                      r('div',{style:{fontSize:9,fontFamily:c.mono,color:fi.color||'#f59e0b'}},rf+(pw>0?' · '+pw+'W':'')+' · '+x.p.nom)));
                }),
                linked.length===0?r('div',{style:{fontSize:10,color:c.muted,fontStyle:'italic',padding:'8px 0'}},'Aucun circuit associé à cet interrupteur'):null);
            })())
          )

        )
        );
      })(),
      // ── AUTO CIRCUITS TAB ──
      circuitsTab==='auto'&&r('div',null,
        r('div',{className:'cbt-rgrid5',style:{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginBottom:14}},
          this.Stat(circuits.length,'Total',c.acBlue),this.Stat(circuits.filter(ci=>ci.type==='eclairage').length,'Éclairage','#f59e0b'),
          this.Stat(circuits.filter(ci=>ci.type==='prises').length,'Prises',c.acBlue),this.Stat(circuits.filter(ci=>ci.type==='specialise').length,'Spécialisés',c.danger),
          this.Stat((circuits.reduce((s,ci)=>s+ci.puissance,0)/1000).toFixed(1)+' kW','Charge',c.warn)),
        r('div',{style:{display:'flex',gap:4,marginBottom:12}},
          ...['all','eclairage','prises','specialise'].map(f=>r('button',{key:f,onClick:()=>this.setState({circuitFilter:f}),style:{padding:'4px 10px',borderRadius:6,fontSize:11,fontWeight:500,cursor:'pointer',background:circuitFilter===f?c.accent:'transparent',border:`1px solid ${circuitFilter===f?c.accent:c.bdr2}`,color:circuitFilter===f?'#fff':c.muted,fontFamily:c.font}},{all:'Tous',eclairage:'Éclairage',prises:'Prises',specialise:'Spécialisés'}[f]))),
        r('div',{style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:12,overflow:'hidden'}},
          r('table',{style:{width:'100%',borderCollapse:'collapse',fontSize:11}},
            r('thead',null,r('tr',{style:{background:c.surf3,borderBottom:`1px solid ${c.bdr2}`}},...['#','Circuit','Pièce','Section','Disj.','DDR','Puiss.','Long.'].map(h=>r('th',{key:h,style:{padding:'8px 12px',textAlign:'left',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.06em',whiteSpace:'nowrap'}},h)))),
            r('tbody',null,...(circuitFilter==='all'?circuits:circuits.filter(ci=>ci.type===circuitFilter)).map((ci,i)=>r('tr',{key:ci.id,style:{borderBottom:`1px solid ${c.bdr}`,background:i%2?'transparent':'rgba(255,255,255,.01)'}},
              r('td',{style:{padding:'7px 12px',color:c.muted,fontFamily:c.mono}},ci.id),
              r('td',{style:{padding:'7px 12px'}},r('div',{style:{display:'flex',alignItems:'center',gap:6}},r('div',{style:{width:6,height:6,borderRadius:2,background:ci.color,flexShrink:0}}),r('span',{style:{color:c.text,fontWeight:500}},ci.nom))),
              r('td',{style:{padding:'7px 12px',color:c.text2}},ci.piece),
              r('td',{style:{padding:'7px 12px'}},this.Bdg(ci.section+' mm²',c.muted)),
              r('td',{style:{padding:'7px 12px'}},this.Bdg(ci.calibreType+ci.calibre+'A',ci.color)),
              r('td',{style:{padding:'7px 12px'}},r('span',{style:{fontSize:10,padding:'2px 6px',borderRadius:5,background:ci.ddr===2?'rgba(239,68,68,.12)':'rgba(37,99,235,.1)',color:ci.ddr===2?c.danger:c.acBlue}},'DDR'+ci.ddr)),
              r('td',{style:{padding:'7px 12px',color:c.warn,fontFamily:c.mono}},(ci.puissance/1000).toFixed(1)+' kW'),
              r('td',{style:{padding:'7px 12px',color:c.text2,fontFamily:c.mono}},'~'+ci.len+'m'))))
          )
        )
      )
    );
  }

  vTableau(circuits){
    const tab=this.calcTableau(circuits);const c=this.C;const r=this.r;
    const Brk=ci=>{const col={eclairage:'#f59e0b',prises:'#3b82f6',specialise:'#ef4444'}[ci.type]||c.acBlue;return r('div',{key:ci.id,title:ci.nom,style:{width:32,height:58,background:`linear-gradient(180deg,${col}18,${col}06)`,border:`1px solid ${col}40`,borderRadius:4,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',padding:'3px 2px',flexShrink:0}},r('div',{style:{fontSize:7,color:col,fontFamily:c.mono,textAlign:'center',lineHeight:1.2}},ci.calibreType+'\n'+ci.calibre+'A'),r('div',{style:{width:7,height:14,background:col+'70',borderRadius:2}}),r('div',{style:{fontSize:7,color:c.muted,textAlign:'center',fontFamily:c.mono}},ci.section+'\nmm²'));};
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease'}},
      this.SH('Tableau électrique','NF C 15-100 — '+tab.nbMod+' modules'),
      r('div',{style:{display:'grid',gridTemplateColumns:'1fr 340px',gap:14}},
        r('div',{style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:12,padding:20}},
          r('div',{style:{fontSize:10,fontWeight:700,color:c.text2,marginBottom:14,textTransform:'uppercase',letterSpacing:'.07em'}},'SCHÉMA TABLEAU — NF C 15-100'),
          r('div',{style:{background:c.surf==='#ffffff'?'#e8edf5':'#12172a',border:`2px solid ${c.surf==='#ffffff'?'#c8d5e8':'#1e2d4a'}`,borderRadius:10,padding:16,fontFamily:c.mono}},
            r('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${c.bdr3}`}},
              r('div',{style:{width:48,height:78,background:'linear-gradient(180deg,#1f3a6e,#0f1f3a)',border:'2px solid #3b6dc7',borderRadius:5,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}},r('div',{style:{fontSize:8,color:'#6ba3ff',fontWeight:700}},'D.G.'),r('div',{style:{fontSize:12,color:'#93c5fd',fontWeight:800}},tab.calibreDG+'A'),r('div',{style:{fontSize:7,color:'#475569'}},'Type S')),
              tab.parafoudre&&r('div',{style:{width:38,height:78,background:'linear-gradient(180deg,#2d1f5e,#18103a)',border:'2px solid #7c3aed',borderRadius:5,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}},r('div',{style:{fontSize:8,color:'#a78bfa',fontWeight:700}},'PFD'),r('div',{style:{fontSize:15,color:'#7c3aed'}},this.ico('zap_ico',14)),r('div',{style:{fontSize:7,color:'#475569',textAlign:'center',lineHeight:1.2}},'Para\nfoudre')),
              r('div',{style:{fontSize:11,color:c.muted}},r('div',{style:{marginBottom:3}},'Signal: '+this.state.project.puissanceSouscrite+' kVA'),r('div',{style:{marginBottom:3}},'D.G. '+tab.calibreDG+'A — Type S'),tab.parafoudre&&r('div',null,'Parafoudre requis'))),
            ...tab.ddrs.map(ddr=>r('div',{key:ddr.id,style:{marginBottom:14}},
              r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:6}},
                r('div',{style:{width:48,height:60,background:`linear-gradient(180deg,${ddr.type==='A'?'#3a0f0f':'#0f1f3e'},${ddr.type==='A'?'#230707':'#071428'})`,border:`2px solid ${ddr.type==='A'?'#991b1b':'#1d4ed8'}`,borderRadius:5,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,flexShrink:0}},r('div',{style:{fontSize:7,color:ddr.type==='A'?'#fca5a5':'#93c5fd',fontWeight:700}},'DDR '+ddr.id),r('div',{style:{fontSize:9,color:ddr.type==='A'?'#fca5a5':'#93c5fd',fontWeight:800}},ddr.calibre+'A'),r('div',{style:{fontSize:7,color:'#475569'}},ddr.sensib+' mA'),r('div',{style:{fontSize:7,color:ddr.type==='A'?c.danger:c.acBlue,fontWeight:700}},'Type '+ddr.type)),
                r('div',{style:{display:'flex',gap:3,flexWrap:'wrap',alignItems:'center'}},...ddr.circuits.map(ci=>Brk(ci)))),
              r('div',{style:{fontSize:9,color:c.muted,paddingLeft:56,fontFamily:c.font}},ddr.label))))),
        r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
          this.Card('Récapitulatif',r('div',null,...[['D.G.',tab.calibreDG+'A Type S'],['Modules',tab.nbMod+' modules'],['DDR',tab.ddrs.length+' interrupteurs diff.'],['Parafoudre',tab.parafoudre?'Oui — requis ≥9kVA':'Non requis'],['Alimentation',this.state.project.typeAlim==='triphase'?'Triphasé 400V':'Monophasé 230V']].map(([l,v])=>r('div',{key:l,style:{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${c.bdr}`}},r('span',{style:{fontSize:11,color:c.muted}},l),r('span',{style:{fontSize:11,color:c.text2,fontFamily:c.mono,fontWeight:500}},v)))),null,14),
          this.Card('Protections diff.',r('div',null,...tab.ddrs.map(ddr=>r('div',{key:ddr.id,style:{marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${c.bdr}`}},r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:3}},r('span',{style:{fontSize:12,fontWeight:600,color:c.text}},'DDR '+ddr.id+' Type '+ddr.type),this.Bdg(ddr.calibre+'A/'+ddr.sensib+'mA',ddr.type==='A'?c.danger:c.acBlue)),r('div',{style:{fontSize:11,color:c.muted}},ddr.label),r('div',{style:{fontSize:11,color:c.text2,fontFamily:c.mono}},ddr.circuits.length+' circuits')))),null,14),
          this.Card('Normes',r('div',{style:{fontSize:10,color:c.muted,lineHeight:1.9,display:'flex',flexDirection:'column',gap:3}},r('div',null,'> DDR 30mA type A — cuisine & SDB'),r('div',null,'> D.G. adapté à la puissance souscrite'),r('div',null,'> Parafoudre obligatoire P ≥ 9kVA'),r('div',null,'> Max 8 circuits par DDR 40A')),null,14)
        )
      )
    );
  }

  vRealisation(circuits){
    const{realisationTab,realisationFilter,realisationChecks,mesures,nomenclatureOverrides,pieces,appartements,tableauxElec,boitesDeriv,interrupteurs,zonesCommande,tests}=this.state;
    const c=this.C;const r=this.r;const sky='#0277BD';
    const setTab=t=>this.setState({realisationTab:t});
    const sf=upd=>this.setState(s=>({realisationFilter:{...s.realisationFilter,...upd}}));
    const tck=id=>this.setState(s=>({realisationChecks:{...s.realisationChecks,[id]:!s.realisationChecks[id]}}));
    const setM=(id,v)=>this.setState(s=>({mesures:{...s.mesures,[id]:v}}));
    const tTest=(id,v)=>this.setState(s=>({tests:{...s.tests,[id]:s.tests[id]===v?undefined:v}}));
    const STl=[['todo','A faire','rgba(148,163,184,.1)','rgba(148,163,184,.3)','#64748b'],['en_cours','En cours','rgba(2,119,189,.08)','rgba(2,119,189,.3)','#0277BD'],['valide','Valide','rgba(22,163,74,.08)','rgba(22,163,74,.3)','#16a34a'],['non_conf','Non conf.','rgba(220,38,38,.08)','rgba(220,38,38,.3)','#dc2626'],['bloque','Bloque','rgba(217,119,6,.08)','rgba(217,119,6,.3)','#d97706']];
    const gSt=id=>realisationChecks[id+'_s']||'todo';
    const setSt=(id,s2)=>this.setState(st=>({realisationChecks:{...st.realisationChecks,[id+'_s']:s2}}));
    const fApp=realisationFilter.appId?+realisationFilter.appId:null;
    const fPiece=realisationFilter.pieceId?+realisationFilter.pieceId:null;
    const filtPieces=pieces.filter(p=>{if(fApp&&p.appId!==fApp)return false;if(fPiece&&p.id!==fPiece)return false;return true;});
    const filtFns=filtPieces.flatMap(p=>(p.fonctions||[]).map(fn=>({...fn,piece:p})));
    const tabBtn=(id,lbl,ic)=>r('button',{onClick:()=>setTab(id),style:{padding:'7px 14px',borderRadius:7,fontSize:11,fontWeight:realisationTab===id?700:400,cursor:'pointer',border:'1px solid '+(realisationTab===id?sky:c.bdr2),background:realisationTab===id?'rgba(2,119,189,.1)':'transparent',color:realisationTab===id?sky:c.text2,display:'flex',alignItems:'center',gap:5}},ic,' ',lbl);
    const StBtns=(id)=>r('div',{style:{display:'flex',gap:3,flexShrink:0}},STl.map(([k,lbl,bg,bc,col])=>r('button',{key:k,onClick:e=>{e.stopPropagation();setSt(id,k);},style:{padding:'1px 5px',borderRadius:3,fontSize:8,fontWeight:700,cursor:'pointer',border:'1px solid '+(gSt(id)===k?bc:c.bdr2),background:gSt(id)===k?bg:'transparent',color:gSt(id)===k?col:c.muted}},lbl)));
    const CK=(id,lbl,ref,detail)=>{const done=!!realisationChecks[id];return r('div',{key:id,style:{display:'flex',alignItems:'flex-start',gap:8,padding:'7px 12px',borderBottom:'1px solid '+c.bdr,background:done?'rgba(22,163,74,.03)':'transparent'}},r('button',{onClick:()=>tck(id),style:{width:19,height:19,borderRadius:4,border:'2px solid '+(done?'#16a34a':c.bdr2),background:done?'#16a34a':'transparent',color:'#fff',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',marginTop:1,fontSize:11,fontWeight:700}},done?'v':''),r('div',{style:{flex:1,minWidth:0}},r('div',{style:{fontSize:11,fontWeight:done?400:500,color:done?c.muted:c.text,textDecoration:done?'line-through':'none'}},lbl,ref&&r('span',{style:{fontFamily:c.mono,fontSize:8,color:c.muted,marginLeft:5,fontWeight:400}},ref)),detail&&r('div',{style:{fontSize:9,color:c.muted,marginTop:2}},detail)),StBtns(id));};
    const PH=(lbl,col,n,nd)=>r('div',{style:{display:'flex',alignItems:'center',gap:8,padding:'9px 14px',background:col+'0d',borderBottom:'2px solid '+col,borderTop:'1px solid '+c.bdr}},r('div',{style:{width:7,height:7,borderRadius:'50%',background:col}}),r('span',{style:{fontSize:11,fontWeight:700,color:col,flex:1,textTransform:'uppercase',letterSpacing:'.07em'}},lbl),r('span',{style:{fontSize:9,color:c.muted}},'('+(nd||0)+'/'+n+')'));
    const MI=(id,lbl,u,ref,seuil)=>r('div',{key:id,style:{display:'flex',alignItems:'center',gap:10,padding:'7px 14px',borderBottom:'1px solid '+c.bdr}},r('div',{style:{flex:1}},r('div',{style:{fontSize:11,color:c.text,fontWeight:500}},lbl),r('div',{style:{fontSize:8,color:c.muted,fontFamily:c.mono,marginTop:1}},ref+(seuil?' Seuil: '+seuil:''))),r('div',{style:{display:'flex',alignItems:'center',gap:5}},r('input',{type:'text',placeholder:'--',value:mesures[id]||'',onChange:e=>setM(id,e.target.value),style:{width:72,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 7px',fontSize:12,fontFamily:c.mono,color:c.text,outline:'none',textAlign:'center'}}),r('span',{style:{fontSize:9,color:c.muted,minWidth:20}},u)),r('div',{style:{display:'flex',gap:3}},r('button',{onClick:()=>tTest(id,'pass'),style:{padding:'2px 6px',border:'1px solid '+(tests[id]==='pass'?'rgba(22,163,74,.4)':c.bdr2),borderRadius:3,background:tests[id]==='pass'?'rgba(22,163,74,.12)':'transparent',color:tests[id]==='pass'?'#16a34a':c.muted,fontSize:9,fontWeight:700,cursor:'pointer'}},'OK'),r('button',{onClick:()=>tTest(id,'fail'),style:{padding:'2px 6px',border:'1px solid '+(tests[id]==='fail'?'rgba(220,38,38,.4)':c.bdr2),borderRadius:3,background:tests[id]==='fail'?'rgba(220,38,38,.12)':'transparent',color:tests[id]==='fail'?'#dc2626':c.muted,fontSize:9,fontWeight:700,cursor:'pointer'}},'NC')));
    const Empty=()=>r('div',{style:{padding:'12px',textAlign:'center',fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucun element');
    const tabBord=()=>{
      const allFnsAll=pieces.flatMap(p=>(p.fonctions||[]).map(fn=>({...fn,piece:p})));
      // Avancement nomenclature
      const getSchemaLen2=(fnType)=>{if(fnType==='rj45')return 1;if(fnType==='domotique')return 2;if(['va_vient','poussoir'].includes(fnType))return 3;if(fnType==='variateur'||fnType==='double')return 4;return 3;};
      let totalCables=0,confCables=0,ncCables=0,resCables=0,wIdx2=1;
      allFnsAll.forEach(fn=>{
        const wCode=this.genCEBATCode(fn,this.state);
        const nbFils=getSchemaLen2(fn.type);
        let cNc=0,cRes=0,cConf=0;
        for(let i=1;i<=nbFils;i++){const st=(nomenclatureOverrides[wCode+'_fil'+i]||{}).statut||'';if(st==='conf')cConf++;else if(st==='nc')cNc++;else if(st==='res')cRes++;}
        totalCables++;if(cNc>0)ncCables++;else if(cRes>0)resCables++;else if(cConf===nbFils)confCables++;wIdx2++;
        interrupteurs.filter(i=>i.circuitRef===fn.ref).forEach(inter=>{
          const wCodeI=this.genCEBATCode(fn,this.state)+'i'+(wIdx2);const nbFilsI=getSchemaLen2(inter.type||'simple');let ciNc=0,ciRes=0,ciConf=0;
          for(let i=1;i<=nbFilsI;i++){const st=(nomenclatureOverrides[wCodeI+'_fil'+i]||{}).statut||'';if(st==='conf')ciConf++;else if(st==='nc')ciNc++;else if(st==='res')ciRes++;}
          totalCables++;if(ciNc>0)ncCables++;else if(ciRes>0)resCables++;else if(ciConf===nbFilsI)confCables++;wIdx2++;
        });
      });
      const pendingCables=totalCables-confCables-ncCables-resCables;
      // Controle qualite
      const allQCids2=['qc01','qc02','qc03','qc04','qc05','qc06','qc07','qc08','qc09','qc10','qc11','qc12','qc13','qc14','qc15','qc16','qc17','qc18','qc19','qc20','qc21','qc22','qc23','qc24'];
      const qcOk2=allQCids2.filter(id=>realisationChecks['qc_'+id]).length;
      const qcNc2=allQCids2.filter(id=>realisationChecks['qc_nc_'+id]).length;
      const qcPct2=allQCids2.length?Math.round(qcOk2/allQCids2.length*100):0;
      const Bar=(pct,col)=>r('div',{style:{height:5,background:'#f1f5f9',borderRadius:3,overflow:'hidden',marginTop:5}},r('div',{style:{height:'100%',width:Math.min(pct,100)+'%',background:col,borderRadius:3}}));
      const Sec=(title,col,children)=>r('div',{style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:10,overflow:'hidden',boxShadow:c.elev1}},r('div',{style:{padding:'8px 14px',borderBottom:'2px solid '+col,background:col+'08',fontSize:9,fontWeight:800,color:col,textTransform:'uppercase',letterSpacing:'.08em'}},title),r('div',{style:{padding:'10px 14px'}},children));
      return r('div',null,
        r('div',{className:'cbt-rgrid5',style:{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginBottom:14}},
          [{v:allFnsAll.length,l:'Fonctions',col:'#0277BD'},{v:totalCables,l:'Cables W',col:'#7c3aed'},{v:this.state.disjoncteurs.length,l:'Disjoncteurs',col:'#ef4444'},{v:interrupteurs.length,l:'Interrupteurs',col:'#0891b2'},{v:boitesDeriv.length+tableauxElec.length,l:'BD + TE',col:'#f59e0b'}]
          .map(s=>r('div',{key:s.l,style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:9,padding:'10px 13px',boxShadow:c.elev1}},r('div',{style:{fontFamily:c.mono,fontSize:20,fontWeight:900,color:s.col}},s.v),r('div',{style:{fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em',marginTop:2}},s.l)))
        ),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}},
          Sec('Nomenclature cables','#7c3aed',r('div',null,
            r('div',{style:{display:'flex',gap:6,marginBottom:6}},
              [{v:confCables,l:'Conformes',col:'#16a34a'},{v:ncCables,l:'Non conf.',col:'#dc2626'},{v:resCables,l:'Reserves',col:'#d97706'},{v:pendingCables,l:'En attente',col:'#94a3b8'}]
              .map(s=>r('div',{key:s.l,style:{flex:1,padding:'5px 6px',background:s.col+'0d',borderRadius:6,textAlign:'center'}},r('div',{style:{fontFamily:c.mono,fontSize:14,fontWeight:900,color:s.col}},s.v),r('div',{style:{fontSize:8,fontWeight:700,color:s.col,textTransform:'uppercase',marginTop:1}},s.l)))
            ),
            Bar(totalCables>0?Math.round(confCables/totalCables*100):0,'#16a34a'),
            r('div',{style:{fontSize:9,color:c.muted,marginTop:3,textAlign:'right'}},confCables+'/'+totalCables+' cables conformes')
          )),
          Sec('Controle qualite NF C 15-100','#16a34a',r('div',null,
            r('div',{style:{display:'flex',gap:6,marginBottom:6}},
              [{v:qcOk2,l:'Points OK',col:'#16a34a'},{v:qcNc2,l:'Non conf.',col:'#dc2626'},{v:allQCids2.length-qcOk2-qcNc2,l:'A verifier',col:'#94a3b8'}]
              .map(s=>r('div',{key:s.l,style:{flex:1,padding:'5px 6px',background:s.col+'0d',borderRadius:6,textAlign:'center'}},r('div',{style:{fontFamily:c.mono,fontSize:14,fontWeight:900,color:s.col}},s.v),r('div',{style:{fontSize:8,fontWeight:700,color:s.col,textTransform:'uppercase',marginTop:1}},s.l)))
            ),
            Bar(qcPct2,'#16a34a'),
            r('div',{style:{fontSize:9,color:c.muted,marginTop:3,textAlign:'right'}},qcOk2+'/24 points conformes ('+qcPct2+'%)')
          ))
        ),
        r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}},
          r('div',{style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:10,overflow:'hidden',boxShadow:c.elev1}},
            r('div',{style:{padding:'8px 14px',borderBottom:'2px solid #0277BD',background:'#0277BD08',fontSize:9,fontWeight:800,color:'#0277BD',textTransform:'uppercase',letterSpacing:'.08em'}},'Fonctions par appartement'),
            r('div',null,...appartements.map(app=>{const appPcs=pieces.filter(p=>p.appId===app.id);const appFns=appPcs.flatMap(p=>p.fonctions||[]);return r('div',{key:app.id,style:{padding:'6px 14px',borderBottom:'1px solid #f1f5f9'}},r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}},r('span',{style:{fontSize:10,fontWeight:700,color:c.text}},app.nom),r('span',{style:{fontFamily:c.mono,fontSize:9,color:'#0277BD',fontWeight:700}},appFns.length+' fn')),r('div',{style:{display:'flex',gap:3,flexWrap:'wrap'},...appPcs.slice(0,5).map(p=>r('span',{key:p.id,style:{fontSize:8,padding:'1px 5px',borderRadius:3,background:c.surf3,color:c.muted}},p.nom))}));}))
          ),
          r('div',{style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:10,overflow:'hidden',boxShadow:c.elev1}},
            r('div',{style:{padding:'8px 14px',borderBottom:'2px solid #f59e0b',background:'#f59e0b08',fontSize:9,fontWeight:800,color:'#d97706',textTransform:'uppercase',letterSpacing:'.08em'}},'Avancement chantier par phase'),
            r('div',{style:{padding:'8px 14px'}},
              ...[{l:'Gaines posees',k:'gaine',col:'#7c3aed',n:filtFns.length,fn2:(fn)=>realisationChecks['gaine_'+fn.ref]},{l:'Cables tires',k:'cable',col:'#0277BD',n:filtFns.length,fn2:(fn)=>realisationChecks['cable_'+fn.ref]},{l:'BD/TE poses',k:'bdTE',col:'#f59e0b',n:boitesDeriv.length+tableauxElec.length,fn2:null},{l:'Recepteurs raccordes',k:'recep',col:'#16a34a',n:filtFns.length,fn2:(fn)=>realisationChecks['recep_'+fn.ref]},{l:'Interrupteurs poses',k:'inter',col:'#0891b2',n:interrupteurs.length,fn2:null}]
              .map(ph=>{
                const done=ph.k==='bdTE'?boitesDeriv.filter(b=>realisationChecks['bd_'+b.id]).length+tableauxElec.filter(t=>realisationChecks['te_'+t.id]).length:ph.k==='inter'?interrupteurs.filter(i=>realisationChecks['inter_'+i.id]).length:filtFns.filter(fn=>ph.fn2(fn)).length;
                const pct2=ph.n>0?Math.round(done/ph.n*100):0;
                return r('div',{key:ph.k,style:{marginBottom:6}},r('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:2}},r('span',{style:{fontSize:10,color:c.text2}},ph.l),r('span',{style:{fontFamily:c.mono,fontSize:9,fontWeight:700,color:pct2>=80?'#16a34a':pct2>=40?ph.col:c.muted}},done+'/'+ph.n)),r('div',{style:{height:4,background:c.surf3,borderRadius:2,overflow:'hidden'}},r('div',{style:{height:'100%',width:pct2+'%',background:pct2>=80?'#16a34a':ph.col,borderRadius:2}})));
              })
            )
          )
        )
      );
    };


    const tabNomenclature=()=>{
      if((this.state.nomencView||'table')==='cable')return r('div',{style:{padding:'18px 22px',animation:'fadeIn .3s ease',height:'100%',overflowY:'auto'}},this._nomencTabsBar(),this.renderVueCable());
      const{nomenclatureOverrides}=this.state;
      const setOvr=(key,upd2)=>this.setState(s=>({nomenclatureOverrides:{...s.nomenclatureOverrides,[key]:{...(s.nomenclatureOverrides[key]||{}),...upd2}}}));

      // ── Couleurs IEC 60446 ──
      const COUL={
        L:   {hex:'#dc2626',label:'Marron/Rouge',iec:'L'},
        N:   {hex:'#1d4ed8',label:'Bleu',        iec:'N'},
        PE:  {hex:'#15803d',label:'Vert/Jaune',  iec:'PE'},
        L1:  {hex:'#dc2626',label:'Marron',       iec:'L1'},
        L2:  {hex:'#f97316',label:'Noir',         iec:'L2'},
        L3:  {hex:'#c026d3',label:'Gris',         iec:'L3'},
        NAV: {hex:'#7c3aed',label:'Violet',       iec:'NAV'},
        NAV1:{hex:'#f59e0b',label:'Navette 1',    iec:'NAV1'},
        NAV2:{hex:'#ec4899',label:'Navette 2',    iec:'NAV2'},
        NAVB:{hex:'#c2185b',label:'Retour 2',     iec:'NAVB'},
        CMD: {hex:'#0891b2',label:'Bleu clair',   iec:'CMD'},
        'BUS+':{hex:'#d32f2f',label:'Bus KNX +',  iec:'BUS+'},
        'BUS-':{hex:'#212121',label:'Bus KNX −',  iec:'BUS-'},
      };

      // ── Schema fils par type de circuit (cle -> liste de cles conducteurs) ──
      const getSchema=(fnType)=>{
        if(fnType==='rj45')
          return [{k:'CMD',bt:'A',ba:'B'}];
        if(fnType==='domotique')
          // Bus KNX 2 fils (paire torsadée +/−), pas de PE ni phase de commande
          return [{k:'BUS+',bt:'+',ba:'+'},{k:'BUS-',bt:'−',ba:'−'}];
        if(['alarme_intrusion','detecteur_fumee','detecteur_co','visiophone'].includes(fnType))
          return [{k:'L',bt:'L',ba:'L'},{k:'CMD',bt:'COM',ba:'IN'}];
        if(fnType==='double')
          // Double allumage : phase commune + 2 retours SÉPARÉS (2 circuits indépendants) + PE
          return [{k:'L',bt:'L',ba:'L'},{k:'NAV',bt:'Nv',ba:'2'},{k:'NAVB',bt:'Nv2',ba:'4'},{k:'PE',bt:'PE',ba:'PE'}];
        if(fnType==='simple'||fnType==='poussoir')
          return [{k:'L',bt:'L',ba:'L'},{k:'NAV',bt:'Nv',ba:'2'},{k:'PE',bt:'PE',ba:'PE'}];
        if(fnType==='va_vient')
          return [{k:'L',bt:'L',ba:'1'},{k:'N',bt:'N',ba:'N'},{k:'NAV',bt:'Nv',ba:'2'}];
        if(fnType==='variateur')
          return [{k:'L',bt:'L',ba:'L'},{k:'N',bt:'N',ba:'N'},{k:'NAV',bt:'Nv',ba:'C'},{k:'PE',bt:'PE',ba:'PE'}];
        if(['four','lave_vaisselle','lave_linge','seche_linge','climatisation','borne_ve','piscine','chauffe_eau'].includes(fnType))
          return [{k:'L',bt:'L',ba:'L'},{k:'N',bt:'N',ba:'N'},{k:'PE',bt:'PE',ba:'PE'}];
        // eclairage, prises, media, ext, secu, energ
        return [{k:'L',bt:'L',ba:'L'},{k:'N',bt:'N',ba:'N'},{k:'PE',bt:'PE',ba:'PE'}];
      };

      // ── Type cable NFC par type circuit ──
      const getCableType=(fn)=>{
        const sec=fn.cableSection||'1.5';
        const typ=fn.cableType||'H07VU';
        const schema=getSchema(fn.type);
        const nbG=schema.length;
        const typeMap={'H07VU':'H07V-U','H07VR':'H07V-R','H07VK':'H07V-K','H05VV':'H05VV-F','XVB':'XVB-F2','SYT':'SYT','MONO':'Mono'};
        const tl=typeMap[typ]||typ;
        return tl+' '+nbG+'G'+sec+' mm²';
      };

      // ── Provenance label ──
      const getTenant=(fn)=>{
        // Priorité au departType explicite
        if(fn.departType==='boite'){
          const b=this.state.boitesDeriv.find(x=>String(x.id)===String(fn.departId));
          if(!b)return 'BD (ND)';
          return this.genBDCode(b,this.state)+' — '+(b.nom||this.genBDCode(b,this.state));
        }
        if(fn.departType==='tableau'){
          const t=this.state.tableauxElec.find(x=>String(x.id)===String(fn.departId));
          if(!t)return 'Tableau (ND)';
          return this.genTECode(t,this.state)+' — '+t.nom;
        }
        // Fallback via disjoncteur
        const dj=this.state.disjoncteurs.find(d=>(d.recepteurs||[]).includes(fn.ref));
        if(dj){
          const te=this.state.tableauxElec.find(t=>t.id===dj.tableauId);
          const teCode=te?this.genTECode(te,this.state):'TE?';
          const djCode=this.genCableCBCode(dj,this.state);
          return teCode+' / '+djCode;
        }
        return 'Tableau (ND)';
      };

      const getAboutissant=(fn)=>{
        // Aboutissant = code CEBAT du recepteur + label
        const fnInfo=this.FNS[fn.type];
        const cebatCode=this.genCEBATCode(fn,this.state);
        return (fnInfo?.label||fn.type)+' — '+cebatCode+(fn.quantite>1?' x'+fn.quantite:'');
      };

      // ── Cables d'alimentation des tableaux (source/parent -> TE), comme la Vue Câble ──
      this._tmCache={};
      const isTriProj=((this.state.project||{}).typeAlim)==='triphase';
      const sourceCables=[];
      this.state.tableauxElec.forEach(te=>{
        const teCode=this.genTECode(te,this.state);
        const parentTe=this.state.tableauxElec.find(t=>t.id===te.departId);
        let srcCode='',tenantBase='',dbCode='',sec='16',isTri=false,tenantRefS=null;
        if(parentTe){
          srcCode=this.genTECode(parentTe,this.state);
          tenantBase=srcCode+(parentTe.nom?' — '+parentTe.nom:'');
          dbCode=parentTe.cb0Code||srcCode;sec=te.feederSection||'?';isTri=isTriProj;
          tenantRefS={kind:'te',id:parentTe.id};
        } else {
          const dep=this.state.departs.find(d=>d.id===te.departId)||this.state.departs.find(d=>d.type==='comptage');
          if(!dep)return;
          srcCode=this.genSourceCode(dep,this.state);
          tenantBase=srcCode+(dep.nom?' — '+dep.nom:'');
          dbCode=dep.dbCode||'DB';sec=dep.section||'16';
          isTri=dep.tension==='tri'||dep.tension==='tri_it'||(+dep.poles>=3);
        }
        const ck=srcCode+'to'+teCode;
        const schemaS=isTri?[{k:'L1'},{k:'L2'},{k:'L3'},{k:'N'},{k:'PE'}]:[{k:'L'},{k:'N'},{k:'PE'}];
        const wCodeS=dbCode;
        const aboutBorne=te.cb0Code||'CB0';
        const tePiece=(this.state.pieces.find(p=>p.id===te.pieceId)||{}).nom||'';
        const fils=schemaS.map((sx,i)=>{
          const ovrKey=ck+'_fil'+(i+1);
          const ovr=nomenclatureOverrides[ovrKey]||{};
          return {
            wCode:wCodeS,filNum:i+1,conducteurKey:sx.k,
            bt:ovr.bt||sx.k,ba:ovr.ba||sx.k,conducteur:sx.k,
            tenant:ovr.tenant||tenantBase,aboutissant:ovr.aboutissant||((te.nom||'Tableau')+' — '+teCode),
            cableType:'U1000 R2V '+schemaS.length+'G'+sec+' mm²',
            couleur:COUL[sx.k]?.label||sx.k,couleurHex:COUL[sx.k]?.hex||'#888',
            rep:ovr.rep||'',racc:ovr.racc||'',test:ovr.test||'',statut:ovr.statut||'',
            fnRef:null,fnType:'source',isSrcCable:true,ovrKey,
            tenantRef:null,aboutRef:null,fixedBt:(sx.k==='PE'?'PE':dbCode+'.'+sx.k),fixedBa:(sx.k==='PE'?'PE':aboutBorne+'.'+sx.k),
            pieceT:'',pieceA:tePiece,
            longueur:ovr.longueur||0,fnPieceId:null,fnId:null
          };
        });
        sourceCables.push({wCode:wCodeS,fils,isSrcCable:true});
      });

      // ── Génération des cables depuis l'etat CEBAT ──
      const allFns=pieces.flatMap(p=>(p.fonctions||[]).map(fn=>({...fn,piece:p})));
      const cables=[];
      let wIdx=1;

      allFns.forEach(fn=>{
        const wCode=this.genCEBATCode(fn,this.state);
        // Éclairage commandé : la phase arrive via le retour (NAV) de l'interrupteur
        const fnCmded=fn.type==='eclairage'&&(this.state.interrupteurs||[]).some(i=>i.circuitRef===fn.ref);
        const schema=fnCmded?[{k:'NAV',bt:'Nv',ba:'NAV'},{k:'N',bt:'N',ba:'N'},{k:'PE',bt:'PE',ba:'PE'}]:getSchema(fn.type);
        const cableType=getCableType(fn);
        const tenant=getTenant(fn);
        const aboutissant=getAboutissant(fn);
        // Élément tenant (pour le code des bornes selon raccordement)
        const fnTenantRef=fn.departType==='boite'&&fn.departId!=null?{kind:'bd',id:fn.departId}:(()=>{const dj=this.state.disjoncteurs.find(d=>(d.recepteurs||[]).includes(fn.ref));const te=dj?this.state.tableauxElec.find(t=>t.id===dj.tableauId):(fn.departType==='tableau'&&fn.departId?this.state.tableauxElec.find(t=>String(t.id)===String(fn.departId)):null);return te?{kind:'te',id:te.id}:null;})();
        // Clé de câble commune à la Vue Câble (pour la numérotation des bornes avec état)
        const fnStatutKey=fn.departType==='boite'&&fn.departId!=null?'fn'+fn.id:(()=>{const dj=this.state.disjoncteurs.find(d=>(d.recepteurs||[]).includes(fn.ref));return dj?'dj'+dj.id:null;})();
        const fils=schema.map((s,i)=>{
          const ovrKey=wCode+'_fil'+(i+1);
          const ovr=nomenclatureOverrides[ovrKey]||{};
          return {
            wCode,
            filNum:i+1,
            conducteurKey:s.k,
            bt:ovr.bt||s.bt,
            ba:ovr.ba||s.ba,
            tenant:ovr.tenant||tenant,
            aboutissant:ovr.aboutissant||aboutissant,
            cableType,
            couleur:COUL[s.k]?.label||s.k,
            couleurHex:COUL[s.k]?.hex||'#888',
            rep:ovr.rep||'',
            racc:ovr.racc||'',
            test:ovr.test||'',
            statut:ovr.statut||'',
            fnRef:fn.ref,
            fnType:fn.type,
            pieceNom:fn.piece?.nom||'',
            conducteur:s.k,
            departType:fn.departType||'',
            departId:fn.departId||null,
            tenantRef:fnTenantRef,aboutRef:null,statutKey:fnStatutKey,
            longueur:fn.cableLongueur||0,
            fnPieceId:fn.piece?.id||null,
            fnId:fn.id||null,
          };
        });
        cables.push({wCode,fils,fn});
        wIdx++;

        // Cables interrupteurs liés
        const linkedInter=interrupteurs.filter(i=>i.circuitRef===fn.ref);
        linkedInter.forEach(inter=>{
          // Code cable inter: code inter (VV1.1) 
          const interCode=this.genInterCode(inter,this.state);
          const wCodeI=interCode;
          const typeInter=inter.type||'simple';
          // Va-et-vient : 1er inter = phase + 2 navettes ; suivants = retour + 2 navettes (pas de PE)
          let schemaI;
          if(typeInter==='va_vient'){
            const vvIdx=linkedInter.filter(i=>(i.type||'simple')==='va_vient').findIndex(i=>i.id===inter.id);
            schemaI=vvIdx===0?[{k:'L',bt:'L',ba:'L'},{k:'NAV1',bt:'Nv1',ba:'1'},{k:'NAV2',bt:'Nv2',ba:'2'}]:[{k:'NAV',bt:'Nv',ba:'R'},{k:'NAV1',bt:'Nv1',ba:'1'},{k:'NAV2',bt:'Nv2',ba:'2'}];
          } else {schemaI=getSchema(typeInter);}
          const zone=zonesCommande.find(z=>z.id===inter.zoneId);
          // Tenant = meme BD/TE que la fonction commandee (heritage)
          const interDeptType=inter.departType||fn.departType;
          const interDeptId=inter.departId||fn.departId;
          let tenantI=tenant; // heritage du tenant de la fonction
          if(interDeptType==='boite'){
            const bdI=this.state.boitesDeriv.find(b=>String(b.id)===String(interDeptId));
            if(bdI)tenantI=this.genBDCode(bdI,this.state)+' — '+(bdI.nom||this.genBDCode(bdI,this.state));
          } else if(interDeptType==='tableau'){
            const teI=this.state.tableauxElec.find(t=>String(t.id)===String(interDeptId));
            if(teI)tenantI=this.genTECode(teI,this.state)+' — '+teI.nom;
          }
          // Aboutissant = code interrupteur + zone
          const aboutissantI=interCode+' — '+(zone?zone.nom:'Zone ND');
          const cableTypeI='H07V-U '+schemaI.length+'G1.5 mm²';
          const filsI=schemaI.map((s,i)=>{
            const ovrKey=wCodeI+'_fil'+(i+1);
            const ovr=nomenclatureOverrides[ovrKey]||{};
            return {
              wCode:wCodeI,
              filNum:i+1,
              conducteurKey:s.k,
              bt:ovr.bt||s.bt,
              ba:ovr.ba||s.ba,
              tenant:ovr.tenant||tenantI,
              aboutissant:ovr.aboutissant||aboutissantI,
              cableType:cableTypeI,
              couleur:COUL[s.k]?.label||s.k,
              couleurHex:COUL[s.k]?.hex||'#888',
              rep:ovr.rep||'',
              racc:ovr.racc||'',
              test:ovr.test||'',
              statut:ovr.statut||'',
              fnRef:fn.ref,
              fnType:typeInter,
              tenantRef:interDeptType==='boite'&&interDeptId!=null?{kind:'bd',id:interDeptId}:(interDeptType==='tableau'&&interDeptId!=null?{kind:'te',id:interDeptId}:null),aboutRef:null,statutKey:'int'+inter.id,
              longueur:ovr.longueur!==undefined?ovr.longueur:(inter.cableLongueur||0),
              fnPieceId:null,fnId:null,interId:inter.id,
            };
          });
          cables.push({wCode:wCodeI,fils:filsI,fn:null,inter});
          wIdx++;
        });
      });

      // ── Cables d'alimentation des boites de derivation (disjoncteur -> BD) ──
      // Une boite peut etre alimentee par plusieurs tableaux : un cable par disjoncteur dont un recepteur part de la boite.
      (this.state.boitesDeriv||[]).forEach(bd=>{
        const feedDjs=(this.state.disjoncteurs||[]).filter(d=>(d.recepteurs||[]).some(rf=>{const e=allFns.find(f=>f.ref===rf);return e&&e.departType==='boite'&&String(e.departId)===String(bd.id);}));
        feedDjs.forEach(feedDj=>{
          const te=(this.state.tableauxElec||[]).find(t=>t.id===feedDj.tableauId);
          if(!te)return;
          const bdC=this.genBDCode(bd,this.state);
          const teC=this.genTECode(te,this.state);
          let djWc='';try{djWc=this.genCableCBCode(feedDj,this.state);}catch(e){djWc=feedDj.code||'';}
          const wCodeB=djWc||bdC;
          const tenantB=teC+' '+(feedDj.code||'');
          const aboutissantB=bdC+(bd.nom?' — '+bd.nom:'');
          const schemaB=[{k:'L',bt:'L',ba:'L'},{k:'N',bt:'N',ba:'N'},{k:'PE',bt:'PE',ba:'PE'}];
          const cableTypeB='U1000 R2V 3G'+(feedDj.section||'2.5')+' mm²';
          const filsB=schemaB.map((sx,i)=>{
            const ovrKey=wCodeB+'_filBD'+bd.id+'_'+(i+1);
            const ovr=nomenclatureOverrides[ovrKey]||{};
            return {
              wCode:wCodeB,filNum:i+1,conducteurKey:sx.k,
              bt:ovr.bt||sx.bt,ba:ovr.ba||sx.ba,
              tenant:ovr.tenant||tenantB,aboutissant:ovr.aboutissant||aboutissantB,
              cableType:cableTypeB,
              couleur:COUL[sx.k]?.label||sx.k,couleurHex:COUL[sx.k]?.hex||'#888',
              rep:ovr.rep||'',racc:ovr.racc||'',test:ovr.test||'',statut:ovr.statut||'',
              fnRef:null,fnType:'bdfeeder',pieceNom:(this.state.pieces.find(p=>p.id===bd.pieceId)||{}).nom||'',
              conducteur:sx.k,departType:'',departId:null,
              tenantRef:{kind:'te',id:te.id},aboutRef:{kind:'bd',id:bd.id},statutKey:'dj'+feedDj.id+'bd'+bd.id,
              longueur:ovr.longueur||0,fnPieceId:null,fnId:null,
            };
          });
          cables.push({wCode:wCodeB,fils:filsB,fn:null});
        });
      });

      const allCables=[...sourceCables,...cables];
      const allFils=allCables.flatMap(c=>c.fils);
      const totalCables=allCables.length;
      const conf=allCables.filter(c=>c.fils.every(f=>f.statut==='conf')).length;
      const nc=allCables.filter(c=>c.fils.some(f=>f.statut==='nc')).length;
      const res=allCables.filter(c=>c.fils.some(f=>f.statut==='res')&&!c.fils.some(f=>f.statut==='nc')).length;
      const pending=totalCables-conf-nc-res;


      const IEC_COULEURS=[
        {k:'L',hex:'#dc2626',label:'Marron/Rouge — Phase L'},
        {k:'N',hex:'#1d4ed8',label:'Bleu — Neutre N'},
        {k:'PE',hex:'#15803d',label:'Vert/Jaune — Terre PE'},
        {k:'L1',hex:'#dc2626',label:'Marron — L1'},
        {k:'L2',hex:'#f97316',label:'Noir — L2'},
        {k:'L3',hex:'#c026d3',label:'Gris — L3'},
        {k:'NAV',hex:'#7c3aed',label:'Violet — Navette'},
        {k:'NAVB',hex:'#c2185b',label:'Rose — Retour 2 (double)'},
        {k:'CMD',hex:'#0891b2',label:'Bleu clair — CMD'},
        {k:'BUS+',hex:'#d32f2f',label:'Rouge — Bus KNX +'},
        {k:'BUS-',hex:'#212121',label:'Noir — Bus KNX −'},
        {k:'BLN',hex:'#ffffff',label:'Blanc'},
        {k:'GRS',hex:'#888888',label:'Gris'},
        {k:'NOR',hex:'#222222',label:'Noir'},
        {k:'ORG',hex:'#f97316',label:'Orange'},
        {k:'RGE',hex:'#dc2626',label:'Rouge'},
        {k:'BLU',hex:'#1d4ed8',label:'Bleu'},
        {k:'VRT',hex:'#15803d',label:'Vert'},
      ];
      const getCouleurInfo=(key)=>IEC_COULEURS.find(c=>c.k===key)||{k:key,hex:'#888',label:key};
      const STATUTS_DEF=[
        {k:'conf',l:'Conforme',bg:'#dcfce7',bc:'#16a34a',col:'#16a34a'},
        {k:'res',l:'Reserve',bg:'#fef9c3',bc:'#d97706',col:'#92400e'},
        {k:'nc',l:'Non conf.',bg:'#fee2e2',bc:'#dc2626',col:'#dc2626'},
      ];
      const REP_OPTS=[{k:'ok',l:'Pose ✓',col:'#16a34a'},{k:'nok',l:'Manquant',col:'#dc2626'},{k:'',l:'—',col:'#94a3b8'}];
      const RACC_OPTS=[{k:'ok',l:'OK ✓',col:'#16a34a'},{k:'nok',l:'NOK ✗',col:'#dc2626'},{k:'',l:'—',col:'#94a3b8'}];

      const TH=(txt,w,align)=>r('th',{style:{padding:'6px 8px',background:'#f8fafc',fontSize:9,fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'.07em',borderBottom:'2px solid #e2e8f0',whiteSpace:'nowrap',width:w||'auto',textAlign:align||'left'}},txt);
      const TD=(children,style)=>r('td',{style:{padding:'4px 6px',borderBottom:'1px solid #f1f5f9',verticalAlign:'middle',fontSize:11,...(style||{})}},children);

      const StatBadge=(k)=>{
        if(!k) return r('span',{style:{fontSize:9,color:'#94a3b8'}},'—');
        const s=STATUTS_DEF.find(x=>x.k===k);
        if(!s) return null;
        return r('span',{style:{display:'inline-flex',alignItems:'center',padding:'2px 7px',borderRadius:99,fontSize:9,fontWeight:700,background:s.bg,color:s.col,border:'1px solid '+s.bc,whiteSpace:'nowrap'}},s.l);
      };

      const CyclBtn=(ovrKey,opts,curVal,field)=>{
        const cur=opts.find(o=>o.k===curVal)||opts[opts.length-1];
        const nextIdx=(opts.indexOf(cur)+1)%opts.length;
        const next=opts[nextIdx];
        return r('button',{
          onClick:()=>setOvr(ovrKey,{[field]:next.k}),
          style:{padding:'2px 8px',borderRadius:4,fontSize:9,fontWeight:700,cursor:'pointer',border:'1px solid '+cur.col+'55',background:cur.col+'12',color:cur.col,whiteSpace:'nowrap',minWidth:58}
        },cur.l||'—');
      };

      return r('div',{style:{padding:'18px 22px',animation:'fadeIn .3s ease',height:'100%',overflowY:'auto',overflowX:'auto',minWidth:0}},
        this._nomencTabsBar(),
        // Stats bar
        r('div',{style:{display:'flex',gap:8,flexWrap:'wrap',marginBottom:14}},
          [{v:totalCables,l:'Cables',col:'#0277BD'},{v:allFils.length,l:'Conducteurs',col:'#7c3aed'},{v:conf,l:'Conformes',col:'#16a34a'},{v:nc,l:'Non conf.',col:'#dc2626'},{v:res,l:'Reserves',col:'#d97706'},{v:pending,l:'En attente',col:'#94a3b8'}]
            .map(s=>r('div',{key:s.l,style:{background:'#f8fafc',border:'1px solid '+c.bdr,borderRadius:8,padding:'6px 12px',display:'flex',gap:7,alignItems:'baseline'}},
              r('span',{style:{fontFamily:'monospace',fontSize:16,fontWeight:900,color:s.col}},s.v),
              r('span',{style:{fontSize:9,fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'.06em'}},s.l)
            ))
        ),
        // Table
        r('div',{style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:10,overflow:'hidden',boxShadow:c.elev1}},
          r('div',{style:{overflowX:'auto',WebkitOverflowScrolling:'touch'}},
            r('table',{style:{width:'100%',borderCollapse:'collapse',minWidth:1660,tableLayout:'fixed'}},
              r('thead',null,r('tr',null,
                TH('Piece T.',90),TH('Tenant',90),TH('Equip. T.',80),TH('Borne T.',70),
                TH('Repere',64),TH('Fil',32,'center'),TH('Description',150),
                TH('Borne A.',70),TH('Equip. A.',80),TH('Aboutissant',90),TH('Piece A.',90),
                TH('Couleur IEC',105),TH('Type / Section',150),
                TH('Long. m',60,'right'),TH('Rep.',62,'center'),TH('Raccord.',70,'center'),
                TH('Test O/MO',90,'right'),TH('Statut',112),
              )),
              r('tbody',null,
                ...allCables.flatMap(cab=>
                  cab.fils.map((fil,fi)=>{
                    const ovrKey=fil.wCode+'_fil'+(fi+1);
                    const ovr=nomenclatureOverrides[ovrKey]||{};
                    const isFirst=fi===0;
                    const isLast=fi===cab.fils.length-1;
                    // Compute borne codes from raccordType
                    const cond=fil.conducteur||fil.bt||'L';
                    // Tenant element (BD or TE) for borne
                    const elOf=ref=>!ref?null:(ref.kind==='bd'?this.state.boitesDeriv.find(b=>String(b.id)===String(ref.id)):this.state.tableauxElec.find(t=>String(t.id)===String(ref.id)));
                    const tenantBD=fil.fnType&&fil.departType==='boite'?this.state.boitesDeriv.find(b=>String(b.id)===String(fil.departId)):null;
                    const tenantTE=fil.departType==='tableau'?this.state.tableauxElec.find(t=>String(t.id)===String(fil.departId)):null;
                    const tenantEl=elOf(fil.tenantRef)||tenantBD||tenantTE;
                    const aboutEl=elOf(fil.aboutRef);
                    const condKeys=cab.fils.map(f=>f.conducteur||f.bt||'L');
                    const termB=(el,conducteur)=>{if(el&&el.id!=null&&fil.statutKey){const m=this._equipTermMap(el)[fil.statutKey];if(m&&m[conducteur]!=null)return m[conducteur];}return this._borneOf(el,conducteur,condKeys);};
                    const borneT=ovr.bt!==undefined?ovr.bt:(fil.fixedBt!==undefined?fil.fixedBt:termB(tenantEl,cond));
                    const borneA=ovr.ba!==undefined?ovr.ba:(fil.fixedBa!==undefined?fil.fixedBa:(aboutEl?termB(aboutEl,cond):fil.ba));
                    // Equip T = code de l'element tenant
                    const equipT=tenantBD?this.genBDCode(tenantBD,this.state):tenantTE?this.genTECode(tenantTE,this.state):(fil.tenant||'');
                    // Equip A = code du recepteur (déjà dans aboutissant après —)
                    const aboutParts=(ovr.aboutissant||fil.aboutissant||'').split(' — ');
                    const equipA=aboutParts.length>1?aboutParts[1]:aboutParts[0];
                    const aboutLabel=aboutParts[0]||'';
                    return r('tr',{key:ovrKey,style:{borderTop:isFirst?'2px solid #e2e8f0':'none',background:isFirst&&fi%2===0?'#fafafa':'#fff',whiteSpace:'nowrap'}},
                      TD(r('span',{style:{fontSize:10,color:'#64748b',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',display:'block'}},
                        ovr.pieceT!==undefined?ovr.pieceT:(fil.pieceT!==undefined?fil.pieceT:fil.pieceNom||'')
                      ),{width:90}),
                      TD(r('span',{style:{fontFamily:'monospace',fontSize:10,fontWeight:700,color:'#0277BD',display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},title:ovr.tenantLabel||fil.tenant||''},
                        ovr.tenantLabel||fil.tenant||''
                      ),{width:90}),
                      TD(r('span',{style:{fontFamily:'monospace',fontSize:10,fontWeight:700,color:'#64748b',display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},title:equipT},equipT),{width:80}),
                      TD(r('input',{
                        value:borneT,
                        onChange:e=>setOvr(ovrKey,{bt:e.target.value}),
                        style:{fontSize:11,width:64,fontFamily:'monospace',fontWeight:700,border:'1px solid transparent',borderRadius:4,padding:'2px 4px',background:'transparent',color:'#1e293b',outline:'none'},
                        onFocus:e=>{e.target.style.borderColor='#0277BD';e.target.style.background='#f0f9ff';},
                        onBlur:e=>{e.target.style.borderColor='transparent';e.target.style.background='transparent';}
                      }),{width:70}),
                      TD(
                        isFirst?r('span',{style:{fontFamily:'monospace',fontSize:11,fontWeight:900,color:'#0277BD'}},fil.wCode):
                        r('span',{style:{fontSize:9,color:'#e2e8f0',fontFamily:'monospace'}},fil.wCode),
                        {width:64}
                      ),
                      TD(r('span',{style:{fontFamily:'monospace',fontSize:11,fontWeight:700,color:'#64748b',textAlign:'center',display:'block'}},fil.filNum),{width:32,textAlign:'center'}),
                      TD(r('input',{
                        value:ovr.description||'',
                        placeholder:'Commentaire...',
                        onChange:e=>setOvr(ovrKey,{description:e.target.value}),
                        style:{fontSize:10,width:'100%',border:'1px solid transparent',borderRadius:4,padding:'2px 5px',background:'transparent',color:'#475569',outline:'none',fontStyle:ovr.description?'normal':'italic'},
                        onFocus:e=>{e.target.style.borderColor='#94a3b8';e.target.style.background='#f8fafc';e.target.style.fontStyle='normal';},
                        onBlur:e=>{e.target.style.borderColor='transparent';e.target.style.background='transparent';e.target.style.fontStyle=ovr.description?'normal':'italic';}
                      }),{width:150}),
                      TD(r('input',{
                        value:borneA,
                        onChange:e=>setOvr(ovrKey,{ba:e.target.value}),
                        style:{fontSize:11,width:64,fontFamily:'monospace',fontWeight:700,border:'1px solid transparent',borderRadius:4,padding:'2px 4px',background:'transparent',color:'#1e293b',outline:'none'},
                        onFocus:e=>{e.target.style.borderColor='#0277BD';e.target.style.background='#f0f9ff';},
                        onBlur:e=>{e.target.style.borderColor='transparent';e.target.style.background='transparent';}
                      }),{width:70}),
                      TD(r('span',{style:{fontFamily:'monospace',fontSize:10,fontWeight:700,color:'#64748b',display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},title:equipA},equipA),{width:80}),
                      TD(r('span',{style:{fontSize:10,color:'#1e293b',display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},title:aboutLabel},aboutLabel),{width:90}),
                      TD(r('span',{style:{fontSize:10,color:'#64748b',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',display:'block'}},
                        ovr.pieceA!==undefined?ovr.pieceA:(fil.pieceA!==undefined?fil.pieceA:fil.pieceNom||'')
                      ),{width:90}),
                      TD(r('span',{style:{fontFamily:'monospace',fontSize:10,color:'#475569',whiteSpace:'nowrap'}},
                        isFirst?fil.cableType:r('span',{style:{color:'#e2e8f0'}},'└ '+fil.cableType)
                      ),{width:150,maxWidth:150}),
                      TD(r('div',{style:{display:'flex',alignItems:'center',gap:4}},
                        r('span',{style:{width:10,height:10,borderRadius:'50%',background:getCouleurInfo(ovr.couleurKey||fil.conducteurKey).hex,border:'1px solid rgba(0,0,0,.15)',display:'inline-block',flexShrink:0,cursor:'pointer'}}),
                        r('select',{
                          value:ovr.couleurKey||fil.conducteurKey||'',
                          onChange:e=>setOvr(ovrKey,{couleurKey:e.target.value}),
                          style:{fontSize:9,border:'none',background:'transparent',color:'#475569',cursor:'pointer',outline:'none',maxWidth:70,appearance:'auto'}
                        },
                          ...IEC_COULEURS.map(c=>r('option',{key:c.k,value:c.k},c.label.split(' — ')[0]))
                        )
                      ),{width:105}),
                      TD(CyclBtn(ovrKey,REP_OPTS,ovr.rep||fil.rep,'rep'),{width:60,textAlign:'center'}),
                      TD(CyclBtn(ovrKey,RACC_OPTS,ovr.racc||fil.racc,'racc'),{width:70,textAlign:'center'}),
                      TD(r('input',{
                        value:ovr.test!==undefined?ovr.test:fil.test,
                        placeholder:'Ohm/MOhm',
                        onChange:e=>setOvr(ovrKey,{test:e.target.value}),
                        style:{fontSize:10,width:82,textAlign:'right',fontFamily:'monospace',border:'1px solid '+(ovr.test||fil.test?'#16a34a':'#e2e8f0'),borderRadius:4,padding:'2px 5px',background:'transparent',color:'#1e293b',outline:'none'}
                      }),{width:90,textAlign:'right'}),
                      TD(r('div',{style:{display:'flex',flexDirection:'row',gap:2,alignItems:'center',flexWrap:'nowrap'}},
                        r('div',{style:{display:'flex',gap:2}},
                          ...STATUTS_DEF.map(s=>r('button',{key:s.k,
                            onClick:()=>setOvr(ovrKey,{statut:(ovr.statut||fil.statut)===s.k?'':s.k}),
                            style:{flex:1,padding:'2px 3px',borderRadius:3,fontSize:8,fontWeight:700,cursor:'pointer',border:'1px solid '+((ovr.statut||fil.statut)===s.k?s.bc:'#e2e8f0'),background:(ovr.statut||fil.statut)===s.k?s.bg:'transparent',color:(ovr.statut||fil.statut)===s.k?s.col:'#94a3b8',textAlign:'center',lineHeight:1.3}},s.l))
                        ),
                        StatBadge(ovr.statut||fil.statut)
                      ),{width:110}),
                      isFirst?TD(r('div',{style:{display:'flex',alignItems:'center',gap:3,justifyContent:'flex-end'}},
                        r('input',{
                          type:'number',min:0,step:0.5,
                          value:ovr.longueur!==undefined?ovr.longueur:(fil.longueur||0),
                          onChange:e=>{
                            const newL=+e.target.value;
                            setOvr(ovrKey,{longueur:newL});
                            // Mise a jour de la fonction ou interrupteur source
                            if(fil.fnPieceId&&fil.fnId){
                              this.setState(s=>({pieces:s.pieces.map(p=>p.id===fil.fnPieceId?{...p,fonctions:(p.fonctions||[]).map(fn=>fn.id===fil.fnId?{...fn,cableLongueur:newL}:fn)}:p)}));
                            } else if(fil.interId){
                              this.setState(s=>({interrupteurs:s.interrupteurs.map(i=>i.id===fil.interId?{...i,cableLongueur:newL}:i)}));
                            } else if(fil.isSrcCable){
                              // Source cable: store in ovr only (no source object has longueur field)
                              setOvr(ovrKey,{longueur:newL});
                            }
                          },
                          style:{width:52,textAlign:'right',fontFamily:'monospace',fontSize:10,border:'1px solid transparent',borderRadius:4,padding:'2px 4px',background:'transparent',color:'#1e293b',outline:'none'},
                          onFocus:e=>{e.target.style.borderColor='#0277BD';e.target.style.background='#f0f9ff';},
                          onBlur:e=>{e.target.style.borderColor='transparent';e.target.style.background='transparent';}
                        }),
                        r('span',{style:{fontSize:9,color:'#94a3b8'}})
                      ),{width:60,textAlign:'right'}):TD(r('span',{style:{color:'#e2e8f0',fontSize:9}},'—'),{width:60,textAlign:'right'})
                    );
                  })
                )
              )
            )
          )
        ),
        // Note bas
        r('div',{style:{marginTop:10,padding:'8px 12px',background:'#f0f9ff',border:'1px solid #bae6fd',borderRadius:7,fontSize:9,color:'#0369a1'}},'Les cables sont generes automatiquement depuis les fonctions et interrupteurs CEBAT. Les reperes W sont uniques et stables. Cliquez sur un champ pour le modifier (surcharge manuelle conservee).')
      );
    };


    const tabControle=()=>{
      const cats=[
        {cat:'Protection des personnes',col:'#ef4444',items:[{id:'qc01',l:'Circuits prises proteges DDR 30mA AC',ref:'sect.531.2.1'},{id:'qc02',l:'Circuits eclairage proteges DDR 30mA',ref:'sect.531.2.1'},{id:'qc03',l:'Conducteur PE vert/jaune sur tous circuits',ref:'sect.411.3.1'},{id:'qc04',l:'Section cable coherente calibre CB',ref:'sect.433'},{id:'qc05',l:'Schema unifilaire conforme a linstallation',ref:'sect.514.5'}]},
        {cat:'Sections de cable NFC15100',col:'#0277BD',items:[{id:'qc06',l:'Eclairage 1.5mm2 CB max 16A (B10A std)',ref:'sect.433.1'},{id:'qc07',l:'Prises 2.5mm2 CB max 20A (C16A std)',ref:'sect.433.1'},{id:'qc08',l:'Specialises 6mm2 pour CB 32A et plus',ref:'sect.433.1'},{id:'qc09',l:'Chute tension <3% eclairage <5% force',ref:'sect.52.8'}]},
        {cat:'Hauteurs reglementaires',col:'#7c3aed',items:[{id:'qc10',l:'Prises h min 0.10m std 0.35m du sol',ref:'sect.559.5.1'},{id:'qc11',l:'Interrupteurs 0.90 a 1.30m du sol',ref:'sect.559.5.1'},{id:'qc12',l:'Tableau electrique base a 1.80m du sol',ref:'sect.538.2'},{id:'qc13',l:'Boites derivation accessibles et fermees',ref:'sect.526.3'}]},
        {cat:'Reperage et marquage',col:'#16a34a',items:[{id:'qc14',l:'Chaque circuit repere au tableau',ref:'sect.514.8'},{id:'qc15',l:'Couleurs IEC 60446 respectees',ref:'sect.514.3'},{id:'qc16',l:'Schema visible sur porte ou dans coffret',ref:'sect.514.5'},{id:'qc17',l:'Percements colmates anti-feu',ref:'sect.521.8'}]},
        {cat:'Distances et separations',col:'#f59e0b',items:[{id:'qc18',l:'SDB zones 0/1/2 respectees selon IP',ref:'sect.701'},{id:'qc19',l:'Distance min 3cm canalisations gaz',ref:'sect.522.7'},{id:'qc20',l:'Separation courant fort/data min 10cm',ref:'sect.444'}]},
        {cat:'Mise en oeuvre',col:'#0891b2',items:[{id:'qc21',l:'Fixations gaines et cables tous les 50cm',ref:'sect.521.3'},{id:'qc22',l:'Rayon courbure >6 x diametre cable',ref:'sect.521.11'},{id:'qc23',l:'Cables encastres en fourreau ou gaine',ref:'sect.521.6'},{id:'qc24',l:'Connexions serrees bornes vissees',ref:'sect.526.1'}]}
      ];
      const allQC=cats.flatMap(ct=>ct.items);
      const pQC=allQC.filter(it=>realisationChecks['qc_'+it.id]).length;
      const pctQC=allQC.length?Math.round(pQC/allQC.length*100):0;
      return r('div',null,
        r('div',{style:{background:c.surf2,border:'1px solid '+c.bdr,borderRadius:9,padding:'11px 14px',marginBottom:10,display:'flex',alignItems:'center',gap:12}},
          r('div',{style:{fontFamily:c.mono,fontSize:24,fontWeight:900,color:pctQC>=80?'#16a34a':pctQC>=50?'#d97706':'#dc2626'}},pctQC+'%'),
          r('div',{style:{flex:1}},r('div',{style:{height:6,background:c.bdr2,borderRadius:3,overflow:'hidden',marginBottom:3}},r('div',{style:{height:'100%',width:pctQC+'%',background:pctQC>=80?'#16a34a':pctQC>=50?'#d97706':'#dc2626',borderRadius:3}})),r('div',{style:{fontSize:9,color:c.muted}},pQC+'/'+allQC.length+' points conformes NF C 15-100')),
          r('span',{style:{fontSize:11,fontWeight:700,color:pctQC>=80?'#16a34a':pctQC>=50?'#d97706':'#dc2626'}},pctQC>=80?'CONFORME':pctQC>=50?'PARTIEL':'NON CONFORME')
        ),
        ...cats.map(ct=>r('div',{key:ct.cat,style:{background:c.surf2,border:'1px solid '+c.bdr,borderRadius:9,overflow:'hidden',marginBottom:7}},
          r('div',{style:{display:'flex',alignItems:'center',gap:7,padding:'8px 13px',borderBottom:'2px solid '+ct.col,background:ct.col+'0d'}},r('div',{style:{width:6,height:6,borderRadius:'50%',background:ct.col}}),r('span',{style:{fontSize:11,fontWeight:700,color:ct.col,flex:1}},ct.cat),r('span',{style:{fontSize:9,color:c.muted}},'('+ct.items.filter(it=>realisationChecks['qc_'+it.id]).length+'/'+ct.items.length+')')),
          ...ct.items.map(it=>{const done=!!realisationChecks['qc_'+it.id];const nc=!!realisationChecks['qc_nc_'+it.id];return r('div',{key:it.id,style:{display:'flex',alignItems:'center',gap:8,padding:'7px 13px',borderBottom:'1px solid '+c.bdr,background:done?'rgba(22,163,74,.03)':nc?'rgba(220,38,38,.03)':'transparent'}},r('button',{onClick:()=>this.setState(s=>({realisationChecks:{...s.realisationChecks,['qc_'+it.id]:!s.realisationChecks['qc_'+it.id],['qc_nc_'+it.id]:false}})),style:{width:18,height:18,borderRadius:4,border:'2px solid '+(done?'#16a34a':c.bdr2),background:done?'#16a34a':'transparent',color:'#fff',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700}},done?'v':''),r('div',{style:{flex:1}},r('div',{style:{fontSize:10,color:done?c.muted:nc?'#dc2626':c.text,fontWeight:done?400:500,textDecoration:done?'line-through':'none'}},it.l),r('div',{style:{fontSize:8,color:c.muted,fontFamily:c.mono,marginTop:1}},it.ref)),r('button',{onClick:()=>this.setState(s=>({realisationChecks:{...s.realisationChecks,['qc_nc_'+it.id]:!s.realisationChecks['qc_nc_'+it.id],['qc_'+it.id]:false}})),style:{padding:'1px 6px',borderRadius:3,fontSize:8,border:'1px solid '+(nc?'rgba(220,38,38,.4)':c.bdr2),background:nc?'rgba(220,38,38,.1)':'transparent',color:nc?'#dc2626':c.muted,cursor:'pointer',fontWeight:700}},'NC'));})
        ))
      );
    };

    const tabRapports=()=>{
      const today=new Date().toLocaleDateString('fr-FR');const proj=this.state.project;
      const allFnsAll3=pieces.flatMap(p=>p.fonctions||[]);
      const allQCids3=['qc01','qc02','qc03','qc04','qc05','qc06','qc07','qc08','qc09','qc10','qc11','qc12','qc13','qc14','qc15','qc16','qc17','qc18','qc19','qc20','qc21','qc22','qc23','qc24'];
      const qcOk3=allQCids3.filter(id=>realisationChecks['qc_'+id]).length;
      const nomKeys=Object.keys(nomenclatureOverrides).filter(k=>k.includes('_fil'));
      const confNom3=nomKeys.filter(k=>(nomenclatureOverrides[k]||{}).statut==='conf').length;
      const RB=(lbl,col,sub,icon)=>r('div',{style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:10,padding:'12px 16px',display:'flex',alignItems:'center',gap:12,marginBottom:8,cursor:'pointer',boxShadow:c.elev1},onClick:()=>window.print()},r('div',{style:{width:38,height:38,borderRadius:8,background:col+'15',display:'flex',alignItems:'center',justifyContent:'center',color:col,fontWeight:900,fontSize:15,flexShrink:0}},icon||'R'),r('div',{style:{flex:1}},r('div',{style:{fontSize:12,fontWeight:700,color:c.text,marginBottom:2}},lbl),r('div',{style:{fontSize:9,color:c.muted}},sub)),r('div',{style:{background:col,color:'#fff',border:'none',borderRadius:6,padding:'5px 13px',fontSize:10,fontWeight:700,cursor:'pointer'}},'Imprimer'));
      return r('div',null,
        r('div',{style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:10,padding:'12px 16px',marginBottom:12,boxShadow:c.elev1}},
          r('div',{style:{fontSize:11,fontWeight:700,color:c.text,marginBottom:8}},'Informations projet'),
          r('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4px 20px',fontSize:10}},
            r('span',{style:{color:c.muted}},'Projet'),r('span',{style:{color:c.text,fontWeight:600}},proj?.nom||'CEBAT'),
            r('span',{style:{color:c.muted}},'Client'),r('span',{style:{color:c.text}},proj?.client||'—'),
            r('span',{style:{color:c.muted}},'Adresse'),r('span',{style:{color:c.text}},proj?.adresse||'—'),
            r('span',{style:{color:c.muted}},'Date'),r('span',{style:{color:c.text}},today),
            r('span',{style:{color:c.muted}},'Appartements / Pieces'),r('span',{style:{color:c.text}},appartements.length+' / '+pieces.length),
            r('span',{style:{color:c.muted}},'Fonctions / Disjoncteurs'),r('span',{style:{color:c.text}},allFnsAll3.length+' / '+this.state.disjoncteurs.length),
            r('span',{style:{color:c.muted}},'Cables W / Conformes'),r('span',{style:{color:c.text}},nomKeys.filter(k=>k.endsWith('_fil1')).length+' / '+confNom3+' fils'),
            r('span',{style:{color:c.muted}},'Controle qualite'),r('span',{style:{color:qcOk3>=20?'#16a34a':'#d97706',fontWeight:700}},qcOk3+'/24 points')
          )
        ),
        RB('Nomenclature cables — tableau complet','#7c3aed','Reperes W — Tenant/Aboutissant — Type cable — Couleurs IEC 60446 — Statuts','W'),
        RB('Rapport controle qualite NF C 15-100','#16a34a','24 points de conformite verifies — pret inspection CONSUEL','Q'),
        RB('Rapport audit et certification','#ef4444','Rapport complet CONSUEL / CONSUEL BP / DRE','A'),
        RB('Dossier ouvrages executes (DOE)','#f59e0b','Schemas + plans + nomenclature + PV de reception','D'),
        r('div',{style:{padding:'9px 12px',background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)',borderRadius:7,fontSize:9,color:'#16a34a',marginTop:4}},'Les rapports integrent automatiquement les reperes uniques, codes NFC15100, resultats de conformite et statuts de la nomenclature cables.')
      );
    };

    const filtreBar=r('div',{style:{display:'flex',gap:5,alignItems:'center',marginBottom:10,flexWrap:'wrap'}},
      r('span',{style:{fontSize:8,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.07em'}},'Filtrer:'),
      r('select',{value:realisationFilter.appId||'',onChange:e=>sf({appId:e.target.value||null,pieceId:null}),style:{background:c.surf3,border:'1px solid '+(realisationFilter.appId?sky:c.bdr2),borderRadius:5,padding:'3px 7px',fontSize:10,color:c.text,outline:'none'}},r('option',{value:''},'Tous apparts'),...appartements.map(a=>r('option',{key:a.id,value:String(a.id)},(a.appCode||'APP')+' '+a.nom))),
      r('select',{value:realisationFilter.pieceId||'',onChange:e=>sf({pieceId:e.target.value||null}),style:{background:c.surf3,border:'1px solid '+(realisationFilter.pieceId?sky:c.bdr2),borderRadius:5,padding:'3px 7px',fontSize:10,color:c.text,outline:'none'}},r('option',{value:''},'Toutes pieces'),...(realisationFilter.appId?pieces.filter(p=>p.appId===+realisationFilter.appId):pieces).map(p=>r('option',{key:p.id,value:String(p.id)},(p.pieceCode||'PC')+' '+p.nom))),
      r('select',{value:realisationFilter.teId||'',onChange:e=>sf({teId:e.target.value||null}),style:{background:c.surf3,border:'1px solid '+(realisationFilter.teId?sky:c.bdr2),borderRadius:5,padding:'3px 7px',fontSize:10,color:c.text,outline:'none'}},r('option',{value:''},'Tous TE'),...tableauxElec.map(t=>r('option',{key:t.id,value:String(t.id)},(this.genTECode?this.genTECode(t,this.state):t.code||'TE')+' '+t.nom))),
      r('select',{value:realisationFilter.bdId||'',onChange:e=>sf({bdId:e.target.value||null}),style:{background:c.surf3,border:'1px solid '+(realisationFilter.bdId?sky:c.bdr2),borderRadius:5,padding:'3px 7px',fontSize:10,color:c.text,outline:'none'}},r('option',{value:''},'Toutes BD'),...boitesDeriv.map(b=>r('option',{key:b.id,value:String(b.id)},this.genBDCode?this.genBDCode(b,this.state)+' '+(b.nom||''):b.nom||'BD#'+b.id))),
    );

    return r('div',{style:{padding:'18px 22px',animation:'fadeIn .3s ease',height:'100%',overflowY:'auto',overflowX:'auto',minWidth:0}},
      this.SH('Realisation et Controle','NF C 15-100 - Suivi chantier, controle et certification'),
      r('div',{style:{display:'flex',gap:5,flexWrap:'wrap',marginBottom:10}},
        tabBtn('bord','Tableau de bord','>>'),tabBtn('nomenclature','Nomenclature cables','[N]'),tabBtn('controle','Controle qualite','[V]'),tabBtn('rapports','Rapports','[R]')
      ),
      filtreBar,
      realisationTab==='bord'?tabBord():realisationTab==='nomenclature'?tabNomenclature():realisationTab==='controle'?tabControle():tabRapports()
    );
  }


  cableMetre(){
    const s=this.state;const djs=s.disjoncteurs||[];
    const marge=(s.project&&Number.isFinite(+s.project.margeCable)&&+s.project.margeCable>=0)?+s.project.margeCable:10;
    const bySec={};let totalKnown=0,nNoLen=0,nTot=0;
    djs.forEach(d=>{if((d.recepteurs||[]).length===0)return;nTot++;const L=+d.longueur>0?+d.longueur:0;if(L<=0){nNoLen++;return;}const sec=parseFloat(d.section)||1.5;bySec[sec]=(bySec[sec]||0)+L;totalKnown+=L;});
    const rows=Object.keys(bySec).map(k=>+k).sort((a,b)=>a-b).map(sec=>{const m=bySec[sec];return{sec,metres:Math.round(m),aCommander:Math.ceil(m*(1+marge/100))};});
    return{rows,marge,totalKnown:Math.round(totalKnown),gaineICTA:Math.ceil(totalKnown*(1+marge/100)),nNoLen,nTot};
  }
  exportMetreCSV(){
    try{const mt=this.cableMetre();const esc=v=>{const t=v==null?'':String(v);return /[";\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t;};
      const L=[['Section (mm2)','Longueur (m)','A commander (+'+mt.marge+'%)'].join(';')];
      mt.rows.forEach(x=>L.push([x.sec,x.metres,x.aCommander].map(esc).join(';')));
      L.push('');L.push(['Gaine ICTA (m)','',mt.gaineICTA].map(esc).join(';'));L.push(['Total cable (m)',mt.totalKnown,''].map(esc).join(';'));
      this._downloadBlob('﻿'+L.join('\r\n'),'text/csv;charset=utf-8','cebat_metre_cables_'+this._slug()+'.csv');this.showToast('Métré câbles exporté');
    }catch(e){this.showToast('Echec export métré');}
  }
  vCablage(circuits){
    const c=this.C;const r=this.r;
    const cT={1.5:{type:'H07VU 3G1.5mm²',color:'#f59e0b',use:'Éclairage'},2.5:{type:'H07VU 3G2.5mm²',color:'#3b82f6',use:'Prises & spécialisés'},6:{type:'H07RNF 3G6mm²',color:'#ef4444',use:'Haute puissance'}};
    const grp={};for(const ci of circuits){if(!grp[ci.section])grp[ci.section]=[];grp[ci.section].push(ci);}
    const mt=this.cableMetre();
    const metreCard=this.Card('Métré câbles à commander',
      r('div',null,
        r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:8}},
          r('span',{style:{fontSize:11,color:c.muted}},'Marge'),
          r('input',{type:'number',min:0,max:100,step:1,value:mt.marge,onChange:e=>{const v=+e.target.value;this.setState(s=>({project:{...s.project,margeCable:(Number.isFinite(v)&&v>=0)?v:10}}));},style:{width:60,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:6,padding:'4px 8px',color:c.text,fontSize:12,fontFamily:c.mono,textAlign:'right'}}),
          r('span',{style:{fontSize:11,color:c.muted}},'%')),
        mt.rows.length===0?r('div',{style:{fontSize:11,color:c.muted,fontStyle:'italic'}},'Renseigner la longueur des circuits pour obtenir le métré.'):
          r('div',null,...mt.rows.map(x=>r('div',{key:x.sec,style:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'5px 0',borderBottom:`1px solid ${c.bdr}`}},
            r('span',{style:{fontSize:11,color:c.text,fontFamily:c.mono,fontWeight:600}},x.sec+' mm²'),
            r('span',{style:{fontSize:10,color:c.muted,fontFamily:c.mono}},x.metres+' m'),
            r('span',{style:{fontSize:11,color:c.warn,fontFamily:c.mono,fontWeight:700}},'→ '+x.aCommander+' m')))),
        r('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 0 2px',marginTop:4,borderTop:`1px solid ${c.bdr2}`}},
          r('span',{style:{fontSize:11,color:c.text2,fontWeight:600}},'Gaine ICTA'),
          r('span',{style:{fontSize:11,color:c.accent,fontFamily:c.mono,fontWeight:700}},mt.gaineICTA+' m')),
        mt.nNoLen>0?r('div',{style:{fontSize:10,color:c.warn,marginTop:6}},'⚠ '+mt.nNoLen+' circuit(s) sans longueur — exclus du métré'):null,
        r('div',{style:{fontSize:9,color:c.muted,marginTop:6,fontStyle:'italic'}},'Quantités indicatives — vérifier au plan avant commande.')),
      this.Btn('⤓ CSV',()=>this.exportMetreCSV(),'sec','sm'),14);
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease'}},
      this.SH('Câblage & Nomenclature','Types, sections, couleurs — NF C 15-100 et IEC 60446'),
      r('div',{style:{display:'grid',gridTemplateColumns:'1fr 270px',gap:14}},
        r('div',null,...Object.entries(grp).sort((a,b)=>+a[0]-+b[0]).map(([sec,cis])=>{
          const ct=cT[sec]||{type:sec+'mm²',color:c.muted,use:''};const tot=cis.reduce((s,ci)=>s+ci.len,0);
          return r('div',{key:sec,style:{marginBottom:16}},
            r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:7}},r('div',{style:{width:10,height:10,borderRadius:2,background:ct.color}}),r('span',{style:{fontSize:13,fontWeight:700,color:c.text}},ct.type),r('span',{style:{fontSize:11,color:c.muted}},'— '+ct.use),this.Bdg(cis.length+' ckts',ct.color),this.Bdg(Math.ceil(tot*1.15)+'m',c.muted)),
            r('div',{className:'cbt-card',style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:10,overflow:'hidden',boxShadow:c.elev1}},
              r('table',{style:{width:'100%',borderCollapse:'collapse',fontSize:11,fontFamily:c.mono}},
                r('thead',null,r('tr',{style:{background:c.surf3}},...['Circuit','Pièce','Sect.','Long.','Qté (×1.15)'].map(h=>r('th',{key:h,style:{padding:'6px 11px',textAlign:'left',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em'}},h)))),
                r('tbody',null,...cis.map((ci,i)=>r('tr',{key:ci.id,style:{borderBottom:`1px solid ${c.bdr}`,background:i%2?'transparent':'rgba(255,255,255,.01)'}},
                  r('td',{style:{padding:'6px 11px',color:c.text,fontFamily:c.font,fontWeight:500}},ci.nom),
                  r('td',{style:{padding:'6px 11px',color:c.text2,fontFamily:c.font}},ci.piece),
                  r('td',{style:{padding:'6px 11px'}},this.Bdg(ci.section+' mm²',ct.color)),
                  r('td',{style:{padding:'6px 11px',color:c.text2}},'~'+ci.len+' m'),
                  r('td',{style:{padding:'6px 11px',color:c.warn,fontWeight:600}},Math.ceil(ci.len*1.15)+' m')))))));
        })),
        r('div',{style:{display:'flex',flexDirection:'column',gap:12}},
          metreCard,
          this.Card('Code couleurs IEC 60446',r('div',null,...[{l:'Phase (L)',code:'ROUGE / MARRON',hex:'#dc2626'},{l:'Neutre (N)',code:'BLEU',hex:'#2563eb'},{l:'Terre (PE)',code:'VERT / JAUNE',hex:'#65a30d'}].map(cc=>r('div',{key:cc.l,style:{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:`1px solid ${c.bdr}`}},r('div',{style:{width:24,height:10,borderRadius:2,background:cc.hex}}),r('div',null,r('div',{style:{fontSize:11,color:c.text,fontWeight:600}},cc.l),r('div',{style:{fontSize:10,color:cc.hex,fontWeight:700}},cc.code))))),null,14))
    ));
  }

  vDomotique(){
    const c=this.C;const r=this.r;
    const protos=[{id:'knx',n:'KNX / EIB',icon:'broadcast',d:'Bus filaire pro',f:'TP, RF, IP',col:c.acBlue},{id:'zigbee',n:'Zigbee / Z-Wave',icon:'signal_ico',d:'Mesh sans-fil',f:'2.4GHz / 868MHz',col:c.success},{id:'wifi',n:'WiFi / Matter',icon:'wifi_ico',d:'IP local — 50m',f:'2.4/5 GHz',col:c.warn}];
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease'}},
      this.SH('Domotique & Automatisation','Protocoles, scénarios et intégration intelligente'),
      r('div',{style:{marginBottom:16}},
        r('div',{style:{fontSize:10,fontWeight:700,color:c.text2,textTransform:'uppercase',letterSpacing:'.07em',marginBottom:8}},'PROTOCOLES'),
        r('div',{style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}},
          ...protos.map(p=>r('div',{key:p.id,style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:10,padding:14}},
            r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:8}},r('span',{style:{display:'inline-flex',alignItems:'center',color:p.col}},this.ico(p.icon,20)),r('div',null,r('div',{style:{fontSize:12,fontWeight:700,color:c.text}},p.n),r('div',{style:{fontSize:10,color:c.muted}},p.d))),
            this.Bdg(p.f,p.col))))),
      r('div',{style:{background:'rgba(34,197,94,.06)',border:`1px solid rgba(34,197,94,.2)`,borderRadius:9,padding:'13px 16px'}},
        r('div',{style:{fontSize:12,fontWeight:600,color:c.success,marginBottom:4}},'Recommandation'),
        r('div',{style:{fontSize:11,color:c.muted,lineHeight:1.7}},'Basé sur '+this.state.pieces.length+' pièces et '+this.state.appartements.length+' appartements, il est recommandé d\'installer KNX sur les circuits éclairage principaux avec capteurs de présence Zigbee. Économie estimée : 15-25%.'))
    );
  }

  vTests(){
    const{tests}=this.state;const c=this.C;const r=this.r;
    const groups=[{id:'cont',icon:'link_icon',l:'Continuité des conducteurs',ts:[{id:'pe_c',l:'Continuité PE (terre)',ref:'§61.3.3'},{id:'n_c',l:'Continuité N (neutre)',ref:'§61.3.3'},{id:'l_c',l:'Continuité L (phase)',ref:'§61.3.3'},{id:'eq',l:'Liaison équipotentielle',ref:'§411.3.1.2'}]},{id:'isol',icon:'shield_ico',l:'Résistance d\'isolement',ts:[{id:'iln',l:'Isolement L/N > 1MΩ (500V DC)',ref:'§61.3.2'},{id:'ilpe',l:'Isolement L/PE > 1MΩ',ref:'§61.3.2'},{id:'inp',l:'Isolement N/PE > 1MΩ',ref:'§61.3.2'}]},{id:'diff',icon:this.ico('zap_ico',14),l:'Protection différentielle',ts:[{id:'d1',l:'DDR 1 — déclenchement 30mA AC',ref:'§531.2'},{id:'d2',l:'DDR 2 — déclenchement 30mA A',ref:'§531.2'},{id:'dt',l:'Temps déclenchement < 300ms',ref:'IEC 61008'}]},{id:'tens',icon:'chart_ico',l:'Tensions',ts:[{id:'v230',l:'Tension 230V ± 5%',ref:'EN 50160'},{id:'vch',l:'Chute tension < 3% éclairage',ref:'§52.8'}]},{id:'terre',icon:'earth_ico',l:'Mise à la terre',ts:[{id:'rpe',l:'Mesure Rpe (boucle de terre)',ref:'§61.3.6'},{id:'re',l:'Résistance terre < 100Ω',ref:'§411.5.3'}]}];
    const allT=groups.flatMap(g=>g.ts);const passed=allT.filter(t=>tests[t.id]==='pass').length;const failed=allT.filter(t=>tests[t.id]==='fail').length;const score=allT.length?Math.round(passed/allT.length*100):0;
    const toggle=(id,val)=>this.setState(s=>({tests:{...s.tests,[id]:s.tests[id]===val?undefined:val}}));
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease'}},
      this.SH('Tests & Contrôles','NF C 15-100 §61 · IEC 60364-6',r('div',{style:{display:'flex',gap:8,alignItems:'center'}},this.Bdg(passed+'/'+allT.length+' OK',c.success),failed>0&&this.Bdg(failed+' FAIL',c.danger),this.Btn('Reset',()=>this.setState({tests:{}}),'ghost','sm'))),
      r('div',{style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:12,padding:'14px 18px',marginBottom:14}},
        r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:7}},r('span',{style:{fontSize:12,fontWeight:600,color:c.text}},'Score de conformité'),r('span',{style:{fontSize:22,fontWeight:800,fontFamily:c.mono,color:score>=80?c.success:score>=50?c.warn:c.danger}},score+'%')),
        r('div',{style:{height:7,background:c.bdr2,borderRadius:3,overflow:'hidden',marginBottom:8}},r('div',{style:{height:'100%',width:score+'%',background:score>=80?c.success:score>=50?c.warn:c.danger,borderRadius:3,transition:'width .4s'}})),
        r('div',{style:{display:'flex',gap:16,fontSize:11}},r('span',{style:{color:c.success}},'✓ '+passed),r('span',{style:{color:c.danger}},'✗ '+failed),r('span',{style:{color:c.muted}},'○ '+(allT.length-passed-failed)+' non testés'))),
      r('div',{style:{display:'flex',flexDirection:'column',gap:10}},
        ...groups.map(grp=>r('div',{key:grp.id,style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:12,overflow:'hidden'}},
          r('div',{style:{padding:'10px 16px',borderBottom:`1px solid ${c.bdr}`,display:'flex',alignItems:'center',gap:8}},r('span',{style:{display:'inline-flex',alignItems:'center',color:c.text2}},this.ico(grp.icon,15)),r('span',{style:{fontSize:12,fontWeight:700,color:c.text}},grp.l),r('span',{style:{fontSize:10,color:c.muted,marginLeft:'auto'}},grp.ts.filter(t=>tests[t.id]==='pass').length+'/'+grp.ts.length)),
          ...grp.ts.map(test=>{const st=tests[test.id];return r('div',{key:test.id,style:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 16px',borderBottom:`1px solid ${c.bdr}`}},
            r('div',{style:{flex:1}},r('div',{style:{fontSize:12,color:c.text}},test.l),r('div',{style:{fontSize:9,color:c.muted,fontFamily:c.mono,marginTop:2}},test.ref)),
            r('div',{style:{display:'flex',gap:4}},
              r('button',{onClick:()=>toggle(test.id,'pass'),style:{padding:'3px 9px',border:`1px solid ${st==='pass'?c.success:c.bdr2}`,borderRadius:5,background:st==='pass'?'rgba(34,197,94,.12)':'transparent',color:st==='pass'?c.success:c.muted,fontSize:10,fontWeight:600,cursor:'pointer'}},'✓ OK'),
              r('button',{onClick:()=>toggle(test.id,'fail'),style:{padding:'3px 9px',border:`1px solid ${st==='fail'?c.danger:c.bdr2}`,borderRadius:5,background:st==='fail'?'rgba(239,68,68,.12)':'transparent',color:st==='fail'?c.danger:c.muted,fontSize:10,fontWeight:600,cursor:'pointer'}},'✗ FAIL')));}))))
    );
  }

  _circuitRule(type){
    const R={
      eclairage:{calibre:16,courbe:'C',section:1.5,ddr:30,maxR:8,grp:'eclairage'},
      prises:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:8,grp:'prises'},
      prises_sdb:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:8,grp:'prises_sdb'},
      four:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:1,grp:null},
      lave_vaisselle:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:1,grp:null},
      lave_linge:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:1,grp:null},
      seche_linge:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:1,grp:null},
      chauffe_eau:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:1,grp:null},
      climatisation:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:1,grp:null},
      borne_ve:{calibre:32,courbe:'C',section:6,ddr:30,maxR:1,grp:null},
      piscine:{calibre:20,courbe:'C',section:2.5,ddr:30,maxR:1,grp:null}
    };
    return R[type]||{calibre:16,courbe:'C',section:1.5,ddr:30,maxR:1,grp:null};
  }
  feuilleAutoAssign(){
    this.setState(st=>{
      const pcs=st.pieces||[];const djs=[...(st.disjoncteurs||[])];
      const assigned=new Set();djs.forEach(d=>(d.recepteurs||[]).forEach(rf=>assigned.add(rf)));
      const teId=((st.tableauxElec||[])[0]||{}).id||null;
      let nid=st.nextElemId;const newDjs=[];
      const groups={};const specials=[];
      pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{
        if(!fn.ref||assigned.has(fn.ref))return;
        const rule=this._circuitRule(fn.type);
        if(rule.grp){const k=rule.grp+'|'+p.id;(groups[k]=groups[k]||[]).push({fn,p,rule});}
        else specials.push({fn,p,rule});
      }));
      const pushDj=(refs,rule,pieceId)=>{newDjs.push({id:nid,code:this.genDjCode([...djs,...newDjs],teId),recepteurs:refs.slice(),pieceId,calibre:rule.calibre,courbe:rule.courbe,poles:'1',ddr:rule.ddr,section:rule.section,tableauId:teId});nid++;};
      Object.keys(groups).forEach(k=>{const arr=groups[k];const rule=arr[0].rule;const pieceId=arr[0].p.id;for(let i=0;i<arr.length;i+=rule.maxR){pushDj(arr.slice(i,i+rule.maxR).map(x=>x.fn.ref),rule,pieceId);}});
      specials.forEach(x=>pushDj([x.fn.ref],x.rule,x.p.id));
      if(newDjs.length===0)return{};
      return{disjoncteurs:[...djs,...newDjs],nextElemId:nid};
    });
    this.showToast('Circuits générés pour les fonctions non affectées');
  }
  vFeuillePuissance(){
    const s=this.state;const c=this.C;const r=this.r;
    const pcs=s.pieces||[];const djs=s.disjoncteurs||[];const tes=s.tableauxElec||[];
    const FNS=this.FNS;
    const refType={};pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.ref)refType[fn.ref]=fn.type;}));
    const assignOf={};djs.forEach(d=>(d.recepteurs||[]).forEach(rf=>{assignOf[rf]=d;}));
    const selFn=s.feuilleSelFn||null;
    let issues=[];try{issues=this.checkConformite();}catch(e){}
    const nErr=issues.filter(i=>i.level==='error').length;const nWarn=issues.filter(i=>i.level==='warn').length;
    const bilan=this.bilanPuissance();
    const allRefs=[];pcs.forEach(p=>(p.fonctions||[]).forEach(fn=>{if(fn.ref)allRefs.push(fn.ref);}));
    const nUnassigned=allRefs.filter(rf=>!assignOf[rf]).length;
    const upDj=(id,patch)=>this.setState(st=>({disjoncteurs:st.disjoncteurs.map(d=>d.id===id?{...d,...patch}:d)}));
    const unassign=(ref)=>this.setState(st=>({disjoncteurs:st.disjoncteurs.map(d=>(d.recepteurs||[]).includes(ref)?{...d,recepteurs:(d.recepteurs||[]).filter(x=>x!==ref)}:d)}));
    const delDj=(id)=>this.setState(st=>({disjoncteurs:st.disjoncteurs.filter(d=>d.id!==id),feuilleSelCircuit:null}));
    const moveOrAssign=(ref,djId)=>{if(!ref)return;this.setState(st=>({disjoncteurs:st.disjoncteurs.map(d=>{
      if(d.id===djId)return (d.recepteurs||[]).includes(ref)?d:{...d,recepteurs:[...(d.recepteurs||[]),ref]};
      if((d.recepteurs||[]).includes(ref))return{...d,recepteurs:(d.recepteurs||[]).filter(x=>x!==ref)};
      return d;}),feuilleSelFn:null,feuilleDragFn:null,feuilleDropTarget:null}));};
    const assignSelTo=(djId)=>moveOrAssign(selFn,djId);
    const createFromSel=()=>{if(!selFn||assignOf[selFn])return;const rule=this._circuitRule(refType[selFn]);const teId=(tes[0]||{}).id||null;const nd={id:s.nextElemId,code:this.genDjCode(djs,teId),recepteurs:[selFn],pieceId:null,calibre:rule.calibre,courbe:rule.courbe,poles:'1',ddr:rule.ddr,section:rule.section,tableauId:teId};this.setState(st=>({disjoncteurs:[...st.disjoncteurs,nd],nextElemId:st.nextElemId+1,feuilleSelFn:null}));};
    const addEmpty=()=>{const teId=(tes[0]||{}).id||null;const nd={id:s.nextElemId,code:this.genDjCode(djs,teId),recepteurs:[],pieceId:null,calibre:16,courbe:'C',poles:'1',ddr:30,section:1.5,tableauId:teId};this.setState(st=>({disjoncteurs:[...st.disjoncteurs,nd],nextElemId:st.nextElemId+1,feuilleSelCircuit:nd.id}));};
    const dotOf=(t)=>r('span',{style:{width:9,height:9,borderRadius:5,background:(FNS[t]||{}).color||'#94a3b8',display:'inline-block',flexShrink:0}});
    const colHeader=(t,right)=>r('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:8,paddingBottom:6,borderBottom:'2px solid '+c.bdr}},r('span',{style:{fontSize:11,fontWeight:800,color:c.text,textTransform:'uppercase',letterSpacing:'.06em'}},t),r('div',{style:{flex:1}}),right||null);
    // LEFT — pièces & fonctions
    const fnRow=(fn)=>{const ref=fn.ref;const dj=assignOf[ref];const sel=selFn===ref;const q=+fn.quantite>1?' ×'+fn.quantite:'';
      const dragging=s.feuilleDragFn===ref;
      return r('div',{key:ref,draggable:true,onDragStart:(e)=>{try{e.dataTransfer.setData('text/plain',ref);e.dataTransfer.effectAllowed='move';}catch(_){}this.setState({feuilleSelFn:ref,feuilleDragFn:ref});},onDragEnd:()=>this.setState({feuilleDragFn:null,feuilleDropTarget:null}),onClick:()=>{if(!dj)this.setState({feuilleSelFn:sel?null:ref});},style:{display:'flex',alignItems:'center',gap:7,padding:'5px 8px',borderRadius:6,cursor:'grab',opacity:dragging?0.45:1,background:sel?'rgba(2,119,189,.14)':(dj?'transparent':c.surf3),border:'1px solid '+(sel?c.accent:'transparent'),marginBottom:3}},
        r('span',{style:{color:c.muted,fontSize:11,cursor:'grab',userSelect:'none'},title:'Glisser vers un circuit'},'⠿'),
        dotOf(fn.type),
        r('div',{style:{flex:1,minWidth:0}},r('div',{style:{fontSize:11,fontWeight:600,color:c.text,fontFamily:c.mono}},ref+q),r('div',{style:{fontSize:9,color:c.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},(FNS[fn.type]||{label:fn.type}).label)),
        dj?r('span',{onClick:(e)=>{e.stopPropagation();this.setState({feuilleSelCircuit:dj.id});},title:'Voir le circuit',style:{fontSize:9,fontFamily:c.mono,fontWeight:700,color:'#0277BD',cursor:'pointer'}},dj.code):r('span',{style:{fontSize:8,fontWeight:700,color:c.warn,textTransform:'uppercase'}},'à affecter'),
        dj?r('button',{onClick:(e)=>{e.stopPropagation();unassign(ref);},title:'Retirer du circuit',style:{border:'none',background:'transparent',color:c.muted,cursor:'pointer',fontSize:14,lineHeight:1,padding:0}},'×'):null);
    };
    const leftPieces=pcs.map(p=>{const fns=(p.fonctions||[]).filter(fn=>fn.ref);if(fns.length===0)return null;const na=fns.filter(fn=>!assignOf[fn.ref]).length;
      return r('div',{key:p.id,style:{marginBottom:11}},
        r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:4}},r('span',{style:{fontSize:11,fontWeight:800,color:c.text}},p.nom||('Pièce '+p.id)),r('span',{style:{fontSize:9,color:c.muted}},'('+(+p.surface||'?')+' m²)'),na>0?r('span',{style:{marginLeft:'auto',fontSize:8,fontWeight:700,color:c.warn,background:'rgba(217,119,6,.12)',borderRadius:4,padding:'1px 5px'}},na+' à affecter'):r('span',{style:{marginLeft:'auto',fontSize:11,color:c.success}},'✓')),
        ...fns.map(fnRow));
    }).filter(Boolean);
    // CENTER — circuits
    const calOpts=['10','16','20','25','32','40'];const sectOpts=['1.5','2.5','4','6','10','16'];const ddrOpts=['0','30','300'];const courbeOpts=['B','C','D'];
    const miniSel=(val,opts,onch,fmt)=>r('select',{value:val,onClick:e=>e.stopPropagation(),onChange:e=>onch(e.target.value),style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:4,padding:'2px 3px',color:c.text,fontSize:10,fontFamily:c.mono,outline:'none'}},...opts.map(o=>r('option',{key:o,value:o},fmt?fmt(o):o)));
    const circuitCard=(d)=>{
      const refs=d.recepteurs||[];let pw=0;try{pw=this.calcDjPower(d,pcs);}catch(e){}
      const lim=this.djNFCLimit(d);const over=pw>lim.maxW||refs.length>lim.maxR;const load=Math.min(100,Math.round(pw/Math.max(1,lim.maxW)*100));
      let vd=null;try{vd=this.voltageDropOf(d);}catch(e){}
      const secOk=this.sectionOkForCalibre(d.section,d.calibre);
      const canAssign=selFn&&!assignOf[selFn];
      const teName=(tes.find(t=>t.id===d.tableauId)||{}).code||'';
      const isSel=s.feuilleSelCircuit===d.id;
      const isDropT=s.feuilleDropTarget===d.id;const dragActive=!!s.feuilleDragFn;
      return r('div',{key:d.id,className:'cbt-card',onClick:()=>this.setState({feuilleSelCircuit:d.id}),
        onDragOver:(e)=>{e.preventDefault();try{e.dataTransfer.dropEffect='move';}catch(_){}if(s.feuilleDropTarget!==d.id)this.setState({feuilleDropTarget:d.id});},
        onDragLeave:()=>{if(s.feuilleDropTarget===d.id)this.setState({feuilleDropTarget:null});},
        onDrop:(e)=>{e.preventDefault();let ref='';try{ref=e.dataTransfer.getData('text/plain');}catch(_){}moveOrAssign(ref||s.feuilleDragFn,d.id);},
        style:{border:'2px solid '+(isDropT?c.accent:isSel?c.accent:over?c.danger:(dragActive?c.bdr2:c.bdr)),borderStyle:isDropT?'dashed':'solid',borderRadius:11,padding:'9px 11px',marginBottom:8,background:isDropT?'rgba(2,119,189,.07)':c.surf,boxShadow:isDropT?c.elev2:c.elev1,transition:'border-color .12s,background .12s,box-shadow .12s'}},
        r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:7,flexWrap:'wrap'}},
          r('span',{style:{fontFamily:c.mono,fontWeight:900,fontSize:14,color:'#0277BD'}},d.code),
          teName?r('span',{style:{fontSize:9,color:c.muted,fontFamily:c.mono}},teName):null,
          r('div',{style:{flex:1}}),
          miniSel(d.courbe||'C',courbeOpts,v=>upDj(d.id,{courbe:v})),
          miniSel(String(d.calibre||16),calOpts,v=>upDj(d.id,{calibre:+v}),v=>v+'A'),
          miniSel(String(d.section||1.5),sectOpts,v=>upDj(d.id,{section:+v}),v=>v+'mm²'),
          miniSel(String(d.ddr||0),ddrOpts,v=>upDj(d.id,{ddr:+v}),v=>+v===0?'0':v+'mA'),
          tes.length>1?miniSel(String(d.tableauId||''),tes.map(t=>String(t.id)),v=>upDj(d.id,{tableauId:v?+v:null}),v=>{const t=tes.find(x=>String(x.id)===v);return t?(t.code||t.nom):'—';}):null,
          r('button',{onClick:(e)=>{e.stopPropagation();delDj(d.id);},title:'Supprimer le circuit',style:{border:'none',background:'transparent',color:c.danger,cursor:'pointer',fontSize:12}},'🗑')),
        r('div',{style:{display:'flex',gap:5,flexWrap:'wrap',marginBottom:7,minHeight:18}},
          refs.length?refs.map(rf=>r('span',{key:rf,style:{display:'inline-flex',alignItems:'center',gap:4,fontSize:10,fontWeight:600,color:c.text,background:((FNS[refType[rf]]||{}).color||'#94a3b8')+'22',border:'1px solid '+((FNS[refType[rf]]||{}).color||'#94a3b8'),borderRadius:5,padding:'1px 6px'}},rf,r('span',{onClick:(e)=>{e.stopPropagation();unassign(rf);},style:{cursor:'pointer',color:c.muted}},'×'))):r('span',{style:{fontSize:10,color:c.muted,fontStyle:'italic'}},'Aucun récepteur — glissez une fonction ici'),
          canAssign?r('button',{onClick:(e)=>{e.stopPropagation();assignSelTo(d.id);},style:{fontSize:10,fontWeight:700,color:'#fff',background:c.accent,border:'none',borderRadius:5,padding:'2px 8px',cursor:'pointer'}},'+ '+selFn):null),
        r('div',{style:{display:'flex',alignItems:'center',gap:9,fontSize:9,color:c.muted}},
          r('div',{style:{flex:1,height:5,background:c.surf3,borderRadius:3,overflow:'hidden'}},r('div',{style:{width:load+'%',height:'100%',background:over?c.danger:load>80?c.warn:c.success}})),
          r('span',{style:{fontFamily:c.mono}},pw+'W'),
          vd?r('span',{style:{fontFamily:c.mono,color:vd.pctCumul>5?c.danger:c.muted}},'ΔU '+vd.pctCumul.toFixed(1)+'%'):null,
          (+d.longueur>0)?(()=>{const lp=this.lmaxProtege(d);const ko=isFinite(lp.lmax)&&(+d.longueur>lp.lmax);return r('span',{style:{fontFamily:c.mono,color:ko?c.danger:c.muted},title:'Longueur max protégée (déclenchement magnétique) = '+lp.lmax+'m'},'Lmax '+lp.lmax+'m');})():null,
          (()=>{const cc=this.currentCapacity(d);if(cc.izBase<=0)return null;return r('span',{style:{fontFamily:c.mono,color:cc.ok?c.muted:c.danger},title:'Courant admissible Iz '+cc.iz+'A (pose '+cc.method+' '+cc.iso+', K1='+cc.k1+' K2='+cc.k2+') · In '+cc.inA+'A'},'Iz '+cc.iz+'A');})(),
          (()=>{const ms=this.motorStartDrop(d);if(!ms)return null;return r('span',{style:{fontFamily:c.mono,color:ms.pctStart>ms.lim?c.danger:c.muted},title:'Chute au démarrage moteur ~'+ms.pctStart.toFixed(1)+'% (pointe '+ms.kd+'× In, limite '+ms.lim+'%)'},'Dém '+ms.pctStart.toFixed(1)+'%');})(),
          secOk?null:r('span',{style:{color:c.danger,fontWeight:700}},'section!'),
          over?r('span',{style:{color:c.danger,fontWeight:700}},'surcharge'):null));
    };
    // RIGHT — synthèse live
    const stat=(label,val,col)=>r('div',{className:'cbt-stat',style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:10,padding:'6px 11px',boxShadow:c.elev1}},r('div',{style:{fontSize:9,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em'}},label),r('div',{style:{fontSize:15,fontWeight:800,color:col||c.text,fontFamily:c.mono}},val));
    const rightChildren=[
      colHeader('Synthèse'),
      r('div',{key:'bil',className:'cbt-card',style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:11,padding:'10px 12px',marginBottom:10,boxShadow:c.elev1}},
        r('div',{style:{fontSize:10,fontWeight:700,color:c.muted,marginBottom:6}},'Bilan de puissance'),
        r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}},r('span',{style:{color:c.text2}},'Installée'),r('span',{style:{fontFamily:c.mono,fontWeight:700}},Math.round(bilan.totalInstalledW)+' W')),
        r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}},r('span',{style:{color:c.text2}},'Foisonnée'),r('span',{style:{fontFamily:c.mono,fontWeight:700,color:c.accent}},bilan.kvaFoisonne+' kVA')),
        bilan.souscriteKva?r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:11}},r('span',{style:{color:c.text2}},'Souscrite'),r('span',{style:{fontFamily:c.mono,fontWeight:700,color:bilan.kvaFoisonne>bilan.souscriteKva?c.danger:c.success}},bilan.souscriteKva+' kVA')):null),
      ...tes.map(te=>{const br=this._boardRows(te);const full=br.usedModules>br.capacity;return r('div',{key:'te'+te.id,className:'cbt-card',style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:11,padding:'9px 12px',marginBottom:8,boxShadow:c.elev1}},
        r('div',{style:{display:'flex',justifyContent:'space-between',fontSize:11}},r('span',{style:{fontWeight:700,color:'#0277BD',fontFamily:c.mono}},te.code||te.nom),r('span',{style:{fontFamily:c.mono,color:full?c.warn:c.text2}},br.usedModules+' mod / '+br.nbRangees+' rg')));}),
      r('div',{key:'conf',className:'cbt-card',style:{background:c.surf,border:'1px solid '+c.bdr,borderRadius:11,padding:'10px 12px',boxShadow:c.elev1}},
        r('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:6}},r('span',{style:{fontSize:10,fontWeight:700,color:c.muted}},'Conformité'),r('span',{style:{marginLeft:'auto',fontSize:10,fontWeight:800,color:nErr?c.danger:nWarn?c.warn:c.success,fontFamily:c.mono}},nErr?nErr+' err':nWarn?nWarn+' avert':'OK')),
        ...(issues.slice(0,6).map((i,k)=>r('div',{key:k,style:{fontSize:9,color:c.text2,marginBottom:3,paddingLeft:8,borderLeft:'2px solid '+(i.level==='error'?c.danger:i.level==='warn'?c.warn:c.accent)}},i.msg))),
        issues.length>6?r('div',{style:{fontSize:9,color:c.muted,fontStyle:'italic'}},'+'+(issues.length-6)+' autre(s)…'):null,
        issues.length===0?r('div',{style:{fontSize:10,color:c.success}},'Aucune anomalie.'):null)
    ];
    const centerToolbar=r('div',{style:{display:'flex',alignItems:'center',gap:7,marginBottom:8,paddingBottom:6,borderBottom:'2px solid '+c.bdr,flexWrap:'wrap'}},
      r('span',{style:{fontSize:11,fontWeight:800,color:c.text,textTransform:'uppercase',letterSpacing:'.06em'}},'Circuits'),
      r('div',{style:{flex:1}}),
      selFn?this.Btn('★ Nouveau circuit pour '+selFn,createFromSel,'primary','sm'):null,
      nUnassigned>0?this.Btn('⚡ Auto-affecter ('+nUnassigned+')',()=>this.feuilleAutoAssign(),'sec','sm'):null,
      this.Btn('↔ Longueurs auto (plan)',()=>this.estimateLengthsFromPlan(),'sec','sm'),
      this.Btn('+ Circuit vide',addEmpty,'ghost','sm'));
    const empty=(txt)=>r('div',{style:{fontSize:11,color:c.muted,fontStyle:'italic',padding:'16px 4px'}},txt);
    return r('div',{style:{padding:'18px 22px',height:'100%',display:'flex',flexDirection:'column',animation:'fadeIn .3s ease',boxSizing:'border-box'}},
      this.SH('Feuille de puissance','Pièces, circuits et tableau sur un seul écran — '+djs.length+' circuit'+(djs.length>1?'s':'')+(nUnassigned?' · '+nUnassigned+' fonction(s) à affecter':' · tout est affecté')),
      r('div',{style:{display:'flex',gap:10,margin:'10px 0 14px',flexWrap:'wrap',alignItems:'center'}},
        stat('Circuits',String(djs.length)),
        stat('Puissance',bilan.kvaFoisonne+' kVA',c.accent),
        stat('À affecter',String(nUnassigned),nUnassigned?c.warn:c.success),
        stat('Conformité',nErr?nErr+' err':nWarn?nWarn+' avert':'OK',nErr?c.danger:nWarn?c.warn:c.success),
        r('div',{style:{flex:1}}),
        selFn?r('div',{style:{fontSize:11,color:c.accent,fontWeight:700,background:'rgba(2,119,189,.1)',border:'1px solid '+c.accent,borderRadius:8,padding:'7px 12px'}},'Sélection « '+selFn+' » — cliquez « + » sur un circuit ou « Nouveau circuit »'):null),
      r('div',{style:{display:'flex',gap:14,flex:1,minHeight:0}},
        r('div',{style:{width:262,flexShrink:0,display:'flex',flexDirection:'column',minHeight:0}},colHeader('Pièces & fonctions'),r('div',{style:{overflowY:'auto',flex:1,paddingRight:4}},leftPieces.length?leftPieces:empty('Aucune pièce avec des fonctions. Ajoutez-les dans « Appartements & Pièces ».'))),
        r('div',{style:{flex:1,minWidth:300,display:'flex',flexDirection:'column',minHeight:0}},centerToolbar,r('div',{style:{overflowY:'auto',flex:1,paddingRight:4}},djs.length?djs.map(circuitCard):empty('Aucun circuit. Cliquez « Auto-affecter » ou « + Circuit vide ».'))),
        r('div',{style:{width:264,flexShrink:0,display:'flex',flexDirection:'column',minHeight:0,overflowY:'auto'}},...rightChildren)));
  }
  _planRoom(p){
    const surf=Math.max(1,+p.surface||9);
    const w=(p.plan&&+p.plan.w>0)?+p.plan.w:Math.max(2,Math.round(Math.sqrt(surf*1.3)*10)/10);
    const h=(p.plan&&+p.plan.h>0)?+p.plan.h:Math.max(2,Math.round(surf/w*10)/10);
    return{w,h};
  }
  _planMarkers(p){
    const out=[];(p.fonctions||[]).forEach(fn=>{if(!fn.ref)return;const q=Math.min(30,Math.max(1,+fn.quantite||1));for(let i=0;i<q;i++)out.push({key:fn.ref+'#'+i,ref:fn.ref,type:fn.type,idx:i,label:(this.FN_CODES[fn.type]||'?')+(q>1?(i+1):'')});});return out;
  }
  _planPositions(p,room,markers){
    const pos=(p.plan&&p.plan.pos)||{};const out={};const missing=[];
    markers.forEach(m=>{const e=pos[m.key];if(e&&Number.isFinite(+e.x)&&Number.isFinite(+e.y))out[m.key]={x:+e.x,y:+e.y};else missing.push(m);});
    const inset=0.25;const per=2*(room.w+room.h)||1;
    missing.forEach((m,i)=>{const t=((i+0.5)/Math.max(1,missing.length))*per;let x,y;
      if(t<room.w){x=t;y=inset;}else if(t<room.w+room.h){x=room.w-inset;y=t-room.w;}
      else if(t<2*room.w+room.h){x=room.w-(t-room.w-room.h);y=room.h-inset;}else{x=inset;y=room.h-(t-2*room.w-room.h);}
      out[m.key]={x:Math.min(room.w-inset,Math.max(inset,x)),y:Math.min(room.h-inset,Math.max(inset,y))};});
    return out;
  }
  estimateCircuitLength(d){
    // Longueur estimee depuis le plan d'implantation : cheminement le long des murs + remontees
    const pcs=this.state.pieces||[];const refs=d.recepteurs||[];
    const hCeil=(this.state.project&&+this.state.project.hauteurSousPlafond>0)?+this.state.project.hauteurSousPlafond:2.5;
    let total=0,counted=0;
    refs.forEach(ref=>{
      const p=pcs.find(pp=>(pp.fonctions||[]).some(fn=>fn.ref===ref));if(!p)return;
      const room=this._planRoom(p);const markers=this._planMarkers(p).filter(mk=>mk.ref===ref);
      const pos=this._planPositions(p,room,markers);
      const e=(p.plan&&p.plan.entry&&Number.isFinite(+p.plan.entry.x))?{x:+p.plan.entry.x,y:+p.plan.entry.y}:{x:0,y:0};
      markers.forEach(mk=>{const q=pos[mk.key];if(!q)return;total+=Math.abs(q.x-e.x)+Math.abs(q.y-e.y)+hCeil;counted++;});
    });
    if(counted===0)return null;
    return Math.ceil(total+3);// +3 m de remontee vers le tableau / reserve
  }
  estimateLengthsFromPlan(){
    const djs=this.state.disjoncteurs||[];const upd={};let n=0;
    djs.forEach(d=>{const L=this.estimateCircuitLength(d);if(L&&L>0){upd[d.id]=L;n++;}});
    if(n===0){this.showToast('Aucun point positionne — placez les fonctions sur le plan d\'implantation');return;}
    this.setState(st=>({disjoncteurs:st.disjoncteurs.map(d=>upd[d.id]?{...d,longueur:upd[d.id]}:d)}));
    this.showToast(n+' longueur(s) estimee(s) depuis le plan');
  }
  vPlanImplantation(){
    const s=this.state;const c=this.C;const r=this.r;
    const pieces=s.pieces||[];
    if(pieces.length===0)return r('div',{style:{padding:'24px 28px'}},this.SH("Plan d'implantation",'Positionnez prises et points lumineux par pièce'),r('div',{style:{fontSize:13,color:c.muted,fontStyle:'italic',marginTop:20}},'Aucune pièce définie. Créez d\'abord des pièces et leurs fonctions dans « Appartements & Pièces ».'));
    const pid=s.planPieceId!=null&&pieces.some(p=>p.id===s.planPieceId)?s.planPieceId:pieces[0].id;
    const piece=pieces.find(p=>p.id===pid);
    const room=this._planRoom(piece);
    const markers=this._planMarkers(piece);
    const pos=this._planPositions(piece,room,markers);
    const SCALE=Math.min(560/Math.max(room.w,0.5),520/Math.max(room.h,0.5));const W=room.w*SCALE,H=room.h*SCALE;
    const setRoom=(patch)=>this.setState(st=>({pieces:st.pieces.map(pp=>pp.id===pid?{...pp,plan:{...(pp.plan||{}),...patch}}:pp)}));
    const upPos=(key,x,y)=>this.setState(st=>({pieces:st.pieces.map(pp=>pp.id===pid?{...pp,plan:{w:room.w,h:room.h,...(pp.plan||{}),pos:{...((pp.plan||{}).pos||{}),[key]:{x,y}}}}:pp)}));
    const entry=(piece.plan&&piece.plan.entry&&Number.isFinite(+piece.plan.entry.x))?{x:+piece.plan.entry.x,y:+piece.plan.entry.y}:{x:Math.min(0.3,room.w),y:Math.min(0.3,room.h)};
    const upEntry=(x,y)=>this.setState(st=>({pieces:st.pieces.map(pp=>pp.id===pid?{...pp,plan:{w:room.w,h:room.h,...(pp.plan||{}),entry:{x,y}}}:pp)}));
    const onMove=(e)=>{const d=s.planDrag;if(!d)return;const dx=(e.clientX-d.cx)/SCALE,dy=(e.clientY-d.cy)/SCALE;const nx=Math.min(room.w,Math.max(0,Math.round((d.ox+dx)*100)/100)),ny=Math.min(room.h,Math.max(0,Math.round((d.oy+dy)*100)/100));if(d.key==='__entry')upEntry(nx,ny);else upPos(d.key,nx,ny);};
    const grid=[];for(let gx=1;gx<room.w;gx++)grid.push(r('line',{key:'gx'+gx,x1:gx*SCALE,y1:0,x2:gx*SCALE,y2:H,stroke:c.bdr,strokeWidth:0.5}));for(let gy=1;gy<room.h;gy++)grid.push(r('line',{key:'gy'+gy,x1:0,y1:gy*SCALE,x2:W,y2:gy*SCALE,stroke:c.bdr,strokeWidth:0.5}));
    const rad=Math.max(7,0.16*SCALE);
    const hCeil=(s.project&&+s.project.hauteurSousPlafond>0)?+s.project.hauteurSousPlafond:2.5;
    const routeEls=[];let pieceLen=0;markers.forEach(m=>{const pp=pos[m.key];if(!pp)return;const ex=entry.x*SCALE,ey=entry.y*SCALE,mx=pp.x*SCALE,my=pp.y*SCALE;routeEls.push(r('path',{key:'rt'+m.key,d:'M'+ex+' '+ey+' H'+mx+' V'+my,fill:'none',stroke:c.accent,strokeWidth:1,strokeDasharray:'4 3',opacity:0.5,style:{pointerEvents:'none'}}));pieceLen+=Math.abs(pp.x-entry.x)+Math.abs(pp.y-entry.y)+hCeil;});
    pieceLen=Math.ceil(pieceLen);
    const markEls=[];markers.forEach(m=>{const pp=pos[m.key];if(!pp)return;const col=(this.FNS[m.type]||{}).color||'#94a3b8';const cx=pp.x*SCALE,cy=pp.y*SCALE;const seld=s.planSel===m.key;
      markEls.push(r('g',{key:m.key,onMouseDown:(e)=>{this.setState({planSel:m.key,planDrag:{key:m.key,cx:e.clientX,cy:e.clientY,ox:pp.x,oy:pp.y}});},style:{cursor:'move'}},
        r('circle',{cx,cy,r:rad,fill:col+'33',stroke:col,strokeWidth:seld?2.5:1.5}),
        m.type==='eclairage'?r('path',{d:'M'+(cx-rad*0.6)+' '+cy+' H'+(cx+rad*0.6)+' M'+cx+' '+(cy-rad*0.6)+' V'+(cy+rad*0.6),stroke:col,strokeWidth:1.4}):null,
        r('text',{x:cx,y:cy+rad+9,fontSize:8,textAnchor:'middle',fill:c.text2,style:{pointerEvents:'none'}},m.label)));});
    const eX=entry.x*SCALE,eY=entry.y*SCALE;
    const entryEl=r('g',{key:'__entry',onMouseDown:(e)=>{this.setState({planSel:null,planDrag:{key:'__entry',cx:e.clientX,cy:e.clientY,ox:entry.x,oy:entry.y}});},style:{cursor:'move'},title:'Arrivée de gaine — glisser pour déplacer'},
      r('rect',{x:eX-7,y:eY-7,width:14,height:14,rx:2,fill:c.purple+'33',stroke:c.purple,strokeWidth:2}),
      r('text',{x:eX,y:eY-10,fontSize:8,textAnchor:'middle',fill:c.purple,fontWeight:700,style:{pointerEvents:'none'}},'Arrivée'));
    const svg=r('svg',{width:W,height:H,viewBox:'0 0 '+W+' '+H,onMouseMove:onMove,onMouseUp:()=>this.setState({planDrag:null}),onMouseLeave:()=>this.setState({planDrag:null}),style:{background:c.surf,border:'2px solid '+c.bdr3,borderRadius:6,maxWidth:'100%'}},...grid,...routeEls,...markEls,entryEl);
    const sel=pieces.map(p=>r('option',{key:p.id,value:p.id},(p.nom||('Piece '+p.id))+' ('+(+p.surface||'?')+' m²)'));
    const ni=(lbl,val,onch)=>r('div',{style:{display:'flex',flexDirection:'column',gap:2}},r('label',{style:{fontSize:9,color:c.muted}},lbl),r('input',{type:'number',step:0.1,value:val,onChange:e=>onch(+e.target.value),style:{width:70,background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:5,padding:'4px 6px',color:c.text,fontSize:12,outline:'none'}}));
    const usedTypes=[...new Set(markers.map(m=>m.type))];
    const legend=r('div',{style:{display:'flex',gap:12,flexWrap:'wrap',marginTop:10}},...usedTypes.map(t=>r('div',{key:t,style:{display:'flex',alignItems:'center',gap:5,fontSize:10,color:c.text2}},r('span',{style:{width:12,height:12,borderRadius:6,background:((this.FNS[t]||{}).color||'#94a3b8')+'33',border:'1.5px solid '+((this.FNS[t]||{}).color||'#94a3b8'),display:'inline-block'}}),(this.FNS[t]||{label:t}).label)));
    const bar=r('div',{style:{display:'flex',gap:10,alignItems:'flex-end',flexWrap:'wrap',marginBottom:12}},
      r('div',{style:{display:'flex',flexDirection:'column',gap:2}},r('label',{style:{fontSize:9,color:c.muted}},'Pièce'),r('select',{value:pid,onChange:e=>this.setState({planPieceId:+e.target.value,planSel:null}),style:{background:c.surf3,border:'1px solid '+c.bdr2,borderRadius:5,padding:'5px 7px',color:c.text,fontSize:12}},...sel)),
      ni('Largeur (m)',room.w,v=>setRoom({w:(Number.isFinite(v)&&v>0)?v:room.w})),
      ni('Profondeur (m)',room.h,v=>setRoom({h:(Number.isFinite(v)&&v>0)?v:room.h})),
      r('div',{style:{flex:1}}),
      this.Btn('Réinitialiser positions',()=>setRoom({pos:{}}),'sec','sm'),
      this.Btn('Imprimer plans',()=>this.printPlanImplantation(),'sec','sm'));
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease',overflowY:'auto',height:'100%'}},
      this.SH("Plan d'implantation",(piece.nom||'Pièce')+' — '+markers.length+' point'+(markers.length>1?'s':'')+' · glissez pour positionner'),
      bar,
      r('div',{style:{fontSize:10,color:c.muted,marginBottom:4,fontFamily:c.mono}},room.w+' × '+room.h+' m · câblage estimé ~'+pieceLen+' m (depuis l\'arrivée)'),
      svg,legend);
  }
  printPlanImplantation(){
    try{
      const pcs=(this.state.pieces||[]).filter(p=>(p.fonctions||[]).some(fn=>fn.ref));
      if(pcs.length===0){this.showToast('Aucune pièce à tracer');return;}
      const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const sheets=pcs.map(p=>{const room=this._planRoom(p);const markers=this._planMarkers(p);const pos=this._planPositions(p,room,markers);
        const SC=Math.min(150/Math.max(room.w,0.5),200/Math.max(room.h,0.5));const W=room.w*SC,H=room.h*SC;const rad=Math.max(4,0.16*SC);
        let g='';for(let gx=1;gx<room.w;gx++)g+='<line x1="'+(gx*SC)+'" y1="0" x2="'+(gx*SC)+'" y2="'+H+'" stroke="#ddd" stroke-width="0.4"/>';for(let gy=1;gy<room.h;gy++)g+='<line x1="0" y1="'+(gy*SC)+'" x2="'+W+'" y2="'+(gy*SC)+'" stroke="#ddd" stroke-width="0.4"/>';
        let mk='';markers.forEach(m=>{const pp=pos[m.key];if(!pp)return;const col=(this.FNS[m.type]||{}).color||'#888';const cx=pp.x*SC,cy=pp.y*SC;mk+='<circle cx="'+cx+'" cy="'+cy+'" r="'+rad+'" fill="none" stroke="'+col+'" stroke-width="1.2"/>';if(m.type==='eclairage')mk+='<path d="M'+(cx-rad*0.6)+' '+cy+' H'+(cx+rad*0.6)+' M'+cx+' '+(cy-rad*0.6)+' V'+(cy+rad*0.6)+'" stroke="'+col+'" stroke-width="1"/>';mk+='<text x="'+cx+'" y="'+(cy+rad+7)+'" font-size="6" text-anchor="middle" fill="#333">'+esc(m.label)+'</text>';});
        return '<div style="display:inline-block;margin:6mm;vertical-align:top;page-break-inside:avoid"><div style="font:bold 10pt monospace;color:#0277BD;margin-bottom:2mm">'+esc(p.nom||'Piece')+' — '+room.w+'x'+room.h+' m</div><svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><rect x="0" y="0" width="'+W+'" height="'+H+'" fill="#fff" stroke="#111" stroke-width="1.5"/>'+g+mk+'</svg></div>';}).join('');
      const html='<div style="font-family:Arial,sans-serif;padding:6mm"><h2 style="margin:0 0 3mm">Plan d\'implantation — '+esc((this.state.project||{}).nom||'')+'</h2><div style="font-size:9pt;color:#555;margin-bottom:4mm">Positions des prises et points lumineux par pièce</div>'+sheets+'</div>';
      const cont=document.createElement('div');cont.id='cebat-plan';cont.setAttribute('data-print','main');cont.style.position='absolute';cont.style.left='-99999px';cont.style.top='0';cont.innerHTML=html;document.body.appendChild(cont);
      const main=document.querySelector('main');const prev=main?main.getAttribute('data-print'):null;if(main)main.setAttribute('data-print','hide');
      const cleanup=()=>{cont.remove();if(main){if(prev)main.setAttribute('data-print',prev);else main.removeAttribute('data-print');}window.removeEventListener('afterprint',cleanup);};
      window.addEventListener('afterprint',cleanup);window.print();
    }catch(e){this.showToast('Echec impression plans');}
  }
  vDevis(circuits){
    const c=this.C;const r=this.r;const costs=this.estCost(circuits);
    const{project,pieces,niveaux,appartements}=this.state;const today=new Date().toLocaleDateString('fr-FR');
    const nP=pieces.reduce((s,p)=>s+this.getNbP(p),0);const nL=pieces.reduce((s,p)=>s+this.getNbL(p),0);
    const c15len=Math.ceil(circuits.filter(ci=>ci.section===1.5).reduce((s,ci)=>s+ci.len,0)*1.15);
    const c25len=Math.ceil(circuits.filter(ci=>ci.section===2.5).reduce((s,ci)=>s+ci.len,0)*1.15);
    const c6len=Math.ceil(circuits.filter(ci=>ci.section===6).reduce((s,ci)=>s+ci.len,0)*1.2);
    const pwr=project.puissanceSouscrite;const cdg={3:15,6:30,9:40,12:60,15:60,18:80,24:100}[pwr]||60;
    const nDDR1=Math.max(1,Math.ceil(circuits.filter(ci=>ci.ddr===1).length/8));
    const nDDR2=Math.max(1,Math.ceil(circuits.filter(ci=>ci.ddr===2).length/8));
    const sections=[
      {cat:'Tableau & Protection',color:c.acBlue,items:[{d:'Coffret polyester 36 modules',q:1,pu:90,u:'u'},{d:'Disjoncteur général '+cdg+'A Type S',q:1,pu:58,u:'u'},{d:'ID 40A/30mA type AC (DDR1)',q:nDDR1,pu:42,u:'u'},{d:'ID 40A/30mA type A (DDR2)',q:nDDR2,pu:46,u:'u'},...(pwr>=9?[{d:'Parafoudre T2',q:1,pu:68,u:'u'}]:[]),{d:'Disjoncteurs B10A éclairage',q:circuits.filter(ci=>ci.type==='eclairage').length,pu:12,u:'u'},{d:'Disjoncteurs C16A prises',q:circuits.filter(ci=>ci.type==='prises').length,pu:14,u:'u'},{d:'Disjoncteurs spécialisés',q:circuits.filter(ci=>ci.type==='specialise').length,pu:19,u:'u'}]},
      {cat:'Câblage & Conduits',color:'#f59e0b',items:[{d:'H07VU 3G1.5mm² éclairage',q:c15len,pu:0.95,u:'m'},{d:'H07VU 3G2.5mm² prises',q:c25len,pu:1.45,u:'m'},...(c6len>0?[{d:'H07RNF 3G6mm² haute puissance',q:c6len,pu:3.50,u:'m'}]:[]),{d:'Gaine ICTA Ø20mm',q:Math.round(circuits.reduce((s,ci)=>s+ci.len,0)*0.8),pu:0.45,u:'m'}]},
      {cat:'Appareillage',color:c.success,items:[{d:'Prises 2P+T 16A',q:nP,pu:6.5,u:'u'},{d:'Interrupteurs simples / va-et-vient',q:nL,pu:8.0,u:'u'},{d:'Boîtes encastrement Ø67mm',q:nP+nL,pu:1.5,u:'u'},{d:'DCL douilles E27/E14',q:nL,pu:2.80,u:'u'}]},
    ];
    return r('div',{style:{padding:'24px 28px',animation:'fadeIn .3s ease'}},
      this.SH('Devis estimatif','Estimation indicative — '+today,r('div',{style:{display:'flex',gap:8}},this.Btn('⤓ Export CSV',()=>this.exportCSV(),'sec','md'),this.Btn(r('span',{style:{display:'inline-flex',alignItems:'center',gap:5}},this.ico('print_ico',13),'Dossier complet'),()=>this.printDossier(),'primary','md'),this.Btn(r('span',{style:{display:'inline-flex',alignItems:'center',gap:5}},this.ico('print_ico',13),'Fiche autocontrôle'),()=>this.printAutocontrole(),'sec','md'),this.Btn('⤓ Autoctrl JSON',()=>this.exportAutocontroleJSON(),'sec','sm'),this.Btn('⤓ Autoctrl CSV',()=>this.exportAutocontroleCSV(),'sec','sm'),this.Btn(r('span',{style:{display:'inline-flex',alignItems:'center',gap:5}},this.ico('print_ico',13),'Imprimer / PDF'),()=>window.print(),'ghost','md'))),
      r('div',{className:'cbt-card',style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:12,padding:'12px 16px',marginBottom:14,display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:4,fontSize:11,boxShadow:c.elev1}},
        r('span',{style:{color:c.muted}},'Projet :'),r('span',{style:{color:c.text,fontWeight:500}},project.nom),
        r('span',{style:{color:c.muted}},'Niveaux / Apparts. / Pièces :'),r('span',{style:{color:c.text}},niveaux.length+' / '+appartements.length+' / '+pieces.length),
        r('span',{style:{color:c.muted}},'Client :'),r('span',{style:{color:c.text}},project.client),
        r('span',{style:{color:c.muted}},'Date :'),r('span',{style:{color:c.text}},today)),
      r('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:14}},
        this.Stat(costs.materiaux.toLocaleString('fr-FR')+'€','Matériaux HT',c.acBlue),this.Stat(costs.mainOeuvre.toLocaleString('fr-FR')+'€','MO HT ('+costs.moH+'h)',c.warn),this.Stat(costs.ht.toLocaleString('fr-FR')+'€','Total HT',c.text2),this.Stat(costs.ttc.toLocaleString('fr-FR')+'€','TOTAL TTC',c.success,'TVA 10%')),
      ...sections.map(sec=>r('div',{key:sec.cat,style:{marginBottom:12}},
        r('div',{style:{display:'flex',alignItems:'center',gap:7,marginBottom:5}},r('div',{style:{width:3,height:14,background:sec.color,borderRadius:1}}),r('span',{style:{fontSize:12,fontWeight:700,color:c.text2}},sec.cat)),
        r('div',{className:'cbt-card',style:{background:c.surf2,border:`1px solid ${c.bdr}`,borderRadius:10,overflow:'hidden',boxShadow:c.elev1}},
          r('table',{style:{width:'100%',borderCollapse:'collapse',fontSize:11}},
            r('thead',null,r('tr',{style:{background:c.surf3}},...['Désignation','Qté','U','P.U. HT','Total HT'].map(h=>r('th',{key:h,style:{padding:'6px 11px',textAlign:'left',fontSize:9,fontWeight:700,color:c.muted,textTransform:'uppercase',letterSpacing:'.05em'}},h)))),
            r('tbody',null,...sec.items.filter(it=>it.q>0).map((item,i)=>{const tot=item.q*item.pu;return r('tr',{key:i,style:{borderBottom:`1px solid ${c.bdr}`}},r('td',{style:{padding:'6px 11px',color:c.text}},item.d),r('td',{style:{padding:'6px 11px',color:c.text2,fontFamily:c.mono}},item.q),r('td',{style:{padding:'6px 11px',color:c.muted}},item.u),r('td',{style:{padding:'6px 11px',color:c.text2,fontFamily:c.mono}},item.pu.toFixed(2)+'€'),r('td',{style:{padding:'6px 11px',color:c.warn,fontFamily:c.mono,fontWeight:600}},tot.toFixed(2)+'€'));}),
            r('tr',{style:{background:c.surf3}},r('td',{colSpan:4,style:{padding:'6px 11px',fontSize:10,fontWeight:600,color:c.muted}},'Sous-total'),r('td',{style:{padding:'6px 11px',fontFamily:c.mono,fontWeight:700,color:sec.color}},sec.items.reduce((s,it)=>s+it.q*it.pu,0).toFixed(2)+'€'))))))),
      r('div',{className:'cbt-card',style:{background:'rgba(37,99,235,.06)',border:`1px solid rgba(37,99,235,.2)`,borderRadius:12,padding:'16px 20px',boxShadow:c.elev2}},
        r('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
          r('div',null,r('div',{style:{fontSize:11,color:c.muted,marginBottom:3}},'Estimation indicative'),r('div',{style:{display:'flex',gap:16,fontSize:11}},r('span',{style:{color:c.muted}},'HT : '+costs.ht.toLocaleString('fr-FR')+'€'),r('span',{style:{color:c.muted}},'TVA 10% : '+costs.tva.toLocaleString('fr-FR')+'€'))),
          r('div',{style:{textAlign:'right'}},r('div',{style:{fontSize:9,color:c.muted,marginBottom:2,textTransform:'uppercase',letterSpacing:'.07em'}},'TOTAL TTC'),r('div',{style:{fontSize:28,fontWeight:800,color:c.success,fontFamily:c.mono}},costs.ttc.toLocaleString('fr-FR')+' €'))))
    );
  }

  // ═══ RENDER VALS ═══
  renderVals(){
    const{view,showModal,toast,theme}=this.state;
    this.C=this.getC(theme);const circuits=this.calcCircuits();const c=this.C;const r=this.r;
    const views={
      dashboard:()=>this.vDashboard(circuits),projet:()=>this.vProjet(),
      logements:()=>this.vLogements(circuits),
      feuille:()=>this.vFeuillePuissance(),
      circuits:()=>this.vCircuits(circuits),
      schema:()=>this.vSchema(circuits),
      armoire:()=>this.vArmoire(),
      implantation:()=>this.vPlanImplantation(),
      rangees:()=>this.vRangees(circuits),
      realisation:()=>this.vRealisation(circuits),cablage:()=>this.vCablage(circuits),
      domotique:()=>this.vDomotique(),devis:()=>this.vDevis(circuits),
    };
    const app=r('div',{style:{display:'flex',flexDirection:'column',height:'100vh',overflow:'hidden','--elev1':c.elev1,'--elev2':c.elev2,'--elev3':c.elev3}},
      this.renderTopBar(),
      r('div',{style:{display:'flex',flex:1,overflow:'hidden'}},
        this.renderSidebar(circuits),
        r('main',{'data-print':'main',style:{flex:1,overflowY:'auto',background:c.bg}},(views[view]||views.dashboard)())),
      showModal&&this.renderModal(),
      toast&&r('div',{style:{position:'fixed',bottom:22,right:22,background:c.surf2,border:`1px solid ${c.bdr2}`,borderRadius:9,padding:'10px 16px',display:'flex',alignItems:'center',gap:8,boxShadow:`0 8px 32px ${c.shadow}`,zIndex:300,animation:'appear .2s ease'}},
        r('div',{style:{width:6,height:6,borderRadius:'50%',background:c.success}}),
        r('span',{style:{fontSize:12,color:c.text}},toast)));
    return{app};
  }
}

