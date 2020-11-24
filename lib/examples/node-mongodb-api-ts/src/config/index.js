"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.connectToDb = void 0;
var db_1 = require("./db");
Object.defineProperty(exports, "connectToDb", { enumerable: true, get: function () { return __importDefault(db_1).default; } });
var env_1 = require("./env");
Object.defineProperty(exports, "env", { enumerable: true, get: function () { return __importDefault(env_1).default; } });
