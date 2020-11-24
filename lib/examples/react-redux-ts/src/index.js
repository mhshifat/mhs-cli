"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_router_dom_1 = require("react-router-dom");
var providers_1 = __importDefault(require("./providers"));
var routes_1 = __importDefault(require("./routes"));
var root = (<react_router_dom_1.BrowserRouter>
    <providers_1.default>
      <routes_1.default />
    </providers_1.default>
  </react_router_dom_1.BrowserRouter>);
react_dom_1.default.render(root, document.getElementById("root"));
