# 1. modulis: demo scenārijs pasniedzējam

**Pakalpojumu pārvaldības iespējas Jira Service Management Data Center**
Laiks 10:00–11:40 (pauze 10:45–10:55) · 2 akadēmiskās stundas · auditorija: pakalpojumu pieteikumu apstrādātāji

Šis dokuments ir prezentācijas (`index.html`) pavadmateriāls. Prezentācijā katram slaidam ir runātāja piezīmes (taustiņš **N**). Šeit ir pilns scenārijs: ko sagatavot iepriekš, ko klikšķināt katrā blokā un ko teikt.

> **Svarīgi par precizitāti.** Portāli, pieteikumu tipi, formu lauki, IKT darbplūsmas statusi un pārejas ir ņemti no dokumenta “JIRA pakalpojumu portāls” (PDF). Rindu nosaukumi un projektu atslēgas (`IKT`, `SAIM`) ir **piemēri**. Pirms apmācības pārbaudiet tos savā vidē (skat. sadaļu “Pārbaudīt pirms apmācības”). Jira saskarnes pogu nosaukumi ir angliski, jo arī jūsu portālā saskarne ir angliska (“Raise this request on behalf of”, “Create”, “Cancel”).

---

## 1. Laika plāns un demo/teorijas proporcija

| Laiks | Bloks | Veids | Min |
|---|---|---|---|
| 10:00 | Ievads un mērķi | Teorija | 4 |
| 10:04 | 1.2.1 Pamatprincipi | Teorija | 8 |
| 10:12 | 1.2.2 Darbs ar Project | **Demo** | 8 |
| 10:20 | 1.2.3 Pieteikuma izveide un iesniegšana | **Demo** | 15 |
| 10:35 | 1.2.4 Darbs ar iesniegtiem pieteikumiem | **Demo** | 10 |
| 10:45 | *Pauze* | | 10 |
| 10:55 | 1.2.5 Darbs apstrādātāja lomā | **Demo** | 15 |
| 11:10 | 1.2.6 Saziņa un sadarbība | **Demo** | 10 |
| 11:20 | 1.2.7 Pārskati, filtri un dashboard | **Demo** | 13 |
| 11:33 | Kopsavilkums, jautājumi un atbildes | Q&A | 7 |

**Demo 71 min (79 %) · teorija + Q&A 19 min (21 %).** Prasība ir ≥ 70 % / ≤ 30 %, tāpēc ir ~8 minūšu rezerve jautājumiem.

Ja kavējaties:
- **> 3 min pirms pauzes:** 1.2.4 portāla daļu rādiet ātrāk, jo portāla pieteikuma skatu jau redzējāt 1.2.3.
- **> 3 min pēc pauzes:** īsinājumtaustiņu slaidu (1.2.5) un projekta Reports (1.2.7) tikai nosauciet.
- **Nekad neīsiniet** publiskā un iekšējā komentāra demonstrāciju (1.2.6). Tā ir svarīgākā drošības tēma.

---

## 2. Sagatavošana (dienu iepriekš)

### 2.1 Lietotāji un pārlūki
| Kas | Kam | Kur |
|---|---|---|
| **Aģenta konts** (jūs) | 1.2.2–1.2.7 aģenta puse | Pārlūks A, Jira |
| **Klienta konts** (testa darbinieks, piem. “Anna Bērziņa”) | Portāla puse 1.2.2–1.2.6 | Pārlūks B vai inkognito logs |
| **Otrs aģents / kolēģis** | Assign citam, @pieminēšana | Tikai jāeksistē sistēmā |
| **Otrs klients** | Share / Request participant | Tikai jāeksistē sistēmā |

Abus logus novietojiet blakus vai pārslēdzieties ar `Alt+Tab`. Ekrāna mērogs 125–150 %.

### 2.2 Testa dati (izveidot iepriekš testa projektā vai ar testa marķējumu)
Izveidojiet vismaz šos pieteikumus, lai rindām, filtriem un dashboard būtu saturs:

