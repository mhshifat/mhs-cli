import { connect } from "mongoose";
import env from "./env";

export default function (url?: string) {
  return connect(url || env.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
