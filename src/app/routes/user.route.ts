/*
 Route: /api/users
*/
import { Router } from 'express';
import { check } from 'express-validator';
import {
    getUsers,
    createUser,
    updateUser
} from '../controllers/user.controller';
import { validateFields } from '../middlewares/users/validate-field';


const router = Router();

router.get("/", getUsers);
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
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("role", "Role is required").not().isEmpty(),
    validateFields
    ],
    updateUser
);


export { router as userRouter };
