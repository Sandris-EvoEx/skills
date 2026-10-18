# Saeimas Jira apmācība · 2. modulis

**Projektu/procesu pārvaldības iespējas Jira Data Center.** 19.10.2026, 9:00–11:35, pauze 10:30–10:45 (3 akadēmiskās stundas).

| Kas | Kur |
| --- | --- |
| Prezentācija (Claude Slides, 41 slaids ar piezīmēm) | https://claude.ai/artifact/VhEsSuaDsrycVSXAYcLMsD |
| Demo vide (Jira Software DC kopija) | https://claude.ai/artifact/E5VB6pSNrwvj5NTQtbB3Lc |
| Demo vides avots | `demo/index.html` (atveras arī lokāli pārlūkā) |
| Pasniedzēja piezīmes PDF | `PASNIEDZEJA-PIEZIMES.pdf` |
| Demo scenārijs | `DEMO-SCENARIJS.md` |
| PDF ģenerators | `tools/mkpdf2.py` |

## Tēmas

2.2.1 pamatprincipi · 2.2.2 savs Project · 2.2.3 uzdevuma izveide · 2.2.4 esoši uzdevumi · 2.2.5 Scrum/Kanban dēlis · 2.2.6 meklēšana un filtri · 2.2.7 dashboard · 2.2.8 Plan un Program · 2.2.9 sadarbība · video ieraksts iekšējai lietošanai.

## Demo vide

- Viens HTML fails, bez servera. Dati glabājas pārlūka `localStorage` (atslēga `jira-dc-demo-m2-v1`).
- Personas: Anna (projekta vadītāja, var saglabāt plānu), Edgars, Laura.
- Projekti: DIGI (Scrum, 3 sprinti), PASK (Kanban ar WIP limitu 3).
- Plāni: "Digitālo pakalpojumu plāns 2026" (4 brīdinājumi sākumā), "Pasākumu plāns 2026".
- "Atiestatīt datus" atgriež sākuma stāvokli.

Plan, Program un brīdinājumu uzvedība veidota pēc Atlassian dokumentācijas (Advanced Roadmaps / Plans, Jira Software Data Center). Īstajā iestādes Jira statusu, lauku un izvēlņu nosaukumi var atšķirties.

## Būvēšana

```bash
# demo publicēšanai: no demo/index.html izņem <head> meta un ieliek dist/demo.html
python3 - <<'EOF'
import re
s=open('demo/index.html').read()
head=re.search(r'<head>(.*?)</head>',s,re.S).group(1); head=re.sub(r'<meta[^>]*>\s*','',head)
body=re.search(r'<body>(.*)</body>',s,re.S).group(1)
open('dist/demo.html','w').write(head.strip()+'\n'+body.strip()+'\n')
EOF
```
