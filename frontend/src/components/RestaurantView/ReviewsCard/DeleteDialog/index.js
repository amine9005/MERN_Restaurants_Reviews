import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantDataService from "../../../../Services/restaurants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteDialog = (reviewJSON) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const general = useSelector((state)=>state.general)
  const review = reviewJSON.review.review;
  console.log("review: " + JSON.stringify(review))

  const buttonStyle = {
    minHeight: "100%",
    fontSize: { sx: ".8rem", sm: ".8rem" },
    borderRadius: "1rem",
  };

  const iconStyle = {
    fontSize: { xs: 20, sm: 30 },
    mr: { xs: ".2rem", sm: "1rem" },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteReview = () => {
    const reviewDoc = {
        user_id: general.user_id,
        review_id: review._id
    }
    RestaurantDataService.deleteReview(reviewDoc).then(() =>{
      RestaurantDataService.deleteReviewFromUser(general.user_id,review.restaurant_id)
      .then(() =>{
        navigate(0)

      }).catch((e)=>{
        console.log("Error deleting link from user: " + e.message)
      })
    }).catch((e)=>{
      console.log(e)
    })

    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" size="large" fullWidth onClick={handleClickOpen} sx={buttonStyle}>
        <DeleteIcon sx={iconStyle} /> Delete Review
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete This Review?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this review ? this action can't be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={deleteReview} sx={{ color:"red" }}>
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
