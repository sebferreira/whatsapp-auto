import Cliente from "../models/clientes.model.js";

export const getClientes = async (req, res) => {
  try {
    const userToken = req.user;
    if (!userToken !== "admin") return res.status(401).json(["Unauthorized"]);
    const clientes = await Cliente.findAll();
    if (clientes.length <= 0)
      return res.status(404).json(["No se han encontrado clientes"]);
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const getClienteById = async (req, res, next) => {
  try {
    const userToken = req.user;
    if (!userToken !== "admin") return res.status(401).json(["Unauthorized"]);
    const {chatId: id_chat} = req.params;
    const cliente = await Cliente.findByPk(id_chat);
    if (!cliente) return res.status(404).json(["No se encontro el cliente"]);
    res.json(cliente);
  } catch (error) {
    next(error);
  }
};
