module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
      },
    ],
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
  ],
  env: {
    utils: {
      presets: [
        [
          '@babel/env',
          {
            loose: true,
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          'module-resolver',
          {
            root: ['bin-ace-editor'],
            alias: { 'bin-ace-editor/src': 'bin-ace-editor/lib' },
          },
        ],
      ],
    },
  },
}
