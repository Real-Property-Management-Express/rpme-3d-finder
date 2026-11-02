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
