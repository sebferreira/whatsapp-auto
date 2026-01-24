import {useState} from "react";
import {Box, TextField, Button} from "@mui/material";
import {useForm} from "react-hook-form";
import {enviarMSJ} from "../../queryFn/query.js";

import {useParams} from "react-router-dom";

export function ChatInput() {
  const [texto, setTexto] = useState("");
  const {handleSubmit} = useForm();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (!texto.trim()) return;
    const mensajeAEnviar = texto;
    setTexto("");

    data.mensaje = mensajeAEnviar;
    await enviarMSJ(data, params.chatId);
  });

  return (
    <Box
      sx={{
        /*  display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "1rem",
        padding: {sm: "1rem", xs: "0 0 1rem 0"},
        width: "90% ", */
        width: "100%",
      }}>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "10px",
          width: "100%",
        }}>
        <TextField
          fullWidth
          value={texto}
          multiline
          maxRows={4}
          variant="outlined"
          placeholder="Escribe tu mensaje..."
          style={{
            scrollbarColor: "#484848ff transparent",
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            height: "100%",
            backgroundColor: "#19181d",
          }}
          sx={{
            display: "block",
            paddingLeft: "0.5rem",
            height: "100%",
            borderRadius: "20px",
            border: " 1px solid rgba(255, 255, 255, 0.1)",
            "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-root": {
              color: "white",
              width: "100%",
              height: "100%",
            },
            "& input:-webkit-autofill": {
              transition: "background-color 600000s 0s, color 600000s 0s",
            },
          }}
          type="text"
          fontWeight="bold"
          onChange={(e) => setTexto(e.target.value)}
          size="small"
        />
        {texto && (
          <Button
            disabled={!texto}
            onClick={onSubmit}
            variant="contained"
            type="submit"
            style={{
              height: "100%",
              backgroundColor: "#3262e7",
              borderColor: "#9ecaed",
              boxShadow: "0 0 10px #2297f7ff",
              color: "white",
              cursor: "pointer",
              borderRadius: "10px",
            }}>
            Enviar
          </Button>
        )}
      </form>
    </Box>
  );
}
