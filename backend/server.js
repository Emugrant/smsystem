//gazellehunter24
//f7y2YWbvDzCqiB4V

const express = require('express');
var cors = require("cors");
const multer = require ("multer")
const MongoClient = require ("mongodb").MongoClient;

const app = express();
app.use(cors());
const port = 3001;
const uri = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var databaseName = "studentmanagementsystem";

var database; 

app.listen(5038, () => {
    MongoClient.connect(uri, (error,client) => {
        database = client.db(databaseName);
        console.log("MongoDB Connection Succesful");
        console.log(`Backend server is running on http://localhost:${port}`);

    });
});



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);