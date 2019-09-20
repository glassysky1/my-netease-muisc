<template>
  <div :class="headerClass">
    <BackBtn></BackBtn>
    <span class="back-header-title">{{title}}</span>
  </div>
</template>

<script>
import BackBtn from "./BackBtn";
export default {
  data(){
    return{
      headerClass:''
    }
  },
  components:{
    BackBtn
  },
  props:['color','title'],
  mounted(){
    this.headerClass = `back-header ${this.color}`
  }
}
</script>

<style lang="stylus">
  .back-header
    position fixed
    z-index 999
    left 0
    top 0
    width 100%
    display flex
    align-items center
    height 44px
    color #f1f1f1
    &.red
      background-color #d44439
    &.trans
      background-color rgba(0,0,0,0)
    .back-header-title
      margin 0 5px
      font-size 18px
      font-weight 400
</style>