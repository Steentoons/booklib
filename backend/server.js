require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./config/db");
const cookieParser = require("cookie-parser")

//open for me the file where we are making the api request please

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

const bookRoutes = require("./routes/bookRoutes");
const categoryRoute = require("./routes/categoryRoute");
const authRoute = require("./routes/authRoute"); //open this guy
const userRoute = require("./routes/userRoute");
const fileRoutes = require("./routes/fileRoutes")
require("colors");
connect();


// Routes...

app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/authentication", authRoute);
app.use("/api/register", userRoute);
app.use("/api/media", fileRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));