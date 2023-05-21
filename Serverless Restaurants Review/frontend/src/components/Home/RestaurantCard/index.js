import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
// import { Restaurant } from "@mui/icons-material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VisibilityIcon from "@mui/icons-material/Visibility";

const RestaurantCard = (restaurantJSON) => {

  const buttonStyle = { minHeight: "100%",fontSize:{sx:"1rem",sm:"1.2rem"} }
  const restaurant = restaurantJSON.restaurant
  
  return (
    <Card
      style={{
        minHeight: 180,
        minWidth: 240,
        margin: "0",
        padding: ".5rem .5rem",
        borderRadius: "2rem",
      }}
      elevation={2}
      
    >
      <Grid container sx={{ padding: ".8rem" }} spacing={1.5}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" >
            {restaurant.name || "Restaurant Title"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            <b>Cuisine:</b> {restaurant.cuisine || "<cuisine>"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            <b>Address:</b> Building {restaurant.address.building || "<building>"} , 
            {restaurant.address.street || "<street>"}
          </Typography>
        </Grid>

        {/* <Grid item xs={12}>
          <Typography variant="h6">
            <b>Buiilding:</b> {restaurant.address.building || "<building>"} 
           
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            <b>Street:</b> {restaurant.address.street || "<street>"},

          </Typography>
        </Grid> */}

        {/* <Grid item xs={12}>
          <Typography variant="h6">
            <b>Address:</b> {restaurant.address.building || "<building>"} ,
            {restaurant.address.street || "<street>"},
            {restaurant.address.zipcode || "<zipcode>"}
          </Typography>
        </Grid> */}

        <Grid item xs={6}>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            fullWidth
            sx={buttonStyle}
          >
            View Reviews
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="outlined"
            startIcon={<TravelExploreIcon />}
            fullWidth
            sx={buttonStyle}
          >
            View Map
          </Button>
        </Grid>


      </Grid>
    </Card>
  );
};

export default RestaurantCard;
