import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Drawer,
} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useState} from "react";
import NavDrawer from "./Drawers/NavDrawers";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileMenu from "../Profile/ProfileMenu";
import logo from "../../assets/whatsControl_icono_transparent.png";
import AdminMenu from "../Menu/AdminMenu/AdminMenu";
export default function Navbar() {
  const {user} = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  let ancho = {xs: "100%", md: "400px", lg: "500px", xl: "560px"};
  let mostrar = "none";
  let mostrarIcono = "none";
  if (user) {
    if (user.role === "admin") {
      mostrarIcono = {xs: "flex", md: "none"};
      if (
        location.pathname != "/clientes" &&
        location.pathname != "/register"
      ) {
        mostrar = "flex";
      } else {
        ancho = "100%";
        mostrar = "none";
      }
    } else {
      mostrar = "none";
    }
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "0",
          background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
          width: ancho,
        }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: {xs: "3.5rem", md: "5rem"},
            minHeight: {xs: "3.5rem", md: "5rem"},
          }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
            }}>
            <IconButton
              color="inherit"
              size="large"
              onClick={() => setOpen(true)}
              sx={{
                display: mostrarIcono,
              }}>
              <MenuIcon />
            </IconButton>
            <Box
              style={{
                display: "flex",
                gap: "5px",
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
              }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "1.25rem",
                    xl: "1.5rem",
                    alignContent: "center",
                  },
                }}>
                <Link
                  to="/chats"
                  style={{
                    textDecoration: "none",
                    color: "#FFFF",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{width: "2.5rem", marginRight: "5px"}}
                  />
                  WhatsControl
                </Link>
              </Typography>
              <Box sx={{display: "flex"}}>
                <Box sx={{display: {xs: "none", md: "flex"}}}>
                  <AdminMenu />
                </Box>
                <ProfileMenu />
              </Box>
            </Box>
          </Box>
          <Drawer
            open={open}
            anchor="left"
            onClose={() => setOpen(false)}
            sx={{
              display: {xs: "flex", md: "none"},
            }}>
            <NavDrawer />
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}
