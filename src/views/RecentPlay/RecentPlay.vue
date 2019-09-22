<template>
  <div>
    <BackHeader color="red" title="最近播放"></BackHeader>
    <SongList v-if="recentPlaylistIdsCount" :tracks="tracks" class="song-list" />
    <p v-else class="empty-remind">你最近没有播放过歌哦</p>
  </div>
</template>

<script>
import SongList from "../../components/SongList";
import { mapGetters } from "vuex";
import { getSongDetail } from "../../api";
import BackHeader from "../../components/BackHeader";
export default {
  name: "RecentPlay",
  components: {
    BackHeader,
    SongList
  },
  data() {
    return {
      tracks: []
    };
  },
  computed: {
    ...mapGetters(["recentPlaylistIdsCount", "recentPlaylistIds"])
  },
  methods: {
    async getRecentPlayList() {
      if (this.recentPlaylistIdsCount) {
        try {
          //获取歌曲信息传值
          const {data:res} = await getSongDetail(this.recentPlaylistIds.toString());
          console.log(res.songs);
          
          this.tracks = res.songs;
          
        } catch (error) {}
      }
    }
  },
  mounted() {
    this.getRecentPlayList();
  },
  activated(){
    this.getRecentPlayList();
  }
};
</script>
<style lang="stylus" scoped>
.song-list
  padding-top 44px
.empty-remind
  text-align center
  padding 100px 10px
  font-size 16px
</style>