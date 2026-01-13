import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ChatDrawer({chats, mensajes}) {
  const params = useParams();

  return (
    <>
      <Box
        sx={{
          width: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
          height: "85vh",
          backgroundColor: "#19181d ",
          display: "flex",
          flexDirection: "column",
        }}>
        <Divider />
        <List
          style={{
            overflow: "auto",
            overflowX: "hidden",
            scrollbarColor: "#262626 transparent",
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            maxHeight: "calc(100vh - 64px)",
            direction: "ltr",
            marginBottom: "1rem",
          }}>
          {chats.mensaje && (
            <ListItem
              disablePadding
              sx={{
                width: "100%",
                padding: "10px 20px",
                marginTop: "1rem",

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "8px",
                transition: "background-color 0.3s ease-in-out",
              }}>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      marginTop: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "90%",
                      padding: "2rem",
                      backgroundColor: "rgba(255, 0, 0, 0.1)",
                      borderRadius: "12px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}>
                    <Typography
                      component="p"
                      sx={{
                        fontWeight: "bold",
                        color: "red",
                      }}>
                      {chats.mensaje}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          )}
          {!chats.mensaje && (
            <ListItem
              disablePadding
              sx={{
                width: "100%",
                padding: "10px 24px",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "8px",
                transition: "background-color 0.3s ease-in-out",
              }}>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}>
                {" "}
                Chats Disponibles
              </Typography>
            </ListItem>
          )}

          {!chats.mensaje &&
            chats.map((item) => {
              if (item.id_chat === params.chatId) {
                if (mensajes.length > 0) {
                  const filterMessages = mensajes.filter(
                    (message) => message.id_chat === item.id_chat
                  );
                  const lastMessage = filterMessages[filterMessages.length - 1];
                  if (lastMessage) {
                    item.ultimoMensaje = lastMessage.mensaje;
                  }
                }
                return (
                  <ListItem
                    disablePadding
                    key={item.id_chat}
                    sx={{
                      width: "100%",
                      /*   padding: "10px 20px", */ marginTop: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease-in-out",
                      background: "linear-gradient(to right, #2c4da0, #1b2f6a)",
                      /* backgroundColor: "#3262e7", */
                      "&:hover": {
                        backgroundColor: " #254e8fff ",
                        color: "white",
                      },
                    }}>
                    <ListItemButton
                      component={Link}
                      to={`/chats/${item.id_chat}`}
                      sx={{
                        color: "white",
                        textDecoration: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        /*  padding: "0", */
                        marginLeft: "8px",
                        height: "76px",
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
                        <ListItemText
                          primary={item.id_chat /* .slice(3, -5) */}
                          sx={{
                            "& .MuiTypography-root": {
                              width: " 10rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            },
                          }}
                        />
                      </div>
                      <ArrowForwardIosIcon sx={{color: "white"}} />
                    </ListItemButton>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem
                    disablePadding
                    key={item.id_chat}
                    sx={{
                      width: "100%",
                      /*  padding: "10px 20px", */
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor: "#19181d", //#1a1d26
                      /* background: "linear-gradient(100deg, #16161f,#16171f)", */
                      transition: "background-color 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#1d1e1fff",
                      },
                      "&:active": {
                        backgroundColor: "#383b3dff",
                      },
                      marginTop: "1rem",
                    }}>
                    <ListItemButton
                      component={Link}
                      to={`/chats/${item.id_chat}`}
                      onClick={() => {
                        const pathAnterior =
                          sessionStorage.getItem("actualPath");

                        if (pathAnterior != `/chats/${item.id_chat}`) {
                          sessionStorage.setItem("previousPath", pathAnterior);
                          sessionStorage.setItem(
                            "actualPath",
                            `/chats/${item.id_chat}`
                          );
                        }
                      }}
                      sx={{
                        /*  marginTop: "1rem", */
                        color: "white",
                        textDecoration: "none",

                        "& .MuiTypography-root": {
                          width: " 10rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        },
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        /*    padding: "0", */
                        marginLeft: "8px",
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
                              primary={item.id_chat}
                              sx={{
                                color: "white",
                              }}
                            />
                            <ListItemText
                              primary={item.usuario_asignado}
                              style={{
                                fontSize: "0.8rem",
                                color: "#8b8b8bff",
                                marginLeft: "5px",
                              }}
                            />
                          </div>
                          {/* <ListItemText
                            primary={item.ultimoMensaje}
                            
                          /> */}

                          <Typography
                            variant="span"
                            sx={{
                              width: "100%",
                              /*  fontSize: "0.8rem", */
                              color: "#8b8b8bff",
                            }}>
                            {item.ultimoMensaje}
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
            })}
        </List>
      </Box>
    </>
  );
}
