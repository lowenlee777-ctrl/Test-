# CLAUDE.md — Lumina Project

Guidance for Claude when working in this project. Read this first in every session.

---

## 1. Project Overview

**Lumina** is a web-based science quiz RPG for students, inspired by Prodigy Math.
Players explore themed islands, battle corrupted monsters, and purify each island by answering science questions. Each island maps to a grade range (K-2, 3-5, 6-8, 9-12) so the game grows with the player. The hero is **Atlas Vox**, guided by a spectral owl mentor **Professor Lumen ("Sage")**. The villain is **Lord Entropos**, whose true form is **Veilmaster Noctis**, fought in the hidden final island (**Null Keep**).

> **For full details — characters, islands, monster roster, combat formulas, Build Plan, and Next Steps — read [`docs/GAME_DESIGN.md`](docs/GAME_DESIGN.md).** Always read it before starting work on a feature.

---

## 2. Tech Stack

- **HTML, CSS, and vanilla JavaScript only.** No frameworks (no React, Vue, etc.), no npm, no build tools, no bundlers.
- Run locally with **VS Code Live Server** at `http://127.0.0.1:5500`.
- **Supabase** will be added later for login and cloud saves.
  - Load `supabase-js v2` from jsDelivr as an ES module:
    ```html
    <script type="module">
      import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
    </script>
    ```
  - Use only the **Project URL** and the **publishable (anon) key** in the client.
  - **Never** put the Supabase service role / secret key in the code.

---

## 3. Rules for Working With Me

1. **One step at a time.** Only do what I ask in the current message. Do not add extra features, refactors, or files I did not ask for.
2. **Plan before editing.** Before changing files, tell me which files you will change and why. Wait if the change is large.
3. **Keep code student-friendly.** Write simple, readable code. Avoid clever tricks. When you add new code, explain in plain language what each part does.
4. **Never leak secrets.** The Supabase secret key never goes in client code. Only the Project URL and the publishable (anon) key are allowed in the browser.

---

## 4. Folder Structure

```
lumina/
├── CLAUDE.md              ← this file
├── index.html             ← main HTML entry point
├── style.css              ← all styles
├── docs/
│   └── GAME_DESIGN.md     ← full game design doc (read first)
├── js/
│   ├── main.js            ← screen navigation and bootstrap
│   ├── quiz.js            ← load and render questions
│   ├── battle.js          ← battle loop (question → attack → turn)
│   └── player.js          ← Atlas Vox stats, EXP, leveling
├── data/
│   ├── questions.json     ← questions per island/element
│   └── monsters.json      ← monster roster with stats
└── assets/                ← images, sounds, sprites
```

---

## 5. Current Progress

### Done
- Game concept, world, characters, and monster roster designed in `docs/GAME_DESIGN.md`.
- Folder structure scaffolded (`index.html`, `style.css`, `js/`, `data/`, `assets/`).
- Starter files created with placeholder code for title screen → island map → battle screen flow.
- Sample `questions.json` and `monsters.json` with a few entries per island.

### In Progress
- Nothing active. Waiting for the next instruction.

### Done (continued)
- Core battle mechanic implemented: **5 chances, 3 correct = monster purified**.
  - Random monster picked from `monsters.json` (Wiltling / Dusklet / Thornling / Rotbloom).
  - 5 random questions drawn from the Dawnbloom pool each battle.
  - 5 attempt-dot tracker (green = correct, red = wrong).
  - Win fires as soon as the 3rd correct answer lands; lose fires after all 5 are used.
  - Result screen with "Try Again" to start a fresh battle.

### Next Up (from Version 1 / MVP in GAME_DESIGN.md)
- Add EXP and leveling (player.js).
- Add saving with `localStorage`.
- Write Sage's tutorial dialogue for Dawnbloom.
- Build a proper island map / title screen flow.

> **Update this section every time we finish something.**
