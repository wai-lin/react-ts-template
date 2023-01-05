import { useI18nContext } from '@i18n/i18n-react';
import { Locales, Namespaces } from '@i18n/i18n-types';
import { detectLocale } from '@i18n/i18n-util';
import { loadLocaleAsync, loadNamespaceAsync } from '@i18n/i18n-util.async';
import { useEffect, useState } from 'react';
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

/**
 * Load namespace
 *
 * eg.
 * ```tsx
 * useI18nNamespace('home');
 * const { LL } = useI18nContext();
 * console.log(LL.home.Heading());
 * ```
 */
export async function useI18nNamespace(namespace: Namespaces) {
	const { locale, setLocale } = useI18nContext();

	useEffect(() => {
		loadNamespaceAsync(locale, namespace).then(() => setLocale(locale));
	}, [locale, namespace, setLocale]);
}
