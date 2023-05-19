import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let restaurants

export default class RestaurantsDAO {
    static async injectDB(conn){
        if (restaurants){
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch(e){
            console.error(
                `Unable to establish a collection handle in restaurnatsDAO ${e}`,
            )
        }
    }

    static async getRestaurants({
        filters = null ,
        page = 0,
        restaurantsPerPage = 20,
    } = {})

    {
        let qurey
        if (filters) {
            if ("name" in filters){
                //setup a text serach for any partial/complete matches with name
                qurey = {$text:{$search:filters["name"]}}
            } else if ("cuisine" in filters){
                qurey = {"cuisine": {$eq: filters["cuisine"]}}
            } else if ("zipcode" in filters){
                qurey = {"address.zipcode" :{$eq: filters["zipcode"]}}
            }
        }

        let cursor
        try{
            cursor = await restaurants.find(qurey)
        } catch(e) {
            console.error(`Unable to issue find command ${e}`)
            return {restaurantsList:[],totalNumRestaurants:0}
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try{
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(qurey)

            return {restaurantsList,totalNumRestaurants}
        } catch(e){
            console.log(`Unable to convert cursor to array or problem counting documents ${e}`)
            return {restaurantsList:[],totalNumRestaurants:0}
        }
    }

    static async getRestaurantById(id) {
        try {
          const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
                  {
                      $lookup: {
                          from: "reviews",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$restaurant_id", "$$id"],
                                      },
                                      
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "reviews",
                      },
                  },
                  {
                      $addFields: {
                          reviews: "$reviews",
                      },
                  },
              ]
          return await restaurants.aggregate(pipeline).next()
        } catch (e) {
          console.error(`Something went wrong in getRestaurantByID: ${e}`)
          throw e
        }
      }
    

    static async getCuisines(){
        try{
            const response = await restaurants.distinct("cuisine")
            return response
        } catch(e){
            console.error(`Unable to issue find command ${e}`)
            return 
        }
    }
}