//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//引入store
import store from '@/store'
//利用axios的对象方法创建一个axios实例
//request 就是axios的实例对象
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径会出现/api
    baseURL: 'http://localhost:8080/api',
    timeout: 5000,
})
//请求拦截器
requests.interceptors.request.use((config) => {
    //config:配置对象，为一次请求的所有配置项,里面headers请求头很重要
    //进度条开始动
    nprogress.start()
    //请求头
    if(store.state.detail.uuid_token){
        //请求头添加一个字段：和后台老师商量好了
        //uuid_token为凭据，凭据正确允许对服务器请求
        config.headers.userTempId=store.state.detail.uuid_token
    }
     if(store.state.user.token){
        config.headers.token=store.state.user.token
    } 
    //config.headers.token=localStorage.getItem('token_sg')
    return config
});
//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应返回数据以后，拦截器检测到，可以做一些事
    //进度条结束
    nprogress.done()
    return res.data
},(error) => {
    //响应失败回调函数
    return Promise.reject(new Error('faile') )
})
export default requests