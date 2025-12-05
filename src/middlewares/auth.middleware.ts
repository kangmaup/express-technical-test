import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt.util';
import { ResponseUtil } from '../utils/response.util';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return ResponseUtil.error(res, 'Authorization header is required', 401);
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return ResponseUtil.error(res, 'Token is required', 401);
    }

    const decoded = JwtUtil.verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    return ResponseUtil.error(res, 'Invalid or expired token', 401);
  }
};