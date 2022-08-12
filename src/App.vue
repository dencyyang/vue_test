<template>
<div>
<Header/>
<!-- 路由出口，即展示路由组件 -->
<router-view></router-view>
<!-- 在Home、Search显示,在登录、注册隐藏 -->
<!-- $router获取当前页面展示的路由组件的信息 -->
<Footer v-show="$route.meta.isShow" />

</div>
</template>

<script>
import Header from '@/components/Header/index'
import Footer from "@/components/Footer/index"
export default {
  name: 'App',
  methods:{
  },
  components: {
    Header,
    Footer
  },
  mounted(){
    //通知Vuex发送请求获取数据存储在仓库中
    //app路由组件唯一跟组件，其mounted只会执行一次，
    //此方法获取的数据在其他组件需要改数据时不需要再次发送请求
    this.$store.dispatch("getCategoryList");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
