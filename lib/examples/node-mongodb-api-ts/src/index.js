"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var config_1 = require("./config");
var handlers_1 = require("./helpers/handlers");
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(morgan_1.default("tiny"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(config_1.env.apiPrefix, routes_1.default);
app.use(handlers_1.notFoundHandler);
app.use(handlers_1.errHandler);
config_1.connectToDb().then(function () {
    console.log("🚀 Database connected!");
    return app.listen(config_1.env.port, function () {
        console.log("\uD83D\uDE80 The server is running on " + config_1.env.port + "!");
    });
});
