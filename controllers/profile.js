import Users from "../models/Users.js";
import Tasks from "../models/Tasks.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const updateProfile = async (req, res) => {
    try {        
        let {
            name,
            oldPassword,
            newPassword,
        } = req.body;
        const filter = { _id: req.body._id };
        if(newPassword == ''){
            delete req.body._id;
            let updatedUser = await Users.findOneAndUpdate(filter , req.body , { new: true });
            var updatedUserObj = updatedUser.toObject();
            delete updatedUserObj.password;
            
            res.status(201).json({
                user: updatedUserObj,
                msg: "Name updated successfully"
            });
        }
        else
        {
            const user = await Users.findById(req.body._id);
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if(isMatch)
            {
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(newPassword, salt);
                let updatedUser = await Users.findOneAndUpdate( filter , {
                    "password" : passwordHash,
                    ...(( name == '') ? {"name" : name } : {})
                },{ new: true });
                var updatedUserObj = updatedUser.toObject();
                delete updatedUserObj.password;
                res.status(201).json({
                    user: updatedUserObj,
                    msg: (name == '') ? 'Password updated successfully' : "Details updated successfully"
                });
            }
            else{
                res.status(401).json({error: "Old Password is incorrect" });
            }
        }    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};