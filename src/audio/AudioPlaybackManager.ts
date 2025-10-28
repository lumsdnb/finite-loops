import { SampleData } from '../constants/samples';

// Define the structure for playback instances
interface PlaybackInstance {
    id: string;
    source: AudioBufferSourceNode;
    buffer: AudioBuffer;
    padIndex: number; // Added padIndex
    startTime: number; // Scheduled start time in AudioContext.currentTime
    duration: number; // Actual duration of playback in seconds (considering playbackRate)
    bufferDuration: number; // Original buffer duration in seconds
    playbackRate: number; // The actual playback rate applied
    progress: number; // Current playback progress (0 to 1)
}

export class AudioPlaybackManager extends EventTarget {
    private audioContext: AudioContext;
    private activePlaybacks: Map<string, PlaybackInstance> = new Map();
    private animationFrameId: number | null = null;
    private bpm: number = 120;
    private isBpmSyncEnabled: boolean = true; // Default to enabled

    constructor() {
        super();
        // Ensure AudioContext is created only once
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.startProgressLoop();
    }

    // Method to set BPM and sync status
    setPlaybackSettings(bpm: number, isBpmSyncEnabled: boolean) {
        this.bpm = bpm;
        this.isBpmSyncEnabled = isBpmSyncEnabled;
    }

    // Method to play a sample
    // Returns a unique ID for the playback instance
    play(buffer: AudioBuffer, padIndex: number, pitch: number = 1.0): string {
        if (!this.audioContext) {
            console.error("AudioContext is not available.");
            return "";
        }

        const playbackId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = pitch; // Apply pitch shift

        // Connect to destination
        source.connect(this.audioContext.destination);

        // Calculate playback duration and start time
        const bufferDuration = buffer.duration;
        let scheduledStartTime = 0;
        let actualDuration = bufferDuration;

        if (this.isBpmSyncEnabled) {
            // Calculate duration in beats based on BPM
            const secondsPerBeat = 60 / this.bpm;
            const durationInBeats = bufferDuration / (buffer.sampleRate / this.bpm); // This is a rough estimate, needs refinement
            // A more accurate way to sync: schedule based on beats
            // For now, let's assume a simple BPM sync where the sample plays at its normal rate but we can track progress against BPM
            // A more advanced sequencer would schedule events precisely.
            // For this implementation, we'll schedule immediately and track progress.
            // If we were to schedule precisely:
            // const beatsToPlay = bufferDuration / (buffer.sampleRate / this.bpm); // This is not quite right.
            // Let's stick to scheduling immediately and tracking progress.
            // The pitch parameter will affect the actual playback speed.
            actualDuration = bufferDuration / pitch; // Duration is affected by playback rate
            scheduledStartTime = this.audioContext.currentTime; // Schedule to start immediately
        } else {
            scheduledStartTime = this.audioContext.currentTime; // Schedule to start immediately
            actualDuration = bufferDuration / pitch;
        }

        source.start(scheduledStartTime);

        const instance: PlaybackInstance = {
            id: playbackId,
            source,
            buffer,
            padIndex,
            startTime: scheduledStartTime,
            duration: actualDuration,
            bufferDuration: bufferDuration,
            playbackRate: pitch,
            progress: 0, // Will be updated in the progress loop
        };

        this.activePlaybacks.set(playbackId, instance);

        // Clean up when playback ends
        source.onended = () => {
            this.dispatchEvent(new CustomEvent('playback-ended', { detail: { id: playbackId, padIndex } }));
            this.activePlaybacks.delete(playbackId);
            this.checkProgressLoop(); // Check if loop needs to stop
        };

        this.dispatchEvent(new CustomEvent('playback-started', { detail: { id: playbackId, padIndex, startTime: scheduledStartTime } }));

        return playbackId;
    }

    // Method to stop a specific playback instance
    stop(playbackId: string) {
        const instance = this.activePlaybacks.get(playbackId);
        if (instance) {
            instance.source.stop();
            this.activePlaybacks.delete(playbackId);
            this.dispatchEvent(new CustomEvent('playback-stopped', { detail: { id: playbackId, padIndex: instance.padIndex } }));
        }
    }

    // Method to stop all active playbacks
    stopAll() {
        this.activePlaybacks.forEach((instance, id) => {
            instance.source.stop();
            this.dispatchEvent(new CustomEvent('playback-stopped', { detail: { id: id, padIndex: instance.padIndex } }));
        });
        this.activePlaybacks.clear();
        this.checkProgressLoop(); // Check if loop needs to stop
    }

    // Update playback settings
    updateSettings(bpm: number, isBpmSyncEnabled: boolean) {
        this.bpm = bpm;
        this.isBpmSyncEnabled = isBpmSyncEnabled;
        // Potentially re-schedule or adjust active playbacks if needed, but for now, new plays will use new settings.
    }

    private startProgressLoop() {
        if (this.animationFrameId === null) {
            this.animationFrameId = requestAnimationFrame(() => this.updateProgress());
        }
    }

    private stopProgressLoop() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    private updateProgress() {
        const currentTime = this.audioContext.currentTime;
        let hasActivePlaybacks = false;

        this.activePlaybacks.forEach((instance, id) => {
            hasActivePlaybacks = true;
            const elapsedTime = currentTime - instance.startTime;
            // Ensure progress doesn't exceed 1 due to timing inaccuracies
            instance.progress = Math.min(elapsedTime / instance.duration, 1);

            // Dispatch progress event
            this.dispatchEvent(new CustomEvent('playback-progress', {
                detail: {
                    id: id,
                    padIndex: instance.padIndex,
                    progress: instance.progress,
                    currentTime: elapsedTime, // Current time within the sample
                    duration: instance.duration, // Total duration of this playback
                    bufferDuration: instance.bufferDuration, // Original buffer duration
                    playbackRate: instance.playbackRate,
                    startTime: instance.startTime, // Absolute start time in AudioContext
                }
            }));
        });

        if (hasActivePlaybacks) {
            this.animationFrameId = requestAnimationFrame(() => this.updateProgress());
        } else {
            this.stopProgressLoop();
        }
    }

    private checkProgressLoop() {
        if (this.activePlaybacks.size === 0) {
            this.stopProgressLoop();
        } else {
            this.startProgressLoop();
        }
    }

    // Get the current AudioContext time
    getCurrentTime(): number {
        return this.audioContext.currentTime;
    }

    // Get the current BPM
    getBpm(): number {
        return this.bpm;
    }

    getAudioContext(): AudioContext {
        return this.audioContext;
    }

    // Get the current BPM sync status
    getIsBpmSyncEnabled(): boolean {
        return this.isBpmSyncEnabled;
    }

    // Method to get all active playback instances (for debugging or advanced control)
    getActivePlaybacks(): PlaybackInstance[] {
        return Array.from(this.activePlaybacks.values());
    }
}

// Singleton pattern for the AudioPlaybackManager
let instance: AudioPlaybackManager | null = null;

export function getAudioPlaybackManager(): AudioPlaybackManager {
    if (!instance) {
        instance = new AudioPlaybackManager();
    }
    return instance;
}