const path = require('path')

//vue-loader 1.5 之后再需要解析 vue文件 就需要依赖VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const HtmlPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

//css 文件的分离打包 生产环境 方便浏览器缓存
//webpack 4.0 已经失效 const miniCssExtractPlugin = require('extract-text-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'boundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
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
        new VueLoaderPlugin(),
        //区别vue 运行版本
        new webpack.DefinePlugin({
            'process.env': isDev ? '"devlopment"' : '"production"'
        }),
        //vue 项目需要html去解析vue文件 来运行html文件
        new HtmlPlugin()
    ]

}

if (isDev) {
    config.module.rules.push({
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
        })
        //配置devserver
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
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

    config.plugins.push(

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.less$/,
        use: [
            'css-loader',
            miniCssExtractPlugin.loader,
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
    })
    config.plugins.push(
        new miniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        })
    )
}


module.exports = config;