import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from './ErrorHandler';

export function ErrorMiddleware(
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;

  err.message = err.message || 'Internal Server error';

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}
