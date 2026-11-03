/* The Avery (Fargo) property pack. Loaded after overland-geometry.js, so it replaces the plan list, building types and tours, and adds the building placement and downtown site.
   Footprint and apartment positions follow the building's floor plans, in feet: x runs west to east (0 to 268), z runs north (NP Ave) to south (0 to 249).
   Plan names, beds, baths and sizes come from the public listing; stacks the listing doesn't name yet use the plan of the same layout type. */
var PLANS = {
TIM:{name:'Timber', title:'Timber',     beds:0, baths:1, sf:456},
TIMA:{name:'Timber ADA', title:'Timber ADA', beds:0, baths:1, sf:456, ada:true},
FRE:{name:'Freddi', title:'Freddi',     beds:0, baths:1, sf:518},
BIL:{name:'Billings', title:'Billings',   beds:0, baths:1, sf:537},
THO:{name:'Thomas', title:'Thomas',     beds:1, baths:1, sf:690},
OAK:{name:'Oakes', title:'Oakes',      beds:1, baths:1, sf:702},
OAKA:{name:'Oakes ADA', title:'Oakes ADA',  beds:1, baths:1, sf:702, ada:true},
GIL:{name:'Gilbert', title:'Gilbert',    beds:1, baths:1, sf:715},
CLA:{name:'Clarence', title:'Clarence',   beds:1, baths:1, sf:732},
HAR:{name:'Harvester', title:'Harvester',  beds:1, baths:1, sf:791},
BAL:{name:'Baler', title:'Baler',      beds:1, baths:1, sf:833},
HOR:{name:'Horizon', title:'Horizon',    beds:2, baths:2, sf:1082},
MIL:{name:'Mill', title:'Mill',       beds:2, baths:2, sf:1083},
RIV:{name:'Riveter', title:'Riveter',    beds:2, baths:2, sf:1087},
DAK:{name:'Dakota', title:'Dakota',     beds:2, baths:2, sf:1101},
DAKA:{name:'Dakota ADA', title:'Dakota ADA', beds:2, baths:2, sf:1101, ada:true},
FRO:{name:'Frontier', title:'Frontier',   beds:3, baths:2, sf:1333},
PUL:{name:'Pullman', title:'Pullman',    beds:3, baths:2, sf:1287}
};
var TOURS = {};
var AVE_W = 268, AVE_D = 249, AVE_FH = 10.67, AVE_LIFT = 16;
var AVE_STACKS = {
'01':['MIL',[1,21,29,45],'C-1'],  '03':['GIL',[29,21,56,45],'B-3'],  '05':['GIL',[56,21,77,45],'B-3'],  '07':['FRE',[77,21,99,45],'A-2'],  '09':['CLA',[99,21,118,45],'B-5'],
'11':['CLA',[118,8,140,38],'B-4'],'12':['DAK',[140,7,167,37],'C-3'], '13':['BIL',[167,6,187,36],'A-3a'], '14':['BIL',[187,6,201,36],'A-3b'], '15':['BIL',[201,5,216,35],'A-3c'], '16':['BIL',[216,5,236,35],'A-3d'], '17':['FRO',[236,4,267,40],'D-2'],
'02':['HOR',[1,52,33,78],'C-2'],  '04':['TIM',[33,52,57,78],'A-1'],  '06':['THO',[57,52,82,78],'B-1'],  '08':['TIM',[82,52,101,78],'A-1'], '10':['BAL',[101,52,117,78],'B-7'],
'18':['THO',[113,80,133,100],'B-1'],'19':['TIM',[113,100,133,120],'A-1'],'20':['THO',[113,120,133,141],'B-1'],'21':['THO',[113,141,133,162],'B-1'],'22':['THO',[113,162,133,182],'B-1'],
'34':['HAR',[1,185,33,213],'B-6'],'32':['TIM',[33,185,54,213],'A-1'],'30':['TIM',[54,185,70,213],'A-1'],'28':['TIM',[70,185,86,213],'A-1'],'26':['TIM',[86,185,102,213],'A-1'],'24':['OAK',[102,185,120,213],'B-2'],
'33':['RIV',[1,219,24,249],'C-4'],'31':['THO',[24,219,47,249],'B-1'],'29':['TIM',[47,219,68,249],'A-1'],'27':['PUL',[79,219,113,249],'D-1'],'25':['TIM',[113,219,133,249],'A-1'],'23':['TIM',[133,219,146,249],'A-1']
};
var AVE_HALLS = [[1,45,118,52],[118,38,267,45],[133,80,146,182],[1,213,120,219],[68,219,79,249],[120,185,146,219]];
var AVE_ADA = {'2-24':'OAKA','4-32':'TIMA','6-12':'DAKA'};
var RECT = {};
Object.keys(AVE_STACKS).forEach(function(k){ RECT['u'+k]=AVE_STACKS[k][1]; });
AVE_HALLS.forEach(function(r,i){ RECT['h'+i]=r; });
RECT.club=[82,52,101,78]; RECT.fit=[101,52,117,78];
function aveFloor(level){
  var cells=[];
  Object.keys(AVE_STACKS).sort().forEach(function(k){
    if(level===2&&(k==='08'||k==='10'))return;
    cells.push({p:AVE_ADA[level+'-'+k]||AVE_STACKS[k][0],u:k,r:'u'+k,fp:AVE_STACKS[k][2]});
  });
  if(level===2){ cells.push({a:'Clubroom',r:'club'}); cells.push({a:'Fitness and yoga room',r:'fit'}); }
  AVE_HALLS.forEach(function(r,i){ cells.push({a:'Stairs and hallway',r:'h'+i}); });
  return cells;
}
var AVE_TX=(function(){
  var cache={},sd=636;
  function r(){ sd=(sd*16807)%2147483647; return (sd-1)/2147483646; }
  function cv(w,h,draw){ var c=document.createElement('canvas'); c.width=w; c.height=h; var g=c.getContext('2d'); draw(g,w,h); var t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.encoding=THREE.sRGBEncoding; t.anisotropy=8; return t; }
  function grain(g,w,h,n,a){ for(var i=0;i<n;i++){ g.fillStyle=r()<.5?'rgba(0,0,0,'+a*r()+')':'rgba(255,255,255,'+a*r()+')'; g.fillRect(r()*w,r()*h,1+r()*3,1+r()*3); } }
  function shade(hex,k){ var n=parseInt(hex.slice(1),16),R=n>>16,G=n>>8&255,B=n&255; function f(v){ return Math.max(0,Math.min(255,Math.round(v*k))); } return 'rgb('+f(R)+','+f(G)+','+f(B)+')'; }
  var make={
    brick:function(hex){ return cv(512,512,function(g,w,h){ g.fillStyle=shade(hex,.78); g.fillRect(0,0,w,h); var rows=24,bh=h/rows,bw=w/8; for(var y=0;y<rows;y++){ for(var x=-1;x<9;x++){ g.fillStyle=shade(hex,.9+r()*.2); g.fillRect(x*bw+(y%2?bw/2:0)+1.5,y*bh+1.5,bw-3,bh-3); } } grain(g,w,h,5000,.06); }); },
    seam:function(hex){ return cv(512,512,function(g,w,h){ var n=8,sw=w/n; for(var i=0;i<n;i++){ var gr=g.createLinearGradient(i*sw,0,(i+1)*sw,0); gr.addColorStop(0,shade(hex,.92)); gr.addColorStop(.5,shade(hex,1.04+r()*.05)); gr.addColorStop(1,shade(hex,.95)); g.fillStyle=gr; g.fillRect(i*sw,0,sw,h); g.fillStyle=shade(hex,.7); g.fillRect(i*sw,0,3,h); g.fillStyle=shade(hex,1.18); g.fillRect(i*sw+3,0,1.5,h); } grain(g,w,h,2500,.035); }); },
    panel:function(hex){ return cv(512,512,function(g,w,h){ var cols=3,rows=4,pw=w/cols,ph=h/rows; for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){ g.fillStyle=shade(hex,.95+r()*.09); g.fillRect(x*pw,y*ph,pw,ph); } g.fillStyle=shade(hex,.62); for(var x2=0;x2<=cols;x2++)g.fillRect(x2*pw-2,0,4,h); for(var y2=0;y2<=rows;y2++)g.fillRect(0,y2*ph-2,w,4); grain(g,w,h,4000,.05); }); },
    roof:function(){ return cv(256,256,function(g,w,h){ g.fillStyle='#b9bbbb'; g.fillRect(0,0,w,h); grain(g,w,h,6000,.07); g.fillStyle='rgba(0,0,0,.08)'; for(var i=0;i<4;i++)g.fillRect(0,i*h/4,w,2); }); },
    walk:function(){ return cv(256,256,function(g,w,h){ g.fillStyle='#cdc8bd'; g.fillRect(0,0,w,h); grain(g,w,h,7000,.06); g.fillStyle='rgba(60,55,50,.28)'; g.fillRect(0,0,w,2); g.fillRect(0,h/2,w,2); g.fillRect(0,0,2,h); g.fillRect(w/2,0,2,h); }); },
    conc:function(){ return cv(256,256,function(g,w,h){ g.fillStyle='#c4c0b8'; g.fillRect(0,0,w,h); grain(g,w,h,6000,.08); }); },
    facade:function(key){ var P={red:['#8f4e3c','#2c3640','#c9c1b3'],tan:['#c8b08c','#28323b','#efe6d4'],grey:['#9aa0a4','#26303a','#d7dadc'],buff:['#d9c9a8','#303a44','#f3ecdf'],dark:['#4b4f55','#1e2730','#8c939a']}[key];
      return cv(256,256,function(g,w,h){ g.fillStyle=P[0]; g.fillRect(0,0,w,h); grain(g,w,h,3500,.07); var x0=w*.2,y0=h*.24,ww=w*.6,wh=h*.5; g.fillStyle=P[2]; g.fillRect(x0-5,y0-5,ww+10,wh+12); var gr=g.createLinearGradient(0,y0,0,y0+wh); gr.addColorStop(0,'#5d6d79'); gr.addColorStop(1,P[1]); g.fillStyle=gr; g.fillRect(x0,y0,ww,wh); g.fillStyle=P[2]; g.fillRect(x0+ww/2-2,y0,4,wh); g.fillStyle='rgba(255,255,255,.12)'; g.fillRect(x0+4,y0+4,ww/2-10,wh*.35); }); },
    shop:function(){ return cv(256,256,function(g,w,h){ g.fillStyle='#2a2f35'; g.fillRect(0,0,w,h); var gr=g.createLinearGradient(0,h*.15,0,h); gr.addColorStop(0,'#6f7f8a'); gr.addColorStop(1,'#33404a'); g.fillStyle=gr; g.fillRect(8,h*.18,w-16,h*.78); g.fillStyle='#2a2f35'; g.fillRect(w/2-3,h*.18,6,h*.78); g.fillStyle='rgba(255,236,200,.35)'; g.fillRect(14,h*.55,w-28,h*.35); }); }
  };
  return function(kind,arg){ var k=kind+(arg||''); if(!cache[k])cache[k]=make[kind](arg); return cache[k]; };
})();
function aveMat(tex,o){ return new THREE.MeshStandardMaterial(Object.assign({map:tex,color:0xffffff,roughness:.85,metalness:0},o||{})); }
function aveUV(m,su,sv){ var g=m.geometry.clone(); m.geometry=g; m.updateMatrix(); var p=g.attributes.position,n=g.attributes.normal,uv=new Float32Array(p.count*2),v=new THREE.Vector3(); sv=sv||su;
  for(var i=0;i<p.count;i++){ v.fromBufferAttribute(p,i).applyMatrix4(m.matrix); var ax=Math.abs(n.getX(i)),ay=Math.abs(n.getY(i)),az=Math.abs(n.getZ(i));
    if(ay>ax&&ay>az){ uv[i*2]=v.x/su; uv[i*2+1]=v.z/su; } else if(ax>az){ uv[i*2]=v.z/su; uv[i*2+1]=v.y/sv; } else { uv[i*2]=v.x/su; uv[i*2+1]=v.y/sv; } }
  g.setAttribute('uv',new THREE.BufferAttribute(uv,2)); return m; }
