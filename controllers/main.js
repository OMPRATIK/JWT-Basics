// check for username, password in post(login) request
// if exists create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard

import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/index.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  // validation -> mongoose
  // Joi package
  // check in controller

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const id = new Date().getDate();
  // dont send confidential data in token
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authoized data and your lucky number is ${luckyNumber}`,
  });
};

export { login, dashboard };
