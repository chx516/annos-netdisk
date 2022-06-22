import { getUserInfo } from '_r/user.js' //引入axios封装
// import { getToken, setToken } from '@/utils/auth'
import common from '@/libs/globalFunction/common.js'
import { login } from '@/api/api_user'



export default {
  state: {
    token: common.getCookies("Token"),
    isLogin: false, //  用户登录状态
    userInfoObj: {}, //  用户信息
    results: {},
    role: false
  },
  mutations: {

    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_RESULT: (state, result) => {
      state.results = result
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    /**
     * 保存登录状态
     * @param {object} state Vuex 的 state 对象
     * @param {boolean} data 登录状态
     */
    changeIsLogin(state, data) {
      state.isLogin = data
    },

    /**
     * 保存用户信息
     * @param {object} state Vuex 的 state 对象
     * @param {boolean} data 用户信息
     */
    changeUserInfoObj(state, data) {
      state.userInfoObj = Object.assign({}, state.userInfoObj, data)
    }
  },
  actions: {
    /**
     * 获取用户信息
     */
    login2({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {

        login({ username: username.trim(), password: password }).then(response => {
          const { token, success, data } = response

          if (success) {
            // debugger
            commit('SET_TOKEN', token)
            // 改变登录状态
            commit('changeIsLogin', success)
            // 保存用户信息
            commit('changeUserInfoObj', data)
            // 登录成功结果集
            commit('SET_RESULT', response)
            if (data.role == 1) {

              //保存rola
              commit('SET_ROLE', true)


            }
            if (data.role == 2) {
              //保存rola
              commit('SET_ROLE', false)
            }


          } else {
            commit('SET_RESULT', response)
          }

          // setToken(token)
          common.setCookies("Token", token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const { success, data } = response
          if (success) {
            // debugger
            //  commit('SET_TOKEN', token)
            // 改变登录状态
            commit('changeIsLogin', success)
            // 保存用户信息
            commit('changeUserInfoObj', data)
            // 登录成功结果集
            commit('SET_RESULT', response)

            if (data.role == 1) {

              //保存rola
              commit('SET_ROLE', true)


            }
            if (data.role == 2) {
              //保存rola
              commit('SET_ROLE', false)
            }

          } else {
            commit('SET_RESULT', response)
            commit('changeIsLogin', success)
            //还原rola
            commit('SET_ROLE', false)

          }

          resolve(response)
        }).catch(error => {
          reject(error)
        })


      })

    }
  }

}
