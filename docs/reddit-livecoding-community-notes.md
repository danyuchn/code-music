# Reddit Live Coding Community Notes

Curated notes from Reddit live coding subreddits — gathered to accelerate the path
from beginner to live coding DJ. All quotes paraphrased from public Reddit threads;
sources linked inline.

Last refresh: 2026-04-25.

---

## Subreddit Map

| Subreddit | Activity | Character |
|---|---|---|
| [r/livecoding](https://www.reddit.com/r/livecoding/) | Highest (daily posts) | Main hub. Strudel-dominated, with Tidal / Sonic Pi as runners-up |
| [r/TidalCycles](https://www.reddit.com/r/TidalCycles/) | Medium | Veteran Tidal + Strudel users; co-maintainer `yaxu` posts here |
| [r/Algorave](https://www.reddit.com/r/Algorave/) | Low (a few posts/week) | Performance announcements, algorithmic-music album drops |

---

## Tool Selection — Community Consensus

### TL;DR for someone aiming to DJ quickly

**Start with Strudel. Don't overthink it.**

Reasons that come up repeatedly across threads:

- Browser-based, zero install (Tidal install is reportedly painful)
- Official tutorial walks beginners from zero to playable patterns
- Largest learning community and most YouTube material
- `dj_dave` (one of the most visible live coding DJs) migrated from Sonic Pi to
  Strudel — multiple users cite this as a signal
  ([source: r/livecoding 1smoizi](https://www.reddit.com/r/livecoding/comments/1smoizi/))

### How the major environments compare

| Tool | When to pick it | Watch out for |
|---|---|---|
| **Strudel** | Performing / sharing / learning. Browser convenience wins. | Can glitch / click in-browser; weaker MIDI support |
| **Tidal Cycles** | Stable local performances; comfortable with Haskell or willing to learn | Painful install; weaker synthesis without writing SuperCollider ugens; pitched-sample transposition is unreliable |
| **Sonic Pi** | Synthesis-focused work, education, freeform Ruby-style scripting | Smaller built-in sample library; less common in performance |
| **Beat DJ (bdj.app)** | CLI-driven hybrid of producing + DJing; built-in microtonal scales, Ableton Link, multiplayer | New, smaller community; some features paywalled |
| **FoxDot / Renardo** | Want Python instead of Haskell/JS | Smaller community than the big three |
| **Gibber** | Browser-based alternative to Strudel | Less momentum than Strudel today |

Source for the comparison table:
- [r/livecoding "Strudel vs sonic pi vs tidal cycles" (2026-04-16)](https://www.reddit.com/r/livecoding/comments/1smoizi/)
- [r/livecoding "Picking a livecoding language" (2026-04-22)](https://www.reddit.com/r/livecoding/comments/1srtrfp/)
- [r/TidalCycles "TidalCycles or Strudel where to start" (2025-06-12)](https://www.reddit.com/r/TidalCycles/comments/1l9ij64/)

### Detailed perspective from `matt9k` (heavily upvoted in r/livecoding 1smoizi)

> "For hardcore rhythmic sample manipulation, go Tidal; for a robust online
> community with a Tidal-like paradigm, go Strudel; for more focus on synthesis
> and more freeform implementation, go Sonic Pi."

Additional points from the same comment:
- Tidal is sample-based by design — synthesis options are limited unless you
  write SuperCollider ugens
- Strudel is "very similar to Tidal" but in JavaScript; less customizable but
  more shareable
- Sonic Pi feels like "a thing you can do with Ruby" rather than a closed
  framework; you can `define` synth functions inline

### Note from `yaxu` (Strudel/Tidal co-maintainer)

- Strudel can drive `csound` synths on top of built-in synths
- Strudel's webmidi implementation "needs work" — for robust MIDI, route Strudel
  through Tidal's SuperCollider-based `superdirt`
- Skills transfer easily between Tidal and Strudel since they share the
  pattern-language paradigm
  ([source: r/TidalCycles mxyvajn](https://www.reddit.com/r/TidalCycles/comments/1l9ij64/))

---

## Beginner-to-DJ Roadmap (distilled from community advice)

1. **Run the Strudel official tutorial twice.**
   First pass: skim, edit-and-play in each sublesson. Second pass: rewrite
   patterns from scratch in an external editor, ideally from memory.
   ([source: r/livecoding n4suadu](https://www.reddit.com/r/livecoding/comments/1okfaep/))

2. **Watch Switch Angel on YouTube.** Multiple users cite her as the technical
   ceiling — she shows what advanced live coding performance looks like.
   Example referenced: <https://youtu.be/2kzjOIsL6CM>

3. **Find a TOPLAP node near you.** Local meet-ups for live coders.
   <https://blog.toplap.org/nodes/>

4. **Bookmark `awesome-livecoding`** for the full tool landscape.
   <https://github.com/toplap/awesome-livecoding>

5. **Play small first.** A r/livecoding user reported a successful 12-person
   show among friends with little prior performance experience — most audiences
   have never seen live coding and are easily impressed. Lower the barrier;
   ship a tiny show.
   ([source: r/livecoding ogfypxk](https://www.reddit.com/r/livecoding/comments/1smoizi/))

6. **Move from loops to arranged tracks.** Use Strudel's `arrange()` (or
   Tidal's `seqP` / `UR`) once 8-bar loops feel limiting.
   ([source: r/TidalCycles 1rqlxhp](https://www.reddit.com/r/TidalCycles/comments/1rqlxhp/))

---

## Real-World Pitfalls Reported

- **Strudel browser glitches / clicks.** Inherent browser limitation. For
  high-stakes shows, consider Tidal + SuperCollider backend.
  ([source: r/livecoding ohcskrj](https://www.reddit.com/r/livecoding/comments/1smoizi/))

- **Strudel MIDI is weak today.** Webmidi implementation is incomplete; route
  through `superdirt` for hardware integration.
  ([source: r/TidalCycles ogj69s0](https://www.reddit.com/r/livecoding/comments/1smoizi/))

- **Tidal pitched samples are a transposition crapshoot.** Documented by
  multiple users — if you need reliable melodic content from samples, Beat DJ's
  automatic pitch detection / correction is one workaround.

- **Strudel does not have Ableton Link yet** (as of late 2025 / early 2026
  comments). Tidal does. Plan accordingly if syncing with hardware or other
  software.

---

## Notable Threads to Re-Read

| Date | Thread | Why it matters |
|---|---|---|
| 2026-04-22 | [Picking a livecoding language](https://www.reddit.com/r/livecoding/comments/1srtrfp/) | Recent overview, includes alternatives like FoxDot for Python users |
| 2026-04-16 | [Strudel vs Sonic Pi vs Tidal Cycles](https://www.reddit.com/r/livecoding/comments/1smoizi/) | The most thorough comparison thread of 2026 so far |
| 2025-12-18 | [First Impressions of Tidal Cycles and Strudel](https://www.reddit.com/r/TidalCycles/comments/1pp3nv5/) | Newcomer write-up |
| 2025-12-20 | [Please help make TidalCycles + friends awesome](https://www.reddit.com/r/TidalCycles/comments/1prhy6u/) | yaxu's funding / community state-of-the-union |
| 2025-06-11 | [Awesome strudel resources](https://www.reddit.com/r/TidalCycles/comments/1l8u1p1/) | Community-curated resource pile |
| 2026-02-20 | [Breath Of Strudel — sound design + performance course](https://www.reddit.com/r/TidalCycles/comments/1r9877q/) | Paid course pointer for performance-oriented learning |
| 2017-03-05 | [All things livecoding: a curated list](https://www.reddit.com/r/livecoding/comments/5xjr33/) | Old but pinned-style overview |

---

## Other Sources to Tap (Beyond Reddit)

These were mentioned in threads or are well-known starting points worth
revisiting periodically.

### Communities

- **TOPLAP** — global live coding community hub: <https://toplap.org/>
- **TOPLAP nodes** (local chapters): <https://blog.toplap.org/nodes/>
- **TidalCycles / Strudel Discord** — primary real-time Q&A channel; invite
  links surface in r/TidalCycles and the official sites
- **Beat DJ Discord** — multiplayer jam sessions twice a week
  ([source: r/livecoding ohe8p7z](https://www.reddit.com/r/livecoding/comments/1smoizi/))
- **Algorithmic Pattern** community blog: <https://algorithmicpattern.org/>

### Curated Lists

- `awesome-livecoding` (the canonical starting catalog):
  <https://github.com/toplap/awesome-livecoding>
- TidalCycles Open Collective (project health + grants):
  <https://opencollective.com/tidalcycles>

### Performers Worth Studying

- **Switch Angel** — referenced multiple times for advanced performance
  technique. Boston Paramount Theatre set:
  <https://www.reddit.com/r/livecoding/comments/1r3we6k/>
- **dj_dave** — bridge from Sonic Pi to Strudel; widely cited as the most
  visible live coding DJ
- **GOOPSTER** — improvised techno / trance with Beat DJ:
  <https://www.reddit.com/r/livecoding/comments/1si5lmu/>
- **kindohm** — long-time TidalCycles album producer (`Zero Likes`, etc.)
- **chr15m / Hacksilver** — Algorave album showcasing weird tech stack
  (LISP, JS, Pure Data, Impulse Tracker):
  <https://www.reddit.com/r/Algorave/comments/bxdhqa/>

### Conferences & Festivals

- **Algorave events** — track via r/Algorave and toplap.org calendar
- **International Conference on Live Coding (ICLC)** — academic + practitioner
  venue, papers and performances

### Documentation Anchors

- Strudel official site + tutorial: <https://strudel.cc/>
- Tidal Cycles site: <https://tidalcycles.org/>
- Sonic Pi: <https://sonic-pi.net/> (browser variant: <https://sonic-pi.net/tau/>)
- Beat DJ: <https://bdj.app/>

### Tools That Showed Up in Threads (Worth Tracking)

- **strudel-server** — edit Strudel patterns from Neovim, live-update in REPL:
  <https://www.reddit.com/r/Algorave/comments/1obrttf/>
- **loopmaster** — live audio programming tool by `stagas`:
  <https://www.reddit.com/r/livecoding/comments/1ougzlj/>
- **POMSKI** — Python live code DAW with Ableton integration:
  <https://www.reddit.com/r/livecoding/comments/1sbrh4u/>
- **Soniare microtonal CLI DAW** (predecessor / sibling of Beat DJ):
  <https://www.reddit.com/r/Algorave/comments/1beu30w/>

---

## How to Refresh This Document

1. **Check r/livecoding `top` filter for the past month** — usually surfaces
   the best discussion threads.
2. **Search r/TidalCycles for "Strudel" and "performance"** — most performance
   advice still lands there even when the tool is Strudel.
3. **Re-read this file before any major show prep**; pitfalls section is the
   highest-value part.
4. **Follow `yaxu`** on Reddit / Mastodon — co-maintains Strudel and Tidal,
   announces upgrades and grants.
