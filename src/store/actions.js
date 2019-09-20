import { UPDATE_lOGIN_STATUS, SET_SONG_INFO, SET_IS_PLAYING, SET_DURATION, SET_CURRENTTIME } from "./mutation-types";
import { getLoginStatus,getMusicUrl } from "../api/index";
export default {
  //得到登录状态
  async getThenSetLoginStatus({ commit }) {
    console.log(1);


    //请求登录状态
    const { data: res } = await getLoginStatus()
    // commit(UPDATE_lOGIN_STATUS,true)
    // console.log(res);
    if (res.code === 200) {
      console.log(res.code);

    } else {
      commit(UPDATE_lOGIN_STATUS, false)

    }
  },
  //记录歌曲信息
  async getThenSetSongInfo({ commit }, songInfo) {
    try {
      const songId = songInfo.id;
      const {data:res} = await getMusicUrl(songId)
      


      const musicUrl =  res[0].url
      commit(SET_SONG_INFO, { ...songInfo, musicUrl})
    } catch (e) {
      console.log(e);

    }

  },
  //是否播放
  getThenSetIsPlaying({commit},isPlaying){
    commit(SET_IS_PLAYING,isPlaying)
  },
  //记录设置总时间
  getThenSetDuration({commit},duration){
    commit(SET_DURATION, duration)
  },
  //记录当前时间
  getThenSetCurrentTime({commit},currentTime){
   commit(SET_CURRENTTIME,currentTime) 
  }
}