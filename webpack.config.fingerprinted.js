const path = require('path');

module.exports = {
    entry: {
        fetcher: path.resolve(__dirname, 'src', 'main', 'resources', 'staticSources', 'fetcher.es6')
    },

    module: {
        rules: [
            {
                test: /\.(js|es6)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    mode: "production",

    resolve: {
        extensions: ['*', '.js', '.es6', '.es']
    },

    output: {
        path: path.resolve(__dirname, 'build', 'resources', 'main', 'static', 'fingerprinted'),
        filename: '[name].[contenthash:8].js',
    },
};

