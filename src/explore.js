/* Explore menu for the finder's list panel: one "Explore the property" button that opens the property tour,
   the amenity 3D tours and underground parking. It moves the existing buttons (made by the tour embed, the garage embed
   and the finder's amenity box) into the menu, so their behavior is unchanged. Styles are added to the page head. */
(function(){
var tries=0;
function init(){
var cv=document.getElementById('campusView');
var tour=cv&&cv.querySelector('.ptour-panel'),park=cv&&cv.querySelector('.pk-panel'),amt=cv&&cv.querySelector('.amt');
/* wait until the pieces exist; after about 4 seconds, build with whatever is there */
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
