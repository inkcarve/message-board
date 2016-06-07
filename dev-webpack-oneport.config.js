var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: {
        app: [
            './src/client/index.jsx',
            //'webpack-dev-server/client?http://127.0.0.1:8080',
             //'webpack-hot-middleware/client?path=http://127.0.0.1:8080/__webpack_hmr',
             hotMiddlewareScript,
            //'webpack/hot/only-dev-server' // '如果不是only-dev-server是dev-server， HMR 更新失败之后会當自動刷新整个页面
        ],
        lib: ['jquery', 'bootstrap-sass', "react", "react-dom", "react-router", "redux"]
    },
    output: {
        path: __dirname + '/views/',
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "lib", /* filename= */ "lib.js"),
        new webpack.DefinePlugin({
    '__DEV__': true,
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
        //new ExtractTextPlugin(path.resolve(__dirname, './src/client/scss'), path.resolve(__dirname, './node_modules'))
    ],
    resolve: {
        extensions: ['', '.js'],
    },
    externals: {
        //load some libary from public CDN outside , and need add <script src=""> to HTML
    },
    module: {
        noParse: ['jquery', 'bootstrap-sass', "react"],
        loaders: [{
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel-loader'],
                exclude: /node_modules/,
                include: path.join(__dirname, './src/')
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                //include: path.join(__dirname, './vendor/')
            }, {
                test: /\.json$/,
                loader: 'json'
            },
            // other loaders 
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap'
                //ExtractTextPlugin.extract(
                //      'style!css!sass?sourceMap'
                //)
            }, {
                test: require.resolve('react-dom'),
                loader: 'expose?ReactDOM'
            }, {
                test: require.resolve('react'),
                loader: 'expose?React'
            }, {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery'
            }, {
                test: require.resolve('jquery'),
                loader: 'expose?$'
            }, {
                test: /\.eot(\?\S*)?$/,
                loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
            }, {
                test: /\.woff2(\?\S*)?$/,
                loader: 'url-loader?limit=100000&mimetype=application/font-woff2'
            }, {
                test: /\.woff(\?\S*)?$/,
                loader: 'url-loader?limit=100000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?\S*)?$/,
                loader: 'url-loader?limit=100000&mimetype=application/font-ttf'
            }, {
                test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            } // inline base64 URLs for <=8k images, direct URLs for the rest

        ],
        query: {
            //      presets: ['react', 'es2015', 'stage-2'],
            //      plugins: ['transform-runtime']
        }
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './src/client/scss'), path.resolve(__dirname, './node_modules')]
    },
}