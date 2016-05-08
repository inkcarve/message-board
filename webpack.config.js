var webpack = require('webpack');
var path = require('path');


module.exports = {
  devtool: 'inline-source-map',
  entry: [
  'webpack-dev-server/client?http://127.0.0.1:8080',
  'webpack/hot/only-dev-server',
  //'webpack/hot/dev-server',
  './src/client/index.jsx',
    //'./vendor/js/react/react.min'
  ],
  output: {
    path: __dirname + '/views/',
    filename: 'bundle.js',
    publicPath: 'http://127.0.0.1:8080/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {extensions: ['', '.js']},
  module: {
    loaders: [
      { 
      test: /\.jsx$/,
      loaders: ['react-hot' , 'babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, './src/')
      },
      { 
      test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
      //include: path.join(__dirname, './vendor/')
      },
    ],
    query: {
    //      presets: ['react', 'es2015', 'stage-2'],
    //      plugins: ['transform-runtime']
      }
  }
}

  /*
module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080',
    'webpack/hot/only-dev-server',
    './build/client/index',
  ],
  output: {
    path: __dirname + '/views/',
    filename: 'bundle.js',
    publicPath: 'http://127.0.0.1:8080/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ }
    ]
  }
}
*/
