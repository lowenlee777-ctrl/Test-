# CLAUDE.md — LAST SIGNAL

Guidance for Claude when working in this project. Read this first in every session.

---

## 1. Project Overview

**LAST SIGNAL** (working title) is a web-based, side-scrolling **lane-push tower defense** science game.
The last living human, **P**, rebuilds a team of **Echoes** from the data of the dead and fights the villain **Dr. Vael Null** stage by stage.

- **Battles** work like The Battle Cats: the player's **Ark** on the left, the enemy **Spire** on the right, units walk down one lane.
- **Science is the energy source:** `ENERGY` (in-stage money) refills **only by answering science quizzes** during battle.
- **Echoes** are collected through a cinematic gacha (the **Genesis Pod**) and arranged into a deck of up to 8.
- Core loop: **battle → earn → summon → grow → battle harder**.

> **For full details — world, stages, battle rules, roles, rarities, gacha rates, economy, Phaser scene map and Supabase tables — read [`../GAME_DESIGN.md`](../GAME_DESIGN.md).** Always read the relevant section before starting work on a feature.

---

## 2. Tech Stack

- **Phaser 3** game framework on top of plain **HTML, CSS and JavaScript**.
  - Loaded from a CDN with a pinned version — no npm, no build tools, no bundlers:
    ```html
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js"></script>
    ```
  - Use the **WebGL** renderer (needed for glow/bloom FX in the summon scene).
  - Every screen is a Phaser **Scene** (see the scene map below).
  - Game code uses **ES modules** (`<script type="module">`, `import` / `export`).
- Run locally with **VS Code Live Server** at `http://127.0.0.1:5500` (ES modules and JSON loading do not work from `file://`).
- **Vercel** hosts the game as a static site (preview deployment per branch).
- **Supabase** for accounts and all player data (added later).
  - Load `supabase-js v2` from jsDelivr as an ES module:
    ```js
    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
    ```
  - Use only the **Project URL** and the **publishable (anon) key** in the client.
  - **Never** put the Supabase service role / secret key in the code.
  - The browser **never writes currencies or the roster directly**: summons, stage rewards and upgrades go through Supabase RPC / Edge Functions (GAME_DESIGN.md §12).
- **Balance numbers live in JSON files** in `data/`, not in code.

### Scene map

| Scene | Covers | Status |
| --- | --- | --- |
| `BootScene` | Loads assets and JSON data, loading bar | Started (placeholder) |
| `TitleScene` | Title screen, save check | Started (placeholder) |
| `WorldMapScene` | Chapters, stage select, stars, enemy scouting | Not started |
| `DeckScene` | Roster, deck slots, Bonds, Deck Power | Not started |
| `BattleScene` | Lane, bases, units, combat, P Cannon | Not started |
| `BattleUIScene` | Energy bar, quiz overlay, unit cards; runs on top of `BattleScene` | Not started |
| `SummonScene` | Genesis Pod reveal sequence | Not started |
| `GrowthScene` | Level, Ascension, Skill, Memory Files, Ark Research | Not started |

---

## 3. Rules for Working With Me

1. **One step at a time.** Only do what I ask in the current message. Do not add extra features, refactors, or files I did not ask for.
2. **Plan before editing.** Before changing files, tell me which files you will change and why. Wait if the change is large.
3. **Keep code student-friendly.** Write simple, readable code. Avoid clever tricks. When you add new code, explain in plain language what each part does.
4. **Never leak secrets.** The Supabase secret key never goes in client code. Only the Project URL and the publishable (anon) key are allowed in the browser.

---

## 4. Folder Structure

```
Science game project/
├── GAME_DESIGN.md             ← full game design doc (read first)
└── lumina/                    ← game folder (old name, kept for now)
    ├── CLAUDE.md              ← this file
    ├── index.html             ← loads Phaser + js/game.js
    ├── style.css              ← page styles and HTML overlay menus
    ├── js/
    │   ├── game.js            ← Phaser config, starts the game
    │   └── scenes/
    │       ├── BootScene.js   ← loading
    │       └── TitleScene.js  ← title screen
    ├── data/
    │   └── questions.json     ← science quiz questions
    └── assets/                ← sprites, atlases, audio
```

`data/questions.json` still uses the old island/element format. It must be converted to the quiz format in GAME_DESIGN.md §5/§12 (`difficulty`: easy/normal/hard, `topic`, `chapter`) before the quiz refill uses it.

---

## 5. Current Progress

### Done
- Game design rewritten as **LAST SIGNAL** in `GAME_DESIGN.md`.
- Phaser 3 added: `index.html` → `js/game.js` → `BootScene` → `TitleScene` (placeholder title screen).

### Next Up
- Write the first JSON data files (Echoes, enemies, one stage).
- Build `BattleScene` basics: lane, Ark and Spire with HP, one unit walking.
- Build `BattleUIScene`: energy bar and quiz refill.
- Convert `questions.json` to the new quiz format.

> **Update this section every time we finish something.**
