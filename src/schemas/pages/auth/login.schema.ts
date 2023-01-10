import type { Translations } from '@i18n/i18n-types';
import { z } from 'zod';

export type TLoginFormValidation =
	Translations['auth_login']['LoginForm']['Validation'];

export const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Required' as keyof TLoginFormValidation['Email'] })
		.email({ message: 'Format' as keyof TLoginFormValidation['Email'] }),
	password: z
		.string()
		.min(1, { message: 'Required' as keyof TLoginFormValidation['Password'] })
		.min(8, { message: 'Length' as keyof TLoginFormValidation['Password'] })
		.max(32, { message: 'Required' as keyof TLoginFormValidation['Password'] }),
});

export type TLoginFormFields = z.infer<typeof loginFormSchema>;
