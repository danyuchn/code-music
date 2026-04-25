# Claude Code + Live Coding — Beginner References

Real-world reports from people who paired Claude Code (or similar AI agents)
with Strudel / live coding — with a focus on those who started with **zero
music or coding experience**. Use this when you need encouragement that the
zero-experience path is real, or when looking for alternative tools to try.

Last refresh: 2026-04-25.

---

## Closest-to-zero-experience case studies

### 1. thereallo.dev — "Canon in D in 15 minutes"

- **Background**: no prior live coding experience
- **Setup**: Claude Sonnet + Strudel MCP (same family as ours)
- **Outcome**: working Canon in D recreation in 15 minutes
- **Quote (paraphrased)**: "Faster than I'd ever been productive in any DAW.
  If you can read basic code, you can make music with Strudel."
- Source: <https://thereallo.dev/blog/live-coding-music-with-strudel>

### 2. thoughtwax — "Live-coding music with AI" (2025-06)

- **Background**: had never used Strudel before
- **Workflow** (worth copying):
  1. Describe the style/mood to Claude
  2. Claude generates Strudel code
  3. Human comments lines in / out (`//`) to sculpt the mix
  4. Iterate with follow-up prompts
- **Honest pitfall**: Claude hallucinated sample filenames that don't exist
  (already documented in our `strudel-live-coding-notes.md`)
- **Author's framing**: "Like picking from a curated bank of samples, then
  refining."
- Source: <http://thoughtwax.com/2025/06/live-coding/>

### 3. renatoworks/strudel-claude — the project we already have locally

- **Author's claim**: "No prior music theory or coding knowledge required"
- Built-in skill paths: tutorial / DJ set / full composition / interactive
- Trigger by saying "Teach me Strudel" inside Claude Code
- Source: <https://github.com/renatoworks/strudel-claude>

---

## Common patterns across these accounts

| Observation | Implication for a zero-experience user |
|---|---|
| None were trained musicians | Zero background is fine; no theory required |
| All used "describe style → AI writes → human curates" loop | Listening taste is enough; you don't need to write notes |
| All hit Claude's sample-name hallucination | Expected. Not a blocker. Already in our notes |
| All said it was faster than learning a DAW | Live coding has a much shallower beginner curve |
| All recommend modifying existing patterns first | Start from "give me dark techno", not blank slate |

---

## Alternative AI + Strudel projects to study later

These are variants worth knowing exist; not needed for day-one learning.

| Project | Distinct angle | Link |
|---|---|---|
| **Apfelstrudel** (rcarmo) | Chat-UI integrated; uses OpenAI rather than Claude | <https://github.com/rcarmo/apfelstrudel> |
| **param-strudels** | Emphasis on autonomous AI agent behavior | <https://github.com/Paramstr/param-strudels> |
| **strudellm** (tambo-ai) | Chat-driven Strudel control | <https://github.com/tambo-ai/strudellm> |
| **DJ Claude** (p-poss) | Multi-agent collaboration, 22 presets, 8 vibes — most DJ-oriented | <https://github.com/p-poss/dj-claude> |
| **strudel-mcp-bridge** (phildougherty) | Alternative MCP bridge implementation for comparison | <https://github.com/phildougherty/strudel-mcp-bridge> |
| **strands-strudel** (cagataycali) | Strands Agents tool with WebSocket playback | <https://github.com/cagataycali/strands-strudel> |
| **StrudelLive** (IAmSpring) | Another open-source angle | <https://github.com/IAmSpring/StrudelLive> |
| **strudel-claude-music-generator** (etbars) | Uses Claude API directly, advanced pattern generation | <https://github.com/etbars/strudel-claude-music-generator> |
| **mcp-music-studio** (linxule) | Two-mode: ABC notation + Strudel, sheet music rendering | <https://github.com/linxule/mcp-music-studio> |

The MCP server we already use:
**williamzujkowski/strudel-mcp-server** — <https://github.com/williamzujkowski/strudel-mcp-server>

---

## Long-form articles worth re-reading

- **Skywork.ai engineer guide** — full technical walkthrough of the Strudel MCP:
  <https://skywork.ai/skypage/en/ai-engineer-guide-strudel-live-coding/1981613226920611840>
- **Mirakl Tech Blog: Beats, Bytes, and Basslines** — gentle intro to Strudel
  with practical examples:
  <https://mirakl.tech/beats-bytes-and-basslines-an-introduction-to-live-coding-with-strudel-cc-4d378e86d5b7>
- **Nicholas Griffin: Creating Strudel Live Coding Patterns with AI**:
  <https://nicholasgriffin.dev/blog/creating-strudel-live-coding-patterns-with-ai/>
- **Hacker News thread on Apfelstrudel** (low engagement, but a starting
  point for finding more discussions):
  <https://news.ycombinator.com/item?id=46924897>

---

## SOP for absolute beginners (distilled)

1. Don't learn music theory first — open Strudel and ask Claude to play
   something.
2. Tell Claude a vibe: `"give me a 90 BPM dark techno 4-bar loop"`.
3. Listen. Respond with feel-based feedback only:
   `"darker"` / `"kick is weak"` / `"add a hi-hat"`.
4. Iterate 3–6 times until you like it.
5. For a set, ask: `"plan a 5-minute DJ set structure"` — triggers `/dj-set`.
6. For a full track: `"compose a 3-minute synthwave track"` — triggers
   `/compose`.

---

## How to refresh this document

- Search Reddit `r/livecoding` for `"Claude"` or `"AI"` mentions every few
  months
- Check GitHub topic `strudel` filtered by recent for new MCP variants
- Watch the Apfelstrudel and DJ Claude repos for issues / discussions where
  beginners share workflow learnings
- Hacker News search: `apfelstrudel OR strudel claude live coding`
