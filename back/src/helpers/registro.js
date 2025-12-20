export async function registrar(message, client, datos) {
  const chatId = message.from;
  const input = message.body.trim();
  switch (datos[chatId].fase) {
    case "inicio":
      await client.sendMessage(
        chatId,
        "Hola, empecemos el registro. Por favor ingresa tu nombre:"
      );

      datos[chatId].fase = "Ingresar_Nombre";
      break;
    case "Ingresar_Nombre":
      datos[chatId].info = {...datos[chatId].info, nombre: input};

      datos[chatId].fase = "Ingresar_Apellido";
      await client.sendMessage(
        chatId,
        "¡Un gusto " + input + "! Ahora por favor escribe tu apellido:"
      );
      break;

    case "Ingresar_Apellido":
      datos[chatId].info = {...datos[chatId].info, apellido: input};

      datos[chatId].fase = "Ingresar_DNI";
      await client.sendMessage(chatId, "Ahora por favor escribe tu DNI:");
      break;

    case "Ingresar_DNI":
      datos[chatId].info = {...datos[chatId].info, dni: input};
      datos[chatId].fase = "finalizado";
      await client.sendMessage(chatId, "¡Registro completado!");
      break;
  }
}
