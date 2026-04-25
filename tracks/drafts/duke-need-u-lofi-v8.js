// Duke "Need U (100%)" — Lo-Fi Remix v8
// 草稿存檔 2026-04-25 by Dustin
//
// 來源：Duke Dumont feat. A*M*E - "Need U (100%)" extended/club mix (3:55)
// 原曲：F minor / 123.05 BPM / Camelot 4A
// Stems：~/code-music/tracks/remix-stems/duke-stems/ (demucs htdemucs)
//
// 結構（透過 librosa 頻譜驗證，drop 對齊真 bass slam）：
//   0:00-1:13  intro/build       (cycles 0-37)
//   1:13-1:17  pre-Drop1 riser   (37-39)
//   1:17-2:15  DROP 1            (39-69)
//   2:15-2:50  breakdown         (69-87)  ← 主 chop 區
//   2:50-3:17  DROP 2            (87-101)
//   3:17-3:21  pre-Drop3 riser   (101-103)
//   3:21-3:55  DROP 3            (103-122)
//
// 使用素材：vocals(:3) + other(:2)，bass/drums 換自家 lo-fi kit
//
// 載入方式：複製整段貼到 Strudel REPL，按 Play

setcps(123.05/240)

const drumGate  = "0@39 1@30 0@18 1@14 0@2 1@19".slow(122)
const riserGate = "0@37 1@2 0@46 1@2 0@14 1@2 0@19".slow(122)
const breakGate = "0@69 1@18 0@35".slow(122)

stack(
  s("duke-stems:3").struct("1".slow(122)).cut(1)
    .gain(1.0).room(0.2),

  s("duke-stems:2").struct("1".slow(122)).cut(2)
    .gain(0.75).lpf(sine.range(3500, 7000).slow(32)).room(0.25),

  s("duke-stems:3").begin(0.42).end(0.428).cut(3)
    .struct("1 ~ ~ 1 ~ ~ ~ ~").mask(breakGate)
    .gain(0.6).delay(0.3).delaytime(0.125).delayfb(0.4)
    .pan(0.7).hpf(300),

  s("duke-stems:3").begin(0.6).end(0.62).rev().cut(5)
    .struct("1".slow(2)).mask(riserGate)
    .gain(0.65).room(0.6).hpf(600),

  s("duke-stems:3").begin(0.3).end(0.305).cut(6)
    .struct("1 ~ ~ ~ 1 ~ ~ ~".slow(2))
    .mask(breakGate)
    .gain(0.4).speed(0.5).lpf(2000).room(0.6).pan(0.5),

  s("bd:5*4").gain(0.65).lpf(1500).mask(drumGate),
  s("~ cp ~ cp").gain(0.4).room(0.3).mask(drumGate),
  s("hh*16").gain(0.12).lpf(6500)
    .pan(sine.range(0.3, 0.7).fast(2)).mask(drumGate),
  s("~ ~ ~ oh").gain(0.2).lpf(5000).mask(drumGate),

  note("<f1 f1 f1 f1 f1 f1 f1 f1 f1 f1 f1 f1 db1 db1 eb1 eb1>".slow(4))
    .s("sawtooth").gain(0.45).lpf(140).attack(0.02).release(0.4)
    .mask(drumGate),
  note("<f2 ~ c3 ~ ab2 ~ c3 ~>".slow(2))
    .s("sawtooth").gain(0.3)
    .lpf(sine.range(400, 1800).slow(8)).lpq(12)
    .attack(0.01).release(0.2).mask(drumGate),

  s("white").struct("1*16".slow(2)).cut(8)
    .gain(0.25).hpf(sine.range(500, 8000).slow(2)).room(0.3)
    .mask(riserGate)
)
