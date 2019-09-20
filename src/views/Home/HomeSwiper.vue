<template>
  <div class="home-swiper">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(banner,index) in banners" :key="index"><img :src="banner.imageUrl"  alt=""></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data(){
    return{
      banners:[]
    }
  },
  methods:{
    async getBanner(){
     const {data:res} =await this.$axios.get(`${this.HOST}/banner`)
     if(res.code===200){
       this.banners = res.banners
     }
     
    }
  },
  mounted(){
    this.getBanner()
  }
}
</script>
<style lang="stylus">
.home-swiper
  width 95%
  margin 0 auto 
  .mint-swipe-items-wrap
    height 140px
    img 
      width 100%
      border-radius 5px
</style>