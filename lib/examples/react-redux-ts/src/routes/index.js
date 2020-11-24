"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var routes_1 = require("./routes");
var Routes = function () {
    return (<react_router_dom_1.Switch>
      {routes_1.routes.map(function (route) { return (<react_router_dom_1.Route key={route.path} {...route}/>); })}
    </react_router_dom_1.Switch>);
};
exports.default = Routes;
