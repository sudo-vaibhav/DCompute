import { useEffect, useState } from 'react'
import { useAuth } from '../../../../context'
import Card from '../../../../components/Card'
import FeatherIcon from 'feather-icons-react'
import Loading from './status/Loading'
import Done from './status/Done'
import Added from './status/Added'
import { db } from '../../../../context'
import * as ContractKit from '@celo/contractkit'
import Web3 from 'web3'
import getGoldToken from '../getGoldToken'
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

const MyJobCard = ({ job }) => {
  const statusColorMap = {
    done: '#299234',
    processing: '#D29C0E',
    added: '#537AE0',
  }

  const { currentUser } = useAuth()
  const [{ clicked, recepient }, setState] = useState({
    clicked: false,
    recepient: null,
  })

  useEffect(() => {
    db.collection('user')
      .where('uid', '==', job.creator)
      .get()
      .then((querySnapshot) => {
        let creatorDoc
        querySnapshot.forEach((doc) => {
          creatorDoc = {
            ...doc.data(),
            id: doc.id,
          }
        })
        setState({
          clicked,
          recepient: creatorDoc,
        })
      })
  }, [currentUser.uid, job.creator])

  return (
    <Card className="pt-8 w-full">
      <div className="flex flex-col">
        <div className="flex w-full justify-between items-center">
          <h4 className="font-semibold text-lg">{job.name}</h4>
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
                  overflowY: clicked ? 'auto' : 'hidden',
                }}
                className="bg-dark-900 text-light-100 p-8 my-4 rounded-lg relative"
              >
                {/* Overlay */}
                {job.status === 'done' && (
                  <div
                    className="absolute top-0 left-0 right-0 h-full z-10 grid place-items-center text-xl"
                    style={{
                      background: 'rgba(0,0,0,0.9)',
                      opacity: clicked ? 0 : 1,
                      pointerEvents: clicked ? 'none' : 'auto',
                      // pointer,
                    }}
                    onClick={async () => {
                      const secretKey = window.localStorage.getItem(
                        'celoSecretKey',
                      )
                      try {
                        const account = web3.eth.accounts.privateKeyToAccount(
                          secretKey,
                        )

                        kit.connection.addAccount(account.privateKey)

                        // 12. Specify recipient Address
                        let recepientAddress = recepient.celoAddress

                        // 13. Specify an amount to send
                        let amount = job.price
                        // 14. Get the token contract wrappers
                        let goldtoken = getGoldToken()
                        // await kit.contracts.getGoldToken()

                        // 15. Transfer CELO and cUSD from your account to anAddress
                        let celotx = await goldtoken
                          .transfer(recepientAddress, amount)
                          .send({ from: account.address })

                        // 16. Wait for the transactions to be processed
                        let celoReceipt = await celotx.waitReceipt()

                        // 17. Print receipts
                        console.log('CELO Transaction receipt: %o', celoReceipt)

                        // 18. Get your new balances
                        let celoBalance = await goldtoken.balanceOf(
                          account.address,
                        )

                        // 19. Print new balances
                        console.log(
                          `Your new account CELO balance: ${celoBalance.toString()}`,
                        )

                        console.log(account)
                        setState({
                          recepient,
                          clicked: true,
                        })
                      } catch (err) {
                        alert('incorrect private key')
                      }
                    }}
                  >
                    Click here to pay and view output
                  </div>
                )}
                <>
                  <button
                    className="absolute top-0 right-0 m-8"
                    onClick={() => {
                      navigator.clipboard.writeText(job.logs)
                    }}
                  >
                    <FeatherIcon icon="copy" />
                  </button>
                  <code>
                    job request received ✓ <br />
                    job deployed ✓ <br />
                    {job.status === 'processing' || job.status === 'done' ? (
                      <>
                        running WASM binary ... <br />
                      </>
                    ) : null}
                    {job.status === 'done' && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: job.logs.replaceAll('\n', '<br/>'),
                        }}
                      />
                    )}
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
