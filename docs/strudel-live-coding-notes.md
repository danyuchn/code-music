# Strudel + live-coding-music-mcp — Field Notes

Hard-won lessons from running real DJ + remix sessions through `@williamzujkowski/live-coding-music-mcp` against `strudel.cc` via Playwright Chromium. Every entry below cost time to discover the hard way.

---

## MCP control plane

### `play` tool drops `Ctrl+Enter` events when the editor loses focus

The MCP re-evaluates the current editor pattern by sending `ControlOrMeta+Enter`. CodeMirror only picks that up when its DOM has keyboard focus. Once Strudel renders other UI elements (welcome panel, sounds tab, docs sidebar, even moving the cursor outside the code area), focus drifts and the keystroke is dropped silently — the MCP returns "Playing" but the audio engine keeps running the previous pattern.

Symptoms:
- `mcp__live-coding-music-mcp__write({pattern, auto_play: true})` returns `Pattern written. Playing.`
- `status` returns `playing: true`
- `show_errors` returns nothing
- The user hears the old pattern.

This affects every tool that internally re-evaluates: `write` (with `auto_play: true`), `set_energy`, `shift_mood`, `refine`, `generate_pattern`. Mutating tools that don't try to play (`append`, `insert`, `replace`, `clear`) just modify the editor text without firing keys, so they always require a manual Update click anyway.

**Workaround**: tell the user to click the **Update** button (top-right of the Strudel editor) after each pattern push. Strudel swaps the new pattern in on the next bar boundary; audio does not stop.

**Real fix**: fork the MCP and change `StrudelController.play()` to fall back to clicking the on-page Update button when the keyboard event fails. Or open an issue at https://github.com/williamzujkowski/live-coding-music-mcp/issues.

### `auto_play: true` only fires correctly on the first call

The first `write({auto_play: true})` after a fresh `init` clicks the actual play button (which evaluates and plays). Every subsequent call sends `Ctrl+Enter` only — see the focus bug above. Treat `auto_play: true` as best-effort and always tell the user to expect a manual Update click.

### Closing the Chromium window kills MCP browser handle

The Playwright-launched Chrome window IS the speaker. If the user (or anyone) closes that window:
- `init` returns `Already initialized` even though the underlying browser is dead
- Every subsequent `write` / `play` / `stop` fails with `Target page, context or browser has been closed`
- `create_session` with a new ID also times out

**Recovery**: fully restart Claude Code. The MCP server respawns the browser on next init.

**Prevention**: explicitly tell the user "do not close the Chromium window" the moment it appears.

### Stale `strudel-claude` tabs keep playing after the dev server stops

If the user has an older `localhost:3000` tab open in their regular browser from a previous session, it will keep playing whatever pattern it last evaluated even after `npm run dev` is killed (Web Audio is client-side, server-independent).

**Symptom**: "the audio is not switching even though I'm pushing new patterns" but only one tab is being controlled.

**Check**: ask the user to close any `localhost:3000` tab before debugging further.

---

## Audio export (offline render to WAV / MP3)

Strudel has built-in offline rendering via the **export tab** (top-right of the right pane). It uses `OfflineAudioContext` — single-threaded, single-tab. There is no usable CLI alternative: `@strudel/webaudio` depends on browser AudioWorklets that have no clean Node.js polyfill, so writing a `render.mjs` is a multi-day porting job.

### Speedup settings — change them every export

Defaults are wasteful for sharing-quality output (the render gets re-compressed to MP3 anyway):

| Field | Default | Recommended |
|-------|---------|-------------|
| Sample rate | 48000 | **22050** (FM-radio quality, ~2× faster) |
| Maximum polyphony | 1024 | **64** (~3-5× faster, ample for typical patterns) |

A 10-minute multi-layer track renders in 1-3 minutes at the recommended settings vs. 15+ minutes at defaults. The 22050 cutoff loses content above 11 kHz (cymbal shimmer, vocal "air") — imperceptible after 192 kbps MP3 compression on consumer playback.

