import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthValidator } from '../validators/user.validator';
import { handleValidationErrors } from '../middlewares/validation.middleware';

export class AuthRoutes {
  public router: Router;

  constructor(private authController: AuthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/register',
      AuthValidator.register(),
      handleValidationErrors,
      this.authController.register
    );

    this.router.post(
      '/login',
      AuthValidator.login(),
      handleValidationErrors,
      this.authController.login
    );
  }
}