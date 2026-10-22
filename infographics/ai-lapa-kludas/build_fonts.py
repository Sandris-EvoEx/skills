"""Sagatavo Inter apakškopas (woff2, base64) iegulšanai SVG.

Lielais "I" tiek pārslēgts uz Inter cv08 variantu ar serifiem, lai "AI" nelasās kā "Al".
Palaišana: python3 build_fonts.py  ->  fonts.css
"""
import base64
import io
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

SRC = Path('/usr/share/fonts/opentype/inter')
WEIGHTS = {500: 'Inter-Medium.otf', 600: 'Inter-SemiBold.otf', 700: 'Inter-Bold.otf',
           800: 'Inter-ExtraBold.otf', 900: 'Inter-Black.otf'}
CHARS = (''.join(chr(c) for c in range(0x20, 0x7f))
         + 'ĀāČčĒēĢģĪīĶķĻļŅņŠšŪūŽž')


def cv08_glyph(font):
    gsub = font['GSUB'].table
    for fr in gsub.FeatureList.FeatureRecord:
        if fr.FeatureTag != 'cv08':
            continue
        for li in fr.Feature.LookupListIndex:
            for st in gsub.LookupList.Lookup[li].SubTable:
                mapping = getattr(st, 'mapping', None)
                if mapping and 'I' in mapping:
                    return mapping['I']
    return None


css = []
for weight, fname in WEIGHTS.items():
    font = TTFont(SRC / fname)
    alt = cv08_glyph(font)
    if alt:
        for table in font['cmap'].tables:
            if ord('I') in table.cmap:
                table.cmap[ord('I')] = alt
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['kern', 'liga', 'calt', 'ccmp', 'mark', 'mkmk']
    opts.name_IDs = ['*']
    sub = subset.Subsetter(opts)
    sub.populate(text=CHARS)
    sub.subset(font)
    buf = io.BytesIO()
    font.flavor = 'woff2'
    font.save(buf)
    b64 = base64.b64encode(buf.getvalue()).decode()
    css.append(f"@font-face{{font-family:'InterLV';font-weight:{weight};font-style:normal;"
               f"src:url(data:font/woff2;base64,{b64}) format('woff2');}}")
    print(weight, 'cv08' if alt else 'no-cv08', len(buf.getvalue()), 'B')

Path(__file__).with_name('fonts.css').write_text('\n'.join(css) + '\n')
