const models = require('./models/index');
const resolvers = require('./resolvers');
const gqlLoader = require('./utils/gqlLoader');
const {verifyToken} = require('./utils/tokenmanagement')
module.exports = {
  typeDefs: [gqlLoader('types.graphql'), gqlLoader('app.graphql')],
  resolvers,
  context: async ({request}) => {
    const id= await verifyToken(request.headers.authorization);
    return {
    carId: id,
    agencyId: id,
    userId: id,
    models: {
      ...models,
    },
  }
  },
};
