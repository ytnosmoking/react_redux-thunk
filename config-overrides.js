
// adjustStyleLoaders,
const {
  override,
  addLessLoader,
  fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
const plugins = [];
if (isDev) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 8889
  }));
}

const customize = () => config => {
  if (!isDev) {
    // pubicPath
    // config.output.publicPath = './';
    // dropConsole
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true;
        }
      });
    }
  }

  // style-resource-loader
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
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
  });
  // addPlugin
  config.plugins.push(...plugins);
  return config;
};

module.exports = override(

  addLessLoader(
    {
      javascriptEnabled: true
      // modifyVars: { '@primary-color': '#1DA57A' },
    }
  ),
  customize(),
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
);

