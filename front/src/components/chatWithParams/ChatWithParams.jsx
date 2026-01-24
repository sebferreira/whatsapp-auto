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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        width: "100%",
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
        /* sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }} */ component="main"
        sx={{
          flexGrow: 1,
          // En móvil no hay margen izquierdo porque el drawer no está
          marginLeft: {xs: 0, md: 0},
          width: {xs: "100%", md: `calc(100% - 400px)`}, // Ajusta según el ancho de tu drawer
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
            // EN MÓVIL: OCULTO (Porque ya estamos viendo un chat específico)
            // EN ESCRITORIO: VISIBLE (Como barra lateral)
            display: {xs: "none", md: "block"},

            // Aseguramos que el Drawer no tenga zIndex que tape el navbar
            zIndex: 0,

            // Ancho del drawer container
            width: {md: "400px", lg: "500px", xl: "560px"},
            flexShrink: 0,

            "& .MuiDrawer-paper": {
              // Estilos del papel interno
              width: {md: "400px", lg: "500px", xl: "560px"},
              boxSizing: "border-box",
              backgroundColor: "#19181d",
              marginTop: "5rem", // Ajusta según tu Navbar real
              height: "calc(100% - 5rem)", // Resta el navbar para que no se pase
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}
          /*   PaperProps={{
            sx: {
              color: "white",
              marginTop: "5rem",
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4);",
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
              width: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
              backgroundColor: "#19181d ",
              top: 0,
            },
          }} */
        >
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
      <Box
        sx={{
          width: {xs: "100%", md: "auto"},
          marginLeft: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
          display: mostrar,
          flexShrink: 0,
          marginTop: "auto" /* 
          backgroundColor: "#19181d", */,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.5)",
          zIndex: 10,
          padding: "10px",
          paddingLeft: {xs: "10px", md: "0"},
          paddingBottom: "max(10px, env(safe-area-inset-bottom))",
          justifyContent: "center",
        }}>
        <Box sx={{width: "100%", maxWidth: "1000px"}}>
          {" "}
          <ChatInput />
        </Box>
      </Box>
    </Box>
  );
});
