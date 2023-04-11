require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./config/db");

// Handling CORS...
// const corsMiddleware = require('./middlewares/corsMiddleware')
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//open for me the file where we are making the api request please

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // we got it... nice

// allow more cors with middleware...
// app.use(corsMiddleware);

const bookRoutes = require("./routes/bookRoutes");
const categoryRoute = require("./routes/categoryRoute");
const authRoute = require("./routes/authRoute"); //open this guy
const userRoute = require("./routes/userRoute");
const tokenRoute = require("./routes/tokenRoute");
require("colors");
connect();


// Routes...

app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/authentication", authRoute);
app.use("/api/register", userRoute);
app.use("/api/token", tokenRoute);
app.use("/api/authentication", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));