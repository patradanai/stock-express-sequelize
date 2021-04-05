import { Request, Response, NextFunction } from "express";
import db from "../models";
const User = db.User;

const isExistUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const resUser = await User.findOne({ username: username });
  if (!resUser) {
    return res.status(400).json({ message: "User exsting" });
  }
  next();
};

const isAuthorization = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export { isExistUser, isAuthorization };
