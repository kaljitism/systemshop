module.exports = {
    env: {
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'es2020',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
}