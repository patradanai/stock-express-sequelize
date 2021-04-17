import { Request, Response, NextFunction } from "express";
import { decodeSession } from "../functions/_jwt";
import { ReqUser } from "../types/User";
import User from "../models/User.model";

const isExistUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const reqUser = await User.findOne({ where: { username: username } });
  if (!reqUser) {
    return res.status(400).json({ message: "User exsting" });
  }
  next();
};

const isAuthorization = (req: ReqUser, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  // Check authorization valid
  if (!authorization) {
    return res
      .status(400)
      .json({ message: "Please Check your Token in Header!" });
  }

  // Split Token
  const token = authorization.split(" ");
  if (!token[1]) {
    return res.status(400).json({ message: "Please Check your Token!" });
  }

  // Verify token
  const verifyToken = decodeSession(process.env.SECRET_KEY, token[1]);
  if (!verifyToken) {
    return res.status(401).json({ message: "Expried Token" });
  }

  req.userId = verifyToken?.id;
  next();
};

export { isExistUser, isAuthorization };
