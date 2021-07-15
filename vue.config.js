module.exports = {
    publicPath: process.env.PUBLIC_URL || "/",
    lintOnSave: process.env.NODE_ENV !== 'production',
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Index Page',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    }
}