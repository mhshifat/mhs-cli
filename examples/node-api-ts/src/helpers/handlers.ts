import { NextFunction, Request, Response } from "express";

export const catchAsyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch((err: Error) => next(err));
};
