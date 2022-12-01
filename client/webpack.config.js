const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
 
    // TODO: Add and configure workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),

      new WebpackPwaManifest({
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'A Progressive Text Editor Web App',
        background_color: '#ffffff',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          }
        ],
        inject: true,
        fingerprints: false
      })  
    ],

    module: {
      // TODO: Add CSS loaders and babel to webpack.
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              /* https://babeljs.io/docs/en/babel-preset-env */
              /* allow newer JS to work on various target environments */
              presets: ['@babel/preset-env'],
              plugins: [
                /* https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread */
                '@babel/plugin-proposal-object-rest-spread',
                /* https://babeljs.io/docs/en/babel-plugin-transform-runtime */
                /* allow babel to reuse helper code and reduce code size */
                '@babel/transform-runtime'
              ]
            }
          }
        }
      ],
    },
  };
};
