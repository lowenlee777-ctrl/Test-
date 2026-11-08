# Lumina — Science Game Design Document


## World
**Lumina** — a once-radiant world of knowledge, now dimmed by the Master's **Corruption**. Corruption turns order (science and truth) into monsters. The hero's mission is to **purify** each island, collect magical wands and pets, and finally defeat the true villain on a hidden island that only appears once all other islands are purified.


---


## Core Characters


### Hero: Atlas Vox
A curious young apprentice-mage. Carries a wand that grows stronger with knowledge.
- **Design:** Light hair with a glowing streak that brightens as he levels up. A scholar's cloak that unlocks new runes with each island cleared.
- **Role:** The player character.


### Companion: Professor Lumen (nicknamed "Sage")
A pocket-sized spectral owl who acts as mentor and tutorial voice.
- **Design:** Glowing blue plumage, half-moon spectacles, carries a tiny floating book.
- **Role:** Teaches lessons, gives hints in battle, explains wrong answers, narrates story beats.


### Antagonist: Lord Entropos — "The Master"
Rules through Corruption. Themed around entropy (disorder) and decay.
- **Design:** Seen only as a silhouette on a floating black throne until late game. Dark cloak, glowing red eyes under a hood.
- **Role:** Main villain controlling all islands.


### Final Boss: Veilmaster Noctis
Entropos's true form, revealed on the hidden island.
- **Design:** Scary magician with a cracked porcelain mask (no face visible), tattered void-robes, broken equations swirling around him.
- **Location:** The **Null Keep**.


---


## Learning & Battle Loop (Core System)

Every attack is powered by answering a science question. This is the heart of the game.

### Turn Flow
1. **Encounter** — a corrupted monster appears.
2. **Player turn** — choose a spell from your equipped wand. Each spell belongs to a science branch (see Spell Elements).
3. **Question** — a question from that spell's science branch appears, at the current island's grade level.
4. **Correct answer** — the spell hits. Damage = `ATK × spell power`.
   - 3 correct answers in a row = **Streak**: next hit does ×1.5 damage.
5. **Wrong answer** — the spell fizzles (no damage). Sage shows the correct answer and a one-line explanation.
6. **Monster turn** — the monster attacks. Damage = `monster ATK − player DEF` (minimum 1).
7. **Monster HP reaches 0** — the monster is **purified**. Player gains EXP (and a pet the first time — see Pet System).
8. **Player HP reaches 0** — the player retreats to the island's starting point. No items are lost; only the streak resets.

### Sage's Hint
Once per battle, the player can ask Sage for a hint: two wrong choices are removed.

### Spell Elements (Science Branches)
| Element | Science Branch | Example Spell |
|---|---|---|
| **Verdant** | Life Science (plants, animals, cells, body) | Vine Lash |
| **Tempest** | Earth & Space (weather, rocks, planets) | Thunder Call |
| **Reaction** | Chemistry (matter, reactions, acids & bases) | Catalyst Burst |
| **Force** | Physics (forces, energy, light, sound) | Gravity Well |

### Question Format
- Types: multiple choice (4 options) and true/false.
- Every question has an explanation that Sage reads after a wrong answer.
- Questions are stored in a JSON file, separate from the game code:

```json
{
  "id": "dawn-life-001",
  "island": "dawnbloom",
  "element": "verdant",
  "type": "multiple",
  "question": "What do plants need to make their own food?",
  "choices": ["Sunlight", "Sand", "Plastic", "Salt"],
  "answer": 0,
  "explanation": "Plants use sunlight, water, and air to make food. This is called photosynthesis."
}
```


---


## Islands (Grade Arcs)

| Island | Grade | Science Topics | Island Boss | Unlocks When |
|---|---|---|---|---|
| **Dawnbloom Isle** | K-2 | Sun, plants, animals, weather basics | Rotbloom (C) | Start of game |
| **Thunderpeak Isle** | 3-5 | Weather & natural disasters, states of matter, simple changes | Cyclora (A) | Rotbloom is purified |
| **Catalyst Isle** | 6-8 | Cells & body systems, matter, chemical reactions | Dr. Mortaxis (S) | Cyclora is purified |
| **Quantum Rift Isle** | 9-12 | Forces & energy, waves, atoms, acids & bases (pH), DNA & proteins | Chronovore (SSS) | Dr. Mortaxis is purified |
| **Null Keep** (hidden) | Endgame | Mixed questions from all islands | Veilmaster Noctis (EX) | All four island bosses are purified |

- An island is **purified** when its Island Boss is purified.
- Players can travel freely between unlocked islands.


---


## Rank System

All monsters, wands, armor, and pets use the same ranks:

**F → E → D → C → B → A → S → SS → SSS**

**EX** is a special rank used only by the final boss.


---


## Monster Roster


### Dawnbloom Isle (cute, mild)
| Rank | Name | Appearance |
|---|---|---|
| F | **Wiltling** | Droopy sunflower sprite with sad eyes |
| E | **Dusklet** | Dimmed firefly in a cracked jar |
| D | **Thornling** | Thorny vine imp with glowing red berries |
| C (Island Boss) | **Rotbloom** | Hulking withered tree, roots like tentacles |


### Thunderpeak Isle (elemental, slightly scarier)
| Rank | Name | Appearance |
|---|---|---|
| E | **Puddleling** | Muddy slime that splashes acid rain |
| D | **Sparkimp** | Lightning gremlin, crackles when it moves |
| C | **Quakehound** | Four-legged tremor beast made of cracked stone |
| B | **Saltshade** | Crystalline brine wraith |
| A (Island Boss) | **Cyclora** | Swirling cyclone matriarch with glowing eyes in the eye of the storm |


