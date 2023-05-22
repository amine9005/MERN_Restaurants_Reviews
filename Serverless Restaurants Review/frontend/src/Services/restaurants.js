import http from "../components/Utilites/http-common";

class RestaurantDataService {
    getAll(page=0){
        return http.get(`?page=${page}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
      } 
    
    getRestaurantByIdWithReviews(id) {
        return http.get(`/id/${id}`);
    }
}

export default new RestaurantDataService();