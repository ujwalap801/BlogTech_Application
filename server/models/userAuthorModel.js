const mongoose = require('mongoose');

// define user or Author Schema
const userAuthorSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    profileImageUrl: {
        type: String
   
    },
    isActive: {
        type: Boolean,
        required: true
    },
         blockMessage:{
            type:String
         }

}, { "strict": "throw" })


// Create model for user author Schema
const userAuthor = mongoose.model("userauthor", userAuthorSchema);
module.exports = userAuthor;

