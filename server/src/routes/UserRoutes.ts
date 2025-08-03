import { UserController } from "../controllers";
import { Route } from "./Route";


export const createUserRoutes = (userController: UserController): Route[] => {
  return [
    new Route("get", "/user/:id", userController.getUserById),
    new Route('get', '/user-info/:id', userController.getUserInfo )
  ];
}

