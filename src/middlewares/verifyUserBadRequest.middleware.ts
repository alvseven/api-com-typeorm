import { Request, Response, NextFunction } from "express";

const VerifyUserUpdateBadRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const verifyBodyRequest = Object.keys(req.body).some(
    (prop) => prop == "id" || prop == "isAdm" || prop == "isActive"
  );
  if (verifyBodyRequest) {
    return res.status(401).json({
      message: "You cannot update these properties: id, isAdm, isActive",
    });
  }

  next();
};

export default VerifyUserUpdateBadRequestMiddleware;
