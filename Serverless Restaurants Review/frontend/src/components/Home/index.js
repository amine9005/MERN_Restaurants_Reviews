import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Box, Grid, Typography } from "@mui/material";
import RestaurantDataService from "../../Services/restaurants.js";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurants } from "../../Redux/RestaurantsReducer";
import CircularProgress from '@mui/material/CircularProgress';


const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const restaurantsSelector = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {

    RestaurantDataService.getAll()
      .then((response) => {
        console.log("home , restaurants :", response.data);
        dispatch(
          getRestaurants({
            isLoading: false,
            data: response.data.restaurants,
            error: false,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(getRestaurants({ isLoading: false, data: null, error: true }));
      });
      
    setRestaurants(restaurantsSelector);
  }, [restaurantsSelector,dispatch]);



  return (
    <Grid
      container
      spacing={3}
      direction={restaurants.isLoading ? "column" : "row"}
      alignItems="center"
      justifyContent="center"
      sx={{ p:4, minHeight: '100vh',minWidth: '100vw' }}
    >
      {restaurants.isLoading? 
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress size={100} />
          </Box>
        </Grid>
        

        : restaurants.error ? 
        "error"

        : restaurants.data ? restaurants.data.map((restaurant) => (
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <RestaurantCard restaurant={restaurant} />
            </Grid>
          )):''
      }

    </Grid>
  );
};

export default Home;
