interface PlaybackInstance {
    id: string;
    source: AudioBufferSourceNode;
    buffer: AudioBuffer;
    padIndex: number;
    startTime: number;
    duration: number;
    bufferDuration: number;
    playbackRate: number;
    progress: number;
}
export declare class AudioPlaybackManager extends EventTarget {
    private audioContext;
    private activePlaybacks;
    private animationFrameId;
    private bpm;
    private isBpmSyncEnabled;
    constructor();
    setPlaybackSettings(bpm: number, isBpmSyncEnabled: boolean): void;
    play(buffer: AudioBuffer, padIndex: number, pitch?: number): string;
    stop(playbackId: string): void;
    stopAll(): void;
    updateSettings(bpm: number, isBpmSyncEnabled: boolean): void;
    private startProgressLoop;
    private stopProgressLoop;
    private updateProgress;
    private checkProgressLoop;
    getCurrentTime(): number;
    getBpm(): number;
    getAudioContext(): AudioContext;
    getIsBpmSyncEnabled(): boolean;
    getActivePlaybacks(): PlaybackInstance[];
}
export declare function getAudioPlaybackManager(): AudioPlaybackManager;
export {};
