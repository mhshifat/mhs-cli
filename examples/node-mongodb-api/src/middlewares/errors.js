import { env } from "../config";

export const notFoundMiddleware = (req, res, next) => {
  const error = new Error(
    `Requested route '${req.originalUrl}' does not exists 😢`
  );
  res.status(404);
  next(error);
};

export const errMiddleware = (err, req, res, next) => {
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
