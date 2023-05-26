import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";
import UsersCtrl from "./users.controller.js";

const router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantsById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantsCuisine);
router.route("/users/id/:id").get(UsersCtrl.apiGetUser);
router.route("/users/add").post(UsersCtrl.apiPostUser);
router.route("/users/link").put(UsersCtrl.apiPutReview);
router.route("/users/:uid/reviews").get(UsersCtrl.apiGetReviews);

router
  .route("/reviews")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)
  .get(ReviewsCtrl.apiGetReview);

export default router;