| # | Projekts | Pieteikuma tips | Kopsavilkums (piemērs) | Statuss | Piešķirts |
|---|---|---|---|---|---|
| 1 | IKT | Datortehnikas darbības traucējumi | Printeris 3. stāvā drukā svītrainas lapas | Reģistrēts | — |
| 2 | IKT | Jaunas datortehnikas pieteikums | Klēpjdators jaunajam padomniekam | Izpildē | kolēģis |
| 3 | IKT | Jaunas grupas e-pasta adreses izveide | Kopējs e-pasts komisijai | Reģistrēts | — |
| 4 | IKT | Programmnodrošinājuma darbības traucējumi | Excel avarē, atverot lielu failu | Atlikts | jūs |
| 5 | IKT | Piekļuves tiesību piešķiršana … mapēm | Piekļuve nodaļas kopīgotajai mapei | Slēgts (Izpildīts) | jūs |
| 6 | SAIM | Darba vietas pārvietošana | Darba vietas pārvietošana: 214 → 305 | Izpildē | kolēģis |
| 7 | IKT | (jebkurš) | Pieteikums ar pārsniegtu SLA | Reģistrēts | — |
| 8 | IKT | (jebkurš) | Pieteikums bez izmaiņām > 7 dienas | Ārpakalpojumā | kolēģis |

Sagatavojiet arī: vienu PDF (piem., kabineta plānu) un vienu ekrānuzņēmumu, ko pievienot kā pielikumu.

### 2.3 Rezerves materiāli
- **Mācību demo vide** `demo/index.html`. Ja testa Jira nav pieejama vai kaut kas aizķeras, visu scenāriju var izspēlēt tajā. Augšā ar pārslēgu maina klienta un aģenta skatu. Poga “Paziņojumi” rāda, kurš saņemtu e-pastu, piem., ka iekšējs komentārs klientam netiek sūtīts. Sānjoslā “Scenārijs” ir šī dokumenta soļi ar atzīmēm.
- Saglabāts filtrs “Mani atvērtie” un gatavs dashboard “IKT atbalsts · Rezerve”, ja dzīvā demo laikā kaut kas aizķeras.
- Ekrānuzņēmums ar e-pasta paziņojumu, ko saņem @pieminētais kolēģis (ja dzīvais e-pasts zālē nav parādāms).

### 2.4 Pārbaudīt pirms apmācības
- [ ] Precīzās projektu atslēgas (vai tiešām `IKT`, `SAIM`?). Aizstājiet tās JQL piemēros.
- [ ] Precīzie statusu un pāreju pogu nosaukumi IKT un Saimnieciskajā projektā (atveriet pieteikumu un pierakstiet pogas).
- [ ] Rindu (queues) nosaukumi jūsu projektā.
- [ ] Vai SLA apstājas statusos Atlikts un Ārpakalpojumā? Kāds ir pogas nosaukums pārejai Reģistrēts → Izpildē?
- [ ] Vai Saimnieciskā nodrošinājuma projektā ir tā pati darbplūsma kā IKT?
- [ ] Vai ir ieslēgts e-pasta kanāls (atbilde uz e-pastu kļūst par komentāru)?
- [ ] Vai aģentiem ir tiesības mainīt Request type / pārvietot pieteikumu (Move)?
- [ ] Vai filtrus drīkst koplietot ar grupām (Edit permissions)?
- [ ] Vai ir apmierinātības vērtējums (Customer satisfaction) pēc atrisināšanas?
- [ ] Vai projektam ir Knowledge base?
- [ ] Īsinājumtaustiņi strādā jūsu Jira versijā un pārlūkā.

---

## 3. Scenārijs pa blokiem

Apzīmējumi: **[K]** klienta logs (portāls), **[A]** aģenta logs (Jira).

### 10:00 · Ievads un mērķi (4 min, teorija) · slaidi 1–3
- Iepazīšanās: “Kurš jau ir iesniedzis pieteikumu portālā? Kurš ir apstrādājis pieteikumu Jira?”
- Plāns: pirmā daļa ir klienta puse, otrā ir apstrādātāja puse.
- Seši mērķi (slaids 3). Beigās pie tiem atgriezīsimies.
- Ārpus tvēruma: administrēšana (formas, statusi, SLA, tiesības).

### 10:04 · 1.2.1 Pamatprincipi (8 min, teorija) · slaidi 4–8
**Galvenā doma:** viens pieteikums, divi skati.
- *Portāls* (klients) un *Jira* (aģents). Klients neredz iekšējās piezīmes.
- *Lomas:* Customer, Agent (jūs), Collaborator (var komentēt iekšēji), Request participant (pieteikums kopīgots ar viņu).
- *Hierarhija:* Portāls → Project → Request type → forma un darbplūsma.
- *Request type ≠ Issue type.*
- *Dzīves cikls (jūsu IKT plūsma):* Reģistrēts → Izpildē → Slēgts (pogas Izpildīts / Uzstādīt tehniku / Pagaidu risinājums). No Izpildē arī Atlikt → Atlikts un Nodots ārpakalpojumā → Ārpakalpojumā; no tiem atpakaļ uz Izpildē.

