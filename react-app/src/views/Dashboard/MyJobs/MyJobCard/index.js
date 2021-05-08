import Card from '../../../../components/Card'
import FeatherIcon from 'feather-icons-react'
import Loading from './status/Loading'
import Done from './status/Done'
import Added from './status/Added'

const MyJobCard = ({ job }) => {
  const statusColorMap = {
    done: '#299234',
    processing: '#D29C0E',
    added: '#537AE0',
  }

  return (
    <Card className="pt-8 w-full">
      <div className="flex flex-col">
        <div className="flex w-full justify-between items-center">
          <h4 className="font-semibold text-lg">One Billionth Prime Number</h4>
          <div className="" style={{ width: 40, height: 40 }}>
            {job.status === 'done' ? (
              <Done />
            ) : job.status === 'processing' ? (
              <Loading />
            ) : (
              <Added />
            )}
          </div>
        </div>
        <div className="my-6 text-secondary-500">
          <p>
            Status :{' '}
            <span
              className={`font-semibold text-lg`}
              style={{
                color: statusColorMap[job.status],
              }}
            >
              {job.status[0].toUpperCase() + job.status.slice(1)}
            </span>
          </p>
          {job.status !== 'added' && (
            <>
              <p className="mt-2"> Logs :</p>
              <div
                style={{
                  maxHeight: 250,
                  overflowY: 'auto',
                }}
                className="bg-dark-900 text-light-100 p-8 my-4 rounded-lg relative"
              >
                {/* Overlay */}
                {job.status === 'done' && (
                  <div
                    className="absolute top-0 left-0 right-0 bottom-0 z-10 grid place-items-center text-xl"
                    style={{
                      background: 'rgba(0,0,0,0.9)',
                    }}
                  >
                    Click here to pay and view output
                  </div>
                )}
                <>
                  <FeatherIcon
                    icon="copy"
                    className="absolute top-0 right-0 m-8"
                  />
                  <code>
                    job request received ✓ <br />
                    job deployed ✓ <br />
                    running WASM binary ...
                  </code>
                </>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
export default MyJobCard
