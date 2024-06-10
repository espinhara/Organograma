import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EmployeeCard.css';

const EmployeeCard = ({ employee, onRemove }) => {
    const handleRemove = async () => {
        const confirmRemove = window.confirm(`Are you sure you want to remove ${employee.name}?`);
        if (confirmRemove) {
            try {
                await axios.delete(`http://localhost:3001/employees/${employee.id}`);
                alert('Employee removed successfully');
                onRemove(employee.id);
            } catch (error) {
                alert('Failed to remove employee');
                console.error(error);
            }
        }
    };

    return (
        <div className="employee-card">
            <img
                src={`https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                alt={employee.name}
                className="employee-card-img"
            />
            <h2>{employee.name}</h2>
            <p>{employee.position}</p>
            <Link to={`/edit/${employee.id}`} className="edit-button">Edit</Link>
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default EmployeeCard;
