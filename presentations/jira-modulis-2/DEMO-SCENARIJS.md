# 2. moduļa demo scenārijs

Demo vide: https://claude.ai/artifact/E5VB6pSNrwvj5NTQtbB3Lc. Pirms sākuma nospied **Atiestatīt datus**, persona **Anna**. Turi demo vienā pārlūka cilnē.

## Sākuma dati

| Atslēga | Kas | Kāpēc noderīgs |
| --- | --- | --- |
| DIGI-1 | Epic "Jaunā iekštīkla portāla ieviešana" | hierarhija, Issues in epic |
| DIGI-4 | Story, In Progress, Edgars, 2 sub-tasks, pielikums | uzdevuma lapas anatomija |
| DIGI-6 | Bug, termiņš 16.10.2026 (pagājis) | kavēts, Start Progress, History |
| DIGI-7 | Story, Sprint 2, beidzas 31.12. | 2 Plan brīdinājumi |
| DIGI-10 / DIGI-11 | DIGI-11 blocks DIGI-10 | atkarība "off track" |
| PASK-3, 7, 8 | In Progress (3 no Max 3) | WIP limits, velc PASK-6 |
| Filtri | "DIGI aktīvais sprints", "Kavētie uzdevumi" | dashboard gadžeti |

## Soļi pa tēmām

**2.2.1** Projects → View all projects; DIGI-1 → Issues in epic; DIGI-4 → View workflow; persona Anna ↔ Edgars.

**2.2.2** Projects → Digitālo pakalpojumu attīstība → Backlog, Issues; meklētājā `DIGI-4`; Issues → My open issues; dēlī Only My Issues, avatars, Kavētie.

**2.2.3** Create (vai `c`) → Create ar tukšu formu (kļūda) → Summary, Description, Assignee Laura, Priority High, Due 06.11.2026, Labels `iekštīkls`, Epic Link, Sprint 3, pielikums → Create (DIGI-13) → komentārs ar `@Laura`, Attach, + Sub-task, Link. Issue Type Epic → obligāts Epic Name.

**2.2.4** DIGI-6 → Start Progress → Priority, Due date → Edit (Label) → komentārs ar `@Edgars` → persona Edgars → Send to Review → Anna → Activity → History. Darba laiks: DIGI-4 → **More ▾ → Log work** → Time Spent `2h 30m`, Remaining Estimate "Adjust automatically", Work Description → Log → cilne **Work Log** un labajā pusē **Time Tracking** (Estimated / Remaining / Logged).

**2.2.5** DIGI dēlis: velc DIGI-9 uz In Progress, DIGI-5 uz Done. PASK Kanban: velc PASK-6 uz In Progress (kolonna sarkana). Backlog: DIGI-10 → DIGI Sprint 3. Reports. Complete sprint (demo neslēdz). Dashboard → Sprint Health.

**Pauze** – aptur ierakstu.

**2.2.6** Issues → Search: Basic (Project, Status, Assignee, Due, teksts) → Advanced → piemēri → `foo = bar` kļūda → `duedate < now() AND resolution = Unresolved` → Save as "Mani kavētie" ★ → "Kavētie uzdevumi" maini JQL → Save → Details · Share → Manage filters.

**2.2.7** Dashboards → Create "Mana komanda" → Add gadget: Pie Chart (DIGI aktīvais sprints, Assignee), Filter Results (Mani kavētie), Sprint Health → Edit layout 3 → ⇄ ⚙ ✕ → Share: Project DIGI → persona Edgars redz, nevar labot.

**2.2.8** Plans → Create plan ("IKT plāns 2027", avots, izņēmumi) → Digitālo pakalpojumu plāns 2026 → ▾ hierarhija → velc DIGI-12 joslu → DIGI-7 Assignee Māris → ⚠ 4 warnings → Filter issues with warnings → Dependencies → velc DIGI-10 pēc 13.11. (4 → 3) → + Dependency DIGI-5 blocks DIGI-4 → persona Edgars: Review changes (Save nav pieejams) → Anna: Save selected changes in Jira → DIGI-10 History "Plan" → Create program (abi plāni) → Configure · Connected plans.

**2.2.9** DIGI-4: komentārs `@Laura` → Paziņojumi → persona Laura: Start watching, Attach → Anna: Paziņojumi, History → Activity Stream.

## Ko teikt par atšķirībām

- Statusi demo: To Do, In Progress, In Review, Done. Jūsu projektā var būt citi; krāsu kategorijas paliek.
- Plan pieejamību un saglabāšanas tiesības nosaka licence un Jira administrators.
- Īstā Jira sūta e-pastus; demo tos rāda pogā "Paziņojumi".
- JQL īstajā Jira ir ar automātiskajiem ieteikumiem.
