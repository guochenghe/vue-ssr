const autoPrefixer = require('autoprefixer')
    //后处理css 文件 ==>针对已经生成的css文件 做后续处理
module.exports = {
    plugins: [
        autoPrefixer()
    ]
}