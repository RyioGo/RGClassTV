module.exports = {
  publicPath: "./", // 公共路径
  outputDir: "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: ["./src/static/theme/default.less"],
    },
  },
  devServer: {
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      //配置多个跨域
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "/",
        },
      },
    },
  },
};
