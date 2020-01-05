"use strict";

import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const saltRounds = 12;
const dbName = "stars-align";
const colName = "users";

export default async (req, res) => {
  let { usernameOrEmail, password } = JSON.parse(req.body);
  if (usernameOrEmail.startsWith("@")) {
    usernameOrEmail = usernameOrEmail.slice(1);
  }

  const client = new MongoClient(process.env.DB, {
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const col = client.db(dbName).collection(colName);

    let user = await col.findOne({ username: usernameOrEmail });
    if (!user) {
      user = await col.findOne({ email: usernameOrEmail });
    }

    if (!user) {
      res.status(401).json({ message: "No user found" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (passwordMatch) {
        const idHash = await bcrypt.hash(user._id.toString(), saltRounds);
        res.status(200).json({ token: idHash });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    }
  } catch (err) {
    const { response } = err;
    response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(500).json({ message: err.message });
  }

  client.close();
};
