const path = require('path');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const { PROJECT_DIRECTORY } = require('./constants');

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
      chunkFilename: '[name].[contenthash].js',
      filename: '[name].[contenthash].js',
      assetModuleFilename: '[name].[contenthash][ext][query]',
    },
  },
  {
    optimization: {
      splitChunks: { chunks: 'all' },
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

const getConfig = (mode) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode });
    case 'development':
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig;
