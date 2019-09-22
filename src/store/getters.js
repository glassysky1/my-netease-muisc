
export default{
  isPlaying(state){
    return state.isPlaying
  },
  songInfo(state){
    return state.songInfo
  },
  duration(state){
    return state.duration
  },
  currentTime(state){
    return state.currentTime
  },
  likelistIds(state){
    return state.likelistIds
  },
  likelistIdsCount(state){
    return state.likelistIds.length
  } ,
  recentPlaylistIdsCount(state){
    return state.recentPlaylistIds.length
  },
  recentPlaylistIds(state){
    return state.recentPlaylistIds
  },
  avatarUrl(state){
    return state.userInfo.avatarUrl
  },
  backgroundUrl(state){
    return state.userInfo.backgroundUrl
  },
  followeds(state){
    return state.userInfo.followeds
  },
  follows(state){
    return state.userInfo.follows
  },
  gender(state){
    return state.userInfo.gender
  },
  nickname(state){
    return state.userInfo.nickname
  },
  signature(state){
    return state.userInfo.signature
  },
  // musicLrc(state){
  //   return state.songInfo.musicLrc
  // }
  songId(state){
    return state.songInfo.id
  }
}