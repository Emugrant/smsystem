import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//retrieves student data from defined endpoint using axios.get
//endpoints corespond to datasource

const datasource = 'http://localhost:3001';

const getAllStudentsEndpoint = '/api/students/all-students'
const deleteStudentEndpoint = '/api/students/delete-students/';

const StudentList = () => {
  const [students, setStudents] = useState([]);// create state variable 'students' with initial value of empty array

  useEffect(() => { // allows you to preform side functions, runs on every render
    const fetchStudents = async () => {// async keyword means that function will always return a promise(try and catch, return value or error)
      try {
        const response = await axios.get(datasource + getAllStudentsEndpoint); // async HTTP GET request to '/students' endpoint using axios.
                                                      // 'await' keyword is used to pause execution until e resolved by 'axios.get()' or is rejected
                                                      // once promise is resolved, server response stored in variable 'response'
        setStudents(response.data);// sets useState array to value of the data
      } catch (error) {
        console.error("Could not fetch students", error);
      }
    };
    fetchStudents();
  }, []);// empty array causes to run only on first render

  return (
    <div>
      <h2>Students List</h2>
      <Link to="/add">Add New Student</Link>
      <table>
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
                <Link to={`/edit/${student._id}`}>Edit</Link>
                &nbsp;|&nbsp;
                <button onClick={() => {
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
              }
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
