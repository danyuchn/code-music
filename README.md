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

#### Known issue: manual Update button workflow

The MCP's `play` tool re-evaluates patterns by sending `Ctrl+Enter`, which requires the CodeMirror editor to hold keyboard focus. Once the Strudel page renders other UI elements (the welcome panel, the docs sidebar, etc.), the editor loses focus and subsequent `Ctrl+Enter` events are dropped. This means **after Claude pushes a new pattern, the audio engine keeps playing the previous one** until you manually intervene.

Workaround: when Claude says it pushed a new pattern, click the **Update** button (top-right of the Strudel editor) — or press `Ctrl+Enter` while the editor is focused. The new pattern swaps in seamlessly on the next bar boundary; audio does not stop.

This affects every tool that internally re-evaluates: `write` (with `auto_play: true`), `set_energy`, `shift_mood`, `refine`, `generate_pattern`, etc. The non-evaluating tools (`append`, `insert`, `replace`, `clear`) just modify the editor text without trying to play, so they always need a manual Update too.

If you want a fix rather than a workaround, fork the MCP and change `StrudelController.play()` to fall back to clicking the on-page Update button when the keyboard event fails — or open an issue at https://github.com/williamzujkowski/live-coding-music-mcp/issues.

#### Other gotchas (lessons learned the hard way)

- **Closing the Chromium window stops everything.** The Playwright-launched Chrome window IS the speaker — close it and the MCP loses its browser handle. `init` returns `Already initialized` even when the underlying browser is dead, but every subsequent `write`/`play`/`stop` call fails with `Target page, context or browser has been closed`. Recovery requires fully restarting Claude Code so the MCP server respawns the browser.

- **Older Strudel-stage tabs keep playing after you stop the dev server.** If you have an old `localhost:3000` tab open in your regular browser from a previous session, it will keep playing whatever pattern it last evaluated even after `npm run dev` is killed (Web Audio is client-side). When debugging "why is the audio not switching" symptoms, check that no stale Strudel tab is silently playing.

- **`auto_play: true` works on the first call after `init`, then drifts.** The first `write({auto_play: true})` after a fresh browser hits the play button (which evaluates and plays). All subsequent calls send `Ctrl+Enter` only — see the focus bug above. Treat any "writing should also play" expectation as best-effort and tell users to expect a manual Update click.

#### Audio export (offline render to WAV/MP3)

Strudel has built-in offline rendering via the **export tab** (top-right of the right pane). It uses `OfflineAudioContext` — single-threaded, single-tab. There's no CLI alternative: `@strudel/webaudio` depends on browser AudioWorklets that have no clean Node.js polyfill, so a `render.mjs` would be a multi-day porting job.

**Speedup settings**: defaults are `Sample rate: 48000`, `Maximum polyphony: 1024`. For sharing-quality output (will be re-compressed to MP3 anyway), use:

| Field | Default | Recommended for sharing |
|-------|---------|-------------------------|
| Sample rate | 48000 | **22050** (FM-radio quality, ~2× faster) |
| Maximum polyphony | 1024 | **64** (~3-5× faster, ample for typical patterns) |

A 10-minute multi-layer track renders in 1-3 minutes at the recommended settings vs. 15+ minutes at defaults.

**Where the file lands**: Playwright Chromium does NOT save to `~/Downloads/`. The downloaded WAV ends up at `/var/folders/.../T/playwright-artifacts-XXXX/<UUID>` — no extension, UUID filename. Use `find /var/folders -name "playwright-artifacts-*"` or watch for the UUID path that gets logged. Convert and move with:

```bash
ffmpeg -i /var/folders/.../<UUID> -codec:a libmp3lame -b:a 192k -y ~/Downloads/<song>.mp3
```

#### Loading external samples (custom WAV/MP3 from disk)

Strudel.cc is served over HTTPS, so it can only fetch samples over HTTPS. The straightforward "serve files from `python3 -m http.server`" approach has two failure modes that both hit silently (no console error):

1. **Mixed content blocked.** Despite the spec saying `localhost` is a "potentially trustworthy" origin, Chrome inside Playwright still drops HTTPS→HTTP fetches for the `samples()` URL list. Symptom: pattern evaluates, no errors, no requests in your local server log.
2. **Missing CORS header.** Python's default `http.server` does NOT send `Access-Control-Allow-Origin`. Even when mixed content is allowed (e.g., HTTPS tunnel), the response is rejected by the browser without surfacing an error. Symptom: same as above.

The recipe that actually works:

```bash
# 1. Serve the stems folder with CORS headers
python3 -c "
import http.server, socketserver
class CORSHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
socketserver.ThreadingTCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(('127.0.0.1', 8765), CORSHandler) as s:
    s.serve_forever()
"

# 2. Tunnel via cloudflared so Strudel can reach it over HTTPS
brew install cloudflared
cloudflared tunnel --url http://127.0.0.1:8765
# → https://<random>.trycloudflare.com  (no signup, ephemeral)
```

Then in Strudel:

```js
samples({
  duke_drums: 'https://<random>.trycloudflare.com/drums.mp3',
  duke_vox:   'https://<random>.trycloudflare.com/vocals.mp3'
})
```

DNS for the new tunnel hostname can take ~30s to propagate to your local resolver — `dig +short <name> @1.1.1.1` if you're impatient. The Strudel browser usually resolves faster than the local shell because it talks directly to public DNS. First sample fetch from the tunnel takes a few seconds; subsequent triggers are cached in the browser.

#### Stem separation (YouTube → vocals/drums/bass/other)

For remix work, `demucs` (Meta's hybrid transformer model) gives the best free 4-stem separation. On macOS arm64, the latest demucs ships with a `torchcodec` dependency that fails to load (`Could not load this library: libtorchcodec_core4.dylib`). Pin to the older release that uses `torchaudio` directly:

```bash
uv tool install "demucs==4.0.1" --with "torchaudio<2.6" --with soundfile
yt-dlp -x --audio-format wav -o song.wav "<youtube-url>"
demucs -o stems/ song.wav
# → stems/htdemucs/song/{vocals,drums,bass,other}.wav
```

Each stem ends up the same length as the source. Convert to MP3 to keep loading fast in Strudel:

```bash
for f in vocals drums bass other; do
  ffmpeg -i stems/htdemucs/song/$f.wav -codec:a libmp3lame -b:a 192k stems/htdemucs/song/$f.mp3
done
```

This is fair-use territory for personal remixing only — do not redistribute the stems or any derivative work without sample clearance.

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
