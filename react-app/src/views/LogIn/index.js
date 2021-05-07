import Auth from '../../components/Auth'

const LogIn = () => {
  return (
    <Auth
      title="sign in"
      cta={{
        text: 'Log In',
        handler: (values) => {},
      }}
      alterLink={{
        text: 'Sign Up',
        link: '/sign-up',
      }}
    />
  )
}

export default LogIn
