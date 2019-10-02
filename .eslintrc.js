module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'eslint-config-prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'filenames', 'jest'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    camelcase: ['error', { properties: 'always' }],
    'consistent-return': 'off',
    'default-case': 'error',
    'filenames/match-regex': ['error', '^[a-z0-9-]+(.test)?$', true],
    'filenames/match-exported': ['error', 'kebab', null, true],
    'filenames/no-index': 'off',
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/default': 'error',
    'import/export': 'error',
    'import/exports-last': 'off',
    'import/extensions': ['error', 'never', { json: 'always', scss: 'always' }],
    'import/first': 'error',
    'import/max-dependencies': ['error', { max: 20 }],
    'import/named': 'error',
    'import/namespace': ['error', { allowComputed: true }],
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-commonjs': 'error',
    'import/no-default-export': 'off',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: false,
      },
    ],
    'import/no-internal-modules': 'off',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    'import/no-namespace': 'off',
    'import/no-nodejs-modules': 'off',
    'import/no-unassigned-import': ['error', { allow: ['**/config/i18n', 'dayjs/locale/**'] }],
    'import/no-unresolved': 'off',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal', 'parent'], ['sibling', 'index']],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/unambiguous': 'off',
    'import/no-useless-path-segments': 'off',
    'max-depth': ['error', 4],
    'max-len': ['error', { code: 120, tabWidth: 2, comments: 120 }],
    'no-template-curly-in-string': 'error',
    'no-plusplus': 'error',
    'no-duplicate-imports': 'error',
    'prefer-rest-params': 'error',
    'no-unused-vars': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'prettier/prettier': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/interface-name-prefix': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/**.test.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ],
};
