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
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setReview } from "../../Redux/ReviewReducer.js";

const EditReview = () => {
  const general = useSelector((state) => state.general);
  const reviewObj = useSelector((state) => state.review);

  console.log("reviewObj", reviewObj);

  const navigate = useNavigate();
  const [rating, setRating] = useState(parseFloat(reviewObj.rating));
  const [reviewText, setReviewText] = useState(reviewObj.review);
  const [title, setTitle] = useState(reviewObj.title);
  const { review_id, restaurant_id } = useParams();
  const [titleError, setTitleError] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const dispatch = useDispatch();

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
    if (reviewText.length === 0) {
      setReviewError(true);
      return;
    }
    const reviewDoc = {
      title: title,
      rating: rating,
      review: reviewText,
      date: new Date(),
      user_id: general.user_id,
      review_id: review_id,
    };
    RestaurantDataService.putReview(reviewDoc)
      .then(() => {
        console.log("review added successfully", reviewDoc);
        navigate("/view/" + restaurant_id);
        dispatch(
          setReview({
            available: false,
            title: null,
            review: null,
            rating: null,
          })
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const setReviewAndError = (e) => {
    setReviewText(e);
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
          Edit Review
        </Typography>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                <Rating
                  style={{ margin: "0 auto", fontSize: "3rem" }}
                  name="half-rating"
                  value={rating ?? null}
                  onChange={(e) => {
                    setRating(parseFloat(e.target.value));
                  }}
                  precision={0.5}
                />
              </Typography>
            </Grid>

            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  defaultValue={title}
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
                  value={reviewText}
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

export default EditReview;