**Piemērs zālei:** “Kolēģis raksta ‘nestrādā printeris’. IKT speciālists iekšēji atzīmē ‘jāpasūta toneris’, bet klientam atbild ‘toneris pasūtīts, nomaiņa līdz ceturtdienai’.”

### 10:12 · 1.2.2 Darbs ar Project (8 min, demo) · slaidi 9–12
1. **[K]** Atveriet portāla sākumlapu (`…/servicedesk/customer/portals`).
2. **[K]** Meklēšanā ierakstiet “dators”: rezultāti no IKT. Tad “pārvietošana”: rezultāts no Saimnieciskā nodrošinājuma.
3. **[K]** Atveriet kartīti **IKT pakalpojumu atbalsts**. Parādiet tipu sarakstu ar aprakstiem. Nolasiet vienu aprakstu.
4. **[K]** Ar breadcrumb atgriezieties un atveriet **Saimnieciskā nodrošinājuma pakalpojumi**.
5. **[A]** `Projects` → `View all projects`. Parādiet projekta tipu “Service management”. Atzīmējiet ar zvaigznīti.
6. **[A]** Atveriet projektu. Parādiet sānjoslu: `Queues`, `Raise a request`, `Customers`, `Reports`, `Knowledge base`.
7. **Interaktīvi (slaids 12):** nosauciet situāciju, zāle izvēlas tipu.
   - “Printeris drukā svītrainas lapas” → Datortehnikas darbības traucējumi
   - “Jaunajam padomniekam no pirmdienas vajag datoru un e-pastu” → **divi** pieteikumi (viens pieteikums = viena vajadzība)
   - “Jāpārceļ galds un dators uz citu kabinetu” → Darba vietas pārvietošana

### 10:20 · 1.2.3 Pieteikuma izveide un iesniegšana (15 min, demo) · slaidi 13–17
**Demo 1: Darba vietas pārvietošana [K] (5 min)**
1. Portāls → Saimnieciskā nodrošinājuma pakalpojumi → **Darba vietas pārvietošana**.
2. Spiediet `Create` ar tukšu formu. Parādiet kļūdas pie obligātajiem laukiem.
3. Aizpildiet:
   - *Apraksts:* “Juridiskā biroja 2 darbinieku darba vietu pārvietošana sakarā ar nodaļas reorganizāciju. Pārvietot galdus, krēslus un 2 datorus.”
   - *No ēkas / kabineta:* izvēle / 214 · *Uz ēku / kabinetu:* izvēle / 305
   - *Vēlamais izpildes termiņš:* nākamā piektdiena
4. Ievelciet kabineta plāna PDF.
5. `Create` → parādiet apstiprinājumu un **pieteikuma atslēgu**. Zāle to pieraksta.

**Demo 2: Datortehnikas darbības traucējumi [K] (5 min)**
1. Portāls → IKT pakalpojumu atbalsts → **Datortehnikas darbības traucējumi**.
2. Parādiet lauku “Lietotājs” (Search for a user).
3. Aprakstā ielīmējiet ekrānuzņēmumu ar `Win+Shift+S` → `Ctrl+V`.
4. Salīdziniet sliktu un labu aprakstu (slaids 16): *kas, kur, kopš kad, ko jau mēģinājāt, cik steidzami*.
5. `Create` → pierakstiet atslēgu.

**Demo 3: Raise a request klienta vārdā [A] (3 min)**
1. IKT projekts → `Raise a request` → Datortehnikas darbības traucējumi.
2. *Raise this request on behalf of:* klienta konts (piem., Anna Bērziņa).
3. *Apraksts:* “Sarkanajā zālē projektors nerāda attēlu no klēpjdatora. Sēde 15:00.”
4. `Create` → parādiet, ka **Reporter** ir klients.
5. **[K]** `Requests` → pieteikums redzams klienta portālā.

**Ja paliek laiks (2 min):** augšējā `Create` poga. Parādiet lauku *Customer Request Type*: ja tas ir tukšs, klients pieteikumu portālā neredz un nesaņem paziņojumus.

### 10:35 · 1.2.4 Darbs ar iesniegtiem pieteikumiem (10 min, demo) · slaidi 18–20
**Klienta puse [K] (5 min)**
1. `Requests` → `My requests`. Parādiet filtrus (Open / Closed / All, kur esat dalībnieks) un teksta meklēšanu.
2. Atveriet “Darba vietas pārvietošana”: statuss, aktivitātes, sākotnējā forma.
3. `Add comment`: “Papildinu: pārvietot arī 1 printeri.” + pielikums.
4. `Share` → pievienojiet otro klientu. Viņš redz pieteikumu un saņem paziņojumus.
5. `Don’t notify me` / `Notify me`.

