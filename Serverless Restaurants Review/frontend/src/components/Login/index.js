import {
  Button,
  Card,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { setGeneral } from "../../Redux/GeneralReducer.js";
import { useDispatch } from "react-redux";

const Login = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const Colors = {
    primary: "#1eff00",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.primary,
      },
    },
  });

  const onPasswordChange = (value) => {
    setPasswordError(false);
    setEmailError(false);
    setPassword(value);
  };

  const onEmailChange = (value) => {
    setPasswordError(false);
    setEmailError(false);
    setEmail(value);
  };

  const handleSubmit = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user uid: ", user.uid);
        dispatch(setGeneral({user_id: user.uid,reset:true}));
        navigate("/");
      })
      .catch((err) => {
        const errorCode = err.code;
        if (errorCode === "auth/invalid-email") {
          setEmailError(true);
        } else if (errorCode === "auth/invalid-password") {
          setPasswordError(true);
        } else {
          setEmailError(true);
          setPasswordError(true);
        }
      });
  };

  return (
    <Grid
      container
      spacing={0}
      padding={2}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "85vh" }}
    >
      <Card
        sx={{
          maxWidth: 600,
          borderRadius: "2rem",
          margin: "auto",
          padding: "1rem",
        }}
        elevation={4}
      >
        <Grid container spacing={2} padding={1}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center">
              Login
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                required
                label="Email"
                margin="normal"
                type="email"
                error={emailError}
                onChange={(e) => onEmailChange(e.target.value)}
                InputProps={{ style: { fontSize: 24, borderRadius: "1rem" } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
              />
            </ThemeProvider>
          </Grid>

          <Grid item xs={12}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                required
                label="Password"
                margin="normal"
                type="password"
                error={passwordError}
                onChange={(e) => onPasswordChange(e.target.value)}
                InputProps={{ style: { fontSize: 24, borderRadius: "1rem" } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
              />
            </ThemeProvider>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              sx={{ height: 60, borderRadius: "1rem", fontSize: "1.5rem" }}
              fullWidth
              onClick={(e) => handleSubmit(e.target.value)}
              type="submit"
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                style={{ color: "blue", textDecoration: "none" }}
              >
                Sign Up
              </NavLink>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              <NavLink
                to="/resetPasswrod"
                style={{ textDecoration: "none", color: "blue" }}
              >
                Forgot Password?
              </NavLink>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Login;
