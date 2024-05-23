//https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/
//https://www.youtube.com/watch?v=-42K44A1oMA&t=784s

const express = require('express');
const mongoose = require('mongoose');

const port = 3001;
const uri = "mongodbawait+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; //username: gazellehunter24//password: f7y2YWbvDzCqiB4V//cluster0: isp2kui.mongodb.net
const uriWithCollectionName = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/studentmanagementsystem?retryWrites=true&w=majority&appName=Cluster0"; //username: gazellehunter24//password: f7y2YWbvDzCqiB4V//cluster0: isp2kui.mongodb.net
const databaseName = "studentmanagementsystem";

const app = express();
app.use(express.json()); // This tells the Express application to use middleware that automatically parses JSON formatted request bodies.
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(cors()); //Applies CORS middleware to allow cross-origin requests. (from differing ip addresses)

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});
                                            
mongoose // this block isn't running. Is there womething wrong with imports or syntax?
    .connect(uriWithCollectionName)
    .then(() => { // What does '.then()' do???
        console.log('App connected to database;');
        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed: " + error);
    });
// 9:10


