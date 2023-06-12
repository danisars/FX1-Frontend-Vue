import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    lockerRoomSupporting: [],
    lockerRoomOnline: [],
    lockerRoomActive: null,
    lockerRoomDeletedManagers: [],
    lockerRoomPermissions: [],
    lockerRoomReply: null,
    lockerRoomPrivateChat: null,
    lockerRoomLoading: false,
    lockerRoomConnectingToChannel: false,
  }
}

export const getters = {
  getField,
  getLockerRoomSupporting(state) {
    return state.lockerRoomSupporting
  },
}

export const mutations = {
  updateField,
  setLockerRoomActive(state, data) {
    state.lockerRoomActive = data
  },
  setLockerRoomOnline(state, data) {
    state.lockerRoomOnline = data
  },
  setLockerRoomSupporting(state, data) {
    state.lockerRoomSupporting.push(data)
  },
  deleteLockerRoomSupporting(state, data) {
    const remove = state.lockerRoomSupporting.filter((x) => {
      return x?.slug !== data?.slug
    })

    state.lockerRoomSupporting = remove
  },
  clearLockerRoomSupporting(state, data) {
    state.lockerRoomSupporting = data
  },
  setLockerRoomDeletedManagers(state, data) {
    if (state.lockerRoomDeletedManagers.includes(data)) return
    state.lockerRoomDeletedManagers.push(data)
  },
  setLockerRoomUndoDeletedManagers(state, data) {
    const remove = state.lockerRoomDeletedManagers.filter((x) => {
      return x !== data
    })

    state.lockerRoomDeletedManagers = remove
  },
  clearLockerRoomDeletedManagers(state) {
    state.lockerRoomDeletedManagers = []
  },
  setLockerRoomPermissions(state, data) {
    state.lockerRoomPermissions = state.lockerRoomPermissions.map((x) =>
      x.userID === data.userID ? data : x
    )
  },
  setLockerRoomPrivateChat(state, data) {
    state.lockerRoomPrivateChat = data
  },
  setLockerRoomLoading(state, data) {
    state.lockerRoomLoading = data
  },
  setLockerRoomConnectingToChannel(state, data) {
    state.lockerRoomConnectingToChannel = data
  },
}

export const actions = {
  setLockerRoomActive({ commit }, data) {
    commit('setLockerRoomActive', data)
  },
  setLockerRoomSupporting({ commit }, data) {
    commit('setLockerRoomSupporting', data)
  },
  deleteLockerRoomSupporting({ commit }, data) {
    commit('deleteLockerRoomSupporting', data)
  },
  clearLockerRoomSupporting({ commit }, data) {
    commit('clearLockerRoomSupporting', data)
  },
  setLockerRoomDeletedManagers({ commit }, data) {
    commit('setLockerRoomDeletedManagers', data)
  },
  setLockerRoomUndoDeletedManagers({ commit }, data) {
    commit('setLockerRoomUndoDeletedManagers', data)
  },
  clearLockerRoomDeletedManagers({ commit }) {
    commit('clearLockerRoomDeletedManagers')
  },
  setLockerRoomPermissions({ commit }, data) {
    commit('setLockerRoomPermissions', data)
  },
  setLockerRoomPrivateChat({ commit }, data) {
    commit('setLockerRoomPrivateChat', data)
  },
  setLockerRoomLoading({ commit }, data) {
    commit('setLockerRoomLoading', data)
  },
  setLockerRoomConnectingToChannel({ commit }, data) {
    commit('setLockerRoomConnectingToChannel', data)
  },
}
