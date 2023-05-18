import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {

    static async apiGetRestaurants(req,res,next){
        const resturantsPerPage = req.qurey.resturantsPerPage ? 
            parseInt(req.qurey.resturantsPerPage,10):20
        const page = req.qurey.page ? parseInt(req.qurey.page,10):0

        let filters = {}
        if(req.qurey.cuisine){
            filters.cuisine = req.qurey.cuisine
        } else if (req.qurey.zipcode){
            filters.zipcode = req.qurey.zipcode
        } else if(req.qurey.name){
            filters.name = req.qurey.name
        }

        const {resturantsList , totalNumRestaurants} = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            resturantsPerPage,
        })

        let response = {
            restaurants: resturantsList,
            page:page,
            filters:filters,
            enteries_per_page: totalNumRestaurants,
            total_resualts: totalNumRestaurants,
        }

        res.json(response)

    }
}