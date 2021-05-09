import Modal from 'react-modal'
import Card from '../../../components/Card'
import { useEffect, useState } from 'react'
import MyJobCard from './MyJobCard'
import FeatherIcon from 'feather-icons-react'
import { format } from 'friendly-numbers'
import celoImage from './celo.png'
import { db, useAuth } from '../../../context'
import Web3 from 'web3'
import getGoldToken from './getGoldToken'
import { Player } from '@lottiefiles/react-lottie-player'

const web3 = new Web3('https://alfajores-forno.celo-testnet.org')

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

const MyJobs = () => {
  const [showModal, setShowModal] = useState('')
  Modal.setAppElement('#root')
  const [{ myJobs, currentBalance }, setState] = useState({
    myJobs: [],
    currentBalance: '0',
  })
  const { currentUser } = useAuth()

  let celoSecretKey = window.localStorage.getItem('celoSecretKey')

  if (!celoSecretKey) {
    celoSecretKey = prompt(
      'enter private key for celo (leave empty to restore from localstorage)',
    )
  }
  if (celoSecretKey) {
    window.localStorage.setItem('celoSecretKey', celoSecretKey)
  }

  const account = web3.eth.accounts.privateKeyToAccount(celoSecretKey)

  useEffect(() => {
    db.collection('job')
      .where('creator', '==', currentUser.uid)
      .get()
      .then(async (querySnapshot) => {
        const jobDocs = []
        querySnapshot.forEach((doc) => {
          jobDocs.push({
            ...doc.data(),
            id: doc.id,
          })
        })

        const goldtoken = await getGoldToken()
        const balance = await goldtoken.balanceOf(account.address)
        setState({ myJobs: jobDocs, currentBalance: balance.toString() })
      })
  }, [account.address, currentUser.uid])

  return (
    <div className="container m-4 ">
      <div className="flex text-lg text-secondary-100 items-center my-4 justify-between">
        <div className="flex">
          <img src={celoImage} className="mr-2" style={{ width: 30 }} />
          <div className="flex">
            {account.address}{' '}
            <FeatherIcon
              icon="copy"
              className="ml-3"
              onClick={() => {
                navigator.clipboard.writeText(account.address)
              }}
            />
          </div>
        </div>
        <div>Remaining CELO Wei: {format(currentBalance)}</div>
      </div>
      <div className="grid lg:grid-cols-2 place-items-start gap-6">
        {[
          ...myJobs,
          {
            // adding this demo job to simulate scenario of currently processing job
            creator: currentUser.uid,
            name: 'Reverse this BCRYPT hash for me',
            status: 'processing',
            price: 20000000,
            id: 'asdadsadsa',
          },
        ].map((job) => {
          return (
            <MyJobCard
              job={job}
              showModal={(newBalanceDetails) => {
                setShowModal(newBalanceDetails)
              }}
            />
          )
        })}
      </div>
      <Modal
        isOpen={showModal !== ''}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Card className="text-center">
          <div className="flex justify-end">
            <button onClick={() => setShowModal('')}>
              <FeatherIcon className="m-3" icon="x" />
            </button>
          </div>
          <Player
            autoplay
            // loop={processing === 'yes'}
            keepLastFrame
            src={'https://assets3.lottiefiles.com/packages/lf20_wkebwzpz.json'}
            style={{ height: '300px', width: '300px' }}
          />

          <h2 className="text-3xl font-semibold">Payment Success</h2>
          <h4 className=" mt-4">{showModal}</h4>
        </Card>
      </Modal>
    </div>
  )
}

export default MyJobs
