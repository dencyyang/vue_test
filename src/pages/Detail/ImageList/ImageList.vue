<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id" >
        <img :src="slide.imgUrl" :class='{active:currentIndex==index}' @click="changeCurrentIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex:0
    }
  },
  methods: {
    changeCurrentIndex(index){
      this.currentIndex=index
      //通知zoom组件当前索引为多少
      this.$bus.$emit("getIndex",this.currentIndex)
    }
  },
  watch:{
    skuImageList(newValue,oldValue){
      immediate:true
      this.$nextTick(() => {
        var mySwiper = new Swiper(
            this.$refs.mySwiper,
            {
              //同时显示图片个数
                slidesPerView:3,
              //每一次切换图片个数
             
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
      })
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>