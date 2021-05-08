import { useEffect, useState } from 'react'
import MyJobCard from './MyJobCard'
import { db, useAuth } from '../../../context'

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([])
  const { currentUser } = useAuth()

  useEffect(() => {
    db.collection('job')
      .where('creator', '==', currentUser.uid)
      .get()
      .then((querySnapshot) => {
        const jobDocs = []
        querySnapshot.forEach((doc) => {
          jobDocs.push({
            ...doc.data(),
            id: doc.id,
          })
        })

        setMyJobs(jobDocs)
      })
  })
  return (
    <div className="container m-4 grid lg:grid-cols-2 place-items-start gap-6">
      {myJobs.map((job) => {
        return <MyJobCard job={job} />
      })}
    </div>
  )
}

export default MyJobs
