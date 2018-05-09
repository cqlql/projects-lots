let path = require('path');
let webpack = require('webpack');

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let getIPAdress = require('../../build/get-ip-adress')

function resolve(p) {
    return path.resolve(__dirname, p)
}

let conf = {
    entry: {
        main: ["./src/js/record.js"]
    },
    output: {
        path: path.resolve(__dirname, './dist'),

        filename: "js/[name].[chunkhash:7].js",
        chunkFilename: 'js/[name].bundle.[chunkhash:7].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './report.html',
            template: './src/record.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: './report-ios.html',
            template: './src/record-ios.html',
            chunks: ['main']
        }),
        new ExtractTextPlugin('css/[name].css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: ['common']
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   children: true,
        //   minChunks: function (module) {
        //     return (/.css$/).test(module.resource)
        //   }
        // }),
    ],

    module: {
        //加载器配置
        rules: [{
            test: /\.js$/,
            include: [resolve('src')],
            loader: 'babel-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,//单位 字节，1千字节(kb)=1024字节(b)
                // path: '/',
                // publicPath: '../',
                name: 'imgs/[name].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                // publicPath: '../',
                // name: '../fonts/[name].[hash:7].[ext]'
                name: 'fonts/[name].[ext]'
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader', // 超有用，不要漏了。解决 vue 单文件 js(import) 方式导入 css 无效问题
                use: ['css-loader', 'postcss-loader']
            }),
            // use: ['style-loader','css-loader','postcss-loader']

        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        // host: '192.168.1.222',
        host: getIPAdress(),
        port: 3002,
        // openPage: 'http://192.168.1.222',
        inline: true
      }
}

module.exports = conf
