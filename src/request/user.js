// 用户信息相关接口
import { get, post } from './http'


// 用户登录
export const login = (p) => get('/user/login', p)
// 获取登录状态及用户信息
export const checkUserLoginInfo = (p) => get('/user/checkuserlogininfo', p)
// 用户注册
export const addUser = (p) => post('/user/register', p)
//获取用户信息
export const getUserInfo = () => get('/login/getUserInfo')
//重置密码--验证token
export const toCheckToken = (p) => get("/repass/retoken", p)
//重置密码
export const doRepass = (p) => get("/repass/repass.do", p)
