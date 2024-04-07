const express = require('express');
var cors = require("cors");
const multer = require ("multer")
const MongoClient = require ("mongodb").MongoClient;

const app = express();
app.use(cors());
const port = 3001;
const CONNECTION_STRING = "mongodb://localhost:27017/StudentManagementSystem"
const DATABASENAME="StudentManagementSystem";

var database; 

app.listen(port, () => {
    MongoClient.connect(CONNECTION_STRING, (error,client) => {
        database = client.db(DATABASENAME);
        console.log("MongoDB Connection Succesful");
    });
    //.log(`Backend server is running on http://localhost:${port}`);
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




