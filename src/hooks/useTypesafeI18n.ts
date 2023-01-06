import { useI18nContext } from '@i18n/i18n-react';
import { Locales, Namespaces } from '@i18n/i18n-types';
import { detectLocale } from '@i18n/i18n-util';
import { loadLocaleAsync, loadNamespaceAsync } from '@i18n/i18n-util.async';
import { useCallback, useEffect, useState } from 'react';
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

interface TUseLoadI18nLocaleOptions {
	namespaces?: Namespaces[];
	onError?: (error: Error) => void;
}
/**
 * Load locale files and namespace when user set the locale.
 * By default, this hook will only load default locale files
 * unless the `namespaces` options is defined in config.
 *
 * eg.
 * ```tsx
 * useLoadI18nLocale({ namespaces: ['home'] }); // parameter is optional
 * const { LL, setLocale } = useI18nContext();
 * console.log(LL.Heading());
 * setLocale('en')
 * console.log(LL.Heading());
 * ```
 */
export function useLoadI18nLocale(options?: TUseLoadI18nLocaleOptions) {
	const { namespaces, onError } = options ?? {};

	const { locale, setLocale } = useI18nContext();

	const onLocaleChange = useCallback(async () => {
		try {
			// load default locale files
			await loadLocaleAsync(locale);

			// load namespace locale files if namespace is provided
			if (namespaces)
				namespaces.forEach(async (ns) => {
					await loadNamespaceAsync(locale, ns);
				});
		} catch (e) {
			if (onError) onError(e as unknown as Error);

			// eslint-disable-next-line no-console
			console.error(`Error while loading locale ${locale}.`);
			if (namespaces)
				// eslint-disable-next-line no-console
				console.error(`Error while loading namespaces ${namespaces}`);
		} finally {
			// finally set the locale to ensure the locale is set
			setLocale(locale);
		}
		// this rule is disabled since setLocale in
		// deps array will trigger infinite rerender
		// which is not the desired process.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [namespaces, locale]);

	useEffect(() => {
		onLocaleChange();
	}, [onLocaleChange]);
}
