import Mensaje from "../models/mensajes.model.js";
import {registrar} from "./registro.js";
import responderYGuardar from "./EnviarYGuardarMensaje.js";
import Chat from "../models/chats.model.js";
import Cliente from "../models/clientes.model.js";

export async function enviarMensajes(message, datos, chat, io) {
  if (message.fromMe) return;
  const input = message.body.trim();
  const chatId = message.from;
  if (!datos[chatId]) {
    datos[chatId] = {
      fase: "inicio",
      info: {},
    };
  }
  await Chat.update({ultimoMensaje: message.body}, {where: {id_chat: chatId}});
  /*  await Mensaje.create({
    id_chat: chatId,
    mensaje: message.body,
    to: message.to,
    fromMe: false,
    etapa: datos[chatId].fase,
  }); */
  registrar(message, datos, io);

  if (datos[chatId].fase === "finalizado") {
    const usuario = JSON.stringify(datos[chatId].info);
    await chat.update({usuario});
    switch (input) {
      case "1":
        datos[chatId].info.categoria = "ventas";

        await responderYGuardar(chatId, "ventas", datos[chatId].fase, io);
        datos[chatId].fase = "confirmar";
        break;

      case "2":
        datos[chatId].info.categoria = "compras";

        await responderYGuardar(chatId, "compras", datos[chatId].fase, io);
        datos[chatId].fase = "confirmar";
        break;

      case "3":
        datos[chatId].info.categoria = "pagos";

        await responderYGuardar(
          chatId,
          "los pagos se realizan con mp",
          datos[chatId].fase,
          io
        );
        datos[chatId].fase = "confirmar";
        break;
      default:
        await responderYGuardar(
          chatId,
          "Debes elegir una opcion: 1.ventas 2.compra 3.pagos",
          datos[chatId].fase,
          io
        );
        break;
    }
  }

  if (datos[chatId].fase === "confirmar") {
    await responderYGuardar(
      chatId,
      ` nombre:${datos[chatId].info.nombre} apellido:${datos[chatId].info.apellido} DNI:${datos[chatId].info.dni} Si lo anterior es correcto escriba "confirmar", de lo contrario escriba "reintentar"`,
      datos[chatId].fase,
      io
    );
    datos[chatId].fase = "pendiente";
  }

  if (datos[chatId].fase === "pendiente") {
    if (input === "reintentar") {
      await responderYGuardar(
        chatId,
        "Por favor ingresa tu nombre:",
        datos[chatId].fase,
        io
      );
      datos[chatId].fase = "Ingresar_Nombre";
    }

    if (input === "confirmar") {
      const datosCliente = datos[chatId].info;

      const clienteExistente = await Cliente.findOne({
        where: {dni: datosCliente.dni},
      });

      if (clienteExistente) {
        await clienteExistente.update({
          nombre: datosCliente.nombre,
          apellido: datosCliente.apellido,
          categoria: datosCliente.categoria,
          id_chat: chatId,
        });
      } else {
        await Cliente.create({
          nombre: datosCliente.nombre,
          apellido: datosCliente.apellido,
          dni: datosCliente.dni,
          categoria: datosCliente.categoria,
          id_chat: chatId,
        });
      }

      await responderYGuardar(
        chatId,
        "Gracias por registrarse",
        datos[chatId].fase,
        io
      );
      io.emit("chat_updated", {
        id_chat: chatId,
        usuario: datos[chatId].info,
        estado: "cliente_registrado",
      });

      datos[chatId].fase = "confirmado";
    }
  }
}
