"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var store_1 = __importDefault(require("../store"));
var Providers = function (_a) {
    var children = _a.children;
    return <react_redux_1.Provider store={store_1.default}>{children}</react_redux_1.Provider>;
};
exports.default = Providers;
