import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext";
import {useEffect} from "react";
import background from "../../assets/imagenRegistros.png";
import logo from "../../assets/whatsControl_logo_transparent.png";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {signin, loginErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chats");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}
      sx={{minHeight: "100vh", height: "100vh"}}>
      <Card
        sx={{
          width: {xs: "100vw", md: "60rem", lg: "80rem"},
          height: {xs: "100vh", md: "70vh"},
          mx: "auto",
          minHeight: "500px",
          display: "flex",
          justifyContent: {xs: "center", md: "flex-end"},
          alignItems: "center",
          borderRadius: {xs: 0, md: 5},
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: {xs: "none", md: "center"},
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          color: "#fff",
        }}>
        <Box
          sx={{
            display: {xs: "none", md: "flex"},
            width: "50%",
          }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "200px" /* 
                  height: "100px", */,
              marginBottom: "2rem",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}></img>
        </Box>
        <CardContent
          sx={{
            width: {xs: "100%", md: "45%"},
            zIndex: 2,
            backgroundColor: {
              xs: "transparent",
              md: "rgba(255, 255, 255, 0.1)",
            },
            backdropFilter: {xs: "none", md: "blur(10px)"},
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
          }}>
          <Box
            sx={{
              display: {xs: "flex", md: "none"},
              width: "100px",
              mx: "auto",
            }}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "100%" /* 
                  height: "100px", */,
                marginBottom: "2rem",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}></img>
          </Box>
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginBottom: {xs: 2, md: 5},
              fontSize: "1.1rem",
            }}>
            Iniciar Sesión
          </Typography>
          <form onSubmit={onSubmit}>
            {loginErrors.map((error, i) => {
              return (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  fontWeight="bold"
                  key={i}>
                  {error}
                </Typography>
              );
            })}
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                margin: 0,
                fontSize: "1rem",
              }}>
              Nombre de usuario
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: "2rem",
                borderBottom: "1px solid  #ffffffff",

                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  color: "white",
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& input:-webkit-autofill": {
                  transition: "background-color 600000s 0s, color 600000s 0s",
                },
              }}
              type="text"
              fontWeight="bold"
              {...register("username", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.username && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                El nombre de usuario es requerido
              </Typography>
            )}

            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                margin: 0,
                fontSize: "1rem",
              }}>
              Contraseña
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: {xs: "0.5rem", md: "1rem"},
                borderBottom: "1px solid  #ffffffff",

                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  color: "white",
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& input:-webkit-autofill": {
                  transition: "background-color 600000s 0s, color 600000s 0s",
                },
              }}
              type="password"
              {...register("password", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.password && (
              <Typography
                color="error"
                fontWeight="bold"
                variant="body2"
                sx={{
                  marginTop: "0.5rem",
                }}>
                La contraseña es requerida
              </Typography>
            )}
            <Button
              variant="contained"
              size="medium"
              style={{
                marginTop: "1rem",
                width: "100%",
                backgroundColor: "#3483fa",
                color: "#ffffffff",
                borderRadius: 12,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
