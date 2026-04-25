// Chopin-style Original Nocturne in C# minor
// 草稿存檔 2026-04-25 by Dustin
// 原創（蕭邦風格）— 不是改編現有曲目
//
// 結構：50 cycles ≈ 3 分鐘 @ 66 BPM
//   intro 4 / theme A 8 / variation 8 / bridge 6 / theme A return 8
//   / climax 4 / coda 6 / cadence 2 / suspended chord 4
//
// 配方：
//   - C# minor harmonic
//   - 左手跨八度分解和弦（Op.9 No.2 影子）
//   - 右手抒情長句 + 內聲部 + 裝飾音
//   - Cadenza 飛跑句（harmonic minor scale）

setcps(0.275)

let lhArp = note("<[c#2 g#2 c#3 e3 g#3 e3 c#3 g#2] [a1 e2 a2 c#3 e3 c#3 a2 e2] [b1 f#2 b2 d#3 f#3 d#3 b2 f#2] [g#1 d#2 g#2 c3 d#3 c3 g#2 d#2]>")
  .s("piano").gain(0.55).room(0.4).attack(0.02).release(1.2)

let lhSimple = note("<c#2 a1 b1 g#1 f#1 b1 c#2 c#2>")
  .s("piano").gain(0.5).room(0.4).attack(0.02).release(0.8)

let melodyA = note("<c#5 ~ b4 [a4 g#4] [f#4 e4] f#4 ~ g#4>/2")
  .s("piano").gain(0.7).room(0.5).attack(0.03).release(0.9)

let melodyB = note("<[g#5 a5] g#5 [f#5 e5] d#5 c#5 ~ b4 c#5>/2")
  .s("piano").gain(0.7).room(0.5).attack(0.03).release(0.9)

let ornament = note("[c#5 d#5 c#5 b4]*2")
  .s("piano").gain(0.5).room(0.6).attack(0.01).release(0.4)

let inner = note("<[e4 g#4] [f#4 a4] [e4 g#4] [d#4 f#4]>")
  .s("piano").gain(0.4).room(0.4).attack(0.05).release(0.8)

let climax = note("<[c#5,e5,g#5,c#6] [a4,c#5,e5,a5] [b4,d#5,f#5,b5] [g#4,b4,d#5,g#5]>")
  .s("piano").gain(0.85).room(0.5).attack(0.02).release(1.5)

let cadenza = n("0 3 5 7 8 10 12 15 17 15 12 10 8 7 5 3").scale("C#4:minor:harmonic")
  .s("piano").gain(0.5).room(0.6).fast(2).attack(0.01).release(0.3)

let ambient = note("[c#3,g#3,c#4]").s("piano")
  .gain(0.18).attack(2).release(4).room(0.9)

arrange(
  [4, stack(melodyA.gain(0.4), ambient)],
  [8, stack(lhArp, melodyA, ambient.gain(0.1))],
  [8, stack(lhArp, melodyA, inner, ornament.gain(0.3))],
  [6, stack(lhSimple, melodyB, inner.gain(0.3), ambient)],
  [8, stack(lhArp, melodyA, ornament, inner)],
  [4, stack(lhArp, climax, cadenza.gain(0.3), ornament.gain(0.4))],
  [6, stack(lhSimple.gain(0.4), melodyA.gain(0.5), ambient)],
  [2, stack(ambient, melodyA.slow(2).gain(0.3))],
  [4, ambient.gain(0.2).room(1)]
)
