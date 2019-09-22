<template>
  <div>
    <BackHeader color="trans" />
    <div class="play-list-detail-top" ref="playListDesc">
      <div class="img-wrap">
        <img v-lazy="coverImgUrl" class="cover-img" />
      </div>
      <h1 class="play-list-title">{{playlistTitle}}</h1>
      <p class="play-list-update-time">更新时间: {{updateTime}}</p>
    </div>
    <div class="play-list-detail-bottom">
      <div class="play-list-control">
        <div class="play-all">
          <i class="iconfont icon-bofang"></i>
          <span>播放全部（共{{trackCount}}首）</span>
        </div>
        <div class="star-me">{{computeCount}}</div>
      </div>
      <mt-spinner type="double-bounce" v-if="!tracks">
      </mt-spinner>
        <SongList v-else :tracks="tracks" />
    </div>
  </div>
</template>

<script>
import SongList from "../../components/SongList";
import moment from "moment";
moment.locale("zh-cn");
import BackHeader from "../../components/BackHeader";
export default {
  name: "PlaylistDetail",
  data() {
    return {
      //这个id也可以是用户的id，而不是uid
      id: this.$route.query.id,
      coverImgUrl: "",
      playlistTitle: "",
      updateTime: "",
      tracks: [],
      trackCount: 0,
      subscribedCount: ""
    };
  },
  components: {
    BackHeader,
    SongList
  },
  computed: {
    computeCount() {
      if (this.subscribedCount > 10000) {
        return `+ 收藏${(this.subscribedCount / 10000).toFixed(1)}万`;
      } else {
        return `+ 收藏${this.subscribedCount}`;
      }
    }
  },
  methods: {
    async getPlayListDetail() {
      const { data: res } = await this.$axios.get(
        `${this.HOST}/playlist/detail`,
        {
          params: {
            id: this.id
          }
        }
      );
      if (res.code === 200) {
        const {
          coverImgUrl,
          name,
          updateTime,
          trackCount,
          subscribedCount,
          tracks
        } = res.playlist;
        this.coverImgUrl = coverImgUrl;
        this.playlistTitle = name;
        this.updateTime = moment(updateTime).format("MMM Do");
        this.trackCount = trackCount;
        this.subscribedCount = subscribedCount;
        this.tracks = tracks;
      }
    }
  },
  mounted() {
    this.getPlayListDetail();
  }
};
</script>

<style lang="stylus">
img[lazy=loading] {
  width: 100%;
}
.play-list-detail-top
  position relative
  .img-wrap
    height 280px
    overflow hidden
    .cover-img
      width 100%
      margin-top -50px
  .play-list-title
    position absolute
    bottom 18%
    left 10%
    font-size 30px
    color #ffffff
  .play-list-update-time
    position absolute
    bottom 10%
    left 10%
    color #ffffff
    font-size 12px
.play-list-detail-bottom
  position relative
  z-index 2
  margin-top -10px
  .play-list-control
    display flex
    background-color #fff
    height 40px
    border-radius 10px 10px 0 0
    border-radius 1px solid #e4e4e4
    overflow hidden
    .play-all
      display flex
      align-items center
      flex 3
      font-size 16px
      color #2e3030
      .iconfont
        font-size 22px
        margin 0 12px 0 12px
    .star-me
      display flex
      align-items center
      justify-content space-around
      flex 2
      background-color #d44439
      color #f1f1f1
      font-size 16px
</style>