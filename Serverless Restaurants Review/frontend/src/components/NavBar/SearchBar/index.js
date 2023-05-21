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
import RestaurantDataService from "../../../Services/restaurants.js";
import { useDispatch } from "react-redux";
import { setRestaurants } from "../../../Redux/RestaurantsReducer.js";

const NavBar = () => {
  const [filtter, setfiltter] = React.useState("");
  const [searchBarValue, setSearchBarValue] = React.useState("");
  const dispatch = useDispatch();

  const search = () => {
    const by = filtter === "" ? "name" : filtter;
    console.log(`searching by: ${by} with value: ${searchBarValue} `);
    if (searchBarValue.length > 2 ||searchBarValue.length===0 ) {
      RestaurantDataService.find(searchBarValue,by,0 )
      .then((res) => {
        console.log("searching: ", res.data);
        dispatch(
          setRestaurants({
            data: res.data.restaurants,
            error: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setRestaurants({
            data: [],
            error: true,
          })
        );
      });
    } else {
      console.log("search term too short")
    }
    
  };

  const searchOnEnter = (e)=>{
    if (e.key === "Enter") {
      search();
    }
  }

  const handleChange = (event) => {
    setfiltter(event.target.value);
  };

  const paperStyle = {
    m: 1,
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: { xs: "100%", sm: 330, md: 400, ml: 600 },
    borderRadius: ".8rem",
  };

  const inputBaseStyle = {
    minWidth: { xs: 70, sm: 120 },
    ml: 1,
    flex: 1,
    fontSize: { xs: "1rem", sm: "1.5rem" },
  };

  const dividerStyle = { height: 28, m: 0.5 };

  const selectBoxStyle = {
    minWidth: { xs: 30, sm: 100 },
  };

  const selectStyle = {
    fontSize: "1rem",
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
  };

  return (
    <Paper component="form" sx={paperStyle}>
      <InputBase
        sx={inputBaseStyle}
        placeholder="Find Restaurant"
        inputProps={{ "aria-label": "find resturant" }}
        value={searchBarValue}
        onChange={(event) => {
          setSearchBarValue(event.target.value);
        }}
        onKeyUp={(event)=> searchOnEnter(event)}
      />
      <Divider
        sx={{ height: 28, m: 0.5, display: { xs: "none", sm: "initial" } }}
        orientation="vertical"
      />

      <Box sx={selectBoxStyle}>
        <FormControl fullWidth>
          <Select
            value={filtter}
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

      <IconButton
        onClick={(event) => search()}
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default NavBar;
