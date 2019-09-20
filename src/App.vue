<template>
  <div id="app">
    <MyAudio></MyAudio>
    <Nav v-if="this.$route.meta.showNav" />
    <keep-alive :exclude="['PlaylistDetail', 'MyAudio', 'PlayControl']">
     <router-view></router-view >
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
</style>
