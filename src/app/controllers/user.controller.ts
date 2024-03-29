import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';

import { IUser } from '../interfaces';
import { User } from '../models';
import { generateJWT } from '../helpers';


const getUsers = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  try {
    const [ total, users ] = await Promise.all([
      User.countDocuments(),
      User.find().skip(Number(from)).limit(Number(limit))
    ]);

    res.status(200).json({
      ok: true,
      total,
      users
    });

  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
      error: error?.message
    })
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IUser;

  try {
    if (!password) {
      return res.status(400).json({
        ok: false,
        msg: "The password is required",
      });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "The email already exists",
      });
    }

    const salt: string = bcrypt.genSaltSync();
    const hashPassword: string = bcrypt.hashSync(password, salt);

    const newUser = new User(
      {
        name,
        email,
        password: hashPassword,
      }
    )
    await newUser.save();
    const token = await generateJWT(newUser.id, newUser.name);
    res.status(201).json({
      ok: true,
      user: newUser,
      token
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: error[ "message" ] ?? 'Something went wrong',
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const uid = req.params.id;
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }

    const { password, google, email, ...fields } = req.body as IUser;
    if (user.email !== email) {
      const existEmailByUser = await User.findOne({ email });
      if (existEmailByUser) {
        return res.status(400).json({
          ok: false,
          msg: "The email already exists",
        });
      }
    }
    let userUpdated;
    if (user.google) {
      userUpdated = await User.findByIdAndUpdate(uid, { ...fields }, { new: true });
    } else {
      userUpdated = await User.findByIdAndUpdate(uid, { ...fields, email }, { new: true });
    }
    res.status(200).json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const uid = req.params.id;
  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }
    // user.status = false;
    // await user.save();
    await User.findByIdAndDelete(uid);
    res.status(200).json({
      ok: true,
      msg: 'User deleted',
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    })
  }
};

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
