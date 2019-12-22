const router = require("express").Router();
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { registerValidation, loginValidation } from "../validation/validation";

router.post("/register", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE CREATING A USER
  const { error } = registerValidation(req.body);
  // res.send(error.details[0].message);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Checking if the user is already in the database
  // This can also work as well
  // const emailExist = await User.findOne({ email: req.body.email });
  // if (emailExist) {
  //   return res.status(400).send("Email already exists");
  // }
  const { email } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).send({
      message: "Email already exists"
    });
  }

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({
      message: "Registration  successful",
      savedUser
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE LOGIN A USER
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Checking if the email exist
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({
      message: "Email is not found"
    });
  }
  // Check if Password is correct or not
  // const match = await bcrypt.compare(req.body.password, user.password);
  const match = await bcrypt.compare(password, user.password);

  // Create and assign token
  if (match) {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "3600s" // 1min
    });
    res
      .header("auth-token", token)
      .status(201)
      .json({
        token,
        message: "logged in!"
        // user
      });
  }
  if (match) {
    res.status(201).json({
      message: "logged in!"
      // user
    });
  }
  try {
    if (!match) {
      return res.status(400).send("Invalid Password");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// module.exports = router;
export default router;