var AVE_GAR=[146,45,268,249];
function aveShell(c){
  var part=c.part,M=c.M,s=c.shell,hw=c.hw,hd=c.hd,L=AVE_LIFT,top=AVE_LIFT+c.H;
  function box(r,y0,y1,mat,shadow){ return part(s,mat,r[2]-r[0],y1-y0,r[3]-r[1],(r[0]+r[2])/2-hw,(y0+y1)/2,(r[1]+r[3])/2-hd,shadow); }
  function tbox(r,y0,y1,mat,su,sv){ return aveUV(box(r,y0,y1,mat),su,sv); }
  var X=AVE_TX,CU=aveMat(X('seam','#c98a5e'),{roughness:.5,metalness:.25}),SG=aveMat(X('panel','#8d907e')),CR=aveMat(X('panel','#e4dfd2')),DK=aveMat(X('seam','#2f3337'),{roughness:.55,metalness:.2}),BR=aveMat(X('brick','#d3ccbd'),{roughness:.92}),RF=aveMat(X('roof'),{roughness:.95});
  function fbox(r,y0,y1,f){ var m=new THREE.Mesh(c.BOX,[f[0],f[1],RF,RF,f[2],f[3]]); m.scale.set(r[2]-r[0],y1-y0,r[3]-r[1]); m.position.set((r[0]+r[2])/2-hw,(y0+y1)/2,(r[1]+r[3])/2-hd); m.castShadow=m.receiveShadow=true; s.add(m); return aveUV(m,12,12); }
  tbox([0,4,268,45],0,L-.5,BR,8); tbox([0,0,268,4],L-3,L-.5,BR,8); tbox([0,0,268,4],0,1,BR,8);
  tbox([0,45,146,249],0,L-.5,BR,8);
  box([0,0,268,4],1,L-3,M.glass,false);
  for(var mx=0;mx<=268;mx+=6){ box([mx-.25,-.25,mx+.25,.3],1,L-3,M.frame,false); }
  box([0,-.3,268,.35],L-3.2,L-2.6,M.frame,false);
  box([0,-.3,268,.35],.6,1.2,M.frame,false);
  var wings=[[0,21,118,78],[118,4,268,45],[113,78,146,185],[0,183,146,249]];
  var FACES=[[CR,SG,CR,SG],[CU,CU,CR,CU],[CR,CR,CR,CR],[SG,SG,SG,CR]];
  wings.forEach(function(r,wi){ fbox(r,L-.5,top,FACES[wi]); box([r[0]-.4,r[1]-.4,r[2]+.4,r[3]+.4],top,top+1.4,M.coping); aveUV(box([r[0]+.5,r[1]+.5,r[2]-.5,r[3]-.5],top+1.4,top+1.6,RF,false),12); for(var fl=1;fl<5;fl++){ var yb=L+fl*c.FH; box([r[0]-.25,r[1]-.25,r[2]+.25,r[3]+.25],yb-.3,yb+.3,M.coping,false); } box([r[0]-.3,r[1]-.3,r[2]+.3,r[3]+.3],L-.6,L+.6,M.coping,false); });
  fbox([0,78,113,183],L-.5,L+c.FH+3,[CR,SG,CR,CR]);
  aveUV(box([2,80,111,181],L+c.FH+3,L+c.FH+3.4,RF,false),12);
  for(var sx=122;sx<266;sx+=17){ box([sx-2.9,3.6,sx+2.9,3.9],L+1,top-1,DK,false); }
  box([118,3.4,268,3.9],L-.5,L+2.2,CU,false);
  [[30,40,9,7],[70,46,7,6],[180,18,10,8],[230,22,8,6],[122,120,7,7],[60,214,9,7],[105,226,7,6]].forEach(function(u){ box([u[0],u[1],u[0]+u[2],u[1]+u[3]],top+1.6,top+5.4,M.mech); box([u[0]+1,u[1]+1,u[0]+u[2]-1,u[1]+u[3]-1],top+5.4,top+5.8,M.coping,false); });
  function win(x,y,z,ry,w,h){ c.winFrames.push({b:c.b,x:x,y:y,z:z,ry:ry,w:w+.5,h:h+.5,d:.35}); c.winGlass.push({b:c.b,x:x,y:y,z:z,ry:ry,w:w,h:h,d:.45}); }
  for(var f=0;f<5;f++){
    var wy=L+f*c.FH+c.FH*.5;
    for(var x=5;x<266;x+=8.5){ var zf=x<118?21:4; win(x-hw,wy,zf-hd-.3,Math.PI,4.6,6.4); }
    for(var x2=5;x2<145;x2+=8.5){ win(x2-hw,wy,249-hd+.3,0,4.6,6.4); }
    for(var x3=5;x3<112;x3+=8.5){ win(x3-hw,wy,78-hd+.3,0,4.6,6.4); win(x3-hw,wy,183-hd-.3,Math.PI,4.6,6.4); }
    for(var z=25;z<247;z+=8.5){ if(z>78&&z<183)continue; win(-hw-.3,wy,z-hd,-Math.PI/2,4.6,6.4); }
    for(var z2=83;z2<182;z2+=8.5){ win(113-hw-.3,wy,z2-hd,-Math.PI/2,4.6,6.4); }
    for(var z3=8;z3<45;z3+=8.5){ win(268-hw+.3,wy,z3-hd,Math.PI/2,4.6,6.4); }
  }
}
var TYPES = {
AVE: {
  label:'Apartments, lobby, clubroom and fitness',
  W:AVE_W, D:AVE_D, FH:AVE_FH, RECT:RECT, base:2, shell:aveShell,
  floors:[aveFloor(2),aveFloor(3),aveFloor(4),aveFloor(5),aveFloor(6)]
}
};
window.OR3D_PACK=(function(){
function place(){
  return [{x:0,z:0,rot:0,type:'AVE',lift:AVE_LIFT,id:1,num:'636',name:'The Avery'}];
}
function site(c){
  var scene=c.scene,M=c.M,flatShape=c.flatShape,ribbon=c.ribbon;
  var V=THREE.Vector2,hw=AVE_W/2,hd=AVE_D/2,X=AVE_TX,L=AVE_LIFT,FH=AVE_FH,sd=91;
  function r(){ sd=(sd*16807)%2147483647; return (sd-1)/2147483646; }
  var BOXG=new THREE.BoxGeometry(1,1,1);
  function bx(x0,z0,x1,z1,y0,y1,mat,su,sv,shadow){ var m=new THREE.Mesh(BOXG,mat); m.scale.set(x1-x0,y1-y0,z1-z0); m.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2); m.castShadow=shadow!==false; m.receiveShadow=true; scene.add(m); if(su)aveUV(m,su,sv); return m; }
  var walkT=X('walk'); walkT.repeat.set(1/10,1/10);
  var WALK=aveMat(walkT,{roughness:.95}),CONC=aveMat(X('conc'),{roughness:.95}),CURB=new THREE.MeshStandardMaterial({color:0x9c9890,roughness:.9});
  var PW=new THREE.MeshStandardMaterial({color:0xeeece4,roughness:.7}),PY=new THREE.MeshStandardMaterial({color:0xe2b33c,roughness:.7});
  flatShape([[-1400,-1400],[1400,-1400],[1400,1400],[-1400,1400]],WALK,.2);
  var NZ=-hd-38,WX=-hw-40,EX=hw+40,SZ=hd+30;
  var streets=[{a:'x',c:NZ,w:60},{a:'z',c:WX,w:52},{a:'z',c:EX,w:52},{a:'x',c:SZ,w:36}];
  streets.forEach(function(t){ var pts=t.a==='x'?[new V(-1400,t.c),new V(1400,t.c)]:[new V(t.c,-1400),new V(t.c,1400)]; ribbon(pts,t.w,M.road,.5);
    [-1,1].forEach(function(sg){ var e=t.c+sg*(t.w/2+.4); if(t.a==='x')bx(-1400,e-.4,1400,e+.4,.2,.9,CURB,0,0,false); else bx(e-.4,-1400,e+.4,1400,.2,.9,CURB,0,0,false); }); });
  function mark(x0,z0,x1,z1,mat){ bx(x0,z0,x1,z1,.5,.62,mat,0,0,false); }
  function cross(x,z){ return Math.abs(x-WX)<30||Math.abs(x-EX)<30||Math.abs(z-NZ)<34||Math.abs(z-SZ)<22; }
  [NZ].forEach(function(z){ for(var x=-1400;x<1400;x+=40){ if(cross(x+20,z))continue; mark(x,z-.9,x+40,z-.4,PY); mark(x,z+.4,x+40,z+.9,PY); } });
  [WX,EX].forEach(function(xc){ for(var z=-1400;z<1400;z+=40){ if(cross(xc,z+20))continue; mark(xc-.9,z,xc-.4,z+40,PY); mark(xc+.4,z,xc+.9,z+40,PY); } });
  [NZ].forEach(function(z){ for(var x=-1400;x<1400;x+=30){ if(cross(x+5,z))continue; mark(x,z-13,x+10,z-12.5,PW); mark(x,z+12.5,x+10,z+13,PW); } });
  function zebraX(xc,z0,z1){ for(var z=z0+2;z<z1-2;z+=4)mark(xc-6,z,xc+6,z+2,PW); }
  function zebraZ(zc,x0,x1){ for(var x=x0+2;x<x1-2;x+=4)mark(x,zc-6,x+2,zc+6,PW); }
  [WX,EX].forEach(function(xc){ zebraX(xc-38,NZ-30,NZ+30); zebraX(xc+38,NZ-30,NZ+30); zebraZ(NZ-42,xc-26,xc+26); zebraZ(NZ+42,xc-26,xc+26); });
  var G=AVE_GAR,gx0=G[0]-hw,gz0=G[1]-hd,gx1=G[2]-hw,gz1=G[3]-hd;
  var lv=[0,L,L+FH,L+2*FH,L+3*FH,L+4*FH],roofY=L+5*FH;
  lv.forEach(function(y,i){ if(i)bx(gx0,gz0,gx1,gz1,y-.2,y+1,CONC,10);
    [[gx0,gz0,gx1,gz0+.8],[gx0,gz1-.8,gx1,gz1],[gx1-.8,gz0,gx1,gz1]].forEach(function(w){ bx(w[0],w[1],w[2],w[3],y+1,y+4.4,CONC,10); });
    var nt=(i<5?lv[i+1]:roofY)-.2;
    for(var xx=gx0+2;xx<=gx1-1;xx+=20){ bx(xx-.8,gz1-1.6,xx+.8,gz1,y+4.4,nt,CONC,10); bx(xx-.8,gz0,xx+.8,gz0+1.6,y+4.4,nt,CONC,10,0,false); }
    for(var zz=gz0+8;zz<=gz1-1;zz+=20){ bx(gx1-1.6,zz-.8,gx1,zz+.8,y+4.4,nt,CONC,10); }
    for(var zi=gz0+20;zi<gz1-10;zi+=30){ bx(gx0+40,zi-.9,gx0+41.8,zi+.9,y+1,nt,CONC,10); bx(gx0+80,zi-.9,gx0+81.8,zi+.9,y+1,nt,CONC,10); } });
  bx(gx0,gz0,gx1,gz1,roofY-.2,roofY+1,CONC,10);
  [[gx0,gz0,gx1,gz0+.8],[gx0,gz1-.8,gx1,gz1],[gx1-.8,gz0,gx1,gz1]].forEach(function(w){ bx(w[0],w[1],w[2],w[3],roofY+1,roofY+4.2,CONC,10); });
  bx(gx1-22,gz1-30,gx1-2,gz1-8,roofY+1,roofY+14,CONC,10);
  var cars=[],tops=[],poles=[],heads=[];
  function car(x,y,z,ang){ cars.push([x,y+1.25,z,ang,6,2.8,14.5]); tops.push([x,y+3.45,z,ang,5.2,1.8,6.4]); }
  var rows=[9,51,69,111];
  lv.concat([roofY]).forEach(function(y,i){ var deck=i===0?.2:y+1,fill=i===6?.5:.72;
    rows.forEach(function(rx){ for(var zc=gz0+8;zc<gz1-8;zc+=9.2){ if(r()<fill)car(gx0+rx+(r()-.5)*.6,deck,zc+(r()-.5)*.5,Math.PI/2+(r()<.5?Math.PI:0)); } }); });
  for(var px=gx0+20;px<gx1-10;px+=40){ poles.push([px,roofY+9,gz0+24,0,.6,16,.6]); poles.push([px,roofY+9,gz1-24,0,.6,16,.6]); heads.push([px,roofY+17.2,gz0+24,0,1.4,.6,3]); heads.push([px,roofY+17.2,gz1-24,0,1.4,.6,3]); }
  function curbCars(a,line,side,from,to){ for(var u=from;u<to;u+=22){ if(r()<.32)continue; var q=u+(r()-.5)*2; if(a==='x'){ if(cross(q,line))continue; car(q,.5,line+side*4,Math.PI/2); } else { if(cross(line,q))continue; car(line+side*4,.5,q,0); } } }
  curbCars('x',NZ-30+0,1,-700,700); curbCars('x',NZ+30,-1,-700,700);
  curbCars('z',WX-26,1,-700,700); curbCars('z',WX+26,-1,-700,700);
  curbCars('z',EX-26,1,-700,700); curbCars('z',EX+26,-1,-700,700);
  var trees=[];
  function treeLine(a,line,from,to,step){ for(var u=from;u<to;u+=step){ var q=u+(r()-.5)*4; if(a==='x'){ if(cross(q,line))continue; trees.push([q,line]); } else { if(cross(line,q))continue; trees.push([line,q]); } } }
  treeLine('x',-hd-4,-hw+12,hw-6,30); treeLine('x',NZ-37,-700,700,32);
  treeLine('z',-hw-7,-hd+10,hd,30); treeLine('z',WX-33,-700,700,32); treeLine('z',EX+33,-700,700,32); treeLine('z',hw+7,-hd+10,gz0-4,30);
  function lamps(a,line,from,to,side){ for(var u=from;u<to;u+=90){ if(a==='x'){ if(cross(u,line))continue; poles.push([u,12,line,0,.7,24,.7]); heads.push([u,24.2,line+side*2.5,0,1.5,.7,4]); } else { if(cross(line,u))continue; poles.push([line,12,u,0,.7,24,.7]); heads.push([line+side*2.5,24.2,u,0,4,.7,1.5]); } } }
  lamps('x',-hd-3,-700,700,-1); lamps('x',NZ-33,-700,700,1); lamps('z',WX+29,-700,700,-1); lamps('z',WX-29,-700,700,1); lamps('z',EX-29,-700,700,1); lamps('z',EX+29,-700,700,-1);
  var PAL=['red','tan','grey','buff','dark'];
  var FAC={},SHOP=aveMat(X('shop'),{roughness:.4,metalness:.2}),NRF=aveMat(X('roof'),{roughness:.95});
  PAL.forEach(function(k){ FAC[k]=aveMat(X('facade',k),{roughness:.88}); });
  var blocks=[[-hw-420,-hd-500,-hw-80,-hd-80],[-hw,-hd-500,hw,-hd-80],[hw+80,-hd-500,hw+420,-hd-80],[-hw-420,-hd,-hw-80,hd],[hw+80,-hd,hw+420,hd],[-hw-420,hd+60,-hw-80,hd+420],[-hw,hd+60,hw,hd+420],[hw+80,hd+60,hw+420,hd+420]];
  blocks.forEach(function(B,bi){ var horiz=(B[2]-B[0])>(B[3]-B[1]),len=horiz?B[2]-B[0]:B[3]-B[1],u=0;
    while(u<len-30){ var w=Math.min(len-u,60+r()*90); if(len-u-w<35)w=len-u; var p=horiz?[B[0]+u,B[1],B[0]+u+w,B[3]]:[B[0],B[1]+u,B[2],B[1]+u+w];
      if(r()<(B[1]>0?.34:.16)){ flatShape([[p[0]+2,p[1]+2],[p[2]-2,p[1]+2],[p[2]-2,p[3]-2],[p[0]+2,p[3]-2]],M.asphalt,.45); for(var cx=p[0]+12;cx<p[2]-10;cx+=9.5)for(var cz=p[1]+14;cz<p[3]-14;cz+=40){ if(r()<.6)car(cx,.45,cz,0); } }
      else { var dep=(horiz?p[3]-p[1]:p[2]-p[0]),inset=dep>140&&r()<.5?dep*.35:0,q=horiz?[p[0]+1,p[1]+(B[1]<0?inset:0),p[2]-1,p[3]-(B[1]<0?0:inset)]:[p[0]+(B[0]<0?inset:0),p[1]+1,p[2]-(B[0]<0?0:inset),p[3]-1];
        var fl=bi===1?2:B[1]>0?2+Math.floor(r()*2):B[3]<0?3+Math.floor(r()*3):2+Math.floor(r()*3),h=fl*12+2,k=PAL[Math.floor(r()*PAL.length)];
        var m=new THREE.Mesh(BOXG,[FAC[k],FAC[k],NRF,NRF,FAC[k],FAC[k]]); m.scale.set(q[2]-q[0],h-12,q[3]-q[1]); m.position.set((q[0]+q[2])/2,12+(h-12)/2,(q[1]+q[3])/2); m.castShadow=m.receiveShadow=true; scene.add(m); aveUV(m,10,12);
        var gf=new THREE.Mesh(BOXG,[SHOP,SHOP,NRF,NRF,SHOP,SHOP]); gf.scale.set(q[2]-q[0]-.6,12,q[3]-q[1]-.6); gf.position.set((q[0]+q[2])/2,6,(q[1]+q[3])/2); gf.receiveShadow=true; scene.add(gf); aveUV(gf,14,12);
        bx(q[0]-.4,q[1]-.4,q[2]+.4,q[3]+.4,h,h+1.6,M.coping,0,0,false); bx(q[0]+.4,q[1]+.4,q[2]-.4,q[3]-.4,h+1.6,h+1.8,NRF,10,10,false);
        bx(q[0]-.5,q[1]-.5,q[2]+.5,q[3]+.5,11.6,12.6,M.coping,0,0,false);
        if(r()<.7){ var ux=q[0]+(q[2]-q[0])*(.25+r()*.4),uz=q[1]+(q[3]-q[1])*(.25+r()*.4); bx(ux-5,uz-4,ux+5,uz+4,h+1.8,h+5,M.mech); } }
      u+=w; } });
  var dummy=new THREE.Object3D;
  function inst(list,mat,shadow){ if(!list.length)return; var im=new THREE.InstancedMesh(BOXG,mat,list.length); list.forEach(function(e,i){ dummy.position.set(e[0],e[1],e[2]); dummy.rotation.set(0,e[3],0); dummy.scale.set(e[4],e[5],e[6]); dummy.updateMatrix(); im.setMatrixAt(i,dummy.matrix); }); im.castShadow=shadow; im.receiveShadow=true; scene.add(im); }
  inst(cars,M.car,true); inst(tops,M.carTop,true); inst(poles,M.pole,true); inst(heads,M.pole,false);
  var trunkG=new THREE.CylinderGeometry(.9,1.2,10,6),crownG=new THREE.IcosahedronGeometry(1,1);
  var trunks=new THREE.InstancedMesh(trunkG,M.trunk,trees.length),crowns=new THREE.InstancedMesh(crownG,M.leaf,trees.length);
  trunks.castShadow=crowns.castShadow=true;
  trees.forEach(function(p,i){ var sc=.7+r()*.25; dummy.rotation.set(0,0,0); dummy.position.set(p[0],5*sc,p[1]); dummy.scale.set(sc,sc,sc); dummy.updateMatrix(); trunks.setMatrixAt(i,dummy.matrix); dummy.position.set(p[0],14*sc,p[1]); dummy.scale.set(9*sc,10*sc,9*sc); dummy.updateMatrix(); crowns.setMatrixAt(i,dummy.matrix); });
  scene.add(trunks); scene.add(crowns);
  return {np:true};
}
return {place:place,site:site,name:'The Avery',noYards:true,noBadge:true,noEntry:true,noConifers:true,frame:2.3,home:[-150,300,-520],gap:34,
  labels:[{t:'NP Ave N',p:[0,1,-AVE_D/2-38]}]};
})();