**Aģenta puse [A] (5 min)**
1. Projekts → `Queues`. Parādiet skaitītājus.
2. Atrodiet tikko izveidotos pieteikumus nepiešķirto rindā.
3. Paskaidrojiet SLA kolonnas (*Time to first response*, *Time to resolution*): sarkans nozīmē pārsniegtu termiņu, “pauzēts” nozīmē, ka gaida klientu.
4. Atveriet pieteikumu: klienta komentārs un pielikums ir aktivitātēs.
5. Augšējā meklēšanā ievadiet atslēgu (piem., `IKT-311`) → Enter.

### 10:45 · Pauze (10 min) · slaids 21
Pārbaudiet testa datus. Atveriet `Dashboards` → `Manage dashboards`.

### 10:55 · 1.2.5 Darbs apstrādātāja lomā (15 min, demo) · slaidi 22–25
**Anatomija [A] (3 min):** atslēga un kopsavilkums → darbību pogas → apraksts un lauki → komentāri → labā kolonna (SLA, People, Dates). `Activity` → `History`: kurš ko mainīja un kad.

**Pilns cikls ar Demo 3 pieteikumu (projektors) [A]+[K] (9 min)**
1. **Pārskatīt:** vai tips ir pareizs? Parādiet, kā mainīt Request type (ja ir tiesības). Ja nav, rakstiet iekšēju piezīmi atbildīgajam.
2. **Piešķirt:** `Assign to me`. Tad `Assign` → kolēģim → atpakaļ sev.
3. **Izpildē:** statusa poga “Reģistrēts ▾” → pāreja uz IZPILDĒ. Ja atveras ekrāns ar laukiem, aizpildiet.
4. **Jautājums klientam:** `Respond to customer` → “Lūdzu, norādiet klēpjdatora inventāra numuru un kuru pieslēgumu (HDMI/USB-C) izmantojat.” → ja atbilde vai detaļa jāgaida ilgāk: “Atlikt” (→ ATLIKTS); ja darbu veic piegādātājs: “Nodots ārpakalpojumā” (→ ĀRPAKALPOJUMĀ). Pēc tam atpakaļ uz IZPILDĒ.
5. **[K]** Atbildiet portālā. **[A]** Parādiet, ka statuss mainījies (ja ir automatizācija).
6. **Slēgt:** statusa poga “Izpildē ▾” → “Izpildīts” (vai “Uzstādīt tehniku” / “Pagaidu risinājums”) → komentārs klientam:
   > “Projektoram bija atvienots HDMI pārveidotājs. Pievienojām no jauna un pārbaudījām ar jūsu klēpjdatoru. Ja problēma atkārtojas, atbildiet uz šo pieteikumu.”
7. **[K]** Slēgts pieteikums klienta skatā (un apmierinātības vērtējums, ja ir).

**Īsinājumtaustiņi (2 min):** `i` (piešķirt sev), `a` (piešķirt), `m` (komentēt), `.` (darbības, ierakstiet “resolve”), `/` (meklēt), `g d` (dashboard), `g i` (issue meklēšana), `?` (visi taustiņi).

### 11:10 · 1.2.6 Saziņa un sadarbība (10 min, demo) · slaidi 26–28
1. **Publisks komentārs [A]:** `Respond to customer` → “Labdien! Projektora pārveidotājs ir nomainīts. Lūdzu, pārbaudiet pirms sēdes.” → **[K]** redzams.
2. **Iekšējs komentārs [A]:** `Internal comment` → “@Māris Liepa, vai noliktavā ir vēl viens HDMI–USB-C pārveidotājs?” → **[K]** **nav redzams**. Rādiet lēnām, tas ir galvenais moments.
3. Parādiet, kā Jira vizuāli atšķir iekšējo komentāru.
4. **@pieminēšana:** ierakstiet `@` + vārdu, parādiet ieteikumu sarakstu. Parādiet e-pastu, ko saņem kolēģis (vai ekrānuzņēmumu).
5. **Pielikumi:** ievelciet failu; tas parādās sadaļā `Attachments`. Pielikums pie publiska komentāra ir redzams klientam.
6. **Watch:** acs ikona un skaitītājs.
7. **Request participants:** pievienojiet klientu labajā kolonnā.

