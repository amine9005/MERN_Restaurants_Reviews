import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let restaurants;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurnatsDAO ${e}`
      );
    }
  }

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    // console.log("Page: ", page, " Restaurants per page: ", restaurantsPerPage);
    let pipeline = [];
    let workingPipeline;
    if (filters) {
      if ("name" in filters) {
        pipeline = [
          {
            $search: {
              index: "default",
              text: {
                query: filters["name"],
                path: ["name"],
                fuzzy: {},
              },
            },
          },
        ];
        // qurey = {$text:{$search:filters["name"]}}
      } else if ("cuisine" in filters) {
        pipeline = [
          {
            $search: {
              index: "default",
              text: {
                query: filters["cuisine"],
                path: ["cuisine"],
                fuzzy: {},
              },
            },
          },
        ];
        // qurey = {"cuisine": {$eq: filters["cuisine"]}}
      } else if ("zipcode" in filters) {
        pipeline = [
          {
            $search: {
              index: "default",
              text: {
                query: filters["zipcode"],
                path: ["address.zipcode"],
                fuzzy: {},
              },
            },
          },
        ];
        // qurey = {"address.zipcode" :{$eq: filters["zipcode"]}}
      }
    }
    workingPipeline = structuredClone(pipeline);
    workingPipeline.push(
      {
        $limit: restaurantsPerPage + (restaurantsPerPage * page),
      },
      { $skip: restaurantsPerPage * page }
    );
    let cursor;
    try {
      cursor = await restaurants.aggregate(workingPipeline);
    } catch (e) {
      console.error(`Unable to issue find command ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    // const displayCursor = cursor
    //   .limit(restaurantsPerPage)
    //   .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await cursor.toArray();
      //   console.log("pipeline: ", pipeline)
      pipeline.push({
        $count: "count",
      });
      let totalNumRestaurants = await restaurants.aggregate(pipeline).toArray();
      totalNumRestaurants = totalNumRestaurants[0]["count"];

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.log(
        `Unable to convert cursor to array or problem counting documents ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
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
      ];
      return await restaurants.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }

  static async getCuisines() {
    try {
      const response = await restaurants.distinct("cuisine");
      return response;
    } catch (e) {
      console.error(`Unable to issue find command ${e}`);
      return;
    }
  }
}
