import Modal from 'react-modal'
import FeatherIcon from 'feather-icons-react'
import processingLotte from './processing.json'
import tick from './tick.json'
import { useEffect, useState } from 'react'
import { db, useAuth } from '../../../context'
import JobCard from './JobCard'
import { Player } from '@lottiefiles/react-lottie-player'
import Card from '../../../components/Card'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: 'var(--color-secondary-700)',
    border: 'none',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
}

const Jobs = () => {
  const [{ jobs, users, processing }, setState] = useState({
    jobs: [],
    users: [],
    processing: 'no',
  })
  const { currentUser } = useAuth()
  const messages = {
    yes: {
      heading: 'Processing 🧠',
      subheading: "Don't close this tab!",
    },
    done: {
      heading: 'Done 🎉',
      subheading: 'Payment will be processed soon!',
    },
    no: {
      heading: 'Not Processing',
      subheading: 'Payment will be processed soon!',
    },
  }
  useEffect(() => {
    db.collection('job')
      .where('status', '==', 'added')
      .get()
      .then((querySnapshot) => {
        const jobDocs = []
        querySnapshot.forEach((doc) => {
          jobDocs.push({ ...doc.data(), id: doc.id })
        })

        db.collection('user')
          .get()
          .then((querySnapshot) => {
            const userDocs = []
            querySnapshot.forEach((doc) => {
              userDocs.push({
                ...doc.data(),
                id: doc.id,
              })
            })
            setState({ users: userDocs, jobs: jobDocs, processing })
          })
      })
  }, [currentUser.uid])

  Modal.setAppElement('#root')
  return (
    <div className="container mx-auto grid lg:grid-cols-2 place-items-start gap-6">
      {jobs
        // .filter((job) => job.creator !== currentUser.uid) // ignoring own jobs
        .map((job, e) => {
          const creator = users.find((user) => user.uid === job.creator)

          return (
            <JobCard
              key={e}
              creator={creator}
              job={job}
              onClick={() => {
                setState({
                  jobs,
                  users,
                  processing: 'yes',
                })

                let startTime, endTime
                let result = ''

                const pre = () => {
                  startTime = new Date()
                  result += `started at ${startTime.toLocaleString()}\n`
                }

                const post = () => {
                  endTime = new Date()
                  result += `finished at ${endTime.toLocaleString()}\n`
                  const diff = endTime - startTime
                  result += `processed in ${diff} milliseconds\n`
                }

                fetch(
                  `https://firebasestorage.googleapis.com/v0/b/dcompute-16d7b.appspot.com/o/${job.fileName}.wasm?alt=media`,
                )
                  .then((response) => response.arrayBuffer())
                  .then((bytes) =>
                    WebAssembly.instantiate(bytes, {
                      index: {},
                      env: {
                        abort(_msg, _file, line, column) {
                          console.error(
                            'abort called at main.ts:' + line + ':' + column,
                          )
                        },
                      },
                    }),
                  )
                  .then(async (obj) => {
                    pre()
                    await db
                      .collection('job')
                      .doc(job.id)
                      .update({ logs: result, status: 'processing' })
                    result +=
                      '=====================\nBEGIN OUTPUT STREAM:\n=====================\n'
                    result += obj.instance.exports.run(...job.inputData)
                    result +=
                      '\n=====================\nEND OF OUTPUT STREAM:\n=====================\n'
                    post()

                    console.log(result)
                    await db.collection('job').doc(job.id).update({
                      logs: result,
                      status: 'done',
                      finisher: currentUser.uid,
                    })

                    setState({
                      jobs,
                      users,
                      processing: 'done',
                    })
                  })
              }}
            />
          )
        })}
      <Modal
        isOpen={processing === 'yes' || processing === 'done'}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Card className="text-center">
          <div className="flex justify-end">
            {processing === 'done' && (
              <button
                onClick={() =>
                  setState({
                    jobs,
                    users,
                    processing: 'no',
                  })
                }
              >
                <FeatherIcon className="m-3" icon="x" />
              </button>
            )}
          </div>
          <Player
            autoplay
            loop={processing === 'yes'}
            keepLastFrame
            src={processing === 'yes' ? processingLotte : tick}
            style={{ height: '300px', width: '300px' }}
          />

          <h2 className="text-3xl font-semibold">
            {messages[processing].heading}
          </h2>
          <h4 className=" mt-4">{messages[processing].subheading}</h4>
        </Card>
      </Modal>
    </div>
  )
}

export default Jobs
