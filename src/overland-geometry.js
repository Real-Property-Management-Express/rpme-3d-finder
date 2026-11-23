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
/* Floor plates traced from VanDeWalle Architects sheets A2.0/A2.1 (buildings 14A and 10B), feet from the back-left corner; areas match the sheets' unit mix within 1%. */
var RECT = {
B:[[0,3],[11,3],[11,5],[22.44,5],[22.44,32.02],[2,32.02],[2,17.1],[0,17.1]],
B2:[[2,32.02],[22.44,32.02],[22.44,60.3],[0,60.3],[0,46.7],[2,46.7]],
K:[[22.44,5],[37.18,5],[37.18,26.78],[41.25,26.78],[41.25,43.29],[32.87,43.29],[32.87,33],[31.87,33],[31.87,26.82],[22.44,26.82]],
I:[[37.18,3],[45.5,3],[45.5,0],[62.5,0],[62.5,17.79],[48.66,17.79],[48.66,26.78],[37.18,26.78]],
J:[[41.25,26.78],[48.66,26.78],[48.66,17.79],[62.5,17.79],[62.5,39.9],[64.5,39.9],[64.5,47.39],[51.59,47.39],[51.59,43.29],[41.25,43.29]],
L:[[32.87,43.29],[51.59,43.29],[51.59,47.39],[62.5,47.39],[62.5,60.3],[32.87,60.3]],
CORE1:[[22.44,26.82],[31.87,26.82],[31.87,33],[32.87,33],[32.87,61.8],[22.44,61.8]],
C:[[22.44,5],[36.6,5],[36.6,3],[45.5,3],[45.5,0],[62.5,0],[62.5,17.79],[48.66,17.79],[48.66,26.78],[22.44,26.78]],
CORE2:[[22.44,26.78],[37.78,26.78],[37.78,32.77],[41.22,32.77],[41.22,43.42],[32.8,43.42],[32.8,61.8],[22.44,61.8]],
M:[[37.78,26.78],[48.66,26.78],[48.66,17.79],[62.5,17.79],[62.5,39.9],[64.5,39.9],[64.5,47.39],[62.5,47.39],[62.5,60.3],[32.8,60.3],[32.8,43.42],[41.22,43.42],[41.22,32.77],[37.78,32.77]],
CORE3:[[22.44,26.79],[37.84,26.79],[37.84,32.8],[32.82,32.8],[32.82,61.8],[22.44,61.8]],
D:[[37.84,26.79],[48.66,26.79],[48.66,17.79],[62.5,17.79],[62.5,39.9],[64.5,39.9],[64.5,47.39],[62.5,47.39],[62.5,60.3],[32.82,60.3],[32.82,32.8],[37.84,32.8]],
COMM:[[0,3],[11,3],[11,5],[22.44,5],[22.44,29.6],[2,29.6],[2,17.1],[0,17.1]],
LOBBY:[[2,29.6],[22.44,29.6],[22.44,60.3],[0,60.3],[0,46.7],[2,46.7]]
};
var IC={
bed:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 13V4.5M1.5 10h13v3M14.5 10V8.5a1.5 1.5 0 0 0-1.5-1.5H7v3M4.2 9a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/></svg>',
bath:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 8h13v1.5A3.5 3.5 0 0 1 11 13H5a3.5 3.5 0 0 1-3.5-3.5zM3.5 8V3.6a1.6 1.6 0 0 1 3.1-.5M4.6 13l-.8 1.5M11.4 13l.8 1.5"/></svg>',
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
/* Plan view images (Reserve set, rendered from the VanDeWalle unit sheets) and, per floor-plate shape, the matrix from image pixels to plate feet (registered by outline match). Accessible N and O are rendered from their own sheets (A2.17, A2.18) and keyed by shape:plan. */
var PLANVIEW = {
B:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872de085d68eabbe83b9_OVR_PLANVIEW_B.webp',873,1015],
C:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872d51c9eef1b3eebe1f_OVR_PLANVIEW_C.webp',1354,938],
D:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872d51c9eef1b3eebe2d_OVR_PLANVIEW_D.webp',1191,1519],
I:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872d0483e3f69bf15c21_OVR_PLANVIEW_I.webp',869,919],
J:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872ddca7ec0a45777c6a_OVR_PLANVIEW_J.webp',893,1047],
K:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872d51c9eef1b3eebe55_OVR_PLANVIEW_K.webp',671,1406],
L:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872d3181b94638f4a6c7_OVR_PLANVIEW_L.webp',1010,747],
M:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872e4ba3279efc8b23c1_OVR_PLANVIEW_M.webp',1185,1504],
O:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b049d23652796d6fad81434_OVR_PLANVIEW_O.webp',1395,979],
N:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b049d247e186ad5d22616c9_OVR_PLANVIEW_N.webp',1244,1561],
B2:['https://cdn.prod.website-files.com/6adaad44213439df69218780/6b04872de085d68eabbe83b9_OVR_PLANVIEW_B.webp',873,1015]
};
var PLANVIEW_M = {
'C:O':[0.03125,0,0,0.031227,20.7027,-1.73606],
'D:N':[0.03125,0,0,0.030066,30.8904,15.9284],
B:[0.03125,0,0,0.030164,-3.62809,2.17479],
B2:[0.03125,0,0,-0.030164,-3.62809,61.8452],
C:[0.03125,0,0,0.031231,21.3479,-1.09182],
D:[0.03125,0,0,0.030179,31.6097,16.6167],
I:[0.03125,0,0,0.03125,36.3979,-0.78195],
J:[0.03125,0,0,0.030172,40.3771,16.9428],
K:[0.03125,0,0,0.032387,21.2762,1.29835],
L:[0.03125,0,0,0.033146,32.0235,42.3994],
M:[0.03125,0,0,0.030168,31.6004,16.6273]
};
/* Accessible units show their own plan in the apartment card too (the page's plan images use the standard plans). */
var PLANCARD = {O:'https://cdn.prod.website-files.com/6adaad44213439df69218780/6b049d23652796d6fad81434_OVR_PLANVIEW_O.webp', N:'https://cdn.prod.website-files.com/6adaad44213439df69218780/6b049d247e186ad5d22616c9_OVR_PLANVIEW_N.webp'};
var TYPES = {
'14A': {
  label:'14 apartments',
  floors:[
    [{p:'B',u:'01',r:'B'},{p:'B2',u:'02',r:'B2'},{p:'K',u:'03',r:'K'},{p:'L',u:'04',r:'L'},{p:'J',u:'05',r:'J'},{p:'I',u:'06',r:'I'},{a:'Stairs and hallway',r:'CORE1'}],
    [{p:'B',u:'01',r:'B'},{p:'B2',u:'02',r:'B2'},{p:'C',u:'03',r:'C'},{p:'M',u:'04',r:'M'},{a:'Stairs and hallway',r:'CORE2'}],
    [{p:'B',u:'01',r:'B'},{p:'B2',u:'02',r:'B2'},{p:'C',u:'03',r:'C'},{p:'D',u:'04',r:'D'},{a:'Stairs and hallway',r:'CORE3'}]
  ]
},
'10B': {
  label:'10 apartments, leasing office and community room',
  office:true,
  floors:[
    [{a:'Community room',r:'COMM'},{a:'Leasing office, lobby and mail',r:'LOBBY'},{p:'O',u:'01',r:'C'},{p:'N',u:'02',r:'D'},{a:'Stairs and hallway',r:'CORE3'}],
    [{p:'B',u:'01',r:'B'},{p:'B2',u:'02',r:'B2'},{p:'C',u:'03',r:'C'},{p:'M',u:'04',r:'M'},{a:'Stairs and hallway',r:'CORE2'}],
    [{p:'B',u:'01',r:'B'},{p:'B2',u:'02',r:'B2'},{p:'C',u:'03',r:'C'},{p:'D',u:'04',r:'D'},{a:'Stairs and hallway',r:'CORE3'}]
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