### Playwright does NOT save to `~/Downloads/`

Files dropped via Strudel's Export button land at `/var/folders/<random>/T/playwright-artifacts-XXXX/<UUID>` — no extension, UUID filename. The user has to know to look there, or you have to find it for them:

```bash
find /var/folders -name "playwright-artifacts-*" -type d 2>/dev/null
# Then:
file <UUID-path>     # confirms WAV header
ffmpeg -i <UUID-path> -codec:a libmp3lame -b:a 192k -y ~/Downloads/<song>.mp3
```

### Cancel a running export

Strudel's offline render runs in the page's JavaScript thread. To kill a stuck export, the user has to **refresh the page** (`Cmd+R`). Closing the Sounds/Export tab does not stop it. The MCP has no tool to cancel either — Chromium just sits at 100% CPU until the render completes or you refresh.

After refresh, the editor is empty (you must re-push the pattern), but the IndexedDB sample library survives.

---

## Loading external samples

### HTTPS Strudel cannot reach HTTP localhost

Strudel.cc is served over HTTPS, so it can only fetch samples over HTTPS. Despite the spec saying `localhost` is a "potentially trustworthy" origin, Chrome inside Playwright still drops HTTPS→HTTP fetches for the `samples()` URL list. **Symptom**: pattern evaluates, no errors in `show_errors`, no requests in your local server log. Pure silence on the new sample tracks.

### Python's default `http.server` ships without CORS

`python3 -m http.server` does not send `Access-Control-Allow-Origin`. Even when mixed content is allowed (via HTTPS tunnel), the browser rejects the response without surfacing an error. **Symptom**: same as above.

### The recipe that actually works

```bash
# 1. Serve the sample folder with CORS headers
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

DNS for the new tunnel hostname can take ~30s to propagate to your local resolver — `dig +short <name> @1.1.1.1` if you're impatient. The Strudel browser usually resolves faster than the local shell because it talks directly to public DNS.

### IndexedDB import beats tunnels for stem-sized samples

Even with a working CORS+HTTPS tunnel, loading 4 × ~5MB stems through cloudflared at performance time hits Strudel's sample-decode timeout (`[sampler] loading sound "X" took too long`). The warning isn't fatal but the trigger fires before the audio is decoded, so the user hears nothing on the first cycle, and re-triggers reset the load.

**Reliable fix**: skip the network entirely. Drag the MP3 files into Strudel's **Sounds tab** in the right-hand pane — they get persisted in the browser's IndexedDB and load instantly on subsequent triggers. Once imported, you don't need a `samples({...})` declaration in the pattern at all; just reference the names directly:

```js
// No samples() call needed once they're in IndexedDB
s("duke_drums").slow(108).cut(1)
s("duke_vox").slow(108).cut(2)
```

The Sounds tab shows `(N)` after each name — that's the count of variations stored under that name, not part of the name itself. Strudel auto-detects directories you drop in as sample banks, so dropping the parent folder gives you `duke-need-u(8)` covering all 8 wav+mp3 files in that folder.

Trade-offs:
- ✅ Zero load latency, no tunnel needed
- ✅ Persists across page refreshes (per browser profile)
- ❌ Tied to a specific Chromium profile — fresh `init` from MCP may lose them
- ❌ User must drag-drop manually (not automatable from the MCP toolset)
- ❌ The "delete-all" button has UI glitches in some Strudel versions

### When IndexedDB drop-import refuses to work

Symptoms: drag-drop into Sounds tab does nothing, the import-sounds subtab is unresponsive, the delete-all popup self-dismisses.

Workaround:
1. Refresh the Strudel page (`Cmd+R` — keeps browser, clears editor, keeps IndexedDB)
2. Try drag-drop again
3. If still broken, fall back to a single mp3 over the cloudflared tunnel (the timeout problem is much less likely with one sample than with four)

### First-trigger timing miss

When a sample is loaded for the first time, the trigger fires before the audio has decoded. With `.slow(122).cut(1)` (one trigger every 122 cycles), the first miss means the sample doesn't fire again for ~3:55 — it sounds like the sample is broken even though the file did load.

Workaround: trigger more frequently the first time around so even if the first attempt misses, the second succeeds:

```js
// Trigger every 16 cycles (~30s) initially — once decoded, you can change to slow(122)
s("duke_full").struct("1 0".slow(16)).cut(1).gain(0.78)
```

Once the sample is cached, switch to `slow(N)` for natural single-shot playback.

---

## Long-stem remix patterns

The `chop`/`slice`/`splice` recipes in Strudel docs all assume short loop-able samples (drum breaks, single-bar percussion). For a full-song stem (3+ minutes), `.fit().chop(16)` compresses the entire song into one cycle then slices it — you get 16 chunks of ~13 seconds each playing inside ~1.94 seconds of cycle time, producing pure clipping chaos.

**The right idiom for long stems**:

```js
// Trigger ONCE every 108 cycles, sample plays through naturally
s("duke_drums").slow(108).cut(1).gain(0.7)
```

`.slow(N)` slows the trigger pattern by N — the sample fires once per N cycles, plays for its natural duration without retrigger overlap. Combine with `.cut(N)` per stem (different group per channel) to prevent any unintended re-triggering from creating doubled audio.

For "remix moves" on long stems, work at the cycle-pattern layer (mask sections, layer your own drums on top, swap one stem for a Strudel synth, automate gain across cycles) rather than chopping the stem itself.

### Sectioned overlay using cycle-aligned masks

For a 122-cycle song where chorus sections are at known cycle ranges (32–47, 64–79, 96–111), use a 16-cycle-resolution mask:

```js
// 8 steps × 16 cycles = 128 cycles ≈ song length
const chorusGate = "<0 0 1 0 1 0 1 0>".slow(16)

