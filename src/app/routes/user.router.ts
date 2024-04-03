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
    validateAdminRole,
    validateAdminRoleOrSameUser,
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
        validateAdminRole,
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
        validateAdminRoleOrSameUser,
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
        check("role", "Role is required").not().isEmpty(),
        validateFields
    ],
    updateUser
);

router.delete(
    "/:id",
    [
        validateJwt,
        validateAdminRole
    ],
    deleteUser
);


export { router as userRouter };
