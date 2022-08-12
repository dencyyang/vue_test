//当前模块对API进行统一管理
import requests from './request'
import mockRequests from './mockRequests'
//三级联动接口
//api/product/getBaseCategoryList   get   无参数
export const reqCategoryList = () => {
    //发请求:axios返回的结果是promise对象那个
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
//获取banner轮播图
export const reqGetBannerList = () => {
    return mockRequests({ url: '/banner', method: 'get' })
}
//获取floor轮播图
export const reqGetFloorList = () => {
    return mockRequests({ url: '/floor', method: 'get' })
}
//获取搜索模块数据 地址：/api/list  请求方式：post 参数：需要带参数
/* {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
  
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } */
//post请求携带请求体参数，因此传递的参数params参数至少为一个空对象
export const reqGetSearchInfo = (params) => {
    return requests({ url: '/list', data: params, method: 'post' })
}
//获取产品详情信息的接口 URL：/api/item/{skuId}  请求方式get
export const reqGetGoodInfo = (skuid) => {
    return requests({ url: `/item/${skuid}`, method: 'get' })
}
//获取购物车列表    URL：/api/cart/cartList get
export const reqGetCartList= () => {
    return requests({url:'/cart/cartList',method:'get'})
}
//将产品添加到购物车中(获取更新某一个产品的个数) /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart= (skuId,skuNum) => {
    return requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})
}
//删除购物车商品 /api/cart/deleteCart/{skuId}   delete
export const reqDeleteCartById =(skuId) => {
    return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}
//修改产品状态 /api/cart/checkCart/{skuId}/{isChecked}  get
export const reqUpdateCheckedById=(skuId,isChecked) => {
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}
//注册获取验证码 /api/user/passport/sendCode/{phone}   get
export const reqGetCode=(phone) => {
    return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
//注册  /api/user/passport/register   post
export const reqUserRegister=(data) => {
    return requests({url:'/user/passport/register',data,method:'post'})
}
//登录    /api/user/passport/login  post
export const reqUserLogin=(data) => {
    return requests({url:'/user/passport/login',data,method:'post'})
}
//获取用户信息  /api/user/passport/auth/getUserInfo   get
export const reqGetUserInfo=() => {
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}
//退出登录   /api/user/passport/logout  get
export const reqLogout=() => {
    return requests({url:'/user/passport/logout',method:'get'})
}
//获取用户地址信息    /api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo=() => {
    return requests({url:'/user/userAddress/auth/findUserAddressList ',method:'get'})
}
//获取商品清单    /api/order/auth/trade   get
export const reqOrderInfo=() => {
    return requests({url:'/order/auth/trade',method:'get'})
}

// 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqsubmitOrder=(tradeNo,data) => {
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}
//获取订单支付信息  /api/payment/weixin/createNative/{orderId}  get
export const reqOrderPayInfo=(orderId) => {
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}
//获取订单支付状态    /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus=(orderId) => {
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}
//获取个人订单列表 /api/order/auth/{page}/{limit}  get
export const reqMyOrderList=(page,limit) => {
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}
