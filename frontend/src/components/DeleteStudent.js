import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const deletStudentEndpoint = 'student/delete/'

const DeleteStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();  

  useEffect(() => {
    const deleteStudent = async () => {
      if (window.confirm('Are you sure you want to delete this student?')) {
        try {
          await axios.delete( deletStudentEndpoint + id);
          alert('Student deleted successfully');
        } catch (error) {
          console.error("Could not delete student", error);
        }
        navigate('/');
      } else {
        navigate('/');;
      }
    };

    deleteStudent();
  }, [id, navigate]);

  return null; // This component does not render anything
};

export default DeleteStudent;
