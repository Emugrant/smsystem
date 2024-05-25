//https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/
//https://www.youtube.com/watch?v=-42K44A1oMA&t=784s
//14:40 

import express from 'express';
import mongoose from 'mongoose';
import { Student } from './models/studentModel.js';


const port = 3001;
const uri = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; //username: gazellehunter24//password: f7y2YWbvDzCqiB4V//cluster0: isp2kui.mongodb.net
const uriWithCollectionName = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/studentmanagementsystem?retryWrites=true&w=majority&appName=Cluster0"; //username: gazellehunter24//password: f7y2YWbvDzCqiB4V//cluster0: isp2kui.mongodb.net

const app = express();
app.use(express.json()); // This tells the Express application to use middleware that automatically parses JSON formatted request bodies.
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(cors()); //Applies CORS middleware to allow cross-origin requests. (from differing ip addresses)

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

// Route to Create Student
app.post('/students', async (request, response) => {
    try {
        if(
            !request.body.name || // '!' = not, '||' = or
            !request.body.email ||
            !request.body.course
        ) {
        return response.status(400).send({
            message: 'Send all required fields: name, email, course'
        });
        }
        const newStudent = {
            name: request.body.name,
            email: request.body.email,
            course: request.body.course,            
        };

        const student = await Student.create(newStudent);
        return response.status(201).send(student)

    } catch{
    console.log(error.message);
    response.status(500).send({ message: error.message })
    }

})

// get all students
app.get('/students', async (request, response) => { 
    try {
        const students = await Student.find();
        return response.status(200).json(students);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({message: error.message})
    }
});

// get student by id
app.get('/student/:id', async (request, response) => { //':' signifies param
    try {
        const { id } = request.params; 

        const student = await Student.findById(id) // - [ ] What does .find() do?
        return response.status(200).json(student);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        
    }
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

