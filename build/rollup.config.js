import pkg from '../package.json'
import vuePlugin from 'rollup-plugin-vue'
import path from 'path'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const name = 'BinAceEditor'

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} wangbin
  * @license MIT
  */`
}

const createBaseConfig = () => {
  return {
    input: path.resolve(__dirname, '../src/index.js'),
    external: ['vue'],
    plugins: [
      peerDepsExternal(),
      vuePlugin({
        css: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.vue'],
        babelHelpers: 'bundled',
      }),
      resolve({
        extensions: ['.vue', '.jsx', '.js'],
      }),
      commonjs(),
      json(),
    ],
    output: {
      sourcemap: false,
      banner: createBanner(),
      externalLiveBindings: false,
      globals: {
        vue: 'Vue',
      },
    },
  }
}

function mergeConfig(baseConfig, configB) {
  const config = Object.assign({}, baseConfig)
  // plugin
  if (configB.plugins) {
    baseConfig.plugins.push(...configB.plugins)
  }

  // output
  config.output = Object.assign({}, baseConfig.output, configB.output)

  return config
}

function createFileName(formatName) {
  return `lib/bin-ace-editor${formatName}.js`
}

// es-bundle
const esBundleConfig = {
  plugins: [
    replace({
      __DEV__: `(process.env.NODE_ENV !== 'production')`,
    }),
  ],
  output: {
    file: createFileName('.esm'),
    format: 'es',
  },
}

// es-browser
const esBrowserConfig = {
  plugins: [
    replace({
      __DEV__: true,
    }),
  ],
  output: {
    file: createFileName('.esm-browser'),
    format: 'es',
  },
}

// es-browser.min
const esBrowserProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
    }),
  ],
  output: {
    file: createFileName('.esm-browser.min'),
    format: 'es',
  },
}

// commonjs
const cjsConfig = {
  plugins: [
    replace({
      __DEV__: true,
    }),
  ],
  output: {
    file: createFileName('.common'),
    format: 'cjs',
  },
}
// cjs.prod
const cjsProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
    }),
  ],
  output: {
    file: createFileName('.common.min'),
    format: 'cjs',
  },
}

// global
const globalConfig = {
  plugins: [
    replace({
      __DEV__: true,
      'process.env.NODE_ENV': true,
    }),
  ],
  output: {
    file: createFileName(''),
    format: 'iife',
    name,
  },
}
// global.prod
const globalProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
      'process.env.NODE_ENV': true,
    }),
  ],
  output: {
    file: createFileName('.min'),
    format: 'iife',
    name,
  },
}

const prodFormatConfigs = [
  esBundleConfig,
  esBrowserProdConfig,
  esBrowserConfig,
  cjsConfig,
  cjsProdConfig,
  globalConfig,
  globalProdConfig,
]
const devFormatConfigs = [esBundleConfig]

function getFormatConfigs() {
  return process.env.NODE_ENV === 'development' ? devFormatConfigs : prodFormatConfigs
}

function createPackageConfigs() {
  return getFormatConfigs().map((formatConfig) => {
    return mergeConfig(createBaseConfig(), formatConfig)
  })
}

export default createPackageConfigs()
