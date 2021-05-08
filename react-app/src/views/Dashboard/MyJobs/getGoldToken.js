import Web3 from 'web3'
import * as ContractKit from '@celo/contractkit'
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

const getGoldToken = async () => {
  return await kit.contracts.getGoldToken()
}

export default getGoldToken
