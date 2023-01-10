import { BaseTranslation } from '../../i18n-types';

const en_auth_login: BaseTranslation = {
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

export default en_auth_login;
