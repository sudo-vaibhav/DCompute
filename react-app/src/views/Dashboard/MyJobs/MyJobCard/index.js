import Card from '../../../../components/Card'
import FeatherIcon from 'feather-icons-react'
import Loading from './Status/Loading'

const MyJobCard = ({ job }) => {
  return (
    <Card className="pt-8 w-full">
      <div className="flex flex-col">
        <div className="flex w-full justify-between items-center">
          <h4 className="font-semibold text-lg">One Billionth Prime Number</h4>
          <div className="" style={{ width: 40, height: 40 }}>
            <Loading />
          </div>
        </div>
        <div className="my-6 text-secondary-500">
          <p>Status : {job.status[0].toUpperCase() + job.status.slice(1)}</p>
          <p className="mt-2"> Logs :</p>
          <div
            style={{
              maxHeight: 250,
              overflowY: 'auto',
            }}
            className="bg-dark-900 text-light-100 p-8 my-4 rounded-lg relative"
          >
            <FeatherIcon icon="copy" className="absolute top-0 right-0 m-8" />
            <code>
              job request received ✓ <br />
              job deployed ✓ <br />
              running WASM binary ...
            </code>
          </div>
        </div>
      </div>
    </Card>
  )
}
export default MyJobCard