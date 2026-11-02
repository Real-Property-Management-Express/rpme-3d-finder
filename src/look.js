/* Finder look (Overland only): photo materials from Bluestem Reserve, real car shapes, fuller trees, foundation beds, entry details (mullions, canopy tie rods, lights, building numbers), sky and reflections, lighter rendering on phones; compact list panel top (one-line summary, color key kept compact, See all fees line under the tour link, property tour button only on the map, slim tour link). Holds the loading screen until the look is ready. Textures are in Overland's Webflow Assets (or3d-*.jpg). */
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
