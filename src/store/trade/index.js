//订单提交
import { reqAddressInfo, reqOrderInfo } from "@/api"
const actions={
    //获取地址信息
    async getUserAddress(context){
        let result= await reqAddressInfo()
        if(result.code==200){
            context.commit('GETUSERADDRESS',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取商品清单
    async getOrderInfo(context){
        let result= await reqOrderInfo()
         console.log(result.data) 
        if(result.code==200){
            context.commit('GETORDERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

}
const mutations={
    GETUSERADDRESS(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const state={
    address:[],
    orderInfo:{}
}
const getters={}
export default{
    actions,
    mutations,
    state,
    getters
}