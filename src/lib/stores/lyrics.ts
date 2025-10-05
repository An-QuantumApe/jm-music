import { get, writable } from 'svelte/store';
import type { Track } from '$lib/types';
import { currentTrack as currentTrackStore } from '$lib/stores/player';

export interface LyricsState {
	open: boolean;
	maximized: boolean;
	track: Track | null;
	refreshToken: number;
}

const initialState: LyricsState = {
	open: false,
	maximized: false,
	track: null,
	refreshToken: 0
};

function createLyricsStore() {
	const store = writable<LyricsState>({ ...initialState });

	let currentTrack: Track | null = null;

	currentTrackStore.subscribe((track) => {
		currentTrack = track ?? null;
		store.update((state) => {
			const trackChanged = state.track?.id !== currentTrack?.id;
			return {
				...state,
				track: currentTrack,
				refreshToken: trackChanged && state.open ? state.refreshToken + 1 : state.refreshToken
			};
		});
	});

	function open(targetTrack?: Track | null) {
		const nextTrack = targetTrack ?? currentTrack;
		store.update((state) => ({
			...state,
			open: true,
			track: nextTrack ?? state.track,
			refreshToken:
				nextTrack && state.track?.id !== nextTrack.id ? state.refreshToken + 1 : state.refreshToken
		}));
	}

	function close() {
		store.update((state) => ({
			...state,
			open: false,
			maximized: false
		}));
	}

	function toggle() {
		const state = get(store);
		if (state.open) {
			close();
		} else {
			open();
		}
	}

	function toggleMaximize() {
		store.update((state) => ({
			...state,
			maximized: !state.maximized
		}));
	}

	function refresh() {
		store.update((state) => ({
			...state,
			refreshToken: state.refreshToken + 1
		}));
	}

	return {
		subscribe: store.subscribe,
		open,
		close,
		toggle,
		toggleMaximize,
		refresh
	};
}

export const lyricsStore = createLyricsStore();
