const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'airbnb',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	globals: {
		React: 'readonly',
	},
	rules: {
		// default rules
		'no-var': [ERROR],
		'no-console': [WARN],
		'semi': [ERROR],
		'no-confusing-arrow': [ERROR],
		'arrow-parens': [ERROR],
		'quotes': [ERROR, 'single'],
		'quote-props': [ERROR, 'consistent'],
		'comma-dangle': [ERROR, 'always-multiline'],
		'no-tabs': [OFF],
		'no-undef': [OFF],
		'no-underscore-dangle': [OFF],
		'indent': [OFF, 'tab'],
		'no-unused-vars': [OFF],

		// typescript eslint
		'@typescript-eslint/no-unused-vars': [ERROR],

		// import rules
		'import/prefer-default-export': [OFF],
		'import/no-unresolved': [OFF],
		'import/extensions': [OFF],

		// react rules
		'react/jsx-filename-extension': [ERROR, { extensions: ['.jsx', '.tsx'] }],
		'react/react-in-jsx-scope': [OFF],
		'react/require-default-props': [OFF],
		'react/jsx-props-no-spreading': [ERROR, { html: 'ignore' }],

		// prettier
		'prettier/prettier': [ERROR],
	},
};
