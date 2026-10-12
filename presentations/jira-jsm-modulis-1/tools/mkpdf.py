import json,re,html,pathlib
root=pathlib.Path('deck/project')
deck=json.load(open(root/'deck.json'))
order=deck['order']
sec_start={v['start']:v['description'] for v in deck['sections'].values()}
TIME={'cover':'10:00','par-mani':'10:00','plans':'10:01','merkis':'10:02','demo-vide':'10:03','s121':'10:04','divi-skati':'10:05','lomas':'10:07','hierarhija':'10:09','cikls':'10:11','s122':'10:12','portals':'10:13','tipi':'10:15','situacija':'10:17','s123':'10:20','tris-celi':'10:21','forma':'10:23','apraksts':'10:28','raise':'10:33','s124':'10:35','mani-pieteikumi':'10:36','rindas':'10:41','pauze':'10:45','s125':'10:55','anatomija':'10:56','soli':'10:59','taustini':'11:08','s126':'11:10','publisks-iekss':'11:11','sadarbiba':'11:15','s127':'11:20','jql':'11:21','filtri':'11:25','dashboard':'11:28','reports':'11:32','kopsavilkums':'11:33','jautajumi':'11:35'}
DEMO={
'portals':'Demo vidē: “Klients · portāls”. Sākumlapā ieraksti meklētājā “dators”, tad “pārvietošana”. Uzklikšķini kartītei “IKT pakalpojumu atbalsts”, atgriezies ar breadcrumb.',
'tipi':'Demo vidē: “Klients · portāls” → IKT kartīte (9 tipi), tad Saimnieciskais (9 tipi). Pēc tam “Aģents · Jira”: sānjosla Queues, Raise a request, Reports, projekta pārslēgs IKT / SAIM.',
'situacija':'Demo vidē (ja gribi parādīt): portāla meklētājā ieraksti “printeris”, “krēsls”, “gaisma” un parādi, kuru tipu atrod.',
'forma':'Demo vidē: “Klients · portāls” → Saimnieciskais → “Darba vietas pārvietošana”. Spied Create ar tukšu formu (sarkanas kļūdas), tad aizpildi: Nosaukums, Apraksts, 214 → 305, termiņš, pielikums → Create. Pieraksti atslēgu (SAIM-…).',
'apraksts':'Demo vidē: “Klients · portāls” → IKT → “Datortehnikas darbības traucējumi”: Lietotājs, Nosaukums, Apraksts (labais piemērs), Iekārtu saraksts → Create.',
'raise':'Demo vidē: “Aģents · Jira” → sānjosla “Raise a request” → “Datortehnikas darbības traucējumi” → on behalf of Laura Jansone, Nosaukums “Projektors Sarkanajā zālē” → Create. Augšējā “Create” ar Customer Request Type = None parāda brīdinājumu.',
'mani-pieteikumi':'Demo vidē: “Klients · portāls” → augšā “Requests” → Open / Closed / All, meklēšana. Atver savu pieteikumu → Add comment + pielikums → Share ar kolēģi → Don’t notify me.',
'rindas':'Demo vidē: “Aģents · Jira” → Queues: All open, Unassigned, Atlikts / Ārpakalpojumā, SLA breached. Parādi SLA kolonnas (sarkans = pārsniegts). Augšējā Search ieraksti IKT-311 → Enter.',
'anatomija':'Demo vidē: “Aģents · Jira” → atver IKT-314. Parādi: nosaukums, pogas, statusa poga “Reģistrēts ▾”, Request type, apraksts, komentāru cilnes, labajā pusē SLAs, People, Dates; apakšā All / Comments / History.',
'soli':'Demo vidē: IKT-314 → taustiņš i (Assign to me) → “Reģistrēts ▾” → Izpildē → Respond to customer ar jautājumu → “Izpildē ▾” → Atlikt → pārslēdz uz “Klients · portāls”, izvēlies klientu Laura Jansone, atbildi → atpakaļ “Aģents” → “Atlikts ▾” → Izpildē → “Izpildē ▾” → Uzstādīt tehniku / Izpildīts + komentārs klientam. Klienta pusē parādi slēgto pieteikumu un vērtējumu.',
'taustini':'Demo vidē (aģenta skatā, kursors nav teksta laukā): i, m, /, g d, g i, ?. Poga “?” augšējā joslā parāda sarakstu.',
'publisks-iekss':'Demo vidē: pieteikumā “Respond to customer” → komentārs; pārslēdz uz klientu un parādi, ka redzams. Tad “Internal comment” → komentārs; klienta pusē parādi, ka NAV redzams. Atver pogu “Paziņojumi” augšā: iekšējam komentāram klientam e-pasts netiek sūtīts.',
'sadarbiba':'Demo vidē: Internal comment ieraksti “@Mār” → izvēlies Māris Liepa → Save. Pievieno pielikumu (Choose files), Watch poga, labajā kolonnā Participants → Add. Poga “Paziņojumi” rāda, kas saņēma e-pastu.',
'jql':'Demo vidē: “Aģents · Jira” → augšā “Issues” → Basic filtri (Project, Status, Assignee) → cilne “Advanced (JQL)” parāda vaicājumu. Ātrie vaicājumi: Mani atvērtie, Nepiešķirtie IKT, Aizķērušies, SLA pārsniegts.',
'filtri':'Demo vidē: ātrais vaicājums “Aizķērušies (7 d)” → Save as → “IKT · Aizķērušies” → Save. Tad “Nepiešķirtie IKT” → Save as “IKT · Nepiešķirtie”. Pie filtra: ★ (Favourite) un ✉ (Subscribe).',
'dashboard':'Demo vidē: augšā “Dashboards” → Create new dashboard → Create → Add gadget: Filter Results (IKT · Nepiešķirtie), Issue Statistics (Projekts: IKT), Created vs. Resolved. “Edit layout” maina kolonnas, bultiņas ← → pārvieto gadgetus.',
'reports':'Demo vidē: “Aģents · Jira” → sānjosla “Reports”: Workload, SLA goals, Created vs Resolved.',
'pauze':'Demo vidē pirms otrās daļas: pārbaudi rindas; ja vajag sākt no jauna, augšā “Atiestatīt datus”.',
'demo-vide':'Pirms apmācības: atver demo vidi, nospied “Atiestatīt datus”. Video ierakstam paslēp sānjoslu “Scenārijs”.',
}
def txt(fragment):
    t=re.sub(r'<br\s*/?>','\n',fragment); t=re.sub(r'<[^>]+>','',t); return html.unescape(t).strip()
