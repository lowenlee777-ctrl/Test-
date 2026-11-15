# LAST SIGNAL — Game Design Document

Nov 15, 2026 · @Danny

## 1. Overview & Product Vision

**LAST SIGNAL** is a stage-based, side-scrolling **lane-push tower defense** game in which the last living human, **P**, rebuilds a team from the data of the dead and fights back, one stage at a time, against the villain who ended the world. *LAST SIGNAL* is a working title.

**One-line pitch:** *Battle Cats-style lane battles, with a deck you build by summoning a team through a cinematic, Cookie Run Kingdom-style gacha.*

### Design references

| Reference | What we take | What we change |
| --- | --- | --- |
| **냥코대전쟁** (The Battle Cats) | Two bases at opposite ends of a lane; units spawn from your base and walk toward the enemy; an energy meter that fills over time; a charged base cannon; short, replayable stages | Units are not bought from a shop. They are **collected through gacha** and arranged into a deck |
| **Cookie Run Kingdom** | A collectible roster with rarities; a summon scene with **high-quality effects** that tease rarity before the reveal; a team you build and level | Battles are real-time lane defense, not auto-battle |

### Design pillars

1. **Every stage is a puzzle.** Each stage has an enemy lineup that rewards a specific deck answer.
2. **Every summon is a show.** The gacha reveal is a payoff moment players want to watch and share.
3. **Your deck is your identity.** Two players with the same units can still win in different ways.
4. **A dead world, slowly relit.** Progress is visible: each cleared stage brings a piece of the world back.

## 2. World & Narrative Premise

The world is dead, **P** is the only one left, and every unit P fights with is a *reconstruction* of someone the villain erased. That premise explains the gacha inside the story: summoning is science, not magic.

### The world

- A scientist known as **Dr. Vael Null** (placeholder name) activated the `ENTROPY ENGINE`, a device that unmade every living thing on the planet.
- What remains is the **Grey Zone**: silent cities, frozen oceans, and roaming machines called `NULLBORN` that keep erasing whatever is left.
- P survived inside a sealed research vault, the **Ark**, beside the last working `GENESIS POD`.

### Who is P

- **P** is the player. P never fights directly and has no fixed face, name or voice, so the player projects onto them.
- P's power is the Genesis Pod: it rebuilds people, animals and machines from fragments of data called `SIGNAL SHARDS`.
- Every unit P rebuilds is called an **Echo**. Echoes remember pieces of their old lives, which gives each one a short personal story.

### The villain

- **Dr. Vael Null** believes life was a flaw to be corrected. He watches P from his fortress, the **Entropy Spire**, and appears as the final boss of each chapter in a stronger form.
- His goal in the game: find and destroy the Ark before P rebuilds enough of the world to resist him.

### How story is told

- **Per stage:** a 2–3 line radio log before battle (P intercepts a dying signal).
- **Per chapter:** a short cutscene when the chapter boss falls, and one region of the world map turns from grey to color.
- **Per Echo:** unlockable memory files as the Echo levels up (see Section 9).

## 3. Core Game Loop

The loop is **battle → earn → summon → grow → battle harder**: stages pay out the currency that powers the gacha, and the gacha fills the deck that clears the next stage.

```
BATTLE  →  EARN  →  SUMMON  →  GROW  →  BATTLE HARDER
  ↑                                          │
  └──────────────────────────────────────────┘
```

1. **Battle** — clear a lane stage (Section 5).
2. **Earn** — get `SIGNAL SHARDS`, `DATA CORES` and other drops.
3. **Summon** — spend shards at the Genesis Pod for new Echoes (Section 7).
4. **Grow** — level, ascend and build a better deck (Sections 8–9).
5. **Battle harder** — take on the next stage or Hard Mode.

A session is short (one or two stages plus a summon); the long-term hook is the roster, which keeps growing across sessions.

## 4. Stage Structure & Progression

The campaign is a world map of **Chapters**, each made of short **Stages**; every stage is one self-contained tower defense battle of about **2–4 minutes**.

### Hierarchy

