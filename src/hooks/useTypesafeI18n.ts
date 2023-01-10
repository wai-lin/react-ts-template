import { useI18nContext } from '@i18n/i18n-react';
import { Locales, Namespaces } from '@i18n/i18n-types';
import { detectLocale } from '@i18n/i18n-util';
import { loadLocaleAsync, loadNamespaceAsync } from '@i18n/i18n-util.async';
import { createStore } from '@utils/StoreHelpers';
import { useEffect, useRef, useState } from 'react';
import { localStorageDetector } from 'typesafe-i18n/detectors';

export const detectedLocale = detectLocale(localStorageDetector);

interface TUseTypesafeI18nOptions {
	initialLocale?: Locales;
	useSystemLocale?: boolean;
}
/**
 * Load this hook at the Entry point of your project.
 *
 * eg. App.tsx
 *
 * ```tsx
 * // config is optional
 * useInitTypesafeI18n({
 *   initialLocale: 'en',
 *   useSystemLocale: true,
 * })
 * ```
 */
export function useInitTypesafeI18n(options?: TUseTypesafeI18nOptions) {
	const { initialLocale = 'en', useSystemLocale = false } = options ?? {};
	const [i18nWasLoaded, setI18nWasLoaded] = useState(false);

	useEffect(() => {
		let locale = initialLocale;
		if (useSystemLocale) locale = detectedLocale;

		loadLocaleAsync(locale).then(() => setI18nWasLoaded(true));
	}, [initialLocale, useSystemLocale]);

	return { i18nWasLoaded };
}

// ========== i18n Store ==========
interface TState {
	namespaces: Namespaces[];
}
interface TActions {
	loadLocales: (locale: Locales, setLocale: (l: Locales) => void) => void;
}
const useLoadI18nStore = createStore<TState, TActions>((_set, get) => ({
	initialState: {
		namespaces: [],
	},
	actions: {
		loadLocales(locale, setLocale) {
			const loaders = [loadLocaleAsync(locale)];
			get().state.namespaces.forEach((ns) => {
				loaders.push(loadNamespaceAsync(locale, ns));
			});

			Promise.allSettled(loaders).then(() => setLocale(locale));
		},
	},
}));

/**
 * Initialize the locales
 */
export function useLoadI18nLocales(...namespaces: Namespaces[]) {
	const { locale, setLocale } = useI18nContext();
	const { setState, actions } = useLoadI18nStore();

	const namespacesRef = useRef<null | Namespaces[]>(null);

	useEffect(() => {
		if (namespacesRef.current === null) namespacesRef.current = namespaces;

		return () => {
			namespacesRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// set namespaces if provided
	useEffect(
		() => setState({ namespaces: namespacesRef.current ?? [] }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[namespacesRef.current],
	);

	// load locales with namespaces only on locale change
	useEffect(
		() => actions.loadLocales(locale, setLocale),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[locale, namespacesRef.current],
	);
}
