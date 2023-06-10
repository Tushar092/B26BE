const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.json({ error: err.message });
            }
            const user = new UserModel({ name, email, pass: hash });
            await user.save();
            res.json({ msg: "User has been registered", "user_added": req.body});
        })
    } catch (error) {
        res.json({ err: error.message });
    }

});

userRouter.post("/login", async (req, res) => {
    const {email, pass} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass, user.pass, (err, result) => {
                if(result) {
                    let token = jwt.sign({userID: user._id, user: user.name}, "masai");
                    res.json({msg: "Logged In!!", token: token});
                }else{
                    res.json({error: "Wrong Credentials"});
                }
            })
        }
    } catch (error) {
        res.json({"error": error.message});
    }
});

module.exports = {
    userRouter
}