- **World Map** → the dead planet, split into regions (e.g. *Frozen Harbor*, *Ash City*, *Glass Desert*).
- **Chapter** = one region, about **10–15 stages**, ending in a **Boss Stage** against a form of Dr. Vael Null or one of his lieutenants.
- **Stage** = one battle with a fixed enemy lineup, terrain and rule set.

### Stage types

| Type | Rule | Purpose |
| --- | --- | --- |
| **Standard** | Destroy the enemy base | Core progression |
| **Survival** | Keep your base alive for a set time | Tests tank and wall units |
| **Escort** | Protect a slow-moving rescue unit until it reaches the end of the lane | Tests positioning and timing |
| **Restricted** | A deck rule applies, e.g. *only Common/Rare units* or *max 5 slots* | Rewards a deep roster, not just top pulls |
| **Boss** | Enemy base has a boss with phases and special attacks | Chapter climax |

### Star rating

Each stage awards up to **3 stars**:

1. ★ Clear the stage.
2. ★ Clear with the base above **50% HP**.
3. ★ A stage-specific challenge, e.g. *clear in under 2 minutes* or *never use the P Cannon*.

Stars unlock chapter reward chests and gate later chapters, which pushes players to revisit old stages with a stronger deck.

### Difficulty modes

After a chapter is cleared, its **Hard Mode** opens: same map, stronger enemies, new traits, better drops. This doubles content without new maps.

## 5. Battle Mechanics: Lane-Push Tower Defense

A battle is a single horizontal lane: P's **Ark** sits on the left, the enemy **Spire** on the right, and both sides send units toward each other until one base falls.

### The battlefield

- **Ark (player base):** has HP. If it reaches 0, the stage is lost.
- **Spire (enemy base):** has HP. Destroying it wins the stage (except Survival and Escort stages).
- **Lane:** one straight path. Units walk forward automatically and stop to fight the first enemy in range.
- **Camera:** the player can scroll the lane left and right to read the fight.

### Energy: the in-stage money

- `ENERGY` is the money used inside a stage, shown as a bar at the bottom of the screen.
- Each stage starts with a small amount (e.g. enough for two Walls). It is **reset to 0 when the stage ends or the Ark is destroyed**; nothing carries over.
- **The only way to refill it is by solving quizzes** (see *Quiz refill* below).
- Each unit in the deck has an **Energy cost**. Tapping its card spends that energy and spawns the unit at the Ark.
- **Reactor Upgrade:** the player can spend energy mid-battle to raise the **max energy cap** and the **energy each correct answer gives**. This keeps the *invest now or defend now* decision from 냥코대전쟁.

### Quiz refill

This is what makes it a **science game**: every bit of energy after the start comes from answering a science question, so knowledge directly becomes army strength.

- **Quiz button** on the battle HUD. Tapping it opens a question over the lane; the player picks a difficulty first: **Easy**, **Normal** or **Hard**.
- **Format:** multiple choice, 4 answers, **10-second** timer.
- **The battle keeps running** at half speed while the quiz is open, so answering is a risk: the front line is still fighting.
- **Reward (draft numbers):**

| Difficulty | Correct answer gives |
| --- | --- |
| Easy | +50 `ENERGY` |
| Normal | +100 `ENERGY` |
| Hard | +200 `ENERGY` |

- **Streak bonus:** 3 correct answers in a row give **+20%** on every answer until the next miss.
- **Wrong answer or time out:** no energy, and the Quiz button locks for **5 seconds**.
- **Topics follow the chapter**, e.g. *Frozen Harbor* → heat and states of matter, *Ash City* → chemistry and combustion, *Glass Desert* → light and optics. A question never repeats within the same stage.
- After a wrong answer, the correct answer and a one-line explanation show for 2 seconds, so the player learns while playing.

### Unit deployment

- After spawning, each unit card goes on **cooldown** before it can be deployed again. Cheap units have short cooldowns; Legendary units have long ones.
- Units cannot be controlled after spawning. Skill comes from **what** you send and **when**.
- There is no unit cap per type, but a **field cap** (e.g. 50 units on screen) prevents endless spam.

