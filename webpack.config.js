const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [' ', '.js', '.jsx'],
        modules: ['src', 'node_modules']
    }
};
