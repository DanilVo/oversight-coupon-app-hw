import {
  Box,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../Models/CredentialsModel";
import authService from "../../Services/AuthService";
import notificationService from "../../Services/NotificationService";
import { authStore } from "../../Redux/AuthState";
import UserModel from "../../Models/UserModel";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

/*
  Functionality that is presented in this component: 
  - Login
*/

export default function LogIn() {
  const navigate = useNavigate();

  const userInfo: UserModel = authStore.getState().user;

  const { register, handleSubmit, formState, reset } =
    useForm<CredentialsModel>();
  const { errors } = formState;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/home");
  };

  async function login(credentials: CredentialsModel) {
    try {
      await authService.logIn(credentials);
      notificationService.success("Welcome aboard");
      reset();
      handleClose();
      navigate("/dashboard");
    } catch (error) {
      notificationService.error("User not found");
      console.error(error);
    }
  }

  const handleLogout = () => {
    authService.logout();
    navigate("/home");
  };

  return (
    <Box>
      <Button
        onClick={userInfo ? handleLogout : handleOpen}
        sx={{ bgcolor: "orange" }}
        variant="contained"
      >
        {userInfo ? "LogOut" : "Login"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card variant="outlined" sx={modalStyle}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(login)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email" sx={{ display: "flex" }}>
                Email
              </FormLabel>
              <TextField
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter valid email",
                  },
                })}
                helperText={errors.email?.message}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>
              <TextField
                {...register("password", {
                  required: { value: true, message: "Password is required!" },
                  minLength: { value: 8, message: "Incorrect password!" },
                })}
                helperText={errors.password?.message}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
}
