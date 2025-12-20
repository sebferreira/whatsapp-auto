import jwt from "jsonwebtoken";

import {config} from "dotenv";
config();
import User from "../models/users.model.js";

export async function revisarCookie(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json(["Unauthorized"]);
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) return res.status(401).json(["Unauthorized"]);
      const id_user = decoded.id_user;
      const response = await User.findByPk(id_user);
      const {password, ...user} = response._previousDataValues;
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json(["Unauthorized"]);
  }
}
