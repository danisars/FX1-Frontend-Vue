import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    form: {
      name: null,
      description: null,
      groupName: null,
      editName: null,
      editDescription: null,
      editGroupName: null,
    },
    channelActive: null,
    channelGroupDeleted: [],
    channelDeleted: [],
    channelScroll: 0,
  }
}

export const getters = {
  getField,
}

export const mutations = {
  updateField,
  setChannelGroupDeleted(state, data) {
    if (state.channelGroupDeleted.includes(data)) return
    state.channelGroupDeleted.push(data)
  },
  setChannelDeleted(state, data) {
    if (state.channelDeleted.includes(data)) return
    state.channelDeleted.push(data)
  },
  setChannelGroupUndoDeleted(state, data) {
    const _delete = state.channelGroupDeleted.filter((x) => {
      return x !== data
    })

    state.channelGroupDeleted = _delete
  },
  setChannelUndoDeleted(state, data) {
    const _delete = state.channelDeleted.filter((x) => {
      return x !== data
    })

    state.channelDeleted = _delete
  },
}

export const actions = {
  setChannelGroupDeleted({ commit }, data) {
    commit('setChannelGroupDeleted', data)
  },
  setChannelDeleted({ commit }, data) {
    commit('setChannelDeleted', data)
  },
  setChannelGroupUndoDeleted({ commit }, data) {
    commit('setChannelGroupUndoDeleted', data)
  },
  setChannelUndoDeleted({ commit }, data) {
    commit('setChannelUndoDeleted', data)
  },
}
