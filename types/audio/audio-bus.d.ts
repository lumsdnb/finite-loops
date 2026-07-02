export interface AudioTrack {
    id: string;
    title: string;
    source: string;
    url: string;
    isStream?: boolean;
}
declare class AudioBus extends EventTarget {
    private _audio;
    private _track;
    private _playing;
    get track(): AudioTrack | null;
    get playing(): boolean;
    play(track: AudioTrack): void;
    stop(): void;
    togglePause(): void;
    private _emit;
}
export declare function getAudioBus(): AudioBus;
export {};
