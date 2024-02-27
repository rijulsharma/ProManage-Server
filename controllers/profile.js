import Users from "../models/Users.js";
import Tasks from "../models/Tasks.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";




export const updateProfile = async (req, res) => {
    try {
        // const filter = { _id: req.body._id };
        // delete req.body._id;
        // // const updatedUser = await Users.findOneAndUpdate( { name : "aryan" } , {name : "power"}, { new: true });
        // console.log(updatedUser);
        // res.status(201).json({ "u":"d"});
        
        console.log(req.body);
        let {
            name,
            oldPassword,
            newPassword,
        } = req.body;
        const filter = { _id: req.body._id };
        console.log("update profile api calleed !!");
        console.log(newPassword);

        if(newPassword == ''){
            console.log("change name");
            // console.log(_id);
            console.log(name);
            delete req.body._id;
            const updatedUser = await Users.findOneAndUpdate(filter , req.body , { new: true });
            res.status(201).json(updatedUser);
        }
        else
        {
            console.log("change pass");
            const user = await Users.findById(req.body._id);
            console.log(user);
            console.log(oldPassword);
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if(isMatch)
            {
                console.log("matched");
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(newPassword, salt);
                const updatedUser = await Users.findOneAndUpdate( filter , {
                    "password" : passwordHash,
                    ...(( name == '') ? {"name" : name } : {})
                },{ new: true });
                res.status(201).json(updatedUser);
            }
            else{
                console.log("not matched");
                res.status(500).json({ error: "incorrect password entered" });
            }
        }
      
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};