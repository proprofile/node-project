import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { VandorLoginInputs } from "../dto";
import { GenerateSignature, ValidationPassword } from "../utility";
import { FindVandor } from "./AdminController";

export const VandorLogin = async ( req: Request, res: Response, next: NextFunction ) => {
  const { email, password } = <VandorLoginInputs>req.body;
  const existingVandor = await FindVandor("", email);

  if (existingVandor !== null) {
    //validation and get access
    const validation = await ValidationPassword(password,existingVandor.password, existingVandor.salt);
    if(validation) {
        const signature = GenerateSignature({
            _id: existingVandor.id,
            email: existingVandor.email,
            foodType: existingVandor.foodType,
            name: existingVandor.name
        })
        return res.json(signature);
        return res.json(existingVandor);
    }else {
        return res.json({ "message": "Password is not valid" });
    }
  }
  return res.json({ "message": "Login credential not valid" });
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user) {
        const existingVandor = await FindVandor(user._id);
        return res.json(existingVandor);
    }
    return res.json({"message":"Vandor information not found"});
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
     
}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
     
}
