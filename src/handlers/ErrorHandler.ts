import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  console.warn(err.message);

  return response.status(500).json({
    success: false,
    error: 'Internal server error.',
  });
};

export default errorHandler;
