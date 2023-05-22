import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantDataService from "../../Services/restaurants.js";
import { Box, Grid, Typography } from "@mui/material";
import ReviewCard from "./ReviewsCard/index.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const RestaurantView = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    RestaurantDataService.getRestaurantByIdWithReviews(id)
      .then((res) => {
        console.log(res);
        setRestaurant(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const address = restaurant
    ? `${restaurant.data.address.building} ${restaurant.data.address.street} , ${restaurant.data.address.zipcode}`
    : "";

  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: '2.5rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.5rem',
    },
  };



  return (
    <Box sx={{ p: 4 }}>
      {restaurant ? (
        <Box>
          <Box sx={{ borderBottom: "3px solid #1eff00" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h3" color="#000">
                    <strong>{restaurant.data.name}</strong>
                  </Typography>
                </ThemeProvider>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h4" color="#000">
                  <strong>Cuisine: </strong> {restaurant.data.cuisine}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h4" color="#000">
                  <strong>Adress: </strong> {address}
                </Typography>
              </Grid>
            </Grid>
            <br />
          </Box>

          <br />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" color="#000" align="left">
                Reviews
              </Typography>
            </Grid>

            <Grid item xs={12} spacing={2}>
              <Grid container spacing={3}>
                {restaurant.data.reviews.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography variant="h5" align="left">
                      No reviews yet
                    </Typography>
                  </Grid>
                ) : (
                  restaurant.data.reviews.map((review) => (
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <ReviewCard review={review} />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        "No data"
      )}
    </Box>
  );
};

export default RestaurantView;
