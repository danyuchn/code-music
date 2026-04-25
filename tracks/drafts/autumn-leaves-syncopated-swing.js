// 🍂 AUTUMN LEAVES - SYNCOPATED SWING EDITION 🍂
// Joseph Kosma 1945, Real Book key (E minor)
// 110 BPM · 52 cycles ≈ 1:54
// Features:
//   - Real Book head melody + Bridge C section ("Since you went away")
//   - Sax + muted trumpet harmonized in 3rds
//   - Jazz ride pattern (triplet-feel ding ~ ~ ding ~ da)
//   - Charleston comp on "and-of-2" / "and-of-4"
//   - Anticipation: long notes enter on "and-of-4" of previous bar
//   - Walking bass with 8th-note skips on beat 4
//   - Bebop-aware solo with enclosures + chromatic passing tones
setcps(0.458)

// === WALKING BASS with 8th-note skips on beat 4 ===
let walkingA = note(`<
  [a2 c3 e3 [g3 a3]]
  [d2 f#2 a2 [c3 b2]]
  [g2 b2 d3 [f#3 g3]]
  [c3 e3 g3 [b3 a3]]
  [f#2 a2 c3 [e3 d3]]
  [b2 d#3 f#3 [a3 g#3]]
  [e2 g2 b2 [d3 c3]]
  [e2 b2 [a2 g2] f#2]
>`).s("gm_acoustic_bass").gain(0.6).lpf(500).attack(0.01).release(0.3)

let walkingC = note(`<
  [f#2 a2 c3 [e3 d3]]
  [b2 d#3 f#3 [a3 g#3]]
  [e2 g2 b2 [d3 c3]]
  [a2 c#3 e3 [g3 f#3]]
  [d2 f2 a2 [c3 b2]]
  [g2 b2 d3 [f3 e3]]
  [c3 e3 g3 [b3 a3]]
  [f#2 a2 b2 [d#3 e3]]
>`).s("gm_acoustic_bass").gain(0.6).lpf(500).attack(0.01).release(0.3)

// === JAZZ RIDE - classic ding-ding-a swing pattern (triplet feel) ===
// 12 subdivisions per cycle: ding . . ding . da ding . . ding . da
let ride = s("hh ~ ~ hh ~ hh hh ~ ~ hh ~ hh").gain("0.5 0 0 0.35 0 0.4 0.5 0 0 0.35 0 0.4").lpf(6500).room(0.3)
let kick = s("bd ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~").gain(0.45).lpf(200)  // sparse "feathered" kick
// Snare brush on "and of 2" and "and of 4" (12-grid: position 5 and 11)
let brush = s("~ ~ ~ ~ ~ sd:2 ~ ~ ~ ~ ~ sd:2").gain(0.32).lpf(3000).room(0.45)

// === CHARLESTON COMP - chord stabs on "and of 2" and "and of 4" ===
// 8-grid: ~ ~ ~ x ~ ~ ~ x  → hits push against the beat
let compA = note(`<
  [c4,e4,g4] [f#3,a3,c4] [b3,d4,f#4] [e4,g4,b4]
  [a3,c4,e4] [d#4,f#4,a4] [g3,b3,e4] [g3,b3,e4]
>`).s("gm_epiano1").gain(0.32).struct("~ ~ ~ x ~ ~ ~ x").room(0.4).lpf(2500)

let compC = note(`<
  [a3,c4,e4] [d#4,f#4,a4] [g3,b3,e4] [c#4,e4,g4]
  [f3,a3,c4] [b3,d4,f4] [e4,g4,b4] [a3,c4,d#4]
>`).s("gm_epiano1").gain(0.32).struct("~ ~ ~ x ~ ~ ~ x").room(0.4).lpf(2500)

// Occasional Charleston accent (beat 1 + and-of-2)
let compAccent = note(`<
  [c4,e4,g4] ~ [b3,d4,f#4] ~ [a3,c4,e4] ~ [g3,b3,e4] ~
>`).s("gm_epiano1").gain(0.28).struct("x ~ ~ x ~ ~ ~ ~").room(0.5).lpf(2400)

// === HEAD with ANTICIPATION ===
// Long notes arrive on "and of 4" of previous bar (8th early)
// 8-grid per cycle: 1 . 2 . 3 . 4 .
let head = note(`<
  [~ ~ ~ ~ e4 f#4 g4 a4]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ d4 e4 f#4 g4]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ c4 d4 e4 f#4]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ g4 f#4 e4 ~ d#4 e4]
  [~ ~ ~ ~ ~ ~ ~ ~]
>`).s("gm_alto_sax").gain(0.5).room(0.5)
   .attack(0.05).release(1.2).vib(4).vibmod(0.18).lpf(3500)

// Trumpet harmony - same anticipated rhythm a 3rd below
let headHarmony = note(`<
  [~ ~ ~ ~ c4 d4 e4 f4]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ b3 c4 d4 e4]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ a3 b3 c4 d4]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ e4 d4 c4 ~ b3 c4]
  [~ ~ ~ ~ ~ ~ ~ ~]
>`).s("gm_muted_trumpet").gain(0.32).room(0.55)
   .attack(0.05).release(1.2).lpf(3000)

// Piano fills - syncopated arpeggios on the held bars (and-of-1 + and-of-3)
let fills = note(`<
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ a4 ~ c5 ~ e5 ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ g4 ~ b4 ~ d5 ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ f#4 ~ a4 ~ c5 ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ b3 ~ e4 ~ g4 ~ b4]
>`).s("gm_acoustic_grand_piano").gain(0.38).room(0.5).lpf(4000).attack(0.01).release(0.3)

