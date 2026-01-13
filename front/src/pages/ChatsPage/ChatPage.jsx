import {useEffect, useState, useRef} from "react";
import {getChats} from "../../queryFn/query";
import {useParams} from "react-router-dom";
import {ChatWithParams} from "../../components/chatWithParams/ChatWithParams";
import {ChatWithoutParams} from "../../components/chatWithoutParams/ChatWithoutParams";
const socket = io("https://whatsapp-auto-p2eg.onrender.com");
import io from "socket.io-client";
/* const chatsPrueba = [
  {
    id_chat: "chat-prueba-1", // Debe ser 'id_chat' para que coincida con tu lógica
    usuario: {nombre: "Usuario Prueba 1", apellido: ""},
    ultimoMensaje: "Este es un mensaje mockeado",
    updatedAt: new Date().toISOString(),
    mensajes: [],
    estado: "abierto",
  },
  {
    id_chat: "chat-prueba-2",
    usuario: {nombre: "Usuario Prueba 2", apellido: ""},
    ultimoMensaje: "Otro test visual",
    updatedAt: new Date().toISOString(),
    mensajes: [],
    estado: "abierto",
  },
  {
    id_chat: "chat-prueba-3",
    usuario: {nombre: "Usuario Prueba 3", apellido: ""},
    ultimoMensaje: "Otro test visual",
    updatedAt: new Date().toISOString(),
    mensajes: [],
    estado: "abierto",
  },
  {
    id_chat: "chat-prueba-4",
    usuario: {nombre: "Usuario Prueba 4", apellido: ""},
    ultimoMensaje: "Otro test visual",
    updatedAt: new Date().toISOString(),
    mensajes: [],
    estado: "abierto",
  },
]; */

export function ChatPage() {
  const [chats, setChats] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const params = useParams();
  const chatIdRef = useRef(params.chatId);
  useEffect(() => {
    chatIdRef.current = params.chatId;
    setMensajes([]);
  }, [params.chatId]);

  const getAllChats = async () => {
    const data = await getChats();
    if (data.length === 0) {
      return console.log(data);
    }
    setChats(data);
  };

  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    const handleChatUpdated = (data) => {
      /*       console.log("Actualizando info del cliente:", data); */

      setChats((prevChats) => {
        return prevChats.map((chat) => {
          if (String(chat.id_chat) === String(data.id_chat)) {
            return {
              ...chat,
              usuario: {...chat.usuario, ...data.usuario},
              estado: data.estado || chat.estado,
            };
          }
          return chat;
        });
      });
    };

    const handleNewMessage = (mensaje) => {
      /*  console.log("Nuevo mensaje recibido:", mensaje); */
      let fechaFinal;
      const fechaEntrante =
        mensaje.createdAt || mensaje.timestamp || Date.now();

      if (!isNaN(fechaEntrante)) {
        const timestamp = Number(fechaEntrante);
        fechaFinal = new Date(
          timestamp < 100000000000 ? timestamp * 1000 : timestamp
        );
      } else {
        fechaFinal = new Date(fechaEntrante);
      }

      if (isNaN(fechaFinal.getTime())) {
        fechaFinal = new Date();
      }
      const mensajeFormateado = {
        id: mensaje.id_mensaje || mensaje.id,
        id_chat: mensaje.id_chat,
        mensaje: mensaje.body || mensaje.mensaje,
        to: mensaje.to,
        fromMe: mensaje.fromMe,
        createdAt: fechaFinal.toISOString(),
      };

      const idDelChatDelMensaje = mensajeFormateado.id_chat;
      setChats((prevChats) => {
        const targetId = String(idDelChatDelMensaje);
        const chatPrevio = prevChats.find(
          (c) => String(c.id_chat) === targetId
        );

        const otrosChats = prevChats.filter(
          (c) => String(c.id_chat) !== targetId
        );

        const chatActualizado = {
          estado: "abierto",
          mensajes: [],
          ...(chatPrevio || {}),

          id_chat: targetId,
          ultimoMensaje: mensajeFormateado.mensaje,
          updatedAt: mensajeFormateado.createdAt,

          usuario: chatPrevio?.usuario || {
            nombre: mensaje.pushName || "Nuevo Cliente",
            apellido: "",
          },
        };

        return [chatActualizado, ...otrosChats];
      });

      const chatAbiertoActualmente = chatIdRef.current;

      if (
        chatAbiertoActualmente &&
        (String(idDelChatDelMensaje) === String(chatAbiertoActualmente) ||
          String(mensaje.to) === String(chatAbiertoActualmente))
      ) {
        setMensajes((prev) => [...prev, mensajeFormateado]);
      }
    };

    socket.on("nuevo_mensaje", handleNewMessage);
    socket.on("chat_updated", handleChatUpdated);

    return () => {
      socket.off("nuevo_mensaje", handleNewMessage);
      socket.off("chat_updated", handleChatUpdated);
    };
  }, []);

  return (
    <>
      {params.chatId ? (
        <ChatWithParams chats={chats} mensajes={mensajes} />
      ) : (
        <ChatWithoutParams chats={chats} mensajes={mensajes} />
      )}
    </>
  );
}
