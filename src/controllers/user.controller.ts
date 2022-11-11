import { Request, Response } from "express";

import {
  listUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
  userLoginService,
} from "../services/user.service";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, isAdm } = req.body;

  const newUser = await createUserService({ name, email, password, isAdm });

  return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const id = req.params.id;

  const isAdm = req.user.isAdm;
  const requesterAccountId = req.user.id;

  const updatedUser = await updateUserService(requesterAccountId, id, isAdm, {
    name,
    email,
    password,
  });

  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;

  await deleteUserService(id);

  return res.status(204).json();
};

const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await userLoginService({ email, password });

  return res.status(200).json({ token });
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
  userLoginController,
};
