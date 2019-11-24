"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (col) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      try {
        const user = await col.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username."});
        }
        if (!bcrypt.compareSync(password, user.passport)) {
          return done(null, false, { message: "Incorrect password."});
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  )
}