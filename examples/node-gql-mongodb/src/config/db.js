import env from "./env";

const { connect } = require("mongoose");

export default function (url) {
  return connect(url || env.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
