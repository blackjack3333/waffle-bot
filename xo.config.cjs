module.exports = {
  space: true,
  semicolon: false,
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'ava/no-ignored-test-files': 'off',
    'node/prefer-global/process': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
    ],
    'capitalized-comments': 'off',
    'quote-props': ['error', 'consistent'],
    'eslint-comments/no-unused-disable': 'off',

    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],

    '@typescript-eslint/no-namespace': 'off',

    'unicorn/prefer-ternary': 'off',

    'brace-style': ['off', '1tbs', { 'allowSingleLine': true }], // 'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
  },
}
