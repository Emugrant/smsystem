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

app.listen(port, () => {
    MongoClient.connect(uri, (error,client) => {
        database = client.db(databaseName);
        console.log("MongoDB Connection Succesful");
        console.log(`Backend server is running on http://localhost:${port}`);

    });
});

app.get('/api/students/list-of-students', (request,response)=>{
    database.collection("students").find({}).toArray((error,result)=>{
        response.send(result);
    })
})

app.post('/api/students/add-students',multer().none(),(request,response)=>{
    database.collection("students").count({},function(error,numOfDocs){
        database.collection("students").insertOne({
            id:(numOfDocs+1).toString(),
            name:request.body.name,
            email:request.body.email,
            course:request.body.course,
        });
        response.send("Student Added");
    });
});

app.put('/api/students/update-students',multer().none(),(request,response)=>{
    database.collection("students").updateOne({
        id:request.body.id
    },{ $set:{
        name:request.body.name,
        email:request.body.email,
        course:request.body.course,
    }});
    response.send("Student Updated");
});
    

app.delete('/api/students/delete-students',multer().none(),(request,response)=>{
    database.collection("students").deleteOne({
        id:request.body.id
    });
    response.send("Student Deleted");
});