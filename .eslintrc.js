module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': 'error',
    'no-unused-vars': 'off',
    'vue/no-v-html': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-mutating-props': 'off',
    'indent': 'off',
  },
}
