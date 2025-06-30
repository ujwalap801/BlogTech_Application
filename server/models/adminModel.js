
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  securityAnswers: {
    food: String,
    bestFriend: String
  },
  passcode: { type: String }
});



// export default mongoose.model("Admin", adminSchema);
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
