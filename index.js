const express = require("express");
const app = express();
//MongoDB connection
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users'); 
const moviesRoute = require('./routes/movies'); 
const listsRoute = require('./routes/lists'); 

dotenv.config();

mongoose.connect(process.env.MONGO_URL , {
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(() => console.log('DB Connection Successful!!'))
.catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", moviesRoute)
app.use("/api/lists", listsRoute)

app.get('/', (req, res) => {
    res.send("hello to netflix API");
})

app.use(express.json({ limit : "100mb" })); 
app.use(express.urlencoded({ limit:"100mb", extended: false }));

app.listen(process.env.PORT || 8800, () => {
    console.log("backend server is running")
})
