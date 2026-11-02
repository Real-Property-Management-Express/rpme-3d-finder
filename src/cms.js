/* CMS unit data. A hidden Webflow Collection List of the Units collection puts one
   [data-or3d-unit] element per unit on the page, with these attributes bound to CMS fields:
   data-or3d-unit (Name, e.g. 6410-203), data-status, data-date (Available Date),
   data-rent (Display Rent), data-terms (Lease Terms JSON), data-apply (Apply URL). Hide on Site is a child
   [data-hide] element shown only when the switch is on (switches can't bind to attributes). Anything blank keeps the value from the page's unit rows. */
(function(){
  var nodes = document.querySelectorAll('[data-or3d-unit]');
  if (!nodes.length) return;
  var MON = {jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12};
  function pad(n){ return ('0'+n).slice(-2); }
  function iso(v){
    v = String(v||'').trim(); if (!v) return '';
    var m = v.match(/^(\d{4})-(\d{2})-(\d{2})/); if (m) return m[1]+'-'+m[2]+'-'+m[3];
    m = v.match(/^([A-Za-z]{3})[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})/); if (m && MON[m[1].toLowerCase()]) return m[3]+'-'+pad(MON[m[1].toLowerCase()])+'-'+pad(+m[2]);
    m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/); if (m) return m[3]+'-'+pad(+m[1])+'-'+pad(+m[2]);
    var d = new Date(v); return isNaN(d) ? '' : d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
  }
  function yes(v){ v = String(v||'').trim().toLowerCase(); return v==='true' || v==='1' || v==='yes'; }
  function today(){ var d = new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
  var rows = {}; (window.DIR||[]).forEach(function(r){ rows[r[0]+'-'+r[1]] = r; });
  var cms = {}, avail = {}, priced = {}, anyStatus = false, now = today();
  [].forEach.call(nodes, function(n){
    var id = String(n.getAttribute('data-or3d-unit')||'').trim(); if (!id) return;
    var g = function(k){ return String(n.getAttribute('data-'+k)||'').trim(); };
    var c = cms[id] = {hide: yes(g('hide')) || !!n.querySelector('[data-hide]'), apply: g('apply')};
    var rent = g('rent');
    if (rent !== '' && !isNaN(+rent.replace(/[$,]/g,'')) && rows[id]) rows[id][3] = +rent.replace(/[$,]/g,'');
    var t = g('terms');
    if (t) { try { var list = JSON.parse(t); if (Array.isArray(list) && list.length) priced[id] = {terms: list}; } catch(e) {} }
    var s = g('status').toLowerCase(), d = iso(g('date'));
    if (s) anyStatus = true;
    if (s === 'available') avail[id] = d && d > now ? d : 'now';
    else if (s === 'notice') { if (d) avail[id] = d; }
    else if (s === 'occupied' || s === 'down') { avail[id] = 'off'; c.off = true; }
  });
  window.OR3D_CMS = cms;
  if (Object.keys(priced).length) window.OR3D_PRICING = {units: priced};
  if (anyStatus) window.OR3D_AVAIL = avail;
})();
