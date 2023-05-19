import { React, useState } from "react";
import "./index.scss";
import {
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  InputLabel,
} from "@mui/material";
import theme from "../../styles/styles";
import { ThemeProvider } from "@mui/material/styles";

const AddReview = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        
        <Card style={{ maxWidth:600,margin:"2rem auto",padding:"1rem 1rem",borderRadius:"2rem"}}>
        <Typography variant="h4" align="center">
            Add Review
        </Typography>
          <CardContent>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={3}
                    label="Review"
                    placeholder="This is ..."
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Review"
                    placeholder="This is ..."
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} >
                    <InputLabel>Rating</InputLabel>
                    <Rating size="large" style={{ margin:"0 auto" }} name="half-rating" defaultValue={2.5} 
                    precision={0.5} />
                </Grid>


                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default AddReview;
