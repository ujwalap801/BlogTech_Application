const exp = require('express');

const adminApp = exp.Router();



const Article = require('../models/articleModel');
const UserAuthor = require('../models/userAuthorModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET;
const Admin = require("../models/adminModel");

const expressAsyncHandler = require('express-async-handler')


const cookieParser = require('cookie-parser');
adminApp.use(cookieParser());

const cors = require("cors");

adminApp.use(cors({
  origin: "https://blogtech-tr0q.onrender.com",
  credentials: true
}));

// API
adminApp.get("/",(req,res)=>
{
    res.send({message:"from Adminapi"})
})


// Register first admin
adminApp.post("/register", async (req, res) => {
  const { username, email, password, securityAnswers, passcode } = req.body;

  const hashPass = await bcrypt.hash(password, 10);
  const hashCode = await bcrypt.hash(passcode, 10);

  const admin = new Admin({
    username,
    email,
    password: hashPass,
    securityAnswers,
    passcode: hashCode
  });

  await admin.save();
  res.status(201).json({ msg: "Admin registered" });
});



// Register new admin via passcode
adminApp.post("/register-new", async (req, res) => {
  const { username, email, password, securityAnswers, passcode } = req.body;

  const currentAdmin = await Admin.findOne();
  if (!currentAdmin) return res.status(404).json({ msg: "No admin to verify passcode" });

  const match = await bcrypt.compare(passcode, currentAdmin.passcode);
  if (!match) return res.status(403).json({ msg: "Invalid passcode" });

  const hashPass = await bcrypt.hash(password, 10);
  const hashCode = await bcrypt.hash(passcode, 10);

  const newAdmin = new Admin({
    username,
    email,
    password: hashPass,
    securityAnswers,
    passcode: hashCode
  });

  await newAdmin.save();
  res.status(201).json({ msg: "New admin registered", payload:newAdmin });
});





adminApp.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Ensure all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Find admin by both username and email
    const admin = await Admin.findOne({ username, email });

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    // Sign JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // Set token in HttpOnly cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // true in production with HTTPS
        maxAge: 15 * 60 * 1000,
      })
      .json({ msg: "Logged in" });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// TO recover as admin
// Recover
adminApp.post("/recover", async (req, res) => {
  const { username, email, food, bestFriend } = req.body;
  // const admin = await Admin.findOne({ username, email });
  const admin = await Admin.findOne({
  $or: [{ username }, { email }]
});

  if (!admin) return res.status(404).json({ msg: "Admin not found" });

  const isFoodMatch = admin.securityAnswers.food.toLowerCase() === food.toLowerCase();
  const isBFMatch = admin.securityAnswers.bestFriend.toLowerCase() === bestFriend.toLowerCase();

  if (!isFoodMatch || !isBFMatch) return res.status(401).json({ msg: "Answers do not match" });

  const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "15m" });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
    maxAge: 15 * 60 * 1000
  }).json({ msg: "Recovered and logged in" });
});



// NEW ADMIN WITH PASSCODE
// Register new admin via passcode
adminApp.post("/register-new", async (req, res) => {
  const { username, email, password, securityAnswers, passcode } = req.body;

  const currentAdmin = await Admin.findOne();
  if (!currentAdmin) return res.status(404).json({ msg: "No admin to verify passcode" });

  const match = await bcrypt.compare(passcode, currentAdmin.passcode);
  if (!match) return res.status(403).json({ msg: "Invalid passcode" });

  const hashPass = await bcrypt.hash(password, 10);
  const hashCode = await bcrypt.hash(passcode, 10);

  const newAdmin = new Admin({
    username,
    email,
    password: hashPass,
    securityAnswers,
    passcode: hashCode
  });

  await newAdmin.save();
  res.status(201).json({ msg: "New admin registered" });
});




// Logout
adminApp.post("/logout", (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out" });
});

// Middleware for auth
const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Protected route
adminApp.get("/dashboard", requireAuth, expressAsyncHandler(async(req, res) => {

  // res.json({ msg: "Welcome, admin", id: req.user.id });
  try {
    const usersList = await UserAuthor.find(); // Fetch all users
    res.status(200).json({ users: usersList });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
}));


// Get all articles
adminApp.get('/articles', expressAsyncHandler(async (req, res) => {

        const listOfArticles = await Article.find({isArticleActive:true});
        console.log(listOfArticles);
    res.status(200).send({ message: "articles", payload: listOfArticles })
  
}));


//Block or unblock a user/author by email

adminApp.put('/block-user',expressAsyncHandler(async (req, res) => {
    const { email, block, message } = req.body;


        const user = await UserAuthor.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User/Author not found' });
        }
        user.isActive = block;
        user.blockMessage = block ? (message || 'Your account is blocked') : '';
        await user.save();
        res.json({ message: block ? 'User blocked' : 'User unblocked' });
   
}));



module.exports = adminApp;


