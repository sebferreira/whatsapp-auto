import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import Mensaje from "./models/mensajes.model.js";
import Chat from "./models/chats.model.js";
import router from "./routes/user.routes.js";
import routerChat from "./routes/chat.routes.js";
import routerMsj from "./routes/mensajes.routes.js";
import routerClient from "./routes/cliente.routes.js";

import {enviarMensajes} from "./helpers/crearMensaje.js";
import {enviarMensajeMeta} from "./helpers/whatsappApi.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://whatscontrol.vercel.app",
    /*   origin: "http://localhost:5173", */
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    credentials: true,
    origin: "https://whatscontrol.vercel.app",
    /* origin: "http://localhost:5173", */
    methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  req.whatsapp = {sendMessage: enviarMensajeMeta};
  req.io = io;
  next();
});
app.use("/api/users", router);
app.use("/api/chats", routerChat);
app.use("/api/mensajes", routerMsj);
app.use("/api/clientes", routerClient);
io.on("connection", (socket) => {
  console.log(">> Un agente se conectó desde el Frontend: " + socket.id);

  socket.on("disconnect", () => {
    console.log("<< Agente desconectado");
  });
});
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const datos = {};

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFICADO");
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages;

      if (messages && messages[0]) {
        const msgMeta = messages[0];

        const msgAdaptado = {
          from: msgMeta.from,
          body: msgMeta.text?.body || "",
          to: value.metadata?.display_phone_number,
          fromMe: false,
          timestamp: msgMeta.timestamp,
          _data: {
            notifyName: value.contacts?.[0]?.profile?.name || "Desconocido",
          },
        };

        const [chat, created] = await Chat.findOrCreate({
          where: {id_chat: msgAdaptado.from},
          defaults: {
            usuario: {nombre: msgAdaptado._data.notifyName},
            mensajes: {},
            asignado: false,
            estado: "abierto",
          },
        });
        const mensajeGuardado = await Mensaje.create({
          id_chat: msgAdaptado.from,
          mensaje: msgAdaptado.body,
          to: msgAdaptado.to,
          fromMe: false,
          etapa: datos[msgAdaptado.from]?.fase || "inicio",
        });
        io.emit("nuevo_mensaje", {
          id: mensajeGuardado.id || mensajeGuardado.id_mensaje,

          id_chat: msgAdaptado.from,
          from: msgAdaptado.from,
          mensaje: msgAdaptado.body,
          body: msgAdaptado.body,
          fromMe: false,
          to: msgAdaptado.to,
          createdAt: msgAdaptado.timestamp,
          pushName: msgAdaptado._data.notifyName,
        });

        await enviarMensajes(msgAdaptado, datos, chat, io);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en Webhook:", error);
    res.sendStatus(500);
  }
});

httpServer.listen(PORT, () => {
  console.log(`\nServidor corriendo en puerto ${PORT}\n`);
});
