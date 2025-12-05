import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import prisma from '../lib/prisma';


export class AppRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const userRepository = new UserRepository(prisma);
    
    const authService = new AuthService(userRepository);
    const userService = new UserService(userRepository);
    
    const authController = new AuthController(authService);
    const userController = new UserController(userService);
    
    const authRoutes = new AuthRoutes(authController);
    const userRoutes = new UserRoutes(userController);
    
    this.router.use('/auth', authRoutes.router);
    this.router.use('/user', userRoutes.router);
    
    this.router.get('/health', (req, res) => {
      res.json({ status: 'OK', message: 'Server is running' });
    });
  }
}