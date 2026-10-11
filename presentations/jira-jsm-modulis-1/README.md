# Jira Service Management · 1. modulis (Saeima)

Apmācību prezentācija “Pakalpojumu pārvaldības iespējas Jira Service Management Data Center” pakalpojumu pieteikumu apstrādātājiem. Laiks 10:00–11:40, pauze 10:45–10:55.

| Fails | Kas tas ir |
|---|---|
| `index.html` | Gatavā prezentācija (35 slaidi). Atveriet pārlūkā, darbojas bez interneta, izņemot fontus. |
| `demo/index.html` | Interaktīva mācību smilškaste: Saeimas portāla klienta skats + Jira aģenta skats (rindas, piešķiršana, statusi, publiski un iekšēji komentāri, @pieminēšana, simulēti e-pasta paziņojumi, filtri, JQL, dashboard, Reports). Darbojas bez interneta; dati glabājas pārlūkā, poga “Atiestatīt datus” sāk no jauna. |
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

Slaidos nav laika un numura. Plānotais sākuma laiks un slaida numurs ir redzami tikai runātāja piezīmēs (**N**).

**PDF:** atveriet `index.html` pārlūkā Chrome → Print → Save as PDF. Katrs slaids tiek drukāts uz savas lapas.

## Izmaiņas

```bash
python3 build.py   # pēc izmaiņām src/deck.template.html
```
