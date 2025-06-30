const express = require("express");
const app = express();
const mongose = require("mongoose");
const cors = require("cors");
require('dotenv').config(); //process.env
// process is a global object in Node.js.
// It loads environment variables from a .env file into process.env so they can be accessed securely and easily within the Node.js application.

// We store the PORT in .env to allow flexibility across environments, keep our code clean, and follow best practices.
//  It makes deployment easier and is part of a secure and maintainable configuration strategy.


const { clerkMiddleware } = require("@clerk/express");
app.use(clerkMiddleware());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const userApp= require('./APIs/userAPI');
const adminApp = require('./APIs/adminAPI.js');
const authorApp = require("./APIs/authorAPI");

// parser
app.use(express.json())
// connect API Route
app.use("/user-api",userApp);
app.use("/admin-api",adminApp);
app.use("/author-api",authorApp);


// Database connection

const port = process.env.PORT;

async function main() {
    await mongose.connect(process.env.DBURL);
}

main()
    .then(() => app.listen(port, () => {
        console.log(`app is listening to ${port}`);
        console.log("Database Connected")

    })
    )
    .catch((err) => {
        console.log(err);
    })


    //error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler :",err)
    
    res.send({message:err.message})
})
