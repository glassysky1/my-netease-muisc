<template>
  <div>
    <BackHeader title="排行榜" color="red" />
    <section class="left-right-padding-box">
      <OfficialList  :official-list="officialList" />
      <top-list :data="recommendList" title="推荐榜"></top-list>
      <top-list :data="internationalList" title="全球榜"></top-list>
      <top-list :data="moreList" title="更多榜单"></top-list>
    </section>
  </div>
</template>

<script>
import OfficialList from "./OfficialList";
import TopList from "./TopList";
import BackHeader from "../../components/BackHeader";
import { getToplistDetail } from '../../api';
export default {
  data(){
    return{
      officialList:[],
      recommendList:[],
      internationalList:[],
      moreList:[]
    }
  },
  components: {
    BackHeader,
    OfficialList,
    TopList
  },
  async mounted(){
    const {data:res} =  await getToplistDetail()
    const {list} = res
    this.officialList = list.slice(0,4)
    this.recommendList = list.slice(4,10)
    this.internationalList = list.slice(10,16)
    this.moreList = list.slice(16)
  }
};
</script>

<style>
.left-right-padding-box{
  padding: 0 5px;
}
</style>