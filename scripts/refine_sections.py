"""Refine section detection: finer boundaries + chorus identification.

副歌判準：能量高 + 結構重複（chroma + mfcc 相似度找循環段）

Usage: uv run python scripts/refine_sections.py <audio.mp3>
"""
import sys
import json
from pathlib import Path

import numpy as np
import librosa


def main(audio_path: str) -> dict:
    print(f"Loading {audio_path}...", flush=True)
    y, sr = librosa.load(audio_path, sr=22050, mono=True)
    duration = len(y) / sr
    hop = 512

    # --- Boundaries via beat-synced features + novelty ---
    print("Beat tracking...", flush=True)
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr, hop_length=hop)
    beat_times = librosa.frames_to_time(beats, sr=sr, hop_length=hop)

    print("Multi-feature segmentation...", flush=True)
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr, hop_length=hop)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, hop_length=hop, n_mfcc=13)

    # Beat-sync features
    chroma_b = librosa.util.sync(chroma, beats, aggregate=np.median)
    mfcc_b = librosa.util.sync(mfcc, beats, aggregate=np.mean)

    # Stack features
    feat = np.vstack([chroma_b, mfcc_b])

    # Use higher k to get finer slices
    print("Agglomerative segmentation k=16...", flush=True)
    bound_beats = librosa.segment.agglomerative(feat, k=16)
    bound_times = beat_times[np.clip(bound_beats, 0, len(beat_times) - 1)]
    bound_times = np.append(bound_times, duration)
    bound_times = np.unique(np.round(bound_times, 2))

    # --- Energy per section ---
    print("Computing per-section energy...", flush=True)
    rms = librosa.feature.rms(y=y, hop_length=hop)[0]
    rms_times = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=hop)

    sections = []
    for i in range(len(bound_times) - 1):
        s, e = bound_times[i], bound_times[i + 1]
        if e - s < 2.0:
            continue
        mask = (rms_times >= s) & (rms_times < e)
        avg_e = float(rms[mask].mean()) if mask.any() else 0.0
        sections.append({"start": float(s), "end": float(e), "energy": avg_e})

    # --- Chorus detection: cluster sections by chroma similarity ---
    print("Identifying repeated sections (chorus candidates)...", flush=True)
    section_chromas = []
    for sec in sections:
        s_frame = librosa.time_to_frames(sec["start"], sr=sr, hop_length=hop)
        e_frame = librosa.time_to_frames(sec["end"], sr=sr, hop_length=hop)
        ch = chroma[:, s_frame:e_frame].mean(axis=1)
        ch = ch / (np.linalg.norm(ch) + 1e-9)
        section_chromas.append(ch)
    section_chromas = np.array(section_chromas)

    # Pairwise cosine similarity matrix
    sim = section_chromas @ section_chromas.T

    # Energy threshold: top 50% are "high energy"
    energies = np.array([s["energy"] for s in sections])
    energy_thresh = np.median(energies)

    # For each section, count how many other sections are similar (>0.95)
    # AND high energy → chorus candidate
    for i, sec in enumerate(sections):
        sim_count = int((sim[i] > 0.95).sum() - 1)  # exclude self
        sec["repetitions"] = sim_count
        is_high_energy = sec["energy"] >= energy_thresh
        is_repeated = sim_count >= 2
        if is_high_energy and is_repeated:
            sec["label"] = "chorus"
        elif is_high_energy:
            sec["label"] = "drop_or_break"
        elif sec["start"] < 20:
            sec["label"] = "intro"
        elif sec["end"] > duration - 15:
            sec["label"] = "outro"
        else:
            sec["label"] = "verse"

    return {
        "duration_sec": float(duration),
        "tempo_bpm": float(np.asarray(tempo).item()),
        "sections": sections,
    }


if __name__ == "__main__":
    audio = sys.argv[1]
    res = main(audio)
    print(f"\n=== {len(res['sections'])} sections @ {res['tempo_bpm']:.1f} BPM ===")
    print(f"{'#':>2} {'start':>6} {'end':>6} {'len':>5} {'energy':>6} {'reps':>4}  label")
    for i, s in enumerate(res["sections"]):
        print(
            f"{i:>2} {s['start']:>6.1f} {s['end']:>6.1f} "
            f"{s['end']-s['start']:>5.1f} {s['energy']:>6.3f} "
            f"{s['repetitions']:>4}  {s['label']}"
        )
    out = sys.argv[1].replace(".mp3", "-sections-refined.json")
    Path(out).write_text(json.dumps(res, indent=2))
    print(f"\nSaved: {out}")
