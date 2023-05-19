import React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Grid,

} from "@mui/material";


import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/styles";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static">
          <Toolbar>

            <Logo/>
            <Grid container spacing={1}  sx={{ display:{xs:"none",sm:"initial"} }}>
              
              <Grid item>
                <Button style={{ color: "#fff",fontSize:{xs:10,sm:20}}}>Home</Button>
              </Grid>
            </Grid>

            <SearchBar/>


          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
