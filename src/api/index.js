import ajax from "./ajax";
const BASE_URL = 'http://meiyun.info:3000'

//得到登录状态

export const getLoginStatus = () => ajax(`${BASE_URL}/login/status`)

//根据音乐id获取地址
export const getMusicUrl = (id) => ajax(`${BASE_URL}/song/url`,{id})