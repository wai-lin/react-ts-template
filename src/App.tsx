import {
	queryClient,
	ReactQueryDevtoolsProduction,
	useReactQueryProductionDevtools,
} from '@hooks/useReactQuery';
import { useInitTypesafeI18n } from '@hooks/useTypesafeI18n';
import TypesafeI18n from '@i18n/i18n-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '~react-pages';

// ========== React Router ==========
const router = createBrowserRouter(routes);

export default function App() {
	const { i18nWasLoaded } = useInitTypesafeI18n();
	const { showDevtools } = useReactQueryProductionDevtools();

	if (!i18nWasLoaded) return null;

	return (
		<TypesafeI18n locale="en">
			<QueryClientProvider client={queryClient}>
				{/* ========== React Router ========== */}
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
		</TypesafeI18n>
	);
}
