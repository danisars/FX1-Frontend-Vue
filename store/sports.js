export const state = () => {
  return {
    list: [],
    lockerRooms: [],
    supporting: null,
  }
}

export const getters = {
  getSportsList(state) {
    return state.list
  },
  getSportsLockerRooms(state) {
    return state.lockerRooms
  },
  getSportSupporting(state) {
    return state.supporting
  },
}

export const mutations = {
  setSportsList(state, data) {
    state.list = data
  },
  setSportsLockerRooms(state, data) {
    state.lockerRooms = data
  },
  setSportSupporting(state, data) {
    state.supporting = data
  },
}

export const actions = {
  setSportsList({ commit }, data) {
    commit('setSportsList', data)
  },
  setSportsLockerRooms({ commit }, data) {
    commit('setSportsLockerRooms', data)
  },
  setSportSupporting({ commit }, data) {
    commit('setSportSupporting', data)
  },
}
