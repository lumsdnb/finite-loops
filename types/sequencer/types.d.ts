export interface Step {
    active: boolean;
    velocity: number;
    pitch: number;
}
export interface Pattern {
    steps: Step[];
    length: number;
    swing: number;
}
export declare function createDefaultStep(): Step;
export declare function createDefaultPattern(): Pattern;
