<template>
  <div>
    <!-- 三级联动已经注册为全局组件了，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Like />
    <Rank />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>
<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Like from "@/pages/Home/Like";
import Rank from "@/pages/Home/Rank";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Like,
    Rank,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
  methods: {
   
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    this.$store.dispatch('getUserInfo')
  },
};
</script>
<style scoped>
</style>