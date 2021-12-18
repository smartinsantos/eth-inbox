const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const inboxContract = require('../src/compile')

const web3 = new Web3(ganache.provider())

const mockMessage = 'Hi There!'
let mockAccounts = null
let mockInbox = null
// eslint-disable-next-line mocha/no-top-level-hooks
beforeEach(async function () {
  // Get a list of all accounts
  mockAccounts = await web3.eth.getAccounts()
  // Use one of those accounts to deploy the contract
  mockInbox = await new web3.eth.Contract(inboxContract.abi)
    .deploy({
      data: inboxContract.evm.bytecode.object,
      arguments: [mockMessage]
    })
    .send({
      from: mockAccounts[0],
      gas: 1000000
    })
})

describe('Inbox contract', function () {
  it('deploys the contract', function () {
    assert.ok(mockInbox.options.address)
  })

  it('has a default message', async function () {
    const message = await mockInbox.methods.getMessage().call()
    assert.equal(message, mockMessage)
  })

  it('can set a message', async function () {
    const newMessage = 'My new message!'
    await mockInbox.methods.setMessage(newMessage).send({ from: mockAccounts[0] })
    const message = await mockInbox.methods.getMessage().call()
    assert.equal(message, newMessage)
  })
})
