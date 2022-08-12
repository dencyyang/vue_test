<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link  to="/register">免费注册</router-link>
          </p>
          <!-- 已登录 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      keyWord: "",
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
  methods: {
    //路由传参
    goSearch() {
      //纯字符串形式
      //this.$router.push('/search/'+this.keyWord+"?k="+this.keyWord.toUpperCase())
      //模板字符串形式
      // this.$router.push(`/search/${this.keyWord}+?k=+${this.keyWord.toUpperCase()}`)
      //对象形式
      //params参数必须配置name不能配置path,query都可以
      /*
          params参数占位时加上？则params参数可传也可不传
          如果设置的params参数占位而没有传递params参数，URL路径会出错
          使用undefined解决params参数可传递、传递空字符串
          */
      //如果有query参数，则也携带过去
      //空对象{}布尔值也是true
      if (this.$route.query) {
        let location = {
          name: "search",
          params: {
            keyword: this.keyWord || undefined,
          },
        };
        location.query = this.$route.query;
        console.log(this.$route.query);
        this.$router.push(location);
      }
      /*   this.$router.push({
        name: "search",
        params: {
          keyword: this.keyWord || undefined,
        },
      }); */
      /*   this.$router.push({
          name:"search" ,
          //path:'/search'
          query:{
            keyword:this.keyWord
          },*/
    },
   //退出登录
   async logout(){
    //1.发送请求，通知服务器退出登录【清除一些数据：token】
    //2.清除项目中的数据【userInfo,token】
      try{
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }catch(error){
        alert(error.message)
      }
   }
  },
  mounted() {
    //清除关键字
    this.$bus.$on("clearKeyword", () => {
      this.keyWord = "";
    });
   
  },
};
</script>
<style scoped>
.header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.header > .top .container .loginList {
  float: left;
}
.header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.header > .top .container .typeList {
  float: right;
}
.header > .top .container .typeList a {
  padding: 0 10px;
}
.header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.header > .bottom .logoArea {
  float: left;
}
.header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>
