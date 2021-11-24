const web3 = require('./web3')

const subscribedEvents = {}

const subscribeLogEvent = (eventName) => {
  const subscription = web3.eth.subscribe('logs', {
    fromBlock: '0x0',
    toBlock: 'latest',   
    address: '0x92c1cce3d02fce1b813824f77046d597980285e3',
    topics: ['0x187688f6f8bbd0d48b66ed106a5d61d42f9b889d36a5bfe0ecdd056b139ebd8b']
  }, (error, result) => {
      if (!error) {
        console.log(`New ${eventName}!`, result)
      }


  })

  subscribedEvents[eventName] = subscription

  console.log(`subscribed to event '${eventName}' of contract 0x92c1cce3d02fce1b813824f77046d597980285e3 `)

}

const unsubscribeEvent = (eventName) => {
    subscribedEvents[eventName].unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });
}

module.exports = {
  subscribeLogEvent,
  unsubscribeEvent
}