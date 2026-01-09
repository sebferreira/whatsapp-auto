import {Box, Drawer, List, Typography} from "@mui/material";

import ChatList from "../../components/chatCard/chatList";
import ChatDrawer from "../../components/chatCard/drawer";

export function ChatWithoutParams({chats}) {
  sessionStorage.setItem("actualPath", "/chats");
  return (
    <>
      <Box
        sx={{
          display: {sx: "flex", md: "none"},
          backgroundColor: "#fff",
          height: "100vh",
          overflow: "auto",
          flex: "1",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          {chats.mensaje === "No se han encontrado chats" && (
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

        {chats.mensaje !== "No se han encontrado chats" && (
          <>
            <Typography
              component="p"
              variant="h6"
              sx={{
                marginTop: "1rem",
                fontWeight: "bold",
                marginLeft: "3rem",
                marginBottom: "0.5rem",
                color: "#1e1e1e",
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
              backgroundColor: "transparent",
              color: "white",
              borderRight: 0,
              width: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
              marginTop: "3.5rem",
              overflowY: "auto",
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
