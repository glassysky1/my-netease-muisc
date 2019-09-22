<template>
  <div class="page-wrap" ref="pageWrap">
    <div class="play-control-header">
      <BackBtn class="back-btn"></BackBtn>
      <div class="song-info">
        <h1 class="song-name ellipsis">{{this.$route.params.name}}</h1>
        <p class="singers ellipsis">{{this.$route.params.singers}}</p>
      </div>
    </div>
    <div class="main" @click="toggleShowLrc">
      <div class="cover-img-box" v-show="!showLrc">
        <div class="img-wrap totate" ref="rotateCD">
          <img v-lazy="$route.params.coverImgUrl" alt />
        </div>
      </div>
      <!-- <Lrc
        v-show="showLrc"
        :durationTime="duration"
        :currentTime="currentTime"
        :songId =songId
      ></Lrc> -->
    </div>
    <div class="play-control-footer">
      <div class="progress-wrap">
        <span class="has-played-time">{{currentTime|formatTime}}</span>
        <span class="total-progress">
          <span class="has-played-progress" ref="progress"></span>
        </span>
        <span class="total-time">{{duration|formatTime}}</span>
      </div>
      <div class="control-panel">
        <button class="star-me-btn" @click="toggleStarStatus">
          <i :class="starBtnStyle"></i>
        </button>
        <button class="play-last-song-btn">
          <i class="iconfont icon-shangyishoushangyige"></i>
        </button>
        <button class="play-stop-btn" @click="toggleStatus">
          <i :class="iconClassName"></i>
        </button>
        <button class="play-next-song-btn">
          <i class="iconfont icon-xiayigexiayishou"></i>
        </button>
        <button class="other-operation-btn">
          <i class="iconfont icon-gengduoxiao"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import Lrc from "../../components/Lrc";
import { Lazyload } from "mint-ui";
import { mapGetters, mapActions, mapState } from "vuex";
import BackBtn from "../../components/BackBtn";
import { toggleStarTheSong, getMusicLrc } from "../../api/index";
  // const Lrc = Vue.component("lrc", (resolve) => require(["../../components/Lrc"], resolve))

export default {
  name: "PlayControl",
  data() {
    return {
      iconClassName: "iconfont icon-zanting",
      showLrc: false
    };
  },
  computed: {
    ...mapGetters([
      "songInfo",
      "isPlaying",
      "duration",
      "currentTime",
      "likelistIds"
    ]),
    songId() {
      return this.songInfo.id;
    },
    //检测当前歌曲是否在喜欢列表里面，如果不在返回true
    thisSongInLikelist() {
      return this.likelistIds.indexOf(+this.songId) === -1;
    },
    starBtnStyle(){
      //如果不在，则为true就是灰色的，在的话就是false，是红色的
      return this.thisSongInLikelist ? 'iconfont icon-aixin1' : 'iconfont icon-aixin1 red'
    }
  },
  components: {
    BackBtn,
    // Lrc
  },
  filters: {
    formatTime(time) {
      const mm = `${Math.floor(time / 60)}`.padStart(2, "0");
      const ss = `${Math.floor(time % 60)}`.padStart(2, "0");
      return `${mm}:${ss}`;
    }
  },
  methods: {
    //获取用歌曲信息
    ...mapActions([
      "getThenSetSongInfo",
      "getThenSetIsPlaying",
      "getThenSetLikelist"
    ]),
    //切换状态，并且把isplaying改变
    toggleStatus() {
      this.getThenSetIsPlaying(!this.isPlaying);
    },
    //如果播放，则图标字体改成暂停，且界面选择
    togglePlayStatus() {
      this.iconClassName = "iconfont icon-zanting";
      $(this.$refs.rotateCD).addClass("rotate");
    },
    toggleStopStatus() {
      this.iconClassName = "iconfont icon-bofang1";
      $(this.$refs.rotateCD).removeClass("rotate");
    },
    //点击红心
    async toggleStarStatus() {
      try {
        //true为要喜欢，false为不要喜欢
        const like = this.thisSongInLikelist;
        //把歌曲是否喜欢发送出去
        console.log(this.songId,like);
        
        await toggleStarTheSong(this.songId,like)
        const uid = localStorage.getItem('uid')
        //重新获取喜欢列表，主要是为了新的数组里面的歌曲与songid再次对比
        this.getThenSetLikelist(uid)
      } catch (error) {
        console.log(error);
          this.$router.push('/login')
      }
    },
    //歌词切换
    toggleShowLrc() {
      this.showLrc = !this.showLrc;
    },
    //获取歌词
  },
  watch: {
    //isplay根据自己的改变，调用方法，使得中间字体图片发生改变
    isPlaying(newStatus) {
      newStatus ? this.togglePlayStatus() : this.toggleStopStatus();
    },
    //更新播放进度
    currentTime(newTime) {
      $(this.$refs.progress).width(`${(newTime / this.duration) * 100}%`);
    }
  },
  mounted() {
    //从localStorage获取uid
    const uid = localStorage.getItem("uid");
    this.getThenSetSongInfo({
      //把歌曲信息传给state
      ...this.$route.params
    }),
      //默认是四playing为true
      this.getThenSetIsPlaying(true);

    //当watch监测不到时，启用这个
    if (this.isPlaying === true) {
      this.togglePlayStatus();
    }
    //通过uid获取喜欢列表
    this.getThenSetLikelist(uid);
  }
};
</script>

<style lang="stylus">
img[lazy=loading]
  width 100%
  height 100%
@keyframes infiniteRotate
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)
.rotate
  animation infiniteRotate 10s infinite linear
.page-wrap
  height 100%
  background-color rgba(0, 0, 0, 0.3)
  .play-control-header
    position relative
    height 10%
    .back-btn
      color #f1f1f1
      width 50px
      height 50px
      text-align center
      position absolute
      left 1px
      top 20%
    .song-info
      .song-name
        color #f1f1f1
        font-size 20px
        padding 10px 0 0
        line-height 30px
        text-align center
      .singers
        line-height 30px
        text-align center
        color lightgray
        font-size 16px
  .main
    height 72%
    box-sizing border-box
    display flex
    justify-content space-around
    align-items center
    .cover-img-box
      width 80vw
      height 80vw
      background-color #2e3030
      border-radius 50%
      overflow hidden
      .img-wrap
        width 70%
        height 70%
        margin 15% auto 0
        border-radius 50%
        overflow hidden
        .cover-img
          width 100%
          height 100%
  .play-control-footer
    height 18%
    .progress-wrap
      display flex
      align-items center
      justify-content space-around
      padding 0 10px
      font-size 16px
      .has-played-time
        color #f1f1f1
      .total-time
        color lightgray
      .total-progress
        width 70%
        height 3px
        background-color lightgray
        .has-played-progress
          display block
          width 0
          height 100%
          background-color #d44439
    .control-panel
      display flex
      justify-content space-around
      > *
        margin 20px 0
        .iconfont
          font-size 30px
          color #f1f1f1
      .star-me-btn
        .iconfont.red
          color red
      .play-stop-btn
        .iconfont
          font-size 50px
button
  border none
  background-color rgba(0, 0, 0, 0)
  outline none
</style>