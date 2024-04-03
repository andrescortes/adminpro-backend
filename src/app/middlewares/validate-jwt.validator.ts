import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from "../models";


const validateJwt = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token in the request'
        });
    }

    try {
        const { uid, name } = jwt.verify(token, config().parsed?.JWT_SECRET as string) as { uid: string, name: string };
        (req as any).props = { uid, name };
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
    next();
}


const validateAdminRole = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
        const { uid } = (req as any)?.props as { uid: string };
        const userDb = await User.findById(uid);
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        if (userDb.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'User not authorized'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
            error
        });
    }
}

const validateAdminRoleOrSameUser = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
        const { uid } = (req as any)?.props as { uid: string };
        const id = req.params.id;
        const userDb = await User.findById(uid);
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        if (userDb.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'User not authorized'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
            error
        });
    }
}

export {
    validateJwt,
    validateAdminRole,
    validateAdminRoleOrSameUser
}