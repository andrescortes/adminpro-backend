/*
 Route: /api/hospitals
*/
import { Router } from 'express';
import { check } from 'express-validator';

import {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} from '../controllers';
import {
    validateFields,
    validateJwt
} from '../middlewares';


const router = Router();

router.get(
    "/",
    validateJwt,
    getHospitals
);

router.post(
    "/",
    [
        validateJwt,
        check("name", "Name is required").not().isEmpty(),
        validateFields
    ],
    createHospital
);

router.put(
    "/:id",
    [
        validateJwt,
        check("name", "Name is required").not().isEmpty(),
        validateFields
    ],
    updateHospital
);

router.delete(
    "/:id",
    validateJwt,
    deleteHospital
);


export { router as hospitalRouter };
