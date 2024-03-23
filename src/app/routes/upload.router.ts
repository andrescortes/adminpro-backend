/*
 Route: /api/upload/collections/:collection/:id
*/

import { Router } from "express";
import { validateJwt } from "../middlewares";
import { getImage, uploadFile } from "../controllers/upload.controller";
import expressFileUpload from "express-fileupload";


const router = Router();
router.use(expressFileUpload());

router.put("/collections/:collection/:id", validateJwt, uploadFile);
router.get("/collections/:collection/:imageId", validateJwt, getImage);

export { router as uploadRouter }