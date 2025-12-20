import express from "express";
import validateSchema from "../middlewares/validaciones.middleware.js";
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
  updateUser,
} from "../controllers/user.controller.js";
import {revisarCookie} from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/verify/", verifyToken);

router.patch("/profile/:username", revisarCookie, updateUser);
/* router.get("/", (req, res) =>
  res.json({
    message: "Hi",
  })
);
 */
export default router;
