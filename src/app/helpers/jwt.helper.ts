import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

const generateJWT = (uid: string, name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            name
        };
        jwt.sign(
            payload,
            config().parsed?.JWT_SECRET as string,
            { expiresIn: '12h' },
            (err, token) => {
                if (err || !token || typeof token !== 'string') {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(token);
                }
            });
    });
}

export {
    generateJWT
};