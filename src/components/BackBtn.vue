<template>
  <button class="back-btn btn-hamburger" @click="goBack">
    <i class="iconfont icon-flow"></i>
  </button>
</template>

<script>
export default {
  methods:{
    goBack(){
      this.$router.back()
    }
  }
};
</script>

<style lang="stylus" scoped>
.back-btn
  color #ffffff
  margin 0 5px
  padding 10px 10px 10px 5px
  .iconfont
    font-size 22px
</style>