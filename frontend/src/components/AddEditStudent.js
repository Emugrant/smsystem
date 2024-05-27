import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const datasource = 'http://localhost:3001';
const updateStudentEndpoint = '/student/update/'
const createStudentEndpoint = '/student/create'

function AddEditStudent() {
  const [formData, setFormData] = useState({// object
    name: '',
    email: '',
    course: ''
  });
  const { id } = useParams(); //access current route (url) and grabs the id param 
  const navigate = useNavigate(); //change route


  useEffect(() => {
    if (id) { // if 'id' is truthy (not null), indicating edit mode, fetch student details.
      async function fetchStudentDetails() {
        try {
          const response = await axios.get( datasource + `/student/${id}` );   //https://axios-http.com/docs/res_schema
          console.log(response);                              //Object { _id: "662c4e501393a34f797f7a80", id: "3", name: "Dave1", email: "dave1@gmail.com", course: "Dave Squad" }
          setFormData(response.data);                         // Sets form data to the overlapping response data, excluding datafields not in the state object.
        } catch (error) {
          console.error("Could not fetch student details", error); // 'consle.error()' instead of 'console.log' because error is red ;)
        }
      }
      fetchStudentDetails();
    }
  }, [id]);// [id] - runs every time the id value changes

  function handleChange(event) {                                      //event object is generated on fourm submission, 'event' contains information about the event that occurred
    const { name, value } = event.target;                             // event.target is the element that triggered the event. In this case, the input field that was changed.
    setFormData( prevState => ({ ...prevState,[name]: value }));      //'...' spread operator spreads iterables for concantination and overwriting. 
  }                                                                   //here, the spread operator replaces the value of the key 'name' with the value of the input field

  async function handleSubmit(event) {
    event.preventDefault(); // prevents the default behavior of form submission, specifically reloading the page
    try { 
      if (id) {//if in edit mode
        await axios.put(datasource + updateStudentEndpoint + id, formData);
      } else {
        // Add a new student if in add mode
        await axios.post(datasource + createStudentEndpoint, formData);
      }
      navigate('/'); // Redirect to the student list view
    } catch (error) {
      console.error("Could not save student", error);
    }
  }

  return (
    <div>
      <div class="navBar">
        <h2>{id ? 'Edit' : 'Add'} Student</h2> 
        {/* <h2>condition ?(conditional operator) expressionIfTruthy : expressionIfFalsy </h2> */}
      </div>
      <div class="centredDiv">
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
          <div class="buttonDiv">
            <button type="submit" class="button">Save Student</button>
            <button type="button" onClick={() => navigate('/')} class="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditStudent;
