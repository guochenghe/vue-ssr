const path = require('path')

//vue-loader 1.5 之后再需要解析 vue文件 就需要依赖VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

console.log(process.env.NODE_ENV)
const config = {
    mode: process.env.NODE_ENV || 'production',
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'boundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //排除nodemodules 编译
                exclude: /node_modules/
            },
            {
                test: /\.(gif|png|jpeg|jpg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]

}


module.exports = config;