import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
// import { Restaurant } from "@mui/icons-material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { NavLink } from "react-router-dom";

const RestaurantCard = (restaurantJSON) => {
  const buttonStyle = {
    minHeight: "100%",
    fontSize: { sx: ".8rem", sm: "1rem" },
    borderRadius: "1rem",
  };
  const restaurant = restaurantJSON.restaurant;

  const iconStyle = {
    fontSize: { xs: 20, sm: 30 },
    mr: { xs: ".2rem", sm: "1rem" },
  };

  const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;

  return (
    <Card
      style={{
        minHeight: 180,
        minWidth: 220,
        margin: "0",
        padding: "0rem",
        borderRadius: "2rem",
      }}
      elevation={2}
    >
      <Grid container sx={{ padding: ".8rem" }} spacing={1.5}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
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
            <b>Address:</b> {address || "<address>"}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <NavLink to={"/view/"+restaurant._id} >
          <Button variant="outlined" size="large" fullWidth sx={buttonStyle}>
            <VisibilityIcon sx={iconStyle} /> View Reviews
          </Button>
          </NavLink>
        </Grid>

        <Grid item xs={6}>
          <a
            rel="noreferrer"
            target="_blank"
            href={"https://www.google.com/maps/place/" + address}
          >
            <Button variant="outlined" size="large" fullWidth sx={buttonStyle}>
              <TravelExploreIcon sx={iconStyle} /> View Map
            </Button>
          </a>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RestaurantCard;