rows=[]
for i,sid in enumerate(order,1):
    s=open(root/'slides'/(sid+'.html')).read()
    m=re.search(r'<h[12][^>]*>(.*?)</h[12]>',s,re.S); title=txt(m.group(1)) if m else sid
    e=re.search(r'<p[^>]*text-transform:uppercase[^>]*>(.*?)</p>',s,re.S); eb=txt(e.group(1)) if e else ''
    n=re.search(r'<aside>(.*?)</aside>',s,re.S); notes=txt(n.group(1)) if n else ''
    rows.append((i,sid,title,eb,notes))
def fmt_notes(t):
    out=[]
    for para in re.split(r'\n\s*\n',t):
        lines=[l for l in para.split('\n') if l.strip()]
        if not lines: continue
        h=''
        first=lines[0]
        mm=re.match(r'^([A-ZĀČĒĢĪĶĻŅŠŪŽ][A-ZĀČĒĢĪĶĻŅŠŪŽ0-9 ,()"\'./–-]{2,60}?):\s*(.*)$',first)
        if mm and mm.group(1).upper()==mm.group(1):
            h='<b class="lb">'+html.escape(mm.group(1))+'</b> '; lines[0]=mm.group(2)
        items=[l for l in lines if re.match(r'^\s*(\d+\.|-)\s',l)]
        if items and len(items)==len([l for l in lines if l.strip()]) - (0 if lines[0].strip() else 1) and not lines[0].strip()=='' :
            pass
        body=''
        buf=[]
        for l in lines:
            if re.match(r'^\s*(\d+\.|-)\s',l):
                buf.append('<li>'+html.escape(re.sub(r'^\s*(\d+\.|-)\s','',l))+'</li>')
            else:
                if buf: body+='<ul>'+''.join(buf)+'</ul>'; buf=[]
                if l.strip(): body+='<p>'+html.escape(l)+'</p>'
        if buf: body+='<ul>'+''.join(buf)+'</ul>'
        out.append('<div class="para">'+(('<p class="h">'+h+'</p>') if h else '')+body+'</div>')
    return ''.join(out)
