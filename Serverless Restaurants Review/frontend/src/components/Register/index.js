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
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGeneral } from "../../Redux/GeneralReducer.js";

  const Register = () => {
    const navigate = useNavigate()
    const [fullName,setFullName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const dispatch = useDispatch()

    const onPasswordChange= (value) => {
        setPasswordError(false)
        setEmailError(false)
        setPassword(value)
      }
    
      const onEmailChange= (value) => {
        setPasswordError(false)
        setEmailError(false)
        setEmail(value)
      }

    const handleSubmit = (e) => {
        createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        console.log("user: ",userCredential)
        const user = userCredential.user;
        dispatch(setGeneral({user_id:user.uid,user_name:fullName}))

        navigate("/")

      }).catch(err => {
        const errorCode = err.code
        if (errorCode === "auth/invalid-email" ){
            setEmailError(true)
        } else if (errorCode === "auth/invalid-password" ){
            setPasswordError(true)
        } else {
            setEmailError(true)
            setPasswordError(true)
        }
    });
    }

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
                  Register
                </Typography>
              </Grid>


              <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                  <TextField
                    fullWidth
                    error={passwordError || emailError}
                    required
                    label="Full Name"
                    margin="normal"
                    onChange={(e)=>setFullName(e.target.value)}
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
                    label="Email"
                    margin="normal"
                    type="email"
                    error={emailError}
                    onChange={(e)=>onEmailChange(e.target.value)}
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
                    onChange={(e)=>onPasswordChange(e.target.value)}
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
                  onClick={(e)=>handleSubmit(e.target.value)}
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
  
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Have an account?{" "}
                  <NavLink
                    to="/login"
                    style={{ color: "blue", textDecoration: "none" }}
                  >
                    Login
                  </NavLink>
                </Typography>
              </Grid>
  
              
            </Grid>
          </Card>
        </Grid>
    );
  };
  
  export default Register;
  