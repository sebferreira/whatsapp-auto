import express from "express";
import pkg from "whatsapp-web.js";
const {Client, LocalAuth} = pkg;
import qrcode from "qrcode-terminal";
import {enviarMensajes} from "./helpers/crearMensaje.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app = express();
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  puppeteer: {
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});
app.use(
  cors({
    credentials: true,
    /*     origin: "https://poloweb.vercel.app", */
    origin: "http://localhost:5173",
    methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
client.on("qr", (qr) => {
  qrcode.generate(qr, {small: true});
});
client.on("ready", () => {
  console.log("el cliente esta listo!");
});
const MOMENTO_INICIO = Math.floor(Date.now() / 1000);

const datos = {};
client.on("message_create", async (message) => {
  if (message.timestamp < MOMENTO_INICIO) {
    console.log("Mensaje viejo ignorado:", message.body);
    return;
  }

  enviarMensajes(message, client, datos);
});
client.initialize();
app.listen(3000, () => {
  console.log("puerto 3000");
});
