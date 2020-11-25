import env from "./env";

const serverConfig = {
  port: env.port,
  playground: !env.inProd ? env.playground : false,
  cors: {
    origin: env.cors.origin,
  },
};

export default serverConfig;
