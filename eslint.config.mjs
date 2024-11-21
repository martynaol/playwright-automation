import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' },
      ],
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**', 'tests-examples/'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
  eslintConfigPrettier,
];
