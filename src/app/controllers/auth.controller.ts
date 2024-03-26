import { Request, Response } from 'express';
import { ILogin } from '../interfaces';
import { User } from '../models';
import bcrypt from 'bcryptjs';
import { generateJWT, verifyToken } from '../helpers';

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as ILogin;

    try {
        const userDb = await User.findOne({ email });
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDb.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        const token = await generateJWT(userDb.id, userDb.name);

        res.status(200).json({
            ok: true,
            token,
            user: userDb
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const googleSignin = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body as { token: string };

    try {
        const { name, email, picture } = await verifyToken(token);
        const user = await User.findOne({ email });
        let userDb = null;
        if (!user) {
            userDb = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            userDb = user;
            userDb.google = true;
            userDb.img = picture;
            // userDb.password = '@@@';
        }
        await userDb.save();

        const tokenUser = await generateJWT(userDb.id, userDb.name);

        res.status(200).json({
            ok: true,
            token: tokenUser,
            user: userDb
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
            error: error?.message
        });
    }
}

const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { uid, name } = (req as any)?.props as { uid: string, name: string };
    try {
        const tokenUser = await generateJWT(uid, name);
        const user = await User.findById(uid);
        if (!user) {
            res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        res.status(200).json({
            ok: true,
            token: tokenUser,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

export {
    login,
    googleSignin,
    refreshToken
};