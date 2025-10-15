<script lang="ts">
	import SearchInterface from '$lib/components/SearchInterface.svelte';
	import type { Track } from '$lib/types';
	import { playerStore } from '$lib/stores/player';

	let { data } = $props();

	function handleTrackSelect(track: Track) {
		playerStore.setQueue([track], 0);
		playerStore.play();
	}

</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content="Cool music streaming haha" />
</svelte:head>

<div class="space-y-8">
	<!-- Search Interface -->
	<SearchInterface onTrackSelect={handleTrackSelect} />
</div>
