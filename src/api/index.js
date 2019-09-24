import ajax from "./ajax";
import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

//得到登录状态

export const getLoginStatus = () => axios.get(`${BASE_URL}/login/status`, {
  withCredentials: true,
  params: {
    random: Math.random()
  }
})

//根据音乐id获取地址
export const getMusicUrl = (id) => ajax(`${BASE_URL}/song/url`, { id })

//根据音乐获取歌词
export const getMusicLrc = (id) => axios.get(`${BASE_URL}/lyric`, {
  params: {
    id,
  }
})
//加random的 作用使得get请求不走缓存
///likelist?uid=32953014
export const getUserLikelist = uid => axios.get(`${BASE_URL}/likelist`, {
  params: {
    uid,
    random: Math.random()
  },
  withCredentials: true
})

//获取用户播放列表参数,为了获取里面的id，传参并生成歌曲列表
export const getUserPlaylistParams = uid => axios.get(`${BASE_URL}/user/playlist`, {
  params: {
    uid
  }
})
//获取歌曲详情
export const getSongDetail = ids => axios.get(`${BASE_URL}/song/detail`, {
  params: {
    ids
  }
})
//退出登录
export const getLogout = () => axios(`${BASE_URL}/logout`, {
  withCredentials: true,
  params: {
    random: Math.random()
  }
});
//登录
export const login = (phone, password) => axios.get(`${BASE_URL}/login/cellphone`, {
  params: {
    phone,
    password,
    random: Math.random()
  },
  withCredentials: true
})
//获取用户信息
export const getUesrInfo = (uid) => axios.get(`${BASE_URL}/user/detail`, {
  params: {
    uid,
    random: Math.random()
  },
  withCredentials: true
})

//喜欢信息
export const toggleStarTheSong = (musicId, like) => axios.get(`${BASE_URL}/like`, {
  params: {
    id: musicId,
    like,
  },
  withCredentials: true
})

//搜索建议
export const getSearchSuggestions = keywords => axios.get(`${BASE_URL}/search/suggest`, {
 params:{
    keywords,
    type: "mobile"
 }

})
//获取热词
export const getHotSearch = () => axios.get(`${BASE_URL}/search/hot`)

//根据关键字获取歌曲列表
export const getSearchResult = keywords =>axios.get(`${BASE_URL}/search`,{
  params:{
    keywords
  }
})
export const formatSinger = (singerList) => {
  // 拿出列表里面每一项的name，中间用'/'分隔
  let formatedStr = '';
  singerList.forEach((item) => {
    formatedStr += `${item.name}/`;
  });
  return formatedStr.slice(0, -1);
};

//获取榜单列表
export const getToplistDetail = () =>axios.get(`${BASE_URL}/toplist/detail`)