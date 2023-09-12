import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";

class RequestValidationMiddleware {

    ValidationRequest(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req).array();

        if (errors.length > 0)
            return res.status(404).json({
                status: 404,
                success: false,
                message: errors[0].msg,
            })
        return next();
    }

}

export {RequestValidationMiddleware};