export interface AudioTrack {
	id: string;
	title: string;
	source: string; // "Radio", "Record Shop", "Jam"
	url: string;
	isStream?: boolean;
}

class AudioBus extends EventTarget {
	private _audio: HTMLAudioElement | null = null;
	private _track: AudioTrack | null = null;
	private _playing = false;

	get track(): AudioTrack | null {
		return this._track;
	}

	get playing(): boolean {
		return this._playing;
	}

	play(track: AudioTrack): void {
		// Stop any current playback first
		if (this._audio) {
			this._audio.pause();
			this._audio.src = '';
			this._audio = null;
		}

		const audio = new Audio(track.url);
		audio.crossOrigin = 'anonymous';

		audio.play().catch(() => {
			this.stop();
		});

		this._audio = audio;
		this._track = track;
		this._playing = true;
		this._emit();
	}

	stop(): void {
		if (this._audio) {
			this._audio.pause();
			this._audio.src = '';
			this._audio = null;
		}
		this._track = null;
		this._playing = false;
		this._emit();
	}

	togglePause(): void {
		if (!this._audio) return;

		if (this._playing) {
			this._audio.pause();
			this._playing = false;
		} else {
			this._audio.play().catch(() => this.stop());
			this._playing = true;
		}
		this._emit();
	}

	private _emit(): void {
		this.dispatchEvent(new Event('change'));
	}
}

let instance: AudioBus | null = null;

export function getAudioBus(): AudioBus {
	if (!instance) {
		instance = new AudioBus();
	}
	return instance;
}
