import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGeneral } from "../../../Redux/GeneralReducer.js";

const titleStyle = {
  marginLeft: 1,
  fontSize: 26,
  display: { xs: "none", sm: "none", md: "initial" },
};


const Logo = () => {
  const dispatch = useDispatch();

  const homeSearch = () => {
    dispatch(setGeneral({searching:false,reset:true}))
  }

  return (
    <NavLink to="/" style={{ textDecoration:"none",color:"inherit" }} onClick={(event)=> homeSearch()}>
      <IconButton
        variant="primary"
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 0.5, p: 0, ml: ".5rem" }}
        disableRipple={true}
      >
        <MenuBookIcon sx={{ fontSize: 60 }} />
        <Typography sx={titleStyle} variant="h6">
          Restaurants Finder
        </Typography>
      </IconButton>
    </NavLink>
  );
};

export default Logo;
