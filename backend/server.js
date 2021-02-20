const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

//Notfound and Error middleware 
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//Connect database file 
const connectDB = require("./config/db");

//Routes 

const userRoutes = require("./routes/userRoutes");

//DotENV config
dotenv.config();

//Connect to database 
connectDB();

//Initialise app
const app = express();

//Body Parser
app.use(express.json());

//Home api route
app.get("/", (req, res) => {
    res.send("API is running");
});

//Mounting our routes
app.use('/api/users', userRoutes)


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5005;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);