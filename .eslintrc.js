module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['standard-with-typescript', 'eslint-config-prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-extraneous-class': 'off',
		'@typescript-eslint/await-thenable': 'off',
	},
};
