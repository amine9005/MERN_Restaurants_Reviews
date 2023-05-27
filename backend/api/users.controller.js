import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
  static async apiPostUser(req, res, next) {
    try {
      const user_id = req.body.user_id;
      const user_name = req.body.user_name;

      const response = await UsersDAO.addUser(user_id, user_name);
      res.status(200).json({ status: "User added successfully" });
    } catch (err) {
      res.status(500).json({ error: `Unable to add user: ${e.message}` });
    }
  }

  static async apiGetUser(req, res, next) {
    try {
      const user_id = req.params.id;
      const response = await UsersDAO.getUser(user_id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: `Unable to get user: ${e.message}` });
    }
  }

  static async apiPutReview(req, res, next) {
    try {
      const user_id = req.body.user_id;
      const restaurant_id = req.body.restaurant_id;
      const review_id = req.body.review_id;
      const response = await UsersDAO.addReviewLink(user_id, restaurant_id);
      res.status(200).json({ status: "Review added successfully" });
    } catch (err) {
      res.status(500).json({ error: `Unable to add review: ${e.message}` });
    }
  }

  static async apiGetReviews(req, res,next) {
    try{
        const user_id = req.params.uid;
        const response = await UsersDAO.getReviews(user_id);
        res.status(200).json(response);
    }catch(e){
        res.status(500).json({ error: `Unable to get reviews: ${e.message}` });
    }
  }

  static async apiPutRemoveReview(req, res, next) {

    try{
      const user_id = req.params.uid;
      const restaurant_id = req.query.restaurant_id;
      const response = await UsersDAO.putRemoveReview(user_id, restaurant_id)      
      res.status(200).json({status:"Review Delete successfully"})
    } catch(e){
      res.status(500).json({error:`Unable to delete review link: ${e.message}`})
    }
  }
}
