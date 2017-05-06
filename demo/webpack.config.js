const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.join(__dirname, './src/entry.js'),
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        // 开启服务器的模块热替换(HMR)

        contentBase: path.resolve(__dirname, 'dist'),
        // 输出文件的路径

        publicPath: '/'
        // 和上文 output 的“publicPath”值保持一致
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            use: [ 'babel-loader', ],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)

        new webpack.NamedModulesPlugin()
    ]
}
