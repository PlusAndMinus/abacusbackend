const express = require("express");
const jwt = require("jsonwebtoken");

function validateUser(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  // const token = req.headers['x-access-token']
  const private_key = process.env.PRIVATE_KEY || "";
  jwt.verify(token, private_key, (err, decoded) => {
    if (err) {
      res.status(400).json({
        status: "session expired!",
        message: err,
      });
    } else {
      console.log(decoded);
      req.body.userId = decoded._id;
      next();
    }
  });
}

module.exports = validateUser;
