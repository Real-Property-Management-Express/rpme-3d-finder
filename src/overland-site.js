/* Overland Reserve property pack: where the buildings sit and the site around them (roads, parking, ponds, trees). The shared finder calls place() once for the building list, then site(ctx) to draw the ground. */
window.OR3D_PACK=(function(){
var E,U,NRM,along,BLDGS;
function place(){
E=new THREE.Vector2(-260,200);U=new THREE.Vector2(.7727,-.6347)
;NRM=new THREE.Vector2(.6347,.7727);along=function(t,off){return new THREE.Vector2(E.x+U.x*t+NRM.x*off,E.y+U.y*t+NRM.y*off)};var DIAG=.688+Math.PI;BLDGS=[];[40,150,260,370,480].forEach(function(t,i){var p=along(t,72);BLDGS.push({x:p.x,z:p.y,rot:DIAG,type:i===0?"10B":"14A"})});BLDGS.push({
x:68,z:-215,rot:Math.PI/2,type:"14A"});BLDGS.push({x:68,z:-320,rot:Math.PI/2,type:"14A"});var ADDR=["6400","6410","6420","6430","6440","6450","6460"];BLDGS.forEach(function(b,i){b.id=i+1;b.num=ADDR[i];b.name=ADDR[i]+" Bandel Rd NW"});
return BLDGS}
function site(c){var scene=c.scene,M=c.M,flatShape=c.flatShape,ribbon=c.ribbon,curvePts=c.curvePts,lin=c.lin;
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
;scene.add(trunks);scene.add(crowns);
return {bandel:bandel,overland:overland,drive:drivePts}}
return {place:place,site:site};
})();
