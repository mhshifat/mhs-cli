"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = exports.notFoundHandler = exports.catchAsyncHandler = void 0;
var config_1 = require("../config");
var catchAsyncHandler = function (fn) {
    return function (_, __, next) { return fn().catch(function (err) { return next(err); }); };
};
exports.catchAsyncHandler = catchAsyncHandler;
var notFoundHandler = function (req, res, next) {
    var error = new Error("Not Found!");
    error.status = 404;
    next(error);
};
exports.notFoundHandler = notFoundHandler;
var errHandler = function (err, req, res, next) {
    res.status(err.status || 500).json({
        success: false,
        error: __assign({ message: err.message }, (!config_1.env.inProd ? { stack: err.stack } : {})),
    });
};
exports.errHandler = errHandler;
