const exp = require('express');

const authorApp = exp.Router();
const expressAsyncHandler = require('express-async-handler')
const createUserAuthor = require('./CreateUserAuthor.js')
const cors = require('cors');
authorApp.use(cors({
    origin: "https://blogtech-tr0q.onrender.com",
    credentials: true
}));

// FROM CLERK
const { requireAuth } = require("@clerk/express");

require('dotenv').config();


const Article = require("../models/articleModel.js");


// API
authorApp.get("/", (req, res) => {
    res.send({ message: "from author api" })
})


// CREATE NEW AUTHOR
authorApp.post("/author", expressAsyncHandler(createUserAuthor));


// GET ARTICLES
authorApp.get("/articles", requireAuth({ signInUrl: "unauthorized" }), expressAsyncHandler(async (req, res) => {
    const listOfArticles = await Article.find({ isArticleActive: true });
    // const listOfArticles = await Article.find();
    res.status(200).send({ message: "articles", payload: listOfArticles })
}))

// FOR ALL ANUTHORIZED 
authorApp.get("/unauthorized", (req, res) => {
    res.send({ message: "Unauthorized request" })
})

// CREATE NEW ARTICLE
authorApp.post("/article", expressAsyncHandler(async (req, res) => {
    // get new article obj from req
    let newArticleObj = req.body;
    const newArticle = new Article(newArticleObj);
    const articleObj = await newArticle.save();
    res.status(201).send({ message: "article publishes", payload: articleObj });
}))


// MODIFY AN ARTICLY BY ARTICLE BY ID
authorApp.put("/article/:articleId", requireAuth({ signInUrl: "unauthorized" }), expressAsyncHandler(async (req, res) => {
    // get modified article
    const modifiedArticle = req.body;

    // update article by article id
    const dbRes = await Article.findByIdAndUpdate(modifiedArticle._id, { ...modifiedArticle }, { returnOriginal: false })
    // console.log(dbRes);


    // 🔍 Why Use the Spread Operator Here?
    // The spread operator is used to copy all the key-value pairs from the modifiedArticle object into a new object.
    //  This new object is then passed as the update.

    // We use the spread operator (...) to create a copy of the object with all its fields. 
    // This helps us avoid directly modifying the original object, especially when we need to exclude fields like _id that should not be updated in MongoDB.

    // send res
    res.status(200).send({ message: "article modified", payload: dbRes });
}))


// DELETE(soft) AN ARTICLY BY ARTICLE BY ID
authorApp.put("/articles/:articleId", requireAuth({ signInUrl: "unauthorized" }), expressAsyncHandler(async (req, res) => {
    // get modified article
    const modifiedArticle = req.body;

    // update article by article id
    const DeleteArticle = await Article.findByIdAndUpdate(modifiedArticle._id, { ...modifiedArticle }, { returnOriginal: false })


    // send res
    res.status(200).send({ message: "article deleted or restored", payload: DeleteArticle });
}))





module.exports = authorApp;