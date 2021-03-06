const path = require('path')
    , webpack = require('webpack')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
    , CleanWebpackPlugin = require('clean-webpack-plugin')
    , merge = require('webpack-merge')
    , webpackBaseConfig = require('./webpack.base.conf')
    ;

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.resolve('dist'),
        filename: 'scripts/[name].[chunkhash].js'
    },
    plugins: [
        //使用production环境构建，消除vue warning
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new CleanWebpackPlugin(path.resolve('dist'), {
            root: path.resolve('./')
        }),
        new UglifyjsWebpackPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        // 提取第三方 js css
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return module.resource
                    // && /\.js$/.test(module.resource)
                    && module.resource.indexOf('node_modules') != -1
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'mainifest',
            chunks: ['vendor']
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
});