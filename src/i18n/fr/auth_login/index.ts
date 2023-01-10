import type { NamespaceAuthLoginTranslation } from '../../i18n-types.js';

const fr_auth_login: NamespaceAuthLoginTranslation = {
	Email: {
		Label: 'Email',
	},
	Password: {
		Label: 'Password',
	},
	LoginForm: {
		Validation: {
			Email: {
				Required: 'Please enter your email.',
				Format: 'Incorrect email format.',
			},
			Password: {
				Required: 'Please enter your password.',
				Length: 'Password must be 8 to 32 characters.',
			},
		},
	},
};

export default fr_auth_login;
