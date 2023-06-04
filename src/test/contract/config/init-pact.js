const {Pact} = require('@pact-foundation/pact')
const path = require('path')

const consumerName = 'ShoppingListFront'
const providerName = 'ShoppingListBack'

const provider = new Pact({
  consumer: consumerName,
  provider: providerName,
  port: 8091,
  cors: true,
  log: path.resolve(process.cwd(), './src/test/contract/logs', `${consumerName}-${providerName}.log`),
  dir: path.resolve(process.cwd(), './src/test/contract/pacts'),
  pactfileWriteMode: 'merge'
})

module.exports = provider
