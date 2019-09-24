<template>
  <div id="app">
    <MyAudio></MyAudio>
    <Nav v-if="this.$route.meta.showNav" />
    <transition>
      <keep-alive :exclude="['PlaylistDetail', 'MyAudio','My', 'PlayControl']">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import "./assets/css/reset.css";
import "./assets/css/index.css";
import Nav from "./components/Nav/Nav";
import MyAudio from "./components/MyAudio/MyAudio";
import { getLogout } from "./api/index";
export default {
  components: {
    Nav,
    MyAudio
  },
  methods: {},
  mounted() {
    //得到登录状态
    this.$store.dispatch("getThenSetLoginStatus");
  }
};
</script>
<style lang="stylus">
html, body, #app
  height 100%
  width 100%
#app
  overflow-x hidden
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
