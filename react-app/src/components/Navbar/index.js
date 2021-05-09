import logo from './logo.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context'
import FeatherIcon from 'feather-icons-react'
const Navbar = () => {
  const { currentUser, signout } = useAuth()
  return (
    <header className="bg-dark-700 fixed top-0 left-0 w-screen z-10">
      <div className="container flex justify-between mx-auto py-4">
        <Link to="/" className="flex items-center">
          <img src={logo} style={{ height: 60, width: 60 }} />
          <h4 className="font-bold text-xl ml-3">DCompute</h4>
        </Link>
        <div
          className={`grid gap-4 ${
            !currentUser ? 'grid-cols-2' : ''
          } place-items-center`}
        >
          {!currentUser ? (
            <>
              <Link to="/log-in" data-button="btn-primary-md">
                Log In
              </Link>
              <Link to="/sign-up" data-button="btn-primary-md">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center">
              <span className="mr-4 flex text-secondary-500 font-bold">
                <FeatherIcon icon="user" />
                <span className="mx-4">{currentUser.email}</span>
              </span>
              <button
                data-button="btn-primary-md"
                className="ml-auto"
                onClick={() => signout()}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
