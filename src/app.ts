import express from "express";

import "reflect-metadata";
import "express-async-errors";

import categoriesRoutes from "./routes/categories.routes";
import propertiesRoutes from "./routes/properties.routes";
import schedulesRoutes from "./routes/schedules.routes";
import sessionRoutes from "./routes/session.routes";
import userRoutes from "./routes/user.routes";

import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/login", sessionRoutes);

app.use("/categories", categoriesRoutes);

app.use("/properties", propertiesRoutes);

app.use("/schedules", schedulesRoutes);

app.use(handleErrorMiddleware);

export default app;
