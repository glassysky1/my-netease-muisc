<template>
  <section class="official-list-box">
    <h2 class="official-list-title">官方榜</h2>
    <ul class="official-list">
       <li class="official-list-unit" v-for="(item,index) in officialList" :key="index">
         <router-link :to="{path:'/play-list-detail',query:{id:item.id}}">
          <div class="img-wrap">
            <img class="coverImg" :src="item.coverImgUrl" alt />
          </div>
          <div class="tracks-box">
            <p class="track-title ellipsis" v-for="(track,index) in item.tracks" :key="index">{{index+1}}.{{track.first}} - {{track.second}}</p>
          </div>
         </router-link>
       </li>
    </ul>
  </section>
</template>

<script>
export default {
  props:['officialList']
};
</script>

<style lang="stylus" scoped>
a
  display flex
  align-items center
.official-list-box
  padding-top 58px
  .official-list-title
    font-size 18px
  .official-list
    padding-top 10px
    .official-list-unit
      height 120px
      .img-wrap
        width 30%
        overflow hidden
        .coverImg
          width 100%
          border-radius 4px
      .tracks-box
        width 66%
        .track-title
          margin 15px 10px
          color gray 
          font-size 15px
</style>