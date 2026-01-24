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
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "10px",
          paddingBottom: "max(10px, env(safe-area-inset-bottom))",
          display: mostrar,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "900px", 
            paddingX: {xs: "10px", md: "20px"},
          }}> */}
      <Box
        sx={{
          flexShrink: 0,
          width: "100%",
          backgroundColor: "#19181d",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: mostrar,

          // Ajustes de Espaciado Vertical
          paddingTop: "15px", // Un poco más de aire arriba
          paddingBottom: "max(15px, env(safe-area-inset-bottom))", // Aire abajo

          // CENTRADO
          justifyContent: "center",
          alignItems: "center", // Centrado vertical por si acaso
        }}>
        {/* CAJA LIMITADORA (Hace que se vea compacto en PC) */}
        <Box
          sx={{
            width: "100%",
            // En PC limitamos el ancho a 700px o 800px para que se vea estético
            maxWidth: {xs: "100%", md: "800px"},

            // Márgenes laterales para que no toque los bordes en ninguna pantalla
            paddingX: "20px",
          }}>
          {" "}
          <ChatInput />
        </Box>
      </Box>
    </Box>
  );
});
