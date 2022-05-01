const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      req.isAuth = true;
      next();
    } catch (error) {
      req.isAuth = false;
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    req.isAuth = false;
    res.status(401);
    return next();
  }
});

module.exports = { protect };
