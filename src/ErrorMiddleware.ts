import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { ErrorHandler } from './ErrorHandler';

module.exports = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  err.message = err.message || 'Internal Server error';

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
