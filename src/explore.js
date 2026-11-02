/* Explore menu for the finder's list panel: one "Explore the property" button that opens the property tour,
   the amenity 3D tours and underground parking. It moves the existing buttons (made by the tour embed, the garage embed
   and the finder's amenity box) into the menu, so their behavior is unchanged. Styles are added to the page head. */
(function(){
var CSS="#or3d .xp{margin:12px 0;border:1.5px solid var(--line);border-radius:calc(10px*var(--t2-rk,1));background:#fff;overflow:hidden}"+
"#or3d .xp-btn{appearance:none;display:flex;align-items:center;gap:10px;width:100%;height:46px;padding:0 14px;border:0;background:#fff;color:var(--navy);font:700 14px/1 var(--f);text-transform:var(--t2-bcase,none);letter-spacing:var(--t2-btrack,normal);cursor:pointer;text-align:left}"+
"#or3d .xp-btn:hover{background:var(--surface)}#or3d .xp-btn svg{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}"+
"#or3d .xp-btn .xp-ch{margin-left:auto;transition:transform .2s}#or3d .xp-btn[aria-expanded=true] .xp-ch{transform:rotate(180deg)}"+
"#or3d .xp-menu{border-top:1px solid var(--line)}#or3d .xp-menu[hidden]{display:none}"+
"#or3d .xp-menu .ptour-panel,#or3d .xp-menu .pk-panel{display:flex;justify-content:flex-start;width:100%;height:44px;margin:0;padding:0 14px;border:0!important;border-bottom:1px solid var(--line)!important;border-radius:0;background:#fff;color:var(--ink);font-size:14px;text-transform:none;letter-spacing:0}"+
"#or3d .xp-menu>:last-child{border-bottom:0!important}#or3d .xp-menu .ptour-panel:hover,#or3d .xp-menu .pk-panel:hover{background:var(--surface);color:var(--navy)}"+
"#or3d .xp-menu .amt{margin:0;padding:10px 14px 12px;border:0;border-radius:0;background:#fff}#or3d .xp-menu .amt b{margin-bottom:8px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}"+
"#or3d .xp-menu .amt button{padding:6px 10px;font-size:12.5px}"+
"#or3d .xp-btn:focus-visible,#or3d .xp-menu button:focus-visible{outline:2px solid var(--navy);outline-offset:-2px}"+
/* phones: the amenity 3D tour tags on the map sit on top of each other over the clubhouse; this menu already lists them, so the map tags hide there */
"@media (max-width:767px){#or3d .road.amp{display:none!important}}";
if(!document.getElementById('xp-css')){var st=document.createElement('style');st.id='xp-css';st.textContent=CSS;document.head.appendChild(st);}
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
