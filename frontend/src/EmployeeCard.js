import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeCard.css';

function EmployeeCard({ employee }) {
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
        </div>
    );
}

export default EmployeeCard;
