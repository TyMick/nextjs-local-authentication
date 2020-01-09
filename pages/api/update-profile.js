"use strict";

import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const saltRounds = 12;
const dbName = "stars-align";
const colName = "users";

export default async (req, res) => {
  let { userId, updates } = JSON.parse(req.body);

  // Connect to database
  const client = new MongoClient(process.env.DB, {
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const col = client.db(dbName).collection(colName);

    // Check for username conflict
    if (updates.username) {
      const usernameConflict = await col.findOne({
        username: updates.username
      });
      if (usernameConflict) {
        res.status(409).json({ message: "Username already taken" });
      } else {
        // Hash password if updating
        if (updates.password) {
          updates.password_hash = await bcrypt.hash(
            updates.password,
            saltRounds
          );
          delete updates.password;
        }

        // Update user in database
        const updateOp = await col.updateOne(
          { _id: userId },
          { $set: updates }
        );

        if (updateOp.result.nModified === 1) {
          // Send all-clear
          res.status(200);
        } else {
          // Alert if no user found
          res.status(401).json({ message: "No user found" });
        }
      }
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
