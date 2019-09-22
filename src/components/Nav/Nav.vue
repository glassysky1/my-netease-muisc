<template>
  <div>
    <div class="mp-header">
      <button class="toggle-button btn-hamburger" >
        <i class="iconfont icon-cebianlan3"></i>
      </button>
      <router-link to="/home">推荐页</router-link>
      <router-link to="/my">个人中心</router-link>
      <router-link to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["loginStatus"])
  },
  methods: {
    ...mapActions(["getLogoutThenSetLoginStatus"]),
   
  },
  mounted() {}
};
</script>

<style lang="stylus" >
.btn-hamburger
  background-color rgba(0, 0, 0, 0)
  border none
.icon-sousuo, .icon-cebianlan
  display block
  font-size 22px
  color #f1f1f1
.mp-header
  display flex
  height 44px
  justify-content space-between
  align-items center // 垂直居中
  background-color #d44439
a
  color lightcoral
  font-size 15px
  text-decoration none
  &.router-link-active
    text-decoration none
    color #fcdae9
</style>