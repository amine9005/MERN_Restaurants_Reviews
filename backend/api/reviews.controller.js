import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurant_id = req.body.restaurant_id
      const review = req.body.review
      const rating = req.body.rating
      const title = req.body.title
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview(
        restaurant_id,
        userInfo,
        review,
        rating,
        title,
        date,
      )
      res.status(200).json({ status: "review added seccussfuly" })
    } catch (e) {
      res.status(500).json({ error: `Unable to add review: ${e.message}` })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const review_id = req.body.review_id
      const review = req.body.review
      const rating = req.body.rating
      const title = req.body.title
      const date = new Date()
      const userId = req.body.user_id

      const reviewResponse = await ReviewsDAO.updateReview(
        review_id,
        userId,
        title,
        review,
        rating,
        date,
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.status(200).json({ status: "review updated seccussfuly" })
    } catch (e) {
      res.status(500).json({ error: `Unable to update review: ${e.message}` })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const review_id = req.query.id
      const userId = req.body.user_id
      const reviewResponse = await ReviewsDAO.deleteReview(
        review_id,
        userId,
      )
      res.status(200).json({ status: "review deleted seccussfuly" })
    } catch (e) {
      res.status(500).json({ error: `Unable to delete review: ${e.message}` })
    }
  }

  static async apiGetReview(req, res,next) {
    try{
      const restaurant_id = req.query.restaurant_id
      const user_id = req.query.user_id
      const reviewResponse = await ReviewsDAO.getReview(user_id, restaurant_id)
      res.status(200).json(reviewResponse)
    }catch(e){
      res.status(500).json({ error: `Unable to find review: ${e.message}` })
    }
  }

}