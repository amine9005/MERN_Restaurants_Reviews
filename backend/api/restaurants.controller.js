import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    })

    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    }
    res.json(response)
  }

  static async apiGetRestaurantsById(req, res, next) {
    try{
      let id = req.params.id || {}
      let restaurant = await RestaurantsDAO.getRestaurantById(id)
      if(!restaurant){
        res.status(404).json({ message:"Unable to find restaurant"})
        return
      }
      res.status(200).json(restaurant)
    } catch(e){
      console.error('api error: ' + e.message)
      res.status(500).json({ error : e})
    }
  }

  static async apiGetRestaurantsCuisine(req, res, next) {
    try{
      let cuisines = await RestaurantsDAO.getCuisines()
      res.status(200).json(cuisines)
    } catch(e){
      console.error('api error:'+ e.message)
      res.status(500).json({ error : e})
    }
  }
}