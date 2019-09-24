<template>
  <section class="top-list-box">
    <h2 class="top-list-item-title">{{title}}</h2>
    <ul class="top-list">
      <li class="top-list-unit" v-for="(item,index) in data" :key="index">
        <router-link :to="{path:'/play-list-detail' ,query:{id:item.id}}">
          <div class="img-wrap">
            <img :src="item.coverImgUrl" class="coverImg" alt />
          </div>
          <h3 class="top-list-title ellipsis">{{item.name}}</h3>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props:['data','title']
};
</script>
<style lang="stylus" scoped>
.top-list-box
  padding-top 14px
  .top-list-item-title
    font-size 18px
  .top-list
    padding-top 10px
    display flex
    flex-wrap wrap
    justify-content space-between
    .top-list-unit
      width 32%
      margin-bottom 5px
      .img-wrap
        overflow hidden
        .coverImg
          width 100%
          border-radius 4px
      .top-list-title
        color gray 
        font-weight 400
        font-size 12px

</style>