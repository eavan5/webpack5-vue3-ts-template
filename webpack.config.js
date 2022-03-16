const { merge } = require('webpack-merge')
const baseConfig = require('./config/webpack.base.config')
const devConfig = require('./config/webpack.dev.config')
const proConfig = require('./config/webpack.pro.config')

module.exports = (env, argv) => {
  let config = argv.mode === 'development' ? devConfig : proConfig
  return merge(baseConfig, config)
}
