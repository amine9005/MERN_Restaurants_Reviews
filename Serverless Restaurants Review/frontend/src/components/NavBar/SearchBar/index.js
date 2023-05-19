import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NavBar = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const paperStyle = {
    m: 1,
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
    borderRadius:".5rem",
  };

  const inputBaseStyle = {
    minWidth: { xm: 80, sm: 200 },
    ml: 1,
    flex: 1,
    fontSize: {xs:"1rem",sm:"1.5rem"},
  };

  const dividerStyle = { height: 28, m: 0.5 };

  const selectBoxStyle = { display:{xs:"none",sm:"initial"}, minWidth: { xm: 60, sm: 120 } };

  const selectStyle = {
    fontSize: "1rem",
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
  }

  return (
    <Paper component="form" sx={paperStyle}>
      <InputBase
        sx={inputBaseStyle}
        placeholder="Find Restaurant"
        inputProps={{ "aria-label": "find resturant" }}
      />
      <Divider sx={{ height: 28, m: 0.5,display:{xs:"none",sm:"initial"} }} orientation="vertical" />

      <Box sx={selectBoxStyle}>

        <FormControl fullWidth>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            sx={selectStyle}
          >
            <MenuItem value="">Name</MenuItem>
            <MenuItem value="zipcode">Zipcode</MenuItem>
            <MenuItem value="cuisine">Cuisine</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={dividerStyle} orientation="vertical" />

      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default NavBar;
