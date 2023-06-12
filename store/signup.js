import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    username: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    avatar: {},
    avatarSocial: null,
    avatarCropped: null,
    signupLockerRoomSupporting: null,
    signupOwnerManagerInvite: null,
    signupMethod: null,
  }
}

export const getters = {
  getField,
}

export const mutations = {
  updateField,
  setSignUpEmail(state, data) {
    state.email = data
  },
  setSignUpOwnerManagerInvite(state, data) {
    state.signupOwnerManagerInvite = data
  },
}

export const actions = {
  setSignUpEmail({ commit }, data) {
    commit('setSignUpEmail', data)
  },
  setSignUpOwnerManagerInvite({ commit }, data) {
    commit('setSignUpOwnerManagerInvite', data)
  },
}
