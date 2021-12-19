const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, '../contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')
const contract = 'Inbox.sol'

const input = {
  language: 'Solidity',
  sources: {
    [contract]: {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[contract].Inbox
