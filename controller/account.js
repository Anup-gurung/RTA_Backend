import e from "express";
import Account from "../model/user";

export const addAccount = async (req, res) => {
    try{
        const{ username, password, role, emailOrPhoneNumber, twoFactorEnabled, deviceManagement} = req.body;

        //check if account already exists
        const existingAccount = await Account.findone({
            where:{emailOrPhoneNumber}
        });
        if(existingAccount){
            return res.status(400).json({message: "Account already exists"});
        }
        //create account
        const account = await Account.create({
            username,
            password,
            role: role || "user",
            emailOrPhoneNumber,
            twoFactorEnabled: twoFactorEnabled || false,
            deviceManagement: deviceManagement || null,
        });
        return res.status(201).json({message: "Account created successfully", user:account});
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "error creating account", error});
    }
}