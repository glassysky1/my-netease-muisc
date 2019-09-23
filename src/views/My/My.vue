<template>
  <div>
    <div class="profile">
      <div class="img-wrap">
        <img :src="backgroundUrl" alt />
      </div>
      <div class="avatar-wrap">
        <img :src="avatarUrl" alt />
      </div>
      <div class="profile-content">
        <h2 class="nickname">{{nickname}}</h2>
        <p class="follow">
          Fav:{{follows}}
          <span class="followed">Follower:{{followeds}}</span>
        </p>
        <div class="gender">gender:{{setGender}}</div>
        <div class="signature">signature:{{signature}}</div>
      </div>
    </div>
    <ul class="play-list-group">
      <li class="play-list-item">
        <router-link to="/recent-play">
          <div class="icon-container">
            <i class="iconfont icon-bofang1"></i>
          </div>
          <div class="play-list-desc">
            <span class="play-list-title">最近播放</span>
            <span class="play-list-count">{{recentPlaylistIdsCount}} 首</span>
          </div>
        </router-link>
      </li>
      <li class="play-list-item">
        <!-- 传的是喜欢列表用户的id，通过id可以获取可取列表 -->
        <router-link :to="{path:'/play-list-detail',query:{id:likelistIdParamsId}}">
          <div class="icon-container">
            <i class="iconfont icon-aixin1"></i>
          </div>
          <div class="play-list-desc">
            <span class="play-list-title">我喜欢的音乐</span>
            <span class="play-list-count">{{likelistIdsCount}} 首</span>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="logoutBtn" @click="logout">
      <button>退出登录</button>
    </div>
  </div>
</template>

<script>
import {
  getUserLikelist,
  getUserPlaylistParams,
  getLoginStatus,
  getLogout
} from "../../api/index";
import { MessageBox } from "mint-ui";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "My",
  data() {
    return {
      //喜欢列表的参数
      likelistIdParamsId: null
    };
  },
  computed: {
    ...mapGetters([
      "likelistIdsCount",
      "likelistIds",
      "recentPlaylistIdsCount",
      "avatarUrl",
      'backgroundUrl',
      'followeds',
      'follows',
      'gender',
      'nickname',
      'signature'
    ]),
    setGender(gender){
      return gender?'male':'female'
    }
  },
  methods: {
    ...mapActions(["getThenSetLikelist",'getLogoutThenSetLoginStatus']),
    async getData() {
      const uid = localStorage.getItem("uid");
      //获取并设置喜欢列表
      this.getThenSetLikelist(uid);
      this.getLikelistIdParams(uid);
    },
    //获取用户喜欢列表的参数，把参数传给playdetail，获取歌曲列表
    async getLikelistIdParams(uid) {
      try {
        //获取用户歌单
        const { data: res } = await getUserPlaylistParams(uid);
        //获取用户喜欢列表的参数res.playlist[0]
        //用uid获取用户喜欢列表的id
        this.likelistIdParamsId = res.playlist[0].id;
      } catch (error) {
        console.log(error);
      }
    },
     async logout() {
      await MessageBox.confirm("确定退出登录?").then(action => {
        try {
          this.getLogoutThenSetLoginStatus();
          this.$router.replace("/login");
        } catch (error) {
          console.log(error);
        }
      },action=>{
        
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="stylus" scoped>
.play-list-group
  .play-list-item
    padding 10px
    border-bottom 1px solid #e4e4e4
    font-size 16px
    .icon-container
      display inline-block
      width 10%
      .iconfont
        font-size 22px
        vertical-align middle
    .play-list-desc
      display inline-block
      width 90%
      >span
        vertical-align middle
.profile
  position relative
  .img-wrap
    height 250px
    overflow hidden
    img
      width 100%
  .avatar-wrap
    width 60px
    position absolute
    top 30%
    left 5%
    height 60px
    border-radius 50%
    overflow hidden
    img 
      width 100%
      height 100%
  .profile-content
    position absolute
    padding-bottom 10px
    bottom 0
    left 5%
    color #fff;
    .nickname
      line-height 30px
    .follow,.gender,.signature
      line-height 20px
      font-size 12px
      color #ccc
      .followed
        margin-left 10px
.logoutBtn
  width 90%
  margin 10px auto 
  button
    width 100%
    height 40px
    background-color #d44439
    line-height 40px
    text-align center
    font-size 16px
    color #fff
    border-radius 16px
</style>