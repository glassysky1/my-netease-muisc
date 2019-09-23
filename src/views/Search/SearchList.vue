<template>
  <div class="container" @click="handleClick">
    <h2 class="titile">{{title}}</h2>
    <ul class="search-list">
      <li class="item" v-for="(item,index) in list" :key="index" >
        {{item.first}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchList',
  props:['list','title','doAfterUserClick'],
  methods:{
    handleClick(e){
      const src = e.target
      if(src.className ==='item'){
        this.doAfterUserClick(src.innerText)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  padding 20px 0
  .title
    padding 10px 0
    font-size 18px
  .search-list
    display flex
    flex-wrap wrap
    margin-left 10px
    .item
      height 30px
      line-height 24px
      padding 3px 15px
      margin 5px 5px 5px 0
      border-radius 18px
      background-color #eae1e1
      color #666161
</style>