//vue插件要对外暴露一个对象
let myPlugins={}
myPlugins.install=function (vue) {
     console.log('调用') 
      console.log(vue) 
}
export default myPlugins