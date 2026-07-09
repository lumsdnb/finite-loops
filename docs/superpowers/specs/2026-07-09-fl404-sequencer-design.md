# FL-404 Sequencer & Control Panel Improvements

## Overview

Add a functional step sequencer and real-time recording to the FL-404 beat machine. The pad grid does double duty: performance mode for live playing, sequencer mode for step editing. Restore vertical scroll-snap to the control panel with purpose-built pages. Make the 4 knobs interactive with dual roles (sequencer + per-step sound shaping). FX and sampling buttons remain as visual placeholders.

## Pad Grid Dual Mode

### Performance Mode (unchanged)

- 16 pads trigger their assigned samples
- Keyboard (1-4, Q-R, A-F, Z-V) and MIDI input
- Visual feedback: press glow, release reset

### Sequencer Mode

- Pads represent 16 steps for the currently selected sample
- **Toggle:** Tap an inactive step to activate it (lit up). Tap an active step to deactivate it (dim).
- **Select:** Tap an already-active step to select it (highlighted border/outline). This step's volume and pitch become editable via the VOL and PITCH knobs.
- **Playback indicator:** During playback, the current step pulses/highlights as the sequencer advances through the pattern.
- Pad labels change from sample names (e.g., "Crash") to step numbers (1-16) in sequencer mode.
- Keyboard mapping changes: keys now toggle/select steps instead of triggering samples.

### Sample Selection in Sequencer Mode

The pad grid is the central interface for sample selection too. Use a modifier + pad to switch which sample's pattern is displayed on the grid:

- **Keyboard:** Hold Shift + press a pad's key (e.g., Shift+Z for pad 13/Kick) to select that sample for step editing
- **Touch/Mouse:** Long-press a pad (hold ~500ms without releasing) to select that sample for step editing
- **MIDI:** A designated MIDI CC or button hold could serve the same role (future)

After selecting a sample, the grid switches to show that sample's 16 steps. The info display ("Pad N: SampleName") updates to reflect the active sample being sequenced. Normal taps (without modifier) continue to toggle/select steps.

## Sequencer Engine

### Data Model

```
SequencerState {
  patterns: Map<padIndex, Pattern>    // One pattern per sample (16 total)
  playing: boolean
  recording: boolean
  currentStep: number                 // 0-15, advances on tick
  selectedSample: number              // Which pad's pattern is shown on grid
  selectedStep: number | null         // Which step is selected for knob editing
}

Pattern {
  steps: Step[16]
  length: number                      // 1-16, default 16
  swing: number                       // 0-100%, default 0
}

Step {
  active: boolean                     // Whether this step triggers
  velocity: number                    // 0.0-1.0, default 1.0
  pitch: number                       // 0.5-2.0, default 1.0
}
```

### Timing

- Sequencer loops at BPM rate, 16th-note resolution
- Step interval: `(60 / BPM) / 4` seconds per step (4 steps per beat)
- Uses Web Audio API scheduling (`AudioContext.currentTime`) for tight timing — not `setTimeout`/`setInterval`
- Lookahead scheduler: schedules notes slightly ahead to avoid timing jitter

### Playback

- All 16 patterns play simultaneously (one per sample)
- When a step is active, triggers the sample with that step's velocity and pitch
- Pattern length per-sample: patterns shorter than 16 steps loop independently
- Swing offsets even-numbered steps by the swing amount

## Control Panel with Scroll Snap

Restore vertical scroll-snap to the `.controls-shell` container. Two pages.

### CSS Scroll Snap

```css
.controls-shell {
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.control-page {
  min-height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

### Page 1: Display + Knobs

- **Waveform display** with sample name (existing `.main` section with FX columns)
  - FX1-6 buttons remain as visual placeholders flanking the waveform
- **4 functional knobs** in a row below the waveform:
  - SWING: pattern swing amount (0-100%)
  - LENGTH: pattern step count (1-16)
  - VOL: selected step velocity, or pad default volume
  - PITCH: selected step pitch, or pad default pitch

### Page 2: Transport + Controls

- **Transport row:** PLAY, STOP, REC buttons
  - PLAY: start sequencer loop (lights up when playing)
  - STOP: stop sequencer loop
  - REC: toggle recording (glows red when armed)
- **QUANT** toggle: on/off for quantization during recording
- **TAP** tempo: functional tap-tempo (tap 3-4 times, calculates average interval, sets BPM)
- **Pattern info:** displays which sample is selected and current step count

Replaces the current PATTERN/LENGTH/QUANT/TAP and DEL/REC/RES groups with these purpose-built controls.

## Knob Component

### Interaction

- **Vertical drag** to change value: drag up = increase, drag down = decrease
- Works with mouse and touch
- Captures pointer on drag start, releases on drag end

### Visual Design

- Circular knob (44px mobile, 60px desktop)
- Rotational notch/indicator line from ~7 o'clock (minimum) to ~5 o'clock (maximum)
- Label below: SWING, LENGTH, VOL, PITCH
- Value tooltip on interaction (shows above knob while dragging)

### Value Ranges

| Knob   | Range       | Default | Format     |
|--------|-------------|---------|------------|
| SWING  | 0-100       | 0       | "0%"       |
| LENGTH | 1-16        | 16      | "16"       |
| VOL    | 0-100       | 100     | "100%"     |
| PITCH  | 0.5-2.0     | 1.0     | "1.0x"     |

### Context Sensitivity

- **Sequencer mode, step selected:** VOL and PITCH edit that step's properties
- **Sequencer mode, no step selected:** VOL and PITCH edit the pad's default values for new steps
- **Performance mode:** VOL and PITCH affect the last-triggered pad's playback

## Real-Time Recording

### Workflow

1. Enter sequencer mode
2. Press REC (button glows red — armed)
3. Press PLAY (sequencer starts looping)
4. Play pads via keyboard/MIDI/touch — during recording, pads temporarily act as sample triggers (performance behavior) rather than step toggles, so you can play a beat naturally. Hits quantize to the nearest step and are written into the corresponding sample's pattern.
5. Press REC again to stop recording (pads return to step-toggle behavior, playback continues)
6. Press STOP to halt playback

### Quantization

- During recording, pad triggers snap to the nearest 16th-note step
- Overdub: recording adds to existing pattern (does not erase)
- Clearing steps: tap active steps to deactivate, or use a future clear function

## Components Affected

### New Components

- `sp-knob.ts` — Interactive rotary knob with drag, value display, label

### Modified Components

- `fl-404.ts` — Add SequencerState management, transport logic, scheduling loop, sample selection via button combo, knob value routing
- `pad-grid.ts` — Accept mode prop to switch between sample-trigger and step-toggle behavior, show step numbers, highlight active/selected/playing steps
- `drum-pad.ts` — Support step state display (active, selected, playing indicators)
- `control-panel.ts` — Replace static knobs with `sp-knob`, reorganize into 2 scroll-snap pages, add transport buttons with event handlers
- `AudioPlaybackManager.ts` — Add scheduled playback method (play at specific `AudioContext.currentTime`) for tight sequencer timing

### Unchanged

- `sp-button.ts` — Used as-is for transport/FX buttons
- `sample-waveform.ts` — Used as-is
- `top-nav.ts`, `release-panel.ts` — Unrelated

## Out of Scope

- Audio effects processing (FX1-6 remain placeholders)
- Sample deletion/management (DEL remains placeholder)
- Sample recording/resampling
- Pattern save/load/export
- Multiple pattern banks
- MIDI output
