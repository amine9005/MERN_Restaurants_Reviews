import { Button, Card, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useSelector,useDispatch } from "react-redux";
import DeleteDialog from "./DeleteDialog";
import { useNavigate } from "react-router-dom";
import { setReview } from "../../../Redux/ReviewReducer";

const ReviewCard = (reviewJSON) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const generalSelector = useSelector((state) => state.general);
  const buttonStyle = {
    minHeight: "100%",
    fontSize: { sx: ".8rem", sm: ".8rem" },
    borderRadius: "1rem",
  };
  const review = reviewJSON.review;

  // console.log("review: " + JSON.stringify(review));
  // console.log("rating: " + parseFloat(review.rating));

  const iconStyle = {
    fontSize: { xs: 20, sm: 30 },
    mr: { xs: ".2rem", sm: "1rem" },
  };

  const handleEdit = ()=>{
    if (review) {
      dispatch(setReview({
        available:true,
        title:review.title,
        review:review.review,
        rating:review.rating,
      }))
      navigate("/view/" +review.restaurant_id + "/edit/" + review._id );
    }
    
  }

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
      {review ? (
        <Grid container sx={{ padding: ".8rem" }} spacing={0.5}>
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
            <Typography variant="h6">{review.review}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>User: </strong>
              {review.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Date: </strong>
              {review.date.split("T")[0]}
            </Typography>
          </Grid>

          {generalSelector.user_id === review.user_id && (
            <Grid item xs={6}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={buttonStyle}
                onClick={handleEdit}
              >
                <DriveFileRenameOutlineIcon sx={iconStyle} />
                  Edit Review
              </Button>
            </Grid>
          )}

          {generalSelector.user_id === review.user_id && (
            <Grid item xs={6}>
              <DeleteDialog review={{ review }} />
            </Grid>
          )}
        </Grid>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ReviewCard;
