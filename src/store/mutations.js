import {
  UPDATE_lOGIN_STATUS, SET_SONG_INFO,
  SET_IS_PLAYING, SET_DURATION,SET_CURRENTTIME
} from "./mutation-types";
export default {
  //更新登录状态
  [UPDATE_lOGIN_STATUS](state, loginStatus) {
    state.loginStatus = loginStatus
  },
  //设置歌曲信息
  [SET_SONG_INFO](state, songInfo) {
    state.songInfo = songInfo
  },
  [SET_IS_PLAYING](state, isPlaying) {
    if (state.isPlaying != isPlaying)
      state.isPlaying = isPlaying
  },
  [SET_DURATION](state, duration) {
    state.duration = duration
  },
  [SET_CURRENTTIME](state,currentTime){
    state.currentTime = currentTime
  }
}