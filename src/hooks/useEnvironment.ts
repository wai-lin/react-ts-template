export function getEnvironment() {
	const { env } = import.meta;

	return Object.freeze({
		BASE_URL: env.BASE_URL,
		MODE: env.MODE,
		DEV: env.DEV,
		PROD: env.PROD,
		SSR: env.SSR,

		// Custom Env Variables
		VITE_API_BASE_URL: env.VITE_API_BASE_URL || '',
	});
}

export const useEnvironment = () => getEnvironment();
