"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __importDefault(require("./env"));
function default_1(url) {
    return require("mongoose")
        .connect(url || env_1.default.db.uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
        .catch(function (err) {
        console.error("DB ERROR: " + err.message);
        process.exit(1);
    });
}
exports.default = default_1;
