// adjustStyleLoaders,
const {
  override,
  addLessLoader,
  fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const changePath = () => config => {
  // const path = require('path');
  console.log(config.output)
  //  const paths = require('react-scripts/config/paths');
  //  paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
  config.output.publicPath = isDev ? config.output.publicPath : './';
  return config
}

const dropConsole = () => {
  return (config) => {
    // console.log(config.optimization.minimizer)
    if (!isDev && config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config;
  }
}

const addPlugin = () => {
  return config => {
    let plugins = []
    if (isDev) {
      plugins = [
        ...plugins,
        new BundleAnalyzerPlugin()
      ]
    }
    config.plugins = [...config.plugins, ...plugins]
    return config
  }
}
const sourceMap = () => config => {
  config.devtool = isDev ? 'cheap-module-source-map' : false;
  return config
}

const debugLessLoader = () => config => {
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf
  // console.log(loaders[loaders.length - 3].use[1].options.modules)
  loaders[loaders.length - 3].use.push({
    loader: 'style-resources-loader',
    options: {
      patterns:
        [
          resolve('src/assets/css/common.less'),
          resolve('src/assets/css/animate.less')
        ],
      injector: 'append'
    }
  })
  return config
}


module.exports = override(
  changePath(),
  addLessLoader(
    {
      javascriptEnabled: true,
      // modifyVars: { '@primary-color': '#1DA57A' },
    }
  ),
  debugLessLoader(),
  // adjustStyleLoaders(({ use: [less, css, postcss, resolve, processor] }) => {
  //   console.log('--------------start------------------')
  //   console.log(less)
  //   console.log('---------------end------------------')
  //   css.options.sourceMap = false;         // css-loader
  //   postcss.options.sourceMap = false;     // postcss-loader
  //   // when enable pre-processor,
  //   // resolve-url-loader will be enabled too
  //   if (resolve) {
  //     resolve.options.sourceMap = false;   // resolve-url-loader
  //   }
  // }),
  dropConsole(),
  sourceMap(),
  addPlugin(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addDecoratorsLegacy(),
  addWebpackAlias({
    views: resolve('src/views'),
    component: resolve('src/components'),
    store: resolve('src/store'),
    utils: resolve('src/utils'),
    router: resolve('src/router')
  })
)

