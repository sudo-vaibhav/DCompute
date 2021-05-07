import logo from './logo.svg'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <header className="bg-dark-700 fixed top-0 left-0 w-screen z-10">
      <div className="container flex justify-between mx-auto py-4">
        <Link to="/" className="flex items-center">
          <img src={logo} style={{ height: 60, width: 60 }} />
          <h4 className="font-bold text-xl ml-3">DCompute</h4>
        </Link>
        <div className="grid gap-4 grid-cols-2 place-items-center">
          <Link to="/" data-button="btn-primary-md">
            Log In
          </Link>
          <Link to="/sign-up" data-button="btn-primary-md">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
