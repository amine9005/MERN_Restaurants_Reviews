import http from "../components/Utilites/http-common";

class RestaurantDataService {
    getAll(page=0){
        return http.get(`?page=${page}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
      } 
}

export default new RestaurantDataService();