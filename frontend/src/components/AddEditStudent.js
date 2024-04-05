import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


//submits http requests to defined endpoints using axios methos

function AddEditStudent() {
  const [formData, setFormData] = useState({// object
    name: '',
    email: '',
    course: ''
  });


  const { id } = useParams(); //access params from current route (url) and grabs the id param
  const navigate = useNavigate(); //change route


  useEffect(() => {
    if (id) {
      // Fetch the existing student details if in edit mode
      async function fetchStudentDetails() {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`); // http get request for student id
          setFormData(response.data); // update formData with existing student data
        } catch (error) {
          console.error("Could not fetch student details", error);
        }
      }
      fetchStudentDetails();
    }
  }, [id]);// [id] - runs every time the id value changes

  function handleChange(event) { //event object is generated on fourm submission
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault(); // prevents the default behavior of form submission, which typically involves reloading the page
    try {
      if (id) {
        // Update the student if in edit mode
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, formData);
      } else {
        // Add a new student if in add mode
        await axios.post('https://jsonplaceholder.typicode.com/posts/', formData);
      }
      navigate('/'); // Redirect to the student list view
    } catch (error) {
      console.error("Could not save student", error);
    }
  }

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required />
        </div>
        <div>
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required />
        </div>
        <button type="submit">Save Student</button>
      </form>
      <button type="button" onClick={() => navigate('/')}>Student List</button>
    </div>
  );
}

export default AddEditStudent;
