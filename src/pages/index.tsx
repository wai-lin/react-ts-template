import { useI18nNamespace } from '@hooks/useTypesafeI18n';
import { useI18nContext } from '@i18n/i18n-react';
import { Locales } from '@i18n/i18n-types';
import { locales } from '@i18n/i18n-util';
import { Link } from 'react-router-dom';

export default function Page() {
	useI18nNamespace('home');
	const { LL, locale, setLocale } = useI18nContext();

	const onLocaleChange: TOnChange<HTMLSelectElement> = (e) => {
		const value = e.currentTarget.value as Locales;
		setLocale(value);
	};

	return (
		<div style={{ textAlign: 'center' }}>
			<article style={{ marginBottom: '2rem' }}>
				<h1>{LL.home.Heading()}</h1>

				<select defaultValue={locale} onChange={onLocaleChange}>
					{locales.map((lang) => (
						<option key={lang} value={lang}>
							{lang}
						</option>
					))}
				</select>
			</article>

			<Link to="counter">Counter store example</Link>
		</div>
	);
}
