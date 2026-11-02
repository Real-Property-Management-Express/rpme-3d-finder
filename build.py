import json, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
DIST = os.path.join(ROOT, 'dist')

CSS = ['styles.css']
GLOBAL_JS = ['overland-geometry.js', 'cms.js']
JS = ['tour.js', 'explore.js', 'extras.js', 'look.js', 'panel.js', 'nav.js', 'app.js', 'calculator.js']


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


def build():
    os.makedirs(DIST, exist_ok=True)
    css = '\n'.join(strip_css(read(n)) for n in CSS) + '\n'
    tpl = read('template.html').strip()
    parts = [
        '(function(){if(document.getElementById("or3d-tpl"))return;var t=document.createElement("template");t.id="or3d-tpl";t.innerHTML=' + json.dumps(tpl) + ';document.head.appendChild(t);})();'
    ]
    parts += [strip_js(read(n)) for n in GLOBAL_JS]
    parts += ['try{\n' + strip_js(read(n)) + '\n}catch(e){console.error(e);}' for n in JS]
    js = '\n'.join(parts) + '\n'
    for name, body in (('finder.css', css), ('finder.js', js)):
        with open(os.path.join(DIST, name), 'w') as f:
            f.write(body)
        print(name, len(body))


if __name__ == '__main__':
    build()
