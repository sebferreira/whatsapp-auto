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
          width: {xs: "100vw", md: "auto"},
          maxWidth: "100vw",
          paddingTop: "0.5rem",
          marginLeft: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
          display: mostrar,
          minWidth: {sm: "30rem"},
          justifyContent: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: " 0px 4px 10px rgba(0, 0, 0, 0.7)",
          flexShrink: 0,
          padding: "10px",
          paddingLeft: "0",
          paddingBottom: "max(10px, env(safe-area-inset-bottom))",
        }}>
        <ChatInput />
      </Box> */}
      {/*  <Box
        sx={{
          width: {xs: "100%", md: "auto"},
          marginLeft: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
          display: mostrar,
          flexShrink: 0,
          marginTop: "auto",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.5)",
          zIndex: 10,
          padding: "10px",
          paddingLeft: {xs: "10px", md: "0"},
          paddingBottom: "max(10px, env(safe-area-inset-bottom))",
          justifyContent: "center",
        }}>
        <Box sx={{width: "100%", maxWidth: "1000px"}}> */}
      <Box
        sx={{
          flexShrink: 0, // No te aplastes
          width: "100%",
          backgroundColor: "#19181d", // Fondo del área del input
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "10px",
          paddingBottom: "max(10px, env(safe-area-inset-bottom))", // Para iPhone/Android
          display: mostrar, // Tu lógica de roles (flex/none)

          // 🔥 AQUÍ ESTÁ LA MAGIA DEL CENTRADO (Imagen 1) 🔥
          justifyContent: "center",
          alignItems: "center",
        }}>
        {/* Contenedor que limita el ancho del input para que no sea eterno */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "900px", // <--- ESTO HACE QUE SE VEA COMO LA IMAGEN 1
            paddingX: {xs: "10px", md: "20px"}, // Margen a los costados
          }}>
          {" "}
          <ChatInput />
        </Box>
      </Box>
    </Box>
  );
});
