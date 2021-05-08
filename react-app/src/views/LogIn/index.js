import Auth from '../../components/Auth'
import { useAuth } from '../../context'

const LogIn = () => {
  const { signin } = useAuth()
  return (
    <Auth
      title="sign in"
      cta={{
        text: 'Log In',
        handler: async (values) => {
          try {
            console.log('trying to signin up')
            console.log(values.email, values.password)
            await signin(values.email, values.password)
          } catch (err) {
            console.error(err)
            alert('error occured while loggin in')
          }
        },
      }}
      alterLink={{
        text: 'Sign Up',
        link: '/sign-up',
      }}
    />
  )
}

export default LogIn
