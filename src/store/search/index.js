//search小仓库
import { reqGetSearchInfo } from "@/api"
const actions={
     async getSearchInfo (context,params){
        const result= await reqGetSearchInfo(params)
        if(result.code==200){
            return context.commit("GETSEARCHINFO",result.data)
        }
    }
}
const mutations={
    GETSEARCHINFO(state,SearchInfo){
        state.searchInfo=SearchInfo
    }
}
const state={
    searchInfo:{}
}
//为了简化数据而生
const getters={
    //当前形参state为当前仓库的state,并非大仓库的state
    //加入网络不好，则返state.searchInfo.attrsList应该返回的是undefined
    //计算新的属性至少一个新数组
    attrsList(state){
        return state.searchInfo.attrsList||[]
    },
    goodsList(state){
        return state.searchInfo.goodsList||[]
    },
    total(state){
        return state.searchInfo.total
    },
    totalPages(state){
        return state.searchInfo.totalPages
    },
    trademarkList(state){
        return state.searchInfo.trademarkList||[]
    },
}
export default{
    actions,
    mutations,
    state,
    getters
}