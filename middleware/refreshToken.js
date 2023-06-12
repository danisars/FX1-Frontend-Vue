export default async function ({ store }) {
  if (store.getters['auth/getIsLoggedIn']) {
    try {
      await store.dispatch('auth/refreshToken')
    } catch (error) {}
  }
}
