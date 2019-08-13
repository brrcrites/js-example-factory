const path = require('path')

module.exports = {
    entry: './public/src/login.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    }
};
