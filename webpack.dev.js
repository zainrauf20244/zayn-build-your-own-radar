const { merge } = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const CopyPlugin = require('copy-webpack-plugin') // <-- Add this line

const common = require('./webpack.common.js')
const config = require('./src/config')
const { graphConfig, uiConfig } = require('./src/graphing/config')

const featureToggles = config().development.featureToggles
const main = ['./src/site.js']
const scssVariables = []

Object.entries(graphConfig).forEach(function ([key, value]) {
  scssVariables.push(`$${key}: ${value}px;`)
})

Object.entries(uiConfig).forEach(function ([key, value]) {
  scssVariables.push(`$${key}: ${value}px;`)
})

Object.entries(featureToggles).forEach(function ([key, value]) {
  scssVariables.push(`$${key}: ${value};`)
})

module.exports = merge(common, {
  mode: 'development',
  entry: { main: main },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1, modules: 'global', url: false },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({ browsers: 'last 2 versions' }),
                  cssnano({
                    preset: ['default', { discardComments: { removeAll: true } }],
                  }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: scssVariables.join('\n'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': JSON.stringify('development'),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'techradar-data.csv', to: 'techradar-data.csv' },
        { from: 'src/images/logo_main.png', to: 'images/logo_main.png' },
        { from: 'src/images/banner1.jpeg', to: 'images/banner1.jpeg' },
        { from: 'src/images/banner1.jpg', to: 'images/banner1.jpg' },
      ],
    }),
  ],
  devtool: 'source-map',
})