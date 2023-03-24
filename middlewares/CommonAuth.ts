import { ValidateSignature } from "../utility";
import { AuthPaload } from "../dto/Auth.dto";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request{
            user?: AuthPaload
        }
    }
}

export const Authenticate = async (req: Request, Res: Response, next: NextFunction) => {
        const validate = await ValidateSignature(req);
        if(validate){
            next()
        }
}

