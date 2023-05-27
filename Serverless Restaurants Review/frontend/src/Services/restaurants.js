import http from "../components/Utilites/http-common";

class RestaurantDataServiceClass {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  getRestaurantByIdWithReviews(id) {
    return http.get(`/id/${id}`);
  }

  getUserByUID(uid) {
    return http.get(`/users/id/${uid}`);
  }

  postUser(uid, name) {
    return http.post(`/users/add`, { user_id: uid, user_name: name });
  }

  postReview(reviewDoc) {
    return http.post("/reviews", reviewDoc);
  }

  deleteReview(reviewDoc) {
    return http.delete(`/reviews?id=${reviewDoc.review_id}`,{data:{user_id:reviewDoc.user_id}});
  }

  putReview(reviewDoc) {
    return http.put(`/reviews`, reviewDoc);
  }

  linkReview(reviewDoc) {
    return http.put(`/users/link`, reviewDoc);
  }

  getUserReviews(userId) {
    return http.get(`/users/${userId}/reviews`);
  }

  getReview(user_id,id){
    return http.get(`/reviews?restaurant_id=${id}&user_id=${user_id}`);
  }

  deleteReviewFromUser(user_id,restaurant_id) {
    return http.put(`/users/${user_id}/reviews?restaurant_id=${restaurant_id}`);
  }
}
const RestaurantDataService = new RestaurantDataServiceClass();
export default RestaurantDataService;
