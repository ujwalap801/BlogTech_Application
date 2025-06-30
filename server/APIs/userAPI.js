const exp = require('express');

const userApp = exp.Router();
const userAuthor= require("../models/userAuthorModel.js");
const expressAsyncHandler = require('express-async-handler');
const createUserAuthor =require('./CreateUserAuthor.js');
const Article = require("../models/articleModel.js");

// API
userApp.get("/users",async(req,res)=>
{
    // get user
   let usersList= await userAuthor.find();
   res.send({message:"users",payload:usersList});
    
})

// CREATE NEW USER
userApp.post("/user",expressAsyncHandler(createUserAuthor));


// Add Comment
userApp.put("/comment/:articleId",expressAsyncHandler(async(req,res)=>
{
    //get comment obj
    const commentObj = req.body;

    // add commentObj to comments array of article
   const articleWithcomments= await Article.findOneAndUpdate(
        {articleId:req.params.articleId},
        {$push:{comments:commentObj}},
           { new: true } 
    )
    // send
    res.send({message:"comment added",payload:articleWithcomments})

}))
module.exports = userApp;