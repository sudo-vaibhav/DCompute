import { useState, useEffect } from 'react'
import Auth from '../../components/Auth'
import { useAuth, db } from '../../context'
import { generateFromString } from 'generate-avatar'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const [{ latitude, longitude }, setLatLong] = useState({
    latitude: 0,
    longitude: 0,
  })
  const { signup } = useAuth()
  const history = useHistory()
  useEffect(() => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        setLatLong({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
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
      extras={[
        {
          fieldName: 'celoAddress',
          icon: 'inbox',
          initialValue: '0x664915C9Ce6f9f7DD19d446cc9c9650C34eA36C3',
        },
      ]}
      cta={{
        text: 'Sign Up',
        handler: async (values) => {
          try {
            console.log('trying to signin up')
            console.log(values.email, values.password, values.userName)
            const ref = await signup(
              values.email,
              values.password,
              values.userName,
            )
            await db.collection('user').add({
              uid: ref.user.uid,
              email: values.email,
              userName: values.userName,
              latitude,
              longitude,
              avatar: generateFromString(Date.now().toString()),
            })
          } catch (err) {
            console.error(err)
            alert('error occured while signing up')
          }
        },
      }}
      alterLink={{
        text: 'Log In',
        link: '/log-in',
      }}
    />
  )
}

export default SignUp
