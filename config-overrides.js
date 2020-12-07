
// adjustStyleLoaders,
const {
  override,
  addLessLoader,
  // addBundleVisualizer, // 模块分析页
  // fixBabelImports, // 动态组件引入
  addDecoratorsLegacy, // 装饰器 模式
  addWebpackAlias, // alias 别名
  addWebpackExternals
} = require("customize-cra");

const CompressionPlugin = require('compression-webpack-plugin') // Gzip  只用在 开发阶段
const gzip = new CompressionPlugin({ // 文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
  filename: '[name].gz[query]',
  algorithm: 'gzip',
  test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
  threshold: 8192,
  minRatio: 0.8
})

const WebpackBar = require('webpackbar');
const timeBar = new WebpackBar()

// var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const webpack = require('webpack')

// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

// const dllPath = 'public/vendor'
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const isDev = process.env.NODE_ENV === "development";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
const plugins = [
  timeBar,
  gzip
  // new HardSourceWebpackPlugin()
];
const commonCss = [
  'https://cdn.bootcdn.net/ajax/libs/antd/3.26.2/antd.min.css'
  // 'https://cdn.bootcdn.net/ajax/libs/animate.css/2.0/animate.min.css'
]

const cdn = {
  dev: {
    css: commonCss,
    js: []
  },
  pro: {
    css: commonCss,
    js: [
      // 'https://cdn.bootcdn.net/ajax/libs/react/16.13.1/cjs/react.production.min.js',
      // '/vendor/react.dll.js',
      // 'https://cdn.bootcdn.net/ajax/libs/antd/3.26.2/antd.min.js',
      // 'https://cdn.bootcdn.net/ajax/libs/moment.js/2.26.0/moment.min.js'
      // 'https://cdn.bootcdn.net/ajax/libs/axios/0.20.0/axios.min.js'
      // 'https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js'
      // 'https://cdn.bootcdn.net/ajax/libs/react-transition-group/4.4.1/react-transition-group.min.js'
    ]
  }
}

const externals = isDev ? {} : {

  // antd: 'antd',
  // axios: 'axios',
  // moment: 'moment'

}

plugins.push(new BundleAnalyzerPlugin({
  analyzerPort: 8889
}));

// let dllName = ['react']

// const dllName = ['react', 'ui']
// const dllName = ['ui']

// dllName.forEach((item) => {
//   plugins.push(
//     new webpack.DllReferencePlugin({
//       context: process.cwd(),
//       manifest: require(path.join(__dirname, dllPath, `${item}-manifest.json`))
//     })
//   )
// })
// plugins.push(new AddAssetHtmlPlugin({
//   // dll文件位置
//   filepath: path.join(__dirname, dllPath, './*.dll.js'),
//   publicPath: '/vendor', // dll 引用路径
//   outputPath: './vendor' // dll最终输出的目录
// }))

const customize = () => config => {
  // config.devtool = false
  // splitChunk Default // 好像就用默认的 优化度是最高的
  config.optimization.splitChunks = {
    chunks: "all", // async   defaultSplitChunks
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 2,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        name: 'lib-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      commons: {
        name: 'lib-commons',
        test: path.resolve(__dirname, 'src'),
        minChunks: 2, //  minimum common number
        priority: 10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
  // config.optimization.splitChunks = {
  //   chunks: "all",
  //   minSize: 20000,
  //   minChunks: 1,
  //   maxAsyncRequests: 5,
  //   maxInitialRequests: 3,
  //   // automaticNameDelimiter: '~',
  //   name: true,
  //   cacheGroups: {
  //     libs: {
  //       name: 'chunk-libs',
  //       test: /[\\/]node_modules[\\/]/,
  //       priority: 10,
  //       chunks: 'initial' // only package third parties that are initially dependent
  //     },
  //     commons: {
  //       name: 'chunk-commons',
  //       test: path.resolve(__dirname, 'src/components'),
  //       minChunks: 2, //  minimum common number
  //       priority: 5,
  //       reuseExistingChunk: true
  //     }
  //   }
  // }
  if (!isDev) {
    config.devtool = false
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === "TerserPlugin") {
          minimizer.options.terserOptions.compress.drop_console = true;
        }
      });
    }
  }

  // style-resource-loader
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  loaders[loaders.length - 3].use.push({
    loader: "style-resources-loader",
    options: {
      patterns:
        [
          resolve("src/assets/css/common.less"),
          resolve("src/assets/css/animate.less")
        ],
      injector: "append"
    }
  });

  const html = config.plugins[0]
  if (isDev) {
    html.options.cdn = cdn.dev
  } else {
    html.options.cdn = cdn.pro
  }

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

  // fixBabelImports("import", {
  //   libraryName: "antd",
  //   libraryDirectory: "es",
  //   style: "css"
  // }),

  // addBundleVisualizer({
  //   "analyzerMode": "static",
  //   "reportFilename": "report.html"
  // }), // 需要 "webpack-bundle-analyzer
  addDecoratorsLegacy(),
  addWebpackAlias({
    views: resolve("src/views"),
    component: resolve("src/components"),
    store: resolve("src/store"),
    utils: resolve("src/utils"),
    router: resolve("src/router")
  }),
  addWebpackExternals(externals)

);

