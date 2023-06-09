import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addReview(restaurant_id, user, review, rating, title, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        title: title,
        review: review,
        rating: rating,
        restaurant_id: new ObjectId(restaurant_id),
      };

      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(review_id, user_id, title, review, rating, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: user_id, _id: new ObjectId(review_id) },
        { $set: { review: review, title: title, rating: rating, date: date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(review_id, user_id) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(review_id),
        user_id: user_id,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getReview(user_id, restaurant_id) {

    try {
      const response = await reviews.find(
        {"user_id": {$eq:user_id},"restaurant_id": {$eq:new ObjectId(restaurant_id)}}
      ).toArray();
      return response;
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
    }
  }
}
