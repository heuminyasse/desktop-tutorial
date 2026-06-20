;(function(){
  'use strict';
  if (window.EPRBAC) return;
  var LS = window.localStorage, KEY='epilot_rbac';
  var LV=['none','read','edit','admin'];
  var LVL={none:'Aucun',read:'Lecture',edit:'Modifier',admin:'Gérer'};
  var LVC={none:'#94a3b8',read:'#2563eb',edit:'#d97706',admin:'#16a34a'};
  var LVBG={none:'#f1f5f9',read:'#dbeafe',edit:'#fef3c7',admin:'#dcfce7'};
  var RANK={none:0,read:1,edit:2,admin:3};
  var PAGES=[
    {k:'accueil',label:'Accueil (alertes & actions)',grp:'Général'},
    {k:'salary',label:'Paie / Bulletins',grp:'Personnel'},
    {k:'vacation',label:'Congés',grp:'Personnel'},
    {k:'badge',label:'Créateur de badges',grp:'Personnel'},
    {k:'hr',label:'RH — employés',grp:'Personnel'},
    {k:'certifs',label:'Mes certifications',grp:'HSE / Compétences'},
    {k:'competences',label:'Mes compétences',grp:'HSE / Compétences'},
    {k:'procedures',label:'Mes procédures',grp:'HSE / Compétences'},
    {k:'chantiers',label:'Chantiers',grp:'Projets'},
    {k:'rfq',label:'RFQ',grp:'Projets'},
    {k:'achats',label:'Achats',grp:'Projets'},
    {k:'orders',label:'Commandes',grp:'Projets'},
    {k:'marketing',label:'Marketing',grp:'Projets'},
    {k:'fcr',label:'FCR',grp:'Projets'},
    {k:'clients',label:'Clients',grp:'Archives'},
    {k:'articles',label:'Articles',grp:'Archives'},
    {k:'fournisseurs',label:'Fournisseurs',grp:'Archives'},
    {k:'estore',label:'Boutique',grp:'Archives'},
    {k:'papiers',label:'Papiers',grp:'Archives'},
    {k:'kpi',label:'Tableau de bord (KPI)',grp:'Pilotage'},
    {k:'evaluation',label:'Évaluation',grp:'Pilotage'},
    {k:'parametres',label:'Paramètres',grp:'Système'}
  ];
  var VIEW_NAV={
    accueil:{page:'accueil'},
    salary:{page:'people',sub:'Salary'},vacation:{page:'people',sub:'Vacation'},badge:{page:'people',sub:'Badge Maker'},hr:{page:'people',sub:'HR'},
    certifs:{page:'hse',sub:'Mes Certifications'},competences:{page:'hse',sub:'Mes Compétences'},procedures:{page:'hse',sub:'Mes Procedures'},
    chantiers:{page:'projects',sub:'Chantiers'},rfq:{page:'projects',sub:'RFQ'},achats:{page:'projects',sub:'Achats'},orders:{page:'projects',sub:'Orders'},marketing:{page:'projects',sub:'Marketing'},fcr:{page:'projects',sub:'FCR'},
    clients:{page:'store',sub:'Clients'},articles:{page:'store',sub:'Articles'},fournisseurs:{page:'store',sub:'Fournisseurs'},estore:{page:'store',sub:'Store'},papiers:{page:'store',sub:'Papiers'},
    kpi:{page:'kpi',sub:'Dashboard'},evaluation:{page:'kpi',sub:'Evaluation'},
    parametres:{page:'parametres'}
  };
  var PAGE_VIEWS={}; Object.keys(VIEW_NAV).forEach(function(v){var p=VIEW_NAV[v].page;(PAGE_VIEWS[p]=PAGE_VIEWS[p]||[]).push(v);});

  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function load(){try{var o=JSON.parse(LS.getItem(KEY));if(o&&o.groups)return o;}catch(e){}return null;}
  function save(){try{LS.setItem(KEY,JSON.stringify(DB));}catch(e){}}
  function full(l){var p={};PAGES.forEach(function(pg){p[pg.k]=l;});return p;}
  function mk(level,edits){var p=full(level);if(edits)for(var k in edits)p[k]=edits[k];return p;}
  function employeDef(){ return {name:'Employé',perms:mk('none',{accueil:'read',salary:'read',vacation:'read',hr:'read',certifs:'read',competences:'read',procedures:'read',chantiers:'edit',rfq:'edit',achats:'read',orders:'edit',marketing:'edit',fcr:'edit',clients:'read',articles:'read',fournisseurs:'read',estore:'read',papiers:'read',evaluation:'read'}),scope:{salary:'self',hr:'self'}}; }
  function defaults(){
    return {
      enabled:false,
      groups:{
        admin:{name:'Administrateur',perms:full('admin')},
        direction:{name:'Direction',perms:full('read')},
        chef:{name:'Chef de projet',perms:mk('none',{accueil:'edit',chantiers:'edit',rfq:'edit',quote:'edit',oa:'edit',orders:'edit',jip:'edit',clients:'read',articles:'read',fournisseurs:'read'})},
        commercial:{name:'Commercial',perms:mk('none',{accueil:'edit',clients:'edit',rfq:'edit',quote:'edit',articles:'read',fournisseurs:'read',oa:'read',orders:'read'})},
        rh:{name:'RH / Paie',perms:mk('none',{accueil:'edit',hr:'edit',salary:'edit',vacation:'edit',badge:'edit',certifs:'edit',competences:'edit',papiers:'edit'})},
        employe:employeDef()
      },
      accounts:{}
    };
  }
  var DB=load(); if(!DB){ DB=defaults(); save(); }
  Object.keys(DB.groups).forEach(function(id){ if(!DB.groups[id].scope) DB.groups[id].scope={}; });
  if(!DB.v||DB.v<3){ DB.groups.employe=employeDef(); DB.v=3; save(); }
  if(!DB.v||DB.v<9){
    DB.groups.employe=employeDef();
    DB.enabled=true;
    DB.accounts=DB.accounts||{};
    DB.accounts['bnyasse']={matricule:'bnyasse',name:'B. Nyasse',groupId:'admin',pwHash:'15f6883372a2f6fa2cdbd067e04221215c470de372c773354470adee1a452547',salt:'hboADM',active:true};
    if(DB.accounts['invite']) delete DB.accounts['invite'];
    DB.accounts['afofou']={matricule:'afofou',name:'Andy Ryan FOFOU KENGNE',groupId:'employe',pwHash:'970656ede632446b1c4cd093b9e0eff5ba10d372df112e1fbffb1639a7dcb907',salt:'hboAFO',active:true};
    DB.v=9; save();
  }
  /* safeguard: the admin account must always remain unrestricted */
  try{ if(DB.accounts&&DB.accounts.bnyasse){ if(DB.accounts.bnyasse.groupId!=='admin'||DB.accounts.bnyasse.active===false){ DB.accounts.bnyasse.groupId='admin'; DB.accounts.bnyasse.active=true; save(); } } }catch(e){}
  var EMP_SUBTABS={
    'view-salary':{all:['✦ Prime','📅 Pointage','📄 Bulletins','🗂 Paie','💳 Crédits','📋 Contrats'],keep:['📅 Pointage','📄 Bulletins','💳 Crédits','📋 Contrats']},
    'view-achats':{all:['🗂️ Articles (gestion)','🛠️ Services Non livrés','📦 Non livrés','📦 Articles non livrés'],keep:['📦 Non livrés','📦 Articles non livrés']},
    'view-orders':{all:['💰 Dépenses','🏦 Dettes','📋 Commandes'],keep:['💰 Dépenses']},
    'view-parametres':{mode:'siblings',keep:['🎨 Apparence','Apparence']}
  };
  var SCOPABLE={hr:'personnel',salary:'personnel',vacation:'personnel',chantiers:'engineer',jip:'engineer',rfq:'engineer',quote:'engineer',oa:'engineer',orders:'engineer'};

  function H(s){ return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(buf){return Array.prototype.map.call(new Uint8Array(buf),function(b){return('0'+b.toString(16)).slice(-2);}).join('');}); }

  /* ---------------- session & enforcement ---------------- */
  var session=null; // {matricule,name,groupId,perms,isAdmin}
  function isAnon(){ return !!DB.enabled && !session; }
  function levelFor(view){ if(session){ if(session.isAdmin) return 'admin'; return (session.perms||{})[view]||'none'; } if(DB.enabled){ return view==='accueil'?'read':'none'; } return 'admin'; }
  function allowed(view){ return RANK[levelFor(view)]>0; }
  function firstAllowed(){ if(allowed('accueil'))return 'accueil'; for(var i=0;i<PAGES.length;i++){if(allowed(PAGES[i].k))return PAGES[i].k;} return 'accueil'; }

  /* ---------------- Mon Espace (personal dashboard) ---------------- */
  function myEmployee(){ var mk2=nrm2(session.matricule); return (window.PERSONNEL_DATA||[]).filter(function(e){return nrm2(e.matricule)===mk2;})[0]||null; }
  function nrm2(s){ return String(s==null?'':s).toLowerCase().replace(/\s+/g,''); }
  function myChantiers(){ var keys=ownerKeys(); return (window.QUOTE_DATA||[]).filter(function(q){ return isOwn(q.IngenieurAff||'','engineer',keys); }); }
  function myAlertes(){ var docs=[]; try{docs=JSON.parse(localStorage.getItem('epilot_papiers'))||[];}catch(e){} var t=new Date();t.setHours(0,0,0,0); return docs.filter(function(d){ if(!d.expire)return false; var dd=new Date(d.expire+'T00:00:00'); if(isNaN(dd))return false; var n=Math.round((dd-t)/86400000); var a=(d.alerte!=null&&d.alerte!=='')?+d.alerte:30; return n<=a; }); }
  function ensureMonEspace(){ if(document.getElementById('view-monespace'))return; var ref=document.getElementById('view-accueil'); if(!ref||!ref.parentNode)return; var sec=document.createElement('section'); sec.id='view-monespace'; sec.className='hub-view'; ref.parentNode.appendChild(sec); }
  function showMonEspace(){ ensureMonEspace(); document.querySelectorAll('.hub-view').forEach(function(v){v.classList.toggle('active',v.id==='view-monespace');}); renderMonEspace(); }
  function meCard(title,inner){ return '<div style="background:var(--card,#fff);border:1px solid var(--line,#e5e7eb);border-radius:14px;overflow:hidden"><div style="padding:12px 16px;border-bottom:1px solid var(--line,#eef1f5);font-weight:800;font-size:13.5px;color:var(--text,#0f172a)">'+title+'</div><div style="padding:14px 16px">'+inner+'</div></div>'; }
  function renderMonEspace(){ var el=document.getElementById('view-monespace'); if(!el)return; var e=myEmployee();
    var name=session.name||session.matricule; var initials=name.split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase();
    var fonction=e&&e.fonction?e.fonction:''; var statut=e?e.statut||'':''; var anc=e&&e.moisAnciennete!=null?String(e.moisAnciennete):'';
    var ancNum=/^\d+$/.test(anc.trim()); var ancLabel=anc.trim()===''?'—':(ancNum?anc+' mois':anc);
    var tels=''; if(e&&e.telephones){ var _ta=Array.isArray(e.telephones)?e.telephones:[e.telephones]; tels=_ta.map(function(x){ if(x==null)return ''; if(typeof x==='string'||typeof x==='number')return String(x); return x.tel||x.numero||x.num||x.number||x.value||x.phone||''; }).filter(Boolean).join(', '); }
    var info='<table style="width:100%;border-collapse:collapse;font-size:13px">'+
      [['Matricule',session.matricule],['Fonction',fonction||'—'],['Statut',statut||'—'],['Ancienneté',ancLabel],['Téléphone',tels||'—'],['CNPS',(e&&e.cnps)||'—'],['NIU',(e&&e.niu)||'—'],['Banque',(e&&e.banque)||'—'],['Compte',(e&&e.compteBancaire)||'—']]
      .map(function(r){return '<tr><td style="padding:6px 8px;color:var(--muted,#64748b);white-space:nowrap">'+r[0]+'</td><td style="padding:6px 8px;font-weight:600;text-align:right">'+esc(r[1])+'</td></tr>';}).join('')+'</table>';
    function qa(label,view,emoji){ if(view!=='papiers'&&!allowed(view))return ''; return '<button class="rbac-qa" data-v="'+view+'" style="display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:1px solid var(--line,#e5e7eb);background:var(--card-2,#f8fafc);border-radius:10px;padding:11px 14px;cursor:pointer;font:inherit;font-size:13.5px;font-weight:600;margin-bottom:8px"><span style="font-size:18px">'+emoji+'</span>'+label+'<span style="margin-left:auto;color:#94a3b8">›</span></button>'; }
    var alertes=myAlertes(); var qlinks=qa('Mon pointage','salary','🕒')+qa('Mes congés','vacation','🌴')+qa('Ma fiche RH','hr','👤')+qa('Mes documents'+(alertes.length?' · '+alertes.length+' à renouveler':''),'papiers','📄'); if(!qlinks)qlinks='<div style="color:var(--muted,#94a3b8);font-size:12.5px">Aucun accès rapide</div>';
    var ch=myChantiers(); var chRows=ch.slice(0,40).map(function(q){ var mt=parseFloat(q.MontantHT)||0; return '<tr style="border-bottom:1px solid var(--line,#f1f5f9);cursor:pointer" data-pi="'+esc(q.Dossier||'')+'"><td style="padding:7px 8px;font-family:monospace;font-size:12px;color:#2563eb;font-weight:700">'+esc(q.Dossier||'—')+'</td><td style="padding:7px 8px;font-size:12.5px">'+esc(q.Client||'—')+'</td><td style="padding:7px 8px;font-size:12px;color:var(--muted,#64748b)">'+esc(q.Unite||'')+'</td><td style="padding:7px 8px;font-size:11.5px"><span style="background:#eef4ff;color:#1e40af;padding:2px 9px;border-radius:999px">'+esc(q.EtatPI||'—')+'</span></td><td style="padding:7px 8px;text-align:right;font-family:monospace;font-size:11.5px;color:var(--orange,#d97706);font-weight:700">'+(mt?mt.toLocaleString('fr-FR')+' XAF':'—')+'</td></tr>'; }).join('')||'<tr><td colspan="5" style="padding:18px;text-align:center;color:var(--muted,#94a3b8);font-size:12.5px">Aucune affaire/chantier qui vous est affecté(e).</td></tr>';
    var won=ch.filter(function(q){return q.OA&&q.OA!=='Lost'&&q.OA!=='No'&&q.OA!=='';}).length; var ca=ch.reduce(function(s,q){return s+(parseFloat(q.MontantHT)||0);},0);
    el.innerHTML='<div style="padding:22px;max-width:1120px;margin:0 auto;font-family:var(--font,Arial),sans-serif">'+
      '<div style="display:flex;gap:18px;align-items:center;background:linear-gradient(135deg,#0c2a52,#1b4b8a);color:#fff;border-radius:16px;padding:20px 24px;margin-bottom:18px">'+
        '<div style="width:62px;height:62px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;flex:none">'+esc(initials||'?')+'</div>'+
        '<div><div style="font-size:21px;font-weight:800">'+esc(name)+'</div><div style="font-size:13px;opacity:.85;margin-top:3px">'+esc([fonction,statut,ancNum?anc+' mois d’ancienneté':''].filter(Boolean).join(' · ')||'Mon espace personnel')+'</div></div>'+
        '<div style="margin-left:auto;display:flex;gap:22px;text-align:center">'+
          '<div><div style="font-size:22px;font-weight:800">'+ch.length+'</div><div style="font-size:10.5px;opacity:.8;text-transform:uppercase;letter-spacing:.05em">Affaires</div></div>'+
          '<div><div style="font-size:22px;font-weight:800">'+won+'</div><div style="font-size:10.5px;opacity:.8;text-transform:uppercase;letter-spacing:.05em">Gagnées</div></div>'+
          '<div><div style="font-size:22px;font-weight:800">'+(alertes.length)+'</div><div style="font-size:10.5px;opacity:.8;text-transform:uppercase;letter-spacing:.05em">Alertes</div></div>'+
        '</div>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:16px;margin-bottom:16px">'+meCard('👤 Ma fiche',info)+meCard('⚡ Accès rapides',qlinks)+'</div>'+
      meCard('🏗️ Mes chantiers / affaires ('+ch.length+')','<div style="overflow:auto;max-height:48vh"><table style="width:100%;border-collapse:collapse"><thead><tr style="background:var(--card-2,#f8fafc)"><th style="padding:7px 8px;text-align:left;font-size:10px;color:#64748b">N° Dossier</th><th style="padding:7px 8px;text-align:left;font-size:10px;color:#64748b">Client</th><th style="padding:7px 8px;text-align:left;font-size:10px;color:#64748b">Unité</th><th style="padding:7px 8px;text-align:left;font-size:10px;color:#64748b">État</th><th style="padding:7px 8px;text-align:right;font-size:10px;color:#64748b">Montant HT</th></tr></thead><tbody>'+chRows+'</tbody></table></div>')+
    '</div>';
    el.querySelectorAll('.rbac-qa').forEach(function(b){ b.onclick=function(){ try{window.HubViews.showView(b.getAttribute('data-v'));}catch(e){} }; });
    el.querySelectorAll('tr[data-pi]').forEach(function(tr){ tr.onclick=function(){ var pi=tr.getAttribute('data-pi'); if(pi&&window.openQuote){ try{window.openQuote(pi);}catch(e){} } }; });
  }
  function scopeOf(view){ if(!session||session.isAdmin)return 'all'; var g=DB.groups[session.groupId]||{}; return (g.scope||{})[view]||'all'; }
  function nrm(s){ return String(s==null?'':s).toLowerCase().replace(/\s+/g,' ').trim(); }
  function ownerKeys(){ var mat=nrm(session.matricule).replace(/\s/g,''); var toks=nrm(session.name).split(' ').filter(function(t){return t.length>=3;}); return {mat:mat,toks:toks}; }
  function isOwn(text, kind, keys){ var t=nrm(text);
    if(kind==='personnel' && keys.mat && keys.mat.length>=4 && t.replace(/\s/g,'').indexOf(keys.mat)>=0) return true;
    if(!keys.toks.length) return false;
    var hits=0; keys.toks.forEach(function(tk){ if(t.indexOf(tk)>=0) hits++; });
    return hits>=2 || (keys.toks.length===1 && hits===1);
  }
  function scopeBadge(view, n){ var el=document.getElementById('view-'+view); if(!el)return; var b=el.querySelector('.rbac-scopebadge');
    if(!b){ b=document.createElement('div'); b.className='rbac-scopebadge no-print'; b.style.cssText='position:sticky;top:0;z-index:50;margin:0 0 8px;padding:7px 14px;background:#eef4ff;border:1px solid #c7dbff;border-radius:8px;color:#1e40af;font:12.5px Arial;display:flex;gap:8px;align-items:center'; var head=el.querySelector('.view-head')||el.firstElementChild; if(head&&head.parentNode){ head.parentNode.insertBefore(b, head.nextSibling); } else { el.insertBefore(b, el.firstChild); } }
    var html='🔒 Vous voyez uniquement <b style="margin:0 3px">vos données</b>'+(n!=null?(' · '+n+' élément'+(n>1?'s':'')):''); if(b.getAttribute('data-rbac-n')!==String(n)){ b.setAttribute('data-rbac-n',String(n)); b.innerHTML=html; } }
  /* Contrats tab uses a master-detail sidebar (not a table): hide other employees' items and auto-select mine */
  function scopeContrats(){ if(!session||session.isAdmin) return; if(scopeOf('salary')!=='self') return;
    var v=document.getElementById('view-salary'); if(!v||!v.classList.contains('active')) return;
    var hdr=null, divs=v.querySelectorAll('div');
    for(var i=0;i<divs.length;i++){ if(divs[i].children.length===0 && nrm(divs[i].textContent)==='employés'){ hdr=divs[i]; break; } }
    if(!hdr||!hdr.parentElement) return;
    var side=hdr.parentElement, keys=ownerKeys(), ownItem=null;
    [].slice.call(side.children).forEach(function(it){ if(it===hdr) return; var own=isOwn(it.textContent,'personnel',keys); it.style.display=own?'':'none'; if(own&&!ownItem)ownItem=it; });
    if(ownItem){ var selItem=null; [].slice.call(side.children).forEach(function(it){ if(it===hdr)return; try{ if(getComputedStyle(it).backgroundColor==='rgb(253, 232, 232)') selItem=it; }catch(e){} }); var now=Date.now(); if(selItem!==ownItem && (!scopeContrats._t || now-scopeContrats._t>700)){ scopeContrats._t=now; try{ownItem.click();}catch(e){} } }
  }
  /* Crédits tab renders employee credit cards in a CSS grid: hide cards that are not mine */
  function scopeCredits(){ if(!session||session.isAdmin) return; if(scopeOf('salary')!=='self') return;
    var v=document.getElementById('view-salary'); if(!v||!v.classList.contains('active')) return;
    var keys=ownerKeys(), grids=[].slice.call(v.querySelectorAll('div')).filter(function(d){ if(d.children.length<1) return false; var t=d.textContent; if(!/Montant total|Versement|Remboursement|Solde restant|Mois restants/i.test(t)) return false; try{ return getComputedStyle(d).display==='grid'; }catch(e){ return false; } });
    grids.forEach(function(g){ [].slice.call(g.children).forEach(function(card){ if(card.nodeType!==1) return; var own=isOwn(card.textContent,'personnel',keys); card.style.display=own?'':'none'; }); });
    /* hide the company-wide "Encours total : …" aggregate — an employee must not see others' totals */
    [].slice.call(v.querySelectorAll('div')).forEach(function(d){ if(d.children.length<=1 && /^encours total/i.test(nrm(d.textContent))){ d.style.display='none'; } });
  }
  function scopeFilter(){ if(!session||session.isAdmin) return; try{scopeContrats();}catch(e){} try{scopeCredits();}catch(e){} var active=document.querySelector('.hub-view.active'); if(!active) return; var view=active.id.replace('view-',''); var kind=SCOPABLE[view];
    var prevB=active.querySelector('.rbac-scopebadge');
    if(!kind || scopeOf(view)!=='self'){ active.querySelectorAll('tr[data-rbac-hidden]').forEach(function(tr){tr.style.display='';tr.removeAttribute('data-rbac-hidden');}); if(prevB)prevB.remove(); return; }
    var keys=ownerKeys(); var rows=active.querySelectorAll('table tbody tr, table tr.clickable, .cl-row');
    var shown=0; rows.forEach(function(tr){ if(tr.querySelector('th')) return; var own=isOwn(tr.textContent,kind,keys); if(own){ tr.style.display=''; tr.removeAttribute('data-rbac-hidden'); shown++; } else { tr.style.display='none'; tr.setAttribute('data-rbac-hidden','1'); } });
    scopeBadge(view, shown);
  }

  var wrapped=false;
  function wrapShowView(){ if(wrapped||!window.HubViews||!window.HubViews.showView)return; wrapped=true; var orig=window.HubViews.showView;
    window.HubViews.showView=function(name,opts){ var target=name;
      if(isAnon() && name && name!=='accueil' && PAGES.some(function(p){return p.k===name;})){ try{openLoginPopup(name);}catch(e){} return; }
      if(session&&!session.isAdmin&&name&&name!=='empty'&&PAGES.some(function(p){return p.k===name;})&&!allowed(name)){
        var rt=redirectTarget(name); if(rt){ target=rt; } else { try{showDeniedView();}catch(e){} return; }
      }
      var _r=orig.call(this,target,opts); if(session&&!session.isAdmin){ try{veilScoped();}catch(e){} setTimeout(function(){try{scopeFilter();applyAccess();applySubtabs();enforceActiveView();}catch(e){} try{unveilScoped();}catch(e){}},160); } return _r; };
  }
  function hideNav(){
    var emp=session&&!session.isAdmin;
    document.querySelectorAll('#subnav [data-sub]').forEach(function(el){ if(!emp){el.style.display='';return;} var sub=el.getAttribute('data-sub'),view=null; for(var v in VIEW_NAV){if(VIEW_NAV[v].sub===sub){view=v;break;}} el.style.display=(view&&!allowed(view))?'none':''; });
    document.querySelectorAll('#navlinks button[data-page]').forEach(function(b){ var pg=b.getAttribute('data-page'); if(!emp){b.style.display='';return;} if(pg==='accueil'){b.style.display=allowed('accueil')?'':'none';return;} var vs=PAGE_VIEWS[pg]; if(!vs||!vs.length){b.style.display='none';return;} b.style.display=vs.some(function(v){return allowed(v);})?'':'none'; });
  }
  function currentViewKey(){ for(var i=0;i<PAGES.length;i++){ var el=document.getElementById('view-'+PAGES[i].k); if(el&&el.classList.contains('active')) return PAGES[i].k; } return null; }
  var ACT_HIDE=/(nouveau|nouvelle|nouvel\b|ajouter|^\s*\+|créer|creer|enregistrer|modifier|supprimer|importer|vider|planifier|renouveler|générer|generer|dupliquer|effacer|retirer)/i;
  var DEL_HIDE=/(supprimer|retirer|effacer|^vider)/i;
  function applyAccess(){
    document.querySelectorAll('[data-rbac-acthide]').forEach(function(b){b.style.display='';b.removeAttribute('data-rbac-acthide');});
    document.querySelectorAll('[data-rbac-roinp]').forEach(function(i){i.style.pointerEvents='';i.removeAttribute('readonly');i.removeAttribute('data-rbac-roinp');});
    if(!session||session.isAdmin) return;
    var k=currentViewKey(); if(!k) return; var lvl=levelFor(k);
    if(lvl!=='read'&&lvl!=='edit') return;
    var re=(lvl==='read')?ACT_HIDE:DEL_HIDE;
    document.querySelectorAll('button,.btn,[role=button]').forEach(function(b){ if(b.closest&&b.closest('#navlinks,#subnav,.nav-right,#rbac-admin,#rbac-admin-btn,#ep-lock')) return; var t=(b.textContent||'').replace(/\s+/g,' ').trim(); var delCls=/rfqd-del|pap-del|(^|[^a-z])del(ete)?($|[^a-z])/i.test(b.className||''); if((t&&re.test(t))||(lvl==='edit'&&delCls)){ b.style.display='none'; b.setAttribute('data-rbac-acthide','1'); } });
    if(lvl==='read'){ var v=document.getElementById('view-'+k); if(v){ v.querySelectorAll('input,select,textarea').forEach(function(i){ var h=((i.type||'')+' '+(i.placeholder||'')+' '+(i.className||'')+' '+(i.id||'')+' '+(i.getAttribute('aria-label')||'')).toLowerCase(); if(i.type==='search'||/search|recherch|filtr/.test(h)) return; i.style.pointerEvents='none'; if(i.tagName!=='SELECT') i.setAttribute('readonly','readonly'); i.setAttribute('data-rbac-roinp','1'); }); } }
    if(k==='vacation'){ blockVacGantt(); }
  }
  /* read-only employees must not create/edit a congé by clicking the Gantt diagram */
  function blockVacGantt(){ var gt=document.getElementById('vac-gantt'); if(!gt||gt.__rbacGanttBlocked) return; gt.__rbacGanttBlocked=true;
    gt.addEventListener('click',function(e){ if(session&&!session.isAdmin){ var lv=levelFor('vacation'); if(lv!=='edit'&&lv!=='admin'){ e.stopPropagation(); e.preventDefault(); try{toast('Lecture seule — création de congé non autorisée');}catch(_){}}}},true);
    gt.style.cursor='default';
  }
  function _tn(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9àâäéèêëïîôöùûüçñ]/g,''); }
  function _clickKeep(firstKeep, activeHidden){ if(firstKeep && activeHidden && !firstKeep.getAttribute('data-rbac-clicked')){ firstKeep.setAttribute('data-rbac-clicked','1'); try{firstKeep.click();}catch(e){} setTimeout(function(){try{firstKeep.removeAttribute('data-rbac-clicked');}catch(e){}},400); } }
  function _restoreTabs(scope){ (scope||document).querySelectorAll('[data-rbac-tabhide]').forEach(function(b){b.style.display='';b.removeAttribute('data-rbac-tabhide');}); }
  function applySubtabs(){
    if(!session||session.isAdmin){ _restoreTabs(document); return; }
    Object.keys(EMP_SUBTABS).forEach(function(vid){
      var v=document.getElementById(vid); if(!v) return;
      if(!v.classList.contains('active')){ _restoreTabs(v); return; }
      var rule=EMP_SUBTABS[vid], keepN=rule.keep.map(_tn), firstKeep=null, activeHidden=false;
      function consider(b){ var isKeep=keepN.indexOf(_tn(b.textContent))>=0; if(isKeep){ b.style.display=''; b.removeAttribute('data-rbac-tabhide'); if(!firstKeep)firstKeep=b; } else { if(b.classList.contains('active')||b.getAttribute('aria-selected')==='true') activeHidden=true; b.style.display='none'; b.setAttribute('data-rbac-tabhide','1'); } }
      if(rule.mode==='siblings'){
        var kbtn=null; v.querySelectorAll('button,[role=tab]').forEach(function(b){ if(!kbtn && keepN.indexOf(_tn(b.textContent))>=0) kbtn=b; });
        if(!kbtn||!kbtn.parentElement) return;
        [].slice.call(kbtn.parentElement.children).forEach(function(b){ if(b.tagName!=='BUTTON' && !(b.getAttribute&&b.getAttribute('role')==='tab')) return; consider(b); });
      } else {
        var allN=rule.all.map(_tn);
        v.querySelectorAll('button,[role=tab],.tab,[data-tab],[data-rt]').forEach(function(b){ if(allN.indexOf(_tn(b.textContent))<0) return; consider(b); });
      }
      _clickKeep(firstKeep, activeHidden);
    });
  }
  function setupTopbar(){ var btn=document.getElementById('connectBtn'); if(!btn) return;
    if(!btn.getAttribute('data-rbac')){ var nb=btn.cloneNode(true); nb.setAttribute('data-rbac','1'); nb.style.background=''; btn.parentNode.replaceChild(nb,btn); btn=nb; btn.addEventListener('click', onConnectClick); }
    btn=document.getElementById('connectBtn');
    var nameEl=document.getElementById('rbac-topname');
    if(session){
      if(!nameEl){ nameEl=document.createElement('span'); nameEl.id='rbac-topname'; nameEl.style.cssText='font-size:13px;font-weight:700;color:var(--text);margin-right:6px;white-space:nowrap;display:inline-flex;align-items:center;gap:6px'; btn.parentNode.insertBefore(nameEl, btn); }
      nameEl.innerHTML='<span style="width:26px;height:26px;border-radius:50%;background:#0c2a52;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800">'+esc((session.name||'?').split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase())+'</span><span>'+esc(session.name||session.matricule)+'</span><span style="font-weight:500;color:var(--muted,#94a3b8)">· '+esc((DB.groups[session.groupId]||{}).name||'')+'</span>';
      if(btn.textContent!=='Se déconnecter') btn.textContent='Se déconnecter'; btn.style.background='';
    } else { if(nameEl) nameEl.remove(); if(btn.textContent!=='Se connecter') btn.textContent='Se connecter'; }
  }
  function onConnectClick(){ if(session){ logout(); } else { openLoginPopup(); } }
  function logout(){ session=null; try{LS.removeItem('epilot_rbac_session');}catch(e){} apply(); try{window.HubViews.showView('accueil');}catch(e){} }
  function loginAs(acc, pending){ session={matricule:acc.matricule,name:acc.name,groupId:acc.groupId,perms:(DB.groups[acc.groupId]||{}).perms||{},isAdmin:(acc.groupId==='admin')}; try{LS.setItem('epilot_rbac_session',JSON.stringify({matricule:acc.matricule}));}catch(e){} apply(); try{ window.HubViews.showView((pending&&allowed(pending))?pending:'accueil'); }catch(e){} }
  function openLoginPopup(pending){ if(document.getElementById('rbac-login-ov')) return; var ov=document.createElement('div'); ov.id='rbac-login-ov'; ov.className='no-print'; ov.style.cssText='position:fixed;inset:0;z-index:2147483600;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif';
    ov.innerHTML='<div style="width:360px;max-width:94vw;border-radius:16px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.45);background:#eef0f3">'
      +'<div style="background:#c9ccd1;padding:18px 22px 14px;text-align:center">'
        +'<div style="font-size:13px;font-weight:900;color:#0c1a4b;letter-spacing:1px;text-align:left">HBO</div>'
        +'<div style="font-size:30px;font-weight:900;color:#0c1a4b;letter-spacing:1px;margin-top:2px">ePilot</div>'
        +'<div style="font-size:13px;font-weight:700;color:#2e7d32;letter-spacing:3px">Gestion Operationnelle</div>'
        +'<div style="font-size:10px;font-weight:700;color:#b5000a;letter-spacing:2px;margin-top:4px">HBO - Light Is On</div>'
      +'</div>'
      +'<div style="padding:20px 22px 22px">'
        +'<div style="font-size:18px;font-weight:800;color:#1f2937">Portail de Gestion Operationnelle</div>'
        +'<div style="font-size:13px;font-weight:600;color:#2563eb;margin:2px 0 14px">Sélectionnez votre profil</div>'
        +'<div style="display:flex;background:#fff;border-radius:12px;padding:5px;gap:5px;box-shadow:inset 0 0 0 1px #e5e7eb">'
          +'<button id="rbac-prof-emp" class="rbac-prof" data-prof="emp" style="flex:1;border:0;border-radius:9px;padding:10px;font:inherit;font-size:13.5px;font-weight:700;cursor:pointer;color:#374151;background:#fff">👤 Employé</button>'
          +'<button id="rbac-prof-mgr" class="rbac-prof" data-prof="mgr" style="flex:1;border:0;border-radius:9px;padding:10px;font:inherit;font-size:13.5px;font-weight:700;cursor:pointer;color:#374151;background:#fff">⚙ Manager</button>'
        +'</div>'
        +'<div id="rbac-emp-fields" style="margin-top:14px"><div style="font-size:12px;font-weight:700;color:#374151;text-transform:none;margin-bottom:6px">Matricule</div><input id="rbac-lm" placeholder="Matricule" autocomplete="off" style="width:100%;box-sizing:border-box;padding:12px;border:0;border-radius:10px;background:#fff;font-size:14px;box-shadow:inset 0 0 0 1px #d1d5db"><div style="font-size:12px;font-weight:700;color:#374151;margin:10px 0 6px">Mot de passe</div><input id="rbac-lpe" type="password" placeholder="Mot de passe" style="width:100%;box-sizing:border-box;padding:12px;border:0;border-radius:10px;background:#fff;font-size:14px;box-shadow:inset 0 0 0 1px #d1d5db"></div>'
        +'<div id="rbac-mgr-fields" style="margin-top:14px;display:none"><div style="font-size:12px;font-weight:700;color:#374151;margin-bottom:6px">Mot de passe Manager</div><input id="rbac-lpm" type="password" placeholder="Mot de passe" style="width:100%;box-sizing:border-box;padding:12px;border:0;border-radius:10px;background:#fff;font-size:14px;box-shadow:inset 0 0 0 1px #d1d5db"></div>'
        +'<div id="rbac-lmsg" style="font-size:12px;color:#c0392b;min-height:16px;margin-top:8px"></div>'
        +'<button id="rbac-lgo" style="margin-top:6px;width:100%;padding:13px;border:0;border-radius:10px;background:linear-gradient(180deg,#f0c66a,#e0a93f);color:#3a2a00;font-weight:800;font-size:14px;cursor:pointer">Se connecter</button>'
        +'<div style="text-align:center;font-size:12px;color:#2563eb;margin-top:10px">Vous allez être connecté à ePilot</div>'
      +'</div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click',function(e){ if(e.target===ov && session) ov.remove(); }); // only closable by click-out if already logged
    var prof='emp';
    function setProf(pp){ prof=pp; ov.querySelector('#rbac-emp-fields').style.display=(pp==='emp')?'':'none'; ov.querySelector('#rbac-mgr-fields').style.display=(pp==='mgr')?'':'none';
      ov.querySelector('#rbac-prof-emp').style.background=(pp==='emp')?'#fff7e8':'#fff'; ov.querySelector('#rbac-prof-emp').style.boxShadow=(pp==='emp')?'inset 0 0 0 2px #e0a93f':'none'; ov.querySelector('#rbac-prof-emp').style.color=(pp==='emp')?'#b5000a':'#374151';
      ov.querySelector('#rbac-prof-mgr').style.background=(pp==='mgr')?'#fff7e8':'#fff'; ov.querySelector('#rbac-prof-mgr').style.boxShadow=(pp==='mgr')?'inset 0 0 0 2px #e0a93f':'none'; ov.querySelector('#rbac-prof-mgr').style.color=(pp==='mgr')?'#b5000a':'#374151';
      var msg=ov.querySelector('#rbac-lmsg'); if(msg)msg.textContent=''; setTimeout(function(){try{ov.querySelector(pp==='emp'?'#rbac-lm':'#rbac-lpm').focus();}catch(e){}},40);
    }
    ov.querySelector('#rbac-prof-emp').onclick=function(){setProf('emp');};
    ov.querySelector('#rbac-prof-mgr').onclick=function(){setProf('mgr');};
    function fail(m){ var e=ov.querySelector('#rbac-lmsg'); if(e)e.textContent=m; }
    function go(){
      if(prof==='mgr'){ var pw=ov.querySelector('#rbac-lpm').value||''; var keys=Object.keys(DB.accounts||{});
        (function next(i){ if(i>=keys.length){ fail('Mot de passe Manager incorrect.'); return; } var a=DB.accounts[keys[i]]; if(a && a.active!==false && a.groupId==='admin'){ H((a.salt||'')+'|'+pw).then(function(h){ if(h===a.pwHash){ ov.remove(); loginAs(a, pending); } else next(i+1); }); } else next(i+1); })(0);
      } else {
        var m=(ov.querySelector('#rbac-lm').value||'').trim(); var pw=ov.querySelector('#rbac-lpe').value||''; var acc=DB.accounts[m];
        if(!acc){ fail('Compte introuvable.'); return; } if(acc.active===false){ fail('Compte désactivé.'); return; }
        H((acc.salt||'')+'|'+pw).then(function(h){ if(h===acc.pwHash){ ov.remove(); loginAs(acc, pending); } else fail('Mot de passe incorrect.'); });
      }
    }
    ov.querySelector('#rbac-lgo').onclick=go;
    ['rbac-lm','rbac-lpe','rbac-lpm'].forEach(function(idd){ var el=ov.querySelector('#'+idd); if(el) el.addEventListener('keydown',function(e){if(e.key==='Enter')go();}); });
    setProf('emp');
  }
  /* ---------------- access-denied page (forbidden views) ---------------- */
  function ensureDeniedView(){ var d=document.getElementById('view-rbac-denied'); if(d) return d; var ref=document.getElementById('view-accueil'); if(!ref||!ref.parentNode) return null;
    var sec=document.createElement('section'); sec.id='view-rbac-denied'; sec.className='hub-view';
    sec.innerHTML='<div style="min-height:62vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;font-family:Arial,sans-serif"><div style="font-size:56px;line-height:1;margin-bottom:18px">🔒</div><div style="font-size:21px;font-weight:800;color:var(--text,#0f172a);margin-bottom:8px">Accès restreint</div><div style="font-size:14px;color:var(--muted,#64748b);max-width:380px">Vous n\'êtes pas autorisé à cette fonction.</div></div>';
    ref.parentNode.appendChild(sec); return sec; }
  function showDeniedView(){ ensureDeniedView(); document.querySelectorAll('.hub-view').forEach(function(v){ v.classList.toggle('active', v.id==='view-rbac-denied'); }); }
  /* when the requested view is the page's PRIMARY view and it's forbidden but a sibling is allowed,
     land on the allowed sibling (e.g. KPI page: Dashboard blocked → open Évaluation). */
  function redirectTarget(name){ var nav=VIEW_NAV[name]; if(!nav) return null; var views=PAGE_VIEWS[nav.page]||[]; if(views[0]!==name) return null; for(var i=0;i<views.length;i++){ if(views[i]!==name && allowed(views[i])) return views[i]; } return null; }
  function enforceActiveView(){ if(!session||session.isAdmin) return; var a=document.querySelector('.hub-view.active'); if(!a) return; if(a.id==='view-rbac-denied') return; var key=a.id.replace('view-',''); if(!PAGES.some(function(p){return p.k===key;})) return; if(!allowed(key)) showDeniedView(); }

  /* ---------------- anti-flash veil: blank a scoped view until its data is filtered ----------------
     Limited to the personnel views (Paie/Crédits/Contrats, RH) where other people's rows would flash.
     NEVER veil chantiers/vacation. A hard timeout guarantees the veil always lifts. */
  var VEIL_VIEWS={salary:1, hr:1};
  function activeScopedView(){ var a=document.querySelector('.hub-view.active'); if(!a) return null; var key=a.id.replace('view-',''); return (VEIL_VIEWS[key] && SCOPABLE[key] && scopeOf(key)==='self') ? a : null; }
  function veilScoped(){ var a=activeScopedView(); if(!a || a.__rbacVeil) return; try{ if(getComputedStyle(a).position==='static') a.style.position='relative'; }catch(e){}
    var dark=document.body&&document.body.classList.contains('dark'); var ve=document.createElement('div'); ve.className='rbac-veil no-print';
    ve.style.cssText='position:absolute;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;background:'+(dark?'#0f172a':'#f1f5f9')+';color:'+(dark?'#475569':'#cbd5e1')+';font:13px Arial'; ve.textContent='Chargement…';
    a.appendChild(ve); a.__rbacVeil=ve; try{ clearTimeout(a.__rbacVeilT); }catch(e){} a.__rbacVeilT=setTimeout(function(){ try{ if(a.__rbacVeil){ a.__rbacVeil.remove(); a.__rbacVeil=null; } }catch(e){} }, 600); }
  function unveilScoped(){ document.querySelectorAll('.hub-view').forEach(function(a){ if(a.__rbacVeil){ try{a.__rbacVeil.remove();}catch(e){} a.__rbacVeil=null; try{clearTimeout(a.__rbacVeilT);}catch(e){} } }); }
  /* veil the salary view the instant a sub-tab (Pointage/Bulletins/Crédits/Contrats) is clicked,
     so other employees' rows/cards never flash before scoping runs */
  function setupVeilTriggers(){ ['view-salary','view-hr'].forEach(function(id){ var v=document.getElementById(id); if(!v||v.__rbacVeilWired) return; v.__rbacVeilWired=true;
    v.addEventListener('click', function(e){ if(!(session&&!session.isAdmin)) return; var b=e.target&&e.target.closest?e.target.closest('button,[role=tab]'):null; if(!b) return; var t=_tn(b.textContent).normalize('NFD').replace(/[̀-ͯ]/g,''); if(/pointage|bulletins|credits|contrats|paie|prime/.test(t)){ try{veilScoped();}catch(_){}}}, true); }); }

  function activeSelfScoped(){ var a=document.querySelector('.hub-view.active'); if(!a) return null; var k=a.id.replace('view-',''); return (SCOPABLE[k] && scopeOf(k)==='self') ? a : null; }
  function apply(){ wrapShowView(); hideNav(); try{scopeFilter();}catch(e){} try{applyAccess();}catch(e){} try{applySubtabs();}catch(e){} try{enforceActiveView();}catch(e){} try{setupVeilTriggers();}catch(e){} setupTopbar(); updateAdminBtn(); }
  // keep nav hidden + data scoped as views re-render (scoping only — veiling is driven by nav/tab clicks)
  var _sfT=null, _syncT=0;
  try{ new MutationObserver(function(muts){ if(!(session&&!session.isAdmin)) return;
    hideNav(); try{setupVeilTriggers();}catch(e){}
    // pre-paint scoping: when a self-scoped view re-renders, hide other people's rows synchronously
    // (the observer microtask runs before the browser paints, so no flash of other names)
    var sv=activeSelfScoped();
    if(sv && (!_syncT || Date.now()-_syncT>16) && muts.some(function(m){ if(m.type!=='childList') return false; var nodes=[].slice.call(m.addedNodes).concat([].slice.call(m.removedNodes)); var real=nodes.some(function(n){ return !(n.nodeType===1 && n.classList && n.classList.contains('rbac-veil')); }); return real && sv.contains(m.target); })){ _syncT=Date.now(); try{scopeFilter();}catch(e){} }
    clearTimeout(_sfT); _sfT=setTimeout(function(){ try{scopeFilter();applyAccess();applySubtabs();enforceActiveView();}catch(e){} try{unveilScoped();}catch(e){} },60);
  }).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}

  function toast(msg){ var t=document.getElementById('rbac-toast'); if(!t){t=document.createElement('div');t.id='rbac-toast';t.style.cssText='position:fixed;bottom:64px;left:50%;transform:translateX(-50%);z-index:99999;background:#1f2937;color:#fff;padding:9px 18px;border-radius:999px;font:13px Arial;box-shadow:0 8px 24px rgba(0,0,0,.3);opacity:0;transition:opacity .2s';document.body.appendChild(t);} t.textContent=msg; t.style.opacity='1'; clearTimeout(t._t); t._t=setTimeout(function(){t.style.opacity='0';},2200); }

  /* ---------------- login (gate augmentation) ---------------- */
  function gateAugment(card, ov){
    if(!card||document.getElementById('rbac-mat')) return;
    if(!DB.enabled) return; // RBAC off → PIN only
    var accs=Object.keys(DB.accounts||{}); if(!accs.length) return;
    var wrap=document.createElement('div'); wrap.style.cssText='margin-top:16px;border-top:1px solid #e5e7eb;padding-top:14px';
    wrap.innerHTML='<div style="font-size:12px;color:#5b6b85;margin-bottom:8px">Connexion employé</div>'+
      '<input id="rbac-mat" placeholder="Matricule" autocomplete="off" style="width:100%;box-sizing:border-box;padding:10px;border:2px solid #cfd8e8;border-radius:10px;font-size:14px;margin-bottom:8px">'+
      '<input id="rbac-pw" type="password" placeholder="Mot de passe" autocomplete="off" style="width:100%;box-sizing:border-box;padding:10px;border:2px solid #cfd8e8;border-radius:10px;font-size:14px">'+
      '<div id="rbac-lmsg" style="font-size:12px;color:#c0392b;min-height:16px;margin-top:6px"></div>'+
      '<button id="rbac-login" style="margin-top:6px;width:100%;padding:11px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-weight:800;font-size:14px;cursor:pointer">Se connecter</button>';
    card.appendChild(wrap);
    function doLogin(){ var m=(document.getElementById('rbac-mat').value||'').trim(); var pw=document.getElementById('rbac-pw').value||''; var msg=document.getElementById('rbac-lmsg');
      var acc=DB.accounts[m]; if(!acc){ msg.textContent='Compte introuvable.'; return; } if(acc.active===false){ msg.textContent='Compte désactivé.'; return; }
      H((acc.salt||'')+'|'+pw).then(function(h){ if(h===acc.pwHash){ startSession(acc); ov.remove(); } else { msg.textContent='Mot de passe incorrect.'; } });
    }
    document.getElementById('rbac-login').onclick=doLogin;
    document.getElementById('rbac-pw').addEventListener('keydown',function(e){if(e.key==='Enter')doLogin();});
  }
  function startSession(acc){ loginAs(acc); }
  function restoreSession(){ try{ var s=JSON.parse(LS.getItem('epilot_rbac_session')); if(s&&s.matricule&&DB.accounts[s.matricule]){ var acc=DB.accounts[s.matricule]; if(acc.active!==false){ session={matricule:acc.matricule,name:acc.name,groupId:acc.groupId,perms:(DB.groups[acc.groupId]||{}).perms||{},isAdmin:(acc.groupId==='admin')}; return true; } } }catch(e){} return false; }
  window.__rbacGate=gateAugment;

  /* ---------------- admin button + center ---------------- */
  function updateAdminBtn(){ var btn=document.getElementById('rbac-admin-btn'); var canAdmin=session&&session.isAdmin; // logged-in admin only
    if(!canAdmin){ if(btn)btn.remove(); return; }
    if(!btn){ btn=document.createElement('div'); btn.id='rbac-admin-btn'; btn.title='Centre de contrôle des accès'; btn.textContent='🔐'; btn.style.cssText='position:fixed;bottom:14px;left:14px;z-index:99000;width:44px;height:44px;border-radius:50%;background:#0c2a52;color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.3)'; btn.onclick=openAdmin; document.body.appendChild(btn); }
  }

  var adminEl=null, curGroup='admin';
  function openAdmin(){ if(!adminEl){ adminEl=document.createElement('div'); adminEl.id='rbac-admin'; adminEl.style.cssText='position:fixed;inset:0;z-index:99500;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:18px;font-family:Arial,sans-serif'; document.body.appendChild(adminEl); adminEl.addEventListener('click',function(e){if(e.target===adminEl)adminEl.style.display='none';}); }
    adminEl.style.display='flex'; renderAdmin(); }
  function renderAdmin(){
    var groupIds=Object.keys(DB.groups);
    if(groupIds.indexOf(curGroup)<0) curGroup=groupIds[0];
    var grps=Object.keys(DB.PAGES_GRP||{});
    // build page rows grouped
    var byGrp={}; PAGES.forEach(function(p){(byGrp[p.grp]=byGrp[p.grp]||[]).push(p);});
    var g=DB.groups[curGroup]||{perms:{}};
    function lvBtns(pageKey){ return LV.map(function(l){ var on=(g.perms[pageKey]||'none')===l; return '<button class="rbac-lv" data-pg="'+pageKey+'" data-lv="'+l+'" style="border:1px solid '+(on?LVC[l]:'#e5e7eb')+';background:'+(on?LVBG[l]:'#fff')+';color:'+(on?LVC[l]:'#94a3b8')+';font-weight:'+(on?'700':'500')+';padding:4px 9px;border-radius:7px;cursor:pointer;font-size:11.5px;margin-right:4px">'+LVL[l]+'</button>'; }).join(''); }
    function scopeChip(pk){ var sc=(g.scope&&g.scope[pk])||'all'; var self=sc==='self'; return '<button class="rbac-scope" data-pg="'+pk+'" title="Périmètre des données visibles" style="margin-left:8px;border:1px solid '+(self?'#1e40af':'#e5e7eb')+';background:'+(self?'#eef4ff':'#fff')+';color:'+(self?'#1e40af':'#94a3b8')+';padding:4px 9px;border-radius:7px;cursor:pointer;font-size:11px;font-weight:'+(self?'700':'500')+'">'+(self?'👤 Mes données':'🌐 Tout')+'</button>'; }
    var matrixRows=Object.keys(byGrp).map(function(gr){ return '<tr><td colspan="2" style="padding:10px 8px 4px;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.05em">'+esc(gr)+'</td></tr>'+
      byGrp[gr].map(function(p){ return '<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:7px 8px;font-size:13px;color:#1f2937">'+esc(p.label)+'</td><td style="padding:7px 8px;text-align:right;white-space:nowrap">'+lvBtns(p.k)+(SCOPABLE[p.k]?scopeChip(p.k):'')+'</td></tr>'; }).join(''); }).join('');
    var groupOpts=groupIds.map(function(id){return '<option value="'+id+'"'+(id===curGroup?' selected':'')+'>'+esc(DB.groups[id].name)+'</option>';}).join('');
    var accRows=Object.keys(DB.accounts).map(function(m){var a=DB.accounts[m];return '<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:6px 8px;font-family:monospace;font-size:12px">'+esc(m)+'</td><td style="padding:6px 8px;font-size:12.5px">'+esc(a.name||'')+'</td><td style="padding:6px 8px;font-size:12px">'+esc((DB.groups[a.groupId]||{}).name||a.groupId)+'</td><td style="padding:6px 8px;text-align:center">'+(a.active===false?'<span style="color:#b91c1c">désactivé</span>':'<span style="color:#16a34a">actif</span>')+'</td><td style="padding:6px 8px;text-align:right;white-space:nowrap"><button class="rbac-acc-pw" data-m="'+esc(m)+'" title="Changer le mot de passe" style="border:1px solid #e5e7eb;background:#fff;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:11px">🔑</button> <button class="rbac-acc-tog" data-m="'+esc(m)+'" style="border:1px solid #e5e7eb;background:#fff;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:11px">'+(a.active===false?'Activer':'Désactiver')+'</button> <button class="rbac-acc-del" data-m="'+esc(m)+'" style="border:1px solid #fecaca;background:#fee2e2;color:#b91c1c;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:11px">✕</button></td></tr>';}).join('')||'<tr><td colspan="5" style="padding:14px;text-align:center;color:#94a3b8;font-size:12px">Aucun compte. Créez-en un ci-dessous.</td></tr>';
    adminEl.innerHTML='<div style="background:#fff;border-radius:16px;width:860px;max-width:96vw;max-height:92vh;overflow:auto;box-shadow:0 24px 64px rgba(0,0,0,.4)">'
      +'<div style="padding:16px 22px;background:linear-gradient(135deg,#0c2a52,#1b4b8a);color:#fff;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:17px;font-weight:800">🔐 Centre de Contrôle des Accès</div><div style="font-size:12px;opacity:.85;margin-top:2px">Groupes de privilèges, droits par page et comptes employés</div></div><button id="rbac-x" style="background:rgba(255,255,255,.15);border:0;color:#fff;width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:18px">✕</button></div>'
      +'<div style="padding:16px 22px">'
        +'<label style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:'+(DB.enabled?'#dcfce7':'#f1f5f9')+';border-radius:10px;cursor:pointer;margin-bottom:16px"><input type="checkbox" id="rbac-enabled" '+(DB.enabled?'checked':'')+' style="width:18px;height:18px"><span style="font-size:13px;font-weight:700;color:#1f2937">Activer le contrôle d\'accès (connexion employé + restrictions)</span><span style="font-size:11.5px;color:#64748b;margin-left:auto">'+(DB.enabled?'Actif':'Désactivé — accès libre')+'</span></label>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start">'
          +'<div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">'
            +'<div style="padding:11px 14px;background:#f8fafc;border-bottom:1px solid #e5e7eb;display:flex;gap:8px;align-items:center"><b style="font-size:13px">Droits du groupe</b><select id="rbac-group" style="margin-left:auto;padding:6px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px">'+groupOpts+'</select></div>'
            +'<div style="padding:6px 10px;border-bottom:1px solid #eef1f5;display:flex;gap:6px;flex-wrap:wrap"><button id="rbac-grp-new" style="border:1px dashed #cbd5e1;background:#fff;border-radius:7px;padding:4px 10px;cursor:pointer;font-size:11.5px;color:#2563eb">+ Groupe</button><button id="rbac-grp-dup" style="border:1px solid #e5e7eb;background:#fff;border-radius:7px;padding:4px 10px;cursor:pointer;font-size:11.5px">Dupliquer</button><button id="rbac-grp-ren" style="border:1px solid #e5e7eb;background:#fff;border-radius:7px;padding:4px 10px;cursor:pointer;font-size:11.5px">Renommer</button><button id="rbac-grp-del" style="border:1px solid #fecaca;background:#fee2e2;color:#b91c1c;border-radius:7px;padding:4px 10px;cursor:pointer;font-size:11.5px">Supprimer</button><button id="rbac-grp-all" style="border:1px solid #e5e7eb;background:#fff;border-radius:7px;padding:4px 10px;cursor:pointer;font-size:11.5px;margin-left:auto">Tout: </button></div>'
            +'<div style="max-height:46vh;overflow:auto"><table style="width:100%;border-collapse:collapse">'+matrixRows+'</table></div>'
          +'</div>'
          +'<div style="display:flex;flex-direction:column;gap:14px">'
            +'<div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden"><div style="padding:11px 14px;background:#f8fafc;border-bottom:1px solid #e5e7eb"><b style="font-size:13px">Comptes employés</b></div><div style="max-height:26vh;overflow:auto"><table style="width:100%;border-collapse:collapse"><thead><tr style="background:#f8fafc"><th style="padding:6px 8px;text-align:left;font-size:10px;color:#64748b">Matricule</th><th style="padding:6px 8px;text-align:left;font-size:10px;color:#64748b">Nom</th><th style="padding:6px 8px;text-align:left;font-size:10px;color:#64748b">Groupe</th><th style="padding:6px 8px;font-size:10px;color:#64748b">Statut</th><th></th></tr></thead><tbody>'+accRows+'</tbody></table></div></div>'
            +'<div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px"><b style="font-size:13px">Nouveau compte</b><div style="display:grid;gap:8px;margin-top:10px">'
              +'<input id="rbac-na-emp" list="rbac-emps" placeholder="Employé (matricule ou nom)" style="padding:8px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px"><datalist id="rbac-emps"></datalist>'
              +'<select id="rbac-na-grp" style="padding:8px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px">'+groupIds.map(function(id){return '<option value="'+id+'">'+esc(DB.groups[id].name)+'</option>';}).join('')+'</select>'
              +'<input id="rbac-na-pw" type="password" placeholder="Mot de passe" style="padding:8px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px">'
              +'<button id="rbac-na-add" style="border:0;background:#0c2a52;color:#fff;border-radius:8px;padding:9px;cursor:pointer;font-weight:700;font-size:13px">Créer le compte</button>'
              +'<div id="rbac-na-msg" style="font-size:11.5px;min-height:14px"></div>'
            +'</div></div>'
          +'</div>'
        +'</div>'
      +'</div></div>';
    wireAdmin();
  }
  function wireAdmin(){
    document.getElementById('rbac-x').onclick=function(){adminEl.style.display='none';};
    document.getElementById('rbac-enabled').onchange=function(e){ DB.enabled=e.target.checked; save(); renderAdmin(); apply(); };
    document.getElementById('rbac-group').onchange=function(e){ curGroup=e.target.value; renderAdmin(); };
    adminEl.querySelectorAll('.rbac-lv').forEach(function(b){ b.onclick=function(){ DB.groups[curGroup].perms[b.getAttribute('data-pg')]=b.getAttribute('data-lv'); save(); renderAdmin(); if(session&&session.groupId===curGroup){session.perms=DB.groups[curGroup].perms;apply();} }; });
    adminEl.querySelectorAll('.rbac-scope').forEach(function(b){ b.onclick=function(){ var pk=b.getAttribute('data-pg'); var g2=DB.groups[curGroup]; if(!g2.scope)g2.scope={}; g2.scope[pk]=(g2.scope[pk]==='self')?'all':'self'; save(); renderAdmin(); if(session&&session.groupId===curGroup){apply();} }; });
    document.getElementById('rbac-grp-new').onclick=function(){ var n=prompt('Nom du nouveau groupe :'); if(!n)return; var id='g'+Date.now().toString(36); DB.groups[id]={name:n,perms:full('none')}; curGroup=id; save(); renderAdmin(); };
    document.getElementById('rbac-grp-dup').onclick=function(){ var n=prompt('Nom du groupe dupliqué :',DB.groups[curGroup].name+' (copie)'); if(!n)return; var id='g'+Date.now().toString(36); DB.groups[id]={name:n,perms:JSON.parse(JSON.stringify(DB.groups[curGroup].perms))}; curGroup=id; save(); renderAdmin(); };
    document.getElementById('rbac-grp-ren').onclick=function(){ var n=prompt('Renommer le groupe :',DB.groups[curGroup].name); if(!n)return; DB.groups[curGroup].name=n; save(); renderAdmin(); };
    document.getElementById('rbac-grp-del').onclick=function(){ if(curGroup==='admin'){alert('Le groupe Administrateur ne peut pas être supprimé.');return;} if(Object.keys(DB.groups).length<=1){alert('Au moins un groupe requis.');return;} if(!confirm('Supprimer le groupe "'+DB.groups[curGroup].name+'" ?'))return; delete DB.groups[curGroup]; curGroup=Object.keys(DB.groups)[0]; save(); renderAdmin(); };
    var allBtn=document.getElementById('rbac-grp-all'); allBtn.onclick=function(){ var order=['none','read','edit','admin']; var cur=DB.groups[curGroup].perms[PAGES[0].k]||'none'; var nxt=order[(order.indexOf(cur)+1)%4]; PAGES.forEach(function(p){DB.groups[curGroup].perms[p.k]=nxt;}); save(); renderAdmin(); };
    // employee datalist
    var dl=document.getElementById('rbac-emps'); if(dl&&window.PERSONNEL_DATA){ dl.innerHTML=(window.PERSONNEL_DATA||[]).map(function(e){var nm=((e.prenoms||'')+' '+(e.nom||'')).replace(/\s+/g,' ').trim();return '<option value="'+esc(e.matricule||'')+'">'+esc((e.matricule||'')+' — '+nm)+'</option>';}).join(''); }
    document.getElementById('rbac-na-add').onclick=function(){ var raw=(document.getElementById('rbac-na-emp').value||'').trim(); var grp=document.getElementById('rbac-na-grp').value; var pw=document.getElementById('rbac-na-pw').value||''; var msg=document.getElementById('rbac-na-msg');
      var emp=null,P=window.PERSONNEL_DATA||[]; for(var i=0;i<P.length;i++){ var nm=((P[i].prenoms||'')+' '+(P[i].nom||'')).replace(/\s+/g,' ').trim(); if((P[i].matricule||'')===raw||nm.toLowerCase()===raw.toLowerCase()){emp=P[i];break;} }
      var mat=emp?emp.matricule:raw; if(!mat){msg.style.color='#b91c1c';msg.textContent='Indiquez un employé.';return;} if(pw.length<4){msg.style.color='#b91c1c';msg.textContent='Mot de passe : 4 caractères min.';return;}
      var name=emp?((emp.prenoms||'')+' '+(emp.nom||'')).replace(/\s+/g,' ').trim():mat; var salt=Math.random().toString(36).slice(2)+Date.now();
      H(salt+'|'+pw).then(function(h){ DB.accounts[mat]={matricule:mat,name:name,groupId:grp,pwHash:h,salt:salt,active:true}; save(); renderAdmin(); }); };
    adminEl.querySelectorAll('.rbac-acc-pw').forEach(function(b){ b.onclick=function(){ var m=b.getAttribute('data-m'); var pw=prompt('Nouveau mot de passe pour '+m+' :'); if(pw==null) return; if(pw.length<4){ alert('4 caractères minimum.'); return; } var salt=Math.random().toString(36).slice(2)+Date.now(); H(salt+'|'+pw).then(function(h){ DB.accounts[m].salt=salt; DB.accounts[m].pwHash=h; save(); alert('Mot de passe mis à jour pour '+m+'.'); }); }; });
    adminEl.querySelectorAll('.rbac-acc-tog').forEach(function(b){ b.onclick=function(){ var m=b.getAttribute('data-m'); DB.accounts[m].active=(DB.accounts[m].active===false); save(); renderAdmin(); }; });
    adminEl.querySelectorAll('.rbac-acc-del').forEach(function(b){ b.onclick=function(){ var m=b.getAttribute('data-m'); if(confirm('Supprimer le compte '+m+' ?')){ delete DB.accounts[m]; save(); renderAdmin(); } }; });
  }

  /* ---------------- boot ---------------- */
  function boot(){
    // wait for app
    var tries=0; var iv=setInterval(function(){ tries++;
      if(window.HubViews&&window.HubViews.showView){ clearInterval(iv); start(); }
      else if(tries>120){ clearInterval(iv); start(); }
    },150);
  }
  function killGate(){ var ov=document.getElementById('ep-lock'); if(ov){ ov.remove(); return true; } return false; }
  function start(){
    wrapShowView(); killGate();
    if(restoreSession()){ apply(); } else { setupTopbar(); updateAdminBtn(); }
    // suppress the legacy PIN gate entirely (RBAC handles auth)
    var n=0, giv=setInterval(function(){ killGate(); if(!session) setupTopbar(); if(++n>60) clearInterval(giv); }, 150);
    // anonymous: land on the Accueil (no other page accessible until login)
    [350,800,1500].forEach(function(d){ setTimeout(function(){ if(isAnon() && !document.getElementById('rbac-login-ov')){ try{ window.HubViews.showView('accueil'); }catch(e){} } }, d); });
  }
  window.EPRBAC={ open:openAdmin, get session(){return session;}, PAGES:PAGES, _db:function(){return DB;} };
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
})();

