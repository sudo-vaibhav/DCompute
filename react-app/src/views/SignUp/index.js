import Auth from '../../components/Auth'

const SignUp = () => {
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
