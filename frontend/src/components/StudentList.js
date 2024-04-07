import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//retrieves student data from defined endpoint using axios.get
//endpoints corespond to datasource

const StudentList = () => {
  const [students, setStudents] = useState([]);// create state variable 'students' with initial value of empty array

  useEffect(() => { // allows you to preform side functions, runs on every render

    const fetchStudents = async () => {// async keyword means that function will always return a promise(try and catch, return value or error)
      try {

        const response = await axios.get('/api/data'); // async HTTP GET request to '/students' endpoint using axios.

        //const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // testing output with json placeholder

                                                      // 'await' keyword is used to pause execution until promis resolved by 'axios.get()' or is rejected
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
              <td>{student.title}</td>{/* testing output with json placeholder*/}
              <td>{student.body}</td>{/* testing output with json placeholder*/}



              <td>{student.name}</td>{/* Table data cell*/}
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <Link to={`/edit/${student._id}`}>Edit</Link>
                &nbsp;|&nbsp;
                <button onClick={() => {
                  if (window.confirm('Are you sure you wish to delete this student?')) {
                    // axios.delete(`/students/${student._id}`) // axios.delet() used to amke a HTTP delete request to a specific url
                    axios.delete(`https://jsonplaceholder.typicode.com/posts/${student._id}`) 

                      .then(() => {   // Updates the UI using setStudents() to show the database change of the students list
                        setStudents(students.filter(function(studentObject){              // filter() creates a new array containing elements from og and iterates over each element (for studentObject in)
                          return studentObject._id !== student._id;                       // checks if the '_id' of the current student object is not equal to the id of the student being deleted. 
                        }));                                                              // returns the value of all studentid's that are not going to be deleted. these
                        alert('Student deleted successfully');                            // these id's will be included in the filtered array that's passed to the setStudents method
                      })
                      .catch(error => console.error("Could not delete student", error));
                  } // page needs to reload after deletion
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
