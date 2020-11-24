"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@apollo/client");
var ws_1 = require("@apollo/client/link/ws");
var utilities_1 = require("@apollo/client/utilities");
var httpLink = new client_1.HttpLink({
    uri: "http://localhost:3000/",
});
var wsLink = new ws_1.WebSocketLink({
    uri: "ws://localhost:5000/",
    options: {
        reconnect: true,
    },
});
var splitLink = client_1.split(function (_a) {
    var query = _a.query;
    var definition = utilities_1.getMainDefinition(query);
    return (definition.kind === "OperationDefinition" &&
        definition.operation === "subscription");
}, wsLink, httpLink);
var graphqlClient = new client_1.ApolloClient({
    cache: new client_1.InMemoryCache(),
    link: splitLink,
});
exports.default = graphqlClient;
