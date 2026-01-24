import {Box, Drawer, List, Typography} from "@mui/material";

import ChatList from "../../components/chatCard/chatList";
import ChatDrawer from "../../components/chatCard/drawer";
import Navbar from "../navbar/Navbar";

export function ChatWithoutParams({chats, mensajes}) {
  sessionStorage.setItem("actualPath", "/chats");

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          justifyContent: "flex-start",
          flexDirection: {xs: "column", md: "row"},
          flexShrink: 0,
          width: "inherit",
        }}>
        <Navbar />
      </Box>

      <Box
        sx={{
          display: {sx: "flex", md: "none"},
          backgroundColor: "#19181d",
          height: "100vh",

          overflow: "auto",
          flex: "1",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%" /* 
            height: "85vh", */,
          }}>
          {chats.mensaje && (
            <Box
              sx={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                padding: "2rem",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}>
              <Typography
                component="p"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "red",
                }}>
                {chats.mensaje}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            maxHeight: "85vh",
            overflow: "auto",
          }}>
          {!chats.mensaje && (
            <>
              <Typography
                component="p"
                variant="h6"
                sx={{
                  marginTop: "1rem",
                  fontWeight: "bold",
                  marginLeft: "3rem",
                  marginBottom: "0.5rem",
                  color: "#fff",
                }}>
                Chats Disponibles
              </Typography>

              <List>
                {chats &&
                  chats.map((chat) => (
                    <ChatList chat={chat} key={chat.id_chat} />
                  ))}
              </List>
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: {xs: "none", md: "flex"},
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
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
              backgroundColor: "#19181d ",
              color: "white",
              marginTop: "5rem",
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4);",
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
              width: {xs: 0, md: "400px", lg: "500px", xl: "560px"},

              top: 0,
            },
          }}>
          <ChatDrawer chats={chats} />
        </Drawer>
        <Box
          sx={{
            marginLeft: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
          }}>
          <Typography>Elija un chat para empezar a trabajar</Typography>
        </Box>
      </Box>
    </>
  );
}
