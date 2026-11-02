(function(){if(document.getElementById("or3d-tpl"))return;var t=document.createElement("template");t.id="or3d-tpl";t.innerHTML="<header class=\"of-bar\">\n    <h1 class=\"of-title\">Floor Plans &amp; Availability<span>Overland Reserve, Rochester, Minnesota</span></h1>\n    <label class=\"of-search\"><svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><circle cx=\"8.5\" cy=\"8.5\" r=\"5.5\"/><path d=\"m13 13 4.5 4.5\"/></svg><input id=\"find\" type=\"search\" autocomplete=\"off\" placeholder=\"Search an apartment, like 6410-203\" aria-label=\"Search for an apartment by building and apartment number\"></label>\n    <button type=\"button\" class=\"ftoggle\" id=\"ftoggle\" aria-expanded=\"false\" aria-controls=\"fmore\"><svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M2 4h12M4.5 8h7M7 12h2\"/></svg><span class=\"lbl\">Filters</span><b id=\"fcount\" hidden></b></button>\n  </header>\n  <div class=\"fmore\" id=\"fmore\">\n    <div class=\"fgrp\"><span class=\"flbl\" id=\"lb-beds\">Bedrooms</span><div class=\"chips\" data-f=\"beds\" role=\"group\" aria-labelledby=\"lb-beds\"><button type=\"button\" data-v=\"0\" aria-pressed=\"false\">Studio</button><button type=\"button\" data-v=\"1\" aria-pressed=\"false\">1 bed</button><button type=\"button\" data-v=\"2\" aria-pressed=\"false\">2 bed</button><button type=\"button\" data-v=\"3\" aria-pressed=\"false\">3 bed</button></div></div>\n    <div class=\"fgrp\"><span class=\"flbl\" id=\"lb-baths\">Bathrooms</span><div class=\"chips\" data-f=\"baths\" role=\"group\" aria-labelledby=\"lb-baths\"><button type=\"button\" data-v=\"1\" aria-pressed=\"false\">1 bath</button><button type=\"button\" data-v=\"2\" aria-pressed=\"false\">2 bath</button></div></div>\n    <div class=\"fgrp\"><span class=\"flbl\" id=\"lb-price\">Monthly rent</span><div class=\"chips\" data-f=\"price\" role=\"group\" aria-labelledby=\"lb-price\"><button type=\"button\" data-v=\"0-1399\" aria-pressed=\"false\">Under $1,400</button><button type=\"button\" data-v=\"1400-1599\" aria-pressed=\"false\">$1,400&ndash;$1,599</button><button type=\"button\" data-v=\"1600-1799\" aria-pressed=\"false\">$1,600&ndash;$1,799</button><button type=\"button\" data-v=\"1800-99999\" aria-pressed=\"false\">$1,800+</button></div></div>\n    <div class=\"fgrid\">\n      <label>Square feet<select id=\"sqft\"><option value=\"\">Any</option><option value=\"0-500\">Under 500</option><option value=\"500-700\">500 to 700</option><option value=\"700-900\">700 to 900</option><option value=\"900-99999\">900 and up</option></select></label>\n      <label>Floor plan<select id=\"plan\"><option value=\"\">Any</option></select></label>\n      <label>Floor<select id=\"floorf\"><option value=\"\">Any</option><option value=\"0\">1st</option><option value=\"1\">2nd</option><option value=\"2\">3rd</option></select></label>\n    </div>\n    <div class=\"frow\"><label class=\"ada\"><input type=\"checkbox\" id=\"ada\"> Accessible only</label><button type=\"button\" class=\"clear\" id=\"clearf\">Reset filters</button></div>\n  </div>\n  <div class=\"of-body\">\n    <aside id=\"panel\" aria-label=\"Apartments and buildings\">\n      <div class=\"p-body\">\n        <div class=\"of-lhead\"><p class=\"match\" id=\"match\"></p><ul class=\"legend lk-leg\" id=\"legend\"></ul></div>\n        <div id=\"campusView\">\n          <div class=\"ctabs\" role=\"group\" aria-label=\"Show\">\n            <button type=\"button\" data-v=\"a\" aria-pressed=\"true\">Apartments</button>\n            <button type=\"button\" data-v=\"b\" aria-pressed=\"false\">Buildings</button>\n          </div>\n          <ul class=\"blist\" id=\"blist\" style=\"margin-top:10px\" hidden></ul>\n          <div id=\"aview\"><ul class=\"ulist\" id=\"alist\"></ul></div>\n        </div>\n        <div id=\"bldgView\" hidden>\n      <button type=\"button\" class=\"back\" id=\"back\"><svg viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 3 5 8l5 5\"/></svg>All buildings</button>\n      <p class=\"btitle\" id=\"btitle\"></p>\n      <p class=\"bsub\" id=\"bsub\"></p>\n      <div class=\"floors\" role=\"group\" aria-label=\"Floor\">\n        <button type=\"button\" data-floor=\"all\" aria-pressed=\"true\">All</button>\n        <button type=\"button\" data-floor=\"0\" aria-pressed=\"false\">1st</button>\n        <button type=\"button\" data-floor=\"1\" aria-pressed=\"false\">2nd</button>\n        <button type=\"button\" data-floor=\"2\" aria-pressed=\"false\">3rd</button>\n      </div>\n      <div id=\"card\"></div>\n      <ul class=\"ulist\" id=\"ulist\"></ul>\n    </div>\n        <p class=\"note\">Rents shown are current advertised rents and can change. Contact our team to confirm pricing.</p>\n      </div>\n    </aside>\n    <div class=\"of-map\" id=\"omap\">\n      <canvas id=\"scene\" tabindex=\"0\" aria-label=\"3D model of Overland Reserve. Use the list to choose buildings and apartments.\"></canvas>\n      <div id=\"labels\" aria-hidden=\"true\"></div>\n      <div id=\"tip\" role=\"status\"></div>\n      <div id=\"loading\">Loading the community model</div>\n      <p class=\"hint\" id=\"hint\">Drag to turn the view, pinch or use the + and \u2212 buttons to zoom, then pick a building.</p>\n      <div id=\"ctrls\">\n  <button type=\"button\" class=\"cbtn\" id=\"zin\" title=\"Zoom in\" aria-label=\"Zoom in\"><svg viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M8 3v10M3 8h10\"/></svg></button>\n  <button type=\"button\" class=\"cbtn\" id=\"zout\" title=\"Zoom out\" aria-label=\"Zoom out\"><svg viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M3 8h10\"/></svg></button>\n  <button type=\"button\" class=\"cbtn\" id=\"compass\" title=\"North\" aria-label=\"Compass, north\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 2 16 12H8z\" fill=\"#c4452f\"/><path d=\"M12 22 8 12h8z\" fill=\"currentColor\" opacity=\".5\"/></svg></button>\n  <button type=\"button\" class=\"cbtn\" id=\"reset\"><svg viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2.5 8a5.5 5.5 0 1 0 1.6-3.9M2.5 2.5v3h3\"/></svg><span class=\"lbl\">Reset view</span></button>\n</div>\n      <div id=\"mcard\" aria-live=\"polite\"></div>\n      <div class=\"ztip\" id=\"ztip\" aria-hidden=\"true\"></div>\n    </div>\n  </div>\n  <button type=\"button\" class=\"of-pill\" id=\"mtoggle\"></button>\n  <div id=\"tour\" class=\"tour\" hidden role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"tourTitle\">\n  <div class=\"tour-box\">\n    <div class=\"tour-head\"><b id=\"tourTitle\"></b><a id=\"tourOpen\" href=\"#\" target=\"_blank\" rel=\"noopener\">Open in a new tab</a><button type=\"button\" class=\"tour-x\" id=\"tourClose\" aria-label=\"Close the tour\">\u00d7</button></div>\n    <iframe id=\"tourFrame\" title=\"Matterport 3D tour\" allow=\"autoplay; fullscreen; web-share; xr-spatial-tracking\" allowfullscreen></iframe>\n    <div id=\"tourFallback\" class=\"tour-fb\" hidden><p>This 3D tour opens in Matterport.</p><a id=\"tourFbLink\" href=\"#\" target=\"_blank\" rel=\"noopener\">Open the 3D tour</a></div>\n  </div>\n</div>\n  <div id=\"fpbox\" class=\"fpbox\" hidden role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"fpTitle\">\n    <div class=\"fpbox-in\">\n      <div class=\"tour-head\"><b id=\"fpTitle\"></b><button type=\"button\" class=\"tour-x\" id=\"fpClose\" aria-label=\"Close the floor plan\">\u00d7</button></div>\n      <img id=\"fpImg\" alt=\"\">\n    </div>\n  </div>";document.head.appendChild(t);})();
var PLANS = {
B:  {name:'B',   beds:1, baths:1, sf:596},
B2: {name:'B-2', beds:1, baths:1, sf:608},
C:  {name:'C',   beds:2, baths:2, sf:850},
D:  {name:'D',   beds:3, baths:2, sf:1111},
I:  {name:'I',   beds:1, baths:1, sf:529},
J:  {name:'J',   beds:0, baths:1, sf:535},
K:  {name:'K',   beds:0, baths:1, sf:467},
L:  {name:'L',   beds:1, baths:1, sf:467},
M:  {name:'M',   beds:2, baths:2, sf:1021},
N:  {name:'N',   beds:3, baths:2, sf:1111, ada:true},
O:  {name:'O',   beds:2, baths:2, sf:850,  ada:true}
};
var DIR = window.DIR || [];
function shortTitle(t){ return String(t||'').replace(/Bedrooms?/g,'Bed').replace(/Bathrooms?/g,'Bath').replace(/\s*Apartment\s*$/,'').replace(/\bType\s+/,'').replace(/\s+/g,' ').trim(); }
function money(n){ return n>0 ? '$'+n.toLocaleString('en-US') : 'Call for pricing'; }
var BEDS = [
{k:0, label:'Studio', color:'#9cc0b6'},
{k:1, label:'1 bed',  color:'#ead7b8'},
{k:2, label:'2 bed',  color:'#CE9864'},
{k:3, label:'3 bed',  color:'#3e6894'}
];
function bedColor(b){ return BEDS[b].color; }
function bedText(p){ return p.beds===0 ? 'Studio' : p.beds+' bed'; }
var W = 64.5, D = 62.5, FH = 10.5, H = FH*3;
var RECT = {
BL:[0,0,22.3,31], FL:[0,31,22.3,62.5],
KC:[22.3,0,40.5,21], IR:[40.5,0,64.5,21], JR:[40.5,21,64.5,41], LR:[40.5,41,64.5,62.5],
TOP:[22.3,0,64.5,21], RIGHT:[40.5,21,64.5,62.5], CORE:[22.3,21,40.5,62.5]
};
var IC={
bldg:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 14.5V2.5h7v12M10 6.5h3.5v8M5.2 5h2.6M5.2 7.8h2.6M5.2 10.6h2.6M1.5 14.5h13"/></svg>',
unit:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.3 2 5 14M11.3 2 10 14M2.5 5.5h11M2 10.5h11"/></svg>',
floor:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2 1.5 5.5 8 9l6.5-3.5zM1.5 8.6 8 12.1l6.5-3.5"/></svg>',
area:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"/></svg>',
acc:'<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8.5" cy="2.6" r="1.2"/><path d="M8.5 5v4h3.2l1.6 3.4M8.5 7H6M6.4 8.8a3.4 3.4 0 1 0 4.7 4.1"/></svg>',
tour:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8 13.5 5v6L8 14.2 2.5 11V5zM2.5 5 8 8.2 13.5 5M8 8.2v6"/></svg>'
};
var TOURS={0:'r6akUu2Da98',1:'pNaaNWvzqPP',2:'ygW9L37Guiz',3:'FQR6ZZqJstd'};
var FP_SVG='<svg viewBox="0 0 48 40" aria-hidden="true"><rect x="3" y="3" width="42" height="34" rx="1.5"/><path d="M3 20h15M26 3v15M26 26v11M18 20v8M34 20h11"/><path d="M18 28a8 8 0 0 1 8-8" stroke-dasharray="2 2.5"/></svg>';
var IC_LIST='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5h10M7 10h10M7 15h10"/><circle cx="3.5" cy="5" r=".8"/><circle cx="3.5" cy="10" r=".8"/><circle cx="3.5" cy="15" r=".8"/></svg>';
var IC_MAP='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2 17 6v8l-7 4-7-4V6z"/><path d="M3 6l7 4 7-4M10 10v8"/></svg>';
var TYPES = {
'14A': {
label:'14 apartments',
floors:[
[{p:'B',u:'01',r:'BL'},{p:'B2',u:'02',r:'FL'},{p:'K',u:'03',r:'KC'},{p:'L',u:'04',r:'LR'},{p:'J',u:'05',r:'JR'},{p:'I',u:'06',r:'IR'},{a:'Stairs and hallway',r:'CORE'}],
[{p:'B',u:'01',r:'BL'},{p:'B2',u:'02',r:'FL'},{p:'C',u:'03',r:'TOP'},{p:'M',u:'04',r:'RIGHT'},{a:'Stairs and hallway',r:'CORE'}],
[{p:'B',u:'01',r:'BL'},{p:'B2',u:'02',r:'FL'},{p:'C',u:'03',r:'TOP'},{p:'D',u:'04',r:'RIGHT'},{a:'Stairs and hallway',r:'CORE'}]
]
},
'10B': {
label:'10 apartments, leasing office and community room',
office:true,
floors:[
[{a:'Community room',r:'BL'},{a:'Leasing office, lobby and mail',r:'FL'},{p:'O',u:'01',r:'TOP'},{p:'N',u:'02',r:'RIGHT'},{a:'Stairs and hallway',r:'CORE'}],
[{p:'B',u:'01',r:'BL'},{p:'B2',u:'02',r:'FL'},{p:'C',u:'03',r:'TOP'},{p:'M',u:'04',r:'RIGHT'},{a:'Stairs and hallway',r:'CORE'}],
[{p:'B',u:'01',r:'BL'},{p:'B2',u:'02',r:'FL'},{p:'C',u:'03',r:'TOP'},{p:'D',u:'04',r:'RIGHT'},{a:'Stairs and hallway',r:'CORE'}]
]
}
};
function rnd(a,b){ return a+Math.random()*(b-a); }
function boards(base,vary,streak){
return function(g,w,h){
var rows=16, rh=h/rows;
for(var r=0;r<rows;r++){
var v=Math.round(rnd(-vary,vary));
g.fillStyle=shade(base,v); g.fillRect(0,r*rh,w,rh);
for(var s=0;s<14;s++){ g.fillStyle='rgba('+streak+','+rnd(.04,.12)+')'; g.fillRect(rnd(0,w),r*rh+rnd(2,rh-3),rnd(16,90),rnd(1,2)); }
g.fillStyle='rgba(255,255,255,.07)'; g.fillRect(0,r*rh,w,1);
g.fillStyle='rgba(0,0,0,.38)'; g.fillRect(0,r*rh+rh-2,w,2);
}
};
}
function shade(hex,v){
var n=parseInt(hex.slice(1),16), r=(n>>16)+v, gg=((n>>8)&255)+v, b=(n&255)+v;
function c(x){return Math.max(0,Math.min(255,x));}
return 'rgb('+c(r)+','+c(gg)+','+c(b)+')';
}
function windowsFor(type){
var list=[];
function add(face,u,fl,w,h,sill){ list.push({face:face,u:u,fl:fl,w:w,h:h,sill:sill==null?1.4:sill}); }
for(var f=0;f<3;f++){
add('front',-28,f,3,7.4); add('front',-21,f,4.2,7.6);
if(f>0){ add('front',-8,f,9,8.4,0.8); } else { add('front',-8,f,9,9.2,0.2); }
add('front',12.5,f,3,3,4.6); add('front',23,f,4,7.4); add('front',29,f,2,7.4);
add('back',-27,f,3,7.4); add('back',-16,f,4.2,7.4); add('back',-4,f,3,3,4.6); add('back',9,f,9,7.6); add('back',24,f,4.2,7.4);
add('left',-25,f,3,7.4); add('left',-14,f,8.5,8.2,0.3); add('left',4,f,8.5,8.2,0.3); add('left',22,f,3,7.4);
add('right',-24,f,4,7.4); add('right',-12,f,9,8.2,0.3); add('right',25,f,3,7.4);
}
return list;
}
function faceXform(face,u,y){
if(face==='front') return {x:u,y:y,z:hd+0.25,ry:0};
if(face==='back')  return {x:-u,y:y,z:-hd-0.25,ry:Math.PI};
if(face==='left')  return {x:-hw-0.25,y:y,z:u,ry:-Math.PI/2};
return {x:hw+0.25,y:y,z:-u,ry:Math.PI/2};
}
function ease(t){ return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2; }
function aptLine(a){ return (a.beds===0?'Studio':a.beds+' bed')+', '+a.baths+' bath'+(a.baths>1?'s':'')+', '+a.sf.toLocaleString('en-US')+' sq ft'; }
var hw=W/2, hd=D/2;
try{
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
function openScan(id,label){if(!id)return;var u='https://my.matterport.com/show/?m='+id;
$('tourTitle').innerHTML='3D tour <span>'+esc(label)+'</span>';$('tourOpen').href=u;$('tourFbLink').href=u;$('tourFallback').hidden=true;$('tourFrame').hidden=false;$('tourFrame').src=u+'&play=1&qs=1';$('tour').hidden=false;$('tourClose').focus();}
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-tour],[data-mc="tour"]');if(!t||!root.contains(t))return;var a=S.sel;if(!a||!a.ada)return;var id=UT[a.beds+'a'];if(!id)return;e.preventDefault();e.stopImmediatePropagation();openScan(id,a.nice+', accessible');},true);
if(!cfg||!cfg.stops||!cfg.stops.length)return;
var C0=cfg.origin||[595,675],K=cfg.scale||1.16;
function W(p){return{x:(p[0]-C0[0])/K,z:(p[1]-C0[1])/K};}
function scanId(name){for(var i=0;i<AM.length;i++)if(AM[i].name===name)return AM[i].id;return '';}
var ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="m10 8.5 5 3.5-5 3.5z"/></svg>',LBL=cfg.label||'Take the property tour';
var mb=document.createElement('button');mb.type='button';mb.className='ptour-go ptour-map';mb.setAttribute('aria-label',LBL);mb.innerHTML=ICON+'<span class="pl">'+esc(LBL)+'</span><span class="ps">'+esc(cfg.short||'Tour')+'</span>';map.appendChild(mb);
mb.addEventListener('click',function(){start();});
var card=document.createElement('div');card.className='ptour-card';card.hidden=true;card.setAttribute('role','region');card.setAttribute('aria-label','Property tour');card.setAttribute('aria-live','polite');map.appendChild(card);
var P='<svg viewBox="0 0 16 16" aria-hidden="true">',IC={prev:P+'<path d="M10 3 5 8l5 5"/></svg>',next:P+'<path d="m6 3 5 5-5 5"/></svg>',pause:P+'<path d="M5.5 3v10M10.5 3v10"/></svg>',play:P+'<path d="M5 3v10l8-5z"/></svg>'};
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
var keep=null;function hl(s){if(!keep)keep={beds:S.beds,ada:S.ada};if(s&&s.apt){S.beds=s.beds;S.ada=!!s.acc;}else{S.beds=keep.beds;S.ada=keep.ada;}}
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
}catch(e){console.error(e);}
try{
(function(){
var CSS="#or3d .xp{margin:12px 0;border:1.5px solid var(--line);border-radius:calc(10px*var(--t2-rk,1));background:#fff;overflow:hidden}"+
"#or3d .xp-btn{appearance:none;display:flex;align-items:center;gap:10px;width:100%;height:46px;padding:0 14px;border:0;background:#fff;color:var(--navy);font:700 14px/1 var(--f);text-transform:var(--t2-bcase,none);letter-spacing:var(--t2-btrack,normal);cursor:pointer;text-align:left}"+
"#or3d .xp-btn:hover{background:var(--surface)}#or3d .xp-btn svg{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}"+
"#or3d .xp-btn .xp-ch{margin-left:auto;transition:transform .2s}#or3d .xp-btn[aria-expanded=true] .xp-ch{transform:rotate(180deg)}"+
"#or3d .xp-menu{border-top:1px solid var(--line)}#or3d .xp-menu[hidden]{display:none}"+
"#or3d .xp-menu .ptour-panel,#or3d .xp-menu .pk-panel{display:flex;justify-content:flex-start;width:100%;height:44px;margin:0;padding:0 14px;border:0!important;border-bottom:1px solid var(--line)!important;border-radius:0;background:#fff;color:var(--ink);font-size:14px;text-transform:none;letter-spacing:0}"+
"#or3d .xp-menu>:last-child{border-bottom:0!important}#or3d .xp-menu .ptour-panel:hover,#or3d .xp-menu .pk-panel:hover{background:var(--surface);color:var(--navy)}"+
"#or3d .xp-menu .amt{margin:0;padding:10px 14px 12px;border:0;border-radius:0;background:#fff}#or3d .xp-menu .amt b{margin-bottom:8px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}"+
"#or3d .xp-menu .amt button{padding:6px 10px;font-size:12.5px}"+
"#or3d .xp-btn:focus-visible,#or3d .xp-menu button:focus-visible{outline:2px solid var(--navy);outline-offset:-2px}"+
"@media (max-width:767px){#or3d .road.amp{display:none!important}}";
if(!document.getElementById('xp-css')){var st=document.createElement('style');st.id='xp-css';st.textContent=CSS;document.head.appendChild(st);}
var tries=0;
function init(){
var cv=document.getElementById('campusView');
var tour=cv&&cv.querySelector('.ptour-panel'),park=cv&&cv.querySelector('.pk-panel'),amt=cv&&cv.querySelector('.amt');
if((!cv||!tour||!park||!amt)&&tries++<27)return setTimeout(init,150);
if(!cv||cv.querySelector('.xp'))return;
var items=[tour,amt,park].filter(Boolean);if(items.length<2)return;
var wrap=document.createElement('div');wrap.className='xp';
wrap.innerHTML='<button type="button" class="xp-btn" aria-expanded="false" aria-controls="xpMenu"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg><span>Explore the property</span><svg class="xp-ch" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button><div class="xp-menu" id="xpMenu" hidden></div>';
cv.insertBefore(wrap,cv.firstChild);
var menu=wrap.querySelector('.xp-menu'),btn=wrap.querySelector('.xp-btn');
items.forEach(function(el){menu.appendChild(el);});
btn.addEventListener('click',function(){var o=btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',String(o));menu.hidden=!o;});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
}catch(e){console.error(e);}
try{
(function(){
var CSS="#or3d .osrow{display:flex;align-items:center;justify-content:space-between;gap:10px}#or3d .osrow .match{margin:0}"+
"#or3d .osort{display:inline-flex;align-items:center;gap:6px;flex:none;font:600 12.5px/1 var(--f);color:var(--muted)}"+
"#or3d .osort select{appearance:auto;height:30px;padding:0 6px;border:1px solid var(--line);border-radius:calc(7px*var(--t2-rk,1));background:var(--surface);color:var(--ink);font:500 13px var(--f);cursor:pointer}"+
"#or3d .osort select:hover{border-color:var(--navy)}#or3d .osort select:focus-visible{outline:2px solid var(--navy);outline-offset:1px}"+
"#or3d:has(#campusView[hidden]) .osort,#or3d:has(#aview[hidden]) .osort{display:none}"+
"@media (max-width:767px){#or3d .osort span{display:none}#or3d .osort select{font-size:16px;height:32px}}";
if(!document.getElementById('osort-css')){var st=document.createElement('style');st.id='osort-css';st.textContent=CSS;document.head.appendChild(st);}
var tries=0;
function init(){
var O=window.__or,ul=document.getElementById('alist'),mt=document.getElementById('match'),inp=document.getElementById('find');
if((!O||!O.BLDGS||!ul||!mt||!inp||!inp._sq)&&tries++<80)return setTimeout(init,150);
if(!O||!ul||!mt||ul._os)return;ul._os=1;
var row=document.createElement('div');row.className='osrow';mt.parentNode.insertBefore(row,mt);row.appendChild(mt);
var lab=document.createElement('label');lab.className='osort';
lab.innerHTML='<span>Sort</span><select aria-label="Sort apartments"><option value="rent">Price: low to high</option><option value="rent-d">Price: high to low</option><option value="sf-d">Size: largest first</option><option value="sf">Size: smallest first</option></select>';
row.appendChild(lab);var sel=lab.querySelector('select'),mode='rent';
var BY={};O.BLDGS.forEach(function(b){b.apts.forEach(function(a){BY[a.id]=a;});});
function rent(a){return +a.rent>0?+a.rent:null;}
function cmp(x,y){var a=BY[x._id],b=BY[y._id];if(!a||!b)return 0;var d=0;
 if(mode==='rent-d'){var ra=rent(a),rb=rent(b);d=(ra===null)-(rb===null)||(rb||0)-(ra||0);}
 else if(mode==='sf-d')d=b.sf-a.sf||(rent(a)||1e9)-(rent(b)||1e9);
 else if(mode==='sf')d=a.sf-b.sf||(rent(a)||1e9)-(rent(b)||1e9);
 return d||String(a.id).localeCompare(String(b.id));}
var mo;
function order(){if(mode==='rent')return;var all=[].slice.call(ul.children),lis=all.filter(function(li){var b=li.querySelector('[data-id]');if(b)li._id=b.getAttribute('data-id');return !!b;});
 if(lis.length<2)return;lis.sort(cmp);var k=0;all.map(function(li){return li._id&&lis.indexOf(li)>-1?lis[k++]:li;}).forEach(function(li){ul.appendChild(li);});mo.takeRecords();}
mo=new MutationObserver(order);mo.observe(ul,{childList:true});
sel.addEventListener('change',function(){mode=sel.value;if(mode==='rent')O.apply();else order();});
var q=null;try{q=new URLSearchParams(location.search).get('q');}catch(e){}
if(q&&inp._sq){inp.value=q;inp.dispatchEvent(new Event('input',{bubbles:true}));}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,0);});else init();
})();
}catch(e){console.error(e);}
try{
(function(){
var C='https://cdn.prod.website-files.com/6adaad44213439df69218780/',TX={siding:C+'6ae796d98a535e79728bd598_or3d-siding.jpg',cedar:C+'6ae796d98a535e79728bd5ad_or3d-cedar.jpg',stone:C+'6ae796d930de6dda0dbc672d_or3d-stone.jpg',asphalt:C+'6ae796d93ad9e63e1ac98a54_or3d-asphalt.jpg',grass:C+'6ae796d9d76bbc963cb6927b_or3d-grass.jpg'};
var root0=document.getElementById('or3d');
function ready(){var r=document.getElementById('or3d');if(r)r.classList.add('lk-on');}
setTimeout(ready,5000);
var tries=0;
function init(){try{run();}catch(e){ready();}}
function run(){
var O=window.__or,T=window.THREE;
if((!O||!O.scene||!O.M||!T||!O._nav)&&tries++<200)return setTimeout(init,100);
if(!O||!T||O._look)return ready();O._look=1;
var S=O.scene,M=O.M,mob=matchMedia('(max-width:767px)').matches||(navigator.maxTouchPoints>1&&Math.min(screen.width,screen.height)<820);
var sd=20261101;function rnd(){sd=(sd*16807)%2147483647;return (sd-1)/2147483646;}
function lin(h){return new T.Color(h).convertSRGBToLinear();}
var until=0;function kick(ms){until=Math.max(until,performance.now()+(ms||400));}
var need=7,got=0;function done(){if(++got>=need){kick(600);setTimeout(ready,250);}}
var loader=new T.TextureLoader();loader.setCrossOrigin('anonymous');
function photo(url,cb){return loader.load(url,function(t){t.wrapS=t.wrapT=T.RepeatWrapping;t.encoding=T.sRGBEncoding;t.anisotropy=mob?4:8;t.needsUpdate=true;if(cb)cb(t);done();},undefined,done);}
function swapMap(m,url,color,o){if(!m)return;var old=m.map,rp=old?old.repeat.clone():new T.Vector2(1,1);photo(url,function(t){t.repeat.copy(rp);m.map=t;m.color=lin(color||'#ffffff');Object.assign(m,o||{});m.needsUpdate=true;if(old&&old.dispose)old.dispose();});}
swapMap(M.siding,TX.siding,'#ffffff',{roughness:.82});
swapMap(M.sidingSide,TX.siding,'#ffffff',{roughness:.82});
swapMap(M.bay,TX.siding,'#d6d8dc',{roughness:.82});
swapMap(M.wood,TX.cedar,'#ffffff',{roughness:.7});
swapMap(M.stone,TX.stone,'#ffffff',{roughness:.95});
M.roof.color=lin('#9a9c9c');M.roof.roughness=.92;
M.coping.color=lin('#2a2c2f');
M.glass.color=lin('#7e888e');M.glass.roughness=.08;M.glass.metalness=.45;M.glass.envMapIntensity=1.3;
M.frame.color=lin('#1c1d1f');
M.water.color=lin('#3f6470');M.water.roughness=.06;M.water.metalness=.1;M.water.envMapIntensity=1.4;
M.concrete.color=lin('#cfcac0');
M.pole.color=lin('#2b2d30');
function worldUV(mesh,size){var g=mesh.geometry,p=g.attributes.position,uv=new Float32Array(p.count*2);mesh.updateMatrixWorld();var v=new T.Vector3();
for(var i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(mesh.matrixWorld);uv[i*2]=v.x/size;uv[i*2+1]=v.z/size;}g.setAttribute('uv',new T.BufferAttribute(uv,2));}
function macro(m,amt){m.onBeforeCompile=function(s){
s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec2 vWxz;').replace('#include <project_vertex>','#include <project_vertex>\nvWxz=(modelMatrix*vec4(transformed,1.0)).xz;');
s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 vWxz;\nfloat lkH(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\nfloat lkN(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(lkH(i),lkH(i+vec2(1,0)),f.x),mix(lkH(i+vec2(0,1)),lkH(i+vec2(1,1)),f.x),f.y);}')
.replace('#include <map_fragment>','#include <map_fragment>\nfloat lkm=lkN(vWxz/260.0)*0.6+lkN(vWxz/70.0)*0.4;diffuseColor.rgb*=1.0+'+amt.toFixed(2)+'*(lkm-0.5)*2.0;');};m.customProgramCacheKey=function(){return 'lk'+amt;};m.needsUpdate=true;}
S.traverse(function(o){if(!o.isMesh||o.isInstancedMesh)return;
if(o.material===M.asphalt||o.material===M.road)worldUV(o,36);});
photo(TX.asphalt,function(t){M.asphalt.map=t;M.road.map=t;M.asphalt.color=lin('#ffffff');M.road.color=lin('#d4d4d6');M.asphalt.roughness=M.road.roughness=.92;M.asphalt.needsUpdate=M.road.needsUpdate=true;});
macro(M.asphalt,.12);macro(M.road,.12);
photo(TX.grass,function(t){var g2=t.clone();g2.needsUpdate=true;g2.repeat.set(200,200);M.grass.map=g2;M.grass.color=lin('#e9eedf');M.grass.needsUpdate=true;
var g3=t.clone();g3.needsUpdate=true;g3.repeat.set(1/28,1/28);M.lawn.map=g3;M.lawn.color=lin('#ffffff');M.lawn.needsUpdate=true;});
macro(M.grass,.22);macro(M.lawn,.16);
var HZ='#e4ebef',ZN='#a7c3dc';
var skyG=new T.SphereGeometry(4200,32,16),cols=[],pa=skyG.attributes.position,c1=lin(ZN),c2=lin(HZ);
for(var i=0;i<pa.count;i++){var k=Math.max(0,pa.getY(i)/4200);k=Math.pow(k,.55);var c=c2.clone().lerp(c1,k);cols.push(c.r,c.g,c.b);}
skyG.setAttribute('color',new T.Float32BufferAttribute(cols,3));
var sky=new T.Mesh(skyG,new T.MeshBasicMaterial({vertexColors:true,side:T.BackSide,fog:false,depthWrite:false}));sky.renderOrder=-10;sky.frustumCulled=false;S.add(sky);
function envFace(top,bottom){var c=document.createElement('canvas');c.width=c.height=64;var g=c.getContext('2d'),gr=g.createLinearGradient(0,0,0,64);gr.addColorStop(0,top);gr.addColorStop(.5,HZ);gr.addColorStop(.56,'#9da096');gr.addColorStop(1,bottom);g.fillStyle=gr;g.fillRect(0,0,64,64);return c;}
function flat(col){var c=document.createElement('canvas');c.width=c.height=64;var g=c.getContext('2d');g.fillStyle=col;g.fillRect(0,0,64,64);return c;}
var side=envFace(ZN,'#7f857a');
var env=new T.CubeTexture([side,side,flat('#c4d6e6'),flat('#7c8274'),side,side]);env.encoding=T.sRGBEncoding;env.needsUpdate=true;
S.environment=env;
var hemi=null,sun=null;S.traverse(function(o){if(o.isHemisphereLight)hemi=o;if(o.isDirectionalLight)sun=o;});
function light(){if(hemi){hemi.intensity=.42;hemi.color.set(0xe6f0fa);hemi.groundColor.set(0x5f6a50);}
if(sun){sun.intensity=1.55;sun.color.set(0xfff1dc);sun.shadow.bias=-0.0003;}
if(S.fog){S.fog.color.copy(new T.Color(HZ));S.fog.near=1600;S.fog.far=4200;}S.background=new T.Color(HZ);}
light();
S.traverse(function(o){var ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[];ms.forEach(function(m){if(m.isMeshStandardMaterial&&m.envMapIntensity===1&&m!==M.glass&&m!==M.water)m.envMapIntensity=.55;});});
if(sun&&mob){sun.shadow.mapSize.set(1024,1024);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null;}}
function merge(list){var pos=[],nor=[],col=[];list.forEach(function(it){var g=it.g.index?it.g.toNonIndexed():it.g;if(!g.attributes.normal)g.computeVertexNormals();var p=g.attributes.position,n=g.attributes.normal,cc=it.c?new T.Color(it.c):null,ca=g.attributes.color;
for(var i=0;i<p.count;i++){pos.push(p.getX(i),p.getY(i),p.getZ(i));nor.push(n.getX(i),n.getY(i),n.getZ(i));if(ca)col.push(ca.getX(i),ca.getY(i),ca.getZ(i));else if(cc)col.push(cc.r,cc.g,cc.b);else col.push(1,1,1);}});
var m=new T.BufferGeometry();m.setAttribute('position',new T.Float32BufferAttribute(pos,3));m.setAttribute('normal',new T.Float32BufferAttribute(nor,3));m.setAttribute('color',new T.Float32BufferAttribute(col,3));return m;}
function prof(pts,width,bev){var s=new T.Shape();s.moveTo(pts[0][0],pts[0][1]);for(var i=1;i<pts.length;i++)s.lineTo(pts[i][0],pts[i][1]);
var g=new T.ExtrudeGeometry(s,{depth:width-2*bev,bevelEnabled:bev>0,bevelThickness:bev,bevelSize:bev,bevelSegments:2,curveSegments:4});g.translate(0,0,-(width-2*bev)/2);g.rotateY(-Math.PI/2);return g;}
function box(w,h,d,x,y,z){var g=new T.BoxGeometry(w,h,d);g.translate(x,y,z);return g;}
function wheel(r,w,x,z){var g=new T.CylinderGeometry(r,r,w,14);g.rotateZ(Math.PI/2);g.translate(x,r,z);return g;}
var CARS=[
{body:[[-7.4,.95],[-7.55,2.55],[-7.1,3.2],[-4.4,3.38],[3.1,3.3],[6.5,2.95],[7.5,2.35],[7.45,.95]],glass:[[-4.5,3.3],[-3.1,4.55],[1.3,4.6],[3.15,3.28]],roof:[3.9,4.3,-1.0,4.55],w:6.1,r:1.08,wz:4.6,gw:5.3},
{body:[[-7.5,1.05],[-7.65,3.45],[-7.3,3.65],[3.5,3.62],[6.9,3.25],[7.6,2.6],[7.55,1.05]],glass:[[-7.25,3.6],[-7.0,5.5],[1.7,5.55],[3.55,3.6]],roof:[5.1,8.4,-2.7,5.5],w:6.3,r:1.2,wz:4.75,gw:5.6}];
var PAL=[['#eef0f1',26],['#15171a',18],['#3e4247',14],['#a8adb2',14],['#1c2a44',7],['#8a1a1e',8],['#2b5aa3',5],['#b9ab90',4],['#2d3b32',4]],PT=0;PAL.forEach(function(p){PT+=p[1];});
function paint(){var r=rnd()*PT;for(var i=0;i<PAL.length;i++){r-=PAL[i][1];if(r<=0)return lin(PAL[i][0]);}return lin(PAL[0][0]);}
var body=null,top=null;S.traverse(function(o){if(o.isInstancedMesh&&o.material===M.car)body=o;});
if(body)S.traverse(function(o){if(o.isInstancedMesh&&o.material===M.carTop&&o.count===body.count)top=o;});
var GROUND=.95;
if(body){
var paintM=new T.MeshPhysicalMaterial({roughness:.32,metalness:.55,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:1.1});
var glassM=new T.MeshStandardMaterial({color:lin('#11161b'),roughness:.05,metalness:.9,envMapIntensity:1.7});
var trimM=new T.MeshStandardMaterial({vertexColors:true,roughness:.6,metalness:.2});
var shadM=new T.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.38,depthWrite:false,map:blob(),polygonOffset:true,polygonOffsetFactor:-2});
var groups=[[],[]];
var mtx=new T.Matrix4(),p=new T.Vector3(),q=new T.Quaternion(),sc=new T.Vector3(),flip=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),Math.PI);
for(var i=0;i<body.count;i++){body.getMatrixAt(i,mtx);mtx.decompose(p,q,sc);var qq=q.clone();if(rnd()<.35)qq.multiply(flip);
groups[rnd()<.55?1:0].push({p:new T.Vector3(p.x,GROUND,p.z),q:qq,c:paint()});}
CARS.forEach(function(d,ti){var list=groups[ti];if(!list.length)return;
var R=d.roof,hw=d.w/2-.45;
var gPaint=merge([{g:prof(d.body,d.w,.45)},{g:box(R[0],.16,R[1],0,R[3]+.04,R[2])}]);
var gGlass=merge([{g:prof(d.glass,d.gw,.28)}]);
var gTrim=merge([{g:wheel(d.r,.8,hw+.15,d.wz),c:'#141516'},{g:wheel(d.r,.8,-hw-.15,d.wz),c:'#141516'},{g:wheel(d.r,.8,hw+.15,-d.wz),c:'#141516'},{g:wheel(d.r,.8,-hw-.15,-d.wz),c:'#141516'},
{g:box(d.w-.6,.5,.4,0,d.r*.95,7.45+(ti?.1:0)),c:'#1a1b1d'},{g:box(d.w-.6,.5,.4,0,d.r*.95,-7.35-(ti?.15:0)),c:'#1a1b1d'},
{g:box(1.1,.32,.12,d.w/2-.9,(ti?3.1:2.75),-7.6-(ti?.08:0)),c:'#9b1016'},{g:box(1.1,.32,.12,-d.w/2+.9,(ti?3.1:2.75),-7.6-(ti?.08:0)),c:'#9b1016'},
{g:box(1.0,.3,.12,d.w/2-.9,(ti?2.95:2.55),7.52+(ti?.05:0)),c:'#e8ecef'},{g:box(1.0,.3,.12,-d.w/2+.9,(ti?2.95:2.55),7.52+(ti?.05:0)),c:'#e8ecef'}]);
var shG=new T.PlaneGeometry(d.w+2.2,16.5);shG.rotateX(-Math.PI/2);
var ims=[[gPaint,paintM,true],[gGlass,glassM,true],[gTrim,trimM,false],[shG,shadM,false]].map(function(a){var im=new T.InstancedMesh(a[0],a[1],list.length);im.castShadow=a[2];im.receiveShadow=a[1]!==shadM;S.add(im);return im;});
var o3=new T.Object3D();
list.forEach(function(c,j){o3.position.copy(c.p);o3.quaternion.copy(c.q);o3.scale.set(1,1,1);o3.updateMatrix();ims.forEach(function(im,k){if(k===3){o3.position.y=c.p.y+.06;o3.updateMatrix();}im.setMatrixAt(j,o3.matrix);});o3.position.y=c.p.y;ims[0].setColorAt(j,c.c);});
ims.forEach(function(im){im.instanceMatrix.needsUpdate=true;});if(ims[0].instanceColor)ims[0].instanceColor.needsUpdate=true;});
body.visible=false;if(top)top.visible=false;}
S.traverse(function(o){if(o.isInstancedMesh&&o.material===M.stripe)o.position.y=-1.18;});
function blob(sq){var c=document.createElement('canvas');c.width=c.height=64;var g=c.getContext('2d');
if(sq){g.fillStyle='#000';for(var k=0;k<14;k++){g.globalAlpha=.075;var m=k*2.2;g.fillRect(m,m,64-2*m,64-2*m);}}
else{var r=g.createRadialGradient(32,32,4,32,32,32);r.addColorStop(0,'rgba(0,0,0,1)');r.addColorStop(.55,'rgba(0,0,0,.55)');r.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=r;g.fillRect(0,0,64,64);}
var t=new T.CanvasTexture(c);return t;}
var trunk=null,crown=null;S.traverse(function(o){if(o.isInstancedMesh&&o.material===M.trunk)trunk=o;if(o.isInstancedMesh&&o.material===M.leaf)crown=o;});
if(crown&&trunk){
function lump(det,amp,seed){var g=new T.IcosahedronGeometry(1,det),p=g.attributes.position,v=new T.Vector3();for(var i=0;i<p.count;i++){v.fromBufferAttribute(p,i);var n=Math.sin(v.x*3.1+seed)*Math.sin(v.y*2.7+seed*1.7)*Math.sin(v.z*3.3+seed*.6);var nn=g.attributes.normal;nn.setXYZ(i,v.x,v.y,v.z);v.multiplyScalar(1+amp*n);p.setXYZ(i,v.x,v.y,v.z);}g.attributes.normal.needsUpdate=true;return g;}
function shadeY(g,lo,hi){var p=g.attributes.position,c=[];for(var i=0;i<p.count;i++){var k=Math.min(1,Math.max(0,(p.getY(i)+1)/2));var s=(lo+(hi-lo)*k)*(.86+.28*Math.abs(Math.sin(i*12.9898)*43758.5453%1));c.push(s,s,s);}g.setAttribute('color',new T.Float32BufferAttribute(c,3));return g;}
function placed(g,s,x,y,z){g.scale(s,s,s);g.translate(x,y,z);return g;}
var decid=merge([[0,0,0,.74],[.42,-.18,.1,.56],[-.38,-.12,-.22,.58],[.05,.34,-.08,.52],[-.12,-.28,.4,.5],[.3,.05,-.42,.48],[-.36,.2,.18,.44],[.24,.3,.3,.42]].map(function(b,i){var g=lump(2,.12,i*1.9);g=placed(g,b[3],b[0],b[1],b[2]);return {g:shadeY(g,.62,1.08)};}));
var conG=merge([[0,-.55,1.0,.55],[0,-.05,.8,.5],[0,.4,.55,.45],[0,.75,.32,.35]].map(function(b){var g=new T.ConeGeometry(b[2],b[3]*2.2,9);g.translate(0,b[1],0);return {g:shadeY(g,.7,1.05)};}));
var leafM=new T.MeshStandardMaterial({vertexColors:true,roughness:.92,envMapIntensity:.35});
var trunkM=new T.MeshStandardMaterial({color:lin('#4a3b30'),roughness:.95});
var trunkG=new T.CylinderGeometry(.45,.75,10,7);
var n=crown.count,spots=[],m4=new T.Matrix4(),pp=new T.Vector3(),qq2=new T.Quaternion(),ss=new T.Vector3();
for(var i=0;i<n;i++){crown.getMatrixAt(i,m4);m4.decompose(pp,qq2,ss);spots.push({x:pp.x,z:pp.z,s:ss.x/9});}
var dec=[],con=[];spots.forEach(function(t){(rnd()<.2?con:dec).push(t);});
var GR=['#4d6b35','#5a7a3a','#3f5e33','#6b8540','#57703f','#7a8a45'],GC=['#2f4a32','#36523a','#2b4430'];
var dIM=new T.InstancedMesh(decid,leafM,dec.length),cIM=new T.InstancedMesh(conG,leafM,con.length),tIM=new T.InstancedMesh(trunkG,trunkM,spots.length);
[dIM,cIM,tIM].forEach(function(im){im.castShadow=true;im.receiveShadow=true;S.add(im);});
var o4=new T.Object3D(),ti2=0;
dec.forEach(function(t,j){var s=t.s*(0.85+rnd()*.35),h=1+rnd()*.25;o4.rotation.set(0,rnd()*6.28,0);o4.position.set(t.x,(10+7.5)*s,t.z);o4.scale.set(8.5*s,8.0*s*h,8.5*s);o4.updateMatrix();dIM.setMatrixAt(j,o4.matrix);dIM.setColorAt(j,lin(GR[rnd()*GR.length|0]));
o4.rotation.set(0,0,0);o4.position.set(t.x,5*s,t.z);o4.scale.set(s,s,s);o4.updateMatrix();tIM.setMatrixAt(ti2++,o4.matrix);});
con.forEach(function(t,j){var s=t.s*(0.9+rnd()*.4);o4.rotation.set(0,rnd()*6.28,0);o4.position.set(t.x,(2+11)*s,t.z);o4.scale.set(7*s,11*s,7*s);o4.updateMatrix();cIM.setMatrixAt(j,o4.matrix);cIM.setColorAt(j,lin(GC[rnd()*GC.length|0]));
o4.rotation.set(0,0,0);o4.position.set(t.x,2.5*s,t.z);o4.scale.set(.8*s,.5*s,.8*s);o4.updateMatrix();tIM.setMatrixAt(ti2++,o4.matrix);});
crown.visible=false;trunk.visible=false;}
if(O.BLDGS&&O.BLDGS.length){
var W=64.5,D=62.5,bed=4.5,shrubs=[],grass=[];
var mulchM=new T.MeshStandardMaterial({color:lin('#a8a296'),roughness:1,envMapIntensity:.3});
var aoM=new T.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.42,depthWrite:false,map:blob(true),polygonOffset:true,polygonOffsetFactor:-1});
var shrubG=merge([{g:shadeY(lump(1,.12,1),.6,1.05)}]),gr=merge([{g:shadeY(lump(1,.22,4),.7,1.1)}]);
var shrubM=new T.MeshStandardMaterial({vertexColors:true,roughness:.95,envMapIntensity:.3});
O.BLDGS.forEach(function(b){var g=new T.Group();g.position.set(b.x,0,b.z);g.rotation.y=b.rot;S.add(g);
var ring=new T.Shape();ring.moveTo(-W/2-bed,-D/2-bed);ring.lineTo(W/2+bed,-D/2-bed);ring.lineTo(W/2+bed,D/2+bed);ring.lineTo(-W/2-bed,D/2+bed);
var h=new T.Path();h.moveTo(-W/2,-D/2);h.lineTo(-W/2,D/2);h.lineTo(W/2,D/2);h.lineTo(W/2,-D/2);ring.holes.push(h);
var mg=new T.ShapeGeometry(ring);mg.rotateX(-Math.PI/2);var mm=new T.Mesh(mg,mulchM);mm.position.y=.42;mm.receiveShadow=true;g.add(mm);
var ag=new T.PlaneGeometry(W+16,D+16);ag.rotateX(-Math.PI/2);var am=new T.Mesh(ag,aoM);am.position.y=.46;am.renderOrder=1;g.add(am);
g.updateMatrixWorld(true);
var step=mob?11:7.5;
[[-1,0],[1,0],[0,-1],[0,1]].forEach(function(f){var len=f[0]?D:W;for(var t=-len/2+3;t<=len/2-3;t+=step*(0.8+rnd()*.4)){var off=(f[0]?W:D)/2+bed*.5;
var lx=f[0]?f[0]*off:t,lz=f[1]?f[1]*off:t,v=new T.Vector3(lx,0,lz).applyMatrix4(g.matrixWorld);if(f[1]===1&&Math.abs(lx+8)<7)continue;
(rnd()<.3?grass:shrubs).push({x:v.x,z:v.z,s:.9+rnd()*.7});}});});
function scatter(geo,mat,list,cols,sy,yk){if(!list.length)return;var im=new T.InstancedMesh(geo,mat,list.length),o5=new T.Object3D();im.castShadow=!mob;im.receiveShadow=true;
list.forEach(function(s,j){o5.position.set(s.x,yk*s.s,s.z);o5.rotation.set(0,rnd()*6.28,0);o5.scale.set(1.5*s.s,sy*s.s,1.5*s.s);o5.updateMatrix();im.setMatrixAt(j,o5.matrix);im.setColorAt(j,lin(cols[rnd()*cols.length|0]));});S.add(im);}
scatter(shrubG,shrubM,shrubs,['#3f5a32','#4c6a36','#6a4a35','#55703c'],1.1,1.1);
scatter(gr,shrubM,grass,['#a9a56e','#9c9b66','#b6ad7c'],.75,.55);}
if(O.BLDGS&&O.BLDGS.length){
var ehd=62.5/2,ex=-8;
var darkM=new T.MeshStandardMaterial({color:lin('#1b1c1e'),roughness:.45,metalness:.6});
var soffM=new T.MeshStandardMaterial({color:lin('#f3ead8'),emissive:lin('#ffe2b0'),emissiveIntensity:.55,roughness:.6});
var padM=new T.MeshStandardMaterial({color:lin('#cfcac0'),roughness:.95,envMapIntensity:.3});
var bars=[],rods=[],lamps=[],glows=[],pads=[],plates=[];
O.BLDGS.forEach(function(b){var g=new T.Group();g.position.set(b.x,0,b.z);g.rotation.y=b.rot;g.updateMatrixWorld(true);var mw=g.matrixWorld,z=ehd+.62;
function at(arr,x,y,zz,sx,sy,sz,rx,rz){arr.push({m:new T.Matrix4().compose(new T.Vector3(x,y,zz),new T.Quaternion().setFromEuler(new T.Euler(rx||0,0,rz||0)),new T.Vector3(sx,sy,sz)).premultiply(mw)});}
[[.2,9.4],[11.3,19.7],[21.8,30.2]].forEach(function(w,f){var h=w[1]-w[0],cy=(w[0]+w[1])/2;
at(bars,ex-1.5,cy,z,.22,h,.3);at(bars,ex+1.5,cy,z,.22,h,.3);
if(f===0){at(bars,ex,7.3,z,9,.22,.3);at(bars,ex-1.5+.05,3.6,z+.02,.1,6.6,.32);}});
at(bars,ex,9.62,ehd+3.3,12.3,.12,6.8);
at(glows,ex,9.43,ehd+3.4,10.6,.06,5.4);
[-5.4,5.4].forEach(function(dx){var x0=ex+dx,y0=16,z0=ehd+.4,y1=10.3,z1=ehd+6.2,len=Math.hypot(y0-y1,z1-z0),ang=Math.atan2(z1-z0,y0-y1);
at(rods,x0,(y0+y1)/2,(z0+z1)/2,.14,len,.14,ang,0);});
[-6.4,6.4].forEach(function(dx){at(lamps,ex+dx,7.6,ehd+.5,.7,1.1,.5);at(glows,ex+dx,7.15,ehd+.77,.5,.12,.04);});
at(pads,ex,.5,ehd+3.2,11,.12,6.4);
plates.push({b:b,mw:mw});});
function inst(geo,mat,list,shadow){if(!list.length)return;var im=new T.InstancedMesh(geo,mat,list.length);list.forEach(function(it,j){im.setMatrixAt(j,it.m);});im.castShadow=shadow;im.receiveShadow=true;S.add(im);return im;}
var B1=new T.BoxGeometry(1,1,1),CY=new T.CylinderGeometry(.5,.5,1,6);
inst(B1,darkM,bars,true);inst(CY,darkM,rods,false);inst(B1,darkM,lamps,false);inst(B1,soffM,glows,false);inst(B1,padM,pads,false);
plates.forEach(function(p){var n=String(p.b.num||'');if(!n)return;
var c=document.createElement('canvas');c.width=64;c.height=256;var g=c.getContext('2d');g.fillStyle='#c9844c';g.font='700 54px Inter,Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';
for(var i=0;i<n.length;i++)g.fillText(n[i],32,34+i*62);
var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.anisotropy=4;
var m=new T.Mesh(new T.PlaneGeometry(1.9,7.6),new T.MeshStandardMaterial({map:t,transparent:true,roughness:.4,metalness:.7,envMapIntensity:1}));
m.position.set(ex+6.7,15.6,ehd+.42);m.applyMatrix4(p.mw);S.add(m);});
}
var R=null,rawRender=null,last=new T.Matrix4(),lastP=new T.Matrix4();
S.onBeforeRender=function(r){if(R)return;R=r;
if(mob&&r.getPixelRatio()>1.5){r.setPixelRatio(1.5);setTimeout(function(){window.dispatchEvent(new Event('resize'));},0);}
rawRender=r.render.bind(r);
r.render=function(sc,cam){cam.updateMatrixWorld();sky.position.copy(cam.position);
var moved=!last.equals(cam.matrixWorld)||!lastP.equals(cam.projectionMatrix);
if(moved||sc!==S||performance.now()<until){last.copy(cam.matrixWorld);lastP.copy(cam.projectionMatrix);if(moved)kick(300);rawRender(sc,cam);}};};
['pointerdown','pointermove','pointerup','wheel','keydown','click','input','change','touchstart','touchmove'].forEach(function(e){window.addEventListener(e,function(){kick(900);},{passive:true,capture:true});});
setInterval(function(){kick(40);},1000);
kick(1500);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
}catch(e){console.error(e);}
try{
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
function badge(){var m=document.getElementById('omap');if(!m||m.querySelector('.or3d-badge'))return;var b=document.createElement('div');b.className='or3d-badge';b.innerHTML='<img alt="Overland Reserve" src="data:image/webp;base64,UklGRlgRAABXRUJQVlA4WAoAAAAQAAAA2AAAQwAAQUxQSHUQAAAB/yckSPD/eGtEpO4TjNpIcuQJvxn+hC8fgoj+T4D/RsxcxaON2Uyk3DtZyBguMpOyaJhYZhyHdiznsQbGsRt1loYZ9qqrLogQgXeewhu2bcvmNPu3Hcd53jOTsbgbHmkIERzqLU7d3RLqrrhb3Ys3y4O7e6CuWAhuQZpBE5KJzdz3dZ37h+u6hcyzMF8jYgJotXn476z5j3li2Bk5RvqzBxt2BBZn2aCOJg43LLTdJ6mW7UEYZkROk+48SumhjmDDisC+KRuYz9+kXxKHExZGPJz0PXyHjZneRhhGRH4j3UGIfFXpyW63YUNgf2X925oTuE06gzhcMO99JulzRHCb/mqmQwjDhMiZ0tVEgMCnlT83yn2rMHOz1zWBA5SvmWxeIHKldD7xtbMQKFr0shBDE8GU3JpIyUIjMVrBYrSWWIzegMUYGvIYDQt1YvQWuY9+LtfHCZS6T3gx13sJr1UAGDVlYifgXthKlTUCBF5jq1f0Rlro3pLIMukyInUDH1LeN979tQm0f/DyF1KeVx/66e4QgBPOOy024izZe+PPvt4belCeZ1mepLYbr1j4taxrREHZlpM/OgF3pp197iK8KWfWeed+CC8xJvzhvCWEOs5+550xjXnfzkd0grac/vHtIbQg8G7lq8e71yNyvnQR8TVx3v+AdPnn3rTfj+6RLtuO4PxNOshCHbO256Zt2P2BkK7zkaPHjGun+Cu2/yzP/suT0TljZ+nFbxFZKH2Y0IIdpb5Os4Kzo6R9CWWR70gLOPRaXvhr0qjZ0uClCwlNuY/ty/UeAg26j+nL9SFC6yxwunTBTEr3f1wvvp029suy2/A6zqIaZ3/txd7jTwAYMXbKTnN32XUd1Yz33U3p+O9skI6H+dXae1sQWLh5sz5JLNtuIMuf6Har89Halnnsfz3v/BPA9sdt0JZvE5qJXCwtI9Jw4N3KX57g3rLA6dJREGMI0Rn/N23ekxhWpGyhhbLID8SF7Vh/jDUlSsdAHiGGHKQXf3rIpvyo3QkxGs1HfqbBdJd7AZyqbX8usUSsjxXDAtUYcuUw61/SsYTGAh9T/two98aInC9dTmxV4L3S74hOaYXxq7RqVOTz0h+p4yzX0/8bt97DIBmYmZHWgsBqlFr7n38WOAyjlUbbS/+4IenthJIUT30l1wcJBViPUbQagFfovVd6Dw27TV2T62ACTbqPez7XRwmtMetclT/WEYy6FQ5KOgXv/l/aON28YExcp2voGjRRKLeQAaJcNf+/KovJrRWBt+ore0rX4yV5WPnlkK2Zag6IflwFUR6Zsyl/urehyPXSWUSaDrxL+cuTzFsS+ZT0GSINBu7IXx7jHCudQCxEPqh0OcmhIYnGlf73PKPJac252o2HUm2eeQFmXX6DdAuR4sYapfWocLr07UYiS5We6A7WlIUOlklXE1ri3Jie7zVrJNonpI9gU/pTX48ZEDgrrdhcsEZE87GNFhu96/o6OUw6g1A2ypY8n+vbRBAbt5Q16LbN5rSyAWfHjVl6E4EmQ6B4b9KnCC0w7CFdQqBRZ2p/+i3tnCMtJYLR9piOpThASnWad58zSS8SWxHt/ToH7+lL6yeZl4zU8werNriAAGzehAqqh/Nn1epZ8L9KpxBp3A3GHvjDM876c8rXTjFvyUp932JDYPfpFio2P0v3B4PAbqn2BsBY9EgtYWZgtayOFcxJ38duJqgFgSv1ITo4QTqSWDKadn4t3d8eDAY20XS00xuJHCHdWwnWkAV4+wUvqlir6mpiSx7UB2gicIP+gwVuSjqIQOQH+jueCHz657kry2q1ajz+vFCWCkr5Ue+zNb8jp3ln8qbNkwk2bWN6tssMjJHkoeMB6RdEWd6PCmqEpQ04Ow9m1cUEGg3wxuUqblkjaVCfJbYAqKJmLtZ9ENlP6TYcZ7m+ToDEXd88efzk6VOmtsMkrCxC7N7+Y3dK/W+H+S2ILNWfQyW023nSZwgAo8gDi6o1HUAw1tPCV6lrwf4tHU/FGomM+q0kvXDex3aasOi7q1Rdt615C8QorJnrdBeY+b0pX2iRyZsGZ5IKF//hVIDx28xbdBcqrPvOS319j/YNSi9f/AYqLXGW6ysUFyjd4zkYvYjIt5WvHqvAOlRQQ731IkdI9xgQopVY4C2PKVffd8dTOuZW6Q6CNQfbG036Ct2CE/ms9Efa+YBuwhNAe+zISInSvNA57+Of+6uUH7NwMri3wtlpsHbcTy5eduw7uFR6pwLQ044RuUW6Ijmv0sI5dQILamndglHTxrcBATDjm7mU/XQChODmFcb05fomsTljd6WGnJmb0i+JmHU9lzZON87Wp4gUU5ZlYLiREsV2gN+p9sQUKk5LIkdoUKV3n1HTjQijewSG27Q1mZYM1lMDOfuggoVwl9LL/37x1Vcev/JzvZg5fqaqum9viEZpZH9lA3PxxghaqT0nyBuJfEF6DwEiR0knMuK5TeOwEkFGk/K26FwpPdITrDXmK5Kyyz9zwJILk7I82zmH1NmFQ+CDqv18rvWXNejMXqwVhcjxqmWqu+pLBl3Xa1DndRGN+pFfSP8OwZrgfBv1mcYC/82f68bAbXJ/eqGyQJcRqN8UBNx7Hkm6kNiSwG5Jj+5NceaZGtTXBamtp0DkbHUt05oy1Qv6ZsXOAAJvStUkPXbF7659WpKWT+r9h6r6HgQatdDxkHQ0sTH85nv41tjc61X4pPRdAkDgTOn9h+ndFltgZvUIzN9S1ZeoNGde4acaWEglhhjgq0ofmWou6yEAFrof1a7ferysfqW222dZeT5Y6Hosly58UzvQdeCtkh67R7Xqh4hG44Hds6y2kNCYZV/TpLOlUGIw62Xd1e5WYvNq6T//WdeFNWKYGcpT1gCRpRqs7kN7wQAzDzEGoOMJ3UaFolc4S91LFRIjSwjsmfKT9stjQQXzSm3qRW360gBEfqN81VuBEJ397JMvbLsQ37QfFZqOHCv9NwZrCFhgrAl4jDHCvCe0ejuc0sANqaZzCJTX3KuUh9mbnrZ6RM5T7aV5+HzI3BEJoH3uqrdJ37NYgvv0TWl12zYDej+xQORI5Xk2nwNAMeTKYfeHpc8SCLxdtepiKsEAC5dOXrSlht5KhfpWx0K8SzqG2AxpkNl7Uez48kbdNxun3ju0KX9HnSybkKpY19hJM2bNm8UZfwgZocxC+9+VPbsLCzObmGp497jJM2fPm7vjB0+v1hbhZQT+L88/MnpL7XN1LNpfNJjNY/+Mngxgwa+lvvcScB/9bK7v00apJTbdZZ4SkVJzSzng0SGwSzWr7UpohruWoxU/WfLN89dq3UndBOq736fV7WYFn8APHvSukT1GaRhoByvDGXeXpLfMqnDGA21dvT2U77Ra/6uY1bPF0v3bSkfVwW3bfmkBh0au+Huu8TtIz5wymQDOhdJyohU8wpztI0Ck6LGWRHs3m4EAkcOlle3BmuGuY0742+qXXnziis9PAqcR9jz8YBwQG77bbt1KKc9SEsTdWXEpk7ESnN5v/eCofXqOIHQq5XmeJwz/21cPfx9Go0sOP2zc9w7fCy/DecvhP5zAdkeooxPSli/s2QUByD4srZ/pwcyjw7RDp4jNA5R6gI437rfbRCPdedR2OBbs79LJxGZkNBiMVm/6KY1n8NjlNGqUnsxrbDRvlJ5Mg8EApr6UBven7pxTX0GsWkPRAsw+5RBKu6X+bxNwZg+k2q6EJkgWHbAQjWY9hjrEJkjJAnkDWIzRic2kGENjxBgsRm+EEKNhoU4MRukypVc+MW9sZ9ek3b9y4xbJa3c8i4AAc87eLKC2alVtjpTrVCKBpblW9Lg1UWrGa5w1A8ppYdbMVpzVaXC2MkkvPvPsqyrm111ZRWDOpF9tlpTuvPJvOax607Ua0JcJFd6b1TQHb8XrzQMD5DBBxad+vRiCQYDP9UnaeOZiAA/AsaoNzArkiPc7r4NXVkZgA1f/Zfn1Z31j705wB4tMuUxSfvYs8OgGFiLnS9dRzY1xidfDke72PJ3+XkqDAwHetVqZ/r4PBKeu+6i+tPmbVaMXt9dDGYxsIybaYwwGeKTtp5IGfuAEx9zdDSDyXdVkdCKGYgghWJ1QklSwEIOXhUKwgoUQgpWFYEAIVnArKG0NYIz1jG/Q5mYeA+z2b1V1765Y8OiUBsB85EvaQmcQQ9fLGjaKVpIXGveSod2L6ZOUb/eLmqQ/dFKJAF0zdth+mgEEpvbV1FORDYnKOw9859smYoW2N8cMfMULJku8+f37zwBMnW+yDPYbixmjD9p/v307MaDtHQf1AG88eBJmzJtZE/7K3baViF6q2Uk7d/XM/cRFGyT1fQRvAxYcfvuzG7Zs7l/5PSww4WHpPxUxFI2xA5LWfBRPpvHPB4Bf3RiSum+WVP0CQUy7CUCHEAJvlqTHFpobPev0DdhROpAQWfYpgPt32VqAbtWk51ZXJSk7ZyoVmPadf2eqf5772Lulh8cxNI3RazcuW6VXejE07km/SskXkWK2v1752TX9HyNAXuu/3rRsLh7YO3vqwvW6HSfw+/zeih2THuk0i/w+v3M1vhJtLQajyGDalIqeP2tXgAV/WCNJgyvO+eHJf9Wg9lmfQ1snNjRAG19g7Pp8J0yo4/lPURo5rLaig27AUeXpz1BMAYVrOTB/xLHAokxv4jGWETODcMw/gK0HRC+u+84+9dAJQDj4qpqk/K/fmkvx60oXrEbtbQzhjS+P+9BgPhPAamN/mf/yRwaBfaUXf7kNBlia+TPCql8igFvHn6QHDcNZnn61mzZcRQKc7z8Z7MwHfetB3oE98YElwPbfvkeS1v52V4AYK8ZTeg9WaWMI+9r0qvSX6MmwbOTX0ToA50vPSOsWmxfGfQtWyYDAwHrp5wSIfEjPLE/XEmqA8W7gA9hWZIrdVGZ8/6un3bFBkp49bjpYdAOiXaLB1N6JDSHW1tYpfysRUNvaJbV3v7UAdH/hCf2GmFB45uvyNYjihk3p1bHmYDbiGUm/NwEkTv6361+krQgUO1C7Sv+7dDQEp9Scu5LauhjSaePqqY+lq/CCb7ySUmfepyr8vHY2EWRrr6VursvfMJgfQQAixyj/T83yEt2xHEBbFbR1MVjbtOb+n78FiEa5RX6trDKCIb55DQdInyIkPJu6Qvfcv5QQ+Jce+Uumwwuuufd6Fk+6NAB2CydrYBccnBmb9BliScXO7Dd/7j0127qodJA9OxsgGHUt8lNVUxdDfe1zXfxx4G8kQ1tGzkc6jugsfVTaclWvmaEtbQuAiZhQ9VrvvKv2MyIQuOiVLnKKWXUbh9XGVma0dyjd2hUrNBo5QQP6NDakRP/0aW5x5iSUWLvIEtOm9VJsnz51GkDimTkkYB0Z3LvTBOiZMYaiWfdEEJBxZHcS5DW2/hFtWKrmeSMMILr5fzsAmNFSo2Fj6Ld15AwmUx1jI0YXGnruYG4lXiIBmLtT7iVSwQ3MrY4Zdc0K0hAwutrFltysjEFgJK8nU2GodrWJQYKVbAS6wF5HDO3uKPoVDbFZRgfDRqMniJMUjWpmdKNhAzAC9KMaG3Kj3cQwUvRwhL6wLoPOyHCzk9/djdPmsuEGPwsjjK42Mdw07ByjEhiOftluG9uOvZ4DAFZQOCC8AAAA8A0AnQEq2QBEAD4xEodCoiEMz84AEAGCWlu4MAACxsfAH8A/AD9APz97/B+fwGRR5LtcQe7Do39amaJJwkbt9sLUYF6LHkYb5pz306dEw2l3VP0MQwbxRze+PcyfSIuhg5wO4tgKnWF934Q96GxgsslNtmfVcoIAAP3j/5L49An/yb/1fjvv///anFihf//9qcgGnvf/9w///3CP//+39y35JwBNfkyz75NMVR78mVwPk2D7MNv8mVAAAAA=">';m.appendChild(b);}
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
  var unit=String(raw||'').trim().match(/^(?:apt\.?|apartment|unit|#)?\s*(6[45]\d0)?[\s\-#]*(\d{3})?$/i);
  if(unit && (unit[1]||unit[2]) && String(raw).replace(/\D/g,'').length>=3){ out.unit=true; return out; }
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
  take(/\b(?:(under|below|less than|smaller than|max(?:imum)?|up to|at most|over|above|more than|bigger than|larger than|at least|min(?:imum)?)\s+)?(\d[\d,]{2,4})\s*(?:\+\s*)?(?:sq\.?\s*f(?:ee)?t\.?|sqft|square\s*f(?:ee|oo)t|sf)\b/g,function(m,dir,n){
    n=money(n); var lo=0,hi=99999;
    if(dir && /under|below|less|smaller|max|up to|most/.test(dir)) hi=n; else lo=n;
    out.sqft=lo+'-'+hi; out.items.push({k:'sqft',label:(hi<99999?'Under '+n.toLocaleString('en-US'):n.toLocaleString('en-US')+'+')+' sq ft',text:m.trim()}); return true; });
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
  var beds=[];
  take(/\b(studio|efficiency|efficiencies|studios)\b/g,function(m){ beds.push(0); out.items.push({k:'beds',v:0,label:'Studio',text:m}); return true; });
  take(/\b([0-4])\s*(?:or|\/|to|and|-|,)\s*([0-4])\s*[- ]?(?:bed(?:room)?s?|br|bd|bdrm)\b/g,function(m,a,b){ a=+a; b=+b; for(var i=Math.min(a,b);i<=Math.max(a,b);i++){ beds.push(i); } out.items.push({k:'beds',v:[a,b],label:a+' or '+b+' bed',text:m.trim()}); return true; });
  take(/\b([0-4])\s*\+?\s*[- ]?(?:bed(?:room)?s?|br|bd|bdrm|b\/)(?=\b|\d)/g,function(m,a){ a=+a; if(beds.indexOf(a)>-1) return true; beds.push(a); out.items.push({k:'beds',v:a,label:a===0?'Studio':a+' bed',text:m.trim()}); return true; });
  if(beds.length) out.beds=beds.filter(function(v,i,a){return a.indexOf(v)===i;}).sort();
  take(/\b([1-3])(?:\.5)?\s*[- ]?(?:bath(?:room)?s?|ba)\b/g,function(m,a){ out.baths=(out.baths||[]); out.baths.push(+a); out.items.push({k:'baths',v:+a,label:a+' bath',text:m.trim()}); return true; });
  take(/\b(first|1st|ground|bottom|lower|second|2nd|middle|third|3rd|top|upper)\s*(?:-|\s)?(?:floor|level|story|storey)\b/g,function(m,w){
    var f=/first|1st|ground|bottom|lower/.test(w)?0:/second|2nd|middle/.test(w)?1:2;
    out.floor=f; out.items.push({k:'floor',label:['1st','2nd','3rd'][f]+' floor',text:m.trim()}); return true; });
  take(/\b(?:no stairs|without stairs)\b/g,function(m){ out.floor=0; out.items.push({k:'floor',label:'1st floor',text:m}); return true; });
  take(/\b(accessible|accessibility|ada|wheelchair|handicap(?:ped)?(?: accessible)?|mobility)\b/g,function(m){ if(!out.ada){ out.ada=true; out.items.push({k:'ada',label:'Accessible',text:m}); } return true; });
  take(/\b(?:building|bldg\.?)?\s*(6400|6410|6420|6430|6440|6450|6460)\b(?:\s*bandel(?:\s*(?:rd|road))?(?:\s*nw)?)?/g,function(m,b){ out.bldg=b; out.items.push({k:'bldg',label:'Building '+b,text:m.trim()}); return true; });
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
var r=sqParse(q);reset();items=[];
if(!String(q).trim()||r.unit){window.OR3D_MOVEIN=null;paint('');O.apply();return false;}
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
}catch(e){console.error(e);}
try{
(function(){
function init(){var O=window.__or,T=window.THREE;if(!O||!O.controls||!T){return setTimeout(init,120);}if(O._nav)return;O._nav=1;
var C=O.controls,cam=O.camera,S=O.state,root=document.getElementById('or3d'),map=document.getElementById('omap');
var mob=function(){return matchMedia('(max-width:767px)').matches;};
var CALI='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="2"/><path d="M2 7h12M5 1.5v3M11 1.5v3"/></svg>';
function AV(){return window.OR3D_AVAIL||null;}
function iso(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);}
var TODAY=iso(new Date());S.moveBy='';
function by(){var m=window.OR3D_MOVEIN;return S.moveBy||(m&&m.date?iso(m.date):'');}
function avl(a){var m=AV();if(!m)return['tbd','Move-in date coming soon'];var v=m[a.id];if(!v)return['tbd','Contact us for availability'];if(v==='now'||v<=TODAY)return['now','Available now'];var d=new Date(v+'T00:00:00');return['date','Available '+d.toLocaleDateString('en-US',{month:'short',day:'numeric'})+(d.getFullYear()!==new Date().getFullYear()?', '+d.getFullYear():'')];}
window.OR3D_ROWX=function(a){var l=avl(a);return '<span class="avl '+l[0]+'">'+CALI+l[1]+'</span>';};
window.OR3D_MATCH=function(a){var b=by(),m=AV();if(!b||!m)return true;var v=m[a.id];return !!v&&(v==='now'||v<=b);};
window.OR3D_FILTERING=function(){return !!by()&&!!AV();};
var ff=document.getElementById('floorf'),mvl=null,mv=null;
if(ff&&ff.closest('label')){mvl=document.createElement('label');mvl.className='mvl';mvl.innerHTML='Move in by<input type="date" id="moveby" min="'+TODAY+'"><small>Live availability coming soon</small>';ff.closest('label').after(mvl);mv=mvl.querySelector('input');}
function syncMv(){if(!mv)return;var on=!!AV();mv.disabled=!on;mvl.classList.toggle('off',!on);mv.value=S.moveBy||'';}
if(mv){mv.addEventListener('change',function(){S.moveBy=mv.value||'';O.apply();});syncMv();}
var cf=document.getElementById('clearf');if(cf)cf.addEventListener('click',function(){S.moveBy='';syncMv();setTimeout(O.apply,0);});
window.OR3D_SETAVAIL=function(m){window.OR3D_AVAIL=m||null;syncMv();O.apply();};
O.apply();
var ft=document.querySelector('#or3d .of-title');if(ft&&ft.firstChild&&ft.firstChild.nodeType===3)ft.firstChild.nodeValue='Find Your '+((window.T2&&window.T2.Noun)||'Apartments').replace(/s$/,'');
var mnx=1e9,mxx=-1e9,mnz=1e9,mxz=-1e9;O.BLDGS.forEach(function(b){mnx=Math.min(mnx,b.x);mxx=Math.max(mxx,b.x);mnz=Math.min(mnz,b.z);mxz=Math.max(mxz,b.z);});
var pad=260;mnx-=pad;mxx+=pad;mnz-=pad;mxz+=pad;
C.addEventListener('change',function(){var t=C.target,dx=Math.min(mxx,Math.max(mnx,t.x))-t.x,dz=Math.min(mxz,Math.max(mnz,t.z))-t.z;if(dx||dz){t.x+=dx;t.z+=dz;cam.position.x+=dx;cam.position.z+=dz;}});
var mode2d=false;
function tiltFor(){return mode2d?0.0005:(mob()?0.55:null);}
window.OR3D_FLYHOOK=function(pos,target){var want=tiltFor();if(want===null)return[pos,target];var off=pos.clone().sub(target),d=off.length(),az=Math.atan2(off.x,off.z);var r=d*Math.sin(want);return[target.clone().add(new T.Vector3(r*Math.sin(az),d*Math.cos(want),r*Math.cos(az))),target];};
function setMode(m){mode2d=m;C.maxPolarAngle=m?0.0005:1.2;C.minPolarAngle=0;btn.textContent=m?'3D':'2D';btn.setAttribute('aria-label',m?'Switch to 3D view':'Switch to 2D map view');btn.setAttribute('aria-pressed',String(m));
var t=C.target.clone(),d=cam.position.distanceTo(t);O.fly(t.clone().add(new T.Vector3(0,d*0.9,0.01)).add(m?new T.Vector3(0,0,0):new T.Vector3(-d*0.45,0,d*0.3)),t,700);}
var zin=document.getElementById('zin'),btn=document.createElement('button');btn.type='button';btn.className='cbtn or3d-dim';btn.title='2D or 3D view';btn.textContent='2D';btn.setAttribute('aria-pressed','false');btn.setAttribute('aria-label','Switch to 2D map view');
if(zin&&zin.parentNode)zin.parentNode.insertBefore(btn,zin);btn.addEventListener('click',function(){setMode(!mode2d);});
function turn(a){var t=C.target.clone(),off=cam.position.clone().sub(t);off.applyAxisAngle(new T.Vector3(0,1,0),a);O.fly(t.clone().add(off),t,550);}
var cmp=document.getElementById('compass');if(cmp&&cmp.parentNode&&!mob()){[['Turn left',Math.PI/4,'<path d="M17 6.5A9 6 0 0 0 4 11"/><path d="M4 6.5V11h4.5"/>'],['Turn right',-Math.PI/4,'<path d="M7 6.5A9 6 0 0 1 20 11"/><path d="M20 6.5V11h-4.5"/>']].forEach(function(d){var b=document.createElement('button');b.type='button';b.className='cbtn or3d-turn';b.title=d[0];b.setAttribute('aria-label',d[0]+' the map');b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="15" rx="9" ry="4.5" opacity=".35"/>'+d[2]+'</svg>';b.addEventListener('click',function(){turn(d[1]);});cmp.parentNode.insertBefore(b,cmp);});}
if(mob()){setTimeout(function(){var t=C.target.clone(),d=cam.position.distanceTo(t);O.fly(cam.position.clone(),t,600);},2300);}
var canvas=document.getElementById('scene'),ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),0),lastUp=0,lx=0,ly=0;
function zoomAt(cx,cy){var r=canvas.getBoundingClientRect(),v=new T.Vector2((cx-r.left)/r.width*2-1,-((cy-r.top)/r.height)*2+1),hit=new T.Vector3();ray.setFromCamera(v,cam);if(!ray.ray.intersectPlane(plane,hit))return;
hit.x=Math.min(mxx,Math.max(mnx,hit.x));hit.z=Math.min(mxz,Math.max(mnz,hit.z));var off=cam.position.clone().sub(C.target);var nl=Math.max(C.minDistance,off.length()*0.55);O.fly(hit.clone().add(off.setLength(nl)),hit,500);}
canvas.addEventListener('dblclick',function(e){zoomAt(e.clientX,e.clientY);});
canvas.addEventListener('pointerup',function(e){if(e.pointerType!=='touch')return;var n=Date.now();if(n-lastUp<300&&Math.abs(e.clientX-lx)<24&&Math.abs(e.clientY-ly)<24){zoomAt(e.clientX,e.clientY);lastUp=0;return;}lastUp=n;lx=e.clientX;ly=e.clientY;});
var h=document.getElementById('hint');if(h)h.textContent=mob()?'Drag to move, pinch to zoom, and twist with two fingers to turn.':'Drag to move, right-drag or Ctrl-drag to turn, and pick a building.';
var al=document.getElementById('alist');if(al&&!document.querySelector('.or3d-gt')){var g=document.createElement('div');g.className='or3d-gt';g.innerHTML='<span>Not sure which apartment yet?</span><button type="button">Schedule a tour</button>';al.parentNode.insertBefore(g,al);var fl=document.createElement('div');fl.className='or3d-gt lk-feesline';fl.innerHTML='<span>Wondering about fees?</span><button type="button" class="lk-fees" data-t2-fees>See all fees</button>';g.insertAdjacentElement('afterend',fl);
g.querySelector('button').addEventListener('click',function(){var t=document.createElement('span');t.setAttribute('data-schedule','general');t.setAttribute('data-label','');t.style.display='none';document.body.appendChild(t);t.click();t.remove();
setTimeout(function(){var p=document.querySelector('.or3d-sched');if(!p)return;var ss=p.querySelector('.ss');if(ss)ss.textContent='Share your contact info and our team will reach out to set up a time that works for you.';var m=p.querySelector('#Message,[name="Message"]');if(m)m.value="I'd like to schedule a tour. I'm not sure which apartment yet.";},30);});}
if(h)h.style.display='none';
var mac=/Mac|iPhone|iPad/.test(navigator.platform||'');
var SV=function(p){return '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';};
var MOUSE='<rect x="11" y="4" width="18" height="30" rx="9"/><path d="M20 4v11M11 15h18"/>';
var I={
 mL:SV('<path class="hl" stroke="none" d="M20 5H19.5A8 8 0 0 0 12 13v1.5h8Z"/>'+MOUSE),
 turn:SV('<ellipse cx="20" cy="20" rx="7" ry="4" opacity=".5"/><path d="M5 18a15 9 0 0 1 27-5"/><path d="M33 7v6.5h-6.5"/><path d="M35 22a15 9 0 0 1-27 5"/><path d="M7 33v-6.5h6.5"/>'),
 zoom:SV('<rect x="3" y="11" width="16" height="16" rx="4"/><path d="M11 15v8M7 19h8"/><rect x="21" y="11" width="16" height="16" rx="4"/><path d="M25 19h8"/>'),
 hand:SV('<path d="M15 21V8.5a2.5 2.5 0 0 1 5 0V19"/><path d="M20 17.5a2.5 2.5 0 0 1 5 0V20"/><path d="M25 19a2.5 2.5 0 0 1 5 0v6c0 6-4 10-9.5 10S12 32 9.5 27l-2.6-4.8a2.3 2.3 0 0 1 3.9-2.4L15 24"/>'),
 reset:SV('<path d="M8 20a12 12 0 1 0 4-9"/><path d="M8 6v6h6"/>'),
 one:SV('<circle class="hl" stroke="none" cx="20" cy="20" r="5"/><path d="M20 4v7M17 7l3-3 3 3M20 36v-7M17 33l3 3 3-3M4 20h7M7 17l-3 3 3 3M36 20h-7M33 17l3 3-3 3"/>'),
 pinch:SV('<circle class="hl" stroke="none" cx="14" cy="26" r="4.5"/><circle class="hl" stroke="none" cx="26" cy="14" r="4.5"/><path d="M8 32l-4 4M4 30v6h6M32 8l4-4M30 4h6v6"/>'),
 twist:SV('<circle class="hl" stroke="none" cx="13" cy="20" r="4.5"/><circle class="hl" stroke="none" cx="27" cy="20" r="4.5"/><path d="M11 9a13 13 0 0 1 18 0M29 9l1-5M29 9l-5 0M29 31a13 13 0 0 1-18 0M11 31l-1 5M11 31h5"/>'),
 tap:SV('<circle class="hl" stroke="none" cx="20" cy="20" r="5"/><circle cx="20" cy="20" r="10"/><circle cx="20" cy="20" r="15" opacity=".45"/>')
};
var rows=mob()?[
 [I.one,'Move the map','Slide one finger across the map.'],
 [I.pinch,'Zoom in and out','Spread two fingers apart to zoom in, or pinch them together to zoom out. The + and \u2212 buttons work too.'],
 [I.twist,'Turn the map','Put two fingers on the map and twist them, like turning a key.'],
 [I.tap,'See the apartments','Tap any building, or the number label above it.'],
 [I.reset,'Start over','Tap the \u21bb button to go back to the full view.']
]:[
 [I.mL,'Move the map','Click and hold the left mouse button, then drag.'],
 [I.zoom,'Zoom in and out','Use the + and \u2212 buttons. You can also hold '+(mac?'\u2318 Command':'Ctrl')+' and roll the mouse wheel.'],
 [I.turn,'Turn the map','Use the two turn buttons, right next to the + and \u2212. You can also hold the right mouse button and drag.'],
 [I.hand,'See the apartments','Click any building.'],
 [I.reset,'Start over','Press Reset view to go back to the full view.']
];
var lg=document.createElement('div');lg.className='or3d-legend';lg.id='or3dLegend';lg.setAttribute('role','dialog');lg.setAttribute('aria-labelledby','or3dLegendT');
lg.innerHTML='<div class="lg-h"><b id="or3dLegendT">How to use the map</b><button type="button" class="lg-x" aria-label="Close">\u00d7</button></div><ul>'+rows.map(function(r){return '<li><div class="ic">'+r[0]+'</div><div><b>'+r[1]+'</b><span>'+r[2]+'</span></div></li>';}).join('')+'</ul><p class="lg-f">The 2D button shows a flat map from above. Press 3D to tilt it back.</p><button type="button" class="lg-ok">Got it</button>';
map.appendChild(lg);
var qb=document.createElement('button');qb.type='button';qb.className='cbtn or3d-q';qb.title='How to use the map';qb.setAttribute('aria-controls','or3dLegend');
qb.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.3-2.5 4"/><circle cx="12" cy="17.3" r=".6" fill="currentColor"/></svg><span class="ql">How to use the map</span><span class="qs">Help</span>';
if(mob()){qb.classList.add('mq');map.appendChild(qb);}else{btn.parentNode.insertBefore(qb,btn);}
function showLg(on){lg.classList.toggle('on',on);qb.setAttribute('aria-expanded',String(on));if(on){qb.classList.remove('nudge');}}
function closeLg(){showLg(false);try{localStorage.setItem('or3dHelpSeen','1');}catch(e){}qb.classList.remove('nudge');void qb.offsetWidth;qb.classList.add('nudge');qb.focus({preventScroll:true});}
var seen=false;try{seen=localStorage.getItem('or3dHelpSeen')==='1';}catch(e){}
showLg(!seen);
qb.addEventListener('click',function(){if(lg.classList.contains('on'))closeLg();else showLg(true);});
lg.querySelector('.lg-x').addEventListener('click',closeLg);lg.querySelector('.lg-ok').addEventListener('click',closeLg);
addEventListener('keydown',function(e){if(e.key==='Escape'&&lg.classList.contains('on'))closeLg();});
var sc=O.scene,M=O.M;
function cv(w,h,fn){var c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);var t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.encoding=T.sRGBEncoding;return t;}
var grain=cv(256,256,function(g,w,h){g.fillStyle='#808080';g.fillRect(0,0,w,h);for(var i=0;i<9000;i++){var v=110+Math.random()*40|0;g.fillStyle='rgba('+v+','+v+','+v+','+(0.25+Math.random()*0.35)+')';g.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2,1+Math.random()*2);}});
grain.repeat.set(0.05,0.05);
[M.road,M.asphalt].forEach(function(m){if(m&&!m.map){m.map=grain;m.needsUpdate=true;}});
function strip(pts,width,mat,y,off,dash,gap){var pos=[],idx=[],acc=0,on=true,seg=[];
for(var i=0;i<pts.length-1;i++){var a=pts[i],b=pts[i+1],dx=b.x-a.x,dz=b.y-a.y,L=Math.hypot(dx,dz);if(!L)continue;var ux=dx/L,uz=dz/L,nx=-uz,nz=ux,s=0;
while(s<L){var step=dash?Math.min(L-s,(on?dash:gap)-acc):L-s;if(!dash||on){var x0=a.x+ux*s+nx*off,z0=a.y+uz*s+nz*off,x1=a.x+ux*(s+step)+nx*off,z1=a.y+uz*(s+step)+nz*off,k=pos.length/3,hw=width/2;
pos.push(x0-nx*hw,y,z0-nz*hw,x0+nx*hw,y,z0+nz*hw,x1-nx*hw,y,z1-nz*hw,x1+nx*hw,y,z1+nz*hw);idx.push(k,k+1,k+2,k+1,k+3,k+2);}
s+=step;if(dash){acc+=step;if(acc>=(on?dash:gap)-1e-6){acc=0;on=!on;}}}}
var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();var m=new T.Mesh(g,mat);m.receiveShadow=true;sc.add(m);return m;}
function mat(hex,o){var m=new T.MeshStandardMaterial(Object.assign({color:new T.Color(hex).convertSRGBToLinear(),roughness:.8,metalness:0},o||{}));return m;}
var yel=mat('#e3b53b'),wht=mat('#f2f0ea'),curb=mat('#d9d4ca',{roughness:.95});
var R=O.roads;
function extn(pts,L){var a=pts[0],b=pts[Math.min(3,pts.length-1)],y=pts[pts.length-1],z=pts[Math.max(pts.length-4,0)];
function seg(p,q){var dx=p.x-q.x,dz=p.y-q.y,l=Math.hypot(dx,dz)||1,o=[];for(var t=0;t<=L;t+=40)o.push(new T.Vector2(p.x+dx/l*t,p.y+dz/l*t));return o;}
var s0=seg(a,b).reverse(),s1=seg(y,z);return {start:s0,end:s1,all:s0.slice(0,-1).concat(pts,s1.slice(1))};}
var EXT=2600,eB=extn(R.bandel,EXT),eO=extn(R.overland,EXT),fr=[new T.Vector2(-900,-490),new T.Vector2(-860,-489.9)],fr2=[new T.Vector2(1200,-450),new T.Vector2(1160,-451.6)],eF={start:extn(fr,EXT).start,end:extn([fr2[1],fr2[0]],EXT).end};
[[eB,38,1.0],[eO,46,1.05],[eF,30,1.12]].forEach(function(r){strip(r[0].start,r[1],M.road,r[2],0,0,0);strip(r[0].end,r[1],M.road,r[2],0,0,0);});
R={bandel:eB.all,overland:eO.all,drive:O.roads.drive};
sc.traverse(function(o){if(o.isMesh&&o.material===M.asphalt&&!o.isInstancedMesh)o.position.y=-0.6;});
function dRoad(p){var m=1e9;for(var i=0;i<R.bandel.length;i++){var q=R.bandel[i],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<m)m=d;}return m;}
var dr=R.drive.filter(function(p){return dRoad(p)>20;});
var mouth=null;for(var k=0;k<R.drive.length;k++){if(dRoad(R.drive[k])>=19){mouth=R.drive[k];break;}}
function nearI(x,z){var bi=0,m=1e9;for(var i=0;i<R.bandel.length;i++){var q=R.bandel[i],d=(x-q.x)*(x-q.x)+(z-q.y)*(z-q.y);if(d<m){m=d;bi=i;}}return bi;}
function sd(x,z){var i=nearI(x,z),a=R.bandel[Math.max(i-1,0)],b=R.bandel[Math.min(i+1,R.bandel.length-1)],tx=b.x-a.x,tz=b.y-a.y,l=Math.hypot(tx,tz)||1,q=R.bandel[i];return [((x-q.x)*(-tz)+(z-q.y)*tx)/l,-tz/l,tx/l];}
if(mouth){var side=Math.sign(sd(mouth.x,mouth.y)[0]);sc.traverse(function(o){if(!(o.isMesh&&o.material===M.asphalt&&!o.isInstancedMesh))return;var pa=o.geometry.attributes.position;for(var v=0;v<pa.count;v++){var x=pa.getX(v),z=pa.getZ(v);if(Math.hypot(x-mouth.x,z-mouth.y)>90)continue;var r=sd(x,z);if(r[0]*side<1){var k2=r[0]-side*1;pa.setXYZ(v,x-r[1]*k2,pa.getY(v),z-r[2]*k2);}}pa.needsUpdate=true;o.geometry.computeBoundingSphere();});}
function runs(pts,keep){var out=[],cur=[];pts.forEach(function(p){if(keep(p))cur.push(p);else{if(cur.length>1)out.push(cur);cur=[];}});if(cur.length>1)out.push(cur);return out;}
function offPts(pts,off){return pts.map(function(p,i){var a=pts[Math.max(i-1,0)],b=pts[Math.min(i+1,pts.length-1)],dx=b.x-a.x,dz=b.y-a.y,l=Math.hypot(dx,dz)||1;return new T.Vector2(p.x-dz/l*off,p.y+dx/l*off);});}
strip(R.bandel,0.9,yel,1.35,-0.8,0,0);strip(R.bandel,0.9,yel,1.35,0.8,0,0);
[-16.5,16.5].forEach(function(o){var ep=offPts(R.bandel,o);runs(ep,function(p){return !mouth||Math.hypot(p.x-mouth.x,p.y-mouth.y)>36;}).forEach(function(r){strip(r,0.7,wht,1.35,0,0,0);});});
strip(R.overland,0.9,yel,1.4,0,10,12);strip(R.overland,0.7,wht,1.4,-20.5,0,0);strip(R.overland,0.7,wht,1.4,20.5,0,0);
strip(dr,0.8,wht,1.85,0,8,10);
strip(dr,1.4,curb,1.95,-31,0,0);strip(dr,1.4,curb,1.95,31,0,0);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
}catch(e){console.error(e);}
try{
(function(){"use strict";var SPACE_COLOR="#8b7aa8";function spaceName(l){return/leasing office/i.test(l)?"Leasing office":/community room/i.test(l)?"Community room":""}var ROOT=document.getElementById("or3d");if(!ROOT)return;if(!ROOT.querySelector("#omap")){
var TPL=document.getElementById("or3d-tpl");if(!TPL)return;ROOT.classList.add("or3d-map");ROOT.innerHTML=TPL.innerHTML}function sizeRoot(){var top=ROOT.getBoundingClientRect().top+(window.scrollY||0);var h=innerHeight-Math.min(top,innerHeight*.22)
;if(matchMedia("(max-width:767px)").matches)h=Math.round(h*.94);ROOT.style.setProperty("--or3d-h",Math.max(520,Math.round(h))+"px")}sizeRoot();var reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;var E=new THREE.Vector2(-260,200);var U=new THREE.Vector2(.7727,-.6347)
;var NRM=new THREE.Vector2(.6347,.7727);function along(t,off){return new THREE.Vector2(E.x+U.x*t+NRM.x*off,E.y+U.y*t+NRM.y*off)}var DIAG=.688+Math.PI;var BLDGS=[];[40,150,260,370,480].forEach(function(t,i){var p=along(t,72);BLDGS.push({x:p.x,z:p.y,rot:DIAG,type:i===0?"10B":"14A"})});BLDGS.push({
x:68,z:-215,rot:Math.PI/2,type:"14A"});BLDGS.push({x:68,z:-320,rot:Math.PI/2,type:"14A"});var ADDR=["6400","6410","6420","6430","6440","6450","6460"];BLDGS.forEach(function(b,i){b.id=i+1;b.num=ADDR[i];b.name=ADDR[i]+" Bandel Rd NW"});var DIRMAP={};DIR.forEach(function(r){DIRMAP[r[0]+"-"+r[1]]=r})
;var canvas=document.getElementById("scene");var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping
;renderer.toneMappingExposure=.95;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;var scene=new THREE.Scene;var camera=new THREE.PerspectiveCamera(38,1,12,6e3);var controls=new(THREE.MapControls||THREE.OrbitControls)(camera,canvas);controls.enableDamping=true
;controls.dampingFactor=.08;controls.maxPolarAngle=1.2;controls.minDistance=60;controls.maxDistance=2600;controls.screenSpacePanning=false;var hemi=new THREE.HemisphereLight(14675706,7174746,.75);scene.add(hemi);var sun=new THREE.DirectionalLight(16774114,1.25);sun.position.set(-320,520,300)
;sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);var sc=sun.shadow.camera;sc.left=-560;sc.right=560;sc.top=560;sc.bottom=-560;sc.near=50;sc.far=1600;sun.shadow.bias=-4e-4;sun.shadow.normalBias=.6;scene.add(sun);scene.add(sun.target);function tex(w,h,draw,rx,ry){
var c=document.createElement("canvas");c.width=w;c.height=h;var g=c.getContext("2d");draw(g,w,h);var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=renderer.capabilities.getMaxAnisotropy();if(rx)t.repeat.set(rx,ry);return t}
var sidingTex=tex(256,256,boards("#2e3135",5,"200,205,210"));var sidingDarkTex=tex(256,256,boards("#24272b",4,"190,195,200"));var woodTex=tex(256,256,boards("#9c5735",12,"240,200,160"));var stoneTex=tex(256,256,function(g,w,h){
var pal=["#b89a6e","#a68960","#8f8a80","#c9b48e","#7f766a","#b07b4f","#9d9488","#d2c09c"];g.fillStyle="#d4cdbd";g.fillRect(0,0,w,h);var y=0;while(y<h){var rh=rnd(16,34),x=-rnd(0,30);while(x<w){var rw=rnd(26,70);g.fillStyle=pal[Math.random()*pal.length|0];g.fillRect(x+2,y+2,rw-3,rh-3)
;g.fillStyle="rgba(0,0,0,.08)";g.fillRect(x+2,y+rh-5,rw-3,3);x+=rw}y+=rh}});var railTex=tex(128,64,function(g,w,h){g.clearRect(0,0,w,h);g.fillStyle="#1b1d20";for(var x=2;x<w;x+=8)g.fillRect(x,0,2,h);g.fillRect(0,0,w,5);g.fillRect(0,h-4,w,4)});var grassTex=tex(256,256,function(g,w,h){
g.fillStyle="#7f9a5c";g.fillRect(0,0,w,h);for(var i=0;i<2600;i++){g.fillStyle="rgba("+(90+rnd(-20,30)|0)+","+(120+rnd(-25,30)|0)+","+(70+rnd(-20,20)|0)+","+rnd(.15,.4)+")";g.fillRect(rnd(0,w),rnd(0,h),rnd(1,4),rnd(1,4))}},60,60);var lawnTex=tex(256,256,function(g,w,h){g.fillStyle="#86a85d"
;g.fillRect(0,0,w,h);for(var i=0;i<1800;i++){g.fillStyle="rgba("+(100+rnd(-15,25)|0)+","+(140+rnd(-20,25)|0)+","+(75+rnd(-15,15)|0)+","+rnd(.15,.35)+")";g.fillRect(rnd(0,w),rnd(0,h),rnd(1,3),rnd(1,3))}},1,1);lawnTex.repeat.set(1/40,1/40);function mat(o){
return new THREE.MeshStandardMaterial(Object.assign({roughness:.85,metalness:0},o))}function texMat(t,rx,ry,o){var c=t.clone();c.needsUpdate=true;c.repeat.set(rx,ry);return mat(Object.assign({map:c},o||{}))}var M={siding:texMat(sidingTex,W/16,H/10.7),sidingSide:texMat(sidingTex,D/16,H/10.7),
bay:texMat(sidingDarkTex,1,H/10.7),wood:texMat(woodTex,.9,H/10.7,{roughness:.75}),stone:texMat(stoneTex,1.4,1.1,{roughness:.95}),coping:mat({color:1908514,roughness:.6,metalness:.3}),roof:mat({color:4869715,roughness:.95}),frame:mat({color:1447963,roughness:.5,metalness:.4}),glass:mat({
color:10472125,roughness:.12,metalness:.55,envMapIntensity:1}),deck:mat({color:2040100,roughness:.6,metalness:.4}),rail:new THREE.MeshStandardMaterial({map:railTex,transparent:true,alphaTest:.5,side:THREE.DoubleSide,roughness:.5,metalness:.4}),concrete:mat({color:13618115,roughness:.95}),
asphalt:mat({color:4014148,roughness:.95}),road:mat({color:4869458,roughness:.95}),stripe:mat({color:15254855,roughness:.7}),white:mat({color:15856110,roughness:.7}),lawn:mat({map:lawnTex,roughness:1}),grass:mat({map:grassTex,roughness:1}),water:mat({color:7249845,roughness:.25,metalness:.2}),
trunk:mat({color:5915700}),leaf:mat({color:5208636,roughness:.9}),leaf2:mat({color:6983493,roughness:.9}),houseWall:mat({color:13617338}),houseRoof:mat({color:5593438}),mech:mat({color:10133670,roughness:.6,metalness:.3}),ghost:new THREE.MeshBasicMaterial({color:16777215,transparent:true,
opacity:.06,depthWrite:false}),pad:mat({color:12433582}),car:mat({roughness:.35,metalness:.5}),carTop:mat({color:2764081,roughness:.5,metalness:.3}),pole:mat({color:3816769,roughness:.5,metalness:.5})};Object.keys(M).forEach(function(k){var m=M[k]
;if(m.color&&!m.map&&m.isMeshStandardMaterial)m.color.convertSRGBToLinear()});function lin(hex){return new THREE.Color(hex).convertSRGBToLinear()}var GREY=lin("#9aa0a6");var ground=new THREE.Mesh(new THREE.PlaneGeometry(6e3,6e3),M.grass);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true
;scene.add(ground);function flatShape(pts,material,y){var s=new THREE.Shape;s.moveTo(pts[0][0],-pts[0][1]);for(var i=1;i<pts.length;i++)s.lineTo(pts[i][0],-pts[i][1]);var m=new THREE.Mesh(new THREE.ShapeGeometry(s),material);m.rotation.x=-Math.PI/2;m.position.y=y;m.receiveShadow=true;scene.add(m)
;return m}function ribbon(points,width,material,y,offset){offset=offset||0;var pos=[],idx=[];for(var i=0;i<points.length;i++){var p=points[i],q=points[Math.min(i+1,points.length-1)],o=points[Math.max(i-1,0)];var dx=q.x-o.x,dz=q.y-o.y,l=Math.hypot(dx,dz)||1,nx=-dz/l,nz=dx/l
;var a=offset-width/2,b=offset+width/2;pos.push(p.x+nx*a,y,p.y+nz*a,p.x+nx*b,y,p.y+nz*b);if(i<points.length-1){var k=i*2;idx.push(k,k+1,k+2,k+1,k+3,k+2)}}var g=new THREE.BufferGeometry;g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals()
;var m=new THREE.Mesh(g,material);m.receiveShadow=true;scene.add(m);return m}function curvePts(arr,n){var c=new THREE.CatmullRomCurve3(arr.map(function(p){return new THREE.Vector3(p[0],0,p[1])}),false,"centripetal");return c.getSpacedPoints(n).map(function(v){return new THREE.Vector2(v.x,v.z)})}
var P1=along(-60,-60),P6=along(-60,150);var lot=[[P1.x,P1.y],[0,-91],[0,-378],[252,-378],[252,-25],[P6.x,P6.y]];flatShape(lot,M.lawn,.3);var bandel=curvePts([[-520,700],[-470,420],[-425,270],[-385,150],[-320,-30],[-250,-230],[-200,-440],[-190,-700]],160);ribbon(bandel,38,M.road,1)
;var overland=curvePts([[-900,-462],[-300,-458],[200,-452],[700,-440],[1200,-420]],80);ribbon(overland,46,M.road,1.05);ribbon(curvePts([[-900,-490],[-300,-488],[200,-482],[700,-470],[1200,-450]],80),30,M.road,1.12);var C=along(500,0),M1=along(250,0),M2=along(450,0)
;var drivePts=curvePts([[-430,262],[-330,246],[E.x-U.x*30,E.y-U.y*30],[E.x,E.y],[M1.x,M1.y],[M2.x,M2.y],[C.x,C.y],[140,-168],[140,-215],[140,-385]],260);ribbon(drivePts,62,M.asphalt,1.5);var sw1=[];for(var t=0;t<=505;t+=5){sw1.push(along(t,36))}ribbon(sw1,6,M.concrete,1.9)
;ribbon([new THREE.Vector2(104,-170),new THREE.Vector2(104,-372)],6,M.concrete,1.9);var stripeGeo=new THREE.BoxGeometry(.5,.15,17);var stripes=[];function stallRow(start,dir,perp,len,off){for(var s=0;s<=len;s+=9.5){stripes.push({x:start.x+dir.x*s+perp.x*off,z:start.y+dir.y*s+perp.y*off,
ang:Math.atan2(dir.x,dir.y)})}}[[60,420]].forEach(function(r){var st=along(r[0],0);stallRow(st,U,NRM,r[1],-22);stallRow(st,U,NRM,r[1],22)});stallRow(new THREE.Vector2(140,-190),new THREE.Vector2(0,-1),new THREE.Vector2(1,0),180,-22)
;stallRow(new THREE.Vector2(140,-190),new THREE.Vector2(0,-1),new THREE.Vector2(1,0),180,22);var stripeMesh=new THREE.InstancedMesh(stripeGeo,M.stripe,stripes.length);var dummy=new THREE.Object3D;stripes.forEach(function(s,i){dummy.position.set(s.x,2.2,s.z);dummy.rotation.set(0,s.ang+Math.PI/2,0)
;dummy.updateMatrix();stripeMesh.setMatrixAt(i,dummy.matrix)});scene.add(stripeMesh);(function(){var B=new THREE.BoxGeometry(1,1,1),cols=["#f2f2f0","#1d1f22","#8a8f95","#5a6470","#9b1c1f","#2b3f5c","#c9ccd1","#e8e6e0","#3d4a3d"],sd=7,cars=[],tops=[],poles=[],heads=[];function r(){
return(sd=(9301*sd+49297)%233280)/233280}function inst(list,material,shadow){var im=new THREE.InstancedMesh(B,material,list.length);list.forEach(function(e,i){dummy.position.set(e[0],e[1],e[2]);dummy.rotation.set(0,e[3],0);dummy.scale.set(e[4],e[5],e[6]);dummy.updateMatrix()
;im.setMatrixAt(i,dummy.matrix);if(e[7])im.setColorAt(i,e[7])});im.castShadow=shadow;im.receiveShadow=true;scene.add(im)}for(var i=0;i<stripes.length-1;i++){var a=stripes[i],b=stripes[i+1];if(Math.hypot(a.x-b.x,a.z-b.z)>11||r()>.52)continue;var x=(a.x+b.x)/2,z=(a.z+b.z)/2,ang=a.ang+Math.PI/2
;cars.push([x,2.2,z,ang,6,2.8,14.5,lin(cols[r()*cols.length|0])]);tops.push([x,4.4,z,ang,5.2,1.8,6.4])}for(var k=60;k<drivePts.length;k+=24){var p=drivePts[k],q=drivePts[Math.min(k+2,drivePts.length-1)],dx=q.x-p.x,dz=q.y-p.y,l=Math.hypot(dx,dz)||1,nx=-dz/l,nz=dx/l,px=p.x-34*nx,pz=p.y-34*nz
;poles.push([px,12,pz,0,.8,24,.8]);heads.push([px+2*nx,24.3,pz+2*nz,Math.atan2(nx,nz),1.6,.8,4])}inst(cars,M.car,true);inst(tops,M.carTop,true);inst(poles,M.pole,true);inst(heads,M.carTop,false)})();var rec=along(-20,115)
;flatShape([[rec.x-30,rec.y-22],[rec.x+30,rec.y-22],[rec.x+30,rec.y+22],[rec.x-30,rec.y+22]],M.pad,1.25);[[380,-300,70,40],[520,-285,62,38],[640,-260,40,46]].forEach(function(p){var m=new THREE.Mesh(new THREE.CircleGeometry(1,40),M.water);m.rotation.x=-Math.PI/2;m.scale.set(p[2],p[3],1)
;m.position.set(p[0],.6,p[1]);scene.add(m)});var treeSpots=[]
;function farFromStuff(x,z){for(var i=0;i<BLDGS.length;i++){if(Math.hypot(x-BLDGS[i].x,z-BLDGS[i].z)<54)return false}for(var j=0;j<drivePts.length;j+=3){if(Math.hypot(x-drivePts[j].x,z-drivePts[j].y)<40)return false}if(Math.hypot(x-rec.x,z-rec.y)<45)return false;return true}
for(var t2=-30;t2<=560;t2+=24){var a=along(t2,128+rnd(-10,10));if(farFromStuff(a.x,a.y))treeSpots.push(a);var b=along(t2,-48+rnd(-6,6));if(farFromStuff(b.x,b.y))treeSpots.push(b)}for(var zz=-370;zz<-120;zz+=26){treeSpots.push(new THREE.Vector2(12+rnd(-4,4),zz))
;treeSpots.push(new THREE.Vector2(242+rnd(-4,4),zz))}for(var i3=0;i3<40;i3++){var tx=rnd(160,250),tz=rnd(-360,-20);if(farFromStuff(tx,tz))treeSpots.push(new THREE.Vector2(tx,tz))}var trunkG=new THREE.CylinderGeometry(.9,1.2,10,6),crownG=new THREE.IcosahedronGeometry(1,1)
;var trunks=new THREE.InstancedMesh(trunkG,M.trunk,treeSpots.length),crowns=new THREE.InstancedMesh(crownG,M.leaf,treeSpots.length);trunks.castShadow=crowns.castShadow=true;treeSpots.forEach(function(p,i){var s=rnd(.8,1.3);dummy.position.set(p.x,5*s,p.y);dummy.rotation.set(0,0,0)
;dummy.scale.set(s,s,s);dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);dummy.position.set(p.x,14*s,p.y);dummy.scale.set(9*s,10*s,9*s);dummy.rotation.set(0,rnd(0,6),0);dummy.updateMatrix();crowns.setMatrixAt(i,dummy.matrix);crowns.setColorAt(i,lin(Math.random()<.5?"#4f7a3c":"#6a8f45"))})
;scene.add(trunks);scene.add(crowns);var BOX=new THREE.BoxGeometry(1,1,1);function part(group,material,w,h,d,x,y,z,shadow){var m=new THREE.Mesh(BOX,material);m.scale.set(w,h,d);m.position.set(x,y,z);if(shadow!==false){m.castShadow=true;m.receiveShadow=true}group.add(m);return m}
var winFrames=[],winGlass=[];function makeBuilding(b){var g=new THREE.Group;g.position.set(b.x,0,b.z);g.rotation.y=b.rot;scene.add(g);var shell=new THREE.Group;g.add(shell);var core=new THREE.Mesh(BOX,[M.sidingSide,M.sidingSide,M.roof,M.roof,M.siding,M.siding]);core.scale.set(W,H,D)
;core.position.y=H/2;core.castShadow=core.receiveShadow=true;shell.add(core);part(shell,M.coping,W+.8,1.4,D+.8,0,H+.5,0);part(shell,M.roof,W-1,.2,D-1,0,H+1.25,0,false);part(shell,M.bay,14.5,H+1.6,1.2,-hw+7.25,(H+1.6)/2,hd+.6);part(shell,M.wood,12,H,.9,12.5,H/2,hd+.45)
;part(shell,M.bay,10,H+1.6,1.2,hw-5,(H+1.6)/2,-hd-.6);part(shell,M.wood,12,H,.9,4,H/2,-hd-.45);part(shell,M.wood,.9,H,13,hw+.45,H/2,-12);part(shell,M.bay,1.2,H+1.6,14,-hw-.6,(H+1.6)/2,-25);part(shell,M.stone,15.3,10.8,4.5,-hw+7.4,5.4,hd-1.2);part(shell,M.stone,4.5,10.8,13,-hw+1.2,5.4,hd-6.5)
;part(shell,M.stone,11,10.8,4.5,hw-5.3,5.4,-hd+1.2);part(shell,M.coping,12,.7,6.5,-8,9.8,hd+3.3);[-14,4].forEach(function(z){for(var f=1;f<3;f++){var y=f*FH;part(shell,M.deck,6,.6,11,-hw-3,y+.3,z);var r1=part(shell,M.rail,11,3.6,.15,-hw-6,y+2.4,z,false);r1.rotation.y=Math.PI/2
;r1.scale.set(11,3.6,.15);part(shell,M.rail,6,3.6,.15,-hw-3,y+2.4,z-5.5,false);part(shell,M.rail,6,3.6,.15,-hw-3,y+2.4,z+5.5,false)}part(shell,M.concrete,6,.3,11,-hw-3,.4,z)});for(var f2=1;f2<3;f2++){var y2=f2*FH;part(shell,M.deck,5,.6,10,hw+2.5,y2+.3,12)
;var rr=part(shell,M.rail,10,3.6,.15,hw+5,y2+2.4,12,false);rr.rotation.y=Math.PI/2;rr.scale.set(10,3.6,.15)}part(shell,M.mech,6,3,5,10,H+2.2,-12);part(shell,M.mech,5,2.6,5,-12,H+2,8);b.winStart=winFrames.length;windowsFor(b.type).forEach(function(w){var t=faceXform(w.face,w.u,w.fl*FH+w.sill+w.h/2)
;winFrames.push({b:b,x:t.x,y:t.y,z:t.z,ry:t.ry,w:w.w+.5,h:w.h+.5,d:.35});winGlass.push({b:b,x:t.x,y:t.y,z:t.z,ry:t.ry,w:w.w,h:w.h,d:.45})});b.winEnd=winFrames.length;var pick=new THREE.Mesh(BOX,new THREE.MeshBasicMaterial({visible:false}));pick.scale.set(W+2,H+3,D+2);pick.position.y=H/2
;pick.userData.bldg=b;g.add(pick);var ghost=new THREE.Mesh(BOX,M.ghost);ghost.scale.set(W,H,D);ghost.position.y=H/2;ghost.visible=false;g.add(ghost);var ge=new THREE.LineSegments(new THREE.EdgesGeometry(BOX),new THREE.LineBasicMaterial({color:16777215,transparent:true,opacity:.45}))
;ge.scale.copy(ghost.scale);ge.position.copy(ghost.position);ge.visible=false;g.add(ge);var units=new THREE.Group;units.visible=false;g.add(units);b.group=g;b.shell=shell;b.pick=pick;b.ghost=ghost;b.ghostEdge=ge;b.units=units;b.floorGroups=[];b.apts=[];b.spaces=[];b.gap=0;b.gapTarget=0
;TYPES[b.type].floors.forEach(function(fl,fi){var fg=new THREE.Group;units.add(fg);b.floorGroups.push(fg);var slab=part(fg,M.concrete,W,.6,D,0,.3,0,false);slab.material=M.concrete;fl.forEach(function(s){var r=RECT[s.r],w=r[2]-r[0],d=r[3]-r[1],cx=(r[0]+r[2])/2-hw,cz=(r[1]+r[3])/2-hd
;var isApt=!!s.p,h=isApt?FH-1.6:FH-3.2;var m=new THREE.Mesh(BOX,new THREE.MeshStandardMaterial({color:lin(isApt?bedColor(PLANS[s.p].beds):spaceName(s.a)?SPACE_COLOR:"#b9bdc2"),roughness:.7,transparent:true,opacity:1}));m.scale.set(w-.9,h,d-.9);m.position.set(cx,.6+h/2,cz);m.castShadow=true;fg.add(m)
;var edge=new THREE.LineSegments(new THREE.EdgesGeometry(BOX),new THREE.LineBasicMaterial({color:16777215,transparent:true,opacity:.7}));edge.scale.copy(m.scale);edge.position.copy(m.position);fg.add(edge);var rec={b:b,floor:fi,mesh:m,edge:edge,cx:cx,cz:cz,h:h};if(isApt){
var p=PLANS[s.p],unit=fi+1+s.u,row=DIRMAP[b.num+"-"+unit];Object.assign(rec,{plan:p,pkey:s.p,unit:unit,id:b.num+"-"+unit,title:row?row[2]:"",rent:row?row[3]:0,sf:row?row[4]:p.sf,beds:row?row[5]:p.beds,baths:row?row[6]:p.baths,ada:row?!!row[7]:!!p.ada})
;rec.nice=shortTitle(rec.title)||(p.beds===0?"Studio":p.beds+" Bed "+p.baths+" Bath");m.userData.apt=rec;b.apts.push(rec)}else{rec.label=s.a;rec.nm=spaceName(s.a);if(rec.nm)m.userData.space=rec;b.spaces.push(rec)}})});return g}BLDGS.forEach(makeBuilding)
;var frameIM=new THREE.InstancedMesh(BOX,M.frame,winFrames.length),glassIM=new THREE.InstancedMesh(BOX,M.glass,winGlass.length);frameIM.castShadow=true;function placeWindows(){var tmp=new THREE.Object3D;[[winFrames,frameIM],[winGlass,glassIM]].forEach(function(pair){pair[0].forEach(function(w,i){
var hidden=w.b.shellHidden;tmp.position.set(w.x,w.y,w.z);tmp.rotation.set(0,w.ry,0);tmp.scale.set(hidden?1e-4:w.w,hidden?1e-4:w.h,w.d);tmp.updateMatrix();tmp.matrix.premultiply(w.b.group.matrixWorld);pair[1].setMatrixAt(i,tmp.matrix)});pair[1].instanceMatrix.needsUpdate=true})}
scene.updateMatrixWorld(true);placeWindows();scene.add(frameIM);scene.add(glassIM);function isDark(){return false}function applyTheme(){var dark=isDark();var sky=new THREE.Color(dark?2305080:13623788);scene.background=sky;scene.fog=new THREE.Fog(sky.getHex(),1400,3600);hemi.intensity=dark?.5:.75
;sun.intensity=dark?.9:1.25;sun.color.set(dark?14673663:16774114)}applyTheme();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",applyTheme);new MutationObserver(applyTheme).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]})
;var MAPEL=document.getElementById("omap"),ROOTEL=document.getElementById("or3d");function VW(){return MAPEL.clientWidth||1}function VH(){return MAPEL.clientHeight||1}function RR(){return MAPEL.getBoundingClientRect()}function isMobile(){return matchMedia("(max-width:767px)").matches}var state={
beds:"all",ada:false,maxRent:0,plan:"",sqft:"",floorF:"",bldg:null,floor:"all",sel:null,hover:null,hoverB:null,view:"a",stay:false,q:"",bedsS:[],bathsS:[],priceS:[]};function inSqft(a){if(!state.sqft)return true;var r=state.sqft.split("-");return a.sf>=+r[0]&&a.sf<+r[1]}function inPrice(a){
return!state.priceS.length||state.priceS.some(function(k){var r=k.split("-");return a.rent>=+r[0]&&a.rent<=+r[1]})}function matches(a){
return(state.beds==="all"||a.beds===state.beds)&&(!state.bedsS.length||state.bedsS.indexOf(a.beds)>-1)&&(!state.bathsS.length||state.bathsS.indexOf(a.baths)>-1)&&inPrice(a)&&(!state.ada||a.ada)&&(!state.maxRent||a.rent<=state.maxRent)&&(!state.plan||a.nice===state.plan)&&inSqft(a)&&(state.floorF===""||a.floor===+state.floorF)&&(!window.OR3D_MATCH||window.OR3D_MATCH(a))
}function filtering(){return state.bedsS.length>0||state.bathsS.length>0||state.priceS.length>0||state.beds!=="all"||state.ada||!!state.maxRent||!!state.plan||!!state.sqft||state.floorF!==""||!!(window.OR3D_FILTERING&&window.OR3D_FILTERING())}var ALL=[];BLDGS.forEach(function(b){
ALL=ALL.concat(b.apts)});setTimeout(function(){ALL.forEach(function(a){BYID[a.id]=a})},0);function apply(){var f=filtering();BLDGS.forEach(function(b){var focused=state.bldg===b;var showUnits=focused||f;var hideShell=showUnits;if(!!b.shellHidden!==hideShell){b.shellHidden=hideShell
;b.windowsDirty=true}b.shell.visible=!hideShell;b.units.visible=showUnits;b.ghost.visible=b.ghostEdge.visible=f&&!focused;b.gapTarget=focused?13:0;b.floorGroups.forEach(function(fg,fi){var floorOn=!focused||state.floor==="all"||state.floor===fi
;fg.visible=!(focused&&state.floor!=="all"&&fi>state.floor);fg.children.forEach(function(ch){if(ch.material&&ch.material===M.concrete){ch.visible=focused}});b.apts.filter(function(a){return a.floor===fi}).forEach(function(a){var on=floorOn&&matches(a);a.mesh.material.color.copy(aptColor(a,on))
;a.mesh.material.opacity=on?1:floorOn?.14:.1;a.mesh.material.depthWrite=on;a.edge.material.opacity=on?.8:.1;styleSel(a);a.mesh.castShadow=on});b.spaces.filter(function(s){return s.floor===fi}).forEach(function(s){var on=focused&&floorOn&&!f;s.mesh.visible=focused;s.mesh.material.opacity=on?.95:.06
;s.mesh.material.depthWrite=on;s.edge.visible=focused;s.edge.material.opacity=on?.6:.05})})});if(BLDGS.some(function(b){return b.windowsDirty})){placeWindows();BLDGS.forEach(function(b){b.windowsDirty=false})}renderPanel()}var $=function(id){return document.getElementById(id)}
;$("legend").innerHTML=BEDS.map(function(x){return'<li><span class="sw" style="background:'+x.color+'"></span>'+x.label+"</li>"}).join("")+(BLDGS.some(function(b){return TYPES[b.type].office})?'<li><span class="sw" style="background:'+SPACE_COLOR+'"></span>Office &amp; community room</li>':"")
;function mixBar(apts){var n=apts.length||1;return'<span class="mix">'+BEDS.map(function(x){var c=apts.filter(function(a){return a.beds===x.k}).length;return c?'<i style="width:'+c/n*100+"%;background:"+x.color+'"></i>':""}).join("")+"</span>"}function meta(a,o){o=o||{}
;return'<span class="meta">'+(o.bldg?'<span title="Building">'+IC.bldg+(o.full?a.b.name:a.b.num)+"</span>":"")+'<span title="Apartment number">'+IC.unit+a.unit+"</span>"+(o.floor?'<span title="Floor">'+IC.floor+ORD[a.floor]+" floor</span>":"")+(o.noArea?"":'<span title="Size">'+IC.area+a.sf.toLocaleString("en-US")+" sq ft</span>")+(a.ada?'<span class="acc">'+IC.acc+"Accessible</span>":"")+"</span>"
}function unitLine(a,withBldg){return meta(a,{bldg:withBldg,floor:withBldg})}function cardHTML(a){return'<div class="card"><div class="c-top"><h3>'+a.nice+'</h3><div class="c-rent"><b>'+money(a.rent)+"</b></div></div>"+meta(a,{bldg:true,floor:true
})+(window.OR3D_ROWX?window.OR3D_ROWX(a,1):"")+'<div class="c-plan">'+fpBig(a)+(TOURS[a.beds]?'<button type="button" class="c-3d" data-tour="'+a.beds+'">'+IC.tour+"3D tour</button>":"")+"</div>"+'<div class="cta"><button type="button" class="sched" data-schedule="'+a.id+'" data-label="'+a.b.num+" #"+a.unit+" ("+a.nice+')">Schedule a tour</button><a class="pri" href="#apply">Apply now</a></div>'+'<div class="cta see3d"><button type="button" data-see3d="1">See it on the 3D map</button></div></div>'
}function aptRow(a,withBldg){
return"<li"+(state.sel===a?' class="open"':"")+'><button type="button" class="urow'+(matches(a)?"":" dim")+(state.hover===a?" hot":"")+'" data-id="'+a.id+'" aria-current="'+(state.sel===a)+'"><span class="fpt">'+fpThumb(a)+'<span class="sw" style="background:'+bedColor(a.beds)+'"></span></span><span><span class="t">'+a.nice+(TOURS[a.beds]?'<span class="b3d" title="3D tour available">'+IC.tour+"3D</span>":"")+"</span>"+unitLine(a,withBldg)+(window.OR3D_ROWX?window.OR3D_ROWX(a):"")+'</span><span class="rentv">'+money(a.rent)+"</span></button>"+(state.sel===a?cardHTML(a):"")+"</li>"
}var BYID={};var ORD=["1st","2nd","3rd"];function renderPanel(){setTimeout(renderMini,0);var m=ALL.filter(matches).length;$("match").innerHTML=filtering()?"<b>"+m+"</b> of 94 apartments match":"<b>94</b> apartments from <b>"+money(Math.min.apply(0,ALL.map(function(a){
return a.rent})))+"</b>";document.querySelectorAll("#fmore .chips button").forEach(function(btn){var f=btn.parentNode.dataset.f,v=f==="price"?btn.dataset.v:+btn.dataset.v;btn.setAttribute("aria-pressed",String(state[f+"S"].indexOf(v)>-1))});$("clearf").disabled=!filtering()
;var nf=(state.bedsS.length?1:0)+(state.bathsS.length?1:0)+(state.priceS.length?1:0)+(state.maxRent?1:0)+(state.sqft?1:0)+(state.plan?1:0)+(state.floorF!==""?1:0)+(state.ada?1:0);$("fcount").hidden=!nf;$("fcount").textContent=nf;if(!state.bldg||state.stay){$("campusView").hidden=false
;$("bldgView").hidden=true;document.querySelectorAll(".ctabs button").forEach(function(btn){btn.setAttribute("aria-pressed",String(btn.dataset.v===state.view))});$("blist").hidden=state.view!=="b";$("aview").hidden=state.view!=="a";if(state.view==="b"){$("blist").innerHTML=BLDGS.map(function(b){
var c=b.apts.filter(matches).length,low=Math.min.apply(0,b.apts.map(function(a){return a.rent}))
;return'<li><button type="button" class="brow'+(state.hoverB===b?" hot":"")+'" data-b="'+b.id+'"><span class="bnum">'+b.num+'</span><span><span class="t">'+b.name+'</span><span class="s" style="display:block">'+(TYPES[b.type].office?"Leasing office, community room":"From "+money(low))+"</span>"+mixBar(b.apts)+"</span>"+'<span class="bcount"><b>'+(filtering()?c:b.apts.length)+"</b>"+(filtering()?"match":"apartments")+"</span></button></li>"
}).join("")}else{var q=state.q.replace(/[^0-9]/g,"");var list=ALL.filter(function(a){return matches(a)&&(!q||(a.b.num+a.unit).indexOf(q)>-1||a.unit.indexOf(q)===0)}).sort(function(x,y){return x.rent-y.rent||x.id.localeCompare(y.id)});$("alist").innerHTML=list.length?list.map(function(a){
return aptRow(a,true)}).join(""):'<li class="empty">No apartments match. Try a higher rent limit or another size.</li>'}}else{var b=state.bldg;$("campusView").hidden=true;$("bldgView").hidden=false;$("btitle").textContent=b.name;$("bsub").textContent=TYPES[b.type].label+", three floors"
;document.querySelectorAll(".floors button").forEach(function(btn){btn.setAttribute("aria-pressed",String(btn.dataset.floor===String(state.floor)));var fl=btn.dataset.floor,n=b.apts.filter(function(x){return matches(x)&&(fl==="all"||x.floor===+fl)}).length
;btn.innerHTML=(fl==="all"?"All":ORD[+fl])+" <small>"+n+"</small>"});var html="";[0,1,2].forEach(function(fi){if(state.floor!=="all"&&state.floor!==fi)return;html+='<li class="fl">'+ORD[fi]+" floor</li>";b.spaces.filter(function(s){return s.floor===fi&&s.label.indexOf("Stairs")<0
}).forEach(function(s){html+='<li class="amen"><span class="sw" style="background:'+(s.nm?SPACE_COLOR:"#b9bdc2")+'"></span>'+s.label+"</li>"});b.apts.filter(function(a){return a.floor===fi}).forEach(function(a){html+=aptRow(a,false)})});$("ulist").innerHTML=html;var a=state.sel
;$("card").innerHTML=""}}document.querySelectorAll("#fmore .chips").forEach(function(g){g.addEventListener("click",function(e){var btn=e.target.closest("button");if(!btn)return;var f=g.dataset.f,arr=state[f+"S"],v=f==="price"?btn.dataset.v:+btn.dataset.v,i=arr.indexOf(v)
;if(i<0)arr.push(v);else arr.splice(i,1);if(state.sel&&!matches(state.sel))state.sel=null;apply()})});document.querySelectorAll("#fmore .chips button").forEach(function(btn){var f=btn.parentNode.dataset.f,v=btn.dataset.v,n=ALL.filter(function(a){if(f==="beds")return a.beds===+v
;if(f==="baths")return a.baths===+v;var r=v.split("-");return a.rent>=+r[0]&&a.rent<=+r[1]}).length;btn.insertAdjacentHTML("beforeend","<small>"+n+"</small>")});$("ada").addEventListener("change",function(){state.ada=this.checked;if(state.sel&&!matches(state.sel))state.sel=null;apply()})
;function onFilter(){state.sqft=$("sqft").value;state.plan=$("plan").value;state.floorF=$("floorf").value;state.ada=$("ada").checked;if(state.sel&&!matches(state.sel))state.sel=null;apply()}["sqft","plan","floorf"].forEach(function(id){$(id).addEventListener("change",onFilter)})
;$("clearf").addEventListener("click",function(){["sqft","plan","floorf"].forEach(function(id){$(id).value=""});$("ada").checked=false;state.beds="all";state.bedsS=[];state.bathsS=[];state.priceS=[];onFilter()});(function(){var m={};ALL.forEach(function(a){var k=a.nice;if(!m[k])m[k]={n:0,
beds:a.beds,sf:a.sf};m[k].n++;m[k].sf=Math.min(m[k].sf,a.sf)});Object.keys(m).sort(function(x,y){return m[x].beds-m[y].beds||m[x].sf-m[y].sf}).forEach(function(k){var o=document.createElement("option");o.value=k;o.textContent=k+" ("+m[k].n+")";$("plan").appendChild(o)})})()
;document.querySelector(".ctabs").addEventListener("click",function(e){var btn=e.target.closest("button");if(!btn)return;state.view=btn.dataset.v;renderPanel()});$("find").addEventListener("input",function(){state.q=this.value;if(state.bldg){state.bldg=null;state.sel=null;state.floor="all";apply()
;fly(homePos(),CENTER.clone(),900)}state.view="a";if(isMobile())setMView("list");renderPanel()});$("find").addEventListener("keydown",function(e){if(e.key!=="Enter")return;var a=findUnit(this.value);if(a)openApt(a)});$("alist").addEventListener("click",function(e){
var btn=e.target.closest("[data-id]");if(!btn)return;var a=BYID[btn.dataset.id];if(state.sel===a){keepRow(btn,function(){state.sel=null;apply()});return}keepRow(btn,function(){state.stay=true;state.bldg=a.b;state.floor=a.floor;state.sel=a;state.hover=null;apply();frameBuilding(a.b)});revealCard()})
;$("alist").addEventListener("mouseover",function(e){var btn=e.target.closest("[data-id]");var a=btn?BYID[btn.dataset.id]:null;if(a!==state.hover){state.hover=a;state.hoverB=a?a.b:null;markPins();applyColorsOnly()}});$("alist").addEventListener("mouseleave",function(){state.hover=null
;state.hoverB=null;markPins();applyColorsOnly()});function findUnit(v){var d=String(v||"").replace(/[^0-9]/g,"");if(d.length>=7)return BYID[d.slice(0,4)+"-"+d.slice(4,7)]||null;var hits=ALL.filter(function(a){return(a.b.num+a.unit).indexOf(d)>-1});return hits.length===1?hits[0]:null}
function keepRow(btn,fn){var list=btn.closest("ul"),id=btn.dataset.id,t0=btn.getBoundingClientRect().top;fn();var nb=list&&list.querySelector('[data-id="'+id+'"]');if(nb){$("panel").scrollTop+=nb.getBoundingClientRect().top-t0}}function openApt(a){if(!a)return;if(!matches(a)){
["sqft","plan","floorf"].forEach(function(id){$(id).value=""});$("ada").checked=false;state.beds="all";state.bedsS=[];state.bathsS=[];state.priceS=[];state.ada=false;state.maxRent=0;state.plan="";state.sqft="";state.floorF=""}state.stay=false;state.bldg=a.b;state.floor=a.floor;state.sel=null
;state.hover=null;selectApt(a);frameBuilding(a.b)}function openFromHash(){var a=findUnit(location.hash);if(a&&location.hash.replace(/[^0-9]/g,"").length>=7)openApt(a)}addEventListener("hashchange",openFromHash);$("blist").addEventListener("click",function(e){var btn=e.target.closest("[data-b]")
;if(btn)focusBuilding(BLDGS[+btn.dataset.b-1])});$("blist").addEventListener("mouseover",function(e){var btn=e.target.closest("[data-b]");state.hoverB=btn?BLDGS[+btn.dataset.b-1]:null;markPins()});$("blist").addEventListener("mouseleave",function(){state.hoverB=null;markPins()})
;$("back").addEventListener("click",function(){overview()});document.querySelector(".floors").addEventListener("click",function(e){var btn=e.target.closest("button");if(!btn)return;state.floor=btn.dataset.floor==="all"?"all":+btn.dataset.floor
;if(state.sel&&state.floor!=="all"&&state.sel.floor!==state.floor)state.sel=null;apply();frameBuilding(state.bldg)});$("ulist").addEventListener("click",function(e){var btn=e.target.closest("[data-id]");if(!btn)return;var a=BYID[btn.dataset.id];keepRow(btn,function(){state.sel=state.sel===a?null:a
;apply()});if(state.sel)revealCard()});$("ulist").addEventListener("mouseover",function(e){var btn=e.target.closest("[data-id]");var a=btn?BYID[btn.dataset.id]:null;if(a!==state.hover){state.hover=a;applyColorsOnly()}});$("ulist").addEventListener("mouseleave",function(){state.hover=null
;applyColorsOnly()});$("reset").addEventListener("click",function(){overview()});$("compass").addEventListener("click",function(){var t=controls.target.clone(),dist=camera.position.distanceTo(t),pol=controls.getPolarAngle();fly(new THREE.Vector3(t.x,t.y+dist*Math.cos(pol),t.z+dist*Math.sin(pol)),t)
});function zoomBy(k){var t=controls.target.clone(),d=camera.position.clone().sub(t),nl=Math.min(controls.maxDistance,Math.max(controls.minDistance,d.length()*k));fly(t.clone().add(d.setLength(nl)),t,350)}$("zin").addEventListener("click",function(){zoomBy(.7)})
;$("zout").addEventListener("click",function(){zoomBy(1.4)});var sheetState="half",panelEl=$("panel");function setSheet(){}var rq=0;if(window.ResizeObserver)new ResizeObserver(function(){if(rq)return;rq=requestAnimationFrame(function(){rq=0;resize()})}).observe(panelEl)
;$("ftoggle").addEventListener("click",function(){var open=!$("fmore").classList.contains("open");$("fmore").classList.toggle("open",open);this.setAttribute("aria-expanded",String(open));if(open&&isMobile()&&ROOTEL.classList.contains("ov-map"))setMView("list")});function revealCard(){
var body=$("panel"),li=[].filter.call(body.querySelectorAll("li.open"),function(l){return l.offsetParent!==null})[0];if(!li)return;var hd=body.querySelector(".of-lhead"),off=hd?hd.getBoundingClientRect().height:0;var r=li.getBoundingClientRect(),p=body.getBoundingClientRect()
;if(r.top>=p.top+off+8&&r.bottom<=p.bottom-8)return;var y=0,el=li;while(el&&el!==body){y+=el.offsetTop;el=el.offsetParent}var target=Math.max(0,Math.min(body.scrollHeight-body.clientHeight,y-off-8));if(reduceMotion){body.scrollTop=target;return}body.scrollTo({top:target,behavior:"smooth"})
;setTimeout(function(){if(Math.abs(body.scrollTop-target)>4)body.scrollTop=target},700)}function openTour(beds){var id=TOURS[beds];if(!id)return;var url="https://my.matterport.com/show/?m="+id
;$("tourTitle").innerHTML="3D tour <span>"+(state.sel?state.sel.nice:beds===0?"Studio":beds+" Bed")+"</span>";$("tourOpen").href=url;$("tourFbLink").href=url;$("tourFallback").hidden=true;$("tourFrame").hidden=false;$("tourFrame").src=url+"&play=1&qs=1";if(TOUR_BLOCKED)showTourFallback()
;$("tour").hidden=false;tourReturn=document.activeElement;$("tourClose").focus()}var TOUR_BLOCKED=false;function showTourFallback(){$("tourFrame").hidden=true;$("tourFallback").hidden=false}document.addEventListener("securitypolicyviolation",function(e){if(/matterport/i.test(e.blockedURI||"")){
TOUR_BLOCKED=true;if(!$("tour").hidden)showTourFallback()}});var tourReturn=null;function closeTour(){if($("tour").hidden)return;$("tour").hidden=true;$("tourFrame").src="about:blank";if(tourReturn&&tourReturn.focus)tourReturn.focus()}$("panel").addEventListener("click",function(e){
var b=e.target.closest("[data-tour]");if(b)openTour(+b.dataset.tour)});$("tourClose").addEventListener("click",closeTour);$("tour").addEventListener("click",function(e){if(e.target===this)closeTour()});addEventListener("keydown",function(e){if(e.key==="Escape"&&!$("tour").hidden){
e.stopImmediatePropagation();e.preventDefault();closeTour()}},true);function aptColor(a,on){if(!on&&state.sel!==a)return GREY;var c=lin(bedColor(a.beds));if(state.hover===a||state.sel===a)c.offsetHSL(0,0,.08);return c}var GLOW=lin("#4a2410"),NOGLOW=new THREE.Color(0);function styleSel(a){
var s=state.sel===a,lift=s?2.4:0;a.mesh.material.emissive.copy(s?GLOW:NOGLOW);a.mesh.position.y=.6+a.h/2+lift;a.edge.position.y=a.mesh.position.y;a.edge.material.color.set(s?16777215:16777215);a.edge.material.opacity=s?1:a.edge.material.opacity}function aptOn(a){var b=a.b,focused=state.bldg===b
;return(!focused||state.floor==="all"||state.floor===a.floor)&&matches(a)}function applyColorsOnly(){ALL.forEach(function(a){a.mesh.material.color.copy(aptColor(a,aptOn(a)));styleSel(a)});document.querySelectorAll(".urow").forEach(function(r){
r.classList.toggle("hot",BYID[r.dataset.id]===state.hover)})}var flight=null;function fly(pos,target,ms){if(window.OR3D_FLYHOOK){var hk=window.OR3D_FLYHOOK(pos,target);pos=hk[0];target=hk[1]}ms=reduceMotion?0:ms||1e3;flight={p0:camera.position.clone(),t0:controls.target.clone(),p1:pos,t1:target,
start:performance.now(),ms:ms}}var CENTER=new THREE.Vector3;BLDGS.forEach(function(b){CENTER.x+=b.x;CENTER.z+=b.z});CENTER.divideScalar(BLDGS.length);CENTER.x-=25;CENTER.z+=30;CENTER.y=8;function isSheet(){return false}function homePos(){var k=Math.max(1,Math.min(1.6,1.2/(VW()/VH())))
;return new THREE.Vector3(CENTER.x-640*k,560*k,CENTER.z+360*k)}function overview(){state.stay=false;state.bldg=null;state.sel=null;state.floor="all";state.hover=null;apply();fly(homePos(),CENTER.clone(),1100)}function bldgFront(b){return new THREE.Vector3(Math.sin(b.rot),0,Math.cos(b.rot))}
function frameBuilding(b){var f=bldgFront(b),side=new THREE.Vector3(f.z,0,-f.x);var tgt=new THREE.Vector3(b.x,22,b.z);if(state.floor!=="all"){tgt.y=state.floor*(FH+13)+6}var dist=290*Math.max(1,Math.min(1.7,1.15/(VW()/VH())))
;var pos=tgt.clone().add(f.clone().multiplyScalar(dist*.75)).add(side.multiplyScalar(dist*.42));pos.y=tgt.y+(state.floor==="all"?120:150);fly(pos,tgt,1e3)}function focusBuilding(b){state.stay=false;state.bldg=b;state.sel=null;state.floor="all";state.hover=null;state.hoverB=null;apply()
;frameBuilding(b)}function selectApt(a){if(state.bldg!==a.b){state.bldg=a.b;frameBuilding(a.b)}state.sel=state.sel===a?null:a;apply();if(state.sel)revealCard()}var labelsEl=$("labels"),pins=[];BLDGS.forEach(function(b){var el=document.createElement("button");el.type="button";el.className="pin"
;el.tabIndex=-1;el.innerHTML="<span><i>"+b.num+'</i><em style="font-style:normal"></em>'+(TYPES[b.type].office?'<b class="lo lo-l">Leasing office</b><b class="lo lo-l">Community room</b><b class="lo lo-s">Office</b><b class="lo lo-s">Community</b>':"")+"</span>"
;el.addEventListener("click",function(){focusBuilding(b)});el.addEventListener("mouseenter",function(){state.hoverB=b;markPins();renderPanel()});el.addEventListener("mouseleave",function(){state.hoverB=null;markPins();renderPanel()});labelsEl.appendChild(el);pins.push({b:b,el:el,
txt:el.querySelector("em")})});var roads=[{t:"Bandel Rd NW",p:new THREE.Vector3(-350,1,60)},{t:"Overland Dr NW",p:new THREE.Vector3(260,1,-468)}].map(function(r){var el=document.createElement("div");el.className="road";el.textContent=r.t;labelsEl.appendChild(el);r.el=el;return r})
;var unitLabels=[],spLabels=[];function markPins(){pins.forEach(function(p){p.el.classList.toggle("hot",state.hoverB===p.b)})}var v3=new THREE.Vector3;function toScreen(p){v3.copy(p).project(camera);return{x:(v3.x+1)/2*VW(),y:(1-v3.y)/2*VH(),ok:v3.z<1}}function updateLabels(){var f=filtering()
;pins.forEach(function(p){var show=!state.bldg;if(!show){p.el.style.display="none";return}var s=toScreen(new THREE.Vector3(p.b.x,H+10,p.b.z));p.el.style.display=s.ok?"":"none";p.el.style.transform="translate("+s.x+"px,"+s.y+"px) translate(-50%,-100%)";p.el.dataset.sy=s.y
;var c=p.b.apts.filter(matches).length;p.txt.textContent=f?c+" match":p.b.apts.length+" apartments";p.el.classList.toggle("zero",f&&c===0)});var placed=[];pins.filter(function(p){return p.el.style.display!=="none"}).sort(function(a,b){
return parseFloat(b.el.dataset.sy||0)-parseFloat(a.el.dataset.sy||0)}).forEach(function(p){p.el.classList.remove("compact");var r=p.el.getBoundingClientRect();var hit=function(r){return placed.some(function(q){return!(r.right<q.left+2||r.left>q.right-2||r.bottom<q.top+2||r.top>q.bottom-2)})}
;if(hit(r)){p.el.classList.add("compact");r=p.el.getBoundingClientRect()}placed.push(r)});var pinRects=pins.filter(function(p){return p.el.style.display!=="none"}).map(function(p){return p.el.getBoundingClientRect()});roads.forEach(function(r){var s=toScreen(r.p)
;r.el.style.display=s.ok&&!state.bldg?"":"none";r.el.style.left=s.x+"px";r.el.style.top=s.y+"px";if(r.el.style.display==="none")return;var rr=r.el.getBoundingClientRect(),pad=8;var hit=pinRects.some(function(q){
return!(rr.right<q.left-pad||rr.left>q.right+pad||rr.bottom<q.top-pad||rr.top>q.bottom+pad)});r.el.style.opacity=hit?"0":"1"});var want=[];if(state.bldg&&state.floor!=="all"){want=state.bldg.apts.filter(function(a){return a.floor===state.floor&&matches(a)})}while(unitLabels.length<want.length){
var el=document.createElement("div");el.className="ulabel";labelsEl.appendChild(el);unitLabels.push(el)}unitLabels.forEach(function(el,i){var a=want[i];if(!a){el.style.display="none";return}var wp=new THREE.Vector3;a.mesh.getWorldPosition(wp);wp.y+=a.h/2+1;var s=toScreen(wp)
;el.style.display=s.ok?"":"none";el.style.left=s.x+"px";el.style.top=s.y+"px";el.textContent=a.unit+"  "+a.nice});var spWant=[];if(state.bldg&&!filtering()){spWant=state.bldg.spaces.filter(function(sp){return sp.nm&&(state.floor==="all"||state.floor===sp.floor)})}
while(spLabels.length<spWant.length){var se=document.createElement("div");se.className="splabel";labelsEl.appendChild(se);spLabels.push(se)}spLabels.forEach(function(el,i){var sp=spWant[i];if(!sp){el.style.display="none";return}var wp=new THREE.Vector3;sp.mesh.getWorldPosition(wp);wp.y+=sp.h/2+1
;var s=toScreen(wp);el.style.display=s.ok?"":"none";el.style.left=s.x+"px";el.style.top=s.y+"px";el.textContent=sp.nm})}var ray=new THREE.Raycaster,mouse=new THREE.Vector2,tip=$("tip"),down=null;function pickAt(cx,cy){var _r=RR();cx-=_r.left;cy-=_r.top;mouse.set(cx/VW()*2-1,-(cy/VH())*2+1)
;ray.setFromCamera(mouse,camera);var targets=[];BLDGS.forEach(function(b){if(b.units.visible){b.apts.forEach(function(a){if(a.mesh.material.opacity>.5)targets.push(a.mesh)})}if(!state.bldg||state.bldg!==b)targets.push(b.pick);if(state.bldg===b&&!filtering())b.spaces.forEach(function(sp){
if(sp.nm&&sp.mesh.visible&&sp.mesh.material.opacity>.5)targets.push(sp.mesh)})});var hit=ray.intersectObjects(targets,false)[0];if(!hit)return null;var u=hit.object.userData;return u.apt?{apt:u.apt}:u.space?{space:u.space}:{bldg:u.bldg}}canvas.addEventListener("pointermove",function(e){
if(e.pointerType!=="mouse")return;var h=down?null:pickAt(e.clientX,e.clientY);var a=h&&h.apt||null,b=h&&h.bldg||null,sp=h&&h.space||null;canvas.classList.toggle("pointer",!!(a||b));if(a!==state.hover){state.hover=a;applyColorsOnly()}if(b!==state.hoverB){state.hoverB=b;markPins()
;if(!state.bldg)renderPanel()}if(a){tip.style.display="block";tip.innerHTML="<b>"+a.nice+"</b> &middot; "+money(a.rent)+"<br>Apartment "+a.unit+" &middot; "+ORD[a.floor]+" floor &middot; "+a.sf.toLocaleString("en-US")+" sq ft";tip.style.left=Math.min(e.clientX-RR().left+14,VW()-250)+"px"
;tip.style.top=e.clientY-RR().top+14+"px"}else if(sp){tip.style.display="block";tip.innerHTML="<b>"+sp.nm+"</b><br>"+sp.b.name+" &middot; "+ORD[sp.floor]+" floor";tip.style.left=Math.min(e.clientX-RR().left+14,VW()-250)+"px";tip.style.top=e.clientY-RR().top+14+"px"}else if(b){
tip.style.display="block";tip.innerHTML="<b>"+b.name+"</b><br>"+TYPES[b.type].label;tip.style.left=Math.min(e.clientX-RR().left+14,VW()-250)+"px";tip.style.top=e.clientY-RR().top+14+"px"}else tip.style.display="none"});canvas.addEventListener("pointerleave",function(){tip.style.display="none"})
;canvas.addEventListener("pointerdown",function(e){down={x:e.clientX,y:e.clientY};hideHint()});canvas.addEventListener("pointerup",function(e){if(!down)return;var moved=Math.hypot(e.clientX-down.x,e.clientY-down.y);down=null;if(moved>6)return;var h=pickAt(e.clientX,e.clientY)
;if(h&&h.apt)selectApt(h.apt);else if(h&&h.bldg)focusBuilding(h.bldg)});canvas.addEventListener("keydown",function(e){if(e.key==="Escape"){if(state.bldg)overview()}});document.addEventListener("keydown",function(e){if(e.key==="Escape"&&state.bldg&&document.activeElement!==canvas)overview()})
;var FLOORPLANS=window.OR3D_FP||{};function fpUrl(a){return FLOORPLANS[a.pkey]||""}function fpThumb(a){var u=fpUrl(a);return u?'<img src="'+u+'" alt="" loading="lazy">':'<span class="fp-ph">'+FP_SVG+"</span>"}function fpBig(a){var u=fpUrl(a)
;return u?'<button type="button" class="fpbig" data-fpopen="'+a.id+'" aria-label="View the '+a.nice+' floor plan larger"><img src="'+u+'" alt="'+a.nice+' floor plan"></button>':'<div class="fpbig ph"><span class="fp-ph">'+FP_SVG+"<small>Floor plan coming soon</small></span></div>"}var fpReturn=null
;function openFP(a){var u=fpUrl(a);if(!u)return;$("fpTitle").innerHTML="Floor plan <span>"+a.nice+"</span>";$("fpImg").src=u;$("fpImg").alt=a.nice+" floor plan at Overland Reserve";fpReturn=document.activeElement;$("fpbox").hidden=false;$("fpClose").focus()}function closeFP(){
if($("fpbox").hidden)return;$("fpbox").hidden=true;if(fpReturn&&fpReturn.focus)fpReturn.focus()}$("panel").addEventListener("click",function(e){var f=e.target.closest("[data-fpopen]");if(f){openFP(BYID[f.dataset.fpopen]);return}if(e.target.closest("[data-see3d]"))setMView("map")})
;$("fpClose").addEventListener("click",closeFP);$("fpbox").addEventListener("click",function(e){if(e.target===this)closeFP()});addEventListener("keydown",function(e){if(e.key==="Escape"&&!$("fpbox").hidden){e.stopImmediatePropagation();e.preventDefault();closeFP()}},true);function setMView(v){
ROOTEL.classList.toggle("ov-map",v==="map");$("mtoggle").innerHTML=v==="map"?IC_LIST+"List":IC_MAP+"3D Map";$("mtoggle").setAttribute("aria-label",v==="map"?"Show the apartment list":"Show the 3D map");requestAnimationFrame(function(){resize();renderMini()})}
$("mtoggle").addEventListener("click",function(){setMView(ROOTEL.classList.contains("ov-map")?"list":"map")});function renderMini(){var mc=$("mcard");if(!mc)return;var a=state.sel,b=state.bldg,html="";if(a){html='<div class="mc-top"><div><b>'+a.nice+"</b>"+meta(a,{bldg:true,floor:true
})+(window.OR3D_ROWX?window.OR3D_ROWX(a,1):"")+'</div><span class="rentv">'+money(a.rent)+"</span></div>"+'<div class="mc-btns"><button type="button" data-mc="tour">3D tour</button><button type="button" class="pri" data-mc="details">Details</button></div>'}else if(b){
var n=b.apts.filter(matches).length,low=Math.min.apply(0,b.apts.map(function(x){return x.rent}))
;html='<div class="mc-top"><div><b>'+b.name+'</b><span class="meta"><span>'+(filtering()?n+" matching apartments":b.apts.length+" apartments")+"</span><span>From "+money(low)+"</span></span></div></div>"+'<div class="mc-btns"><button type="button" data-mc="back">All buildings</button><button type="button" class="pri" data-mc="list">View apartments</button></div>'
}mc.innerHTML=html;mc.classList.toggle("on",!!html)}$("mcard").addEventListener("click",function(e){var t=e.target.closest("[data-mc]");if(!t)return;var k=t.dataset.mc;if(k==="details"){setMView("list");setTimeout(revealCard,60)}else if(k==="list"){setMView("list");$("panel").scrollTop=0
}else if(k==="tour"&&state.sel){openTour(state.sel.beds)}else if(k==="back"){overview()}});setMView("list");if(isMobile())$("find").placeholder="Find an apartment";var hinted=false;function hideHint(){if(hinted)return;hinted=true;$("hint").classList.add("gone")}
controls.addEventListener("start",hideHint);function resize(){var w=VW(),h=VH();if(w<2||h<2)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.clearViewOffset();camera.updateProjectionMatrix()}addEventListener("resize",function(){sizeRoot();resize()});resize();(function(){
var zt=$("ztip"),zto=0,mac=/Mac|iPhone|iPad/.test(navigator.platform||"");ROOT.addEventListener("wheel",function(e){if(e.target!==canvas)return;if(e.ctrlKey||e.metaKey)return;e.stopPropagation();zt.textContent="Use "+(mac?"⌘":"Ctrl")+" + scroll to zoom the map";zt.classList.add("on")
;clearTimeout(zto);zto=setTimeout(function(){zt.classList.remove("on")},1200)},{capture:true,passive:true})})();if(window.ResizeObserver)new ResizeObserver(function(){resize()}).observe(MAPEL);var compassSvg=document.querySelector("#compass svg");function loop(now){requestAnimationFrame(loop)
;if(flight){var k=flight.ms?Math.min(1,(now-flight.start)/flight.ms):1,e=ease(k);camera.position.lerpVectors(flight.p0,flight.p1,e);controls.target.lerpVectors(flight.t0,flight.t1,e);if(k>=1)flight=null}BLDGS.forEach(function(b){var g=b.gap+(b.gapTarget-b.gap)*(reduceMotion?1:.12)
;if(Math.abs(g-b.gap)>.01){b.gap=g;b.floorGroups.forEach(function(fg,fi){fg.position.y=fi*(FH+g)})}else if(b.gap!==b.gapTarget){b.gap=b.gapTarget;b.floorGroups.forEach(function(fg,fi){fg.position.y=fi*(FH+b.gap)})}});controls.update()
;compassSvg.style.transform="rotate("+controls.getAzimuthalAngle()*180/Math.PI+"deg)";renderer.render(scene,camera);updateLabels()}camera.position.copy(homePos()).add(new THREE.Vector3(-260,260,320));controls.target.copy(CENTER);apply();requestAnimationFrame(function(){
$("loading").classList.add("done");fly(homePos(),CENTER.clone(),1800);setTimeout(openFromHash,400)});requestAnimationFrame(loop);window.__or={camera:camera,controls:controls,scene:scene,M:M,fly:fly,CENTER:CENTER,frameBuilding:frameBuilding,roads:{bandel:bandel,overland:overland,drive:drivePts},
state:state,BLDGS:BLDGS,focusBuilding:focusBuilding,selectApt:selectApt,overview:overview,apply:apply}})();
}catch(e){console.error(e);}
try{
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
function addButtons(root){
  root.querySelectorAll('.card').forEach(function(card){
    if(card.querySelector('.ccbtn')) return;
    var s=card.querySelector('[data-schedule]'), cta=s&&s.closest('.cta'); if(!cta) return;
    var b=document.createElement('button'); b.type='button'; b.className='tourbtn ccbtn'; b.dataset.cc=s.dataset.schedule;
    b.innerHTML=IC_CALC+'Estimate My Cost';
    cta.parentNode.insertBefore(b,cta);
  });
}
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
}catch(e){console.error(e);}
