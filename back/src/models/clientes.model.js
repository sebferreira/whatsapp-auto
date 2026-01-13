import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Chat from "./chats.model.js";
const Cliente = sequelize.define(
  "clientes",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Cliente.belongsTo(Chat, {foreignKey: "id_chat"});

Chat.hasMany(Cliente, {foreignKey: "id_chat"});
Cliente.sync();

export default Cliente;
