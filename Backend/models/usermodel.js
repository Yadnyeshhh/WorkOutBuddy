const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("enter both email and password");
  }
  if (!validator.isEmail(email)) {
    throw Error("Enter valid email address");
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("enter a strong password");
  // }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//statics login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("enter both email and password");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("email does not exist");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
