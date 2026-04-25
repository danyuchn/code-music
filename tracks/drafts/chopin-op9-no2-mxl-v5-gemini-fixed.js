// Chopin Op.9 No.2 — v4（rubato 忽快忽慢）+ Larghetto 50 + 寧靜版設定
setcps(50/60/6)

let m0 = note("[bb4@4 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i0 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b0 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m1 = note("[g5@12 g5@4 f5@4 g5@4 f5@12 eb5@8 bb4@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i1 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b1 = note("[eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m2 = note("[g5@8 d5 c5 b4 c5 c6@8 g5@4 bb5@12 ab5@8 g5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i2 = note("[~ ~ ~ ~ e4@4 e4@4 ~ ~ ~ ~ e4@4 e4@4 ~ ~ ~ ~ c#4@4 e4@4 ~ ~ ~ ~ c4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b2 = note("[c2@4 g3@4 bb3@4 c3@4 g3@4 c4@4 f2@4 f3@4 bb3@4 f2@4 f3@4 ab3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m3 = note("[f5@12 g5@8 d5@4 eb5@12 c5@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i3 = note("[~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ f4@4 f4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 f#4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b3 = note("[bb2@4 f3@4 bb3@4 b2@4 g3@4 d4@4 c3@4 g3@4 c4@4 a2@4 f#3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m4 = note("[bb4@4 d6@4 c6@4 bb5@2 ab5@2 g5@2 ab5@2 c5@2 d5@2 eb5@12 ~ ~ ~ ~ ~ ~ ~ ~ bb4@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i4 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 ~ ~ ~ ~ ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b4 = note("[bb2@4 f3@4 bb3@4 bb1@4 f3@4 bb3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m5 = note("[g5@12 f5@2 g5@2 g5 f5 e5@2 f5@2 g5@2 f5@4 eb5@8 eb5@2 f5@2 f5 eb5 d5@2 eb5@2 f5@2]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i5 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b5 = note("[eb3@4 g3@4 bb3@4 eb3@4 ab3@4 b3@4 eb3@4 g3@4 bb3@4 d3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m6 = note("[g5@2 b4@2 c5@2 c#5@2 c5@2 f5@2 e5@2 ab5@2 g5@2 c#6@2 c6@2 g5@2 bb5@12 ab5@8 g5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i6 = note("[~ ~ ~ ~ e4@4 e4@4 ~ ~ ~ ~ e4@4 e4@4 ~ ~ ~ ~ c#4@4 e4@4 ~ ~ ~ ~ c4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b6 = note("[c3@4 g3@4 bb3@4 c3@4 g3@4 c4@4 f2@4 f3@4 bb3@4 f2@4 f3@4 ab3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m7 = note("[f5@12 g5@4 g5@4 d5@4 eb5@12 c5@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i7 = note("[~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ f4@4 f4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 f#4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b7 = note("[bb2@4 f3@4 bb3@4 b2@4 g3@4 d4@4 c3@4 g3@4 c4@4 a2@4 f#3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m8 = note("[bb4@4 d6@4 c6@4 bb5@2 ab5@2 g5@2 ab5@2 ab5 ~ d5@2 eb5@12 eb5@4 d5@4 eb5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.38).gain(rand.range(0.92, 1.0)).early(0.005)
let i8 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 ~ ~ ~ ~ ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.16).gain(rand.range(0.94, 1.0))
let b8 = note("[bb2@4 f3@4 bb3@4 bb1@4 f3@4 bb3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.22).gain(rand.range(0.95, 1.0))
let m9 = note("[f5@12 g5@8 f5@4 f5@12 c5@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.38).gain(rand.range(0.92, 1.0)).early(0.005)
let i9 = note("[~ ~ ~ ~ d4@4 f4@4 ~ ~ ~ ~ d4@4 f4@4 ~ ~ ~ ~ c4@4 f4@4 ~ ~ ~ ~ c4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.16).gain(rand.range(0.94, 1.0))
let b9 = note("[bb2@4 f3@4 bb3@4 bb2@4 f3@4 bb3@4 a2@4 f3@4 c4@4 a2@4 f3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.22).gain(rand.range(0.95, 1.0))
let m10 = note("[eb5@4 eb5@4 eb5@4 eb5@4 d5@2 eb5@2 f5@3 eb5 eb5@12 bb4@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.8075).gain(rand.range(0.92, 1.0)).early(0.005)
let i10 = note("[~ ~ ~ ~ c4@4 eb4@4 ~ ~ ~ ~ ~ ~ ~ ~ eb4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.34).gain(rand.range(0.94, 1.0))
let b10 = note("[ab2@4 eb3@4 ab3@4 ab1@4 eb3@4 ab3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.4675).gain(rand.range(0.95, 1.0))
let m11 = note("[bb5@12 a5@8 g5@4 f5@12 d5@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.8075).gain(rand.range(0.92, 1.0)).early(0.005)
let i11 = note("[~ ~ ~ ~ c#4@4 c#4@4 ~ ~ ~ ~ c4@4 c4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.34).gain(rand.range(0.94, 1.0))
let b11 = note("[e2@4 e3@4 bb3@4 e2@4 e3@4 bb3@4 f2@4 f3@4 c4@4 g2@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.4675).gain(rand.range(0.95, 1.0))
let m12 = note("[eb5@12 d5@4 c5@4 d5@4 bb4@4 b4@4 b4@4 c5@4 c5@4 d5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.57).gain(rand.range(0.92, 1.0)).early(0.005)
let i12 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 f4@4 f4@4 f#4@4 e4@4 e4@4 f4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.24).gain(rand.range(0.94, 1.0))
let b12 = note("[c2@4 g3@4 c4@4 f2@4 f3@4 c4@4 bb3@4 a3@4 ab3@4 g3@4 f3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.33).gain(rand.range(0.95, 1.0))
let m13 = note("[g5@8 a4@2 bb4@2 b4@2 bb4@2 c#5@2 d5@2 g5@3 f5 f5@8 eb5@4 eb5@2 f5@2 f5 eb5 d5@2 eb5@2 f5@2]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.57).gain(rand.range(0.92, 1.0)).early(0.005)
let i13 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.24).gain(rand.range(0.94, 1.0))
let b13 = note("[eb2@4 g3@4 bb3@4 eb3@4 ab3@4 bb3@4 eb3@4 g3@4 bb3@4 d3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.33).gain(rand.range(0.95, 1.0))
let m14 = note("[g5@2 b4@2 c5@2 c#5@2 c5@2 f5@2 e5@2 ab5@2 g5@2 c#6@2 c6@2 g5@2 bb5@12 ab5@8 g5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i14 = note("[~ ~ ~ ~ e4@4 e4@4 ~ ~ ~ ~ e4@4 e4@4 ~ ~ ~ ~ c#4@4 e4@4 ~ ~ ~ ~ c4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b14 = note("[c3@4 g3@4 bb3@4 c3@4 g3@4 c4@4 f2@4 f3@4 bb3@4 f2@4 f3@4 ab3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m15 = note("[f5@12 g5@4 g5@4 d5@4 eb5@12 c5@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i15 = note("[~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ f4@4 f4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 f#4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b15 = note("[bb2@4 f3@4 bb3@4 b2@4 g3@4 d4@4 c3@4 g3@4 c4@4 a2@4 f#3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m16 = note("[bb4@4 d6@4 c#6@4 c6 b5 bb5 a5 ab5 f5 d5 b4 bb4 d5 g5 f5 eb5@12 eb5@4 d5@4 eb5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i16 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b16 = note("[bb2@4 f3@4 bb3@4 bb1@4 f3@4 bb3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m17 = note("[f5@12 g5@8 f5@4 f5@12 c5@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i17 = note("[~ ~ ~ ~ d4@4 f4@4 ~ ~ ~ ~ d4@4 f4@4 ~ ~ ~ ~ c4@4 f4@4 ~ ~ ~ ~ c4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b17 = note("[bb2@4 f3@4 bb3@4 bb2@4 f3@4 bb3@4 a2@4 f3@4 c4@4 a2@4 f3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m18 = note("[eb5@3 eb5@3 eb5@3 eb5@3 eb5@4 d5@2 eb5@2 f5@3 eb5 eb5@12 bb4@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.8075).gain(rand.range(0.92, 1.0)).early(0.005)
let i18 = note("[~ ~ ~ ~ c4@4 eb4@4 ~ ~ ~ ~ ~ ~ ~ ~ eb4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.34).gain(rand.range(0.94, 1.0))
let b18 = note("[ab2@4 eb3@4 ab3@4 ab1@4 eb3@4 ab3@4 eb2@4 g3@4 bb3@4 eb2@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.4675).gain(rand.range(0.95, 1.0))
let m19 = note("[bb5@12 a5@8 g5@4 f5@12 d5@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.8075).gain(rand.range(0.92, 1.0)).early(0.005)
let i19 = note("[~ ~ ~ ~ c#4@4 c#4@4 ~ ~ ~ ~ c4@4 c4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.34).gain(rand.range(0.94, 1.0))
let b19 = note("[e2@4 e3@4 bb3@4 e2@4 e3@4 bb3@4 f2@4 f3@4 c4@4 g2@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.4675).gain(rand.range(0.95, 1.0))
let m20 = note("[eb5@12 d5@4 c5@4 d5@4 bb4@4 b4@4 b4@4 c5@4 c5@4 d5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.57).gain(rand.range(0.92, 1.0)).early(0.005)
let i20 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 f4@4 f4@4 f#4@4 e4@4 e4@4 f4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.24).gain(rand.range(0.94, 1.0))
let b20 = note("[c2@4 g3@4 c4@4 f2@4 f3@4 c4@4 bb3@4 a3@4 ab3@4 g3@4 f3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.33).gain(rand.range(0.95, 1.0))
let m21 = note("[g5@8 a4@2 bb4@2 b4@2 bb4@2 c#5@2 d5@2 g5@3 f5 f5@8 eb5@4 eb5@2 f5@2 eb5 f5 d5@2 eb5@2 f5@2]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.57).gain(rand.range(0.92, 1.0)).early(0.005)
let i21 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.24).gain(rand.range(0.94, 1.0))
let b21 = note("[eb2@4 g3@4 bb3@4 eb3@4 ab3@4 bb3@4 eb3@4 g3@4 bb3@4 d3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.33).gain(rand.range(0.95, 1.0))
let m22 = note("[g5@2 b4@2 c5@2 c#5@2 c5@2 f5@2 e5@2 ab5@2 g5@2 c#6@2 c6@2 g5@2 bb5@12 ab5@8 g5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.57).gain(rand.range(0.92, 1.0)).early(0.005)
let i22 = note("[~ ~ ~ ~ e4@4 e4@4 ~ ~ ~ ~ e4@4 e4@4 ~ ~ ~ ~ c#4@4 e4@4 ~ ~ ~ ~ c4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.24).gain(rand.range(0.94, 1.0))
let b22 = note("[c3@4 g3@4 bb3@4 c3@4 g3@4 c4@4 f2@4 f3@4 bb3@4 f2@4 f3@4 ab3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.33).gain(rand.range(0.95, 1.0))
let m23 = note("[f5@12 g5@4 g5@4 d5@4 eb5@12 c5@12]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.4845).gain(rand.range(0.92, 1.0)).early(0.005)
let i23 = note("[~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ f4@4 f4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 f#4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.24).gain(rand.range(0.94, 1.0))
let b23 = note("[bb2@4 f3@4 bb3@4 b2@4 g3@4 d4@4 c3@4 g3@4 c4@4 a2@4 f#3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.33).gain(rand.range(0.95, 1.0))
let m24 = note("[bb4@2 d6@4 c#6@2 c6@2 b5@2 bb5@2 a5@2 ab5@2 a4 c5 c#5 d5 g5 f5 eb5@24]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i24 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b24 = note("[bb2@4 f3@4 bb3@4 bb1@4 f3@4 bb3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m25 = note("[eb5@12 f5@4 eb5@4 f5@4 g5@24]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.38).gain(rand.range(0.92, 1.0)).early(0.005)
let i25 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.16).gain(rand.range(0.94, 1.0))
let b25 = note("[eb2@4 ab3@4 b3@4 eb3@4 ab3@4 b3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.22).gain(rand.range(0.95, 1.0))
let m26 = note("[eb5@12 eb5@2 f5@2 eb5@2 f5@2 eb5@2 f5@2 g5@8 f5 eb5 d5 eb5 eb6@4 d6@4 c6@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.38).gain(rand.range(0.92, 1.0)).early(0.005)
let i26 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.16).gain(rand.range(0.94, 1.0))
let b26 = note("[eb2@4 ab3@4 b3@4 eb3@4 ab3@4 b3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.22).gain(rand.range(0.95, 1.0))
let m27 = note("[bb5@8 a5@4 ab5@4 c5@4 d5@4 eb5@4 f5@2 f5 eb5 d5@2 eb5@2 g6@4 f6@2 eb6@2 d6@2 c6@2]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.38).gain(rand.range(0.92, 1.0)).early(0.005)
let i27 = note("[~ ~ ~ ~ d4@4 ~ ~ ~ ~ ~ ~ ~ ~ d4@4 ~ ~ ~ ~ ~ ~ ~ ~ eb4@4 ~ ~ ~ ~ ~ ~ ~ ~ eb4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.16).gain(rand.range(0.94, 1.0))
let b27 = note("[eb3@4 f3@4 bb3@4 eb3@4 f3@4 bb3@4 eb3@4 g3@4 bb3@4 a2@4 f3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.22).gain(rand.range(0.95, 1.0))
let m28 = note("[b5@4 bb5@4 a5@4 a5@2 ab5@2 ab5@2 g5@2 g5@3 f5 eb5@24]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.5225).gain(rand.range(0.92, 1.0)).early(0.005)
let i28 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ d4@4 d4@4 ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.22).gain(rand.range(0.94, 1.0))
let b28 = note("[bb2@4 f3@4 bb3@4 bb1@4 f3@4 bb3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.3025).gain(rand.range(0.95, 1.0))
let m29 = note("[eb5@12 eb5@2 f5@2 f5@2 eb5@2 f5@2 f5@2 eb5@24]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.8075).gain(rand.range(0.92, 1.0)).early(0.005)
let i29 = note("[~ ~ ~ ~ ~ ~ ~ ~ eb4@4 eb4@4 eb4@4 ~ ~ ~ ~ ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 eb4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.34).gain(rand.range(0.94, 1.0))
let b29 = note("[ab1@4 eb3@4 ab3@4 b3@4 ab3@4 eb3@4 eb2@4 g3@4 bb3@4 eb3@4 g3@4 bb3@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.4675).gain(rand.range(0.95, 1.0))
let m30 = note("[eb5@4 ab4@2 bb4@2 ab4 bb4 g4@2 ab4@2 b4@2 eb5@2 ab5@2 eb6@2 ~ f6 g6@4 eb6@4 eb7@8 d7@4 c7@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.8075).gain(rand.range(0.92, 1.0)).early(0.005)
let i30 = note("[~ ~ ~ ~ ~ ~ ~ ~ eb4@4 eb4@4 eb4@4 ~ ~ ~ ~ ~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ eb4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.34).gain(rand.range(0.94, 1.0))
let b30 = note("[ab1@4 eb3@4 ab3@4 b3@4 ab3@4 eb3@4 eb2@4 g3@4 bb3@4 a2@4 g3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.4675).gain(rand.range(0.95, 1.0))
let m31 = note("[b6@4 bb6@4 a6@4 ab6@4 g6@4 d6@4 eb6@4 eb7@12 f6@4 c7@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.9025).gain(rand.range(0.92, 1.0)).early(0.005)
let i31 = note("[~ ~ ~ ~ eb4@4 eb4@4 ~ ~ ~ ~ f4@4 f4@4 ~ ~ ~ ~ eb4@4 c4@4 ~ ~ ~ ~ eb4@4 f4@4]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.38).gain(rand.range(0.94, 1.0))
let b31 = note("[bb2@4 f3@4 bb3@4 b2@4 g3@4 d4@4 c3@4 g3@4 c4@4 a2@4 f3@4 c4@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.5225).gain(rand.range(0.95, 1.0))
let m32 = note("[b6@24 bb6@24]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.9025).gain(rand.range(0.92, 1.0)).early(0.005)
let i32 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ d4@3 ~ ~ ~ f4@3 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.38).gain(rand.range(0.94, 1.0))
let b32 = note("[bb1@3 bb2@3 f3@3 ab3@3 d4@3 bb3@3 f4@3 ab4@3 d5@24]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.5225).gain(rand.range(0.95, 1.0))
let m33 = note("[b6 bb6 c7 a6 b6 bb6 c7 a6 b6 bb6 c7 a6 b6 bb6 c7 a6 b6 bb6 c7 a6 b6 bb6 c7 a6 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.38).gain(rand.range(0.92, 1.0)).early(0.005)
let i33 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.16).gain(rand.range(0.94, 1.0))
let b33 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.22).gain(rand.range(0.95, 1.0))
let m34 = note("[b6 bb6 c7 a6 b6 bb6 c7 a6 b6 bb6 c7 a6 b6 bb6 c7 a6 b6 bb6 c7 a6 b6 bb6 c7 a6 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.285).gain(rand.range(0.92, 1.0)).early(0.005)
let i34 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.12).gain(rand.range(0.94, 1.0))
let b34 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.165).gain(rand.range(0.95, 1.0))
let m35 = note("[b6 bb6 d7 c7 bb6 a6 ab6 g6 f6 d6 eb6 c6 bb5 ab5 c5 d5 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.285).gain(rand.range(0.92, 1.0)).early(0.005)
let i35 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.12).gain(rand.range(0.94, 1.0))
let b35 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.165).gain(rand.range(0.95, 1.0))
let m36 = note("[eb5@4 bb4@4 g5@4 eb5@4 bb4@4 g5@4 eb5@4 bb4@4 g5@4 eb5@4 bb4@4 g5@4]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.285).gain(rand.range(0.92, 1.0)).early(0.005)
let i36 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.12).gain(rand.range(0.94, 1.0))
let b36 = note("[eb2@4 bb3@4 bb2@4 eb3@4 bb3@4 bb2@4 eb2@4 bb3@4 bb2@4 eb3@4 bb3@4 bb2@4]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.165).gain(rand.range(0.95, 1.0))
let m37 = note("[eb5@12 eb6@12 eb4@24]").s("piano").room(0.85).attack(0.04).release(3.0).gain(0.285).gain(rand.range(0.92, 1.0)).early(0.005)
let i37 = note("[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ eb4@12 eb4@24]").s("piano").room(0.7).attack(0.06).release(2.5).gain(0.12).gain(rand.range(0.94, 1.0))
let b37 = note("[eb3@12 eb4@12 eb2@24]").s("piano").room(0.55).attack(0.04).release(2.0).gain(0.165).gain(rand.range(0.95, 1.0))

arrange(
  [1.0, stack(b0, i0, m0)],
  [1.0, stack(b1, i1, m1)],
  [1.0, stack(b2, i2, m2)],
  [1.05, stack(b3, i3, m3)],
  [1.0, stack(b4, i4, m4)],
  [1.0, stack(b5, i5, m5)],
  [1.0, stack(b6, i6, m6)],
  [1.1, stack(b7, i7, m7)],
  [1.05, stack(b8, i8, m8)],
  [1.1, stack(b9, i9, m9)],
  [0.95, stack(b10, i10, m10)],
  [0.95, stack(b11, i11, m11)],
  [1.0, stack(b12, i12, m12)],
  [1.15, stack(b13, i13, m13)],
  [1.05, stack(b14, i14, m14)],
  [1.1, stack(b15, i15, m15)],
  [1.05, stack(b16, i16, m16)],
  [1.0, stack(b17, i17, m17)],
  [1.0, stack(b18, i18, m18)],
  [1.0, stack(b19, i19, m19)],
  [1.0, stack(b20, i20, m20)],
  [1.0, stack(b21, i21, m21)],
  [1.0, stack(b22, i22, m22)],
  [1.1, stack(b23, i23, m23)],
  [0.95, stack(b24, i24, m24)],
  [0.93, stack(b25, i25, m25)],
  [0.95, stack(b26, i26, m26)],
  [1.0, stack(b27, i27, m27)],
  [1.0, stack(b28, i28, m28)],
  [1.05, stack(b29, i29, m29)],
  [1.4, stack(b30, i30, m30)],
  [1.05, stack(b31, i31, m31)],
  [1.3, stack(b32, i32, m32)],
  [1.45, stack(b33, i33, m33)],
  [1.6, stack(b34, i34, m34)],
  [1.8, stack(b35, i35, m35)],
  [2.1, stack(b36, i36, m36)],
  [2.6, stack(b37, i37, m37)]
)