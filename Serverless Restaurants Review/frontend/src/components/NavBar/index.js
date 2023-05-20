import React from "react";

import { AppBar, Box, Toolbar, Grid } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/styles";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
// import NavTabs from "./Tabs";
import UserAvatar from "./UserAvatar";

const NavBar = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Toolbar
                  sx={{
                    justifyContent: "space-between",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <Logo />

                  {/* <NavTabs/> */}
                  <div>
                    <Grid container spacing={0}>
                      <Grid
                        item
                        sx={{ display: { xs: "none", sm: "initial" } }}
                      >
                        <SearchBar />
                      </Grid>

                      <Grid item>
                        <UserAvatar />
                      </Grid>
                    </Grid>
                  </div>
                </Toolbar>

              </Grid>

              <Grid item xs={12} sx={{ display:{xs:"flex",sm:"none"}}}>
                <Box sx={{ position:"relative",left:"-.8rem",margin:"auto" }}>
                    <SearchBar />
                </Box>
              </Grid>

            </Grid>

          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
