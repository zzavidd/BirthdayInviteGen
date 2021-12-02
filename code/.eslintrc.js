/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  extends: '@zzavidd/eslint-config',
  root: true,
  ignorePatterns: [
    '.eslintrc.js',
    '**/.dist/**',
    '**/.out/**',
    '**/next-env.d.ts'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./*/tsconfig.json']
  },
  settings: {
    react: 'latest'
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off'
  }
};
