"use strict";

require("dotenv").config();
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  env: {
    DB: process.env.DB
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        "file-loader",
      ],
    })
    return config;
  }
});
