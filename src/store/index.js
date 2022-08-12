import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
//处理action，可以书写自己的逻辑，也可以处理异步
/* const actions={
    这里可以书写业务逻辑，但是不能修改state
    }
修改state
const mutations={}
仓库储存数据
const state={}
理解为计算属性，用于简化数据，使得组件获取仓库的数据更加方便
const getters={} */
//对外暴露store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块式开发存储数据
    modules:{
        //注册对应的小仓库
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})