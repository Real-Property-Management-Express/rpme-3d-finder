# rpme-3d-finder

The 3D apartment finder used on RPME property websites (currently Overland Reserve). One stylesheet and one script, served by jsDelivr with versioned tags, the same way as `rpme-site-code`.

## Files

| File | What it is |
|---|---|
| `dist/finder.css` | All finder styles. Load in the page head so the finder renders in its final look from the first frame. |
| `dist/finder.js` | All finder behavior: markup template, 3D scene, list panel, search, filters, sort, tours, cost calculator. Load at the end of the page, after three.js 0.128 and OrbitControls. |
| `src/` | Readable sources. `python3 build.py` builds `dist/` (comments stripped). |

## How a page loads it

Page head:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script>!function(d){var v='1',q='?h='+Math.floor(Date.now()/36e5);window.OR3D_SRC='https://cdn.jsdelivr.net/gh/Real-Property-Management-Express/rpme-3d-finder@'+v+'/dist/';window.OR3D_Q=q;d.write('<link rel="stylesheet" href="'+OR3D_SRC+'finder.css'+q+'">')}(document)</script>
```

Page footer:

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
<script>document.write('<script src="'+OR3D_SRC+'finder.js'+OR3D_Q+'"><\/script>')</script>
```

`v` picks the version line (`'1'`); set an exact pre-release (for example `'1.0.1-rc.1'`) to test on one site. `?h=` changes hourly so returning visitors get a release within an hour.

## What stays on the page (property data)

- `#or3d` container, with a data embed: `OR3D_UNIT_TOURS`, `OR3D_AMENITY_TOURS`, `OR3D_PROPERTY_TOUR`, and `OR3D_DEMO_TERMS` while sample lease prices are in use.
- The apartments table embed: static SEO content, `OR3D_FP` plan images and the unit rows.
- Fees come from the site's T2Settings (`T2.appFee`) until the fee table sync.
- Live unit data (optional): a hidden Collection List of the Units collection (`hidden`, `data-or3d-units`), each item a div with `data-or3d-unit` = Name (e.g. `6410-203`), `data-status` = Status, `data-date` = Available Date, `data-rent` = Display Rent, `data-terms` = Lease Terms JSON, `data-apply` = Apply URL, plus a child div `data-hide="1"` whose visibility is bound to Hide on Site (switches can't bind to attributes). The finder then:
  - uses Display Rent (0 shows Call for pricing) and Lease Terms JSON (`[{"months":12,"rent":1485}]`) in the cost estimate;
  - shows Available now / Available [date] / Leased; Occupied and Down units are left out of the list, dimmed on the map, and their card has no tour or apply buttons;
  - leaves Hide on Site units out of the list and map matches;
  - sends Apply now to the unit's Apply URL when set.
  Blank fields keep the page's unit rows. Store Available Date at noon UTC (or later), because Webflow shows dates in the site's time zone and a midnight-UTC date shows the day before.

## Releases

Same flow as `rpme-site-code`: tag `x.y.z-rc.n`, point only the test site at it, test, tag `x.y.z`, purge `@1` on jsDelivr.
