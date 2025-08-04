const userAuthor = require("../models/userAuthorModel");

async function createUserAuthor(req, res) {
  const newUserAuthor = req.body;

  try {
    const userInDB = await userAuthor.findOne({ email: newUserAuthor.email });

    if (userInDB !== null) {
      // If account is inactive (blocked by admin)
      if (!userInDB.isActive) {
        return res.status(403).send({
          message: "AccountBlocked",
          blockMessage:
            userInDB.blockMessage || "Your account is blocked. Please contact admin",
        });
      }

      //  If role matches, allow login
      if (newUserAuthor.role === userInDB.role) {
        return res
          .status(200)
          .send({ message: userInDB.role, payload: userInDB });
      } else {
        // Role mismatch
        return res.status(403).send({
          message: "RoleMismatch",
          info: "The selected role does not match our records.",
        });
      }
    } else {
      // Create new user with isActive: true
      const newUser = new userAuthor({
        ...newUserAuthor,
        isActive: true,
        blockMessage: "", // Optional: default message
      });

      const newUserAuthorDoc = await newUser.save();

      return res
        .status(201)
        .send({ message: newUserAuthorDoc.role, payload: newUserAuthorDoc });
    }
  } catch (err) {
    console.error("Error in createUserAuthor:", err);
    return res
      .status(500)
      .send({ message: "Server error", error: err.message });
  }
}


module.exports = createUserAuthor;