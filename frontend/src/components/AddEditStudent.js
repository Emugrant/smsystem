import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const datasource = 'http://localhost:3001';

function AddEditStudent() {
  const [formData, setFormData] = useState({// object
    name: '',
    email: '',
    course: ''
  });

  // - [ ] in depth, what do these do?
  const { id } = useParams(); //access current route (url) and grabs the id param
  const navigate = useNavigate(); //change route


  useEffect(() => {
    if (id) {       // Only fetch details if 'id' is not null, indicating edit mode
      async function fetchStudentDetails() {
        try {
          const response = await axios.get( datasource + `/api/students/${id}` ); // http get request for student id
          setFormData(response.data); // update formData with existing student data
          // - [ ] does response.data contain all data from endpoint?. How does setFormData() know what information to store and discard?
        } catch (error) {
          console.error("Could not fetch student details", error); // consle.error() - is red ;)
        }
      }
      fetchStudentDetails();
    }
  }, [id]);// [id] - runs every time the id value changes

  function handleChange(event) { //event object is generated on fourm submission, 'event' contains information about the event that occurred
    const { name, value } = event.target; // what is an event object? what is event.target? event.target is the element that triggered the event
    setFormData(prevState => ({ // - [ ] What in tarnation is going on here?
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault(); // prevents the default behavior of form submission, which typically involves reloading the page
    try {
      if (id) {
        // Update the student if in edit mode
        await axios.put(datasource + `/api/students/update-student/${id}`, formData);
      } else {
        // Add a new student if in add mode
        await axios.post(datasource + '/api/students/add-students', formData);
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
