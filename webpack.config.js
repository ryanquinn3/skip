const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HtmlPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'template.html'
});

const commonChunks = new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
});

const sourceDir = path.resolve(__dirname, 'client');
const sourceFile = (file) => path.resolve(sourceDir, file);

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'material-ui'],
        app: path.resolve(sourceDir, 'index.tsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                options: {
                    configFileName: sourceFile('tsconfig.json')
                }
            }
        ]
    },
    plugins: [ HtmlPlugin, commonChunks ]
};
