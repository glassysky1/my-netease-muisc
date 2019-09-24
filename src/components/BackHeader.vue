<template>
  <div :class="headerClass">
    <BackBtn></BackBtn>
    <span v-if="title" class="back-header-title">{{title}}</span>
    <input
      v-if="input"
      v-model="userInput"
      @change="getData"
      type="text"
      class="header-input"
      autofocus
      @keydown.enter="headleEnter"
    />
    <div v-if="searchSuggestinsFlag" class="search-suggestions-container" @click="handleClick">
      <ul class="search-suggestions-list">
        <li class="search-suggestions-item">{{`搜索"${userInput}"`}}</li>
        <li class="search-suggestions-item" v-for="(item,index) in allMatch" :key="index">
          <i class="iconfont icon-sousuo"></i>
          <span class="keyword-item">{{item.keyword}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BackBtn from "./BackBtn";
import { getSearchSuggestions } from "../api";
export default {
  data() {
    return {
      headerClass: "",
      userInput: "",
      allMatch: [],
    };
  },
  components: {
    BackBtn
  },
  computed: {
    //如果为空则搜索建议框关闭
    searchSuggestinsFlag(){
      return this.userInput.trim() !==''
    }
  },
  watch: {
    //监视输入，如果为空则不会发起请求
    userInput(newUserInput) {
      if (newUserInput.trim() != "") {
        this.getData(newUserInput);
      }
    }
  },
  methods: {
    //获取搜索建议词
    async getData(newValue) {
      const { data: res } = await getSearchSuggestions(newValue);
      this.allMatch = res.result.allMatch;
    },
    cleanUserInput() {
      this.userInput = "";
    },
    //回车
    async headleEnter() {
      //先传值再清值
      this.doAfterUserEnter(this.userInput)
      this.cleanUserInput();
    },
    //点击词，搜索
      handleClick(e){
      const src = e.target
      if(src.className ==='keyword-item'){
        this.doAfterUserClick(src.innerText)
        this.cleanUserInput();
      }
    }
  },
  props: ["color", "title", "input","doAfterUserEnter","doAfterUserClick"],
  mounted() {
    this.headerClass = `back-header ${this.color}`;
  }
};
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
    background-color rgba(0, 0, 0, 0)
  .back-header-title
    margin 0 5px
    font-size 18px
    font-weight 400
  .header-input
    width 85%
    height 28px
    margin-left 10px
    border none
    border-bottom 1px solid #e6e6e6
    background #d44439
    color #e6e6e6
    font-size 17px
    outline none
  .search-suggestions-container
    position absolute
    left 30px
    top 44px
    width 90%
    box-shadow 0 0 5px rgba(0, 0, 0, 0.5)
    background-color #fff
    color #2e3030
    .search-suggestions-list
      .search-suggestions-item
        font-size 15px
        color gray
        padding 10px
        border-bottom 1px solid #e4e4e4
        &:first-child
          color rgb(75, 75, 180)
        .keyword-item
          margin-left 10px
        .iconfont
          display inline
</style>