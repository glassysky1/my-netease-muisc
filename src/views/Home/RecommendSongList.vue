<template>
  <div class="recom-songlist">
    <h1 class="recom-songlist-header">推荐歌单</h1>
    <ul class="songlist-group">
      <li class="songlist-item" v-for="(item,index) in recomSongList" :key="index">
        <router-link :to="{path:'/play-list-detail',query:{id :item.id}}">
          <div class="img-wrap">
            <img class="songlist-cover" :src="item.picUrl" alt />
            <div class="play-count-box">
              <i class="iconfont icon-erji"></i>
              {{parseInt(item.playCount/10000)}}万
            </div>
          </div>
          <p class="songlist-title">{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recomSongList:[]
    };
  },
  methods: {
   async getRecommendSongList(){
    const {data:res} = await this.$axios.get(`${this.HOST}/personalized`)
    if(res.code===200){  
      this.recomSongList = res.result
    }
    
   }

  },
  mounted(){
    this.getRecommendSongList()
  }
};
</script>

<style lang="stylus">
.recom-songlist
  .recom-songlist-header
    font-size 17px
    padding-left 3px
    margin 10px 0 0 0
  .songlist-group
    display flex
    justify-content space-around
    flex-wrap wrap
    .songlist-item
      position relative
      width 32%
      margin 5px 0
      .img-wrap
        border-radius 2px
        overflow hidden
        .songlist-cover
          width 100%
          height 100%
      .play-count-box
        position absolute
        top 3px
        right 3px
        color #f1f1f1
        font-size 16px
      .songlist-title
        font-size 12px
        line-height 20px
        height 40px
        overflow hidden
a
  color black
</style>