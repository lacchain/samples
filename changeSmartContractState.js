const {web3} = require("./pantheon_utils/web3")
// set to 1 for faster validation in this course.
web3.transactionConfirmationBlocks = 1
const sha3 = require("js-sha3").keccak_256

let set

const setRecipientContract = () => { //Set for RelayHub Contract
  console.log("#######################Preparing value for Recipient SmartContract #######################")
  const functionName = "store" //store(uint256)
  const typeOfData = "uint256"
  
  // store(uint256)

  const number = 10
  const nodeAddress = "0xd00e6624a73f88b39f82ab34e8bf2b4d226fd768"
  const expiration = 1636394529

  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  
  let value = web3.eth.abi.encodeParameters(
    ["uint256","address","uint256"],
    [number,nodeAddress,expiration])//setting the value
  const txData = set + value.substr(2)
  console.log("txData:"+txData)
  return txData
}

const chooseSmartContractSetter = () => {
    set = setRecipientContract
}

chooseSmartContractSetter()

//set()
module.exports = {set}
