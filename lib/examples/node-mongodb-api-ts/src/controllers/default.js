"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRoute = void 0;
var package_json_1 = __importDefault(require("../../package.json"));
var rootRoute = function (_, res) {
    return res.status(200).json({
        name: package_json_1.default["name"],
        version: package_json_1.default["version"],
        description: package_json_1.default["description"],
    });
};
exports.rootRoute = rootRoute;
