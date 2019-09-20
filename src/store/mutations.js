import { UPDATE_lOGIN_STATUS, SET_SONG_INFO, SET_IS_PLAYING } from "./mutation-types";
export default{
  //更新登录状态
  [UPDATE_lOGIN_STATUS](state,loginStatus){
    state.loginStatus = loginStatus
  },
  //设置歌曲信息
  [SET_SONG_INFO](state,songInfo){
    state.songInfo = songInfo
  },
  [SET_IS_PLAYING](state,isPlaying){
    if(state.isPlaying!=isPlaying){
      state.isPlaying = isPlaying
    }
  }
}