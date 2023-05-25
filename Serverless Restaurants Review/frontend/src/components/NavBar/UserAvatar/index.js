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

import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

const UserAvatar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const generalSelector = useSelector((state) => state.general);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(generalSelector.user_id);
  }, [generalSelector.user_id]);


  const handleSignOut = () => {
    if (user) {
      console.log("loging out user");
      signOut(auth)
        .then(() => {
          dispatch(
            setGeneral({
              searching: false,
              reset: true,
            })
          );
          dispatch(
            updateCurrentUser({
              user_id: null,
              user_name: null,
            })
          );
          console.log("user is now logged out");
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          p: 0,
          m: 0,
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {generalSelector.user_id ? (
              <AccountCircle
                sx={{ width: 62, height: 62, mt: ".2rem" }}
              ></AccountCircle>
            ) : (
              <AccountCircle
                sx={{ width: 62, height: 62, mt: ".2rem", color: "#fff" }}
              ></AccountCircle>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 30,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {generalSelector.user_id ? (
          <MenuItem onClick={handleCloseAndSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={(e) => handleCloseAndRedirect("/login")}>
              <Avatar /> Login
            </MenuItem>
            <MenuItem onClick={(e) => handleCloseAndRedirect("/register")}>
              <Avatar /> Register
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default UserAvatar;