### How combat resolves

- **Range:** a unit attacks when an enemy enters its range. Long-range units stop further back and stay safe behind the front line.
- **Attack type:** *Single-target* hits the first enemy; *Area* hits every enemy inside its hitbox.
- **Knockback:** each unit is knocked back a few times as it loses HP (e.g. at 66% and 33%). Knockback pushes it back down the lane and interrupts its attack, which creates the push-and-pull rhythm of the lane.
- **Traits & counters:** enemies carry traits (e.g. `MECH`, `MUTANT`, `VOID`). Some Echoes deal bonus damage to, slow, or freeze certain traits. This makes deck choice matter per stage.

### The P Cannon

- The `P CANNON` is a one-button special weapon fired from the Ark.
- It charges slowly over the battle. When full, a tap fires a beam down the lane that **damages and knocks back** every enemy it hits.
- Its type can be swapped between stages (e.g. *Damage beam*, *Freeze pulse*, *Barrier wall*), unlocked through story progress.

### Win, loss and rewards

- **Win:** Spire HP reaches 0 → star rating, XP for every Echo in the deck, items, and a chance at a rare drop.
- **Loss:** Ark HP reaches 0 → a small consolation reward and a *Tips* screen pointing at enemy traits the deck did not counter.
- **Speed:** a 2× speed toggle unlocks after the first chapter. **Auto-battle** is allowed only on stages already cleared with 3 stars.

## 6. Units (Echoes): Roles, Stats & Rarity

Every Echo has one **role**, one **rarity**, a set of **stats**, and one signature **skill**; role decides *how* it fights, rarity decides *how strong and how rare* it is.

### Roles

| Role | Job on the lane | Typical cost | Example Echo (placeholder) |
| --- | --- | --- | --- |
| **Wall** | Cheap, high HP, slows the enemy front line | Very low | *Scrap Sentinel*, a rebuilt security robot |
| **Striker** | Melee damage at the front | Low–Mid | *Volt Boxer*, an electrically charged athlete |
| **Ranger** | Long range, fragile, hits from behind the wall | Mid | *Lens*, a sniper made of optical fiber |
| **Blaster** | Area damage against groups | Mid–High | *Dr. Kiln*, a chemist who throws reactive flasks |
| **Support** | Heals, shields, buffs or debuffs allies and enemies | Mid | *Nurse Ion*, heals units in a radius |
| **Titan** | Very expensive, slow, game-changing power | Very high | *Atlas-0*, a walking fusion reactor |

### Core stats

- `HP` — health.
- `ATK` — damage per hit.
- `ATK SPEED` — time between attacks.
- `RANGE` — how far it reaches.
- `MOVE SPEED` — how fast it walks.
- `KNOCKBACKS` — how many times it is pushed back before it dies.
- `COST` — energy needed to deploy.
- `COOLDOWN` — time before it can be deployed again.
- `TRAIT BONUS` — which enemy traits it counters, if any.

### Rarity tiers

| Rarity | Visual tag | Power | Role in the game |
| --- | --- | --- | --- |
| **Common** | Grey frame | Low | Cheap fodder and walls; always useful in Restricted stages |
| **Rare** | Blue frame | Moderate | Reliable core of an early deck |
| **Epic** | Purple frame | High | Specialists that counter specific traits |
| **Legendary** | Gold frame, animated | Very high | Deck centerpieces with flashy skills |
| **Ancient** | Prismatic frame, unique summon cutscene | Highest | Story-tied Echoes, e.g. people Dr. Null erased first; the chase units |

**Design rule:** a lower-rarity Echo must always have a job a higher-rarity Echo cannot do as cheaply. This keeps Common and Rare units in real decks, not just in storage.

### Skills

Each Echo has one **signature skill** that triggers automatically on a condition, e.g. *every 5th attack*, *when HP drops below 30%*, or *on spawn*. Legendary and Ancient Echoes also have a short **skill animation** that plays in battle without pausing the game.

## 7. Gacha System: The Genesis Pod

