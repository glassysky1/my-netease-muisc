import {
  UPDATE_lOGIN_STATUS, SET_SONG_INFO,
  SET_IS_PLAYING, SET_DURATION, SET_CURRENTTIME, SET_LIKE_LIST 
  , UPDATE_RECENT_PLAYLIST, UPDATE_USER_INFO
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
  },
  [SET_LIKE_LIST](state, likelistIds){
    state.likelistIds = likelistIds
  },
  [UPDATE_RECENT_PLAYLIST](state,songId){
    //如果播放歌曲是一样的话，就不添加到播放列表了
    let flag =true
    state.recentPlaylistIds.forEach((item,index)=>{
      if(item===songId){
        flag=false
        return
      }
    })
    if(flag){
      state.recentPlaylistIds.unshift(songId)
    }
  },
  [UPDATE_USER_INFO](state,userInfo){
    state.userInfo = userInfo
  }
}