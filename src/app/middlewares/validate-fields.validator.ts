import { Response, Request, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    next();
};

export { validateFields };