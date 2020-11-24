"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var env = process.env;
exports.default = {
    port: env.PORT || "5000",
    apiPrefix: env.API_PREFIX || "/",
    inProd: env.NODE_ENV === "production",
    db: {
        uri: env.MONGODB_URI || "mongodb://shifat:shifat1@ds121295.mlab.com:21295/mhs",
    },
};
