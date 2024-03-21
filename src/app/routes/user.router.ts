/*
 Route: /api/users
*/
import { Router } from 'express';
import { check } from 'express-validator';

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from '../controllers';
import {
    validateFields,
    validateJwt
} from '../middlewares';


const router = Router();

router.get(
    "/",
    validateJwt,
    getUsers
);

router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        validateFields
    ],
    createUser
);

router.put(
    "/:id",
    [
        validateJwt,
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
        check("role", "Role is required").not().isEmpty(),
        validateFields
    ],
    updateUser
);

router.delete(
    "/:id",
    validateJwt,
    deleteUser
);


export { router as userRouter };
