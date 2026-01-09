import Chat from "../models/chats.model.js";

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.findAll();
    if (chats.length <= 0)
      return res.status(404).json({message: "No se han encontrado chats"});
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const getChatById = async (req, res, next) => {
  try {
    const {chatId: id_chat} = req.params;
    const chat = await Chat.findByPk(id_chat);
    if (!chat) return res.status(404).json(["No se encontro chat"]);
    res.json(chat);
  } catch (error) {
    next(error);
  }
};
export const createChat = async (req, res, next) => {
  try {
    const {chatId: id_chat} = req.params;
    const chat = await Chat.create({id_chat});
    if (!chat) return res.status(404).json(["No se han encontrado chats"]);
    res.json(chat);
  } catch (error) {
    next(error);
  }
};

export const asignarChat = async (req, res, next) => {
  try {
    const {chatId: id_chat} = req.params;
    const {username} = req.user;
    const chat = await Chat.findByPk(id_chat);
    if (!chat) return res.status(404).json(["No se han encontrado chats"]);
    chat.asignado = true;
    chat.usuario_asignado = username;
    await chat.save();
    res.json(chat);
  } catch (error) {
    next(error);
  }
};
export const modificarEstadoChat = async (req, res, next) => {
  try {
    const {chatId: id_chat} = req.params;
    const chat = await Chat.findByPk(id_chat);
    if (!chat) return res.status(404).json(["No se han encontrado chats"]);
    chat.estado = "finalizado";
    await chat.save();
    res.json(chat);
  } catch (error) {
    next(error);
  }
};
