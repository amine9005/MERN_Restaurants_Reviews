import { Button, Card, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const ReviewCard = (reviewJSON) => {
  const buttonStyle = {
    minHeight: "100%",
    fontSize: { sx: ".8rem", sm: ".8rem" },
  };
  const review = reviewJSON.review;

  console.log("review: "+JSON.stringify(review));
  console.log("rating: "+parseFloat(review.rating));

  const iconStyle = {
    fontSize: { xs: 20, sm: 30 },
    mr: { xs: ".2rem", sm: "1rem" },
  };

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
      {review ? 
      <Grid container sx={{ padding: ".8rem" }} spacing={.5}>

      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          {review.title}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          <Rating
            style={{ margin: "0 auto", fontSize: "3rem" }}
            name="half-rating"
            defaultValue={parseFloat(review.rating)}
            precision={0.5}
            readOnly
          />
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">
          {review.text}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" >
          <strong>User: </strong>{review.name}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" >
          <strong>Date: </strong>{review.date.split("T")[0]}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        {/* <NavLink to={"/view/"+review._id} > */}
        <Button variant="outlined" size="large" fullWidth sx={buttonStyle}>
          <DriveFileRenameOutlineIcon sx={iconStyle} /> Edit Review
        </Button>
        {/* </NavLink> */}
      </Grid>

      <Grid item xs={6}>
        <Button variant="outlined" size="large" fullWidth sx={buttonStyle}>
          <DeleteIcon sx={iconStyle} /> Delete Review
        </Button>
      </Grid>
    </Grid>
      :""}
      
    </Card>
  );
};

export default ReviewCard;
