window.OR3D_FEES=window.OR3D_FEES||{appFee:(window.T2&&+window.T2.appFee)||0};
(function(){
'use strict';
if(!document.getElementById('or3d')) return;
var IC_CALC='<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4" y="2.5" width="12" height="15" rx="2"/><path d="M7 6h6M7.2 10h.1M10 10h.1M12.8 10h.1M7.2 13h.1M10 13h.1M12.8 13h.1"/></svg>';
var MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var cur=null, back=null, box=null;

function fmt(n){ n=Math.round((+n||0)*100)/100; return '$'+n.toLocaleString('en-US',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2}); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function niceDate(iso){ var p=iso.split('-'); return MONTHS[+p[1]-1]+' '+(+p[2])+', '+p[0]; }
function fees(){ var f=window.OR3D_FEES||{}; return {appFee:+f.appFee||0, monthly:f.monthly||[], optional:f.optional||[], oneTime:f.oneTime||[]}; }
function sum(list){ return list.reduce(function(t,x){ return t+(+x.amount||0); },0); }
function unitData(a){ var P=window.OR3D_PRICING; return P&&P.units&&P.units[a.id]||null; }
function datesFor(a){ var u=unitData(a); return u&&u.byDate?Object.keys(u.byDate).sort():[]; }
function termsFor(a,date){
  var u=unitData(a), list=u?((date&&u.byDate&&u.byDate[date])||u.terms):null;
  if(!list||!list.length) list=window.OR3D_DEMO_TERMS?demoTerms(a):[{months:12,rent:a.rent}];
  return list.filter(function(t){ return +t.rent>0; }).sort(function(x,y){ return x.months-y.months; });
}
var DEMO={6:.15,7:.12,8:.10,9:.08,10:.05,11:.03,12:0,13:-.005,14:-.01,15:-.015};
function demoTerms(a){ return Object.keys(DEMO).map(function(m){ return {months:+m, rent:+m===12?a.rent:Math.round(a.rent*(1+DEMO[m])/5)*5}; }); }
function isDemo(a){ return !!window.OR3D_DEMO_TERMS && !unitData(a); }
function api(){ return window.__or||null; }
function aptById(id){ var o=api(); if(!o) return null; var hit=null; o.BLDGS.forEach(function(b){ b.apts.forEach(function(a){ if(a.id===id) hit=a; }); }); return hit; }

/* ---- button on each apartment card ---- */
function addButtons(root){
  root.querySelectorAll('.card').forEach(function(card){
    if(card.querySelector('.ccbtn')) return;
    var s=card.querySelector('[data-schedule]'), cta=s&&s.closest('.cta'); if(!cta) return;
    var b=document.createElement('button'); b.type='button'; b.className='tourbtn ccbtn'; b.dataset.cc=s.dataset.schedule;
    b.innerHTML=IC_CALC+'Estimate My Cost';
    cta.parentNode.insertBefore(b,cta);
  });
}

/* ---- the calculator ---- */
function build(root){
  box=document.createElement('div'); box.className='cc'; box.hidden=true;
  box.setAttribute('role','dialog'); box.setAttribute('aria-modal','true'); box.setAttribute('aria-labelledby','ccTitle');
  box.innerHTML='<div class="cc-box"><div class="tour-head"><b id="ccTitle"></b><button type="button" class="tour-x" data-ccx aria-label="Close the cost estimate">&times;</button></div>'+
    '<div class="cc-main"><div class="cc-in" id="ccIn"></div><div class="cc-out" id="ccOut" aria-live="polite"></div></div>'+
    '<div class="cc-foot"><p class="cc-note">This is an estimate. Rent and availability can change daily, and our team confirms your final costs before you sign a lease. Optional add-ons are not included in the total monthly price.<span class="cc-demo" hidden> Prices for lease lengths other than 12 months are samples for this preview.</span></p>'+
    '<div class="cta"><button type="button" data-ccgo="tour">Schedule a tour</button><a class="pri" href="#apply" data-ccgo="apply">Apply now</a></div></div></div>';
  root.appendChild(box);
  box.addEventListener('click',function(e){
    if(e.target===box||e.target.closest('[data-ccx]')){ close(); return; }
    var go=e.target.closest('[data-ccgo]'); if(!go||!cur) return;
    e.preventDefault();
    var card=document.querySelector('#or3d .card [data-schedule="'+cur.a.id+'"]'), target=null;
    if(card){ target=go.dataset.ccgo==='tour'?card:card.closest('.card').querySelector('.cta .pri'); }
    close(); if(target) target.click();
  });
  box.addEventListener('change',function(e){
    if(!cur) return;
    if(e.target.id==='ccDate'){ cur.date=e.target.value; var t=termsFor(cur.a,cur.date); if(!t.some(function(x){ return x.months===cur.months; })) cur.months=pick12(t); renderIn(); }
    else if(e.target.id==='ccTerm'){ cur.months=+e.target.value; }
    else if(e.target.name==='ccOpt'){ cur.opt[e.target.value]=e.target.checked; }
    renderOut();
  });
  box.addEventListener('click',function(e){
    var s=e.target.closest('[data-ccn]'); if(!s||!cur) return;
    cur.n=Math.max(1,Math.min(6,cur.n+(+s.dataset.ccn))); renderIn(); renderOut();
    var again=box.querySelector('[data-ccn="'+s.dataset.ccn+'"]'); if(again&&!again.disabled) again.focus();
  });
  document.addEventListener('keydown',function(e){
    if(box.hidden) return;
    if(e.key==='Escape'){ e.stopImmediatePropagation(); e.preventDefault(); close(); return; }
    if(e.key==='Tab'){ var f=box.querySelectorAll('button:not([disabled]),select,input,a[href]'); if(!f.length) return;
      var first=f[0], last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); } }
  },true);
}
function pick12(t){ var m=t.filter(function(x){ return x.months===12; })[0]||t[t.length-1]; return m.months; }
function open(a){
  if(!a) return;
  var d=datesFor(a);
  cur={a:a, date:d[0]||'', n:1, opt:{}};
  cur.months=pick12(termsFor(a,cur.date));
  box.querySelector('#ccTitle').innerHTML='Estimate Your Cost <span>'+esc(a.nice)+', apartment '+esc(a.b.num+'-'+a.unit)+'</span>';
  box.querySelector('.cc-demo').hidden=!isDemo(a);
  renderIn(); renderOut();
  back=document.activeElement; box.hidden=false;
  box.querySelector('[data-ccx]').focus();
}
function close(){ if(!box||box.hidden) return; box.hidden=true; cur=null; if(back&&back.focus&&document.contains(back)) back.focus(); }
function renderIn(){
  var a=cur.a, F=fees(), d=datesFor(a), t=termsFor(a,cur.date), h='';
  if(d.length) h+='<label>Move-in date<select id="ccDate">'+d.map(function(x){ return '<option value="'+x+'"'+(x===cur.date?' selected':'')+'>'+niceDate(x)+'</option>'; }).join('')+'</select></label>';
  if(t.length>1) h+='<label>Lease length<select id="ccTerm">'+t.map(function(x){ return '<option value="'+x.months+'"'+(x.months===cur.months?' selected':'')+'>'+x.months+' months, '+fmt(x.rent)+' base rent</option>'; }).join('')+'</select></label>';
  else h+='<div class="cc-lbl">Lease length<span class="cc-fixed">'+t[0].months+' months</span></div>';
  if(F.appFee) h+='<div class="cc-lbl" id="ccNl">Number of applicants<span class="cc-step" role="group" aria-labelledby="ccNl"><button type="button" data-ccn="-1" aria-label="One fewer applicant"'+(cur.n<=1?' disabled':'')+'>&minus;</button><output>'+cur.n+'</output><button type="button" data-ccn="1" aria-label="One more applicant"'+(cur.n>=6?' disabled':'')+'>+</button></span></div>';
  if(F.optional.length) h+='<fieldset class="cc-opt"><legend>Optional add-ons</legend>'+F.optional.map(function(o,i){ return '<label><input type="checkbox" name="ccOpt" value="'+i+'"'+(cur.opt[i]?' checked':'')+'>'+esc(o.name)+'<small>'+fmt(o.amount)+'/mo</small></label>'; }).join('')+'</fieldset>';
  box.querySelector('#ccIn').innerHTML=h;
}
function renderOut(){
  var a=cur.a, F=fees(), t=termsFor(a,cur.date), term=t.filter(function(x){ return x.months===cur.months; })[0]||t[0];
  var rent=+term.rent, req=sum(F.monthly), total=rent+req;
  var opts=F.optional.filter(function(o,i){ return cur.opt[i]; }), optSum=sum(opts);
  var h='<div class="cc-sec"><h4>Monthly cost</h4><div class="cc-row"><span>Base rent, '+term.months+'-month lease</span><span>'+fmt(rent)+'</span></div>';
  F.monthly.forEach(function(x){ h+='<div class="cc-row"><span>'+esc(x.name)+'</span><span>'+fmt(x.amount)+'</span></div>'; });
  h+='<div class="cc-total"><span>Total monthly price</span><b>'+fmt(total)+'</b></div>';
  if(opts.length){ opts.forEach(function(x){ h+='<div class="cc-row sub"><span>'+esc(x.name)+' (optional)</span><span>+'+fmt(x.amount)+'</span></div>'; });
    h+='<div class="cc-total lite"><span>Monthly with add-ons</span><b>'+fmt(total+optSum)+'</b></div>'; }
  h+='</div>';
  if(F.appFee){ var app=F.appFee*cur.n;
    h+='<div class="cc-sec"><h4>Due with your application</h4><div class="cc-row"><span>Application fee ('+fmt(F.appFee)+' per applicant'+(cur.n>1?' &times; '+cur.n:'')+')</span><span>'+fmt(app)+'</span></div></div>'; }
  h+='<div class="cc-sec"><h4>Due before move-in</h4>';
  if(F.oneTime.length){ F.oneTime.forEach(function(x){ h+='<div class="cc-row"><span>'+esc(x.name)+'</span><span>'+fmt(x.amount)+'</span></div>'; });
    h+='<div class="cc-total lite"><span>Estimated move-in cost</span><b>'+fmt(sum(F.oneTime))+'</b></div>'; }
  else h+='<p class="cc-empty">Our team will confirm your security deposit and any move-in costs when you apply.</p>';
  h+='</div>';
  box.querySelector('#ccOut').innerHTML=h;
}

function init(){
  var root=document.getElementById('or3d'); if(!root||!root.querySelector('#panel')) return false;
  build(root); addButtons(root);
  var panel=root.querySelector('#panel');
  new MutationObserver(function(){ addButtons(root); }).observe(panel,{childList:true,subtree:true});
  panel.addEventListener('click',function(e){ var b=e.target.closest('[data-cc]'); if(b){ e.stopPropagation(); open(aptById(b.dataset.cc)); } });
  window.OR3D_CALC={open:function(id){ open(aptById(id)); }};
  return true;
}
function wait(){ if(!init()){ var n=0, t=setInterval(function(){ if(init()||++n>100) clearInterval(t); },100); } }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',wait); else wait();
})();
