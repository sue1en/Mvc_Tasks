const jwt = require('jsonwebtoken');
const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const cors = require("cors")
require("dotenv").config();
require("../auth.passport")(passport);
require("dotenv").config();

const autorizar = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/login")
};
  
module.exports = autorizar;