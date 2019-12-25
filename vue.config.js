module.exports ={
  // publicPath: '/',
  //   devServer: {   
  //       open:true,
  //       proxy: {
  //         "/xbapp": {
  //           target:"",   // 要请求的后台地址 小布接口网站
  //           ws: true,    // 启用websockets
  //           changeOrigin: true,    // 是否跨域
  //           secure:false, 
  //           pathRewrite: {   
  //             "^/xbapp": ""          // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
  //           }
  //         }
  //       }
  //     }
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8081,
    https: true,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
   },
   configureWebpack: {
    externals: {
      AMap: "window.AMap"
    }
  }
   
  
}