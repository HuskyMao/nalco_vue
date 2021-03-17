let path = require('path')
function resolve(str) {
    return path.join(__dirname, 'src', str)
}

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('-c', resolve('components'))
            .set('-v', resolve('views'))
            .set('-a', resolve('assets'))
        config
            .plugin('html')
            .tap(args => {
                args[0].title = ""
                return args
            })
    },
    publicPath: './' //发布用
}
