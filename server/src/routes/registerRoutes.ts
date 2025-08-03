import express, { Application, Router } from 'express';
import { Route } from './Route';


export const registerRoutes = (app: Application, routes: Route[]): void => {
  const router: Router = express.Router();
  routes.forEach((route: Route) => route.registerRoute(router));
  app.use(router);
};