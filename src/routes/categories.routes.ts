import { Router } from "express";

import {
  createCategoryController,
  listCategoriesController,
  listPropertiesByCategoryIdController,
} from "../controllers/categories.controller";

import UserHasAuthorizationMiddleware from "../middlewares/userHasAuthorization.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdmin.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  UserHasAuthorizationMiddleware,
  verifyUserIsAdmMiddleware,
  createCategoryController
);

categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/properties", listPropertiesByCategoryIdController);

export default categoriesRoutes;
