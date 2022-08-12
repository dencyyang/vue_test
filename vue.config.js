module.exports = {
  //关闭语法检查eslint
  lintOnSave: false,
  //开启代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        ws: true,//用于支持websocket
        changeOrigin: true
      }
    }
  }
}
