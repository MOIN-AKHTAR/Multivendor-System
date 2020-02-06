const Mongoose = require("mongoose");
const Validator = require("validator");
const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const Schema = Mongoose.Schema;
const userSchema = Schema({
  firstName: {
    type: String,
    required: [true, "Please Provide Firstname"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Please Provide Lastname"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    trim: true,
    unique: [true, "This Email Already In Use"],
    validate: [Validator.isEmail, "Please Provide Valid Email"]
  },
  password: {
    type: String,
    required: [true, "Please Prove Your Password"]
  }
});

// Methods
userSchema.methods.MatchPassword = async (Password, UserPassword) =>
  Bcrypt.compare(Password, UserPassword);

userSchema.methods.GenerateToken = Id => Jwt.sign({ Id }, "Islam Is Love");

userSchema.statics.VerifyToken = Token => Jwt.verify(Token, "Islam Is Love");

// Hooks
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await Bcrypt.hash(this.password, 12);
  next();
});

const UserModel = Mongoose.model("User", userSchema);
module.exports = UserModel;
