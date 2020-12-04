const { ApolloServer } = require("apollo-server");

const { sequelize } = require("./models");
const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  sequelize
    .authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
});
