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

export default function ChatDrawer({chats}) {
  const params = useParams();
  return (
    <>
      <Box
        sx={{
          width: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
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
          {chats.mensaje === "No se han encontrado chats" && (
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
          {chats.mensaje !== "No se han encontrado chats" && (
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
              <ListItemText primary="Chats Disponibles" />
            </ListItem>
          )}

          {chats.mensaje !== "No se han encontrado chats" &&
            chats.map((item) => {
              if (item.id_chat === params.chatId) {
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
                      backgroundColor: "#3B82F6",
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
                        marginLeft: "10px",
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
                              color: "#ffffffff",
                              fontSize: "2.5rem",
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
                        console.log(item);
                        console.log(pathAnterior);
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
                              color: "#ffffffff",
                              fontSize: "2.5rem",
                            }}
                          />
                        </ListItemIcon>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            /*
                          alignItems: "center", */
                          }}>
                          <div style={{display: "flex"}}>
                            <ListItemText
                              primary={item.id_chat /* .slice(3, -5) */}
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
                          <ListItemText
                            primary={"UltimoMensaje"}
                            style={{
                              fontSize: "0.8rem",
                              color: "#8b8b8bff",
                              marginLeft: "5px",
                            }}
                          />
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
