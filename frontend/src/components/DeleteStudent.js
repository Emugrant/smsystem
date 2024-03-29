import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DeleteStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();  

  useEffect(() => {
    const deleteStudent = async () => {
      if (window.confirm('Are you sure you want to delete this student?')) {
        try {
          await axios.delete(`/students/${id}`);
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
