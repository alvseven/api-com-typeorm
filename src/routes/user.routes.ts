import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/user.controller";

import UserHasAuthorizationMiddleware from "../middlewares/userHasAuthorization.middleware";
import VerifyUserUpdateBadRequestMiddleware from "../middlewares/verifyUserBadRequest.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdmin.middleware";

const userRoutes = Router();

userRoutes.get(
  "",
  UserHasAuthorizationMiddleware,
  verifyUserIsAdmMiddleware,
  listUsersController
);

userRoutes.post("", createUserController);

userRoutes.patch(
  "/:id",
  UserHasAuthorizationMiddleware,
  VerifyUserUpdateBadRequestMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  UserHasAuthorizationMiddleware,
  verifyUserIsAdmMiddleware,
  deleteUserController
);

export default userRoutes;
