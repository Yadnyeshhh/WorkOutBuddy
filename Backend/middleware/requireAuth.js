const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "authorization tocken requred" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "request is not authorized" });
  }
};

module.exports = requireAuth;
