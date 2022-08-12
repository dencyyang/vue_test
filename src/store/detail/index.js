import { reqAddOrUpdateShopCart, reqGetGoodInfo } from "@/api"
//封装游客临时身份的模块uuid，生成一个随机字符串(不能再变了)
import {getUUID} from '@/utils/uuid_token'
const actions = {
    //获取产品信息
    async getGoodInfo(context, skuid) {
        let result = await reqGetGoodInfo(skuid)
        if (result.code == 200) {
            context.commit("GETGOODINFO", result.data)
        }
    },
    //将产品添加到购物车||修改 某一个产品的个数
    async addOrUpdateShopCart(context,{skuId,skuNum}){
        //当前函数如果执行返回值是一个Promise实例
        //加入购物车返回的解构
        //加入购物车以后(发送请求)，将前台参数带给服务器
        //服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表这次操作成功
        //因为服务器没有返回其余数据因此不需要三连环存储数据
        //async函数执行返回的结果一定是一个Promise实例【要么成功，要么失败】
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        //result.code==200代表服务器加入购物车成功
        if(result.code==200){
        //返回是成功的标记
        //若返回值为字符串则代表Promise成功
            return ''
        }else{
            //返回是失败的标记
            //返回Promise.reject代表Promise失败
            //即代表服务器加入购物车失败
            return Promise.reject(new Error('faile'))
        }
        
    }
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        return state.goodInfo = goodInfo
    }
}
const state = {
    //产品信息
    goodInfo: {},
    //游客临时身份
    uuid_token:getUUID()

}
const getters = {
    //路径导航数据简化
    categoryView(state) {
        return state.goodInfo.categoryView||{}
    },
    //简化产品信息数据
    skuInfo(state) {
        return state.goodInfo.skuInfo||{}
    },
    //简化售卖属性数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList||[]
    },
    valuesSkuJson(state) {
        return state.goodInfo.valuesSkuJson||''
    }

}
export default {
    actions,
    mutations,
    state,
    getters
}