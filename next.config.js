"use strict";

require("dotenv").config();
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  env: {
    DB: process.env.DB
  }
});
