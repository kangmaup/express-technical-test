import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../utils/response.util';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  return ResponseUtil.error(res, err.message || 'Internal server error', 500);
};