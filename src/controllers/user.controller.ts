import { Response } from 'express';
import { UserService } from '../services/user.service';
import { ResponseUtil } from '../utils/response.util';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ICreateUserDto, IUpdateUserDto } from '../types';

export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.userService.getAllUsers(page, limit);
      return ResponseUtil.success(res, result.data, 'Users retrieved successfully',200,result.pagination);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve users';
      return ResponseUtil.error(res, message);
    }
  };

  getUserById = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const result = await this.userService.getUserById(req.params.id);
      return ResponseUtil.success(res, result, 'User retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve user';
      const statusCode = message === 'User not found' ? 404 : 500;
      return ResponseUtil.error(res, message, statusCode);
    }
  };

  createUser = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const data: ICreateUserDto = req.body;
      const result = await this.userService.createUser(data);
      return ResponseUtil.success(res, result, 'User created successfully', 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create user';
      return ResponseUtil.error(res, message, 400);
    }
  };

  updateUser = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const data: IUpdateUserDto = req.body;
      const result = await this.userService.updateUser(req.params.id, data);
      return ResponseUtil.success(res, result, 'User updated successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update user';
      const statusCode = message === 'User not found' ? 404 : 400;
      return ResponseUtil.error(res, message, statusCode);
    }
  };

  deleteUser = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      await this.userService.deleteUser(req.params.id);
      return ResponseUtil.success(res, null, 'User deleted successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete user';
      const statusCode = message === 'User not found' ? 404 : 500;
      return ResponseUtil.error(res, message, statusCode);
    }
  };
}