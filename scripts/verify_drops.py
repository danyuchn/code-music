"""Verify drop / breakdown timing via low-band spectral energy.

LLM (Gemini, GPT) often confuse "high-energy synth phrase" with "drop downbeat".
Drop = bass + kick slamming back after silence. Looking at 30-150 Hz energy
makes drops obvious — bass goes from <15 to >40 in one second.

Usage:
    uv run python scripts/verify_drops.py <audio.mp3>
    uv run python scripts/verify_drops.py <audio.mp3> --window 60 120
"""
import argparse
import sys

import numpy as np
import librosa


def detect_drops(audio_path: str, t_start: int = 0, t_end: int | None = None) -> list[dict]:
    print(f"Loading {audio_path}...", flush=True)
    y, sr = librosa.load(audio_path, sr=22050, mono=True)
    duration = len(y) / sr
    if t_end is None:
        t_end = int(duration)

    hop = 512
    S = np.abs(librosa.stft(y, hop_length=hop))
    freqs = librosa.fft_frequencies(sr=sr)
    times = librosa.frames_to_time(np.arange(S.shape[1]), sr=sr, hop_length=hop)

    bass = S[(freqs >= 30) & (freqs <= 150)].mean(axis=0)
    lead = S[(freqs >= 1500) & (freqs <= 4000)].mean(axis=0)

    # Per-second aggregates
    sec_bass = []
    sec_lead = []
    for t in range(int(duration)):
        mask = (times >= t) & (times < t + 1)
        sec_bass.append(bass[mask].mean() if mask.any() else 0)
        sec_lead.append(lead[mask].mean() if mask.any() else 0)
    sec_bass = np.array(sec_bass)
    sec_lead = np.array(sec_lead)

    # Drop detection: bass jumps >25 within 1s after being <20 for >=2s
    drops = []
    for t in range(2, len(sec_bass)):
        prev_low = (sec_bass[t - 2 : t] < 20).all()
        slam = sec_bass[t] > 40 and sec_bass[t] - sec_bass[t - 1] > 25
        if prev_low and slam:
            drops.append({"time_sec": t, "mmss": f"{t//60}:{t%60:02d}", "bass_energy": float(sec_bass[t])})

    # Breakdowns: bass < 20 for >=4 consecutive seconds
    in_break = sec_bass < 20
    breakdowns = []
    start = None
    for t, on in enumerate(in_break):
        if on and start is None:
            start = t
        elif not on and start is not None:
            if t - start >= 4:
                breakdowns.append({
                    "start_sec": start, "end_sec": t,
                    "start_mmss": f"{start//60}:{start%60:02d}",
                    "end_mmss": f"{t//60}:{t%60:02d}",
                    "duration_sec": t - start,
                })
            start = None
    if start is not None and len(in_break) - start >= 4:
        breakdowns.append({
            "start_sec": start, "end_sec": len(in_break),
            "start_mmss": f"{start//60}:{start%60:02d}",
            "end_mmss": f"{len(in_break)//60}:{len(in_break)%60:02d}",
            "duration_sec": len(in_break) - start,
        })

    print(f"\nDuration: {duration:.1f}s")
    print(f"\n=== Detected DROPS (bass slam after silence) ===")
    for i, d in enumerate(drops, 1):
        print(f"  Drop {i}: {d['mmss']} (bass jumps to {d['bass_energy']:.1f})")
    print(f"\n=== Detected BREAKDOWNS (bass <20 for ≥4s) ===")
    for b in breakdowns:
        print(f"  {b['start_mmss']} - {b['end_mmss']} ({b['duration_sec']}s)")

    # Print energy table for the requested window (default: print all if requested)
    if t_end - t_start <= 120:
        print(f"\n=== Energy table {t_start}s - {t_end}s ===")
        print(f"{'time':>5} {'bass':>7} {'lead':>7}")
        for t in range(t_start, min(t_end, int(duration))):
            print(f"{t//60}:{t%60:02d}  {sec_bass[t]:7.2f}  {sec_lead[t]:7.2f}")

    return drops


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("audio")
    parser.add_argument("--window", nargs=2, type=int, metavar=("START", "END"), default=[0, 0])
    args = parser.parse_args()
    s, e = args.window
    detect_drops(args.audio, s, e if e else None)
