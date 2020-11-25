import "dotenv/config";

const env = process.env;

export default {
  port: env.PORT || "5000",
  playground: "/" + (env.GQL_PLAYGROUND || "playground"),
  inProd: env.NODE_ENV === "production",
  cors: {
    origin: env.NODE_ENV === "production" ? env.CORS_ORIGIN || "" : "*",
  },
  db: {
    uri: env.MONGODB_URI || "",
  },
};
