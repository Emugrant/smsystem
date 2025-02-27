import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './frontend.css';

// Should be environment variables
const datasource = 'http://localhost:3001';
const getAllStudentsEndpoint = '/student/all'
const deleteStudentEndpoint = '/student/delete/';

const StudentList = () => {
  const [students, setStudents] = useState([]); // create state variable 'students' with initial value of empty array

  useEffect(() => {                                 // allows you to preform side functions, runs on every render
    const fetchStudents = async () => {             // async keyword means that function will always return a promise (try and catch, return value or error)
      try {
        const response = await axios.get(datasource + getAllStudentsEndpoint);  // 'await' keyword is used to pause execution until e resolved by 'axios.get()' or is rejected                                                    
        setStudents(response.data);                                             // once promise is resolved, server response stored in variable 'response'                 
      } catch (error) {                                                         
        console.error("Could not fetch students", error);
      }
    };
    fetchStudents();
  }, []);// empty array causes to run only on first render

  return (
    <div class="container">

      <div class="navBar">
        <h2>Students List</h2>
      </div>

      <div class='actionButtons'>
        <Link to="/add" class="actionButton">Add New Student</Link>
      </div>

      <div class="centredDiv">
        <table id="studentTable">
          <thead>{/* table head */}
            <tr>{/* Table row */}
              <th>Name</th>{/* Table header cell*/}
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => ( // .map() transforms each element in an array using a function you provide and returns a new array containing the transformed elements.
              // 'student' is the current element being processed in the array (i)
              <tr key={student._id}> {/* Each child in react needs a unique key prop */}
                <td>{student.name}</td>{/* Table data cell */}
                <td>{student.email}</td> {/* These values are stored in the 'students' state */}
                <td>{student.course}</td>
                <td>
                  <div class="actionButtons">
                  <Link to={`/edit/${student._id}`}class="actionButton">Edit</Link>
                  <button
                    class="actionButton" 
                    onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this student?')) {
                      axios.delete(datasource + deleteStudentEndpoint + student._id)

                    .then(() => {
                      const updatedStudents = students.filter(studentObject => studentObject._id !== student._id); // filter() is used to create a new array filled with elements 
                      setStudents(updatedStudents);                                                                // that pass a specific test implemented by a provided function (for i in n...)
                      alert('Student deleted successfully');                                                       // studentObject is the current element being processed in the array (i)
                    })
                  
                    .catch(error => {
                      console.error("Could not delete student", error);
                      alert('Failed to delete student: ' + error.message);
                    });               

                  }}}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
