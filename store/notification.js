import { getField, updateField } from 'vuex-map-fields'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'

export const state = () => {
  return {
    notificationList: [],
    lockerRoomList: [],
    isMentions: 0,
    active: null,
  }
}

export const getters = {
  getField,
  getUnreadMessagesCount(state) {
    return state.notificationList
  },
  getMentions(state) {
    return state.isMentions
  },
  getNotificationActive(state) {
    return state.active
  },
}

export const mutations = {
  updateField,
  setMentions(state, data) {
    state.isMentions = data
  },
  setUnreadMessagesCount(state, data) {
    state.notificationList = data
  },
  setLockerRoomCount(state, data) {
    state.lockerRoomList = data
  },
  clearUnreadMessagesCount(state, data) {
    state.notificationList = data
  },
  clearActiveChannelNotification(state, slug) {
    if (!slug) return
    const arr = cloneDeep(state.notificationList)
    const index = findIndex(arr, { slug })
    arr.splice(index, 1, { slug, unreadMessagesCount: 0 })
    state.notificationList = arr
  },
  setNotificationActive(state, data) {
    state.active = data
  },
}

export const actions = {
  setMentions({ commit }, data) {
    commit('setMentions', data)
  },
  setUnreadMessagesCount({ commit }, data) {
    commit('setUnreadMessagesCount', data)
  },
  clearActiveChannelNotification({ commit }, slug) {
    commit('clearActiveChannelNotification', slug)
  },
  setLockerRoomCount({ commit }, data) {
    commit('setLockerRoomCount', data)
  },
  setNotificationActive({ commit }, data) {
    commit('setNotificationActive', data)
  },
}
