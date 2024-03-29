import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/students');
        setStudents(response.data);
      } catch (error) {
        console.error("Could not fetch students", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students List</h2>
      <Link to="/add">Add New Student</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <Link to={`/edit/${student._id}`}>Edit</Link>
                &nbsp;|&nbsp;
                <button onClick={() => {
                  if (window.confirm('Are you sure you wish to delete this student?')) {
                    axios.delete(`/students/${student._id}`)
                      .then(() => {
                        // Refresh the list after deletion
                        setStudents(students.filter(s => s._id !== student._id));
                        alert('Student deleted successfully');
                      })
                      .catch(error => console.error("Could not delete student", error));
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
