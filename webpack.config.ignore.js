const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.nostyles.js'
    },
    module: {
        rules: [
            { test: /\.less$/, loader: 'ignore-loader' }
        ]
    }
};