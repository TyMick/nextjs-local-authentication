"use strict";

require("dotenv").config();

module.exports = {
  env: {
    DB: process.env.DB,
    HOST: process.env.HOST,
  },
};
