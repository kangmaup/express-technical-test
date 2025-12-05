import express, { Application, Request, Response, NextFunction } from 'express';
import { AppRoutes } from './routes';
import { errorHandler } from './middlewares/error.middleware';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeNotFoundHandler();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    const appRoutes = new AppRoutes();
    this.app.use('/api', appRoutes.router);
  }

  private initializeNotFoundHandler(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
      next(error);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}