import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['package.json', 'dist', 'eslint.config.mjs', 'tsconfig.json'],
  rules: {
    'ts/consistent-type-imports': 'off',
    'style/brace-style': 'off',
  },
})
