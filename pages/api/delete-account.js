"use strict";

import { MongoClient, ObjectId } from "mongodb";

const dbName = "nextjs-local-authentication";
const colName = "users";
const reservedId = "5e213bba0b4d41f76457723a";

export default async (req, res) => {
  let { userId } = req.body;

  // Prevent demo account from being changed
  if (userId === reservedId) {
    res.status(403).json({ message: "Changes to the demo account are prohibited" });
  } else {
    // Connect to database
    const client = new MongoClient(process.env.DB, {
      useUnifiedTopology: true
    });
    try {
      await client.connect();
      const col = client.db(dbName).collection(colName);

      // Delete user in database
      const result = await col.deleteOne({ _id: new ObjectId(userId) });

      if (result.deletedCount === 1) {
        // Mission accomplished
        res.status(200).json({ message: "User deleted in database" });
      } else {
        // Alert if no user found
        res.status(401).json({ message: "No user found" });
      }
    } catch (err) {
      const { response } = err;
      response
        ? res.status(response.status).json({ message: response.statusText })
        : res.status(500).json({ message: err.message });
    }

    // Disconnect from database
    client.close();
  }
};
