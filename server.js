require("dotenv").config();

//Hämtar Express, Mongoose CORS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());

//Anslutning till MongoDB
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Failed to connect to database" + error)
});

//Routes
app.get("/api", (rq, res) => {
    res.json("API is running");
})

//Lyssnar och startar applikationen på porten
app.listen(port, () => {
    console.log("Server started on port: " + port)
}); 