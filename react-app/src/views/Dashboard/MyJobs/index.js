import { useEffect, useState } from 'react'
import MyJobCard from './MyJobCard'
import FeatherIcon from 'feather-icons-react'
import { format } from 'friendly-numbers'
import celoImage from './celo.png'
import { db, useAuth } from '../../../context'
import Web3 from 'web3'
import getGoldToken from './getGoldToken'

const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const MyJobs = () => {
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
        {myJobs.map((job) => {
          return <MyJobCard job={job} />
        })}
      </div>
    </div>
  )
}

export default MyJobs
