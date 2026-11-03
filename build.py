import json, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')

CSS = ['styles.css']
JS = ['tour.js', 'explore.js', 'extras.js', 'look.js', 'panel.js', 'nav.js', 'app.js', 'calculator.js']

PROPERTIES = {
    'overland': {
        'out': 'dist',
        'global': ['overland-geometry.js', 'overland-site.js', 'cms.js'],
        'subs': {},
    },
    'avery': {
        'out': os.path.join('dist', 'avery'),
        'global': ['overland-geometry.js', 'avery-pack.js', 'cms.js'],
        'subs': {
            'Overland Reserve, Rochester, Minnesota': 'The Avery, Fargo, North Dakota',
            'like 6410-203': 'like 312',
            '3D model of Overland Reserve.': '3D model of The Avery.',
        },
    },
}


def read(name):
    with open(os.path.join(SRC, name)) as f:
        return f.read()


def strip_css(s):
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.S)
    return '\n'.join(l.strip() for l in s.splitlines() if l.strip())


def strip_js(s):
    s = re.sub(r'^[ \t]*/\*.*?\*/[ \t]*\n?', '', s, flags=re.S | re.M)
    s = re.sub(r'^[ \t]*//.*\n?', '', s, flags=re.M)
    return '\n'.join(l.rstrip() for l in s.splitlines() if l.strip())


def build_one(key, cfg):
    out = os.path.join(ROOT, cfg['out'])
    os.makedirs(out, exist_ok=True)
    css = '\n'.join(strip_css(read(n)) for n in CSS) + '\n'
    tpl = read('template.html').strip()
    for a, b in cfg['subs'].items():
        if a not in tpl:
            raise SystemExit(key + ': template text not found: ' + a)
        tpl = tpl.replace(a, b)
    parts = [
        '(function(){if(document.getElementById("or3d-tpl"))return;var t=document.createElement("template");t.id="or3d-tpl";t.innerHTML=' + json.dumps(tpl) + ';document.head.appendChild(t);})();'
    ]
    parts += [strip_js(read(n)) for n in cfg['global']]
    parts += ['try{\n' + strip_js(read(n)) + '\n}catch(e){console.error(e);}' for n in JS]
    js = '\n'.join(parts) + '\n'
    for name, body in (('finder.css', css), ('finder.js', js)):
        with open(os.path.join(out, name), 'w') as f:
            f.write(body)
        print(key, name, len(body))


def build():
    for key, cfg in PROPERTIES.items():
        if all(os.path.exists(os.path.join(SRC, n)) for n in cfg['global']):
            build_one(key, cfg)


if __name__ == '__main__':
    build()
