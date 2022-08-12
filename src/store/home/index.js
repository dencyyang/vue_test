//home小仓库
import { reqCategoryList } from "@/api"
import { reqGetBannerList } from "@/api"
import { reqGetFloorList } from "@/api"
const actions={
    //通过API接口函数调用，向服务器发送请求，获取服务器数据
    //获取三级联动目录
   async getCategoryList(context){
       let result= await reqCategoryList()
       if(result.code==200){
        context.commit('GETCATEGORYLIST',result.data)
       }
    },
    //获取banner轮播图
    async getBannerList(context){
        let result= await reqGetBannerList()
        if(result.code==200){
         context.commit('GETBANNERLIST',result.data)
        } 
    },
    //获取floor轮播图
    async getFloorList(context){
        let result= await reqGetFloorList()
        if(result.code==200){
         context.commit('GETFLOORLIST',result.data)
        } 
    },

}
const mutations={
    //修改仓库categoryList数据
    GETCATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    //修改仓库bannerList数据
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    //修改仓库floorList数据
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
const state={
    //state中的数据初始值与服务器返回的数据类型应该一样
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const getters={}
export default {
    actions,
    mutations,
    state,
    getters
}