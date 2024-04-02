import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AddEditStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      // Fetch the existing student details if in edit mode
      const fetchStudentDetails = async () => {
        try {
          const response = await axios.get(`/students/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Could not fetch student details", error);
        }
      };
      fetchStudentDetails();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        // Update the student if in edit mode
        await axios.put(`/students/${id}`, formData);
      } else {
        // Add a new student if in add mode
        await axios.post('/students', formData);
      }
      navigate('/'); // Redirect to the student list view
    } catch (error) {
      console.error("Could not save student", error);
    }
  };

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
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Student</button>
      </form>
      <button type="button" onClick={() => navigate('/')}>Student List</button>
    </div>
  );
};

export default AddEditStudent;
