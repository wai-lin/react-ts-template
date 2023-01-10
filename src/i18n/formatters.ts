import type { FormattersInitializer } from 'typesafe-i18n';
import { number } from 'typesafe-i18n/formatters';
import type { Formatters, Locales } from './i18n-types.js';

export const initFormatters: FormattersInitializer<Locales, Formatters> = (
	locale: Locales,
) => {
	const formatters: Formatters = {
		currency: number(locale),
		MMK: (value) => `${value} MMK`,
		USD: number(locale, { style: 'currency', currency: 'USD' }),
	};

	return formatters;
};
