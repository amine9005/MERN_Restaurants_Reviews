import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"
import cookieParser from "cookie-parser"
import corsOptions from "./config/corsOptions.js"
const app = express()


app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error: "Route Not found"}))

export default app