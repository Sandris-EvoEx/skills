# Jira Service Management · 1. modulis (Saeima)

Apmācību prezentācija “Pakalpojumu pārvaldības iespējas Jira Service Management Data Center” pakalpojumu pieteikumu apstrādātājiem. Laiks 10:00–11:40, pauze 10:45–10:55.

| Fails | Kas tas ir |
|---|---|
| `index.html` | Gatavā prezentācija (35 slaidi). Atveriet pārlūkā, darbojas bez interneta, izņemot fontus. |
| `DEMO-SCENARIJS.md` | Pasniedzēja scenārijs: sagatavošana, testa dati, klikšķi pa blokiem, JQL un īsinājumtaustiņu izdales materiāls. |
| `src/deck.template.html` | Prezentācijas avots (rediģējiet šo). |
| `assets/*.jpg` | Izgriezumi no dokumenta “JIRA pakalpojumu portāls” ekrānuzņēmuma. |
| `build.py` | Ievieto attēlus un būvē `index.html` un `dist/deck.html`. |

## Vadība

| Taustiņš | Darbība |
|---|---|
| `→` / `Space` / `PageDown` | Nākamais slaids |
| `←` / `PageUp` | Iepriekšējais slaids |
| `N` | Runātāja piezīmes (ko teikt, ko rādīt, piemēri) |
| `O` | Visu slaidu pārskats |
| `F` | Pilnekrāns |

Apakšējā joslā redzams **Plāns / Tagad**: katra slaida plānotais laiks salīdzinājumā ar pulksteni. Zaļš nozīmē, ka esat laikā, sarkans nozīmē, ka kavējaties vairāk nekā 3 minūtes.

**PDF:** atveriet `index.html` pārlūkā Chrome → Print → Save as PDF. Katrs slaids tiek drukāts uz savas lapas.

## Izmaiņas

```bash
python3 build.py   # pēc izmaiņām src/deck.template.html
```
