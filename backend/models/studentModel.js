import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    }
}, { versionKey: false });

export const Student = mongoose.model('Student', studentSchema);

export default Student;


// // a model is a class with which we construct documents. In this case, each document will be a student with properties and behaviors as declared in our schema.
// //a schema is a blueprint for a document in a MongoDB collection. It defines the shape of the documents within that collection.
// // an instance of a model is called a document. 

// const student1 = new Student({ name: 'John Doe', email: 'example@gmail.com', course: 'Computer Science' });

