/*
 Route: /api/todos/:search
*/
import { Router } from 'express';
import { getDocument, getTodo } from '../controllers';
import { validateJwt } from '../middlewares';

const router = Router();

router.get("/:search", validateJwt, getTodo);
router.get("/collections/:collection/:search", validateJwt, getDocument);

export { router as todoRouter };