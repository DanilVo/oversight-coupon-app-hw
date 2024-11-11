import {
  AppBar,
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/oneItemShop-logo-removebg-preview.png";
import { authStore } from "../../../Redux/AuthState";
import LogIn from "../../AuthArea/LogIn";
import "./Header.css";
import UserModel from "../../../Models/UserModel";

function Header(): JSX.Element {
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

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ height: 120, width: 200 }}
          onClick={() => navigate("/home")}
        />
        <Toolbar disableGutters>
          <Paper
            elevation={8}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: 250,
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
