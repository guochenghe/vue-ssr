const webpack = require('webpack')

const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = require('./webpack.config.base')
    //能够很好的合并配置项
const merge = require('webpack-merge')

const devServer = {
        port: '8000',
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        //运行devserver的时候自动打开浏览器
        open: false,
        //整个只是重新渲染部分改过的组件
        hot: true
    }
    //区别服务端渲染和 浏览器端渲染
    //服务端渲染不需要htmlPlugin 等插件
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': isDev ? '"development"' : '"production"'
    }),
    //vue 项目需要html去解析vue文件 来运行html文件
    new HtmlPlugin({
        template: path.join(__dirname, 'template.html')
    })
]

//css 文件的分离打包 生产环境 方便浏览器缓存
//webpack 4.0 已经失效 const miniCssExtractPlugin = require('extract-text-webpack-plugin')
//const miniCssExtractPlugin = require('mini-css-extract-plugin')
if (isDev) {
    config = merge(baseConfig, {
        module: {
            rules: [{
                test: /\.less$/,
                use: [
                    //主要是将解析好的css 插入到head里面的style 内联样式
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'less-loader'

                ]
            }]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [{
                test: /\.less$/,
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'less-loader'
                ]
            }]
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: true
        },
        plugins: [
            /*new miniCssExtractPlugin({
                filename: "[name].[hash].css",
                chunkFilename: "[id].[hash].css"
            })*/
        ]
    })
}


module.exports = config;