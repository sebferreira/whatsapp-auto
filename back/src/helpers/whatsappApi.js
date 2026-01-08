import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const enviarMensajeMeta = async (numero, texto) => {
  try {
    const url = `https://graph.facebook.com/v21.0/${process.env.META_PHONE_ID}/messages`;
    console.log(process.env.VERIFY_TOKEN_PHONE);
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.VERIFY_TOKEN_PHONE}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      messaging_product: "whatsapp",
      to: numero,
      type: "text",
      text: {body: texto},
    };

    await axios.post(url, data, config);
    return true;
  } catch (error) {
    console.error(
      "Error enviando a Meta:",
      error.response?.data || error.message
    );
    return false;
  }
};
