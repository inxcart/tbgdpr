const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const production = (process.env.NODE_ENV === 'production');
const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
];
const optimization = {
  minimizer: [],
};

if (production) {
  optimization.minimizer.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        cache: true,
        parallel: true,
        output: {
          comments: false,
        },
      },
    })
  );
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  );
  plugins.push(
    new webpack.BannerPlugin(`Copyright (C) 2017-2018 thirty bees

NOTICE OF LICENSE

This source file is subject to the Academic Free License (AFL 3.0)
that is bundled with this package in the file LICENSE.md
It is also available through the world-wide-web at this URL:
http://opensource.org/licenses/afl-3.0.php
If you did not receive a copy of the license and are unable to
obtain it through the world-wide-web, please send an email
to license@thirtybees.com so we can send you a copy immediately.

@author    thirty bees <contact@thirtybees.com>
@copyright 2017-2018 thirty bees
@license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
`),
  );
} else {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true,
    })
  );
}

module.exports = {
  entry: {
    export: [
      './export/src/main.jsx',
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: '[name]-__BUILD_HASH__.bundle.min.js',
    libraryTarget: 'var',
    library: ['TbGdprModule', '[name]'],
  },
  devtool: production ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'export/src'),
          path.join(__dirname, 'misc'),
        ],
        exclude: path.join(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'jsx-control-statements',
              'transform-class-properties',
            ],
            presets: [
              ['env', {
                targets: {
                  browsers: [
                    'defaults',
                    'ie >= 9',
                    'ie_mob >= 10',
                    'edge >= 12',
                    'chrome >= 30',
                    'chromeandroid >= 30',
                    'android >= 4.4',
                    'ff >= 30',
                    'safari >= 9',
                    'ios >= 9',
                    'opera >= 36',
                  ],
                },
                useBuiltIns: 'entry',
                debug: false,
              }],
              'react',
              'stage-3',
            ],
            sourceMap: !production,
          },
        },
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: [
          path.join(__dirname, 'export/css'),
        ],
      },
      {
        test: /\.less$/,
        include: [
          path.join(__dirname, 'export/less'),
        ],
        loader: 'style-loader!css-loader!less-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  plugins,
  optimization,
};