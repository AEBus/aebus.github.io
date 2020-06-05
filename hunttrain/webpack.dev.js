const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack')

const paths = require('./paths');

/**
 * Webpack config file. Bare bones~ish.
 */

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    // The actual build below
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static'),
        publicPath: '/'
    },
    // Dev server configs for `webpack-dev-server` module.
    devServer: {
        contentBase: path.join(__dirname, "static"),
        compress: true,
        port: 9000,
        historyApiFallback: true
    },
    plugins: [
        new Dotenv({
            path: './.env.dev'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                    // plugins: ["transform-class-properties"]
                }
            },
            // {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        // You can add a resolve for '.scss' here so you don't have to
        // specify file extensions in your components.
        extensions: ['.jsx', '.js', 'scss'],
        modules: ['node_modules'],
        // Aliases help with shortening relative paths
        // 'Components/button' === '../../../components/button'
        alias: {
            Components: path.resolve(paths.appSrc, 'components'),
            Containers: path.resolve(paths.appSrc, 'containers'),
            Utils: path.resolve(paths.appSrc, 'utils'),
            '@A': path.resolve(paths.appComponents, '_atoms'), // atom
            '@M': path.resolve(paths.appComponents, '_molecules'), // molelcule
            '@O': path.resolve(paths.appComponents, '_organisms'), // organism
        },
    }
};