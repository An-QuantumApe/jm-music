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
	<!-- Banner -->
	<div class="banner-container rounded-lg border p-6 text-center">
		<h1 class="text-4xl font-bold text-white md:text-5xl">{data.title}</h1>
	</div>

	<!-- Search Interface -->
	<SearchInterface onTrackSelect={handleTrackSelect} />
</div>

<style>
	.banner-container {
		background: transparent;
		border-color: rgba(148, 163, 184, 0.2);
		backdrop-filter: blur(28px) saturate(160%);
		-webkit-backdrop-filter: blur(28px) saturate(160%);
		box-shadow:
			0 8px 24px rgba(2, 6, 23, 0.35),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
</style>
