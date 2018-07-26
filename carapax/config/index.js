// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

const baseUrl = {
    keyauth: 'http://192.168.207.20:6749',
    gateway: 'http://192.168.207.33:8080',
    valuka: 'http://192.168.207.32:8080',
    dispatchCenter: 'http://192.168.207.18:8080',
    dataMonitor: 'http://192.168.103.30:8080',
};

// const baseUrl = {
//     keyauth: 'http://192.168.103.26:6749',
//     gateway: 'http://192.168.103.13:8080',
//     valuka: 'http://192.168.207.32:8080',   //暂时没用
//     dispatchCenter: 'http://192.168.103.35:8080',
//     dataMonitor: 'http://192.168.103.30:8080'
// };

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/messages': {
            target: baseUrl.gateway,
            changeOrigin: true,
            pathRewrite: {
                '^/messages': ''
            }
        },
        '/keyauth': {
            target: baseUrl.keyauth,
            changeOrigin: true,
            pathRewrite: {
                '^/keyauth': ''
            }
        },

        //设备网关
        '/gateway': {
            target: baseUrl.gateway,
            changeOrigin: true,
            pathRewrite: {
                '^/gateway': ''
            }
        },
        '/databus': {
            target: baseUrl.gateway,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                '^/databus': 'databus'
            }
        },

        //计算平台(valuka)
        '/valuka': {
            target: baseUrl.valuka,
            changeOrigin: true,
            pathRewrite: {
                '^/valuka': ''
            }
        },

        //调度中心
        '/dispatchCenter': {
            target: baseUrl.dispatchCenter,
            changeOrigin: true,
            pathRewrite: {
                '^/dispatchCenter': ''
            }
        },

        //数据监控
        '/dataMonitor': {
            target: baseUrl.dataMonitor,
            changeOrigin: true,
            pathRewrite: {
                '^/dataMonitor': ''
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
