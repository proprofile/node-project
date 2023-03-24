import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models/Vandor";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVandor = async(id: string | undefined, email?: string) => {
  if(email){
     return await Vandor.findOne({ email: email })
  }else {
    return await Vandor.findById(id);
  }
}


export const CreateVandor = async ( req: Request, res: Response, next: NextFunction ) => {
  const { name, ownerName, foodType, pincode, address, phone, email, password } = <CreateVandorInput>req.body;

  //const exitstingVandor = await Vandor.findOne({ email: email });
  const exitstingVandor = await FindVandor(undefined, email);
  if(exitstingVandor !== null) { return res.json({"message" : "A vandor is existing with this email ID"}) }

  //generate a salt
  const salt = await GenerateSalt();
  // encrypt the password
  const userPassword = await GeneratePassword(password, salt);

  const createdVandor = await Vandor.create({ name: name, ownerName: ownerName, foodType: foodType, pincode: pincode, address: address, phone: phone, email: email, password: userPassword, salt: salt, serviceAvailable: false, coverImages: [], rating: 0 });
  
  return res.json(createdVandor);

};

export const GetVandors = async (  req: Request,  res: Response,  next: NextFunction ) => {
  const vandors = await Vandor.find();

  if(vandors != null) {
    return res.json(vandors);
  }
  return res.json({"message": "vandors data not avalibale"});

};

export const GetVandorByID = async ( req: Request, res: Response, next: NextFunction ) => {
  const vandorId = req.params.id;
  //const vandor = await Vandor.findById(vandorId); 
  const vandor = await FindVandor(vandorId);

  if(vandor !== null) {
    return res.json(vandor);
  }

  return res.json({ "message": "vandors data not available" });
};
 