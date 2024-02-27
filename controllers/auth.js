import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    console.log("register new user");
    console.log(req.body);
    const {
      name,
      email,
      password,
    } = req.body;


    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Users({
      name,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  console.log("logging in");
  console.log(req.body);
  try {
    const { email, password } = req.body;


    let user = await Users.findOne({ email: email });
    console.log(user._id);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
