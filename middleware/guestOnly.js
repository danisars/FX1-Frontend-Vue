export default function ({ store, redirect }) {
  if (store.getters['auth/getIsLoggedIn']) {
    const userID = store.getters['user/getUserID']

    if (!userID) return
    return redirect('/locker-room/explore')
  }
}
