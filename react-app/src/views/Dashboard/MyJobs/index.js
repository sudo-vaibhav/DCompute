import MyJobCard from './MyJobCard'

const MyJobs = () => {
  return (
    <div className="container mx-auto my-4 grid lg:grid-cols-2 place-items-start gap-6">
      {[
        {
          status: 'processing',
        },
        {
          status: 'done',
        },
        {
          status: 'deployed',
        },
      ].map((job) => {
        return <MyJobCard job={job} />
      })}
    </div>
  )
}

export default MyJobs
