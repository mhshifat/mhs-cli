import { NextFunction } from "express";
import { env } from "../config";

export const catchAsyncHandler = (fn: Function) => {
  return (_, __, next: NextFunction) => fn().catch((err) => next(err));
};

export const notFoundHandler = (req, res, next) => {
  const error: any = new Error("Not Found!");
  error.status = 404;
  next(error);
};

export const errHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message,
      ...(!env.inProd ? { stack: err.stack } : {}),
    },
  });
};
