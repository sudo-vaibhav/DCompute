import { Route, Switch, useRouteMatch } from 'react-router'
import MyJobs from './MyJobs'
import Jobs from './Jobs'
import Sidebar from './Sidebar'
import Deploy from './Deploy'
import Map from './Map'

const Dashboard = () => {
  const { path } = useRouteMatch()
  return (
    <div
      style={{
        paddingTop: 92,
      }}
      className="bg-dark-500 min-h-screen grid md:grid-cols-8 lg:grid-cols-18"
    >
      <Sidebar />
      <div className="col-start-2 md:col-span-7 lg:col-start-2 lg:col-end-19">
        <Switch>
          <Route path={`${path}/jobs`} exact>
            <Jobs />
          </Route>
          <Route path={`${path}/my-jobs`} exact>
            <MyJobs />
          </Route>
          <Route path={`${path}/deploy-job`} exact>
            <Deploy />
          </Route>
          <Route path={`${path}/map`} exact>
            <Map />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
export default Dashboard
