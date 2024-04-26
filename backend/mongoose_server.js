const express = require('express');
const cors = require("cors");
const multer = require ("multer")
const MongoClient = require ("mongodb").MongoClient; //mongodb connection driver, returns object with bare variables
const { ObjectId, Int32 } = require('mongodb');  // Import ObjectId from mongodb to handle conversion of string _id to MongoDB's ObjectId
const app = express();

app.use(express.json()); // This tells the Express application to use middleware that automatically parses JSON formatted request bodies.
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); //Applies CORS middleware to allow cross-origin requests. (from differing ip addresses)

const mongoose = require('mongoose');

const port = 3001;
const uri = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const databaseName = "studentmanagementsystem";
//username: gazellehunter24
//password: f7y2YWbvDzCqiB4V
//cluster0: isp2kui.mongodb.net


//https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/

//instantiate mongodb connection
mongoose.connect(uri).then( () => {
    console.log("MongoDB Connection Succesful");
    app.listen(port, () => {
        console.log(`Backend server is running on http://localhost:${port}`);
    });
})
.catch((error)=>console.log(error));

//mongoose is a smiliar ting but it has it's on schemas that are based on the db scheema,

const studentSchema = new mongoose.Schema({
    id: Int32,
    name: String,
    email: String,
    course: String
});

//https://youtu.be/30p9QfybWZg?t=507

// //This method starts a server and begins listening for incoming connections on a specified port.
// app.listen(port, () => {

//     MongoClient.connect(uri, (error,client) => {
//         database = client.db(databaseName);
//         console.log("MongoDB Connection Succesful");
//         console.log(`Backend server is running on http://localhost:${port}`);
//     });
// });
// //https://expressjs.com/en/5x/api.html#app.listen


// //app.get(path, callback [, callback ...])
// //Routes HTTP GET requests to the specified path with the specified callback functions.
// app.get('/api/students/all-students', (request,response)=>{
//     database.collection("students").find({}).toArray((error,result)=>{
//         response.send(result);
        
//     })
// })

// // New route to get a student by _id
// app.get('/api/students/:_id', (req, res) => {
//     const studentId = req.params._id; // Get the _id from the URL parameter

//     database.collection("students").findOne({_id: ObjectId(studentId)}, (error, result) => {
//         if (error) {
//             res.status(500).send("Error accessing the database");
//         } else if (!result) {
//             res.status(404).send("No student found with that ID");
//         } else {
//             res.send(result);
//         }
//     });
// });

// // Route Setup: The route is defined to handle GET requests on /api/students/:_id where :_id is a placeholder for the student's _id you want to fetch.

// // ObjectId Conversion: MongoDB uses a special type called ObjectId for unique identifiers. The ObjectId function converts the string form of _id into this type so it can be correctly queried in the database.

// // Database Query: findOne method is used to find the first document that matches the given query. Here, it's looking for a document where _id matches the provided studentId.

// // Error Handling: The route handles errors gracefully:
// //     If there's a database access error, it returns a 500 status code with an error message.
// //     If no student is found with the given _id, it returns a 404 status code.
// //     Otherwise, it sends the found student data as the response.

// // app.post(path, callback [, callback ...])
// app.post('/api/students/add-students',multer().none(),(request,response)=>{
//     database.collection("students").count({},function(error,numOfDocs){
//         database.collection("students").insertOne({
//             id:(numOfDocs+1).toString(),
//             name:request.body.name,
//             email:request.body.email,
//             course:request.body.course,
//         });
//         response.send("Student Added");
//     });
// });

// //The count function in MongoDB is used to count the number of documents that match a certain condition. Here, it's used to count all documents in the students collection ({} matches all documents) to generate a new id for a newly added student.

// app.put('/api/students/update-student/:_id', (req, res) => {
//     const studentId = req.params._id;  // Extracting the ID from the request parameters
//     const updateData = {
//         name: req.body.name,
//         email: req.body.email,
//         course: req.body.course
//     };

//     database.collection("students").updateOne(
//         { _id: ObjectId(studentId) }, // Filter document by _id to find the specific student
//         { $set: updateData }  // Use the $set operator to update the student document
//     ).then(result => {
//         if (result.matchedCount === 0) {
//             res.status(404).send("No student found with that ID");  // No document matches the provided _id
//         } else {
//             res.send("Student updated successfully");  // Successfully updated the document
//         }
//     }).catch(error => {
//         res.status(500).send("Error updating student: " + error);  // Handling potential errors
//     });
// });

// // The $set operator in a MongoDB update operation specifies the fields to be updated in the document. It replaces the value of a field with the specified value without modifying any other fields in the document. In this code, it updates name, email, and course fields of a student document.
    

// // - [ ] what is an id parameter
// // :id route parameter is used to specify the id of the student to be deleted. The request.params object is used to access route parameters in Express. 
// // The deleteOne method is used to delete a single document that matches the specified filter (in this case, the student id).
// app.delete('/api/students/delete-students/:id', (request, response) => {
//     const studentId = request.params.id;
//     database.collection("students").deleteOne({ _id: new require('mongodb').ObjectId(studentId) })
//         .then(result => {
//             if (result.deletedCount === 0) {
//                 return response.status(404).send("No student found with that ID");
//             }
//             response.send("Student Deleted");
//         })
//         .catch(error => {
//             response.status(500).send("Error deleting student: " + error);
//         });
// });
 
 

// // - [x] what does multer do and what would happen to the code if it was removed?
// //          Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. 
// //          In this code, multer().none() is used to handle data that isn't associated with files, ensuring that only text fields are parsed and available in request.body.
// //          If removed: The code would fail to parse the incoming request data correctly in POST and PUT methods as Express does not handle multipart bodies by default. 
// //          This would lead to undefined fields when trying to access request.body parameters.
