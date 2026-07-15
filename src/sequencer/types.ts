export interface Step {
	active: boolean;
	velocity: number; // 0.0–1.0
	pitch: number;    // 0.5–2.0
}

export interface Pattern {
	steps: Step[];
	length: number;  // 1–16, how many steps to loop
	swing: number;   // 0–100
}

export function createDefaultStep(): Step {
	return { active: false, velocity: 1.0, pitch: 1.0 };
}

export function createDefaultPattern(): Pattern {
	return {
		steps: Array.from({ length: 16 }, () => createDefaultStep()),
		length: 16,
		swing: 0,
	};
}
