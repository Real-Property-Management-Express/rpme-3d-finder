/* Property tour for the 3D finder: a guided camera tour of the model, with Matterport scans at the stops that have them.
   Stops come from window.OR3D_PROPERTY_TOUR in the settings embed. Also routes accessible apartments to their own 3D tour
   (OR3D_UNIT_TOURS keys '1a', '2a'). Styles are added to the page head (the finder rebuilds its own markup on load, which would drop a style tag placed here). Starts from the button on the map, the button above the apartment list, or a link to #tour. */
(function(){if(document.getElementById('ptour-css'))return;var st=document.createElement('style');st.id='ptour-css';st.textContent="#or3d .ptour-go{appearance:none;display:inline-flex;align-items:center;gap:8px;border:0;cursor:pointer;font:700 14px/1 var(--f);text-transform:var(--t2-bcase,none);letter-spacing:var(--t2-btrack,normal)}#or3d .ptour-go svg{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}#or3d .ptour-map{position:absolute;left:16px;top:16px;z-index:5;height:42px;padding:0 16px;border:1px solid var(--line);border-radius:var(--t2-pill,999px);background:#fff;color:var(--navy);box-shadow:0 2px 8px rgba(0,30,60,.12)}#or3d .ptour-map:hover{background:var(--surface);border-color:var(--navy)}#or3d .ptour-map .ps{display:none}#or3d .ptour-panel{display:flex;width:100%;justify-content:center;margin:12px 0;height:44px;border:1.5px solid var(--navy)!important;border-radius:calc(9px*var(--t2-rk,1));background:#fff;color:var(--navy)}#or3d .ptour-panel:hover{background:var(--navy);color:#fff}#or3d.ptour-on .ptour-map{display:none}#or3d .ptour-card{position:absolute;left:16px;bottom:16px;z-index:9;width:min(380px,calc(100% - 32px));padding:16px 16px 14px;border:1px solid var(--line);border-radius:calc(14px*var(--t2-rk,1));background:#fff;box-shadow:var(--t2-shc,0 18px 44px rgba(0,30,60,.22));font-family:var(--f);color:var(--ink)}#or3d .ptour-card[hidden]{display:none!important}#or3d .ptour-step{margin:0 0 4px;font:700 11px/1.2 var(--f);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}#or3d .ptour-card h3{margin:0 0 6px;font:700 19px/1.25 var(--f);color:var(--navy)}#or3d .ptour-card p{margin:0;font:400 14.5px/1.5 var(--f);color:#4a4f57}#or3d .ptour-apt{margin:6px 0 0!important;font-size:13px!important;color:var(--muted)!important}#or3d .ptour-bar{height:3px;margin:12px 0 0;background:var(--line);border-radius:2px;overflow:hidden}#or3d .ptour-bar i{display:block;height:100%;width:0;background:var(--hl)}#or3d .ptour-scans{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0 0}#or3d .ptour-scans button,#or3d .ptour-end button{appearance:none;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border:1.5px solid var(--hl);border-radius:var(--t2-pill,999px);background:#fff;color:var(--navy);font:700 13px/1 var(--f);cursor:pointer}#or3d .ptour-scans button,#or3d .ptour-end button{transition:background-color .2s,color .2s,border-color .2s,transform .2s}#or3d .ptour-scans button:hover,#or3d .ptour-end button:hover{background:var(--navy);border-color:var(--navy);color:#fff;transform:translateY(-1px)}#or3d .ptour-end .pri:hover{background:var(--hl-dk,var(--navy));border-color:var(--hl-dk,var(--navy))}#or3d .ptour-ctl button{transition:border-color .2s,background-color .2s}#or3d .ptour-ctl button:hover:not(:disabled){background:#fff}@media (prefers-reduced-motion:reduce){#or3d .ptour-scans button:hover,#or3d .ptour-end button:hover{transform:none}}#or3d .ptour-scans svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round}#or3d .ptour-end{display:flex;gap:8px;margin:12px 0 0}#or3d .ptour-end button{flex:1;justify-content:center;padding:11px 10px;font-size:14px;text-transform:var(--t2-bcase,none)}#or3d .ptour-end .pri{background:var(--navy);border-color:var(--navy);color:#fff}#or3d .ptour-ctl{display:flex;align-items:center;gap:6px;margin:12px 0 0}#or3d .ptour-ctl button{appearance:none;display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--line);border-radius:calc(9px*var(--t2-rk,1));background:var(--surface);color:var(--ink);cursor:pointer}#or3d .ptour-ctl button:hover{border-color:var(--navy)}#or3d .ptour-ctl svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}#or3d .ptour-ctl .x{margin-left:auto;width:auto;padding:0 12px;font:600 13px var(--f)}#or3d .ptour-card button:focus-visible,#or3d .ptour-go:focus-visible{outline:2px solid var(--navy);outline-offset:2px}@media (max-width:767px){#or3d .ptour-map{left:12px;top:12px;height:38px;padding:0 12px;font-size:13px}#or3d .ptour-map .pl{display:none}#or3d .ptour-map .ps{display:inline}#or3d .ptour-card{left:8px;right:8px;bottom:calc(8px + env(safe-area-inset-bottom,0px));width:auto;padding:14px}#or3d .ptour-card h3{font-size:17px}#or3d .ptour-card p{font-size:14px}}@media (prefers-reduced-motion:reduce){#or3d .ptour-bar i{transition:none!important}}";document.head.appendChild(st);})();
(function(){
function init(){
var O=window.__or,T=window.THREE,cfg=window.OR3D_PROPERTY_TOUR;
if(!O||!O.controls||!T||!document.getElementById('omap')){return setTimeout(init,150);}
if(O._ptour)return;O._ptour=1;
var $=function(id){return document.getElementById(id);},root=$('or3d'),map=$('omap'),S=O.state;
var UT=window.OR3D_UNIT_TOURS||{},AM=window.OR3D_AMENITY_TOURS||[];
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,mob=function(){return matchMedia('(max-width:767px)').matches;};
var CUBE='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8 13.5 5v6L8 14.2 2.5 11V5zM2.5 5 8 8.2 13.5 5M8 8.2v6"/></svg>';
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

/* Matterport dialog: same one the finder uses for apartment tours */
function openScan(id,label){if(!id)return;var u='https://my.matterport.com/show/?m='+id;
$('tourTitle').innerHTML='3D tour <span>'+esc(label)+'</span>';$('tourOpen').href=u;$('tourFbLink').href=u;$('tourFallback').hidden=true;$('tourFrame').hidden=false;$('tourFrame').src=u+'&play=1&qs=1';$('tour').hidden=false;$('tourClose').focus();}

/* Accessible apartments open their own scan when one is set */
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-tour],[data-mc="tour"]');if(!t||!root.contains(t))return;var a=S.sel;if(!a||!a.ada)return;var id=UT[a.beds+'a'];if(!id)return;e.preventDefault();e.stopImmediatePropagation();openScan(id,a.nice+', accessible');},true);

if(!cfg||!cfg.stops||!cfg.stops.length)return;
var C0=cfg.origin||[595,675],K=cfg.scale||1.16;
function W(p){return{x:(p[0]-C0[0])/K,z:(p[1]-C0[1])/K};}
function scanId(name){for(var i=0;i<AM.length;i++)if(AM[i].name===name)return AM[i].id;return '';}

/* buttons (on phones the map button shortens to cfg.short, default 'Tour', so it clears the zoom controls) */
var ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="m10 8.5 5 3.5-5 3.5z"/></svg>',LBL=cfg.label||'Take the property tour';
var mb=document.createElement('button');mb.type='button';mb.className='ptour-go ptour-map';mb.setAttribute('aria-label',LBL);mb.innerHTML=ICON+'<span class="pl">'+esc(LBL)+'</span><span class="ps">'+esc(cfg.short||'Tour')+'</span>';map.appendChild(mb);
var cv=$('campusView');if(cv){var pb=document.createElement('button');pb.type='button';pb.className='ptour-go ptour-panel';pb.innerHTML=ICON+'<span>'+esc(LBL)+'</span>';cv.insertBefore(pb,cv.firstChild);pb.addEventListener('click',function(){start();});}
mb.addEventListener('click',function(){start();});

/* card */
var card=document.createElement('div');card.className='ptour-card';card.hidden=true;card.setAttribute('role','region');card.setAttribute('aria-label','Property tour');card.setAttribute('aria-live','polite');map.appendChild(card);
var P='<svg viewBox="0 0 16 16" aria-hidden="true">',IC={prev:P+'<path d="M10 3 5 8l5 5"/></svg>',next:P+'<path d="m6 3 5 5-5 5"/></svg>',pause:P+'<path d="M5.5 3v10M10.5 3v10"/></svg>',play:P+'<path d="M5 3v10l8-5z"/></svg>'};

/* {"units":true} in the stop list becomes one apartment stop per unique unit scan in OR3D_UNIT_TOURS */
var NUM=['Studio','One','Two','Three','Four'],ALL=[];O.BLDGS.forEach(function(b){b.apts.forEach(function(a){ALL.push(a);});});
function list(a){return a.length<3?a.join(' and '):a.slice(0,-1).join(', ')+', and '+a[a.length-1];}
function bnum(a){return String(a.id).split('-')[0];}
function unitStops(){var keys=Object.keys(UT).filter(function(k){return UT[k];}).sort(function(a,b){return parseInt(a,10)-parseInt(b,10)||a.length-b.length;});
 var nb={};ALL.forEach(function(a){nb[bnum(a)]=1;});nb=Object.keys(nb).length;
 var BL=[];ALL.forEach(function(a){if(BL.indexOf(bnum(a))<0)BL.push(bnum(a));});BL.sort();
 return keys.map(function(k,j){var beds=parseInt(k,10),acc=/a$/.test(k),pref=BL[j%BL.length];
  var c=ALL.filter(function(a){return +a.beds===beds&&!!a.ada===acc;});if(!c.length)return null;
  c.sort(function(x,y){return (bnum(x)!==pref)-(bnum(y)!==pref)||Math.abs(x.floor-1)-Math.abs(y.floor-1)||(x.id>y.id?1:-1);});
  var w=beds?(NUM[beds]||beds)+' bedroom':'Studio',lw=w.toLowerCase(),text;
  if(acc){var bl=[];c.forEach(function(x){if(bl.indexOf(bnum(x))<0)bl.push(bnum(x));});text='Accessible '+lw+' apartments are in '+(bl.length===nb&&nb>1?'every building':'building'+(bl.length>1?'s ':' ')+list(bl))+'.';}
  else{var sf=ALL.filter(function(x){return +x.beds===beds&&+x.sf;}).map(function(x){return +x.sf;});var lo=Math.min.apply(0,sf),hi=Math.max.apply(0,sf);
   text=w+' apartments '+(lo===hi?'are '+lo.toLocaleString('en-US'):'run from '+lo.toLocaleString('en-US')+' to '+hi.toLocaleString('en-US'))+' square feet.';}
  return {title:(acc?'Accessible '+lw:w)+' apartments',text:text+' Step inside one in 3D.',apt:c[0],scan:UT[k],beds:beds,acc:acc};}).filter(Boolean);}
var stops=[];cfg.stops.forEach(function(s){if(s.units)stops=stops.concat(unitStops());else stops.push(s);});
var i=-1,on=false,paused=false,timer=0,raf=0,t0=0,hold=(cfg.hold||7)*1000;
function stopTimers(){clearTimeout(timer);cancelAnimationFrame(raf);}
function bar(){var b=card.querySelector('.ptour-bar i');if(!b)return;var k=Math.min(1,(performance.now()-t0)/hold);b.style.width=(k*100)+'%';if(k<1&&on&&!paused)raf=requestAnimationFrame(bar);}
function schedule(fly){stopTimers();if(paused||i>=stops.length-1)return;t0=performance.now()+fly;timer=setTimeout(function(){go(i+1);},fly+hold);setTimeout(function(){if(on&&!paused){t0=performance.now();raf=requestAnimationFrame(bar);}},fly);}
function render(){var s=stops[i],last=i===stops.length-1,h='<p class="ptour-step">Stop '+(i+1)+' of '+stops.length+'</p><h3>'+esc(s.title)+'</h3><p>'+esc(s.text)+'</p>';
if(s.apt)h+='<p class="ptour-apt">Shown: apartment '+esc(s.apt.id)+'</p><div class="ptour-scans"><button type="button" data-uscan="1">'+CUBE+'Step inside in 3D</button></div>';
var sc=(s.scans||[]).filter(function(n){return scanId(n);});if(sc.length)h+='<div class="ptour-scans">'+sc.map(function(n){return '<button type="button" data-scan="'+esc(n)+'">'+CUBE+'Step inside: '+esc(n)+'</button>';}).join('')+'</div>';
if(last)h+='<div class="ptour-end"><button type="button" data-end="list">Browse apartments</button><button type="button" class="pri" data-end="sched">Schedule a tour</button></div>';else h+='<div class="ptour-bar"><i></i></div>';
h+='<div class="ptour-ctl"><button type="button" data-c="prev" aria-label="Previous stop"'+(i?'':' disabled')+'>'+IC.prev+'</button>'+(last?'':'<button type="button" data-c="pause" aria-label="'+(paused?'Resume the tour':'Pause the tour')+'">'+(paused?IC.play:IC.pause)+'</button><button type="button" data-c="next" aria-label="Next stop">'+IC.next+'</button>')+'<button type="button" class="x" data-c="exit">Exit tour</button></div>';
card.innerHTML=h;}
/* unit stops light up only that unit type (and accessible units on accessible stops); other stops put back the visitor's own filter */
var keep=null;function hl(s){if(!keep)keep={beds:S.beds,ada:S.ada};if(s&&s.apt){S.beds=s.beds;S.ada=!!s.acc;}else{S.beds=keep.beds;S.ada=keep.ada;}}
/* tall or narrow maps need the camera farther back, the same rule the finder uses when it frames a building */
function zk(){var a=map.clientWidth/Math.max(1,map.clientHeight);return Math.max(mob()?1.35:1,Math.min(1.7,1.15/a));}
function go(n){i=Math.max(0,Math.min(stops.length-1,n));var s=stops[i],ms=rm?0:(s.ms||2200);hl(s);
if(s.apt){if(S.sel!==s.apt)O.selectApt(s.apt);else O.apply();}else if(s.overview||S.sel||S.bldg){O.overview();}else O.apply();
if(!s.apt&&!s.overview){var w=W(s.at),y=s.h||10,az=(s.az||0)*Math.PI/180,el=(s.el||35)*Math.PI/180,d=(s.dist||300)*zk();
O.fly(new T.Vector3(w.x+d*Math.cos(el)*Math.sin(az),y+d*Math.sin(el),w.z+d*Math.cos(el)*Math.cos(az)),new T.Vector3(w.x,y,w.z),ms);}
render();schedule(ms);}
function start(){keep=null;if(S.bldg||S.sel)O.overview();if(mob()&&!root.classList.contains('ov-map')){var mt=$('mtoggle');if(mt)mt.click();}
on=true;paused=false;root.classList.add('ptour-on');card.hidden=false;var h=$('hint');if(h)h.classList.add('gone');go(0);setTimeout(function(){var b=card.querySelector('[data-c="next"]');if(b)b.focus({preventScroll:true});},50);}
function end(){if(!on)return;on=false;stopTimers();hl(null);keep=null;O.apply();card.hidden=true;root.classList.remove('ptour-on');mb.focus({preventScroll:true});}
card.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var c=b.getAttribute('data-c'),sc=b.getAttribute('data-scan'),en=b.getAttribute('data-end');
if(sc){paused=true;stopTimers();render();openScan(scanId(sc),sc);return;}
if(b.getAttribute('data-uscan')){var u=stops[i];paused=true;stopTimers();render();openScan(u.scan,'Apartment '+u.apt.id);return;}
if(en){end();if(en==='list'){O.overview();if(mob()&&root.classList.contains('ov-map')){var mt=$('mtoggle');if(mt)mt.click();}var p=$('panel');if(p)p.scrollTop=0;}else{var t=document.createElement('span');t.setAttribute('data-schedule','general');t.setAttribute('data-label','');t.style.display='none';document.body.appendChild(t);t.click();t.remove();}return;}
if(c==='exit')end();else if(c==='next')go(i+1);else if(c==='prev')go(i-1);else if(c==='pause'){paused=!paused;if(paused)stopTimers();render();if(!paused)schedule(0);var pb2=card.querySelector('[data-c="pause"]');if(pb2)pb2.focus();}});
O.controls.addEventListener('start',function(){if(on)end();});
addEventListener('keydown',function(e){if(!on||!$('tour').hidden)return;if(e.key==='Escape'){e.preventDefault();end();}else if(e.key==='ArrowRight'&&card.contains(document.activeElement))go(i+1);else if(e.key==='ArrowLeft'&&card.contains(document.activeElement))go(i-1);});
function hash(){if(/^#tour$/i.test(location.hash))setTimeout(start,700);}
addEventListener('hashchange',hash);hash();
window.OR3D_PTOUR={start:start,end:end,go:go};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
