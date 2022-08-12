<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carouse in list"
        :key="carouse.id"
      >
        <img :src="carouse.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:["list"],
  watch: {
   list:{
      //立即监听：不管数据有没有变化，上来就监听以一次
      //因为这个数据从来没有发生变化(是父组件传递的，父组件给的时候就是一个完整的对象)
      immediate:true,
      handler(newValue,oldValue){
        //只能监听到数据已经有了但是v-for的渲染结构还是无法确定，因此还需要nextTick
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
        })
      }
    }
  },
};
</script>
<style scoped>
</style>