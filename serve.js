// class Server{
//     // 参数 

//     // 构造函数  传参数 初始化类的 属性
//     constructor(url,methods){
//         this.url = url,
//         this.methods = methods
//     }
//     url:"",
//  添加请求拦截器 
this.$axios.interceptors.request.use(config => {
     // 请求拦截 成功回调函数
     config =>{
         console.log(config)
     }
     //  必须返回 config
    return config;
},
 error => {
});
// 添加相应拦截器 
this.$axiosaxios.interceptors.response.use(response => {
// Do something before response is sent
return response;
},error => {
// Do something with response error
return Promise.reject(error);
});
//  先执行请求拦截器 后执行相应拦截器 最后执行 网络请求的回调函数  then catch
//  请求拦截器 是后添加但是先执行