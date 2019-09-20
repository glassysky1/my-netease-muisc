<template>
  <div class="page-wrap" ref="pageWrap">
    <div class="play-control-header">
      <BackBtn class="back-btn"></BackBtn>
      <div class="song-info">
        <h1 class="song-name ellipsis">{{this.$route.params.name}}</h1>
        <p class="singers ellipsis">{{this.$route.params.singers}}</p>
      </div>
    </div>
    <div class="main">
      <div class="cover-img-box">
        <div class="img-wrap" ref="rotateCD">
          <img  :src="$route.params.coverImgUrl" alt />
        </div>
      </div>
    </div>
    <div class="play-control-footer">
      <div class="progress-wrap">
        <span class="has-played-time"></span>
        <span class="total-progress">
          <span class="has-played-progress" ref="progress"></span>
        </span>
        <span class="total-time">2434</span>
      </div>
      <div class="control-panel">
        <button class="star-me-btn">
          <i class="iconfont icon-shangyishoushangyige"></i>
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
import {mapGetters, mapActions } from "vuex";
import BackBtn from "../../components/BackBtn";
export default {
  name: "PlayControl",
  data(){
    return{
      iconClassName:'iconfont icon-zanting'
    }
  },
  computed:{
    ...mapGetters(['isPlaying'])
  },
  components: {
    BackBtn
  },
  methods:{
    //获取用歌曲信息
    ...mapActions(['getThenSetSongInfo','getThenSetIsPlaying']),
    toggleStatus(){
      this.getThenSetIsPlaying(!this.isPlaying)
    }
  },
  mounted(){
    this.getThenSetSongInfo({
      //把歌曲信息传给state
      ...this.$route.params
    }),
    this.getThenSetIsPlaying(true)
  }
};
</script>

<style lang="stylus" scoped>
.page-wrap
  height 100%
  background-color rgba(0,0,0,.3)
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
  background-color rgba(0,0,0,0)
  &:visited
    border none 
</style>