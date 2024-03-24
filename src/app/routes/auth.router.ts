
/*
 Route: /api/login
*/
import { Router } from 'express';
import { check } from 'express-validator';

import {
    googleSignin,
    login,
    refreshToken
} from '../controllers';
import { validateFields, validateJwt } from '../middlewares';

const router = Router();


router.post(
    "/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        validateFields
    ],
    login
);


router.post(
    "/google",
    [
        check("token", "Token is required").notEmpty(),
        validateFields
    ],
    googleSignin
);

router.get(
    "/refresh",
    validateJwt,
    refreshToken
);

export { router as authRouter };