import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

function AddEmployee() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [managerId, setManagerId] = useState('');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the employees!', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/employees', {
                name,
                position,
                manager_id: managerId ? parseInt(managerId) : null,
            });
            alert('Employee added successfully');
            setName('');
            setPosition('');
            setManagerId('');
        } catch (error) {
            alert('Failed to add employee');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Position:
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                </label>
                <label>
                    Manager:
                    <select value={managerId} onChange={(e) => setManagerId(e.target.value)}>
                        <option value="">None</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;
