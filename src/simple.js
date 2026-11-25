/* Floor-first sites (OR3D_UI.floorFirst): fewer controls on screen, nothing removed.
   Rare map controls move into one More menu, Sort moves into the Filters drawer, the
   Buildings tab gives way to the building tabs, the tour and fees boxes share one line,
   and the campus map shows a one-line hint. */
(function(){
'use strict';
var root=document.getElementById('or3d');
if(!root||!(window.OR3D_UI&&window.OR3D_UI.floorFirst))return;
var mob=function(){return window.matchMedia('(max-width:767px)').matches;};
var DOTS='<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="4.5" cy="10" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="15.5" cy="10" r="1.6"/></svg>';

function more(){
  var c=document.getElementById('ctrls'),q=root.querySelector('.or3d-q');
  if(!c||!q)return false;
  if(root.querySelector('.or3d-more'))return true;
  var rows=[['.or3d-turn','Turn the map'],['#compass','Face north'],['.or3d-dim','Flat or tilted map'],['#unums','Apartment numbers on the building']];
  if(mob())rows=[['.ptour-map','Take the property tour'],['#zin','Zoom in'],['#zout','Zoom out']].concat(rows);
  rows.push(['.or3d-q','How to use the map']);
  var w=document.createElement('div');w.className='or3d-more';
  var b=document.createElement('button');b.type='button';b.className='cbtn or3d-mbtn';b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','or3dMore');b.innerHTML=DOTS+'<span>More</span>';
  var m=document.createElement('div');m.className='or3d-mmenu';m.id='or3dMore';m.hidden=true;
  rows.forEach(function(r){
    [].forEach.call(root.querySelectorAll(r[0]),function(el,i,all){
      var row=document.createElement('div');row.className='mrow';
      var lab=document.createElement('span');lab.className='ml';
      lab.textContent=all.length>1?r[1]+(i?' right':' left'):r[1];
      row.appendChild(el);row.appendChild(lab);m.appendChild(row);
      row.addEventListener('click',function(e){if(!el.contains(e.target))el.click();if(!/turn|zin|zout/.test(el.className+el.id))close();});
    });
  });
  w.appendChild(m);w.appendChild(b);
  var reset=document.getElementById('reset');
  if(reset&&reset.parentNode===c)c.insertBefore(w,reset.nextSibling);else c.appendChild(w);
  function sync(){[].forEach.call(m.children,function(row){var el=row.firstChild;row.hidden=!el||el.hidden||getComputedStyle(el).display==='none';});}
  function close(){m.hidden=true;b.setAttribute('aria-expanded','false');}
  b.addEventListener('click',function(e){e.stopPropagation();if(m.hidden){m.hidden=false;sync();b.setAttribute('aria-expanded','true');}else close();});
  document.addEventListener('click',function(e){if(!w.contains(e.target))close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden){close();b.focus();}});
  return true;
}

function sortInFilters(){
  var s=root.querySelector('.osort'),f=document.getElementById('fmore');
  if(!s||!f)return false;
  if(s.parentNode!==f){s.classList.add('osort-f');f.insertBefore(s,f.firstChild);}
  return true;
}

function oneLine(){
  var g=root.querySelector('#aview .or3d-gt');
  if(!g)return false;
  if(g.querySelector('.gt-fees'))return true;
  var fb=root.querySelector('.lk-fees');
  if(!fb)return false;
  var sep=document.createElement('span');sep.className='gt-sep';sep.textContent='·';
  var x=document.createElement('button');x.type='button';x.className='gt-fees';x.textContent='See all fees';
  x.addEventListener('click',function(){var f=root.querySelector('.lk-fees');if(f)f.click();});
  g.appendChild(sep);g.appendChild(x);
  return true;
}

function hint(){
  var map=document.getElementById('omap');
  if(!map)return false;
  if(!map.querySelector('.or3d-step')){var h=document.createElement('p');h.className='or3d-step';h.textContent=(mob()?'Tap':'Click')+' a building to see its floor plans';map.appendChild(h);}
  return true;
}

var jobs=[more,sortInFilters,oneLine,hint],n=0;
(function tick(){jobs=jobs.filter(function(f){try{return!f();}catch(e){return false;}});if(jobs.length&&++n<120)setTimeout(tick,250);})();
})();
