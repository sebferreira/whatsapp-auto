import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ChatList({chat}) {
  return (
    <ListItem
      disablePadding
      sx={{
        width: "100%",
        transition: "background-color 0.3s ease-in-out",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "#19181d",
        "&:hover": {
          backgroundColor: "#1d1e1fff",
        },
        "&:active": {
          backgroundColor: "#383b3dff",
        },
      }}>
      <ListItemButton
        component={Link}
        to={`/chats/${chat.id_chat}`}
        onClick={() => {
          sessionStorage.setItem("previousPath", "/chats");
          sessionStorage.setItem("actualPath", `/chats/${chat.id_chat}`);
        }}
        sx={{
          color: "#fff",
          textDecoration: "none",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0",
          marginLeft: "10px",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <ListItemIcon>
            <AccountCircleRoundedIcon
              sx={{
                color: "#4c82f9",
                backgroundColor: "#fff",
                fontSize: "2.5rem",
                borderRadius: "100%",
              }}
            />
          </ListItemIcon>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}>
            <div style={{display: "flex"}}>
              <ListItemText
                primary={chat.id_chat}
                sx={{
                  color: "white",
                }}
              />
              <ListItemText
                primary={chat.usuario_asignado || "No asignado"}
                style={{
                  fontSize: "0.8rem",
                  color: "#8b8b8bff",
                  marginLeft: "5px",
                }}
              />
            </div>
            <Typography
              noWrap
              variant="body2"
              sx={{
                textOverflow: "ellipsis",
                maxWidth: "10rem",
                color: "#8b8b8bff",
              }}>
              {chat.ultimoMensaje}
            </Typography>
          </Box>
        </div>
        <ArrowForwardIosIcon
          sx={{
            color: "#757575",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
