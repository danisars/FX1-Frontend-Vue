export const state = () => {
  return {
    active: {},
    showEdit: false,
    deletedForEveryone: [],
    deleteForSelf: [],
  }
}

export const getters = {
  getChatActive(state) {
    return state.active
  },
  getChatShowEdit(state) {
    return state.showEdit
  },
  getChatDeletedForEveryone(state) {
    return state.deletedForEveryone
  },
  getChatDeletedForSelf(state) {
    return state.deleteForSelf
  },
}

export const mutations = {
  setChatActive(state, data) {
    state.active = data
  },
  setChatShowEdit(state, data) {
    state.showEdit = data
  },
  setChatDeletedForEveryone(state, data) {
    if (state.deletedForEveryone.includes(data)) return
    state.deletedForEveryone.push(data)
  },
  setChatDeletedForSelf(state, data) {
    if (state.deleteForSelf.includes(data)) return
    state.deleteForSelf.push(data)
  },
  clearChatDeleted(state) {
    state.deletedForEveryone = []
    state.deleteForSelf = []
  },
}

export const actions = {
  setChatActive({ commit }, data) {
    commit('setChatActive', data)
  },
  setChatShowEdit({ commit }, data) {
    commit('setChatShowEdit', data)
  },
  setChatDeletedForEveryone({ commit }, data) {
    commit('setChatDeletedForEveryone', data)
  },
  setChatDeletedForSelf({ commit }, data) {
    commit('setChatDeletedForSelf', data)
  },
  clearChatDeleted({ commit }) {
    commit('clearChatDeleted')
  },
}
