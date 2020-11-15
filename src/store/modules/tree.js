import { getBiaozhuTree, findByLabelLike, addBiaozhuPair, getEventTft, getAccidentReport } from '@/api/tree'
import { getToken, removeToken } from '@/utils/auth'

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

  // 获取标注树
  findByLabelLike ({ commit, state }, keyword) {
    // console.log(keyword);
    return new Promise((resolve, reject) => {
      findByLabelLike(keyword).then(response => {
        const { data } = response
        // console.log(data);
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // const { db_nodes } = data
        // console.log(nodes, edges)
        // roles must be a non-empty array
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getEventTft({ commit, state }) {
    // console.log(keyword);
    return new Promise((resolve, reject) => {
      getEventTft().then(response => {
        const { data } = response
        // console.log(data);
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // const { db_nodes } = data
        // console.log(nodes, edges)
        // roles must be a non-empty array
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAccidentReport({ commit, state }) {
    // console.log('1111111');
    return new Promise((resolve, reject) => {
      getAccidentReport().then(response => {
        const { data } = response
        // console.log(data);
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // const { db_nodes } = data
        // console.log(nodes, edges)
        // roles must be a non-empty array
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addBiaozhuPair ({ commit, state }, { anli, biaozhun }) {
    console.log(anli, biaozhun)
    return new Promise((resolve, reject) => {
      addBiaozhuPair({ anli: anli, biaozhun: biaozhun }).then(response => {
        const { data } = response
        // console.log(data);
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // const { db_nodes } = data
        // console.log(nodes, edges)
        // roles must be a non-empty array
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken ({ commit }) {
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
