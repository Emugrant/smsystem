const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017';
// Database name
const dbName = 'StudentManagementSystem';

// Create a new MongoClient
const client = new MongoClient(mongoUrl);

async function connectDb() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB");

    // Specify the database you want to access
    const db = client.db(dbName);

    return db;
  } catch (err) {
    console.error(err);
    // Ensure the client will close when you finish/error
    await client.close();
  }
}

// Example route
app.get('/students', async (req, res) => {
  const db = await connectDb();
  const collection = db.collection('Students');
  const students = await collection.find({}).toArray();
  res.json(students);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
