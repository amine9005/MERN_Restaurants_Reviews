import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "../../../Redux/RestaurantsReducer.js";
import { NavLink } from "react-router-dom";
import {
  setCurrentPage,
  setGeneral,
  setSearchValue,
  // setSearchBy
} from "../../../Redux/GeneralReducer.js";

const NavBar = () => {
  const [filtter, setfiltter] = useState("");
  // const [searchBarValue, setSearchBarValue] = useState("");
  const dispatch = useDispatch();
  const general = useSelector((state) => state.general);

  const setSearchBarValue = (value) => {
    const by = filtter === "" ? "name" : filtter;
    dispatch(setSearchValue({ search_value:value, search_by: by }));
  };

  const search = () => {
    const by = filtter === "" ? "name" : filtter;
    // console.log(`searching by: ${by} with value: ${general.search_value} `);
    if (general.search_value.length > 1 || general.search_value.length === 0) {
      dispatch(
        setSearchValue({ search_value: general.search_value, search_by: by })
      );
      dispatch(setCurrentPage({ current_page: 1 }));
      dispatch(
        setRestaurants({
          isLoading: true,
          data: null,
          error: false,
          page_count: 0,
        })
      );
      RestaurantDataService.find(general.search_value, by, 0)
        .then((response) => {
          // console.log("searching: ", response.data);
          dispatch(
            setRestaurants({
              isLoading: false,
              data: response.data.restaurants,
              error: false,
              page_count: parseInt(response.data.total_results / 20),
            })
          );
          dispatch(setGeneral({ searching: true }));
        })
        .catch((err) => {
          console.log(err);
          dispatch(
            setRestaurants({
              isLoading: false,
              page_count: 0,
              data: [],
              error: true,
            })
          );
        });
    } else {
      console.log("search term too short");
    }
  };

  const searchOnEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const handleChange = (event) => {
    setfiltter(event.target.value);
  };

  const menuItemStyle = {
    fontSize: "1rem",
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
    minWidth: { xs: 50, sm: 80, md: 160 },
    ml: 1,
    flex: 1,
    fontSize: { xs: "1rem", sm: "1.5rem" },
  };

  const dividerStyle = { height: 28, m: 0.5 };

  const selectBoxStyle = {
    minWidth: { xs: 30, sm: 60, md: 120 },
    fontSize: "1.5rem",
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
        value={general.search_value}
        onChange={(event) => {
          setSearchBarValue(event.target.value);
        }}
        onKeyUp={(event) => searchOnEnter(event)}
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
            <MenuItem sx={menuItemStyle} value="">
              Name
            </MenuItem>
            <MenuItem sx={menuItemStyle} value="zipcode">
              Zipcode
            </MenuItem>
            <MenuItem sx={menuItemStyle} value="cuisine">
              Cuisine
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={dividerStyle} orientation="vertical" />

      <NavLink to="/">
        <IconButton
          onClick={(event) => search()}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </NavLink>
    </Paper>
  );
};

export default NavBar;
