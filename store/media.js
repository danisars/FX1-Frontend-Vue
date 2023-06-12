import { v4 as uuidv4 } from 'uuid'
import { getStorage, ref, uploadString } from 'firebase/storage'

export const state = () => {
  return {
    files: [],
    messages: [],
    filesLocal: [],
    lightbox: [],
  }
}

export const getters = {
  getMediaFiles(state) {
    return state.files
  },
  getMediaMessages(state) {
    return state.messages
  },
  getMediaFilesLocal(state) {
    return state.filesLocal
  },
  getMediaLightbox(state) {
    return state.lightbox
  },
}

export const mutations = {
  setMediaFiles(state, data) {
    state.files.push(data)
  },
  clearMediaFiles(state) {
    state.files = []
  },
  deleteMediaFiles(state, data) {
    const remove = state.files.filter((x) => {
      return x !== data
    })

    state.files = remove
  },
  setMediaMessages(state, data) {
    state.messages.push(data)
  },
  clearMediaMessages(state) {
    state.messages = []
  },
  deleteMediaMessages(state, data) {
    const remove = state.messages.filter((x) => {
      return x?.objectID !== data
    })

    state.messages = remove
  },
  updateMediaMessages(state, data) {
    const index = state.messages.findIndex((x) => {
      return x?.objectID === data?.objectID
    })

    state.messages[index].isUploading = false
  },
  setMediaLocalFiles(state) {
    // state.filesLocal = state.files
    state.filesLocal = state.messages
  },
  setMediaLightbox(state, data) {
    state.lightbox = data
  },
}

export const actions = {
  // eslint-disable-next-line no-empty-pattern
  async upload({}, file) {
    try {
      const fileID = uuidv4()
      const storage = getStorage()
      const storageRef = ref(storage, `uploaded/${fileID}`)

      await uploadString(storageRef, file, 'data_url').then((snapshot) => {
        return snapshot
      })

      return { id: fileID }
    } catch (error) {}
  },
  // eslint-disable-next-line no-empty-pattern
  async channelUpload({}, details) {
    try {
      const storage = getStorage()
      const storageRef = ref(storage, `channelUploads/${details?.id}`)

      await uploadString(storageRef, details?.file, 'data_url').then(
        (snapshot) => {
          return snapshot
        }
      )
    } catch (error) {
      throw new Error(error)
    }
  },
  setMediaFiles({ commit }, data) {
    commit('setMediaFiles', data)
  },
  clearMediaFiles({ commit }) {
    commit('clearMediaFiles')
  },
  deleteMediaFiles({ commit }, data) {
    commit('deleteMediaFiles', data)
  },
  setMediaMessages({ commit }, data) {
    commit('setMediaMessages', data)
  },
  clearMediaMessages({ commit }) {
    commit('clearMediaMessages')
  },
  deleteMediaMessages({ commit }, data) {
    commit('deleteMediaMessages', data)
  },
  updateMediaMessages({ commit }, data) {
    commit('updateMediaMessages', data)
  },
  setMediaLocalFiles({ commit }) {
    commit('setMediaLocalFiles')
  },
  setMediaLightbox({ commit }, data) {
    commit('setMediaLightbox', data)
  },
}
