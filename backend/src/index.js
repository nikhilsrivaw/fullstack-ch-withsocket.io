import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
const app  = express()

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
  connectDB()
})