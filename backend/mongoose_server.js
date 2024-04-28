const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3001;
const uri = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const databaseName = "studentmanagementsystem";
//username: gazellehunter24
//password: f7y2YWbvDzCqiB4V
//cluster0: isp2kui.mongodb.net


//https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/


//instantiate mongodb connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => {
    console.log("MongoDB Connection Succesful");
    app.listen(port, () => {
        console.log(`Backend server is running on http://localhost:${port}`);
    });
})
.catch((error)=>console.log(error));

//mongoose is a smiliar ting but it has it's on schemas that are based on the db scheema, 

const studentSchema = new mongoose.Schema({
    // _id: ObjectId,
    id: String,
    name: String,
    email: String,
    course: String
});

//https://youtu.be/30p9QfybWZg?t=507

const studentModel = mongoose.model("students", studentSchema);

// //This method starts a server and begins listening for incoming connections on a specified port.
// app.listen(port, () => {

//     MongoClient.connect(uri, (error,client) => {
//         database = client.db(databaseName);
//         console.log("MongoDB Connection Succesful");
//         console.log(`Backend server is running on http://localhost:${port}`);
//     });
// });
// //https://expressjs.com/en/5x/api.html#app.listen


//app.get(path, callback [, callback ...])
//Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('/api/students/all-students', async (request,response) => {
    const studentData = await studentModel.find();
    response.json(studentData);
        
    });