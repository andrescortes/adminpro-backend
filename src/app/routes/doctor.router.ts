/*
 Route: /api/hospitals
*/
import { Router } from 'express';
import { check } from 'express-validator';

import {
    createDoctor,
    deleteDoctor,
    getDoctors,
    updateDoctor
} from '../controllers';
import {
    validateFields,
    validateJwt
} from '../middlewares';


const router = Router();

router.get(
    "/",
    validateJwt,
    getDoctors
);

router.post(
    "/",
    [
        validateJwt,
        check("name", "Name is required").not().isEmpty(),
        check("hospital", "Hospital id is required").isMongoId(),
        validateFields
    ],
    createDoctor
);

router.put(
    "/:id",
    [
        validateJwt,
        check("name", "Name is required").not().isEmpty(),
        check("img", "Image is required").not().isEmpty(),
        check("user", "User is required").not().isEmpty(),
        validateFields
    ],
    updateDoctor
);

router.delete(
    "/:id",
    validateJwt,
    deleteDoctor
);


export { router as doctorRouter };
