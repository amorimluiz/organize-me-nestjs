module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        'array-callback-return': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'dot-notation': 'warn',
        'eqeqeq': 'error',
        'no-console': 'warn',
        'no-const-assign': 'error',
        'no-undefined': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-const': 'warn',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['error', {
            "args": "all",
            "argsIgnorePattern": "^_",
            "caughtErrors": "all",
            "caughtErrorsIgnorePattern": "^_",
            "destructuredArrayIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "ignoreRestSiblings": true
        }],
        'prettier/prettier': 'error',
    },
    ignorePatterns: ['.eslintrc.js', 'dist/', 'node_modules/', 'coverage/', 'jest.config.js'],
};