### Catalyst Isle (grim lab vibes)
| Rank | Name | Appearance |
|---|---|---|
| D | **Reagoid** | Bubbling reactive blob with floating flask shards |
| C | **Boneweave** | Skeletal lab specimen stitched with glowing threads |
| B | **Fluxbeast** | Wolf-shaped creature made of unstable chemicals, color-shifting fur |
| A | **Volatix** | Humanoid golem of exposed reactive metals, sparks on impact |
| S (Island Boss) | **Dr. Mortaxis** | Corrupted scientist with syringe-claws and a gas-mask face |


### Quantum Rift Isle (abstract, cosmic horror)
| Rank | Name | Appearance |
|---|---|---|
| B | **Ionwisp** | Floating acidic phantom with a pH-shifting glow |
| A | **Protonex** | Subatomic predator, body made of orbiting particles |
| S | **Gravikron** | Hunched beast that warps light around it |
| SS | **Null Specter** | Faceless void phantom, leaves dissolving equations in its wake |
| SSS (Island Boss) | **Chronovore** | Time-eating serpent coiled around a broken clock |


### Null Keep (Hidden Island)
| Rank | Name | Appearance |
|---|---|---|
| EX (Final Boss) | **Veilmaster Noctis** | Cracked porcelain mask, void-robes, broken equations swirling |


---


## Pet System

When you purify a monster species **for the first time**, it returns to its pure form and joins you as a pet. Purifying the same species again gives EXP only.
- Island Bosses and the Final Boss do not become pets. They drop rare rewards instead.
- A pet starts at the same rank as the monster it came from.


### Example Pet Transformations
- Wiltling → **Sunpetal** (bright sunflower pixie)
- Sparkimp → **Voltling** (friendly thunder spark)
- Fluxbeast → **Prismwolf** (rainbow aurora wolf)
- Null Specter → **Starweaver** (cosmic guardian spirit)


### Pet Evolution (3 Tiers)
Pets level up by joining battles and evolve at set levels.
- Example: **Sunpetal → Solaria → Helios Prime**


---


## Combat & Progression


### Stats
| Stat | Meaning |
|---|---|
| **HP** | Health. Reaching 0 ends the battle. |
| **ATK** | Power. Multiplies spell damage. |
| **DEF** | Defense. Reduces damage taken. |


### Leveling
- EXP comes from purifying monsters and completing Sage's lessons.
- EXP needed for next level = `50 × current level`.
- Each level up: **+10 HP, +2 ATK, +1 DEF**.


### Starting Values (tune these by playtesting)
**Player (Level 1):** HP 100, ATK 10, DEF 2

| Monster Rank | HP | ATK | EXP Reward |
|---|---|---|---|
| F | 30 | 5 | 10 |
| E | 45 | 7 | 15 |
| D | 60 | 9 | 20 |
| C | 90 | 12 | 35 |
| B | 130 | 15 | 50 |
| A | 180 | 19 | 75 |
| S | 250 | 24 | 110 |
| SS | 340 | 30 | 160 |
| SSS | 450 | 37 | 230 |
| EX | 700 | 45 | — |

Island Bosses have **2× the HP** of their rank.


### Wands
- Each wand holds 2–4 spells. Each spell has an element and a power value.
- Wands have ranks (F → SSS). Higher rank = higher spell power.
- Spell themes match the islands (e.g., a plant wand sprouts vines, a chemistry wand throws reactions, a quantum wand bends space).


### Armor
- Raises HP and DEF.
- Armor has ranks (F → SSS).
- Wearing a full set gives a bonus effect.


---


## Random Event: Wandering Elite

On any **already purified** island, a **Wandering Elite** may appear (10% chance per encounter).
- It is a re-corrupted monster from that island, one rank higher, with a glowing red aura.
- Purifying it gives a rare reward: a wand, armor, a pet egg, or materials.
- Encourages replay and exploration.


---


## Game Flow Summary

1. Start on **Dawnbloom Isle** (K-2). Sage teaches the basics.
2. Purify each island's boss to unlock the next island: **Thunderpeak → Catalyst → Quantum Rift**.
3. Travel freely between unlocked islands.
4. Collect wands, armor, and pets along the way.
5. Meet Wandering Elites on purified islands for bonus rewards.
6. After all four islands are purified, the hidden **Null Keep** appears.
7. Face **Veilmaster Noctis** (Lord Entropos's true form) in the final battle.


---


## Build Plan

### Version 1 (MVP) — Dawnbloom Isle only
- Title screen
- Island map with one island
- 4 monsters (Wiltling, Dusklet, Thornling, Rotbloom)
- Battle system with questions (Learning & Battle Loop)
- 1 starter wand with 2 spells
- 30 questions for Dawnbloom (checked for correctness)
- Leveling and EXP
- Save progress in the browser (localStorage)

### Version 2
- Thunderpeak Isle
- Pet system
- Armor

### Version 3
- Catalyst and Quantum Rift Isles
- Wandering Elites
- Pet evolution, armor set bonuses

### Version 4
- Null Keep and final boss
- Full story dialogue for every island


---


## Next Steps (Version 1)

- [ ] Scaffold the HTML/CSS/JS project (title screen → island map → battle screen)
- [ ] Write 30 Dawnbloom questions in `questions.json` and check every answer
- [ ] Build the quiz engine (show a question, check the answer)
- [ ] Build the battle screen (HP bars, turns, damage)
- [ ] Add EXP and leveling
- [ ] Add saving with localStorage
- [ ] Write Sage's tutorial dialogue for Dawnbloom

