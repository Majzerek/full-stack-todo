import { Route } from './Route';

import { authenticateToken } from '../middleware/jwt';
import { Handler, Method, Middleware } from '../types';

export class ProtectedRoute extends Route {
    constructor(method: Method, path: string, handler: Handler, protectedAuthMiddleware: Middleware = authenticateToken) {
        super(method, path, handler);
    } 
}
