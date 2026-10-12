"""Būvē prezentāciju: ievieto attēlus kā data URI.
Izvade:
  index.html     – pilns HTML dokuments atvēršanai pārlūkā lokāli
  dist/deck.html – fragments publicēšanai kā Claude Artifact (bez doctype/head)
"""
import base64, pathlib, re

root = pathlib.Path(__file__).parent
tpl = (root / "src" / "deck.template.html").read_text(encoding="utf-8")

def img(name):
    data = (root / "assets" / f"{name}.jpg").read_bytes()
    return "data:image/jpeg;base64," + base64.b64encode(data).decode()

body = re.sub(r"\{\{IMG_(\w+)\}\}", lambda m: img(m.group(1)), tpl)
(root / "dist").mkdir(exist_ok=True)
(root / "dist" / "deck.html").write_text(body, encoding="utf-8")
full = ('<!doctype html>\n<html lang="lv">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '</head>\n<body>\n' + body + '\n</body>\n</html>\n')
(root / "index.html").write_text(full, encoding="utf-8")
print("ok", len(full) // 1024, "KB")
