(function(){
function q(s,r){return (r||document).querySelector(s);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function build(){
var root=document.getElementById('or3d'),body=root&&root.querySelector('.p-body');if(!body||body.querySelector('.of-foot'))return;
var F=q('section.footer')||q('footer'),links=[],socials=[],copy=[],seen={};
if(F){[].forEach.call(F.querySelectorAll('a'),function(a){var h=a.getAttribute('href')||'',t=(a.textContent||'').replace(/\s+/g,' ').trim(),img=a.querySelector('img');
if(img){if(h&&h!=='#'&&!/^javascript/i.test(h)&&!/maps|goo\.gl/i.test(h)&&/social/i.test(img.className+' '+a.className))socials.push({h:a.href,src:img.currentSrc||img.src,l:img.getAttribute('alt')||'Social'});return;}
if(!t||!h||h==='#'||/^(tel:|mailto:)/i.test(h)||/maps|goo\.gl/i.test(h)||/^\(?\d/.test(t)||t.indexOf('@')>-1||seen[t.toLowerCase()])return;seen[t.toLowerCase()]=1;links.push({t:t,h:h,b:a.getAttribute('target')==='_blank'});});
var w=document.createTreeWalker(F,NodeFilter.SHOW_TEXT,null),n;while((n=w.nextNode())){var s=(n.nodeValue||'').replace(/\s+/g,' ').trim();if(/^\u00a9/.test(s)&&copy.indexOf(s)<0)copy.push(s);}}
var logo=q('.w-nav-brand img')||q('.w-nav img'),eho=F&&(F.querySelector('img.fair-housing-logo')||F.querySelector('img[alt*="Housing"]')),rp=F&&F.querySelector('img.rpme-logo');
var ask=document.createElement('div');ask.className='of-ask';ask.innerHTML='Questions before you apply? <a href="/contact">Contact us &rarr;</a>';
var ft=document.createElement('footer');ft.className='of-foot';ft.innerHTML=
(links.length?'<nav class="of-foot-links" aria-label="Site links">'+links.map(function(l){return '<a href="'+esc(l.h)+'"'+(l.b?' target="_blank" rel="noopener"':'')+'>'+esc(l.t)+'</a>';}).join('')+'</nav>':'')
+(logo?'<a class="of-foot-logo" href="/" aria-label="Home"><img src="'+esc(logo.currentSrc||logo.src)+'" alt="'+esc(logo.getAttribute('alt')||'Home')+'"></a>':'')
+(copy.length?'<p class="of-foot-copy">'+copy.map(esc).join('<br>')+'</p>':'')
+(socials.length?'<div class="of-foot-social">'+socials.map(function(s){return '<a href="'+esc(s.h)+'" target="_blank" rel="noopener" aria-label="'+esc(s.l)+'"><img src="'+esc(s.src)+'" alt=""></a>';}).join('')+'</div>':'')
+'<div class="of-foot-bottom">'+(eho?'<span class="of-foot-eho"><img src="'+esc(eho.currentSrc||eho.src)+'" alt="" loading="lazy">Equal Housing Opportunity</span>':'')+(rp?'<span class="of-foot-rpme"><img src="'+esc(rp.currentSrc||rp.src)+'" alt="'+esc(rp.getAttribute('alt')||'Real Property Management Express')+'" loading="lazy"></span>':'')+'</div>';
body.appendChild(ask);body.appendChild(ft);
var panel=document.getElementById('panel');if(window.IntersectionObserver&&panel)new IntersectionObserver(function(es){es.forEach(function(e){root.classList.toggle('at-foot',e.isIntersecting);});},{root:panel,threshold:.15}).observe(ft);
}
function fit(){
var root=document.getElementById('or3d');if(!root)return;
var de=document.documentElement;de.classList.add('or3d-locked');window.scrollTo(0,0);
var nav=q('.w-nav'),nb=0;if(nav){var cs=getComputedStyle(nav);if(cs.position==='fixed'||cs.position==='sticky')nb=Math.max(0,Math.round(nav.getBoundingClientRect().bottom));}
de.style.setProperty('--or3d-nav',(nav?Math.max(0,Math.round(nav.getBoundingClientRect().bottom)):0)+'px');
root.style.marginTop='0px';
var top=Math.round(root.getBoundingClientRect().top+(window.pageYOffset||0));
if(top<nb){root.style.marginTop=(nb-top)+'px';top=nb;}
root.style.setProperty('--or3d-h',Math.max(360,window.innerHeight-top)+'px');
}
var sched=null,schedLast=null;
function closeSched(){if(sched&&!sched.hidden){sched.hidden=true;if(schedLast&&schedLast.focus)schedLast.focus();}}
function openSched(label){
var f=q('#floor-plans-3d .form-div .w-form')||(sched&&sched.querySelector('.w-form'));
if(!f){location.href='/contact';return;}
if(!sched){sched=document.createElement('div');sched.className='or3d-sched';sched.hidden=true;sched.setAttribute('role','dialog');sched.setAttribute('aria-modal','true');sched.setAttribute('aria-labelledby','or3dSchedT');
sched.innerHTML='<div class="sb"><div class="sh"><b id="or3dSchedT">Schedule a tour</b><button type="button" class="sx" aria-label="Close">\u00d7</button></div><p class="ss"></p><div class="sf"></div></div>';
document.body.appendChild(sched);sched.addEventListener('click',function(e){if(e.target===sched||e.target.closest('.sx'))closeSched();});}
var wrap=sched.querySelector('.sf');if(f.parentNode!==wrap)wrap.appendChild(f);
sched.querySelector('.ss').textContent='Apartment '+label+'. Share your contact info and our team will reach out to set up a time.';
var msg=f.querySelector('#Message,[name="Message"]');if(msg)msg.value="I'd like to schedule a tour of apartment "+label+'.';
schedLast=document.activeElement;sched.hidden=false;var first=f.querySelector('input:not([type=hidden]):not([type=submit])');if(first)first.focus();
}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-schedule]');if(b){e.preventDefault();openSched(b.getAttribute('data-label')||'');}});
addEventListener('keydown',function(e){if(e.key==='Escape'&&sched&&!sched.hidden){e.stopImmediatePropagation();e.preventDefault();closeSched();}},true);
function badge(){if((window.OR3D_PACK||{}).noBadge)return;var m=document.getElementById('omap');if(!m||m.querySelector('.or3d-badge'))return;var b=document.createElement('div');b.className='or3d-badge';b.innerHTML='<img alt="Overland Reserve" src="data:image/webp;base64,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">';m.appendChild(b);}
function sqParse(raw, now){
  now = now || new Date();
  var MONTHS=['january','february','march','april','may','june','july','august','september','october','november','december'];
  var MON_RE='(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)';
  var s=' '+String(raw||'').toLowerCase().replace(/[\u2018\u2019']/g,"'").replace(/\s+/g,' ')+' ';
  var NUM={zero:0,no:0,one:1,single:1,two:2,three:3,four:4};
  s=s.replace(/\b(zero|one|single|two|three|four)\b(?=[\s-]*(?:bed|br\b|bd\b|bdrm|bath|ba\b|or\b|and\b|to\b|\/))/g,function(m,w){return NUM[w];});
  var out={items:[]}, used=[];
  function take(re,fn){ s=s.replace(re,function(){ var r=fn.apply(null,arguments); return r===false?arguments[0]:' '; }); }
  function money(v,k){ v=parseFloat(String(v).replace(/[,$]/g,'')); if(k) v*=1000; return Math.round(v); }
  function fm(n){ return '$'+n.toLocaleString('en-US'); }
  // apartment number, whole query only
  var unit=String(raw||'').trim().match(/^(?:apt\.?|apartment|unit|#)?\s*(6[45]\d0)?[\s\-#]*(\d{3})?$/i);
  if(unit && (unit[1]||unit[2]) && String(raw).replace(/\D/g,'').length>=3){ out.unit=true; return out; }
  // move-in date
  var mi=null;
  take(new RegExp('\\b(?:move(?:-|\\s)?in|moving(?: in)?|available|availability|starting|start|by|in|for|around|beginning|begin|early|mid|late)?\\s*(?:of\\s+)?'+MON_RE+'\\.?(?:\\s+(\\d{1,2})(?:st|nd|rd|th)?)?(?:,?\\s*(?:of\\s+)?(\\d{4}|\'\\d{2}))?\\b','g'),function(m,mon,day,yr){
    var mIdx=MONTHS.findIndex(function(x){return x.indexOf(mon.slice(0,3))===0;}); if(mIdx<0) return false;
    var y=yr?(yr[0]==="'"?2000+ +yr.slice(1):+yr):null;
    if(y===null){ y=now.getFullYear(); if(mIdx<now.getMonth()) y++; }
    mi={y:y,m:mIdx,d:day?+day:1,text:m.trim()}; return true; });
  if(!mi) take(/\b(?:move(?:-|\s)?in|moving(?: in)?|available|starting|by|on)?\s*(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/g,function(m,a,b,c){
    var y=c?(c.length===2?2000+ +c:+c):now.getFullYear(); var d=new Date(y,+a-1,+b); if(!c && d<now) y++;
    mi={y:y,m:+a-1,d:+b,text:m.trim()}; return true; });
  if(!mi) take(/\b(?:move(?:-|\s)?in|moving(?: in)?|available|starting)?\s*(\d{1,2})\/(\d{4})\b/g,function(m,a,y){ mi={y:+y,m:+a-1,d:1,text:m.trim()}; return true; });
  if(!mi) take(/\b(?:move(?:-|\s)?in|moving(?: in)?|available)?\s*(asap|right away|immediately|now|this month|next month|this (?:spring|summer|fall|autumn|winter)|next (?:spring|summer|fall|autumn|winter)|(?:in the )?(?:spring|summer|fall|autumn|winter))\b/g,function(m,w){
    var y=now.getFullYear(), mo=now.getMonth();
    if(/asap|right away|immediately|now|this month/.test(w)){ mi={y:y,m:mo,d:now.getDate(),asap:true,text:m.trim()}; return true; }
    if(/next month/.test(w)){ mo++; if(mo>11){mo=0;y++;} mi={y:y,m:mo,d:1,text:m.trim()}; return true; }
    var S={spring:2,summer:5,fall:8,autumn:8,winter:11}, k=w.match(/spring|summer|fall|autumn|winter/)[0], sm=S[k];
    if(/next/.test(w)||sm<mo) y++;
    mi={y:y,m:sm,d:1,season:k==='autumn'?'fall':k,text:m.trim()}; return true; });
  if(mi){ var date=new Date(mi.y,mi.m,mi.d); out.moveIn={date:date,label: mi.asap?'ASAP': mi.season?(mi.season[0].toUpperCase()+mi.season.slice(1)+' '+mi.y):(MONTHS[mi.m][0].toUpperCase()+MONTHS[mi.m].slice(1,3)+(mi.d>1?' '+mi.d:'')+' '+mi.y)}; out.items.push({k:'moveIn',label:'Move-in '+out.moveIn.label,text:mi.text}); }
  // square feet (before price so "under 800 sq ft" isn't read as rent)
  take(/\b(?:(under|below|less than|smaller than|max(?:imum)?|up to|at most|over|above|more than|bigger than|larger than|at least|min(?:imum)?)\s+)?(\d[\d,]{2,4})\s*(?:\+\s*)?(?:sq\.?\s*f(?:ee)?t\.?|sqft|square\s*f(?:ee|oo)t|sf)\b/g,function(m,dir,n){
    n=money(n); var lo=0,hi=99999;
    if(dir && /under|below|less|smaller|max|up to|most/.test(dir)) hi=n; else lo=n;
    out.sqft=lo+'-'+hi; out.items.push({k:'sqft',label:(hi<99999?'Under '+n.toLocaleString('en-US'):n.toLocaleString('en-US')+'+')+' sq ft',text:m.trim()}); return true; });
  // rent: ranges
  take(/\b(?:between\s+)?\$\s?(\d[\d,.]*)(k)?\s*(?:-|to|and|–)\s*\$?\s?(\d[\d,.]*)(k)?\b/g,function(m,a,ak,b,bk){
    var lo=money(a,ak), hi=money(b,bk); if(hi<lo){var t=lo;lo=hi;hi=t;}
    out.price=lo+'-'+hi; out.items.push({k:'price',label:fm(lo)+' to '+fm(hi),text:m.trim()}); return true; });
  if(!out.price) take(/\b(?:around|about|approx(?:imately)?|roughly|~)\s*\$?\s?(\d[\d,.]*)(k)?\b(?!\s*(?:sq|square|sf))/g,function(m,n,k){ var v=money(n,k); if(v<300||v>20000) return false;
    var lo=Math.round(v*0.9/50)*50, hi=Math.round(v*1.1/50)*50; out.price=lo+'-'+hi; out.items.push({k:'price',label:'Around '+fm(v),text:m.trim()}); return true; });
  if(!out.price) take(/\b(under|below|less than|cheaper than|max(?:imum)?|up to|at most|no more than|within|budget(?: of| is)?|over|above|more than|at least|min(?:imum)?|starting at|from)\s+\$?\s?(\d[\d,.]*)(k)?\b(?!\s*(?:sq|square|sf))/g,function(m,dir,n,k){
    var v=money(n,k); if(v<300||v>20000) return false;
    var hi=!/over|above|more|least|min|starting|from/.test(dir);
    out.price=hi?('0-'+v):(v+'-99999'); out.items.push({k:'price',label:(hi?'Under ':'From ')+fm(v),text:m.trim()}); return true; });
  if(!out.price) take(/\$\s?(\d[\d,.]*)(k)?\b/g,function(m,n,k){ var v=money(n,k); if(v<300) return false; out.price='0-'+v; out.items.push({k:'price',label:'Under '+fm(v),text:m.trim()}); return true; });
  // bedrooms
  var beds=[];
  take(/\b(studio|efficiency|efficiencies|studios)\b/g,function(m){ beds.push(0); out.items.push({k:'beds',v:0,label:'Studio',text:m}); return true; });
  take(/\b([0-4])\s*(?:or|\/|to|and|-|,)\s*([0-4])\s*[- ]?(?:bed(?:room)?s?|br|bd|bdrm)\b/g,function(m,a,b){ a=+a; b=+b; for(var i=Math.min(a,b);i<=Math.max(a,b);i++){ beds.push(i); } out.items.push({k:'beds',v:[a,b],label:a+' or '+b+' bed',text:m.trim()}); return true; });
  take(/\b([0-4])\s*\+?\s*[- ]?(?:bed(?:room)?s?|br|bd|bdrm|b\/)(?=\b|\d)/g,function(m,a){ a=+a; if(beds.indexOf(a)>-1) return true; beds.push(a); out.items.push({k:'beds',v:a,label:a===0?'Studio':a+' bed',text:m.trim()}); return true; });
  if(beds.length) out.beds=beds.filter(function(v,i,a){return a.indexOf(v)===i;}).sort();
  // bathrooms
  take(/\b([1-3])(?:\.5)?\s*[- ]?(?:bath(?:room)?s?|ba)\b/g,function(m,a){ out.baths=(out.baths||[]); out.baths.push(+a); out.items.push({k:'baths',v:+a,label:a+' bath',text:m.trim()}); return true; });
  // floor
  take(/\b(first|1st|ground|bottom|lower|second|2nd|middle|third|3rd|fourth|4th|fifth|5th|sixth|6th|seventh|7th|eighth|8th|top|upper)\s*(?:-|\s)?(?:floor|level|story|storey)\b/g,function(m,w){
    var B=(window.__or&&window.__or.BLDGS&&window.__or.BLDGS[0])||{},base=B.base||1,nf=(B.floorGroups&&B.floorGroups.length)||3,W=['first','second','third','fourth','fifth','sixth','seventh','eighth'];
    var f=/ground|bottom|lower/.test(w)?0:/top|upper/.test(w)?nf-1:/middle/.test(w)?Math.floor((nf-1)/2):(W.indexOf(w)>-1?W.indexOf(w)+1:parseInt(w,10))-base;
    if(!(f>=0&&f<nf))return false;
    var n=f+base,sx=['th','st','nd','rd'],v=n%100;
    out.floor=f; out.items.push({k:'floor',label:n+(sx[(v-20)%10]||sx[v]||sx[0])+' floor',text:m.trim()}); return true; });
  take(/\b(?:no stairs|without stairs)\b/g,function(m){ out.floor=0; out.items.push({k:'floor',label:'1st floor',text:m}); return true; });
  // accessible
  take(/\b(accessible|accessibility|ada|wheelchair|handicap(?:ped)?(?: accessible)?|mobility)\b/g,function(m){ if(!out.ada){ out.ada=true; out.items.push({k:'ada',label:'Accessible',text:m}); } return true; });
  // building
  take(/\b(?:building|bldg\.?)?\s*(6400|6410|6420|6430|6440|6450|6460)\b(?:\s*bandel(?:\s*(?:rd|road))?(?:\s*nw)?)?/g,function(m,b){ out.bldg=b; out.items.push({k:'bldg',label:'Building '+b,text:m.trim()}); return true; });
  // premium finish
  take(/\b(premium|upgraded)\b/g,function(m){ out.premium=true; out.items.push({k:'premium',label:'Premium',text:m}); return true; });
  out.rest=s.replace(/\b(apartments?|apt|units?|homes?|place|for|a|an|the|with|and|or|in|on|that|is|i|im|i'm|want|need|looking|look|find|me|show|any|some|available|please|rent|rental|of|to|my|we|our|at|cheap|nice)\b/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
  return out;
}

function smart(){
var inp=document.getElementById('find'),root=document.getElementById('or3d'),O=window.__or;if(!inp||!O||inp._sq)return;inp._sq=1;var S=O.state;
var mob=matchMedia('(max-width:767px)').matches;
inp.placeholder=mob?'Try \u201c2 bed under $1,500\u201d':'Try \u201c2 bed under $1,500, move in January\u201d';
inp.setAttribute('aria-label','Search apartments in plain words, like 2 bed under $1,500, or by apartment number');
var said=document.createElement('div');said.className='sq-said';said.hidden=true;said.setAttribute('aria-live','polite');
var lh=root.querySelector('.of-lhead');lh.insertBefore(said,lh.firstChild);
var DEF={bedsS:[],bathsS:[],priceS:[],sqft:'',floorF:'',ada:false,plan:'',q:''},owned={},items=[],ORDER=['beds','baths','price','sqft','floor','ada','bldg','premium','moveIn'];
function $(id){return document.getElementById(id);}
function syncUI(){var sq=$('sqft');if(S.sqft&&![].some.call(sq.options,function(o){return o.value===S.sqft;})){var o=document.createElement('option');o.value=S.sqft;o.textContent=S.sqft.split('-')[1]==='99999'?S.sqft.split('-')[0]+' and up':'Under '+S.sqft.split('-')[1];sq.appendChild(o);}
sq.value=S.sqft;$('floorf').value=S.floorF;$('ada').checked=S.ada;$('plan').value=S.plan;}
function reset(){Object.keys(owned).forEach(function(k){S[k]=Array.isArray(DEF[k])?[]:DEF[k];});owned={};}
function own(k,v){owned[k]=1;S[k]=v;}
var CAL='<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="2"/><path d="M2 7h12M5 1.5v3M11 1.5v3"/></svg>';
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function paint(rest){
if(!items.length){ if(rest){said.innerHTML='<span class="hint">Try something like \u201c2 bed under $1,500\u201d or \u201caccessible studio, first floor\u201d.</span>';said.hidden=false;} else {said.innerHTML='';said.hidden=true;} return; }
items.sort(function(a,b){return ORDER.indexOf(a.k)-ORDER.indexOf(b.k);});
said.innerHTML=items.map(function(it,i){var mi=it.k==='moveIn';return '<span class="tk'+(mi?' mi':'')+'"'+(mi?' title="Live availability for this date is coming soon"':'')+'>'+(mi?CAL:'')+esc(it.label)+'<button type="button" data-i="'+i+'" aria-label="Remove '+esc(it.label)+'">\u00d7</button></span>';}).join('')+'<button type="button" class="clr">Clear</button>';
said.hidden=false;}
function run(q){
var pn=null,pt='';[].map.call($('plan').options,function(o){return o.value;}).filter(Boolean).sort(function(a,b){return b.length-a.length;}).some(function(n){var m=String(q).match(new RegExp('(^|[^a-z0-9])('+n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')(?![a-z0-9])','i'));if(m){pn=n;pt=m[2];return true;}return false;});
var r=sqParse(pn?String(q).replace(pt,' '):q);reset();items=[];
if(pn){if(S.bldg&&!S.stay)O.overview();S.view='a';own('plan',pn);r.items.push({k:'plan',label:pn,text:pt});}
if(!pn&&(!String(q).trim()||r.unit)){window.OR3D_MOVEIN=null;paint('');O.apply();return false;}
if(S.bldg&&!S.stay)O.overview();
S.view='a';
if(r.beds)own('bedsS',r.beds.slice());
if(r.baths)own('bathsS',r.baths.slice());
if(r.price)own('priceS',[r.price]);
if(r.sqft)own('sqft',r.sqft);
if(r.floor!=null)own('floorF',String(r.floor));
if(r.ada)own('ada',true);
if(r.bldg)own('q',r.bldg);
if(r.premium){var opts=[].map.call($('plan').options,function(o){return o.value;}).filter(function(v){return /premium/i.test(v)&&(!r.beds||r.beds.some(function(b){return b===0?/studio/i.test(v):new RegExp('^\\D*'+b+'\\s*bed','i').test(v);}));});
if(opts.length===1)own('plan',opts[0]);else r.items=r.items.filter(function(i){return i.k!=='premium';});}
items=r.items;window.OR3D_MOVEIN=r.moveIn||null;
try{root.dispatchEvent(new CustomEvent('or3d:movein',{detail:r.moveIn||null,bubbles:true}));}catch(e){}
syncUI();O.apply();paint(r.rest);after();return true;}
function aptsAll(){var a=[];O.BLDGS.forEach(function(b){a=a.concat(b.apts);});return a;}
function fitsBut(a,skipPrice){if(S.bedsS.length&&S.bedsS.indexOf(a.beds)<0)return false;if(S.bathsS.length&&S.bathsS.indexOf(a.baths)<0)return false;if(S.ada&&!a.ada)return false;if(S.floorF!==''&&a.floor!==+S.floorF)return false;if(S.plan&&a.nice!==S.plan)return false;
if(S.sqft){var z=S.sqft.split('-');if(a.sf<+z[0]||a.sf>=+z[1])return false;}if(S.q&&(a.b.num+a.unit).indexOf(S.q)<0)return false;
if(!skipPrice&&S.priceS.length&&!S.priceS.some(function(k){var r=k.split('-');return a.rent>=+r[0]&&a.rent<=+r[1];}))return false;return true;}
function fmt(n){return '$'+n.toLocaleString('en-US');}
function after(){var old=said.querySelector('.miss');if(old)old.remove();if(!items.length)return;
var all=aptsAll(),n=all.filter(function(a){return fitsBut(a,false);}).length;if(n)return;
var d=document.createElement('p');d.className='miss';var pi=items.findIndex(function(i){return i.k==='price';});
if(pi>-1&&owned.priceS){var alt=all.filter(function(a){return fitsBut(a,true);});if(alt.length){var lo=Math.min.apply(0,alt.map(function(a){return a.rent;})),hi=Math.max.apply(0,alt.map(function(a){return a.rent;}));
d.innerHTML='Nothing fits that price. The rest of your search runs '+(lo===hi?fmt(lo):fmt(lo)+' to '+fmt(hi))+'. <button type="button" data-i="'+pi+'">Show those '+alt.length+'</button>';said.appendChild(d);return;}}
d.textContent='No apartments match all of that. Try removing a tag.';said.appendChild(d);}
var mt=document.getElementById('match');new MutationObserver(function(){if(!owned.q||!items.length)return;var want='apartments in building '+S.q;if(mt.textContent.indexOf(want)>-1)return;
var c=document.querySelectorAll('#alist .urow').length;mt.innerHTML='<b>'+c+'</b> '+(c===1?'apartment':want.replace('apartments','apartments'))+(c===1?' in building '+S.q:'');}).observe(mt,{childList:true,characterData:true,subtree:true});

root.addEventListener('input',function(e){if(e.target!==inp)return;if(run(inp.value)){e.stopPropagation();}},true);
root.addEventListener('keydown',function(e){if(e.target!==inp||e.key!=='Enter')return;var r=sqParse(inp.value);if(r.unit||!inp.value.trim())return;e.preventDefault();e.stopPropagation();inp.blur();if(root.classList.contains('ov-map')){var t=$('mtoggle');if(t)t.click();}},true);
said.addEventListener('click',function(e){var x=e.target.closest('[data-i]');
if(e.target.closest('.clr')){inp.value='';run('');O.apply();return;}
if(!x)return;var it=items[+x.getAttribute('data-i')];if(!it)return;
var v=inp.value,i=v.toLowerCase().indexOf(it.text.toLowerCase());
inp.value=(i>-1?v.slice(0,i)+v.slice(i+it.text.length):v).replace(/\s{2,}/g,' ').replace(/^[\s,]+|[\s,]+$/g,'');
run(inp.value);});
var fm=$('fmore');function manual(){if(!items.length)return;owned={};items=[];inp.value='';paint('');}
fm.addEventListener('click',function(e){if(e.target.closest('.chips button')||e.target.closest('#clearf'))manual();},true);
fm.addEventListener('change',manual,true);
}
document.addEventListener('DOMContentLoaded',function(){build();badge();smart();fit();setTimeout(fit,60);});
addEventListener('load',function(){fit();setTimeout(fit,300);});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(fit,90);});
})();
