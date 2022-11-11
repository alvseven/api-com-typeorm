import { Router } from "express";

import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controller";

import UserHasAuthorizationMiddleware from "../middlewares/userHasAuthorization.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdmin.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  UserHasAuthorizationMiddleware,
  verifyUserIsAdmMiddleware,
  createPropertyController
);

propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;