The gacha is called **Reconstruction**: P feeds `SIGNAL SHARDS` into the **Genesis Pod** and a random Echo is rebuilt, with a reveal sequence built to feel as good as a Cookie Run Kingdom summon.

### Summon types

| Banner | Cost | Pool | Notes |
| --- | --- | --- | --- |
| **Standard Signal** | 300 `SIGNAL SHARDS` per pull, 3,000 for 10 | All permanent Echoes | Always available; **one free pull per day** |
| **Featured Signal** | Same as Standard | All Echoes, with 1–2 **featured** Echoes at boosted odds | Rotates every 2–3 weeks; story-linked Echoes debut here |

### Drop rates (draft numbers)

| Rarity | Rate per pull |
| --- | --- |
| Common | 52% |
| Rare | 33% |
| Epic | 12% |
| Legendary | 2.7% |
| Ancient | 0.3% |

- **10-pull guarantee:** every 10-pull contains at least one Epic or higher.
- **Pity system:** if no Legendary appears in **80 pulls**, the 80th is a guaranteed Legendary. On a Featured banner, the second pity is guaranteed to be the featured Echo.
- **Duplicates** are not wasted: they become `ECHO FRAGMENTS` used for Ascension (see Section 9).
- **Rates are always shown** in-game on every banner, since many app stores and regions require it.

### The summon presentation

This is the **signature moment** of the game. Every pull plays a short sequence, and the visuals change with rarity so the player feels the result before seeing it.

1. **Insert Shards.** P slots glowing shards into the Pod. The room hums.
2. **Signal Search.** A radar sweeps the dead world map. The *color of the sweep* is the first rarity hint: grey, blue, purple, gold, or prismatic.
3. **Lock-On.** The radar locks onto a spot. For Legendary and above, the screen shakes and the music cuts out.
4. **Reconstruction.** Inside the Pod, a silhouette is built from light, layer by layer: skeleton, then body, then armor. Higher rarity = more layers, more particles, longer build.
5. **Breakthrough (rare only).** For Legendary and Ancient, the Pod glass cracks and bursts in a full-screen flash, then cuts to a unique 3–5 second **intro cinematic** for that Echo.
6. **Reveal Card.** The Echo appears with name, rarity frame, role icon and a one-line voice clip: their first words after being reborn.

**Effect requirements:** a *Skip* button for Commons and Rares on 10-pulls; the full sequence is never skippable the first time a Legendary or Ancient is obtained; every reveal is shareable as a short clip or card image.

## 8. Deck Building

Before every stage the player picks a **deck of 8 Echoes** from their collection; the deck is the only thing they can spawn in battle, so choosing it *is* the strategy.

### Deck rules

- **Slots:** 8 slots per deck (starts at 5 and unlocks up to 8 through Chapters 1–3, so new players learn slowly).
- **No duplicates:** the same Echo cannot appear twice in one deck.
- **Saved decks:** up to 10 named presets, e.g. *Anti-Mech*, *Boss Rush*, *Budget Commons*.
- **Deck Power:** a single number summarizing the deck's strength, shown next to the stage's **Recommended Power**. It is a guide, not a lock.

### Pre-battle scouting

The stage select screen shows the **enemy lineup** and their traits before the player commits. This turns deck building into a readable puzzle: *"This stage has lots of `MECH` enemies and one flying boss. I need an anti-Mech Striker and a Ranger."*

### Synergy: Bonds

Echoes who knew each other before the end of the world form **Bonds**. When Bonded Echoes are in the same deck, all of them get a small bonus.

| Bond (example) | Members | Bonus |
| --- | --- | --- |
| **The Lab Team** | Dr. Kiln, Nurse Ion, Lens | +10% ATK SPEED |
| **City Guard** | Scrap Sentinel, Volt Boxer | +15% HP |
| **Last Broadcast** | Any 3 Echoes from Chapter 4 | Energy fills 10% faster |

Bonds give collectors a reason to chase specific Echoes and give the story a place to live inside the deck screen.

### A good deck, by design

A balanced deck usually has **1–2 Walls, 2 Strikers, 1–2 Rangers, 1 Blaster, 1 Support and 0–1 Titan**. The game never forces this, but the tutorial teaches it and the **Auto-Build** button uses it as a default.

