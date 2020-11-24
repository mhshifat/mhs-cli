import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config";
import { errHandler, notFoundHandler } from "./helpers/handlers";
import routes from "./routes";

const app = express();
const morgan = require("morgan");

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(env.apiPrefix, routes);
app.use(notFoundHandler);
app.use(errHandler);

app.listen(env.port, () => {
  console.log(`🚀 The server is running on ${env.port}!`);
});
