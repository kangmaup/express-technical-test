import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ResponseUtil } from '../utils/response.util';
import { ICreateUserDto, ILoginDto } from '../types';

export class AuthController {
  constructor(private authService: AuthService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const data: ICreateUserDto = req.body;
      const result = await this.authService.register(data);

      return ResponseUtil.success(
        res,
        result,
        'User registered successfully',
        201
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      return ResponseUtil.error(res, message, 400);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data: ILoginDto = req.body;
      const result = await this.authService.login(data);

      return ResponseUtil.success(res, result, 'Login successful');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Login failed';
      return ResponseUtil.error(res, message, 401);
    }
  }
}