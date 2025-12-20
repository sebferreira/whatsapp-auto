import {registrar} from "./registro.js";

export async function enviarMensajes(message, client, datos) {
  if (message.fromMe) return;

  const input = message.body.trim();
  const chatId = message.from;
  if (!datos[chatId]) {
    datos[chatId] = {
      fase: "inicio",
      info: {},
    };
  }
  registrar(message, client, datos);
  console.log(datos);
  if (datos[chatId].fase === "finalizado") {
    switch (input) {
      case "1":
        await client.sendMessage(message.from, "ventas");
        break;

      case "2":
        await client.sendMessage(message.from, "compras");
        break;

      case "3":
        await client.sendMessage(message.from, "los pagos se realizan con mp");
        break;
      default:
        await client.sendMessage(
          message.from,
          "Debes elegir una opcion: 1.ventas 2.compra 3.pagos"
        );
        break;
    }
  }
}
