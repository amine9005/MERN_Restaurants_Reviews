import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { auth } from "../../../firebase.js";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setGeneral, updateCurrentUser } from "../../../Redux/GeneralReducer";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const generalSelector = useSelector((state) => state.general);
  const [user,setUser] = useState(null);

  useEffect(() => {
    setUser(generalSelector.user_id)
  },[generalSelector.user_id])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    if (user) {
      console.log("loging out user")
      signOut(auth)
        .then(() => {
          dispatch(
            setGeneral({
              searching: false,
              reset: true,
            })
          )
          dispatch(
            updateCurrentUser({
              user_id: null,
              user_name: null,
            })
          )
          console.log("user is now logged out")

        })
        .catch((erorr) => {
          console.log(erorr);
        });
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndRedirect = (path) => {
    setAnchorEl(null);
    navigate(path);
    console.log("user id ", user);
  };

  const handleCloseAndSignOut = () => {
    setAnchorEl(null);
    handleSignOut();
    console.log("user id ", user);
  };
  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ p: ".2rem", top: ".2rem", display: "flex" }}
      >
        <AccountCircle
          sx={{
            fontSize: { xs: 60, sm: 60, md: 60 },
            color: "#575757",
            m: "2px",
          }}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ? (
          <MenuItem onClick={handleCloseAndSignOut}>Logout</MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={(e) => handleCloseAndRedirect("/login")}>
              Login
            </MenuItem>
            <MenuItem onClick={(e) => handleCloseAndRedirect("/register")}>
              Register
            </MenuItem>
          </Box>
        )}
      </Menu>
    </div>
  );
};

export default UserAvatar;
