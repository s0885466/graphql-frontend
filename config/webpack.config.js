const path = require('path');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

const commonConfig = merge([
  { entry: './src/index.tsx' },
  {
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
    },
  },
  parts.clean(),
  parts.resolve(),
  parts.loadScss(),
  parts.loadImages({ limit: 15000 }),
  parts.loadFonts(),
  parts.loadTypescript(),
  parts.loadQraphql(),
  parts.page(),
]);

const productionConfig = merge([
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  },
]);

const developmentConfig = merge([
  parts.devServer(),
  parts.generateSourceMaps('inline-source-map'),
]);

const getConfig = (mode) => {
  console.log('MODE', mode);
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
