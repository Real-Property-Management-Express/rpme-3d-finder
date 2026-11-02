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
var al=document.getElementById('alist');if(al&&!document.querySelector('.or3d-gt')){var g=document.createElement('div');g.className='or3d-gt';g.innerHTML='<span>Not sure which apartment yet?</span><button type="button">Schedule a tour</button>';al.parentNode.insertBefore(g,al);
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
