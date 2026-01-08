import responderYGuardar from "../helpers/EnviarYGuardarMensaje.js";
import Mensaje from "../models/mensajes.model.js";

export const getMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.findAll();
    if (mensajes.length <= 0)
      return res.status(404).json(["No se han encontrado mensajes"]);
    res.json(mensajes);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};
export const getMensajesById = async (req, res) => {
  try {
    const {chatId: id_chat} = req.params;
    const mensajes = await Mensaje.findAll({where: {id_chat}});
    if (mensajes.length <= 0)
      return res.status(404).json(["No se han encontrado mensajes"]);
    res.json(mensajes);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const enviarMensaje = async (req, res) => {
  try {
    const {chatId: id_chat} = req.params;
    const {mensaje} = req.body;
    const mensajeCreado = await responderYGuardar(id_chat, mensaje, "agente");
    res.json(mensajeCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};
