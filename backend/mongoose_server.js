import cors from 'cors'; // Import the cors package
import express from 'express'; // Express is used to handle HTTP requests and responses in Node.js
import mongoose from 'mongoose'; // Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
import { Student } from './models/studentModel.js'; // Importing the Student model from the studentModel.js file in the models folder 

// These should be environment variables in the future
const port = 3001; 
const uriWithCollectionName = "mongodb+srv://gazellehunter24:f7y2YWbvDzCqiB4V@cluster0.isp2kui.mongodb.net/studentmanagementsystem?retryWrites=true&w=majority&appName=Cluster0"; 
// username: gazellehunter24//password: f7y2YWbvDzCqiB4V//cluster0: isp2kui.mongodb.net

const app = express();
//Body parsing middleware:
app.use(cors());
app.use(express.json()); // This tells the Express application to automatically parse JSON formatted request bodies.
app.use(express.urlencoded({ extended: true })); // allows to parse the URL-encoded data with the querystring library, enabling us to handle more complex data structures.


// Express routes: http://expressjs.com/en/starter/basic-routing.html

// Route to Create Student
app.post('/student/create', async (request, response) => {
    try {
        if(
            !request.body.name  || // '!' = not, '||' = or
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

        const student = await Student.create(newStudent); // new instance of the Student model
        return response.status(201).send(student)

    } catch{
    console.log(error.message);
    response.status(500).send({ message: error.message })
    }

})

// get all students
app.get('/student/all', async (request, response) => { 
    try {
        const students = await Student.find(); // array of all students
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

        const student = await Student.findById(id) 
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
        
        const result = await Student.findByIdAndUpdate(id, request.body);

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

        const result = await Student.findByIdAndDelete(id); 

        if (!result) {
            return response.status(404).json({ message: 'Student not found'})
        }

        return response.status(200).send({ message: 'Student deleted succesfully'});
        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }

})


                                            
mongoose 
    .connect(uriWithCollectionName)
    .then(() => { // 'then' is a promise that returns a value or error 
        console.log('App connected to database;');
        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed: " + error);
    });

