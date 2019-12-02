"use strict";

import bcrypt from "bcrypt";
import { MongoClient, ObjectId } from "mongodb";

const saltRounds = 12;
const dbName = "stars-align";
const colName = "users";

export default async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);

  const client = new MongoClient(process.env.DB, {
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const col = client.db(dbName).collection(colName);

    const result = await col.insertOne({
      username,
      password_hash: hash,
      joined_on: new Date(),
      display_name: "@" + username,
      plan: "free"
    });

    
  }
}