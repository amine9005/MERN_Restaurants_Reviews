import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import RestaurantDataService from "../../Services/restaurants.js";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurants } from "../../Redux/RestaurantsReducer";
import CircularProgress from "@mui/material/CircularProgress";
import { setCurrentPage, setGeneral } from "../../Redux/GeneralReducer";

const Home = () => {
  const [restaurants, setRestaurantsState] = useState([]);
  const restaurantsSelector = useSelector((state) => state.restaurants);
  const generalSelector = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const [updateView, setUpdateView] = useState(false);

  const setPage = (page) => {
    dispatch(setCurrentPage({ current_page: page }));
  };

  // console.log("rest: " + generalSelector.reset);
  const handlePageChange = (page) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setPage(page);
    setUpdateView(true);

    dispatch(
      setRestaurants({
        data: [],
        isLoading: true,
        error: false,
        page_count: 0,
      })
    );
  };

  useEffect(() => {
    if (generalSelector.search_value !== "" && updateView) {
      RestaurantDataService.find(
        generalSelector.search_value,
        generalSelector.search_by,
        generalSelector.current_page - 1
      )
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
          dispatch(setGeneral({ searching: false,reset:false }));
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
      setUpdateView(false);
    } else if (
      (restaurants.length === 0 && generalSelector.searching === false) ||
      generalSelector.reset ||
      updateView
    ) {
      // console.log("fetching: ", generalSelector.current_page);
      RestaurantDataService.getAll(generalSelector.current_page - 1)
        .then((response) => {
          // console.log("home , restaurants :", response.data);

          dispatch(
            setRestaurants({
              isLoading: false,
              data: response.data.restaurants,
              error: false,
              page_count: parseInt(response.data.total_results / 20),
            })
          );
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            setRestaurants({
              data: [],
              isLoading: false,
              error: true,
              page_count: 0,
            })
          );
        });
      setUpdateView(false);
      dispatch(setGeneral({ searching: false, reset: false}));
    }
    console.log("Home Updating");
    setRestaurantsState(restaurantsSelector);
  }, [
    generalSelector.reset,
    dispatch,
    restaurants.length,
    generalSelector.searching,
    restaurantsSelector,
    generalSelector.current_page,
    updateView,
    generalSelector.search_by,
    generalSelector.search_value,
  ]);

  return (
    <Grid
      container
      spacing={3}
      direction={restaurants.isLoading ? "column" : "row"}
      alignItems="center"
      justifyContent="center"
      sx={{ p: 4, minHeight: "100vh", minWidth: "100vw" }}
    >
      {restaurants.isLoading ? (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={100} />
          </Box>
        </Grid>
      ) : restaurants.error ? (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="h3" align="center">
            Unable to load restaurants
          </Typography>
        </Grid>
      ) : restaurants.data ? (
        restaurants.data.length > 0 ? (
          restaurants.data.map((restaurant) => (
            <Grid key={restaurant._id} item xs={12} sm={12} md={6} lg={4}>
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Typography variant="h3" align="center">
              No restaurants found
            </Typography>
          </Grid>
        )
      ) : (
        ""
      )}

      {restaurants.data
        ? restaurants.data.length > 0 && (
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex" }}>
              <Pagination
                page={
                  generalSelector.current_page ?? generalSelector.current_page
                }
                onChange={(e, p) => handlePageChange(parseInt(p))}
                size="large"
                sx={{ margin: "0rem auto" }}
                count={restaurants.page_count}
                variant="outlined"
                color="primary"
              />
            </Grid>
          )
        : ""}
    </Grid>
  );
};

export default Home;
