import { Request, Response, NextFunction } from "express";

const verifyUserIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;
  if (!isAdm) {
    return res.status(403).json({ message: "User must be admin" });
  }

  next();
};

export default verifyUserIsAdmMiddleware;
