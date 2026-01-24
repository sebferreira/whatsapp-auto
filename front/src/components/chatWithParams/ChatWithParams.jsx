import {Box, Drawer} from "@mui/material";

import ChatDrawer from "../../components/chatCard/drawer";
import NavbarChat from "../navbar/NavbarChat";
import {MessageSection} from "../MessageSection/MessageSection";
import {memo} from "react";
import Navbar from "../navbar/Navbar.jsx";
import {ChatInput} from "../chatInput/ChatInput.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

export const ChatWithParams = memo(function ChatWithParams({chats, mensajes}) {
  const {user} = useAuth();
  let mostrar;
  if (user) {
    if (user.role !== "soloVer") {
      mostrar = "flex";
    } else {
      mostrar = "none";
    }
  }
  // Definimos el ancho del drawer en una variable para no repetir números
  const drawerWidth = {xs: 0, md: "400px", lg: "500px", xl: "560px"};
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}>
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: {xs: "column", md: "row"},
          flexShrink: 0,
          width: "100%",
          zIndex: 1100,
        }}>
        <Navbar />
        <NavbarChat chats={chats} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: {xs: 0, md: 0},
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
        <Drawer
          container={window.document.body}
          variant="permanent"
          anchor="left"
          open={true}
          sx={{
            display: {xs: "none", md: "block"},
            zIndex: 0,
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              overflow: "hidden",
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#19181d",
              marginTop: "5rem",
              height: "calc(100% - 5rem)",
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}>
          <ChatDrawer chats={chats} mensajes={mensajes} />
        </Drawer>
        <MessageSection mensajes={mensajes} />
      </Box>
      {/*  <Box
        sx={{
          flexShrink: 0,
          width: "100%",
          backgroundColor: "#19181d",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: mostrar,
          paddingTop: "15px",
          paddingBottom: "max(15px, env(safe-area-inset-bottom))",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: {xs: "100%", md: "800px"},
            paddingX: "20px",
          }}> */}
      {/* SECCIÓN DEL INPUT (Fija abajo) */}
      <Box
        sx={{
          flexShrink: 0,
          width: "100%",
          backgroundColor: "#19181d",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",

          // Ajustes de Espaciado Vertical
          paddingTop: "15px",
          paddingBottom: "max(15px, env(safe-area-inset-bottom))",

          // Aseguramos que se muestre según tu lógica
          display: mostrar ? "flex" : "none",
          justifyContent: "center",
        }}>
        {/* CAJA CONTENEDORA */}
        <Box
          sx={{
            // 1. OCUPAR TODO EL ANCHO
            width: "100%",

            // 2. ELIMINAR EL LIMITE DE 800PX
            // Quitamos maxWidth o lo ponemos en '100%'

            // 3. MÁRGENES LATERALES RESPONSIVE
            // Celular (xs): 10px de cada lado (aprovecha espacio)
            // PC (md): 4rem (aprox 64px) de cada lado para que se vea elegante y centrado
            paddingX: {xs: "10px", md: "4rem"},
          }}>
          {" "}
          <ChatInput />
        </Box>
      </Box>
    </Box>
  );
});
