import { GraphQLServer } from "graphql-yoga";
import { connectToDb, env, serverConfig } from "./config";
import { resolvers, typeDefs } from "./graphql";
import { contextHandler } from "./handlers/index";

const server = new GraphQLServer({
  resolvers,
  typeDefs,
  context: contextHandler,
});

connectToDb()
  .then(() => {
    console.log("🚀 Database connected!");
    return server.start(serverConfig);
  })
  .then(() => {
    console.log(`🚀 The server is running on ${env.port}!`);
  })
  .catch(console.error);
