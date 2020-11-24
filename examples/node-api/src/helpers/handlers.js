import { env } from "../config";

export const catchAsyncHandler = (fn) => {
  return (_, __, next) => fn().catch((err) => next(err));
};

export const notFoundHandler = (req, res, next) => {
  const error = new Error("Not Found!");
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
