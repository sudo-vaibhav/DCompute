import { NavLink } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
const Sidebar = () => {
  return (
    <div className="h-full fixed bg-dark-700 col-start-1 col-span-1 flex-col flex justify-center items-center">
      {[
        { icon: 'dollar-sign', text: 'Get Paid', to: 'jobs' },
        {
          icon: 'plus-circle',
          text: 'Deploy Job',
          to: 'deploy-job',
        },
        {
          icon: 'user',
          text: 'My Jobs',
          to: 'my-jobs',
        },
        {
          icon: 'map-pin',
          text: 'Map View',
          to: 'map',
        },
      ].map((e) => {
        return (
          <NavLink
            to={`/dashboard/${e.to}`}
            className="p-6 my-2 flex flex-col items-center"
            activeClassName="text-secondary-500  w-full border-l-4 border-secondary-500 "
          >
            <FeatherIcon icon={e.icon} />
            <div className="text-xs my-2">{e.text}</div>
          </NavLink>
        )
      })}
    </div>
  )
}

export default Sidebar
