import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: LayoutServerLoad = () => {
	return {
		title: env.TITLE ?? 'Lossless Music',
		slogan: env.SLOGAN ?? 'Stream Lossless Music'
	};
};
