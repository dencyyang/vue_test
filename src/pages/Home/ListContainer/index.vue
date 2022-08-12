<template>
  <!-- 列表 -->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Carousel :list='bannerList'></Carousel>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
//引入包
import Swiper from "swiper";
import { nextTick } from "vue";
export default {
  name: "ListContainer",
  computed: {
    ...mapState({
      bannerList: (state) => {
        return state.home.bannerList;
      },
    }),
  },
  watch: {
    //监听bannerList数据的变化
/*     bannerList: {
      //通过watch监听bannerList属性值的变化，当执行handler方法时确定bannerList已经有数据了，
      //但是不能保证v-for执行完毕，即结构不完整
      //nextTick 在下次DOM更新 循环(比如：v-for)结束之后执行的延迟回调。在数据修改之后立即执行这个方法，获取更新之后的DOM
      handler(newValue, oldValue) {
        //当执行这个回调的时候数据已经有了，v-for也就已经执行完毕，swiper结构也有了
        this.$nextTick(() => {
          var mySwiper = new Swiper(
            this.$refs.mySwiper,
            {
              loop: true, // 循环模式选项
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                //点击分页器切换图片
                clickable: true,
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            }
          );
        });
      },
    }, */
  },
  mounted() {
    //派发action：通过Vuex发送ajax请求，
    this.$store.dispatch("getBannerList");
    /*在newSwiper之前页面中结构必须有【把swiper放在这里不行】因为结构还不完整
      dispatch中涉及异步语句，随后开始new Swiper，但是此时服务器好没有返回，仓库中还没有数据，则组件中的v-for没有执行，就没有结构
      */
    /*  setTimeout(() => {
      var mySwiper = new Swiper(document.querySelector(".swiper-container"), {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          //点击分页器切换图片
          clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }, 1000); */
  },
};
</script>
<style scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;
}
.list-container .sortList {
  height: 464px;
  padding-left: 210px;
}
.list-container .sortList .center {
  box-sizing: border-box;
  width: 740px;
  height: 100%;
  padding: 5px;
  float: left;
}
.list-container .sortList .right {
  float: left;
  width: 250px;
}
.list-container .sortList .right .news {
  border: 1px solid #e4e4e4;
  margin-top: 5px;
}
.list-container .sortList .right .news h4 {
  border-bottom: 1px solid #e4e4e4;
  padding: 5px 10px;
  margin: 5px 5px 0;
  line-height: 22px;
  overflow: hidden;
  font-size: 14px;
}
.list-container .sortList .right .news h4 .fl {
  float: left;
}
.list-container .sortList .right .news h4 .fr {
  float: right;
  font-size: 12px;
  font-weight: 400;
}
.list-container .sortList .right .news .news-list {
  padding: 5px 15px;
  line-height: 26px;
}
.list-container .sortList .right .news .news-list .bold {
  font-weight: 700;
}
.list-container .sortList .right .lifeservices {
  border-right: 1px solid #e4e4e4;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.list-container .sortList .right .lifeservices .life-item {
  border-left: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  margin-right: -1px;
  height: 64px;
  text-align: center;
  position: relative;
  cursor: pointer;
  width: 25%;
}
.list-container .sortList .right .lifeservices .life-item .list-item {
  background-image: url(./images/icons.png);
  width: 61px;
  height: 40px;
  display: block;
}
.list-container .sortList .right .lifeservices .life-item .service-intro {
  line-height: 22px;
  width: 60px;
  display: block;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(1)
  .list-item {
  background-position: 0px -5px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(2)
  .list-item {
  background-position: -62px -5px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(3)
  .list-item {
  background-position: -126px -5px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(4)
  .list-item {
  background-position: -190px -5px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(5)
  .list-item {
  background-position: 0px -76px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(6)
  .list-item {
  background-position: -62px -76px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(7)
  .list-item {
  background-position: -126px -76px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(8)
  .list-item {
  background-position: -190px -76px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(9)
  .list-item {
  background-position: 0px -146px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(10)
  .list-item {
  background-position: -62px -146px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(11)
  .list-item {
  background-position: -126px -146px;
}
.list-container
  .sortList
  .right
  .lifeservices
  .life-item:nth-child(12)
  .list-item {
  background-position: -190px -146px;
}
.list-container .sortList .right .ads {
  margin-top: 5px;
}
.list-container .sortList .right .ads img {
  opacity: 0.8;
  transition: all 400ms;
}
.list-container .sortList .right .ads img:hover {
  opacity: 1;
}
</style>