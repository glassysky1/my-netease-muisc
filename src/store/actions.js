import { UPDATE_lOGIN_STATUS, SET_SONG_INFO, SET_IS_PLAYING, SET_DURATION, SET_CURRENTTIME, SET_LIKE_LIST, UPDATE_RECENT_PLAYLIST, UPDATE_USER_INFO } from "./mutation-types";
import { getUesrInfo, getLoginStatus, getMusicUrl, getUserLikelist, getLogout, getMusicLrc } from "../api/index";
export default {
  //得到登录状态
  async getThenSetLoginStatus({ commit }) {
    //请求登录状态
    try {
      await getLoginStatus()
      const uid = localStorage.getItem("uid"); //下娘用户的id即uid储存来
      const { data: res } = await getUesrInfo(uid)
      const { nickname, backgroundUrl, avatarUrl, gender, follows, followeds, signature } = res.profile

      commit(UPDATE_USER_INFO, { nickname, backgroundUrl, avatarUrl, gender, follows, followeds, signature })
      commit(UPDATE_lOGIN_STATUS, true)
    } catch (error) {
      console.log(error);
      commit(UPDATE_lOGIN_STATUS, false)

    }
  },
  //获取用户信息

  //退出登录设置登录状态
  async getLogoutThenSetLoginStatus({ commit }) {
    try {
      await getLogout()
      commit(UPDATE_lOGIN_STATUS, false)
    } catch (e) {
      commit(UPDATE_lOGIN_STATUS, true)

    }
  },
  //记录歌曲信息
  async getThenSetSongInfo({ commit }, songInfo) {
    try {
      const songId = songInfo.id;
      const { data: res } = await getMusicUrl(songId)
      // const {data:res1} = await getMusicLrc(songId)
     
      // const musicLrc = res1.lrc.lyric
       
      const musicUrl = res[0].url
      // console.log(musicLrc);

      //同时把这首歌存放该用户的最近播放记录里
      commit(UPDATE_RECENT_PLAYLIST, songId)
      commit(SET_SONG_INFO, { ...songInfo, musicUrl, })

    } catch (e) {
      console.log(e);

    }

  },

  //从uid获取喜欢列表
  async getThenSetLikelist({ commit }, uid) {
    try {
      const { data: res } = await getUserLikelist(uid)
      // console.log(res.ids);
      //获取所有喜欢歌曲的id
      const likelistIds = res.ids;
      commit(SET_LIKE_LIST, likelistIds)
    } catch (e) {
      console.log(e);

    }
  },



  //是否播放
  getThenSetIsPlaying({ commit }, isPlaying) {
    commit(SET_IS_PLAYING, isPlaying)
  },
  //记录设置总时间
  getThenSetDuration({ commit }, duration) {
    commit(SET_DURATION, duration)
  },
  //记录当前时间
  getThenSetCurrentTime({ commit }, currentTime) {
    commit(SET_CURRENTTIME, currentTime)
  }
}