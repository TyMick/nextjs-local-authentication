"use strict";

import { MongoClient, ObjectID } from "mongodb";

const dbName = "stars-align";
const colName = "users";

export default async (req, res) => {
  // Check for authorization and grab _id token
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Authorization header missing");
  }
  const auth = req.headers.authorization;
  const { token } = JSON.parse(auth);

  // Connect to database
  const client = new MongoClient(process.env.DB, {
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const col = client.db(dbName).collection(colName);

    // Find user
    const user = await col.findOne(
      { _id: new ObjectID(token) },
      {
        projection: {
          username: 1,
          display_name: 1,
          plan: 1
        }
      }
    );

    // Alert if no user found
    if (!user) {
      res.status(401).json({ message: "No user found" });
    } else {
      // Send all-clear with user data
      res.status(200).json({
        userData: {
          username: user.username,
          displayName: user.display_name,
          plan: user.plan
        }
      });
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