## 9. Unit Growth

Echoes grow along **three separate tracks** (Level, Ascension and Skill), so a pull is the start of a unit's story, not the end.

| Track | What it raises | What it costs | Where the cost comes from |
| --- | --- | --- | --- |
| **Level** (1 → cap) | HP, ATK | `DATA CORES` | Every stage clear, daily challenge |
| **Ascension** (★ to ★★★★★) | Raises the level cap; unlocks a new visual form at ★★★ and ★★★★★ | `ECHO FRAGMENTS` of that Echo | Duplicate pulls, Hard Mode drops, event shops |
| **Skill** (Lv 1 → 5) | Skill damage, duration or trigger rate | `SKILL CHIPS` | Daily challenge stages |

### Memory files

At certain levels each Echo unlocks a **Memory File**: a short story card about who they were before the end. Collecting all of an Echo's files grants a small permanent stat bonus. This ties growth to the world story and gives players an emotional reason to raise units they like.

### Ark Research (account-wide upgrades)

Alongside individual Echoes, P upgrades the **Ark** itself using `DATA CORES`, unlocked one tier per chapter cleared:

- Ark base HP
- Starting energy and quiz energy reward
- P Cannon damage and charge speed
- Number of deck slots (up to 8)

This gives steady progress even on days the player gets no good pulls.

## 10. Enemies & Villain Bosses

Enemies are the **Nullborn**, Dr. Vael Null's machines and mutations; each carries a **trait** that tells the player which Echoes counter it.

### Enemy traits

| Trait | Looks like | Special behavior | Countered by |
| --- | --- | --- | --- |
| `MECH` | Drones, walkers, turrets | High HP, slow | Echoes with *Shock* damage |
| `MUTANT` | Twisted creatures | Fast, regenerates HP | Echoes with *Burn* (stops regen) |
| `VOID` | Shadowy, half-erased shapes | Ignores the first knockback | Echoes with *Light* damage |
| `AERIAL` | Flying units | Melee units cannot hit them | Rangers and Blasters |
| `ELITE` | Larger, glowing variant of any trait | 3× stats, drops bonus rewards | Any focused damage |

### Boss design

- Every chapter ends with a boss at the Spire: one of Dr. Null's **lieutenants** (*e.g. The Archivist*, *Frostmind*) or Dr. Null himself.
- Bosses have **2–3 phases**. Each phase change is signaled by a short animation and a new attack, e.g. *summons a wave of Mech*, *freezes the lane for 5 seconds*, *shields the Spire until a target is destroyed*.
- Each boss is designed to **teach one lesson**, such as *bring a Support* or *save the P Cannon for phase 2*.
- **Dr. Vael Null** appears in a stronger form at the end of every 3rd chapter, so the villain stays present across the whole campaign instead of only at the end.

## 11. Economy & Resources

The game has exactly **three currencies**, each with a different life span: one is **saved forever**, one **refills itself while the player is away**, and one **exists only inside a battle**. Free players should still earn a 10-pull roughly every **1–2 weeks** of regular play.

| Currency | Life span | Used for | How you get it |
| --- | --- | --- | --- |
| `SIGNAL SHARDS` (gacha currency) | **Permanent.** Saved in Supabase and kept when the player leaves the game | Gacha pulls; refilling `COMMAND` | First-time clears, 3-star rewards, daily missions, events, purchase |
| `COMMAND` (통솔력) | **Refills over time,** also while the player is out of the game | Entering a stage | +1 every 5 minutes up to the cap; instant refill with `SIGNAL SHARDS` |
| `ENERGY` (in-stage money) | **One stage only.** Reset to 0 when the stage ends or the Ark is destroyed | Deploying Echoes, Reactor Upgrade | Solving quizzes during battle (Section 5) |

### COMMAND (통솔력) rules

