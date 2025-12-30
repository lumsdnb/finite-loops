export interface SampleData {
  name: string;
  url: string;
  padIndex: number;
}

export const DEFAULT_SAMPLES: SampleData[] = [
  { name: "Laser2", url: "/samples/Laser2.wav", padIndex: 0 },
  { name: "collect1", url: "/samples/collect1.wav", padIndex: 1 },
  { name: "bounce", url: "/samples/bounce.wav", padIndex: 2 },
  { name: "bwah", url: "/samples/bwah.wav", padIndex: 3 },
  { name: "slap", url: "/samples/slap.wav", padIndex: 15 }
];