"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@apollo/client");
var react_1 = __importDefault(require("react"));
var graphql_1 = __importDefault(require("../graphql"));
var Providers = function (_a) {
    var children = _a.children;
    return <client_1.ApolloProvider client={graphql_1.default}>{children}</client_1.ApolloProvider>;
};
exports.default = Providers;
