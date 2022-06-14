import path from 'path';
import { merge } from 'webpack-merge';
import * as parts from './webpack.parts.js';
import { PROJECT_DIRECTORY } from './constants.js';

const commonConfig = merge([
  { entry: path.resolve(PROJECT_DIRECTORY, 'src/index.tsx') },
  {
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(PROJECT_DIRECTORY, 'dist'),
    },
  },
  parts.resolve(),
  parts.clean(),
  parts.loadScss(),
  parts.loadImages({ limit: 15000 }),
  parts.loadFonts(),
  parts.loadTypescript(),
  parts.loadQraphql(),
  parts.page(),
]);

const productionConfig = merge([
  parts.bundleAnalyze(),
  {
    output: {
      chunkFilename: 'js/[name].[contenthash].js',
      filename: 'js/[name].[contenthash].js',
    },
  },
  {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        cacheGroups: {
          defaultVendors: {
            filename: 'js/vendor-[name].bundle.js',
          },
        },
      },
      runtimeChunk: { name: 'runtime' },
    },
  },
  {
    performance: {
      hints: 'warning', // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 100000, // in bytes
    },
  },
]);

const developmentConfig = merge([
  parts.devServer(),
  parts.generateSourceMaps('inline-source-map'),
]);

export const getConfig = (mode) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode });
    case 'development':
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};
