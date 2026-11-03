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
function aveShell(c){
  var part=c.part,M=c.M,s=c.shell,hw=c.hw,hd=c.hd,L=AVE_LIFT,top=AVE_LIFT+c.H;
  function box(r,y0,y1,mat,shadow){ return part(s,mat,r[2]-r[0],y1-y0,r[3]-r[1],(r[0]+r[2])/2-hw,(y0+y1)/2,(r[1]+r[3])/2-hd,shadow); }
  function mk(hex,o){ return new THREE.MeshStandardMaterial(Object.assign({color:new THREE.Color(hex).convertSRGBToLinear(),roughness:.8,metalness:0},o||{})); }
  var CU=mk('#d08f62',{roughness:.55,metalness:.12}),SG=mk('#8d907e'),CR=mk('#e7e2d6'),DK=mk('#2b2f33',{roughness:.6}),BR=mk('#d5cfc1',{roughness:.9});
  function fbox(r,y0,y1,f){ var m=new THREE.Mesh(c.BOX,[f[0],f[1],M.roof,M.roof,f[2],f[3]]); m.scale.set(r[2]-r[0],y1-y0,r[3]-r[1]); m.position.set((r[0]+r[2])/2-hw,(y0+y1)/2,(r[1]+r[3])/2-hd); m.castShadow=m.receiveShadow=true; s.add(m); return m; }
  box([0,0,268,249],0,L-.5,BR);
  box([0,0,268,4],1,L-3,M.glass,false);
  var wings=[[0,21,118,78],[118,4,268,45],[113,78,146,185],[0,183,146,249]];
  var FACES=[[CR,SG,CR,SG],[CU,CU,CR,CU],[CR,CR,CR,CR],[SG,SG,SG,CR]];
  wings.forEach(function(r,wi){ fbox(r,L-.5,top,FACES[wi]); box([r[0]-.4,r[1]-.4,r[2]+.4,r[3]+.4],top,top+1.4,M.coping); for(var fl=1;fl<5;fl++){ var yb=L+fl*c.FH; box([r[0]-.25,r[1]-.25,r[2]+.25,r[3]+.25],yb-.3,yb+.3,M.coping,false); } box([r[0]-.3,r[1]-.3,r[2]+.3,r[3]+.3],L-.6,L+.6,M.coping,false); });
  fbox([0,78,113,183],L-.5,L+c.FH+3,[CR,SG,CR,CR]);
  box([2,80,111,181],L+c.FH+3,L+c.FH+3.4,M.roof,false);
  var g=[146,45,268,249];
  for(var lv=0;lv<5;lv++){ var y=L+lv*c.FH; box(g,y,y+1.2,M.concrete); box([g[0]+1,g[1]+1,g[2]-1,g[3]-1],y+1.2,y+c.FH,M.deck,false); }
  box(g,L+5*c.FH,L+5*c.FH+1.2,M.concrete);
  for(var sx=122;sx<266;sx+=17){ box([sx-2.9,3.6,sx+2.9,3.9],L+1,top-1,DK,false); }
  box([118,3.4,268,3.9],L-.5,L+2.2,CU,false);
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
  var V=THREE.Vector2,hw=AVE_W/2,hd=AVE_D/2;
  flatShape([[-1400,-1400],[1400,-1400],[1400,1400],[-1400,1400]],M.concrete,.2);
  ribbon([new V(-1400,-hd-38),new V(1400,-hd-38)],60,M.road,.5);
  ribbon([new V(-hw-40,-1400),new V(-hw-40,1400)],52,M.road,.5);
  ribbon([new V(hw+40,-1400),new V(hw+40,1400)],52,M.road,.5);
  ribbon([new V(-1400,hd+30),new V(1400,hd+30)],36,M.asphalt,.5);
  var blocks=[[-hw-420,-hd-500,-hw-80,-hd-80],[-hw,-hd-500,hw,-hd-80],[hw+80,-hd-500,hw+420,-hd-80],[-hw-420,-hd,-hw-80,hd],[hw+80,-hd,hw+420,hd],[-hw-420,hd+60,-hw-80,hd+420],[-hw,hd+60,hw,hd+420],[hw+80,hd+60,hw+420,hd+420]];
  blocks.forEach(function(b,i){
    var h=[18,30,14,24,20,16,28,18][i],m=new THREE.Mesh(new THREE.BoxGeometry(b[2]-b[0],h,b[3]-b[1]),M.houseWall);
    m.position.set((b[0]+b[2])/2,h/2,(b[1]+b[3])/2);m.castShadow=m.receiveShadow=true;scene.add(m);
  });
  return {np:true};
}
return {place:place,site:site,name:'The Avery',noYards:true,noBadge:true,frame:2.3,home:[430,240,330],gap:34,
  labels:[{t:'NP Ave N',p:[0,1,-AVE_D/2-38]}]};
})();
