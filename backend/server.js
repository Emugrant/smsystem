const express = require('express');
//const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;
// const cors = require("cors");
// const multer = require ("multer")
const Mongoclient = require ("mongodb").MongoClient;

const CONNECTION_STRING = "mongodb://localhost:27017/"
//const client = new MongoClient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });





const DATABASENAME="StudentManagementSystem";
var database; 

app.listen(port, () => {
    Mongoclient.connect(CONNECTION_STRING, (error,client) => {
        database = client.db(DATABASENAME);
        console.log("MongoDB Connection Succesful");
    });
    console.log(`Backend server is running on http://localhost:${port}`);
});

// async function connectDB() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//         // Further operations (CRUD) go here
//     } catch (error) {
//         console.error("Could not connect to MongoDB", error);
//     }
// }

// connectDB();

// app.listen(port, () => {
//     console.log(`Backend server is running on http://localhost:${port}`);
// });




