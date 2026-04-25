# code-music — Live Coding Music Toybox

Generate live electronic music with Claude Code + Strudel, no music theory required.

## What this is

An Algorave-style setup where you live-code music in a Strudel REPL — but since you don't know music theory, **Claude is your co-DJ**:

- You give vibe-based commands ("dark industrial techno", "make it darker", "switch to ambient")
- Claude uses pre-installed skills + music theory knowledge to write Strudel patterns and push them into the player
- You just steer with feel, no code, no theory

## What's installed

### 1. `strudel-claude/` — the stage (Next.js + Strudel REPL + REST API)

Source: https://github.com/renatoworks/strudel-claude

**Note**: this is **not a traditional MCP server** — it's a "self-hosted web stage with REST API". Claude Code uses `curl` to POST to `localhost:3000/api/code` (push patterns) and `/api/play` (start playback). Upside: no MCP registration needed, just start the dev server.

**7 built-in skills** (in `strudel-claude/.claude/skills/`, auto-loaded when Claude Code starts from this project root via the symlinks below):

- `/strudel` — Strudel syntax / mini-notation / effects / scales reference
- `/api` — REST API transport layer (push code / play / stop)
- `/tutorial` — teach Strudel + theory from scratch
- `/dj-set` — live DJ performance mode
- `/compose` — full track composition
- `/interactive` — interactive music creation
- `/visuals` — pianoroll / spiral / scope visualization

**3 demo tracks** (`strudel-claude/tracks/`) — copy-paste to play:

- `DOOM/` — DOOM metal (Rip and Tear 132 BPM, Funeral for the Damned 67 BPM)
- `FRED/` — FRED again.. style melodic house
- `SOLOMUN/` — Solomun-style deep house

### 2. `.claude/skills/midi-generation/` — the music theory brain (project-level skill)

Source: https://github.com/tubone24/midi-agent-skill

Gives Claude full music theory knowledge:

- `resources/music-theory.md` — scales, chords, cadences
- `resources/chord-progressions.md` — genre-specific chord progressions
- `resources/voice-leading.md` — avoid harshness (semitone clashes, range distribution)
- `resources/counterpoint.md` — classical counterpoint
- `resources/modes-scales.md` — church modes (Dorian / Phrygian / etc.)
- `resources/rhythm-patterns.md` — rhythm patterns, syncopation
- `resources/orchestration.md` — instrument ranges, combinations
- `skills/generate_midi.py` — MIDI file generator
- `skills/convert_to_wav.py` — MIDI → WAV (requires FluidSynth)

**Trigger words**: "composing", "generate MIDI", "melody", "chord progression" — Claude auto-loads it.

## Getting started

### 1. Clone with submodules

```bash
git clone --recurse-submodules <this-repo-url>
cd code-music
```

If you already cloned without `--recurse-submodules`:

```bash
git submodule update --init --recursive
```

### 2. Install Strudel stage dependencies

```bash
cd strudel-claude
npm install
```

(~200MB of node_modules; first run takes a moment.)

### 3. (Optional) Patch next.js vulnerabilities

```bash
npm install next@latest
```

### 4. Start the stage

```bash
npm run dev
```

Open http://localhost:3000 — full-screen Strudel editor.

### 5. In another terminal, start Claude Code

**From the project root** (the `.claude/skills/` symlinks load all 8 skills):

```bash
cd ..       # back to code-music/
claude
```

Try: `/dj-set give me 5 minutes of dark industrial techno at 140 BPM`

### 6. (Optional, advanced) Install a real MCP server

For more pro tooling (FFT spectrum analysis, beat detection, ~66 tools), add williamzujkowski/live-coding-music-mcp:

```bash
claude mcp add -s project live-coding-music-mcp -- npx -y @williamzujkowski/live-coding-music-mcp
```

The MCP launches its own Chromium window pointing at https://strudel.cc/ (visible by default — that window is the speakers, do **not** close it).

First time you use it, run `npx playwright install chromium` so the bundled Playwright can find a browser binary.

#### Field notes — gotchas, recipes, workflows

The accumulated lessons from running real DJ + remix sessions through this MCP — manual Update workflow, audio export speedup, sample-loading recipes (CORS server + cloudflared tunnel + IndexedDB import), demucs install fix on macOS arm64, long-stem remix patterns — live in [`docs/strudel-live-coding-notes.md`](docs/strudel-live-coding-notes.md). Read that before your first real session.

## Directory structure

```
code-music/
├── README.md
├── .claude/
│   └── skills/
│       ├── midi-generation/      ← real (project-level music theory skill)
│       ├── api → ../../strudel-claude/.claude/skills/api
│       ├── compose → ...
│       ├── dj-set → ...
│       ├── interactive → ...
│       ├── strudel → ...
│       ├── tutorial → ...
│       └── visuals → ...
└── strudel-claude/               ← Strudel stage (Next.js, git submodule)
    ├── README.md
    ├── package.json
    └── src/
```

## Project-level vs user-level

| Scope | MCP config | Skill location |
|-------|-----------|----------------|
| User | `~/.claude.json` | `~/.claude/skills/` |
| **Project (this repo)** | `<project>/.mcp.json` | `<project>/.claude/skills/` |

Everything here is scoped to this directory — leave the folder, it disappears. No pollution to other projects.

## Live coding hot-swap

Strudel is built for non-stop live editing: when you (or Claude via `/api/code`) update a pattern and re-evaluate, the change applies on the next bar boundary. Drums don't drop, beat doesn't skip — just like Algorave performers do on stage.

## Security

Source code is clean (no network calls, no `eval`, no spawn). The `next 16.1.6` dependency has 7 npm audit findings (1 HIGH + 5 MED + 1 LOW), all DoS / CSRF bypass — they only affect public deployments, not local dev. Run `npm install next@latest` to patch if you care.
