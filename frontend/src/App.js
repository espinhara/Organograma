import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrgChart from './OrgChart';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import Nav from './Nav';
import './App.css';
import ViewEmployee from './ViewEmployee';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<OrgChart />} />
        <Route path="/employee/:id" element={<ViewEmployee />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
