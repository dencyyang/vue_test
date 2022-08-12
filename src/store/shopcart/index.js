import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
const actions = {
    //获取购物车列表
    async getShopCartList(context) {
        let result = await reqGetCartList()
        if (result.code == 200) {
            context.commit('GETSHOPCARTLIST', result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId(context, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改商品选中状态
    async updateCheckedById(context, {skuId,isChecked}) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除所有选中的商品
    async deleteAllCheckedCart({dispatch,getters}){
        //context：小仓库， commit【提交mutations修改state】getters【计算属性】dispatch【派发actions】state【当前仓库数据】
        //获取购物车的全部产品
        let PromisAll=[]
        getters.cartList.cartInfoList.forEach(item => {
            let result= item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            //将每一次返回的Promise添加到数组中
           PromisAll.push(result)
        }); 
        //只要p1|p2……都成功，返回结果为成功
        //有一个失败则返回失败
        return Promise.all(PromisAll)
    },
    //修改全部产品的选中状态
    async updateAllCartIsChecked({dispatch,getters},checked){
        let PromisAll=[]
        getters.cartList.cartInfoList.forEach(item => {
            let result=item.isChecked!=checked?dispatch('updateCheckedById',{skuId:item.skuId,isChecked:checked}):''
            //将每一次返回的Promise添加到数组中
           PromisAll.push(result)
        }); 
        //只要p1|p2……都成功，返回结果为成功
        //有一个失败则返回失败
        return Promise.all(PromisAll)
    }
}
const mutations = {
    GETSHOPCARTLIST(state, cartList) {
        state.cartList = cartList
    },
}
const state = {
    cartList: []
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}
export default {
    actions,
    mutations,
    state,
    getters
}