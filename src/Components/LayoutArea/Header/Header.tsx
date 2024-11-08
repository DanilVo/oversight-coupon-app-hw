import {
    AppBar,
    Box,
    Container,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/oneItemShop-logo-removebg-preview.png";
import LogInModal from "../../AuthArea/LogIn";
import "./Header.css";

function Header(): JSX.Element {
  const navigate = useNavigate();

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
              welcome: user.email
            </Typography>
            <LogInModal/>
          </Paper>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
