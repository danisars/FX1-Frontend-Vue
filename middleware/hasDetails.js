export default async function ({ store, app, redirect }) {
  if (store.getters['auth/getIsLoggedIn']) {
    try {
      const { Me } = await app.$api.getMyUserID()

      if (Me) {
        await store.dispatch('user/setUserID', Me?.id)
        return
      }

      await app.$api.deleteFirebaseAccount()
      return redirect('/signup?step=1')
    } catch (error) {
      store.dispatch('auth/authLogOut')
    }
  }
}
