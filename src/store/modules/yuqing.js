import { setCrawlerParams } from '@/api/yuqing'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {

  // 设置舆情爬虫参数
  setCrawlerParams({ commit, state }, sform) {
    console.log(sform)
    const { s_key, s_date, s_time } = sform
    return new Promise((resolve, reject) => {
      console.log('进入action！')
      console.log(s_key)
      setCrawlerParams({ s_key: s_key, s_date: s_date, s_time: s_time }).then(response => {
        console.log('已经设置舆情爬虫参数')
        const { data } = response
        if (!data) {
          reject('设置舆情爬虫参数失败')
        }
        const { explain } = data
        console.log(explain)
        // roles must be a non-empty array
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
