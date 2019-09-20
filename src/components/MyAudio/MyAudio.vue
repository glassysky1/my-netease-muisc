<template>
  <div>
    <audio ref="audio" :src="songInfo.musicUrl" autoplay></audio>
    <section  v-show="showFlog" class="footer-control-panel clear">
      <div class="img-wrap">
        <img class="small-cover-img" :src="songInfo.coverImgUrl" />
      </div>
      <div class="song-info">
        <p class="song-name ellipsis">{{songInfo.name}}</p>
        <p class="sogn-singers ellipsis">{{songInfo.singers}}</p>
      </div>
      <div class="btn-wrap">
        <button class="btn">
          <i class="iconfont icon-gengduoxiao"></i>
        </button>
      </div>
      <div class="btn-wrap">
        <div class="btn">
          <i :class="iconClassname"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
export default {
  name:'MyAudio',
  computed:{
    ...mapGetters(['songInfo','isPlaying']),
    iconClassname(){
      return this.isPlaying ? 'iconfont icon-zanting' :'iconfont icon-bofang1'
    },
    showFlog(){
      // if(
      //   this.$route.name !='M
      //   && this.yAudio'
      // )
      return false
    }
  },
  watch:{
    isPlaying(newValue){
      newValue ? this.toggleToPlayStatus() : this.toggleToStopStatus();
    }
  },
  methods:{
    toggleToPlayStatus(){
      this.$refs.audio.play()
    },
    toggleToStopStatus(){
      this.$refs.audio.pause()
    }
  }
};
</script>
<style lang="stylus" scoped>
.footer-control-panel
  border-top 1px solid #e4e3e4
  position fixed
  z-index 999
  bottom 0
  width 100%
  padding 3px
  background-color #fff
  .img-wrap,.song-info
    float left
  .btn-wrap
    float right
    height 50px
    .btn
      background rgba(0,0,0,0)
      border none
      .iconfont
        line-height 50px
        color #2e3030
        font-size 36px
  .img-wrap
    height 50px
    margin-right 5px
    .small-cover-img
      width 50px
      height 50px
      border-radius 2px
  .song-info
    color #2e3030
    width 50%
    .song-name
      font-size 17px
      line-height 30px
    .song-singers
      line-height 17px
      color lightgray 
      font-size 12px
</style>