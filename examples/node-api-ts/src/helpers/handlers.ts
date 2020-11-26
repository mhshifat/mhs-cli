import { NextFunction, Request, Response } from "express";
import { env } from "../config";

export const catchAsyncHandler = (fn: Function) => {
  return (_: Request, __: Response, next: NextFunction) =>
    fn().catch((err: Error) => next(err));
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: any = new Error("Not Found!");
  error.status = 404;
  next(error);
};

export const errHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message,
      ...(!env.inProd ? { stack: err.stack } : {}),
    },
  });
};
