# AI uzbūvēta lapa nav automātiski gatava lapa

Vertikāla 3D infografika latviešu valodā (1080 x 2400 px): 5 biežākās kļūdas AI veidotās lapās un kā no tām izvairīties.

## Faili

| Fails | Apraksts |
|---|---|
| `index.html` | Viens HTML fails ar iekļautu SVG, pielāgojas mobilajai ierīcei, pogas PNG/SVG lejupielādei |
| `ai-lapa-5-kludas@2x.png` | PNG 2x izšķirtspējā (2160 x 4800 px) |
| `ai-lapa-5-kludas.svg` | Atsevišķs SVG ar iegultu Inter fonta apakškopu |
| `ai-lapa-5-kludas.pdf` | Vektoru PDF (1080 x 2400 px), piemērots importam Canva |
| `design-philosophy.md` | Dizaina filozofija ("Luminous Ledger") |

## Pārbūvēšana

```bash
pip install fonttools brotli
python3 build_fonts.py   # Inter apakškopa (woff2) ar serifu "I" -> fonts.css
node build.mjs           # index.html, .svg, @2x.png, .pdf
```

`builder.js` ģenerē SVG pārlūkā, mērot teksta platumu ar īsto fontu, lai nekas nepārklātos un neizietu ārpus malām.
