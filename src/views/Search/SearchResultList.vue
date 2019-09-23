<template>
  <ul class="track-list">
    <li class="track-item" v-for="(item,index) in tracks" :key="index">
      <router-link :to="{name:'PlayControl',params:{name:item.name,singers:item.artists[0].name,id:item.id,album:item.album.id,coverImgUrl:'https://i0.hdslb.com/bfs/article/0364e118d72da96e26831baf1aa8fd51a202627f.jpg@1320w_792h.webp'}}" class="link-to-play-control">
        <div class="track-info">
          <p class="track-title ellipsis">{{item.name}}</p>
          <p class="track-desc ellipsis">{{item.artists[0].name}} - {{item.album.name}}</p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props:['tracks']
};
</script>

<style lang="stylus" scoped>
.track-list
  .track-item
    .link-to-play-control
      display flex
      align-items center
      height 60px
      border-bottom 1px solid #e4e4e4
      .track-info
        width 84%
        .track-title
          font-size 16px
        .track-desc
          font-size 14px
          color #757575
</style>