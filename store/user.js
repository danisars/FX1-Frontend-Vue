import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    userProfile: null,
    userID: null,
    userName: null,
    userAvatar: null,
  }
}

export const getters = {
  getField,
  getUserProfile(state) {
    return state.userProfile
  },
  getUserID(state) {
    return state.userID
  },
  getUserName(state) {
    return state.userName
  },
  getUserAvatar(state) {
    return state.userAvatar
  },
}

export const mutations = {
  updateField,
  setUserProfile(state, data) {
    state.userProfile = data
  },
  setUserID(state, data) {
    state.userID = data
  },
  setUserName(state, data) {
    state.userName = data
  },
  setUserAvatar(state, data) {
    state.userAvatar = data
  },
}

export const actions = {
  setUserProfile({ commit }, data) {
    commit('setUserProfile', data)
  },
  setUserID({ commit }, data) {
    commit('setUserID', data)
  },
  setUserName({ commit }, data) {
    commit('setUserName', data)
  },
  setUserAvatar({ commit }, data) {
    commit('setUserAvatar', data)
  },
}
