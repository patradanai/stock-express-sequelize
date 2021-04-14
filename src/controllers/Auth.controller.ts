import { Request, Response } from "express";
import db from "../models";
import bcrypt from "bcrypt";
import { encodeSession } from "../functions/_jwt";
import { User } from "../types/User";
const User = db.User;
const Role = db.Role;

const SignIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // Find User in Db
    const userFind = await User.findOne({ where: { username: username } });
    if (!userFind) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const comparedPassword = bcrypt.compareSync(password, userFind.password);
    if (!comparedPassword) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    const jwtGen = encodeSession(process.env.SECRET_KEY, {
      id: userFind.id,
      name: userFind.nicename,
    });

    return res.status(200).json(jwtGen);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const SignUp = async (req: Request, res: Response) => {
  const { username, password, firstname, lastname, email } = req.body;

  try {
    // Find User in Db
    const userFind = await User.findOne({ where: { username: username } });
    if (userFind) {
      return res.status(400).json({ message: "User Existing" });
    }

    // Hashing Password and Create to DB
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userCrate = await User.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      nicename: firstname + lastname,
    });
    if (!userCrate) {
      return res.status(400).json({ message: "Register not Complete" });
    }
    // Setting Role with Special Method ORM
    const roleCB = await Role.findAll({ where: { role: "Customer" } });
    if (roleCB) userCrate.setRoles(roleCB);

    return res.status(201).json({ message: "Register Completed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { SignIn, SignUp };
