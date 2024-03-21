import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


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

export {
    validateJwt
}