import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000/api/v1/restaurants",
  baseURL: "https://restaurants-finder-api.onrender.com/api/v1/restaurants",
  
  headers: {
    "Content-type": "application/json"
  }
});