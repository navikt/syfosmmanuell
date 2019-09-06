const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.styles.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            { 
                test: /\.less$/, 
                loader: ['style-loader', 'css-loader', 'less-loader'] 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
    ]
};