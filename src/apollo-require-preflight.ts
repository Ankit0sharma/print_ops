import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CSRFProtectionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set headers to prevent CSRF issues
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('x-apollo-operation-name', 'YourOperationName');  // replace with your operation name
    res.setHeader('apollo-require-preflight', 'true');
    next();
  }
}
