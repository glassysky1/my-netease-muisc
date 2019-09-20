<template>
  <div class="home">
    <div class="redWall"></div>
    <HomeSwiper />
    <FourCircles/>
    <RecommendSongList/>
  </div>
</template>

<script>
import HomeSwiper from "./HomeSwiper";
import FourCircles from "./FourCircles";
import RecommendSongList from "./RecommendSongList";
export default {
  components: {
    HomeSwiper,
    FourCircles,
    RecommendSongList
  }
};
</script>
<style lang="stylus" scoped>
.home
  .redWall
    position absolute
    z-index -1 // 使红墙显示在最底层
    left 0
    top 0
    width 100%
    height 150px
    background-color #d44439
</style>
