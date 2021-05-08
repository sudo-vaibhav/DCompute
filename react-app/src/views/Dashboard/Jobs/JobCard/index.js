import Card from '../../../../components/Card'

const JobCard = ({ job, creator, onClick }) => {
  return (
    <Card className="pt-8 w-full my-4">
      <div className="flex flex-col">
        <div className="flex flex-col w-full ">
          <div className="flex font-semibold text-lg items-center">
            <h4 className=" flex-grow">{job.name}</h4>
            <div className="text-primary-700 text-lg">
              {job.price} CELO
              <span className="text-sm"> Wei</span>
            </div>
          </div>
          <div className="my-4">
            <div className="flex pl-0 p-2 items-center mr-auto">
              <img
                src={`data:image/svg+xml;utf8,${creator.avatar}`}
                className="rounded-full"
                style={{
                  maxWidth: 40,
                }}
              />
              <div className="ml-3 text-secondary-500">{creator.userName}</div>
            </div>
            <p className="my-4 w-2/3">{job.description}</p>
            <div className="flex justify-between">
              <button data-button="btn-primary-700-md " onClick={onClick}>
                Take On
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default JobCard
