const path = require('path');
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js',
  },
  mode: 'development',
  node: {
    fs: 'empty',
  },
  module : {
    rules: [
      {
        loader: 'babel-loader',
        test : /\.jsx?/,
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]      
          },
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpe?g|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
  plugins: [
    new Dotenv()
  ],
  watch: true,
};