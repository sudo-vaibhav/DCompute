import { NavLink } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
const Sidebar = () => {
  return (
    <div
      className="h-full text-center fixed bg-dark-700 flex-col flex justify-center items-center"
      style={{
        width: 'calc(100vw / 18)',
      }}
    >
      {[
        { icon: 'dollar-sign', text: 'Get Paid', to: 'jobs' },
        {
          icon: 'plus-circle',
          text: 'Deploy',
          to: 'deploy-job',
        },
        {
          icon: 'user',
          text: 'My Jobs',
          to: 'my-jobs',
        },
        {
          icon: 'map-pin',
          text: 'Map',
          to: 'map',
        },
      ].map((e) => {
        return (
          <NavLink
            key={e.text}
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
