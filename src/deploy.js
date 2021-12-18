require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const inboxContract = require('./compile')

const { ACCOUNT_MNEMONIC, ACCOUNT_ADDRESS, PROJECT_ENDPOINT } = process.env
const provider = new HDWalletProvider(ACCOUNT_MNEMONIC, PROJECT_ENDPOINT)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts.find(acc => acc === ACCOUNT_ADDRESS)

  console.info('Attempting to deploy from account')
  const result = await new web3.eth.Contract(inboxContract.abi)
    .deploy({
      data: inboxContract.evm.bytecode.object,
      arguments: ['Hi There!']
    })
    .send({ gas: 1000000, from: account })
  console.info('Contract deployed to => ', result.options.address)

  provider.engine.stop()
}
deploy()