H=['''<!doctype html><html lang="lv"><head><meta charset="utf-8"><title>Pasniedzēja piezīmes</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:16mm 15mm 16mm 15mm}
body{font:10.5pt/1.5 "IBM Plex Sans",Arial,sans-serif;color:#1A1D24;margin:0}
h1{font:800 24pt/1.1 Manrope,Arial,sans-serif;margin:0 0 4mm;color:#1A1D24}
.eyebrow{font:700 8.5pt Manrope,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8C1D2F}
.cover{border-left:5px solid #8C1D2F;padding:2mm 0 2mm 6mm;margin-bottom:6mm}
.meta{color:#545A69;font-size:10pt}
table.map{border-collapse:collapse;width:100%;margin:4mm 0 6mm;font-size:9.5pt}
table.map td,table.map th{border:1px solid #DEDAD3;padding:2mm 3mm;text-align:left;vertical-align:top}
table.map th{background:#F5F4F1}
.sec{font:800 13pt Manrope,Arial,sans-serif;color:#FDFCFA;background:#1A1D24;padding:2.5mm 4mm;border-radius:2mm;margin:7mm 0 3mm;break-after:avoid}
.slide{border:1px solid #DEDAD3;border-radius:2.5mm;padding:3.5mm 4.5mm;margin:0 0 3.5mm;break-inside:avoid}
.top{display:flex;gap:3mm;align-items:baseline;margin-bottom:1.5mm}
.num{font:800 10pt Manrope,Arial,sans-serif;background:#8C1D2F;color:#fff;border-radius:999px;padding:.6mm 2.4mm;white-space:nowrap}
.time{font:600 9pt "IBM Plex Sans";color:#545A69;white-space:nowrap}
.ttl{font:700 11.5pt Manrope,Arial,sans-serif}
.eb{font-size:8.5pt;color:#8C1D2F;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
.para{margin:1.2mm 0}
.para p{margin:.4mm 0}
.para ul{margin:.6mm 0 .6mm 5mm;padding:0}
.lb{color:#8C1D2F;font-weight:700}
.demo{background:#E6EFFC;border-left:3px solid #0B5CCF;padding:2mm 3mm;margin-top:2mm;border-radius:0 1.5mm 1.5mm 0;font-size:10pt}
.demo b{color:#0B5CCF}
.empty{color:#545A69;font-style:italic}
</style></head><body>
<div class="cover"><div class="eyebrow">Saeimas Jira apmācība · 1. modulis</div><h1>Pasniedzēja piezīmes pa slaidiem</h1>
<div class="meta">Pakalpojumu pārvaldības iespējas Jira Service Management Data Center · 10:00–11:40 · pauze 10:45–10:55<br>Katram slaidam: ko teikt, ko rādīt un kur klikšķināt demo vidē.</div></div>
<table class="map"><tr><th style="width:32%">Piezīmēs rakstīts</th><th>Demo vidē</th></tr>
<tr><td>KLIENTA LOGĀ / portālā</td><td>Augšējā joslā pārslēgs <b>“Klients · portāls”</b>. Klientu maina izvēlnē “Klients:” (Anna Bērziņa, Laura Jansone, Edgars Krūmiņš).</td></tr>
<tr><td>AĢENTA LOGĀ / Jira</td><td>Pārslēgs <b>“Aģents · Jira”</b>. Projektu (IKT / SAIM) maina sānjoslas izvēlnē.</td></tr>
<tr><td>Statusa maiņa</td><td>Zilā statusa poga, piem. <b>“Reģistrēts ▾”</b>, atver pārejas (Izpildē, Izpildīts, Uzstādīt tehniku, Pagaidu risinājums, Atlikt, Nodots ārpakalpojumā).</td></tr>
<tr><td>E-pasta paziņojumi</td><td>Poga <b>“Paziņojumi”</b> augšā rāda, kurš saņemtu e-pastu.</td></tr>
<tr><td>Sākt no jauna</td><td>Poga <b>“Atiestatīt datus”</b>. Sānjosla <b>“Scenārijs”</b> satur soļus ar atzīmēm.</td></tr></table>
''']
for i,sid,title,eb,notes in rows:
    if sid in sec_start: H.append('<div class="sec">'+html.escape(sec_start[sid])+'</div>')
    H.append('<div class="slide"><div class="top"><span class="num">'+str(i)+'</span><span class="time">'+TIME.get(sid,'')+'</span><span class="ttl">'+html.escape(title)+'</span></div>')
    if eb: H.append('<div class="eb">'+html.escape(eb)+'</div>')
    H.append(fmt_notes(notes) if notes else '<p class="empty">Nav piezīmju.</p>')
    if sid in DEMO: H.append('<div class="demo"><b>Demo vidē:</b> '+html.escape(DEMO[sid].replace('Demo vidē: ','').replace('Demo vidē ',''))+'</div>')
    H.append('</div>')
H.append('</body></html>')
open('piezimes.html','w').write(''.join(H))
print(len(rows))
