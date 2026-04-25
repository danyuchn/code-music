"""Analyze a track: tempo, key, structure, chords, energy.

Usage: uv run python scripts/analyze_track.py <audio.mp3> [output.json]
"""
import sys
import json
from pathlib import Path

import numpy as np
import librosa

# Krumhansl-Schmuckler key profiles (1990, normalized)
MAJOR_PROFILE = np.array(
    [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88]
)
MINOR_PROFILE = np.array(
    [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17]
)
NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

# Camelot wheel mapping (key -> camelot code)
CAMELOT = {
    "C major": "8B", "G major": "9B", "D major": "10B", "A major": "11B",
    "E major": "12B", "B major": "1B", "F# major": "2B", "Db major": "3B",
    "Ab major": "4B", "Eb major": "5B", "Bb major": "6B", "F major": "7B",
    "A minor": "8A", "E minor": "9A", "B minor": "10A", "F# minor": "11A",
    "C# minor": "12A", "G# minor": "1A", "D# minor": "2A", "Bb minor": "3A",
    "F minor": "4A", "C minor": "5A", "G minor": "6A", "D minor": "7A",
}
ENH = {"C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb"}


def detect_key(chroma: np.ndarray) -> tuple[str, str]:
    """Krumhansl-Schmuckler key detection. Returns (key_name, camelot)."""
    chroma_avg = chroma.mean(axis=1)
    chroma_avg /= chroma_avg.sum() + 1e-9

    best_score = -np.inf
    best_key = None
    for i, root in enumerate(NOTE_NAMES):
        for mode, profile in [("major", MAJOR_PROFILE), ("minor", MINOR_PROFILE)]:
            shifted = np.roll(profile, i)
            shifted = shifted / shifted.sum()
            score = np.corrcoef(chroma_avg, shifted)[0, 1]
            if score > best_score:
                best_score = score
                best_key = f"{root} {mode}"

    # Convert sharps to flats for minor keys (more common in music notation)
    root, mode = best_key.split()
    if mode == "minor" and root in ENH:
        root = ENH[root]
    key_str = f"{root} {mode}"
    camelot = CAMELOT.get(key_str, "?")
    return key_str, camelot


# Chord templates (12 pitches × major/minor triads)
def chord_templates() -> dict[str, np.ndarray]:
    templates = {}
    for i, root in enumerate(NOTE_NAMES):
        # Major: root, M3, P5
        maj = np.zeros(12)
        maj[[i, (i + 4) % 12, (i + 7) % 12]] = 1
        templates[f"{ENH.get(root, root)}"] = maj  # major
        # Minor: root, m3, P5
        mn = np.zeros(12)
        mn[[i, (i + 3) % 12, (i + 7) % 12]] = 1
        templates[f"{ENH.get(root, root)}m"] = mn  # minor
    return templates


def detect_chords(chroma: np.ndarray, sr: int, hop: int, beat_times: np.ndarray) -> list[dict]:
    """Beat-synchronous chord detection via chroma + template matching."""
    templates = chord_templates()
    template_matrix = np.array(list(templates.values()))  # (24, 12)
    template_names = list(templates.keys())

    # Sync chroma to beats (avg over each beat window)
    beat_frames = librosa.time_to_frames(beat_times, sr=sr, hop_length=hop)
    chroma_beat = librosa.util.sync(chroma, beat_frames, aggregate=np.median)

    # Normalize each beat-chroma column
    chroma_beat_norm = chroma_beat / (np.linalg.norm(chroma_beat, axis=0) + 1e-9)
    template_norm = template_matrix / np.linalg.norm(template_matrix, axis=1, keepdims=True)

    # Cosine similarity: (24, T)
    scores = template_norm @ chroma_beat_norm
    best = scores.argmax(axis=0)

    # Group consecutive same-chord beats
    chords = []
    cur_chord = None
    cur_start = beat_times[0] if len(beat_times) > 0 else 0
    for i, beat_idx in enumerate(best):
        chord_name = template_names[beat_idx]
        if chord_name != cur_chord:
            if cur_chord is not None:
                end_t = beat_times[i] if i < len(beat_times) else beat_times[-1]
                chords.append({"start": float(cur_start), "end": float(end_t), "chord": cur_chord})
            cur_chord = chord_name
            cur_start = beat_times[i] if i < len(beat_times) else cur_start
    # Final
    if cur_chord is not None and len(beat_times) > 0:
        chords.append({"start": float(cur_start), "end": float(beat_times[-1]), "chord": cur_chord})
    return chords


def detect_sections(y: np.ndarray, sr: int, hop: int) -> list[dict]:
    """Structural segmentation via librosa agglomerative."""
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr, hop_length=hop)
    bounds = librosa.segment.agglomerative(chroma, k=8)
    bound_times = librosa.frames_to_time(bounds, sr=sr, hop_length=hop)
    duration = len(y) / sr
    bound_times = np.append(bound_times, duration)
    sections = []
    for i in range(len(bound_times) - 1):
        sections.append({
            "start": float(bound_times[i]),
            "end": float(bound_times[i + 1]),
            "label": f"section_{i}",
        })
    return sections


def main(audio_path: str, output_path: str | None = None) -> dict:
    print(f"Loading {audio_path}...", flush=True)
    y, sr = librosa.load(audio_path, sr=22050, mono=True)
    duration = len(y) / sr

    hop = 512

    print("Detecting tempo + beats...", flush=True)
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr, hop_length=hop)
    beat_times = librosa.frames_to_time(beat_frames, sr=sr, hop_length=hop)

    print("Computing chroma...", flush=True)
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr, hop_length=hop)

    print("Detecting key...", flush=True)
    key, camelot = detect_key(chroma)

    print("Detecting chords...", flush=True)
    chords = detect_chords(chroma, sr, hop, beat_times)

    print("Detecting sections...", flush=True)
    sections = detect_sections(y, sr, hop)

    print("Computing energy curve...", flush=True)
    rms = librosa.feature.rms(y=y, hop_length=hop)[0]
    rms_times = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=hop)
    # Downsample to 1 sample per second for compactness
    energy_per_sec = []
    for sec in range(int(duration)):
        mask = (rms_times >= sec) & (rms_times < sec + 1)
        if mask.any():
            energy_per_sec.append(float(rms[mask].mean()))
        else:
            energy_per_sec.append(0.0)

    result = {
        "file": audio_path,
        "duration_sec": float(duration),
        "tempo_bpm": float(np.asarray(tempo).item()),
        "key": key,
        "camelot": camelot,
        "num_beats": len(beat_times),
        "downbeats": [float(t) for t in beat_times[::4]],  # every 4th beat ≈ downbeat
        "sections": sections,
        "chords": chords,
        "energy_per_sec": energy_per_sec,
    }

    if output_path:
        Path(output_path).write_text(json.dumps(result, indent=2))
        print(f"Saved to {output_path}", flush=True)

    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    audio = sys.argv[1]
    output = sys.argv[2] if len(sys.argv) > 2 else None
    res = main(audio, output)
    # Print summary
    print(f"\n=== Summary ===")
    print(f"Duration: {res['duration_sec']:.1f}s")
    print(f"Tempo: {res['tempo_bpm']:.2f} BPM")
    print(f"Key: {res['key']} (Camelot {res['camelot']})")
    print(f"Sections: {len(res['sections'])}")
    print(f"Chord changes: {len(res['chords'])}")
