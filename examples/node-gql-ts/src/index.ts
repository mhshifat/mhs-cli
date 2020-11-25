import { GraphQLServer } from "graphql-yoga";
import { env, serverConfig } from "./config";
import { resolvers, typeDefs } from "./graphql";

const server = new GraphQLServer({
  resolvers,
  typeDefs,
});

server
  .start(serverConfig)
  .then(() => {
    console.log(`🚀 The server is running on ${env.port}`);
  })
  .catch(console.error);
