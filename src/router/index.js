//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import { removeToken } from '@/utils/token'
//引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)
//引入路由组件
//换为路由懒加载写法  () => import('@/pages/Home'),
/* import Home from "@/pages/Home"  
import Login from "@/pages/Login"
import Register from '@/pages/Register'
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from "@/pages/Center/GroupOrder" */
//解决编程式导航多次点击控制台报错
//备份VueRouter原型对象的push
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数告诉原push方法往哪里跳转
//第二个参数：成功回调
//第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        /*call和apply区别
        相同点：都可以调用一次函数，都可以篡改上下文一次
        不同点：call和apply传递参数：call传递参数用逗号分开，apply方法执行传递数组
        */
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
let router = new VueRouter({
    //配置路由
    routes: [
        {
            name: 'home',
            path: '/home',
            component:() => import('@/pages/Home'),
            meta: {
                isShow: true,
                title:'首页'
            }
        },
        {
            name: "login",
            path: '/login',
            component: () => import('@/pages/Login'),
            meta: {
                isShow: false,
                title:'用户登录'
            }
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: {
                isShow: false,
                title:'用户注册'
            }
        },
        {   //params参数占位时加上？则params参数可传也可不传
            //如果设置的params参数占位而没有传递params参数，URL路径会出错
            name: 'search',
            path: '/search/:keyword?',
            component: () => import('@/pages/Search'),
            //路由组件传递props参数
            //第一种写法，只适用于params参数(路由跳转时传递的)，路由组件可以直接接收
            props: true,
            //第二种对象写法，额外的给路由组件传递参数(配置项中传递)
            //props:{a:1,b:2},
            //第三种函数写法：params、query参数都可以，通过props传递给路由组件
            /*  props:($route) => {
                 return {keyword:$route.params,keyword:$route.query.k}
             }, */
            meta: {
                isShow: true,
                title:'商品搜索'
            }
        },
        {
            name: "detail",
            path: '/detail/:skuid?',
            component: () => import('@/pages/Detail'),
            meta: {
                isShow: true,
                title:'商品详情'
            }
        },
        {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: () => import('@/pages/AddCartSuccess'),
            meta: {
                isShow: true,
                title:'添加到购物车'
            }
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: () => import('@/pages/ShopCart'),
            meta: {
                isShow: true,
                title:'购物车'
            }
        },
        {   
            name:'trade',
            path:'/trade',
            component:() => import('@/pages/Trade'),
            meta:{
                title:'提交订单',
            },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if(from.fullPath=='/shopcart'||from.fullPath=='/'){
                    next()
                }else{
                    //next(false)从哪来回哪去
                    next(false)
                }
            }

        },
        {
            name:'pay',
            path:'/pay',
            component:() => import('@/pages/Pay'),
            meta:{
                title:'订单支付',
            },
            
             //路由独享守卫
            beforeEnter: (to, from, next) => {
                if(from.fullPath=='/trade'){
                    next()
                }else{
                    //next(false)从哪来回哪去
                    next(false)
                }
            }
        },
        {
            name:'paysuccess',
            path:'/paysuccess',
            component:() => import('@/pages/PaySuccess'),
            meta:{
                title:'订单支付'
            },
            
             //路由独享守卫
           /*   beforeEnter: (to, from, next) => {
                if(from.fullPath=='/pay'){
                    next()
                }else{
                    //next(false)从哪来回哪去
                    next(false)
                }
            } */
            //组件内守卫
        },
        {
            name:'center',
            path:'/center',
            component:() => import('@/pages/Center'),
            meta:{
               title:'个人中心',
            },
            
            //二级路由组件
            children:[
                {
                    name:'myorder',
                    path:'myorder',
                    component:() => import('@/pages/Center/MyOrder'),
                    meta:{
                        title:'个人中心',
                     },
                },
                {
                    name:'grouporder',
                    path:'grouporder',
                    component:() => import('@/pages/Center/GroupOrder'),
                    meta:{
                        title:'个人中心',
                     },
                },
                {
                    //二级路由重定向
                    path:'/center',
                    redirect:'/center/myorder'
                }
             ]
        },
        //重定向，在项目运行的时候访问 /，定向到首页
        {
            path: '*',
            redirect: "home"
        }
    ],
    //控制滚动行为
    //x,y表示滚动条位置，表示路由跳转之后滚动条在最顶端
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
//暴露路由
export default router
//全局路由守卫：前置守卫(在路由跳转前进行判断)
router.beforeEach(async(to, from, next) => {
    //to获取到你要跳转到哪个路由
    //from获取到从哪个路由而来
    //next放行函数 next() next(path) 放行到指定的路由 next(false)终止路由导航
    // 通过token判断用户是否登录 用户登录了就会有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.fullPath == '/login'||to.path=='/register') {
            next('/home') 
        } else {
            //已经登录，但去得不是login
            //如果用户名已有
            if (name) {
                next()
            }else{
                //没有用户信息，派发actions让仓库存储用户信息再跳转
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                //token失效获取不到用户信息，重新登录
                //清除token
                removeToken()
                next('/login')
                }
            }
        }
    } else {
        //未登录不能去：交易相关、支付相关【pay/paysuccess】、个人中心
        //可以去：home、search、shopcart
        let toPath=to.fullPath
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1 ||toPath.indexOf('/center')!=-1 ){
            //去trade或pay、paysuccess
            //把未登录的时候想去而没有去成的信息存储于地址中【即路由】
           next('/login?redirect='+toPath)
        }else{
            //去的是home、search、shopcart
            next()
        }
    }

})
//全局后置守卫
router.afterEach((to, from) => {
    if(to.meta.title){
        document.title=to.meta.title
    }else{
        document.title='尚品汇'
    }
})
