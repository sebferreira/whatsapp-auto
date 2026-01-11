import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import {config} from "dotenv";

config();

const salt = Number(process.env.SALT);

export const registerUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password: passwordSended,
      confirmPassword,
      role,
    } = req.body;
    const userToken = req.user;
    if (userToken.role !== "admin") {
      return res.status(401).json(["Unauthorized"]);
    }
    const userFound = await User.findOne({where: {username}});
    if (userFound) {
      return res.status(400).json(["El usuario ya existe"]);
    }
    if (passwordSended !== confirmPassword) {
      return res.status(400).json(["Las contraseñas son diferentes"]);
    }
    const hashedPassword = await bcrypt.hash(passwordSended, salt);
    const user = {
      username,
      email,
      password: hashedPassword,
      role,
    };

    const token = jwt.sign({username}, process.env.SECRET_KEY, {});
    await User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      estado: "Aprobado",
      role: user.role,
    });
    res.json({user, token});
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const {username, password: contraseñaNueva} = req.body;
    const userFound = await User.findOne({
      where: {username, estado: "Aprobado"},
    });
    if (!userFound) {
      return res
        .status(401)
        .json(["El nombre de usuario o la contraseña son incorrectos"]);
    }
    const isMatch = bcrypt.compareSync(contraseñaNueva, userFound.password);
    if (!isMatch) {
      return res
        .status(401)
        .json(["El nombre de usuario o la contraseña son incorrectos"]);
    }
    const {password, ...user} = userFound._previousDataValues;
    const token = jwt.sign(user, process.env.SECRET_KEY, {});
    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "none",
      domain: process.env.DOMAIN,
      maxAge: Date.now() + 1000 * 60 * 30,
    };
    res.cookie("token-back", token, cookieOption);

    res.json({user, token});
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({message: "Logged out successfully"});
};

export const profileUser = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json(["Unauthorized"]);
  }
  res.json(user);
};

export const verifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).json(["Unauthorized"]);
  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json(["Unauthorized"]);

    const userFound = await User.findOne({where: {id_user: user.id_user}});

    if (!userFound) return res.status(401).json(["Unauthorized"]);

    return res.json(userFound);
  });
};

/*  */
