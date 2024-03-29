// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddEditStudent from './components/AddEditStudent';
import DeleteStudent from './components/DeleteStudent';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StudentList/>} />
          <Route path="/add" element={<AddEditStudent/>} />
          <Route path="/edit/:id" element={<AddEditStudent/>} />
          <Route path="/delete/:id" element={<DeleteStudent/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
