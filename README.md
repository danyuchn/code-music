# code-music — Live Coding 音樂玩具箱

零音樂基礎，用 Claude Code + Strudel 即時生成電子音樂。

## 想做什麼

像 Algorave 表演者那樣，在 strudel.cc 風格的環境裡 live coding 出音樂；但因為自己不會樂理，所以**讓 Claude 當副 DJ**：
- 我用感覺下令（「給我暗黑工業 techno」「再黑暗一點」「轉 ambient」）
- Claude 透過已裝好的 skill + 樂理知識，寫 Strudel pattern 並丟進播放器
- 我只負責下指令、聽感覺、決定方向

## 已裝的東西

### 1. `strudel-claude/` — 主舞台（Next.js + Strudel REPL + REST API）

來源：https://github.com/renatoworks/strudel-claude (39★, 1 issue)

**注意**：這個**不是傳統 MCP server**，而是「自帶網頁舞台 + REST API」。Claude Code 透過 `curl` POST 到 `localhost:3000/api/code` 寫入 pattern、`/api/play` 開始播放。優勢：不用註冊任何 MCP，啟動 dev server 就能用。

**內建 7 個 skill**（位於 `strudel-claude/.claude/skills/`，從該目錄啟動 Claude Code 自動載入）：
- `/strudel` — Strudel 語法 / mini-notation / 效果器 / 音階參考
- `/api` — REST API 傳輸層（push code / play / stop）
- `/tutorial` — 從零教 Strudel + 樂理
- `/dj-set` — 即時 DJ 表演模式
- `/compose` — 完整曲目創作
- `/interactive` — 互動式音樂創作
- `/visuals` — 加上 pianoroll / spiral / scope 視覺化

**內建 3 套示範曲**（`strudel-claude/tracks/`）— 直接複製貼上就能聽：
- `DOOM/` — DOOM 金屬風（兩首：Rip and Tear 132 BPM、Funeral for the Damned 67 BPM）
- `FRED/` — FRED again.. 風 melodic house
- `SOLOMUN/` — Solomun 風 deep house

**安全掃描 (2026-04-25)**：
- 源碼：CLEAN（無網路呼叫、無 eval、無 spawn）
- 依賴：7 個 npm 漏洞（1 HIGH + 5 MED + 1 LOW），全部在 `next 16.1.6`，皆為 DoS / CSRF bypass，**只影響公開部署，本機開發不受影響**
- 後續：可跑 `npm update next@latest` 升級到 16.1.7+ 解決

### 2. `.claude/skills/midi-generation/` — 樂理腦袋（Project-level Skill）

來源：https://github.com/tubone24/midi-agent-skill (9★, 0 issue)

**做什麼**：給 Claude 完整樂理知識，包含：
- `resources/music-theory.md` — 音階、和弦、終止式
- `resources/chord-progressions.md` — 各曲風和弦進行
- `resources/voice-leading.md` — 防止刺耳（半音衝突、音域分散規則）
- `resources/counterpoint.md` — 古典對位
- `resources/modes-scales.md` — 教會調式（Dorian / Phrygian 等）
- `resources/rhythm-patterns.md` — 節奏型、切分音
- `resources/orchestration.md` — 樂器音域、組合
- `skills/generate_midi.py` — 生 MIDI 檔
- `skills/convert_to_wav.py` — MIDI → WAV（需 FluidSynth）

**怎麼觸發**：說「composing」「generate MIDI」「melody」「chord progression」Claude 會自動載入。

**安全掃描**：CLEAN。

## 待你來啟動 Claude Code 後做的事

### Step 1：安裝 Strudel 舞台依賴

```bash
cd ~/code-music/strudel-claude
npm install
```
（會下載 ~200MB node_modules，第一次跑要等一下）

### Step 2：升級 next 修漏洞（可選但建議）

```bash
npm install next@latest
```

### Step 3：啟動舞台

```bash
npm run dev
```
打開 http://localhost:3000，全螢幕 Strudel 編輯器跑起來。

### Step 4：在另一個 terminal 啟動 Claude Code

**從 `strudel-claude/` 子目錄啟動**（這樣才會載入 7 個 strudel skill + midi-generation 軟連結）：

```bash
cd ~/code-music/strudel-claude
claude
```

跟它說：「我準備好了，請用 `/dj-set` 給我 5 分鐘暗黑工業 techno，140 BPM」

> **為什麼不從 `~/code-music/` 啟動？** Claude Code 只自動載入當前目錄 `.claude/skills/` 下的 skill。從根目錄啟動只會看到 midi-generation 一個 skill；從 `strudel-claude/` 啟動則會看到 8 個（7 個內建 + 1 個 midi-generation 軟連結）。

### Step 5（可選，進階）：裝真正的 MCP server

如果之後想用更專業的工具（FFT 頻譜分析、自動節奏偵測等 66 個工具），可考慮加裝 williamzujkowski/live-coding-music-mcp（196★）作為 project-level MCP：

```bash
claude mcp add -s project strudel-mcp -- npx -y @williamzujkowski/strudel-mcp-server
```

## 目錄結構

```
code-music/
├── README.md                          ← 本檔
├── .claude/
│   └── skills/
│       └── midi-generation/           ← 樂理 skill（project-level）
│           ├── SKILL.md
│           ├── resources/             ← 7 份樂理參考
│           ├── skills/                ← Python MIDI 生成腳本
│           └── ...
└── strudel-claude/                    ← Strudel 主舞台（Next.js）
    ├── README.md
    ├── package.json
    └── src/
```

## Project-level vs User-level 差異

| 範圍 | MCP 設定檔 | Skill 位置 |
|------|-----------|-----------|
| User | `~/.claude.json` | `~/.claude/skills/` |
| **Project（本專案用）** | `<project>/.mcp.json` | `<project>/.claude/skills/` |

本專案所有 MCP / Skill **只在這個目錄下生效**，不會污染其他專案。離開資料夾就消失。

## 已讀的調查資料

- 比對 5 個 Strudel MCP 候選（renatoworks 因 slash commands 對新手最友善 + REST 架構比 Playwright 穩）
- 比對 6+ 個音樂 skill（midi-agent-skill 因樂理最完整 + 0 issue + 不依賴 Suno 或外部 API 而選中）
- 排除：bitwize-music-studio (Suno 付費)、kennethleungty/claude-music (背景音樂非創作)、etbars/strudel-claude-music-generator (要 Claude API key)

詳見 2026-04-25 對話紀錄。
