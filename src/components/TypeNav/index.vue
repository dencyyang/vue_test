<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @click="goSearch">
        <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
        <!-- 过度动画化 -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2">
              <div
                class="item bo"
                v-for="(c1, index) in categoryList.slice(0, 15)"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- v-show="currentIndex == index " -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
//引入lodash全部功能
import _ from "lodash";
//按需加载
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //储存用户鼠标移动到哪一级分类
      currentIndex: -1,
      isShow: true,
    };
  },
  computed: {
    ...mapState({
      //对象写法，右侧需要是一个函数，当使用这个计算属性的时候，右侧函数会立即调用一次
      //会注入一个参数state,即为仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex
    /*changeIndex:_.throttle(function(index){
      //index鼠标移入的一级分类的索引
      this.currentIndex = index;
    },50),*/
    //lodash不要使用箭头函数
    //修改组件实例身上的changeIndex属性
    changeIndex: throttle(function (index) {
      //index鼠标移入的一级分类的索引
      this.currentIndex = index;
    }, 50),
    //一级分类鼠标移出事件回调
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.name != "home") this.isShow = false;
    },
    goSearch(event) {
      //获取触发事件的节点
      let element = event.target;
      //获取节点的categoryname属性
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果该节点有categoryname属性，则一定是a标签
      if (categoryname) {
        //整理路由跳转参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        let params=this.$route.params
        //区分几级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        if(this.$route.params){
          location.params=this.$route.params
        }
          this.$router.push(location);
        
      }
    },
    enterShow() {
      this.isShow = true;
    },
  },
  //组件挂在完毕向服务器发送请求
  mounted() {
    if (this.$route.name != "home") {
      return (this.isShow = false);
    }
  },
};
</script>
<style scoped>
 .type-nav {
  border-bottom: 2px solid #e1251b;
}
.type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
.type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.cur:hover {
  background-color: skyblue;
}
/* .type-nav .container .sort .all-sort-list2 .item h3:hover{
 background-color: skyblue;
} */
/* 二级分类 */
.type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
/* 过度动画样式 */
/* 开始状态(进入) */
.type-nav .container .sort-enter {
  height: 0px;
}
/* 结束状态(进入) */
.type-nav .container .sort-enter-to {
  height: 461px;
}
/* 定义动画时间、速率 */
.type-nav .container .sort-enter-active {
  transition: all 0.5s linear;
}
</style>