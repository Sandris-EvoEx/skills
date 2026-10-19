import base64, pathlib, sys
root = pathlib.Path(__file__).resolve().parent.parent
fonts = pathlib.Path(sys.argv[1])
faces = [("Outfit","Outfit-Regular.ttf",400),("Outfit","Outfit-Bold.ttf",700),
         ("Instrument Sans","InstrumentSans-Regular.ttf",400),("Instrument Sans","InstrumentSans-Bold.ttf",700),
         ("JetBrains Mono","JetBrainsMono-Regular.ttf",400),("JetBrains Mono","JetBrainsMono-Bold.ttf",700)]
css = "".join(
  f'@font-face{{font-family:"{n}";font-weight:{w};font-style:normal;font-display:swap;'
  f'src:url(data:font/ttf;base64,{base64.b64encode((fonts/f).read_bytes()).decode()}) format("truetype");}}\n'
  for n,f,w in faces)
fix = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" '
       'stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>')
html = (root/"src/template.html").read_text().replace("/*FONTS*/", css).replace("FIXICON", fix)
assert "—" not in html and "–" not in html, "garā domuzīme atrasta"
(root/"ai-lapa-infografika.html").write_text(html)
print("ok", len(html)//1024, "KB")
