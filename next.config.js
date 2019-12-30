"use strict";

require("dotenv").config();
const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");

module.exports = withSass(withFonts({
  env: {
    DB: process.env.DB
  }
}));
