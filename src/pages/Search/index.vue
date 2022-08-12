<template>
  <div>
    <!-- 此处的TypeNav又是一个新的实例，即组件又运行一次 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread :面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <!-- split()拆分数组 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!-- selector -->
        <SearchSelector @attrInfo="attrInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <!-- 动态绑定类名 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <!-- 携带id进行跳转 -->
                      <router-link :to="{
                        name:'detail',
                        params:{
                        skuid:good.id
                        }
                      }"> <img :src="good.defaultImg"/></router-link>
                     </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">

                    <a
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      @click="addCartList(good.id)"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 测试分页器阶段，将来数据要替换 -->
         <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='total' :totalPages='totalPages' :continues='5' @pageNum='pageNum' />
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        //一级分类id
        category1Id: "",
        //二级分类id
        category2Id: "",
        //三级分类id
        category3Id: "",
        //分类的名字
        categoryName: "",
        //搜索关键字
        keyword: "",
        //排序 初始状态:综合|降序
        order: "1:desc",
        //当前第几页
        pageNo: 1,
        //每一页展示数据个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  computed: {
    ...mapGetters(["goodsList", "total",'totalPages' ]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    //向服务器发送请求获取search模块数据(根据参数不同返回不同的数据进行展示)
    //把这次请求封装为一个函数：当需要的时候调用即可
    getData() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    //收集售卖属性值的点回调
    attrInfo(attrs, attrValue) {
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      //因为可能是多个属性，所以要添加到数组而不是赋值给props
      //数组去重，避免用户多次点击没重复的添加
      //indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置。
      //若字符串值在字符串中不包含，则返回-1        可用于数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    //删除分类的名字
    removeCategoryName() {
      //清除数据
      //带给服务器的参数是可有可无的，属性值为空字符串依然会带给服务器
      //但是属性值为undefiend是不会带给服务器，此时将空字符串改为undefiend可以优化
      this.searchParams.categoryName = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.category1Id = undefined;
      this.getData();
      //地址栏也需要跳转:进行路由跳转(现在路由只是跳转到自己这)
      //本意只是删除query参数，如果路径中有params参数不应该删除，跳转路由时应该携带
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
    },
    //删除关键词
    removeKeyword() {
      this.$bus.$emit("clearKeyword");
      this.searchParams.keyword = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    //删除品牌信息
    removeTrademark() {
      this.searchParams.trademark = undefined;
      //此处没有发生路由的变化所以不需要路由跳转
      this.getData();
    },
    //删除属性信息
    //需要传入索引值，确定删除哪个元素
    removeAttr(index) {
      //再次整理参数
      this.searchParams.props.splice(index, 1);
      //再次发送请求
      this.getData();
    },
    //改变排序
    changeOrder(flag) {
      //flag形参是一个标记，代表用户点击的是综合还是价格
      //方法一
    /*   if (flag == 1) {
        if (this.searchParams.order == "1:desc") {
          this.searchParams.order = "1:asc";
        }else this.searchParams.order = "1:desc";
      }
      if (flag == 2) {
        if (this.searchParams.order == "2:asc") {
          this.searchParams.order = "2:desc";
        }else this.searchParams.order = "2:asc";
      } */
      //方法二
      //获取最开始状态
      let originFlag=this.searchParams.order.split(':')[0]
      let originSort=this.searchParams.order.split(':')[1]
      //声明一个新的order属性值
      let newOrder=''
      if(flag==originFlag){
        newOrder=`${originFlag}:${originSort=='desc'? 'asc': 'desc'}`
        }else{
         // newOrder=`${flag}:${originSort=='desc'? 'asc': 'desc'}`
         //当点击价格的时候，跳转到价格，此处为价格的初始化默认降序
         //当第二次点击价格时originFlag变为2则又执行if判断实现降序升序的操作
          newOrder=`${flag}:${'desc'}`//此处为初始化语句：比如原为价格现在点击综合，则order初始化为1:desc
        }
          this.searchParams.order=newOrder
      this.getData()
    },
    //当前页码数
    pageNum(pageNum){
       this.searchParams.pageNo=pageNum
       this.getData()
      
    },
    //加入购物车
    async addCartList(skuId){
      let skuNum=1
      try{
        await this.$store.dispatch("addOrUpdateShopCart",{skuId:skuId,skuNum:skuNum})
      }catch(error){
        alert(error.message)
      }
    }
  },
  watch: {
    //监听路由信息是否变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      //每一次请求之前
      //要把相应的1、2、3级分类id清除，让其接收下一次id
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      this.searchParams.category1Id = "";
      //再次发起请求前整理带给服务器的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //发起请求
      this.getData();
    },
  },
  //在页面挂在之前执行
  beforeMount() {
    //复杂写法
    /*  this.searchParams.category1Id=this.$route.query.category1Id
      this.searchParams.category2Id=this.$route.query.category2Id
      this.searchParams.category3Id=this.$route.query.category3Id
      this.searchParams.categoryName=this.$route.query.categoryName
      this.searchParams.keyword=this.$route.query.params  */
    //Objct.assign:ES6新增语法 合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
    //也可以用自定义事件
    //品牌信息
    this.$bus.$on("trademark", (trademark) => {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.categoryName = trademark.tmName;
      this.getData();
    });
  },
  //路由组件传递props参数
  props: ["keyword"],
};
</script>
<style scoped>
.sort:hover {
  display: none;
}
.main {
  margin: 10px 0;
}
.main .py-container {
  width: 1200px;
  margin: 0 auto;
}
.main .py-container .bread {
  margin-bottom: 5px;
  overflow: hidden;
}
.main .py-container .bread .sui-breadcrumb {
  padding: 3px 15px;
  margin: 0;
  font-weight: 400;
  border-radius: 3px;
  float: left;
}
.main .py-container .bread .sui-breadcrumb li {
  display: inline-block;
  line-height: 18px;
}
.main .py-container .bread .sui-breadcrumb li a {
  color: #666;
  text-decoration: none;
}
.main .py-container .bread .sui-breadcrumb li a:hover {
  color: #4cb9fc;
}
.main .py-container .bread .sui-tag {
  margin-top: -5px;
  list-style: none;
  font-size: 0;
  line-height: 0;
  padding: 5px 0 0;
  margin-bottom: 18px;
  float: left;
}
.main .py-container .bread .sui-tag .with-x {
  font-size: 12px;
  margin: 0 5px 5px 0;
  display: inline-block;
  overflow: hidden;
  color: #000;
  background: #f7f7f7;
  padding: 0 7px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #dedede;
  white-space: nowrap;
  transition: color 400ms;
  cursor: pointer;
}
.main .py-container .bread .sui-tag .with-x i {
  margin-left: 10px;
  cursor: pointer;
  font: 400 14px tahoma;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.main .py-container .bread .sui-tag .with-x:hover {
  color: #28a3ef;
}
.main .py-container .details {
  margin-bottom: 5px;
}
.main .py-container .details .sui-navbar {
  overflow: visible;
  margin-bottom: 0;
}
.main .py-container .details .sui-navbar .filter {
  min-height: 40px;
  padding-right: 20px;
  background: #fbfbfb;
  border: 1px solid #e2e2e2;
  padding-left: 0;
  border-radius: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}
.main .py-container .details .sui-navbar .filter .sui-nav {
  position: relative;
  left: 0;
  display: block;
  float: left;
  margin: 0 10px 0 0;
}
.main .py-container .details .sui-navbar .filter .sui-nav li {
  float: left;
  line-height: 18px;
}
.main .py-container .details .sui-navbar .filter .sui-nav li a {
  display: block;
  cursor: pointer;
  padding: 11px 15px;
  color: #777;
  text-decoration: none;
}
.main .py-container .details .sui-navbar .filter .sui-nav li.active a {
  background: #e1251b;
  color: #fff;
}
.main .py-container .details .goods-list {
  margin: 20px 0;
}
.main .py-container .details .goods-list ul {
  display: flex;
  flex-wrap: wrap;
}
.main .py-container .details .goods-list ul li {
  height: 100%;
  width: 20%;
  margin-top: 10px;
  line-height: 28px;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img {
  padding-left: 15px;
  width: 215px;
  height: 255px;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img a {
  color: #666;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img a img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
.main .py-container .details .goods-list ul li .list-wrap .price {
  padding-left: 15px;
  font-size: 18px;
  color: #c81623;
}
.main .py-container .details .goods-list ul li .list-wrap .price strong {
  font-weight: 700;
}
.main .py-container .details .goods-list ul li .list-wrap .price strong i {
  margin-left: -5px;
}
.main .py-container .details .goods-list ul li .list-wrap .attr {
  padding-left: 15px;
  width: 85%;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.main .py-container .details .goods-list ul li .list-wrap .attr a {
  color: #333;
  text-decoration: none;
}
.main .py-container .details .goods-list ul li .list-wrap .commit {
  padding-left: 15px;
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
.main .py-container .details .goods-list ul li .list-wrap .commit span {
  font-weight: 700;
  color: #646fb0;
}
.main .py-container .details .goods-list ul li .list-wrap .operate {
  padding: 12px 15px;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0;
  background-color: transparent;
  margin-right: 15px;
}
.main
  .py-container
  .details
  .goods-list
  ul
  li
  .list-wrap
  .operate
  .btn-bordered {
  min-width: 85px;
  background-color: transparent;
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
}
.main
  .py-container
  .details
  .goods-list
  ul
  li
  .list-wrap
  .operate
  .btn-bordered:hover {
  border: 1px solid #666;
  color: #fff !important;
  background-color: #666;
  text-decoration: none;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
  border: 1px solid #e1251b;
  color: #e1251b;
}
.main
  .py-container
  .details
  .goods-list
  ul
  li
  .list-wrap
  .operate
  .btn-danger:hover {
  border: 1px solid #e1251b;
  background-color: #e1251b;
  color: white !important;
  text-decoration: none;
}
.main .py-container .details .page {
  width: 733px;
  height: 66px;
  overflow: hidden;
  float: right;
}
.main .py-container .details .page .sui-pagination {
  margin: 18px 0;
}
.main .py-container .details .page .sui-pagination ul {
  margin-left: 0;
  margin-bottom: 0;
  vertical-align: middle;
  width: 490px;
  float: left;
}
.main .py-container .details .page .sui-pagination ul li {
  line-height: 18px;
  display: inline-block;
}
.main .py-container .details .page .sui-pagination ul li a {
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #e0e9ee;
  margin-left: -1px;
  font-size: 14px;
  padding: 9px 18px;
  color: #333;
}
.main .py-container .details .page .sui-pagination ul li.active a {
  background-color: #fff;
  color: #e1251b;
  border-color: #fff;
  cursor: default;
}
.main .py-container .details .page .sui-pagination ul li.prev a {
  background-color: #fafafa;
}
.main .py-container .details .page .sui-pagination ul li.disabled a {
  color: #999;
  cursor: default;
}
.main .py-container .details .page .sui-pagination ul li.dotted span {
  margin-left: -1px;
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  font-size: 14px;
  border: 0;
  padding: 9px 18px;
  color: #333;
}
.main .py-container .details .page .sui-pagination ul li.next a {
  background-color: #fafafa;
}
.main .py-container .details .page .sui-pagination div {
  color: #333;
  font-size: 14px;
  float: right;
  width: 241px;
}
.main .py-container .hot-sale {
  margin-bottom: 5px;
  border: 1px solid #ddd;
}
.main .py-container .hot-sale .title {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  border-bottom: 1px solid #ddd;
  background: #f1f1f1;
  color: #333;
  margin: 0;
  padding: 5px 0 5px 15px;
}
.main .py-container .hot-sale .hot-list {
  padding: 15px;
}
.main .py-container .hot-sale .hot-list ul {
  display: flex;
}
.main .py-container .hot-sale .hot-list ul li {
  width: 25%;
  height: 100%;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .p-img,
.main .py-container .hot-sale .hot-list ul li .list-wrap .price,
.main .py-container .hot-sale .hot-list ul li .list-wrap .attr,
.main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  padding-left: 15px;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .p-img img {
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .attr {
  width: 85%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .price {
  font-size: 18px;
  color: #c81623;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .price strong {
  font-weight: 700;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .price strong i {
  margin-left: -5px;
}
.main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
</style>