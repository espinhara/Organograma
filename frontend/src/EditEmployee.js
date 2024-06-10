import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

function EditEmployee() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [managerId, setManagerId] = useState('');
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/employees/${id}`)
            .then(response => {
                const employee = response.data;
                setName(employee.name);
                setPosition(employee.position);
                setManagerId(employee.manager_id || '');
            })
            .catch(error => {
                console.error('There was an error fetching the employee!', error);
            });

        axios.get('http://localhost:3001/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the employees!', error);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/employees/${id}`, {
                name,
                position,
                manager_id: managerId ? parseInt(managerId) : null,
            });
            alert('Employee updated successfully');
            navigate('/');
        } catch (error) {
            alert('Failed to update employee');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Employee</h2>
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
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
}

export default EditEmployee;