- **Stage cost:** each stage costs `COMMAND` to enter (e.g. 5 early, up to 15 for Hard Mode and bosses). It is spent when the battle starts and is not refunded on a loss, as in 냥코대전쟁.
- **Cap:** starts at 50 and rises as chapters are cleared (draft numbers).
- **Offline regen:** the game does not need to run while the player is away. The server saves the time of the last update and works out how much `COMMAND` has grown when the player comes back.
- **Refill with gacha currency:** spending `SIGNAL SHARDS` (e.g. 100) fills `COMMAND` to the cap. The price rises with each refill on the same day, so shards are not drained away from the gacha too easily.

### Growth materials (not currencies)

`DATA CORES`, `ECHO FRAGMENTS` and `SKILL CHIPS` are **items**, not currencies: they cannot be bought, only earned in stages and spent on growth (Section 9).

### Daily and live systems

- **Daily missions:** e.g. *clear 3 stages*, *answer 10 quizzes correctly*, *pull once* → small `SIGNAL SHARDS` rewards.
- **Daily challenge stages:** rotating material stages (Mon: Data Cores, Tue: Skill Chips, and so on).
- **Daily free pull:** one free Standard Signal pull per day, replacing a separate free-currency banner.
- **Events:** limited story chapters tied to the current Featured Signal, with an event shop where the featured Echo's fragments can be earned.
- **Endless Tower** (post-launch): a climbing mode with escalating floors and weekly leaderboards.

### Fairness rules

- Every story stage must be clearable with **free-to-play units**.
- No stat-boosting items are sold directly; money buys **summons and convenience**, not wins.
- Legendary pity carries over between banners of the same type.

## 12. Tech Implementation Notes (HTML / CSS / JS + Phaser, Vercel, Supabase)

The game is built in **Phaser** on top of plain **HTML, CSS and JavaScript**, so every system above maps to a Phaser **Scene**, with balance numbers kept in **JSON data files** rather than in code.

### Scene map

| Scene | Covers | Doc section |
| --- | --- | --- |
| `BootScene` | Loads atlases, audio, JSON data; shows a loading bar | — |
| `TitleScene` | Title screen, save check | — |
| `WorldMapScene` | Chapters, stage select, star display, enemy scouting | 4, 8 |
| `DeckScene` | Roster, deck slots, Bonds, Deck Power | 8, 9 |
| `BattleScene` | Lane, bases, units, combat, P Cannon | 5, 10 |
| `BattleUIScene` | Energy bar, Quiz button and quiz overlay, unit cards, cooldowns, speed toggle; runs **in parallel** on top of `BattleScene` | 5 |
| `SummonScene` | Genesis Pod reveal sequence | 7 |
| `GrowthScene` | Level, Ascension, Skill, Memory Files, Ark Research | 9 |

### How the battle maps to Phaser

- **Units** are sprite classes with a simple **state machine**: `WALK` → `ATTACK` → `KNOCKBACK` → `DIE`. Each reads its stats from the Echo's JSON entry.
- **Groups with object pooling** for player units, enemies and projectiles, so the field cap (about 50 units) stays smooth on phones.
- **Range checks** use the distance along the lane (one x-axis value) instead of full physics collisions; the lane is one line, so this is cheaper and easier to balance.
- **Timers:** Phaser time events drive the quiz timer and lockout, unit cooldowns and P Cannon charge, so the **2× speed** toggle only has to change the scene's time scale.
- **Camera:** bounded to the lane width, scrolled by drag; a short **camera shake** on knockbacks and base hits.

### Gacha effects in Phaser

- **Particle emitters** for shard sparks and the reconstruction build-up; **tweens and timelines** to sequence the 6 reveal steps in Section 7.
- **Camera flash and shake** for the Legendary Breakthrough moment.
- **Glow and bloom FX** on rarity frames (built-in in Phaser 3.60 and later; needs the WebGL renderer).
- Legendary/Ancient intro cinematics can be **short video files** played in the scene, or sprite-sheet animations if file size matters.

### Data and saving

- **JSON files** for Echo stats, enemy traits, stage lineups, gacha rates and Bonds, shipped with the game on Vercel, so balance changes need no code edits.
- **Player data lives in Supabase**, not in the browser: roster, resources, stars, decks and pity counters (see *Backend* below).
- `localStorage` is only a cache for settings (sound, 2× speed) and offline-friendly UI state.

