//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//利用axios的对象方法创建一个axios实例
//request 就是axios的实例对象
const mockRequests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径会出现/api
    baseURL: '/mock',
    timeout: 5000,

})
//请求拦截器
mockRequests.interceptors.request.use((config) => {
    //config:配置对象，里面headers请求头很重要
    //进度条开始动
    nprogress.start()
    return config
});
//响应拦截器
mockRequests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应返回数据以后，拦截器检测到，可以做一些事
    //进度条结束
    nprogress.done()
    return res.data
},(error) => {
    //响应失败回调函数
    return Promise.reject(new Error('faile') )
})
export default mockRequests