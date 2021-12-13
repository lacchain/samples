const web3 = require('./web3')
const {buildTransaction} = require('./pantheon_utils/web3Operations')
const {sendTransactionAndProcessIncommingTx} = require("./lib/helpers")
const {set} = require('./changeSmartContractState')
let txData = set()  
//const addressFrom = "0x173CF75f0905338597fcd38F5cE13E6840b230e9"
const addressFrom = "0xbcEda2Ba9aF65c18C7992849C312d1Db77cF008E"

const getData = async(addressFrom) => {
    try{
        const txCount = await web3.eth.getTransactionCount(addressFrom)
        console.log(txCount);	
        const valueInEther = "0"
        const gasLimit = "200000"
        const addressTo = "0x6c8ac1D53B99936d1478528906D9B2D1DF1Db973"
        //const privKey = "b3e7374dca5ca90c3899dbb2c978051437fb15534c945bf59df16d6c80be27c0"
        //const privKey = "0E273FFD9CF5214F7D6ADE5D1ABFD6D101B648AF12BC2DE6AC4AFCB4DB805CD3"
        const privKey = "919b7e0e4095ce8a2cb22cea25a4d5888981d29d03cbdc714ed4b5f58313fdc6"
        const txObject = buildTransaction(txCount,gasLimit,addressTo,valueInEther,txData)
        sendTransactionAndProcessIncommingTx(txObject,privKey)
    }catch(e){
        console.log("Error")
        console.log(e)
        process.exit()
    }
}

getData(addressFrom)
