
/*
 Route: /api/login
*/
import { Router } from 'express';
import { googleSignin, login } from '../controllers';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';

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

export { router as authRouter };