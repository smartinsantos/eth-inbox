const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

let accounts = null;
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
});

describe('Inbox contract', () => {
  it('deploys the contract', () => {
    console.log("accounts => ", accounts)
  })
});
