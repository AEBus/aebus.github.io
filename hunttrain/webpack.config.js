const path = require('path');
const webpack = require('webpack');

/**
 * Webpack config file. Bare bones~ish.
 */

module.exports = (env) => {
    return require(`./webpack.${env}.js`);
}