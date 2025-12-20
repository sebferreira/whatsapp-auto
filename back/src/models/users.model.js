import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
const User = sequelize.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "Pendiente",
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "#ffffff",
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

User.sync();

export default User;
