const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function enviarComoHumano(client, chatId, texto) {
  const tiempoLectura = Math.floor(Math.random() * 700) + 300;
  await delay(tiempoLectura);

  const chat = await client.getChatById(chatId);

  await chat.sendStateTyping();

  const tiempoEscritura = texto.length * 50 + Math.floor(Math.random() * 1000);

  await delay(tiempoEscritura);

  await chat.clearStateTyping();

  await client.sendMessage(chatId, texto);
}
