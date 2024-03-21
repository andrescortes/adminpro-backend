import { Request, Response } from 'express';
import { ILogin } from '../interfaces';
import { User } from '../models';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers';

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
            uid: userDb.id,
            name: userDb.name,
            token
        })
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
};