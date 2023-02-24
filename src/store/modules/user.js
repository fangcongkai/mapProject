import {  refreshToken } from '@/api/user'
import router, { resetRouter } from '@/router'

const state = {
  token: '',
  name: '管理员',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },

}

const actions = {




  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

 
  // refresh  Token
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      refreshToken()
        .then(async response => {
          const { new_token } = response.data
          /* 更新store Token*/
          commit('SET_TOKEN', new_token.token)
          /* 更新cookie Token*/
          setToken(new_token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
