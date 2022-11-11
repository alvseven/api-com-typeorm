import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { instanceToPlain } from "class-transformer";

import { userRepository } from "../repositories";

import { AppError } from "../error/appError";

import { IUserLogin, IUserRequest, IUserUpdate } from "../interfaces/users";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const emailAlreadyExists = await userRepository.findOneBy({ email });

  if (emailAlreadyExists) {
    throw new AppError("Email is already registered");
  }

  const newUser = userRepository.create({
    name,
    email,
    isAdm,
    password: bcrypt.hashSync(password, 10),
  });

  await userRepository.save(newUser);

  return instanceToPlain(newUser);
};

const listUsersService = async () => {
  const users = await userRepository.find();

  return instanceToPlain(users);
};

const updateUserService = async (
  requesterAccountId: string,
  accountId: string,
  isAdm: boolean,
  { name, email, password }: IUserUpdate
) => {
  const users = await userRepository.find();

  const accountToUpdate = users.find((user) => user.id === accountId);

  if (!accountToUpdate) {
    throw new AppError("Account not found", 404);
  }
  const requesterAccount = users.find((user) => user.id === requesterAccountId);

  if (!isAdm && accountToUpdate.id !== requesterAccount!.id) {
    throw new AppError(
      "You must be an admin to update an account you don't own"
    );
  }

  const newPassword = password
    ? bcrypt.hashSync(password, 10)
    : accountToUpdate.password;

  await userRepository.update(accountToUpdate.id, {
    name: name,
    email: email,
    password: newPassword,
  });

  return {
    userId: accountToUpdate.id,
    name,
    email,
    isAdm: accountToUpdate.isAdm,
    isActive: accountToUpdate.isActive,
    createdAt: accountToUpdate.createdAt,
    updatedAt: accountToUpdate.updatedAt,
  };
};

const deleteUserService = async (id: string) => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  if (!user.isActive) {
    throw new AppError("User is already inactive", 400);
  }

  await userRepository.update(user.id, { isActive: false });
};

const userLoginService = async ({ email, password }: IUserLogin) => {
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError("Account not found");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError("Incorrect email or password", 403);
  }

  const token = jwt.sign(
    { id: user.id, isAdm: user.isAdm },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export {
  createUserService,
  listUsersService,
  updateUserService,
  deleteUserService,
  userLoginService,
};
