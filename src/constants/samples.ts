export interface SampleData {
  name: string;
  url: string;
  padIndex: number;
}

export const DRUM_KIT_SAMPLES: SampleData[] = [
  // top row (pads 0–3) → cymbals / accents
  {
    name: "Crash",
    url: "/samples/drum_kit/zildjian-16-inch-crash-001.wav",
    padIndex: 0,
  },
  {
    name: "Crash Alt",
    url: "/samples/drum_kit/sabian-15-inch-custom-crash-3.wav",
    padIndex: 1,
  },
  {
    name: "Ride",
    url: "/samples/drum_kit/paiste-22-inch-custom-ride-001.wav",
    padIndex: 2,
  },
  {
    name: "FX Cymbal",
    url: "/samples/drum_kit/cymbal-grab-stop-mute-001.wav",
    padIndex: 3,
  },

  // second row (pads 4–7) → hi-hats
  {
    name: "Closed HH",
    url: "/samples/drum_kit/vintage-custom-14-inch-hi-hat-001.wav",
    padIndex: 4,
  },
  {
    name: "Closed HH Alt",
    url: "/samples/drum_kit/vintage-custom-14-inch-hi-hat-003.wav",
    padIndex: 5,
  },
  {
    name: "Open HH",
    url: "/samples/drum_kit/vintage-custom-14-inch-hi-hat-010.wav",
    padIndex: 6,
  },
  {
    name: "HH Variation",
    url: "/samples/drum_kit/vintage-custom-14-inch-hi-hat-015.wav",
    padIndex: 7,
  },

  // third row (pads 8–11) → toms
  {
    name: "Low Tom",
    url: "/samples/drum_kit/low-floor-tom-sonor-force-3007-001.wav",
    padIndex: 8,
  },
  {
    name: "Mid Tom",
    url: "/samples/drum_kit/mid-low-tom-sonor-force-3007-002.wav",
    padIndex: 9,
  },
  {
    name: "High Tom",
    url: "/samples/drum_kit/high-tom-sonor-force-3007-002.wav",
    padIndex: 10,
  },
  {
    name: "Alt Tom",
    url: "/samples/drum_kit/mid-high-tom-sonor-force-3007-002.wav",
    padIndex: 11,
  },

  // bottom row (pads 12–15) → core drums (MPC-style)
  {
    name: "Kick",
    url: "/samples/drum_kit/kick-sonor-force-3007-001.wav",
    padIndex: 12,
  },
  {
    name: "Snare Rim",
    url: "/samples/drum_kit/rim-hit-perc-oneshot-001.wav",
    padIndex: 13,
  },
  {
    name: "Snare Alt",
    url: "/samples/drum_kit/rim-hit-perc-oneshot-003.wav",
    padIndex: 14,
  },
  {
    name: "Clap/Alt Rim",
    url: "/samples/drum_kit/rim-hit-perc-oneshot-005.wav",
    padIndex: 15,
  },
];

export const DEFAULT_SAMPLES: SampleData[] = DRUM_KIT_SAMPLES;
