export const state = () => {
  return {
    supporting: [],
    isLoading: true,
  }
}

export const getters = {
  getLockerRoomSupporting(state) {
    return state.supporting
  },
  getLockerRoomIsLoading(state) {
    return state.isLoading
  },
}

export const mutations = {
  setLockerRoomSupporting(state, data) {
    state.supporting = data
  },
  setLockerRoomIsLoading(state, data) {
    state.isLoading = data
  },
}

export const actions = {
  setLockerRoomSupporting({ commit }, data) {
    commit('setLockerRoomSupporting', data)
  },
  setLockerRoomIsLoading({ commit }, data) {
    commit('setLockerRoomIsLoading', data)
  },
}
