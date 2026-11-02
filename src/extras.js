/* Finder extras (same file on every Template 2.0 site):
   1. Sort for the apartment list: price low to high (the finder's own order), price high to low, largest first, smallest first.
   2. Links into the finder: /apartments?q=2%20bed runs those words through the plain-words search, as if typed, so
      Home page "See 1 bedrooms" style links open the finder already filtered (the visitor can remove the tag). */
(function(){
var tries=0;
function init(){
var O=window.__or,ul=document.getElementById('alist'),mt=document.getElementById('match'),inp=document.getElementById('find');
if((!O||!O.BLDGS||!ul||!mt||!inp||!inp._sq)&&tries++<80)return setTimeout(init,150);
if(!O||!ul||!mt||ul._os)return;ul._os=1;
/* sort control, on the same line as the match count */
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
/* apartment rows are re-ordered in place; anything else in the list (like the tour prompt) keeps its slot */
function order(){if(mode==='rent')return;var all=[].slice.call(ul.children),lis=all.filter(function(li){var b=li.querySelector('[data-id]');if(b)li._id=b.getAttribute('data-id');return !!b;});
 if(lis.length<2)return;lis.sort(cmp);var k=0;all.map(function(li){return li._id&&lis.indexOf(li)>-1?lis[k++]:li;}).forEach(function(li){ul.appendChild(li);});mo.takeRecords();}
mo=new MutationObserver(order);mo.observe(ul,{childList:true});
/* the finder's own render is price low to high, so going back to it re-renders the list */
sel.addEventListener('change',function(){mode=sel.value;if(mode==='rent')O.apply();else order();});
/* ?q= deep link */
var q=null;try{q=new URLSearchParams(location.search).get('q');}catch(e){}
if(q&&inp._sq){inp.value=q;inp.dispatchEvent(new Event('input',{bubbles:true}));}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,0);});else init();
})();
