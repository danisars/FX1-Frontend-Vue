export const actions = {
  async nuxtServerInit({ dispatch }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken, ...authUser } = res.locals.user

      await dispatch(
        'auth/onAuthStateChangedAction',
        {
          authUser,
          claims,
          idToken,
        },
        { root: true }
      )
    }
  },
}
