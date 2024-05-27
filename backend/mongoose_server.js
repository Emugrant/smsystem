//https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/
//https://www.youtube.com/watch?v=-42K44A1oMA&t=784s
//20:10

import cors from 'cors'; // middleware for handling CORS POLICY
import express from 'express';
import mongoose from 'mongoose';
import { Student } from './models/studentModel.js';

//Cross-Origin Resource sharing policy. Restricts ability of webpage to make requests to a different domain. Prevents unauthroised Cross-Origin access to a resource or service. 
// server checks if request is permitted or not by access information (Origins, Methods, Headers)
// 24:12


const port = 3001;
const uri = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; //username: gazellehunter24//password: f7y2YWbvDzCqiB4V//cluster0: isp2kui.mongodb.net
const uriWithCollectionName = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/studentmanagementsystem?retryWrites=true&w=majority&appName=Cluster0"; //username: gazellehunter24//password: f7y2YWbvDzCqiB4V//cluster0: isp2kui.mongodb.net

const app = express();
app.use(express.json()); // This tells the Express application to use middleware that automatically parses JSON formatted request bodies.
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Option 1: Allow ALL Origins with Default of cors()
app.use(cors())
// Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'], // - [ ] what is a header in this context?
    })
); // only clients with this origin can access the server



// - [ ]  Industry practice is to have routes in their own file inside of their own folder
    // - [ ] Optionally move these routes '20:13'. This is becomes more nessaccary with more database tables

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});


// Route to Create Student
app.post('/student/create', async (request, response) => {
    try {
        if(
            !request.body.name || // '!' =665098321c8b43052e612b5a not, '||' = or
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
app.get('/student/all', async (request, response) => { 
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

// Route to update a student
app.put('/student/update/:id', async (request, response) => {
    try{
        if(
            !request.body.name || // '!' = not, '||' = or
            !request.body.email ||
            !request.body.course
        ) {
        return response.status(400).send({
            message: 'Send all required fields: name, email, course'
        });
        }

        const { id } = request.params;
        
        const result = await Student.findByIdAndUpdate(id, request.body); //no way that's actually a built in function xD

        if (!result) {
            return response.status(404).json({ message: 'Student not found :('})
        }
        
        return response.status(200).send({ message: 'Student updated successfuly'});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});


// route to delte student
app.delete('/student/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Student.findByIdAndDelete(id); // What library is this function from???

        if (!result) {
            return response.status(404).json({ message: 'Student not found'})
        }

        return response.status(200).send({ message: 'Student deleted succesfully'});
        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }

})


                                            
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

