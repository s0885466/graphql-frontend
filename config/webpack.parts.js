const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

exports.devServer = () => ({
  devServer: {
    hot: true,
    port: 3000,
    open: true,
  },
});

exports.generateSourceMaps = (devtool) => ({
  devtool,
});

exports.clean = () => ({
  output: {
    clean: true,
  },
});

exports.loadTypescript = () => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
});

exports.loadQraphql = () => ({
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
});

exports.loadScss = () => ({
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: {} },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: [require('autoprefixer')()] },
            },
          },
          'sass-loader',
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
});

exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});

exports.loadFonts = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
});

exports.resolve = () => ({
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
});

exports.page = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
    }),
  ],
});
