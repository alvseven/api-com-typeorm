import { Router } from "express";

import {
  createScheduleController,
  listSchedulesByPropertyIdController,
} from "../controllers/schedules.controller";

import UserHasAuthorizationMiddleware from "../middlewares/userHasAuthorization.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdmin.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  UserHasAuthorizationMiddleware,
  createScheduleController
);

schedulesRoutes.get(
  "/properties/:id",
  UserHasAuthorizationMiddleware,
  verifyUserIsAdmMiddleware,
  listSchedulesByPropertyIdController
);

export default schedulesRoutes;
