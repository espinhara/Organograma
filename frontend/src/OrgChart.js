import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';
import './OrgChart.css';

function OrgChart() {
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

    const renderTree = (employee) => {
        const subordinates = employees.filter(emp => emp.manager_id === employee.id);
        return (
            <li key={employee.id}>
                <EmployeeCard employee={employee} />
                {subordinates.length > 0 && (
                    <ul>
                        {subordinates.map(sub => renderTree(sub))}
                    </ul>
                )}
            </li>
        );
    };

    const topLevelEmployees = employees.filter(emp => emp.manager_id === null);

    return (
        <div className="org-chart">
            <ul>
                {topLevelEmployees.map(emp => renderTree(emp))}
            </ul>
        </div>
    );
}

export default OrgChart;
