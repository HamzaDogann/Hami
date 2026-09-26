module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // The project does not use PropTypes (no TypeScript either), so this rule only adds noise.
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  overrides: [
    {
      // Providers export the component and its hook together on purpose.
      files: ['src/providers/**/*.jsx'],
      rules: { 'react-refresh/only-export-components': 'off' },
    },
    {
      // Netlify Functions run on Node and get a global `Netlify` object.
      files: ['netlify/**/*.mjs'],
      env: { node: true },
      globals: { Netlify: 'readonly' },
    },
    {
      files: ['scripts/**/*.mjs', 'vite.config.js', 'src/**/*.test.{js,jsx}'],
      env: { node: true },
    },
  ],
}
