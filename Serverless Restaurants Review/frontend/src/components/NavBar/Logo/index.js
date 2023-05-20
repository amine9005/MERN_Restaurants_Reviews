import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { IconButton, Typography } from "@mui/material";

const titleStyle ={ marginLeft: 1,fontSize:26,display:{xs:"none",sm:"none",md:"initial"} }

const Logo = () => {
  return (
    <IconButton
      variant="primary"
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 0.5,p:0,ml:".5rem" }}
      disableRipple={true}
    >
      <MenuBookIcon sx={{ fontSize: 60 }} />
      <Typography sx={titleStyle} variant="h6">
        Restaurants Finder
      </Typography>
    </IconButton>
  );
};

export default Logo;