**Nekad nerakstiet publiski:** piegādātāju cenas, kolēģu vērtējumus, paroles, citu darbinieku personas datus, IP adreses un iekšējo sistēmu nosaukumus.

### 11:20 · 1.2.7 Pārskati, filtri un dashboard (13 min, demo) · slaidi 29–33
**Meklēšana [A] (4 min)**
1. `Issues` → `Search for issues`.
2. **Basic:** Project = IKT, Assignee = Current user, Status.
3. `Advanced`: Basic izvēle pārvēršas JQL.
4. Ievadiet vaicājumu “Aizķērušies” (sk. 4. sadaļu). Parādiet automātiskos ieteikumus.
5. `Columns`, List view / Detail view, `Export` → CSV.

**Saglabāts filtrs (3 min)**
1. `Save as` → “IKT · Aizķērušies”.
2. Zvaigznīte (Favourite) → redzams `Issues` izvēlnē.
3. `Details` → `Edit permissions` (koplietošana) · `New subscription` (piem., darba dienās 8:30).
4. Saglabājiet arī “IKT · Nepiešķirtie” un “IKT · Visi atvērtie”.

**Dashboard (5 min)**
1. `Dashboards` → `Manage dashboards` → `Create new dashboard` → “IKT atbalsts · Šodien”.
2. `Add gadget`:
   - **Filter Results** → “IKT · Nepiešķirtie”
   - **Issue Statistics** vai **Pie Chart** → “IKT · Visi atvērtie”, statistika pēc *Assignee*
   - **Created vs. Resolved Chart** → projekts IKT, 30 dienas
   - *(ja ir laiks)* **Two Dimensional Filter Statistics** (Request type × Status), **Assigned to Me**
3. `Edit layout` → 2 kolonnas, pārvelciet gadgetu.
4. Koplietošana un iestatīšana par sākuma lapu.

**Projekta Reports (1 min):** sānjosla → `Reports` → Workload, SLA pārskats. Ja kavējaties, tikai nosauciet.

### 11:33 · Kopsavilkums un Q&A (7 min) · slaidi 34–35
- Kopsavilkuma tabulā katrai rindai jautājiet: “Vai varat to izdarīt paši?”
- Ja jautājumu nav: “Kāds ir jūsu biežākais pieteikums? Parādīsim, kurā tipā to likt.” Parādiet dzīvajā sistēmā.
- Biežākie jautājumi:
  - *“Kāpēc neredzu pieteikumu?”* Pārbaudiet projektu, filtru un vai tas jau nav atrisināts.
  - *“Kļūdījos tipā.”* Mainiet Request type vai uzrakstiet iekšēju piezīmi atbildīgajam.
  - *“Klients neatbild.”* Atgādiniet komentārā un ievērojiet projekta noteikumus.
- Noslēgums: izdales materiāls (4. sadaļa), 2. modulis tiks paziņots atsevišķi.

---

## 4. Izdales materiāls: JQL vaicājumi

Aizstājiet `IKT` / `SAIM` ar faktiskajām projektu atslēgām. Lauka `"Customer Request Type"` vērtību izvēlieties no JQL automātiskajiem ieteikumiem.

```sql
-- Mani atvērtie
assignee = currentUser() AND resolution = Unresolved ORDER BY updated DESC

-- Nepiešķirtie IKT pieteikumi
project = IKT AND assignee is EMPTY AND resolution = Unresolved

-- Mani iesniegtie
reporter = currentUser() ORDER BY created DESC

-- Aizķērušies (7 dienas bez izmaiņām)
project in (IKT, SAIM) AND resolution = Unresolved AND updated <= -7d

-- SLA pārsniegts
project = IKT AND "Time to resolution" = breached()

-- Konkrēts pieteikuma tips šomēnes
"Customer Request Type" = "…" AND created >= startOfMonth()

-- Slēgti pēdējās 7 dienās
project = IKT AND resolved >= -7d ORDER BY resolved DESC
```

## 5. Izdales materiāls: īsinājumtaustiņi

| Taustiņš | Darbība |
|---|---|
| `i` | Piešķirt sev |
| `a` | Piešķirt |
| `m` | Komentēt |
| `.` | Darbību izvēlne |
| `/` | Meklēšana |
| `c` | Create |
| `g` `d` | Uz dashboard |
| `g` `i` | Uz pieteikumu meklēšanu |
| `j` / `k` | Nākamais / iepriekšējais sarakstā |
| `?` | Visi īsinājumtaustiņi |

Taustiņi nestrādā, kamēr kursors ir teksta laukā.
