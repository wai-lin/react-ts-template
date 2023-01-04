import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '~react-pages';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
const router = createBrowserRouter(routes);

// ========== ReactQuery Devtools ==========
const ReactQueryDevtoolsProduction = lazy(() =>
	import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
		(d) => ({
			default: d.ReactQueryDevtools,
		}),
	),
);

export default function App() {
	// ========== ReactQuery Production Devtool ==========
	const [showDevtools, setShowDevtools] = useState(false);
	useEffect(() => {
		// @ts-ignore
		window.toggleDevtools = () => setShowDevtools((old) => !old);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={router} />
			</Suspense>

			{/* ========== Development Devtool ========== */}
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
			{/* ========== Production Devtool ========== */}
			{showDevtools && (
				<Suspense fallback={null}>
					<ReactQueryDevtoolsProduction />
				</Suspense>
			)}
		</QueryClientProvider>
	);
}
