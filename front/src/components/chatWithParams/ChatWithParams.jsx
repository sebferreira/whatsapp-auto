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
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}>
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: {xs: "column", md: "row"},
          flexShrink: 0,
          position: "sticky",
          top: 0,
          zIndex: 1100,
          width: "inherit",
        }}>
        <Navbar />
        <NavbarChat chats={chats} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}>
        <Drawer
          container={window.document.body}
          variant="permanent"
          anchor="left"
          open={true}
          sx={{
            display: {xs: "none", md: "flex"},
            zIndex: 0,
          }}
          PaperProps={{
            sx: {
              /*  backgroundColor: "transparent", */
              color: "white",
              marginTop: "5rem",
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4);",
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
              width: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
              backgroundColor: "#19181d ",
              top: 0,
            },
          }}>
          <ChatDrawer chats={chats} mensajes={mensajes} />
        </Drawer>
        <MessageSection mensajes={mensajes} />
      </Box>
      <Box
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
          backgroundColor: "#19181d",
          paddingBottom: "env(safe-area-inset-bottom, 10px)",
        }}>
        <ChatInput />
      </Box>
    </Box>
  );
});