stack(
  s("duke_full").slow(122).cut(1),

  // chorus-only synth additions
  n("0 4 7 11").scale("F4:minor").s("gm_marimba")
    .gain(0.32).mask(chorusGate),

  note("<[f3,ab3,c4] [eb3,g3,bb3] [ab2,c3,eb3] [bb2,d3,f3]>")
    .s("supersaw").attack(0.4).release(2).gain(0.25)
    .mask(chorusGate)
)
```

Adjust the `<...>` step values to match where the chorus actually sits in your specific track.

---

## Stem separation (YouTube → vocals/drums/bass/other)

For remix work, `demucs` (Meta's hybrid transformer model) gives the best free 4-stem separation. On macOS arm64, the latest demucs ships with a `torchcodec` dependency that fails to load:

```
OSError: Could not load this library: libtorchcodec_core4.dylib
```

Pin to the older release that uses `torchaudio` directly:

```bash
uv tool install "demucs==4.0.1" --with "torchaudio<2.6" --with soundfile
yt-dlp -x --audio-format wav -o song.wav "<youtube-url>"
demucs -o stems/ song.wav
# → stems/htdemucs/song/{vocals,drums,bass,other}.wav
```

Each stem is the same length as the source. Convert to MP3 to keep loading fast in Strudel:

```bash
for f in vocals drums bass other; do
  ffmpeg -i stems/htdemucs/song/$f.wav -codec:a libmp3lame -b:a 192k stems/htdemucs/song/$f.mp3
done
```

Personal remixing only — do not redistribute the stems or any derivative work without sample clearance.

---

## Quick command reference for live sessions

```bash
# Start CORS-enabled local sample server (in your stems folder)
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

# Tunnel it (separate terminal)
cloudflared tunnel --url http://127.0.0.1:8765

# Verify tunnel and CORS
curl -sI --resolve <host>:443:104.16.230.132 "https://<host>/file.mp3"

# Find Strudel's exported WAV in Playwright's temp dir
find /var/folders -name "playwright-artifacts-*" -type d 2>/dev/null
```
