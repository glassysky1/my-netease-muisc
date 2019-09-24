<template>
  <div>
    <ul class="track-list">
      <li class="track-item" v-for="(item,index) in tracks" :key="index">
        <router-link
          class="link-to-play-control"
          :to="{name:'PlayControl',query:{name:item.name,singers:item.ar[0].name,id:item.id},params:{coverImgUrl:item.al.picUrl}}"
        >
          <div class="track-rank">{{index+1}}</div>
          <div class="track-info">
            <p class="track-title ellipsis">{{item.name}}</p>
            <p class="track-desc ellipsis">{{item.ar[0].name}} - {{item.al.name}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SongList",
  props: ["tracks"],
  mounted() {}
};
</script>

<style lang="stylus">
.track-list
  margin-bottom 100px
  .track-item
    .link-to-play-control
      display flex
      align-items center
      height 60px
      border-bottom 1px solid #e4e4e4
      .track-rank
        text-align center
        width 16%
        font-size 18px
      .track-info
        width 84%
        .track-title
          font-size 16px
          height 20px
        .track-desc
          font-size 14px
          color #757575
</style>