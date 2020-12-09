import { NextFunction, Request, Response } from "express";
import { env } from "../config";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(
    `Requested route '${req.originalUrl}' does not exists 😢`
  );
  res.status(404);
  next(error);
};

export const errMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(code).json({
    success: false,
    error: {
      errorCode: code,
      message: err.message,
      ...(!env.inProd ? { stack: err.stack, requestUrl: req.originalUrl } : {}),
    },
  });
};
