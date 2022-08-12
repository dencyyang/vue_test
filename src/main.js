import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router/index'
//引入仓库
import store from './store' 
//定义全局组件：在入口文件注册一次之后在任意组件都可以执行
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//引入MockServer.js---模拟数据
import '@/mock/mockServer'
//引入swiper样式，在此处引入所有组件都可以使用
import 'swiper/css/swiper.css'
//统一接口api文件夹中的全部请求函数
import * as API from '@/api'
//注册全局组件第一个全局组件的名字 第二个参数哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
//element-ui按需引入 
import {Button, MessageBox} from 'element-ui'
//element-ui第一种注册全局组件
Vue.component(Button.name,Button)
import cat from '@/assets/101.gif'
//引入插件
import VueLazyload from 'vue-lazyload'
//使用插件
Vue.use(VueLazyload, {
  loading:cat ,
})
//引入表单校验插件
import'@/plugins/validate'
//引入自定义插件
import myPlugins from './plugins/myPlugin'
Vue.use(myPlugins)
new Vue({
  render: h => h(App),
  //注册全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
    //将API挂在Vue原型上
    Vue.prototype.$API=API
    //element-ui第二种注册方法挂在原型上
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  //注册路由，KV简写形式
  //注册路由信息：当书写router时，每个组件都有$route、$router属性
  router,
  //注册仓库：组件实例身上有一个$store属性
  store
}).$mount('#app')
