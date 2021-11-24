const rlp = require('rlp')
const {web3,ethTx} =  require('./web3')

function buildTransaction(txnCount,gasLimit,addressTo,valueInEther,customData){
    const data = web3.utils.toHex(customData)

    // Create the transaction object
    //console.log("outgoing data:",web3.utils.toHex(customData)) 
    return txObject = {
        nonce: web3.utils.toHex(txnCount),
        gasPrice: web3.utils.toHex(0),
        gasLimit: web3.utils.toHex(gasLimit),
        to: addressTo,
        value: web3.utils.toHex(web3.utils.toWei("0", 'ether')),
        data
    };
}

function buildSmartContractTransaction(txnCount,contractData){
    const data = web3.utils.toHex(contractData)

    // Create the transaction object
    //console.log("outgoing data:",web3.utils.toHex(customData)) 
    return txObject = {
        nonce: web3.utils.toHex(txnCount),
        gasPrice: web3.utils.toHex(0),
        gasLimit: web3.utils.toHex(1000000),
        data
    }
}

const sendTransaction= async(txObject,privKey)=>{
    console.log('sending data...:'+txObject)
    console.log('nonce:'+txObject.nonce)
    console.log('gasPrice:'+txObject.gasPrice)
    console.log('gasLimit:'+txObject.gasLimit)
    console.log('to:'+txObject.to)
    console.log('value:'+txObject.value)
    console.log('data:'+txObject.data)

    const privateKey = Buffer.from(
        privKey,
        'hex',
      )

    const tx = new ethTx(txObject)
    console.log(tx.serialize())
    console.log(">>>",tx.hash(false))
    console.log("raw",tx.raw)
    items = tx.raw.slice(0, 6)
    console.log("items",items)

    console.log(rlp.encode(items));
    
    tx.sign(privateKey)
    const serializedTx = tx.serialize()
    const rawTxHex = '0x' + serializedTx.toString('hex')
    console.log("rawTx:"+rawTxHex)
    
    const receipt = await web3.eth.sendSignedTransaction(rawTxHex)
    console.log("receipt:",receipt)
    return receipt
}

const getData = async(blockNumber)=>{
    const block = await web3.eth.getBlock(blockNumber)
    //console.log(block)
    await getTransaction(block.transactions[0])
}

const getTransaction = async txHash => {
    console.log("Retrieving transaction from Pantheon...")
    const receivedTX = await web3.eth.getTransaction(txHash)
    return receivedTX
}

const deploySmartContract = async(contractData,addressFrom,privKey) => {
    try{
        const txCount = await web3.eth.getTransactionCount(addressFrom)
        const txObject = buildSmartContractTransaction(txCount,contractData)
        const receipt = await sendTransaction(txObject,privKey)
        //Retriveing contract address and transaction hash
        console.log("Transaction hash: ", receipt.transactionHash)
        console.log("Contract address", receipt.contractAddress)
        //await create(`block-${receipt.blockNumber}-received-smart-contract-tx`, JSON.stringify(receipt))
        //console.log(`Contract address saved in path: \
        // ./.data/block-${receipt.blockNumber}-received-smart-contract-tx.txt`)
        return receipt.contractAddress
    }catch(e){
        console.log(e)
        process.exit()
    }
}

module.exports = {
    buildTransaction,
    buildSmartContractTransaction,
    sendTransaction,getData,
    getTransaction,
    deploySmartContract
}
