const path = require('path');
const fs = require('fs');
const solc = require('solc');

const CONTRACT_COUNT = 1;

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

console.info('Compiling ...');
let contractsObj = null;
try {
  contractsObj = solc.compile(source, CONTRACT_COUNT);
  console.info('Success!');
} catch (error) {
  console.info('Error!');
}
module.exports = contractsObj ? contractsObj.contracts[":Inbox"] : contractsObj;
