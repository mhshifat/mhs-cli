import { Options } from "graphql-yoga";
import env from "./env";

const serverConfig: Options = {
  port: env.port,
  playground: !env.inProd ? env.playground : false,
  cors: {
    origin: env.cors.origin,
  },
};

export default serverConfig;
