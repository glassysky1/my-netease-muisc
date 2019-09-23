<template>
  <div class="search-box left-right-padding-box">
    <BackHeader color="red" :input="true" :doAfterUserEnter="startSearch" />
    <!-- 默认搜索列表是开启的 -->
    <SearchList v-if="!showResultPageFlag" :doAfterUserClick="startSearch" :list="hots" class="hot-search" title="热门搜索"/>
    <SearchList v-if="!showResultPageFlag" :doAfterUserClick="startSearch" :list="history" title="历史记录" class="hot-search"/>
    <SearchResultList :tracks="songList" v-else class="search-result-list"/>
  </div>
</template>

<script>
import BackHeader from "../../components/BackHeader";
import SearchList from "./SearchList";
import SearchResultList from "./SearchResultList";
import { getHotSearch, getSearchSuggestions,getSearchResult } from '../../api';
export default {
  name: "Search",
  components: {
    BackHeader,
    SearchList,
    SearchResultList
  },
  data() {
    return {
      showResultPageFlag:false,
      hots:[],
      history:[],
      songList:[]
    };
  },
  methods: {
    async getData(){
      //获取热词
      const {data:res} = await getHotSearch()
      this.hots = res.result.hots
    },
    switchToResult(){
      this.showResultPageFlag = true
    },
    //开始搜索
    startSearch(theValueToSearch) {
      //搜索时，把热词和历史记录关闭掉
      this.switchToResult()
      //根据关键词获取歌曲数据，然后把歌传到歌曲组件
      this.getSearchResultData(theValueToSearch)
      //push一个对象进history数组的原因是，为了使得history和hots的格式一致，这样这两部分才能共用一个SearchList组件
      this.history.push({first:theValueToSearch})
    },
    async getSearchResultData(theValueToSearch){
      const {data:res} = await getSearchResult(theValueToSearch)
      this.songList = res.result.songs
      
    }
  },
  mounted(){
    this.getData()
  },
  // beforeRouteLeave(to, from, next) {
  //   this.showResultPageFlag = false;
  //   next();
  // },
};
</script>

<style lang="stylus" scoped>
.search-box
  position absolute
  z-index 999
  top 0
  left 0
  width 100%
  background-color #fff
  .hot-search
    margin-top 44px
  .search-result-list
    padding-top 44px
</style>