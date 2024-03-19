import { Response, Request } from "express";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";


const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({}, "name email role google");
  res.status(200).json({
    ok: true,
    users,
  });
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IUser;
  const existEmail = await User.findOne({ email });
  try {
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "The email already exists",
      });
    }
    const newUser = new User(
      {
        name,
        email,
        password,
      }
    )
    await newUser.save();
    console.log(newUser);
    res.status(201).json({
      ok: true,
      user: newUser,
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: error[ "message" ] ?? 'Something went wrong',
    });
  }
};

export { getUsers, createUser };
