import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

export class JwtUtil {
  private static readonly SECRET = process.env.JWT_SECRET || 'default-secret';
  private static readonly EXPIRES_IN = '7d';

  static sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: this.EXPIRES_IN });
  }

  static verify(token: string): JwtPayload {
    return jwt.verify(token, this.SECRET) as JwtPayload;
  }
}