// === BRIDGE C - "Since you went away" with off-beat phrasing ===
let bridge = note(`<
  [~ ~ c4 ~ d4 ~ e4 ~]
  [f#4 ~ ~ f4 ~ e4 ~ ~]
  [d#4 ~ ~ ~ e4 ~ ~ ~]
  [c#4 ~ ~ b3 ~ a3 ~ ~]
  [f4 ~ ~ e4 ~ d4 ~ ~]
  [c4 ~ ~ b3 ~ a3 ~ ~]
  [g4 ~ ~ f4 ~ e4 ~ ~]
  [d#4 ~ ~ ~ ~ b3 ~ ~]
>`).s("gm_alto_sax").gain(0.52).room(0.55)
   .attack(0.06).release(0.5).vib(5).vibmod(0.2).lpf(3600)

let bridgeHarmony = note(`<
  [~ ~ a3 ~ b3 ~ c4 ~]
  [d4 ~ ~ c#4 ~ c4 ~ ~]
  [b3 ~ ~ ~ c4 ~ ~ ~]
  [a3 ~ ~ g3 ~ f#3 ~ ~]
  [d4 ~ ~ c4 ~ b3 ~ ~]
  [a3 ~ ~ g3 ~ f#3 ~ ~]
  [e4 ~ ~ d4 ~ c4 ~ ~]
  [b3 ~ ~ ~ ~ g3 ~ ~]
>`).s("gm_muted_trumpet").gain(0.3).room(0.55)
   .attack(0.05).release(0.5).lpf(3000)

// === LYRICAL SAX SOLO with heavy syncopation ===
// Phrases start on "and of" beats, not downbeats
let saxSolo = note(`<
  [~ ~ e4 ~ ~ g4 a4 ~]
  [~ ~ c5 b4 ~ a4 ~ g4]
  [~ a4 ~ g4 f#4 ~ ~ d4]
  [~ ~ ~ g4 ~ ~ d4 ~]
  [~ ~ c4 ~ e4 ~ ~ g4]
  [~ a4 ~ ~ f#4 ~ a4 g4]
  [~ f#4 e4 ~ d#4 ~ e4 ~]
  [b3 ~ ~ ~ ~ ~ ~ ~]
>`).s("gm_alto_sax").gain(0.5).room(0.5)
   .attack(0.05).release(0.5).vib(5).vibmod(0.2).lpf(3500)

// Trumpet counter-melody on alternating off-beats
let trumpetCounter = note(`<
  [~ c4 ~ ~ ~ ~ ~ ~]
  [~ ~ ~ e4 ~ ~ d4 ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ b3 ~ ~ ~ a3 ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ d4 ~ ~ ~ e4 ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ g3 ~ b3 ~ d4 ~ ~]
>`).s("gm_muted_trumpet").gain(0.28).room(0.6)
   .attack(0.04).release(0.5).delay(0.15).delaytime(0.375).delayfeedback(0.2)

// === TRADE FOURS with syncopated phrasing ===
let saxTrade = note(`<
  [~ a3 c4 ~ e4 ~ g4 a4]
  [~ ~ f#4 d4 ~ c4 b3 ~]
  [~ b3 ~ d4 f#4 ~ a4 g4]
  [~ g4 e4 ~ b3 ~ e4 ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
>`).s("gm_alto_sax").gain(0.5).room(0.5).attack(0.04).vib(4).lpf(3800)

let trumpetTrade = note(`<
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ ~ ~ ~ ~ ~ ~]
  [~ ~ c5 ~ e5 ~ ~ a4]
  [~ d#5 ~ f#5 ~ ~ d#5 b4]
  [~ ~ b4 d5 ~ e5 d5 ~]
  [g4 ~ e5 ~ b4 ~ e4 ~]
>`).s("gm_muted_trumpet").gain(0.45).room(0.6).attack(0.05).release(0.4)
   .delay(0.15).delaytime(0.375).delayfeedback(0.25)

// === ATMOSPHERE ===
let air = s("white").lpf(400).gain(0.025).room(1)
let pad = note("[e2,g2,b2,d3]").s("gm_pad_warm").gain(0.14).attack(2).release(3).room(0.85)

arrange(
  // INTRO - bass + ride lock in the swing
  [4, stack(walkingA, ride.gain(0.3), brush, air, pad)],

  // HEAD A - anticipated melody with off-beat comping
  [8, stack(walkingA, ride, brush, kick, compA, head, headHarmony, fills, air, pad)],

  // BRIDGE C - syncopated descending phrase
  [8, stack(walkingC, ride, brush, kick, compC, bridge, bridgeHarmony, air, pad)],

  // SOLO - off-beat phrasing
  [8, stack(walkingA, ride, brush, kick, compAccent, saxSolo, trumpetCounter, air, pad)],

  // TRADE - sax 4 / trumpet 4, both syncopated
  [8, stack(walkingA, ride, brush, kick, compAccent, saxTrade, trumpetTrade, air, pad)],

  // HEAD OUT - return with anticipation
  [8, stack(walkingA, ride, brush, kick, compA, head, headHarmony, fills, air, pad)],

  // OUTRO
  [4, stack(walkingA, ride.gain(0.3), brush, compAccent.gain(0.2), head.slow(2).gain(0.3), pad, air)],
)
