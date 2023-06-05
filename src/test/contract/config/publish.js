const { Publisher } = require('@pact-foundation/pact-core')
const dotenv = require('dotenv')

dotenv.config()

const opts = {
  pactBroker: process.env.PACT_BROKER_BASE_URL_ITEM,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN_ITEM,
  consumerVersion: process.env.npm_package_version,
  pactFilesOrDirs: ['src/test/contract/pacts']
}

new Publisher(opts).publish()
