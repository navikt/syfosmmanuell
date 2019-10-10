const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.nostyles.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.less$/,
                loader: 'ignore-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?name=src/img/[name].[ext]',
            },
        ],
    },
};
