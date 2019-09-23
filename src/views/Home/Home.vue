<template>
  <div class="home">
    <HomeSwiper />
    <FourCircles />
    <RecommendSongList />
    <div class="redWall"></div>
  </div>
</template>

<script>
// import BScroll from "@better-scroll/core";
import HomeSwiper from "./HomeSwiper";
import FourCircles from "./FourCircles";
import RecommendSongList from "./RecommendSongList";
export default {
  components: {
    HomeSwiper,
    FourCircles,
    RecommendSongList
  },
  methods: {
    // _initBScroll() {
    //   new BScroll("#app", {
    //     click: true,
    //     probeType: 3
    //   });
    // }
  },
  mounted() {
    // this._initBScroll();
  }
};
</script>
<style lang="stylus" scoped>
.home
  height 100%
  .redWall
    position absolute
    z-index -1 // 使红墙显示在最底层
    left 0
    top 0
    width 100%
    height 150px
    background-color #d44439
</style>
