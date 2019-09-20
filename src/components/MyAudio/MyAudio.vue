<template>
  <div>
    <audio
      ref="audio"
      @ended="handleEnded"
      @durationchange="refreshDuration"
      :src="songInfo.musicUrl"
      autoplay
    ></audio>
    <section v-show="showFlag"  @click="toSongComponent" class="footer-control-panel clear">
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
      <div class="btn-wrap" @click.stop="togglePlayerStatus">
        <div class="btn">
          <i :class="iconClassname"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MyAudio",
  computed: {
    ...mapGetters(["songInfo", "isPlaying"]),
    iconClassname() {
      return this.isPlaying ? "iconfont icon-zanting" : "iconfont icon-bofang1";
    },
    showFlag() {
      //不在‘MyAudio’路由，且audio里面有歌时(标志位为duration，不为NAN)才显示
      if (
        this.$route.name != "MyAudio" &&
        this.$refs.audio &&//必须加这段不然会报错
        this.$refs.audio.duration&&
        this.$route.name !='PlayControl'
      ) {
        return true;
      }
      return false;
    }
  },
  watch: {
    //值为真则播放，值为假则暂停
    isPlaying(newValue) {
      newValue ? this.toggleToPlayStatus() : this.toggleToStopStatus();
    }
  },
  methods: {
    ...mapActions([
      "getThenSetDuration",
      "getThenSetCurrentTime",
      "getThenSetIsPlaying"
    ]),
    //设置定时器
    setTimer() {
      this.timer = setInterval(() => {
        this.getThenSetCurrentTime(this.$refs.audio.currentTime);
      }, 500);
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    toggleToPlayStatus() {
      this.setTimer();
      this.$refs.audio.play();
    },
    toggleToStopStatus() {
      this.clearTimer();
      this.$refs.audio.pause();
    },
    //刷新总进度条
    refreshDuration() {
      this.getThenSetDuration(this.$refs.audio.duration);
    },
    ///进度条走完了
    handleEnded() {
      //清理定时器
      this.clearTimer();
      //不播放
      this.getThenSetIsPlaying(false);
      //当前时间为0
      this.getThenSetCurrentTime(0);
    },
    togglePlayerStatus(){//切换播放状态
      this.getThenSetIsPlaying(!this.isPlaying)
    },
    //点播放界面
    toSongComponent(){
      //把数据传到playControl
      this.$router.push({
        name:'PlayControl',
        params:{
          name:this.songInfo.name,
          singers: this.songInfo.singers,
          id: this.songInfo.id,
          coverImgUrl: this.songInfo.coverImgUrl
        }
      })
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
  .img-wrap, .song-info
    float left
  .btn-wrap
    float right
    height 50px
    .btn
      background rgba(0, 0, 0, 0)
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