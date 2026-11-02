/* Property tour for the 3D finder: a guided camera tour of the model, with Matterport scans at the stops that have them.
   Stops come from window.OR3D_PROPERTY_TOUR in the settings embed. Also routes accessible apartments to their own 3D tour
   (OR3D_UNIT_TOURS keys '1a', '2a'). Styles are added to the page head (the finder rebuilds its own markup on load, which would drop a style tag placed here). Starts from the button on the map, the button above the apartment list, or a link to #tour. */
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
