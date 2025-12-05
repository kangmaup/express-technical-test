import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserValidator } from '../validators/user.validator';
import { handleValidationErrors } from '../middlewares/validation.middleware';

export class UserRoutes {
  public router: Router;

  constructor(private userController: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(authMiddleware);

    this.router.get(
      '/',
      UserValidator.pagination(),
      handleValidationErrors,
      this.userController.getAllUsers
    );

    this.router.get(
      '/:id',
      UserValidator.getUserById(),
      handleValidationErrors,
      this.userController.getUserById
    );

    this.router.post(
      '/',
      UserValidator.createUser(),
      handleValidationErrors,
      this.userController.createUser
    );

    this.router.patch(
      '/:id',
      UserValidator.updateUser(),
      handleValidationErrors,
      this.userController.updateUser
    );

    this.router.delete(
      '/:id',
      UserValidator.deleteUser(),
      handleValidationErrors,
      this.userController.deleteUser
    );
  }
}