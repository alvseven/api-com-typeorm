import { Router } from "express";

import { userLoginController } from "../controllers/user.controller";

const sessionRoutes = Router();

sessionRoutes.post("", userLoginController);

export default sessionRoutes;
