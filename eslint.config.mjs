import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignorePatterns: ['node_modules/', 'dist/'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': ['error', { code: 120 }],
      camelcase: 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  }
];
