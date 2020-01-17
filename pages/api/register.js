"use strict";

import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const saltRounds = 12;
const dbName = "stars-align";
const colName = "users";

export default async (req, res) => {
  const { username, password } = req.body;

  // Connect to dabatase
  const client = new MongoClient(process.env.DB, {
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const col = client.db(dbName).collection(colName);

    // Check for username conflict
    const usernameConflict = await col.findOne({ username: username });
    if (usernameConflict) {
      res.status(409).json({ message: "Username already taken" });
    } else {
      // Hash password
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Insert user into database
      const result = await col.insertOne({
        username: username,
        password_hash: passwordHash
      });

      // Send all-clear with _id as token
      res.status(200).json({ token: result.insertedId.toString() });
    }
  } catch (err) {
    const { response } = err;
    response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(500).json({ message: err.message });
  }

  // Disconnect from database
  client.close();
};
