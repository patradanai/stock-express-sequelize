import { Request, Response } from "express";
import db from "../models";
import bcrypt from "bcrypt";
const User = db.User;
const Role = db.Role;

const SignIn = (req: Request, res: Response) => {};

const SignUp = async (req: Request, res: Response) => {
  const { username, password, fName, lName, email } = req.body;

  // Find User in Db
  const userFind = await User.findOne({ where: { username: username } });
  if (!userFind) {
    return res.status(400).json({ message: "User Existing" });
  }

  // Hashing Password and Create to DB
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userCrate = await User.create({
    fname: fName,
    lname: lName,
    email: email,
    password: hashedPassword,
    nicename: fName + lName,
  });
  if (!userCrate) {
    return res.status(400).json({ message: "Register not Complete" });
  }
  // Setting Role with Special Method ORM
  const roleCB = await Role.findAll({ where: { role: "Customer" } });
  if (roleCB) userCrate.setRoles(roleCB);

  return res.status(201).json({ message: "Register Completed" });
};

export { SignIn, SignUp };
