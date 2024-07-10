/* eslint-disable import/no-anonymous-default-export */
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';
const path = require('path');

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'esm', sourcemap: true },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      alias({
        entries: [{ find: '~', replacement: path.resolve(path.resolve(__dirname), 'src') }],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: { emitDeclarationOnly: true, declaration: true, outDir: 'types' },
      }),
      uglify(),
      babel({ babelHelpers: 'bundled' }),
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
