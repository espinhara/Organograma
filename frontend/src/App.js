import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import OrgChart from './OrgChart';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Organograma</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Employee</Link>
      </nav>
      <Routes>
        <Route path="/" element={<OrgChart />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </div>
  );
}

export default App;