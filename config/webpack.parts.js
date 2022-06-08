const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

exports.devServer = () => ({
  devServer: {
    hot: true,
    port: 3000,
    open: true,
  },
});

exports.devtool = (devtool) => ({
  devtool,
});

exports.loaders = () => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
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
