import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { styled } from "@mui/material/styles";

import { Divider, Stack } from "@mui/material";
import { useState } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  borderRadius: "10px",
}));

export default function SignInCard() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Playstation 5 Disc Version PS5 Console - 4K-TV Gaming.120Hz 8K Output,
        16GB GDDR6, 825GB SSD, WiFi 6, Bluetooth 5.1
      </Typography>
      <Divider />
      <Box
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5">90$</Typography>
          <Typography
            color="textDisabled"
            sx={{ textDecoration: "line-through" }}
          >
            100$
          </Typography>
        </Box>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "left" }}>
            <FormLabel htmlFor="coupon">Coupon Code</FormLabel>
          </Box>
          <Stack direction="row" spacing={1}>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="Coupon"
              placeholder="••••••"
              type="coupon"
              id="coupon"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
            <Button
              sx={{
                color: "white",
                bgcolor: "orange",
                whiteSpace: "nowrap",
                padding: "0px 25px",
              }}
              onClick={validateInputs}
            >
              Apply Coupon
            </Button>
          </Stack>
        </FormControl>

        <Button type="submit" fullWidth variant="contained">
          Buy Now
        </Button>
      </Box>
    </Card>
  );
}
