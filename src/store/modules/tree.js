// import { getBiaozhuTree, findByLabelLike, addBiaozhuPair, getEventTft, getAccidentReport, findBiaozhuPairBySourceid } from '@/api/tree'
import * as treeApi from '@/api/tree'

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
      treeApi.findByLabelLike(keyword).then(response => {
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
      treeApi.getEventTft().then(response => {
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
      treeApi.getAccidentReport().then(response => {
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
  addBiaozhuPair ({ commit, state }, { anli, biaozhun, source, sourceid }) {
    console.log(anli, biaozhun, source, sourceid )
    return new Promise((resolve, reject) => {
      treeApi.addBiaozhuPair({ anli: anli, biaozhun: biaozhun, source: source, sourceid: sourceid }).then(response => {
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
  findBiaozhuPairBySourceid({commit,state},{source, sourceid}) {
    console.log(source, sourceid);
    return new Promise((resolve, reject) => {
      treeApi.findBiaozhuPairBySourceid({ source: source, sourceid: sourceid }).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log(data);
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
