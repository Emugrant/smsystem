import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//retrieves student data from defined endpoint using axios.get
//endpoints corespond to datasource

const datasource = 'http://localhost:3001';

const StudentList = () => {
  const [students, setStudents] = useState([]);// create state variable 'students' with initial value of empty array

  useEffect(() => { // allows you to preform side functions, runs on every render
    const fetchStudents = async () => {// async keyword means that function will always return a promise(try and catch, return value or error)
      try {
        const response = await axios.get(datasource + '/api/students/all-students'); // async HTTP GET request to '/students' endpoint using axios.
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
          {students.map((student) => ( // .map() creates a new array from calling a function for every array element.
            <tr key={student._id}>
              <td>{student.name}</td>{/* Table data cell*/}
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <Link to={`/edit/${student._id}`}>Edit</Link>
                &nbsp;|&nbsp;
                <button onClick={() => {
                  if (window.confirm('Are you sure you wish to delete this student?')) {
                    axios.delete(datasource + `/api/students/delete-students/${student._id}`)
                    
                  //   .then(() => {setStudents(students.filter(function(studentObject){              
                  //     return studentObject._id !== student._id;                       
                  //   }));                                                            
                  //   alert('Student deleted successfully');                  
                  // })

                  .then(() => {
                    const updatedStudents = students.filter(studentObject => studentObject._id !== student._id);
                    setStudents(updatedStudents);
                    alert('Student deleted successfully');
                })
                
                  .catch(error => {
                    console.error("Could not delete student", error);
                    alert('Failed to delete student: ' + error.message);
                  });                  
              } // page needs to reload after deletion




 // page needs to reload after deletion
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
