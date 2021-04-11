import { Request, Response, NextFunction } from "express";
import { ResUser } from "../types/User";
import db from "../models";
const User = db.User;

const checkRole = (roles: string[]) => {
  return async (req: ResUser, res: Response, next: NextFunction) => {
    const id = req.userId;

    const userCB = await User.findByPk({ id, include: "Role" });
    if (!userCB) {
      return res.status(400).json({ message: "Can't Check Role" });
    }

    if (roles.indexOf(userCB.roles) > -1) next();
    else return res.status(401).json({ message: "UnAuthorization" });
  };
};

export { checkRole };
