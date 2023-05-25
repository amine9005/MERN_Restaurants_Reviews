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
}
const RestaurantDataService = new RestaurantDataServiceClass();
export default RestaurantDataService;
