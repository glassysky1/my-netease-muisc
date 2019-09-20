<template>
  <div id="app">
    <MyAudio></MyAudio>
    <Nav v-if="this.$route.meta.showNav" />
    <keep-alive :exclude="['PlaylistDetail', 'MyAudio', 'PlayControl']">
      <transition>
     <router-view></router-view >
      </transition>
    </keep-alive>
  </div>
</template>
<script>
import "./assets/css/reset.css";
import "./assets/css/index.css";
import Nav from "./components/Nav/Nav";
import MyAudio from "./components/MyAudio/MyAudio";
export default {
  components: {
    Nav,
    MyAudio
  },
  mounted(){
  }
};
</script>
<style lang="stylus">
html,body,#app
  height 100%
  width 100%
  .v-enter-active, .v-leave-active
    transition all 0.5s ease
  .v-enter
    opacity 0
    transform translateX(100%)
  .v-leave-to
    opacity 0
    transform translateX(-100%)
    position absolute
</style>
