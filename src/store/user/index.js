import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo,reqLogout } from '@/api/index'
import { setToken,removeToken } from '@/utils/token'
//登录预注册模块
const actions = {
    async getCode(context, phone) {
        //获取验证码的接口把验证码返回，正常情况是后台把验证码发到用户手机
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            context.commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister(context, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            console.log(result)
            return 'ok'
        } else {
            return Promise.reject(new Error('注册失败'))

        }
    },
    //用户登录
    async userLogin(context, data) {
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识符(uuid)
        //将token存储再本地，后期页面展示就是通过token向服务器获取数据
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            context.commit("USERLOGIN", result.data.token)
            //持久化存储
            //方法一
            //localStorage.setItem('token_sg',result.data.token)
            //方法二 通过引入暴露的函数将token存储于本地
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('登陆失败'))
        }
    },
    //获取用户信息
    async getUserInfo(context) {
        let result = await reqGetUserInfo()
        if (result.code == 200) {
            context.commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async logout(context){
        //只是向服务器发送一次请求，通知服务器清除token
        let result= await reqLogout()
        //actions里面不能操作state，提交mutations修改state
        if(result.code==200){
            context.commit('CLEAR')
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token=''
        state.userInfo=''
        //清空本地存储
        removeToken()
    }
}
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: ''
}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters
}