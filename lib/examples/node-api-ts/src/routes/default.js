"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var defaultRoutes = express_1.default.Router();
defaultRoutes.get("/", controllers_1.DefaultController.rootRoute);
exports.default = defaultRoutes;