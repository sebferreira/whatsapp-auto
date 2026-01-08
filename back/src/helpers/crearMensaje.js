import Mensaje from "../models/mensajes.model.js";
import {registrar} from "./registro.js";
import responderYGuardar from "./EnviarYGuardarMensaje.js";
import Chat from "../models/chats.model.js";
import Cliente from "../models/clientes.model.js";

export async function enviarMensajes(message, datos, chat) {
  if (message.fromMe) return;
  const input = message.body.trim();
  const chatId = message.from;
  let opcion = "";
  if (!datos[chatId]) {
    datos[chatId] = {
      fase: "inicio",
      info: {},
    };
  }
  await Chat.update({ultimoMensaje: message.body}, {where: {id_chat: chatId}});
  await Mensaje.create({
    id_chat: chatId,
    mensaje: message.body,
    to: message.to,
    fromMe: false,
    etapa: datos[chatId].fase,
  });
  registrar(message, datos);

  if (datos[chatId].fase === "finalizado") {
    const usuario = JSON.stringify(datos[chatId].info);
    await chat.update({usuario});
    switch (input) {
      case "1":
        await responderYGuardar(chatId, "ventas", datos[chatId].fase);
        datos[chatId].fase = "confirmar";

        break;

      case "2":
        await responderYGuardar(chatId, "compras", datos[chatId].fase);
        datos[chatId].fase = "confirmar";

        break;

      case "3":
        await responderYGuardar(
          chatId,
          "los pagos se realizan con mp",
          datos[chatId].fase
        );
        datos[chatId].fase = "confirmar";

        break;
      default:
        await responderYGuardar(
          chatId,
          "Debes elegir una opcion: 1.ventas 2.compra 3.pagos",
          datos[chatId].fase
        );
        break;
    }
    opcion = input;
  }

  if (datos[chatId].fase === "confirmar") {
    await responderYGuardar(
      chatId,
      ` nombre:${datos[chatId].info.nombre} apellido:${datos[chatId].info.apellido} DNI:${datos[chatId].info.dni} Si lo anterior es correcto escriba "confirmar", de lo contrario escriba "reintentar"`,
      datos[chatId].fase
    );
    datos[chatId].fase = "pendiente";
  }

  if (datos[chatId].fase === "pendiente") {
    if (input === "reintentar") {
      await responderYGuardar(
        chatId,
        "Por favor ingresa tu nombre:",
        datos[chatId].fase
      );
      datos[chatId].fase = "Ingresar_Nombre";
    }

    if (input === "confirmar") {
      await Cliente.create(
        {
          name: datos[chatId].info.nombre,
          apellido: datos[chatId].info.apellido,
          dni: datos[chatId].info.dni,
          categoria: opcion,
          id_chat: chatId,
        },
        {where: {id_chat: chatId}}
      );

      await responderYGuardar(
        chatId,
        "Gracias por registrarse",
        datos[chatId].fase
      );
      datos[chatId].fase = "confirmado";
    }
  }
}
