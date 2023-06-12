export default function ({ route, redirect }) {
  const code = route.query?.oobCode
  const mode = route.query?.mode

  if (mode === 'resetPassword') {
    return redirect(`/create-new-password?c=${code}`)
  }

  return redirect('/')
}
