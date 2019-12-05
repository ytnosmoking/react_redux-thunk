
const { override,
  addLessLoader,
  fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
const addPlugin = () => {
  return config => {

    let plugins = []
    if (isDev) {
      plugins = [...plugins, new BundleAnalyzerPlugin()]
    }

    config.plugins = [...config.plugins, ...plugins]
    return config
  }
}


console.log(override)
module.exports = override(
  addPlugin(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addDecoratorsLegacy(),
  addLessLoader(
    {
      javascriptEnabled: true,
      // modifyVars: { '@primary-color': '#1DA57A' },
    }
  ),
  addWebpackAlias({
    views: resolve('src/views'),
    component: resolve('src/components'),
    store: resolve('src/store'),
    utils: resolve('src/utils'),
    router: resolve('src/router')
  })
)

