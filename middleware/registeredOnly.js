export default function ({ store, redirect }) {
  if (!store.getters['auth/getIsLoggedIn']) {
    return redirect('/')
  }
}
