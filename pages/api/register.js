"use strict";

import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const saltRounds = 12;
const dbName = "stars-align";
const colName = "users";

export default async (req, res) => {
  const { username, password } = JSON.parse(req.body);

  const client = new MongoClient(process.env.DB, {
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const col = client.db(dbName).collection(colName);

    const usernameConflict = await col.findOne({ username: username });
    if (usernameConflict) {
      res.status(409).json({ message: "Username already taken" });
    } else {
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const result = await col.insertOne({
        username: username,
        password_hash: passwordHash,
        joined_on: new Date(),
        display_name: "@" + username,
        plan: "free"
      });

      res.status(200).json({ token: result.insertedId.toString() });
    }
  } catch (err) {
    const { response } = err;
    response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(500).json({ message: err.message });
  }

  client.close();
};
