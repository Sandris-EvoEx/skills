import json,re,html,pathlib
root=pathlib.Path('deck2/project')
deck=json.load(open(root/'deck.json'))
order=deck['order']
sec_start={v['start']:v['description'] for v in deck['sections'].values()}
TIME={'cover':'9:00','par-mani':'9:01','plans':'9:03','merkis':'9:04','demo-vide':'9:05','ieraksts':'9:06','s221':'9:08','jsw':'9:08','hierarhija':'9:11','lomas':'9:14','cikls':'9:17','s222':'9:20','projekti':'9:20','mani-darbi':'9:26','s223':'9:32','izveide':'9:32','labs':'9:40','s224':'9:50','skats':'9:50','vesture':'9:58','s225':'10:08','scrum-kanban':'10:08','delis':'10:11','progress':'10:19','pauze':'10:30','s226':'10:45','jql':'10:45','filtri':'10:52','s227':'10:58','dashboard':'10:58','s228':'11:08','plan-kas':'11:08','plan-izveide':'11:11','plan-skats':'11:14','atkaribas':'11:18','izmainas':'11:22','programma':'11:25','s229':'11:28','sadarbiba':'11:28','kopsavilkums':'11:30','jautajumi':'11:32'}
DEMO={
'demo-vide':'Pirms apmācības: atver demo vidi, nospied “Atiestatīt datus”, persona Anna. Video ierakstam aizver sānjoslu “Scenārijs”.',
'jsw':'Projects ▾ → View all projects (DIGI Scrum, PASK Kanban).',
'hierarhija':'Atver DIGI-1 (epiks) → sadaļa “Issues in epic” ar progresa joslu.',
'lomas':'Augšā persona Anna → Edgars; Issues ▾ → My open issues rāda citus darbus.',
'cikls':'DIGI-4 → “View workflow”.',
'projekti':'Projects ▾ → View all projects → Digitālo pakalpojumu attīstība → Backlog, Issues; meklētājā “DIGI-4” + Enter; Boards ▾ → DIGI dēlis.',
'mani-darbi':'Issues ▾ → My open issues; persona Edgars un atpakaļ; dēlī Only My Issues, kolēģa avatars, Kavētie; System Dashboard → Assigned to Me.',
'izveide':'Create (vai taustiņš c) → Create ar tukšu formu (sarkana kļūda) → aizpildi Summary, Description, Assignee Laura, Priority High, Due 06.11.2026, Labels, Epic Link, Sprint 3 → Create → atver DIGI-13. Pēc tam Issue Type: Epic parāda Epic Name.',
'labs':'DIGI-13: labo virsrakstu un aprakstu, komentārs ar @Laura, 📎 Attach, + Sub-task (Edgars), 🔗 Link relates to DIGI-12; Paziņojumi.',
'skats':'DIGI-6 → Start Progress → Priority High, Due date 21.10.2026 → Edit: Label “mobilais”.',
'vesture':'DIGI-6 → Activity: All / History → komentārs ar @Edgars + pielikums → persona Edgars → Send to Review → atpakaļ Anna, History.',
'scrum-kanban':'Salīdzini Boards ▾ → DIGI dēlis un PASK Kanban dēlis.',
'delis':'DIGI dēlis: velc DIGI-9 uz In Progress, uzklikšķini kartītei (History), velc DIGI-5 uz Done.',
'progress':'PASK Kanban: velc PASK-6 uz In Progress (WIP Max 3 → sarkans), PASK-5 uz Done; DIGI Backlog: DIGI-10 → Sprint 3; Reports; Complete sprint; DIGI komandas dashboard → Sprint Health.',
'pauze':'Aptur ierakstu. Persona Anna. Ja vajag, “Atiestatīt datus”. Demo turi vienā cilnē.',
'jql':'Issues ▾ → Search for issues → Basic: Project DIGI, Status In Progress, Assignee Current User, Due Kavēti → Advanced → piemēru saites → “foo = bar” kļūda.',
'filtri':'JQL “duedate < now() AND resolution = Unresolved” → Save as “Mani kavētie” → Kavētie uzdevumi: maini JQL → Save → Details · Share: Project DIGI → Manage filters.',
'dashboard':'Dashboards ▾ → Create dashboard “Mana komanda” → Add gadget: Pie Chart (DIGI aktīvais sprints, Assignee), Filter Results (Mani kavētie), Sprint Health → Edit layout 3 → Share: Project DIGI → persona Edgars skatās.',
'plan-izveide':'Plans ▾ → Create plan → “IKT plāns 2027”, Open → avots → izņēmumi 30 dienas → Create → ⚙ Configure.',
'plan-skats':'Plans ▾ → Digitālo pakalpojumu plāns 2026 → ▾ sakļauj → velc DIGI-12 joslu → DIGI-7 Assignee Māris → klikšķis uz DIGI-12 (vecie datumi) → Back.',
'atkaribas':'⚠ warnings → Filter issues with warnings → cilne Dependencies → velc DIGI-10 pēc 13.11. (4 → 3) → + Dependency DIGI-5 blocks DIGI-4.',
'izmainas':'Persona Edgars → Review changes (Save nav pieejams) → Anna → Review changes → noņem vienu ķeksīti → Save selected changes in Jira → DIGI-10 History · Plan → Discard.',
'programma':'Plans ▾ → Create program → “Saeimas attīstības programma 2026”, No restrictions, abi plāni → Create → Configure · Connected plans.',
'sadarbiba':'DIGI-4: komentārs “@Laura …” → Paziņojumi → persona Laura: Start watching + Attach → Anna: Paziņojumi, History → Dashboard Activity Stream.',
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
H=['''<!doctype html><html lang="lv"><head><meta charset="utf-8"><title>Pasniedzēja piezīmes · 2. modulis</title>
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
<div class="cover"><div class="eyebrow">Saeimas Jira apmācība · 2. modulis</div><h1>Pasniedzēja piezīmes pa slaidiem</h1>
<div class="meta">Projektu/procesu pārvaldības iespējas Jira Data Center · 19.10.2026 · 9:00–11:35 · pauze 10:30–10:45<br>Katram slaidam: ko teikt, ko rādīt un kur klikšķināt demo vidē.</div></div>
<table class="map"><tr><th style="width:32%">Demo vides josla</th><th>Ko tā dara</th></tr>
<tr><td>Persona: Anna / Edgars / Laura</td><td><b>Anna</b> = projekta vadītāja un Plan administratore (var saglabāt plānu). <b>Edgars</b> = izstrādātājs (nevar saglabāt plānu). <b>Laura</b> = komunikācijas speciāliste.</td></tr>
<tr><td>Jira izvēlnes</td><td>Zilajā joslā <b>Dashboards, Projects, Issues, Boards, Plans</b> un poga <b>Create</b> (taustiņš c), meklētājs (taustiņš /).</td></tr>
<tr><td>Paziņojumi</td><td>Rāda e-pastus, ko Jira nosūtītu (piešķiršana, @pieminēšana, statuss, pielikums).</td></tr>
<tr><td>Scenārijs</td><td>Sānjosla ar soļiem katrai tēmai 2.2.1–2.2.9.</td></tr>
<tr><td>Atiestatīt datus</td><td>Atgriež sākuma datus (DIGI-1…12, PASK-1…8, 2 plāni, 2 dashboard).</td></tr></table>
''']
for i,sid,title,eb,notes in rows:
    if sid in sec_start: H.append('<div class="sec">'+html.escape(sec_start[sid])+'</div>')
    H.append('<div class="slide"><div class="top"><span class="num">'+str(i)+'</span><span class="time">'+TIME.get(sid,'')+'</span><span class="ttl">'+html.escape(title)+'</span></div>')
    if eb: H.append('<div class="eb">'+html.escape(eb)+'</div>')
    H.append(fmt_notes(notes) if notes else '<p class="empty">Nav piezīmju.</p>')
    if sid in DEMO: H.append('<div class="demo"><b>Demo vidē:</b> '+html.escape(DEMO[sid].replace('Demo vidē: ','').replace('Demo vidē ',''))+'</div>')
    H.append('</div>')
H.append('</body></html>')
open('piezimes2.html','w').write(''.join(H))
print(len(rows))
