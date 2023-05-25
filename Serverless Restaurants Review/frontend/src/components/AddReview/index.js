import { React, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import RestaurantDataService from "../../Services/restaurants.js";
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";

const AddReview = () => {
  const [rating, setRating] = useState(2.5);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const general = useSelector((state) => state.general);
  const { id } = useParams();
  const [titleError, setTitleError] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  const Colors = {
    primary: "#1eff00",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.primary,
      },
    },
  });

  const addReview = () => {
    if (title.length === 0) {
      setTitleError(true);
      return;
    }
    if (review.length === 0) {
      setReviewError(true);
      return;
    }
    const reviewDoc = {
      title: title,
      rating: rating,
      review: review,
      date: new Date(),
      user_id: general.user_id,
      name: general.user_name,
      restaurant_id: id,
    };
    RestaurantDataService.postReview(reviewDoc)
      .then(() => {
        console.log("review added successfully", reviewDoc);
        Navigate("/view/" + id);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const setReviewAndError = (e) => {
    setReview(e);
    setTitleError(false);
    setReviewError(false);
  };

  const setTitleAndError = (e) => {
    setTitle(e);
    setTitleError(false);
    setReviewError(false);
  };

  return (
    <Container>
      <Card
        elevation={3}
        style={{
          maxWidth: 600,
          margin: "3rem auto",
          padding: "1rem 1rem",
          borderRadius: "2rem",
        }}
      >
        <Typography variant="h4" align="center">
          Add Review
        </Typography>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                <Rating
                  style={{ margin: "0 auto", fontSize: "3rem" }}
                  name="half-rating"
                  defaultValue={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  precision={0.5}
                />
              </Typography>
            </Grid>

            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  onChange={(e) => {
                    setTitleAndError(e.target.value);
                  }}
                  InputProps={{
                    style: { fontSize: 24, borderRadius: "1rem" },
                  }}
                  InputLabelProps={{ style: { fontSize: 24 } }}
                  fullWidth
                  required
                  error={titleError}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  label="Review"
                  error={reviewError}
                  onChange={(e) => {
                    setReviewAndError(e.target.value);
                  }}
                  variant="outlined"
                  InputProps={{
                    style: { fontSize: 24, borderRadius: "1rem" },
                  }}
                  InputLabelProps={{ style: { fontSize: 24 } }}
                  fullWidth
                  required
                />
              </Grid>
            </ThemeProvider>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="outlined"
                sx={{ height: 60, borderRadius: "1rem", fontSize: "1.5rem" }}
                onClick={addReview}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddReview;
