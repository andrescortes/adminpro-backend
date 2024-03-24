import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { config } from "dotenv";

const client = new OAuth2Client();

const verifyToken = async (token: string): Promise<TokenPayload> => {
    const appSecret = config().parsed?.GOOGLE_ID;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: appSecret
    });
    const payload = ticket.getPayload();
    if (!payload) {
        throw new Error('Invalid token');
    }
    return payload;
}

export {
    verifyToken
};