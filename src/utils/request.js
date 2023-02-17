import axios from 'axios'
import ElementUI from 'element-ui'


// 创建axios实例
/**
 * vue本身不支持发送AJAX请求，需要使用vue-resource、axios等插件实现。
 * axios是一个基于Promise的HTTP请求客户端，用来发送请求，也是vue2.0官方推荐的，同时不再对vue-resource进行更新和维护。
 * 使用axios发送AJAX请求
//1. axios的基本使用
 axios({
  url:'http://123.207.32.32:8000/home/multidata'
}).then(res=>{
  console.log(res);
})

 axios({
  url:'http://123.207.32.32:8000/home/data',
  //专门针对get请求的参数拼接
  params:{
    type:'pop',
    page:1
  }
}).then(res=>{
  console.log(res);
})
 // 2.axios发送并发请求   两个请求都完成再做处理
 axios.all([axios({
  url:'http://123.207.32.32:8000/home/multidata'
}),axios({
  url:'http://123.207.32.32:8000/home/data',
  //注意一下，get对应params参数拼接，post对应data 请求体
  params:{
    type:'sell',
    page:4
  }
}
 )]).then(axios.spread((res1,res2)=>{
  //返回一个数组，用spread延展
console.log(res1);
console.log(res2);
}
 ))
 */
const service = axios.create({
  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
  baseURL:process.env.BASE_API,
  // 超时时间
  timeout:60000
});

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
// let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{};
// if(user){
//     config.headers['token'] = user.token;  // 设置请求头
// }

  return config
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
service.interceptors.response.use(
  response => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    //权限验证不足,给出提示
    if (res.code==='401'){
      ElementUI.Message({
        message:res.msg,
        type:'error'
      })
    }
    return res;
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
