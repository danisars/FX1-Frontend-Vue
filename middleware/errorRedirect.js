export default function ({ route, redirect }) {
  if (!route && !route.name && !route.path) {
    redirect('/error')
  }
}
