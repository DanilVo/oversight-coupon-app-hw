import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/oneItemShop-logo-removebg-preview.png";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import LogIn from "../../AuthArea/LogIn";

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserModel>();
  const userFromStore = authStore.getState().user;

  // Sync user data with authStore updates and cause react component to rerender and clean up on unmount

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setUserInfo(authStore.getState().user);
    });

    return () => unsubscribe();
  }, [userFromStore]);

  const onNavigateClick = () => {
    if (pathname === "/home") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          mb: { xs: 1, sm: 0 },
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ height: 120, width: 200 }}
          onClick={() => navigate("/home")}
        />
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          {userInfo && (
            <Button
              sx={{ bgcolor: "orange", mr: 2 }}
              variant="contained"
              onClick={onNavigateClick}
            >
              {pathname === "/home" ? "Dashboard" : "Home"}
            </Button>
          )}
          <Paper
            elevation={8}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: 300,
              height: 70,
              mr: 2,
              borderRadius: 3,
              background: "#1976d2",
              boxShadow:
                "inset -5px 5px 10px #1561ac, inset 5px -5px 10px #1e8bf8",
            }}
          >
            <Typography variant="body2" color="black">
              Welcome:{" "}
              {userInfo
                ? userInfo?.firstName + " " + userInfo?.lastName
                : "Customer"}
            </Typography>
            <LogIn />
          </Paper>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
