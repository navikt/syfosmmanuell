const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.styles.js'
    },
    module: {
        rules: [
            { test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader'] }
        ]
    }
};