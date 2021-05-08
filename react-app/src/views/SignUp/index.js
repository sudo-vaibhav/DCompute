import { useEffect } from 'react'
import Auth from '../../components/Auth'

const SignUp = () => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
      })
    } else {
      alert(
        'sorry, this application requires location access. Enable it in browser settings to continue',
      )
    }
  })
  return (
    <Auth
      title="register"
      cta={{
        text: 'Sign Up',
        handler: (values) => {},
      }}
      alterLink={{
        text: 'Log In',
        link: '/log-in',
      }}
    />
  )
}

export default SignUp
