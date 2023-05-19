import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let reviews

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(restaurant_id, user, review, rating,date) {
    try {
      const reviewDoc = { 
          name: user.name,
          user_id: user._id,
          date: date,
          text: review,
          rating: rating,
          restaurant_id: new ObjectId(restaurant_id) , 
        }

      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(review_id, user_id, text,rating, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: user_id, _id: new ObjectId(review_id)},
        { $set: { text: text, rating:rating,date: date  } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(review_id, user_id) {

    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(review_id),
        user_id: user_id,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

}