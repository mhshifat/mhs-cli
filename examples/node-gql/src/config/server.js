import env from "./env";

export default {
  port: env.port,
  playground: !env.inProd ? env.playground : false,
  cors: {
    origin: env.cors.origin,
  },
};
