import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

const { preprocess } = require('./svelte.config')

const dev = process.env.NODE_ENV === 'development'
const sourcemap = dev ? 'inline' : false

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase())

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.module, format: 'es', sourcemap },
    { file: pkg.main, format: 'umd', name, sourcemap },
  ],
  plugins: [
    svelte({
      compilerOptions: {
        dev,
      },
      emitCss: true,
      preprocess,
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    typescript({
      noEmitOnError: !dev,
      sourceMap: !!sourcemap,
    }),
  ],
}