### UI choice

Menus with lots of lists (roster, deck, shop) are easier to build as **HTML/CSS overlays** above the Phaser canvas; the battle HUD and summon screen stay **inside Phaser** for effects and timing. The **Scale Manager** in FIT mode keeps one layout working on desktop and mobile.

### Backend: Vercel + Supabase

**Vercel** hosts the game files; **Supabase** holds accounts and all player data, and every action that spends or grants currency runs **on the server**, never in the browser.

**Vercel (hosting)**

- Deploys the HTML/CSS/JS + Phaser build and the JSON data files as a static site.
- **Preview deployments** per branch give each playtest build its own link.

**Supabase (accounts and data)**

- **Auth:** start players as **anonymous guests** so they can play instantly, then let them link Google or email to keep their account across devices.
- **Tables (draft):**

| Table | Holds |
| --- | --- |
| `players` | Profile, `SIGNAL SHARDS`, `COMMAND` + the time it was last updated (for offline regen), refills used today, materials, Ark Research levels |
| `owned_echoes` | Each Echo the player owns: level, Ascension stars, skill level, fragments, Memory Files unlocked |
| `decks` | Up to 10 saved decks of 8 Echo slots |
| `stage_progress` | Stars per stage, Normal and Hard |
| `summon_history` | Every pull: banner, result, time, pity count. Used for support tickets and checking rates |
| `banners` | Active Featured Signals, start and end dates, featured Echoes |
| `quiz_questions` | Question, 4 answers, correct answer, explanation, difficulty, topic, chapter. New questions are added here without redeploying the game |

- **Row Level Security (RLS):** a player can only **read** their own rows. The game **never writes** currencies or the roster directly from the browser.
- **Server functions for every reward and cost.** The game calls a Supabase database function (RPC) or Edge Function, which checks and updates everything in one step:
  1. **Summon:** check shards → subtract cost → roll rarity with the banner rates → apply pity → add the Echo or fragments → log to `summon_history`. If any step fails, nothing changes.
  2. **Stage clear:** check the stage is unlocked and COMMAND was spent → sanity-check the result (e.g. clear time not impossibly fast) → grant rewards and stars.
  3. **Upgrades:** check materials → subtract → raise level, Ascension or skill.
- **Limit:** battles run in the browser, so a determined cheater could fake a win. Server sanity checks catch the obvious cases; that is enough for a single-player campaign, but **PvP or leaderboards** would need stricter checks later.
- **Later:** Supabase Realtime for live events or async PvP, and a leaderboard table for the Endless Tower.

## 13. Success Metrics & Open Questions

The mechanics succeed if players **finish stages, come back daily, and enjoy summoning even when they lose a pull**.

### What to measure

| Metric | Why it matters |
| --- | --- |
| Chapter 1 completion rate | Is the lane battle easy to learn? |
| Day-1 / Day-7 / Day-30 retention | Does the loop hold players? |
| Average deck diversity (unique Echoes used per week) | Are Common and Rare units still useful? |
| Summon skip rate on Legendary reveals | Is the reveal still exciting after many pulls? |
| Stage fail points (where players quit) | Which stages are difficulty walls? |

### Open questions

- [ ] Final title and villain name: keep *LAST SIGNAL* and *Dr. Vael Null*, or replace them?
- [ ] Art direction: Phaser is a 2D engine, so frame-by-frame hand-drawn sprites (like 냥코대전쟁) or skeletal animation (e.g. Spine) for smoother, Cookie Run Kingdom-style characters?
- [ ] Deck size: is 8 slots the right number, or should it be 10 like Battle Cats?
- [ ] Is there PvP (async deck vs deck) at launch, or only after the campaign is stable?
- [ ] Exact drop rates and pity count, to be balanced after the first playtest.
- [ ] Should `ENERGY` also trickle in slowly on its own, or come **only** from quizzes? Quiz-only is more distinctive, but a player who misses several answers in a row can get stuck.