/* ───────── Commandes : bouton d'ajout contextuel à l'onglet (remplace l'ancienne fenêtre « Nouvelle commande ») ───────── */
;(function(){
  'use strict';
  function ordView(){ var v=document.getElementById('view-orders'); return (v&&v.classList.contains('active'))?v:null; }
  var ORD_CTX=[
    {sel:'#dep-new',        set:'+ Nouvelle dépense', alt:['+ New expense']},
    {sel:'#det-new-credit', set:'+ Nouveau crédit',   alt:['+ New credit']}
  ];
  function ctxFor(v){ for(var i=0;i<ORD_CTX.length;i++){ if(v.querySelector(ORD_CTX[i].sel)) return ORD_CTX[i]; } return null; }
  function sync(){ var v=ordView(); if(!v) return; var hdr=document.getElementById('ord-new'); if(!hdr) return;
    var c=ctxFor(v);
    if(c){ hdr.style.display=''; hdr.setAttribute('data-ordsel',c.sel);
      var t=(hdr.textContent||'').trim(); if(t!==c.set && c.alt.indexOf(t)<0) hdr.textContent=c.set; }
    else { hdr.style.display='none'; hdr.removeAttribute('data-ordsel'); }
  }
  /* capture-phase : neutralise l'ancien modal (listener délégué sur document) et délègue au bouton de l'onglet */
  document.addEventListener('click', function(e){ var b=e.target&&e.target.closest&&e.target.closest('#ord-new'); if(!b) return; var v=ordView(); if(!v) return;
    e.stopImmediatePropagation(); e.preventDefault();
    var sel=b.getAttribute('data-ordsel'); var t=sel&&v.querySelector(sel); if(t){ try{t.click();}catch(_){} }
  }, true);
  try{ new MutationObserver(function(){ try{sync();}catch(e){} }).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
  function boot(){ setTimeout(sync,500); setInterval(sync,1200); }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
})();

/* ───────── KPI dans le header principal (à droite, façon Paie) ───────── */
;(function(){
  'use strict';
  var CFG=[
    {view:'view-marketing', kpi:'.mkt-kpis',  header:'.mkt-head',  before:'.mkt-head-r'},
    {view:'view-chantiers', kpi:'.stat-strip',header:'.view-head', before:null},
    {view:'view-rfq',       kpi:'.stat-strip',header:'.view-head', before:'.actions'},
    {view:'view-orders',    kpi:'.ep-dep-kpis, .ep-det-kpis', header:'.view-head', before:'.actions'},
    {view:'view-achats',    kpi:'.ep-ach-kpis', header:'.view-head', before:null}
  ];
  function renameAchatsTab(){ var v=document.getElementById('view-achats'); if(!v) return; [].slice.call(v.querySelectorAll('button,[role=tab]')).forEach(function(b){ var t=(b.textContent||'').replace(/\s+/g,' ').trim(); if(/Non livr[ée]s$/.test(t) && !/Services/i.test(t) && !/Articles non/i.test(t)) b.textContent=t.replace(/Non livr/, 'Articles non livr'); else if(/Undelivered$/.test(t) && !/services/i.test(t) && !/items/i.test(t)) b.textContent=t.replace(/Undelivered/, 'Undelivered items'); }); }
  function baliseAchats(){ var v=document.getElementById('view-achats'); if(!v) return; var card=v.querySelector('div[style*="min-width:96px"]'); if(card&&card.parentElement&&!card.parentElement.classList.contains('ep-ach-kpis')) card.parentElement.classList.add('ep-ach-kpis'); }
  function place(){
    try{baliseAchats();}catch(e){} try{renameAchatsTab();}catch(e){}
    CFG.forEach(function(cfg){
      var v=document.getElementById(cfg.view); if(!v) return;
      var header=v.querySelector(cfg.header); if(!header) return;
      var all=[].slice.call(v.querySelectorAll(cfg.kpi)); if(!all.length) return;
      var inHead=all.filter(function(k){return header.contains(k);});
      var body=all.filter(function(k){return !header.contains(k);});
      if(body.length){
        // a freshly rendered KPI row exists in the body → move it up, drop any stale one already in header
        inHead.forEach(function(k){ k.remove(); });
        var kpi=body[body.length-1];
        try{ header.style.display='flex'; header.style.alignItems='center'; header.style.flexWrap='wrap'; }catch(e){}
        var ref=cfg.before?header.querySelector(cfg.before):null;
        if(ref) header.insertBefore(kpi, ref); else header.appendChild(kpi);
        kpi.style.marginLeft='auto'; kpi.setAttribute('data-ep-moved','1');
        // remove remaining body duplicates
        body.slice(0,-1).forEach(function(k){ k.remove(); });
      }
    });
  }
  try{ new MutationObserver(function(){ try{place();}catch(e){} }).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
  function boot(){ setTimeout(place,600); setInterval(place,1500); }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
})();

/* ───────── Papiers : remonter les KPI dans la ligne de titre (pas de classes → ancrage sur le H1) ───────── */
;(function(){
  'use strict';
  function move(){
    var v=document.getElementById('view-papiers'); if(!v) return;
    var h=v.querySelector('h1,h2'); if(!h) return;
    var titleRow=h.parentElement; var flexRow=titleRow&&titleRow.parentElement; if(!flexRow) return;
    var fsts=[].slice.call(v.querySelectorAll('[data-fst]')); if(!fsts.length) return;
    var kcont=fsts[fsts.length-1].parentElement; if(!kcont) return;
    if(kcont.parentElement===flexRow){ kcont.style.marginLeft='auto'; return; }
    [].slice.call(flexRow.querySelectorAll('[data-ep-pap]')).forEach(function(e){ if(e!==kcont) e.remove(); });
    try{ flexRow.style.display='flex'; flexRow.style.alignItems='center'; flexRow.style.flexWrap='wrap'; }catch(e){}
    flexRow.insertBefore(kcont, titleRow.nextSibling);
    kcont.style.marginLeft='auto'; kcont.setAttribute('data-ep-pap','1');
  }
  try{ new MutationObserver(function(){ try{move();}catch(e){} }).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
  function boot(){ setTimeout(move,600); setInterval(move,1500); }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
})();

/* ───────── Uniformiser titres React : accent rouge Congés + fil d'Ariane (pages sans classes) ───────── */
;(function(){
  'use strict';
  var RED='rgb(232, 0, 13)';
  function reddish(c){ var m=c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); if(!m) return false; var r=+m[1],g=+m[2],b=+m[3]; var mx=Math.max(r,g,b),mn=Math.min(r,g,b); return (mx-mn)>60; }
  var _t=0;
  function norm(){ var now=Date.now(); if(now-_t<150) return; _t=now;
    var v=document.querySelector('.hub-view.active'); if(!v) return;
    var title=v.querySelector('h1')||v.querySelector('.mkt-title');
    if(title){ [].slice.call(title.querySelectorAll('span,b,strong')).forEach(function(s){ if(s.children.length) return; var c; try{c=getComputedStyle(s).color;}catch(e){return;} if(reddish(c) && c!==RED) s.style.setProperty('color',RED,'important'); }); }
    // fil d'Ariane sans classe .crumb (pages React) → aligner sur .crumb
    if(!v.querySelector('.crumb')){
      var cand=[].slice.call(v.querySelectorAll('div,span')).filter(function(e){ if(e.children.length>3) return false; var t=e.textContent.replace(/\s+/g,' ').trim(); if(!/^[^\/]{1,16}\/[^\/]{1,16}$/.test(t)) return false; var fs; try{fs=parseFloat(getComputedStyle(e).fontSize);}catch(_){return false;} return fs>0 && fs<14; });
      var crumb=cand[0];
      if(crumb){ try{ var _I=window.EPilotI18n, _lang=window.__appLang||"fr"; if(_I){ var _map=(_lang==="en")?_I.toEN:_I.toFR; var _cur=crumb.textContent.replace(/\s+/g," ").trim(); if(/\//.test(_cur) && crumb.childNodes.length<=1){ var _tr=_cur.split("/").map(function(x){x=x.trim();return _map[x]||x;}).join(" / "); if(_tr!==_cur) crumb.textContent=_tr; } } }catch(e){} }
      if(crumb && !crumb.__epCrumb){ crumb.__epCrumb=1; crumb.style.setProperty('font-size','11px','important'); crumb.style.setProperty('font-weight','700','important'); crumb.style.setProperty('text-transform','none','important'); crumb.style.setProperty('color','rgb(138,148,166)','important'); crumb.style.setProperty('font-family','Outfit,Inter,sans-serif','important'); crumb.style.setProperty('letter-spacing','0','important'); }
    }
  }
  try{ new MutationObserver(function(){ try{norm();}catch(e){} }).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
  function boot(){ setTimeout(norm,600); setInterval(norm,1500); }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
})();
