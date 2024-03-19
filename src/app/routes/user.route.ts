/*
 Route: /api/users
*/

import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

export { router as userRouter };