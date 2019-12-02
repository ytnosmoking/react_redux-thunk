
const { override,
  addLessLoader,
  fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra')
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

console.log(override)
module.exports = override(
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

