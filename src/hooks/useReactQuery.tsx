import { QueryClient } from '@tanstack/react-query';
import { lazy, useEffect, useState } from 'react';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const ReactQueryDevtoolsProduction = lazy(() =>
	import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
		(d) => ({
			default: d.ReactQueryDevtools,
		}),
	),
);

export function useReactQueryProductionDevtools() {
	// ========== ReactQuery Production Devtool ==========
	const [showDevtools, setShowDevtools] = useState(false);
	useEffect(() => {
		// @ts-ignore
		window.toggleDevtools = () => setShowDevtools((old) => !old);
	}, []);

	return { showDevtools };
}
