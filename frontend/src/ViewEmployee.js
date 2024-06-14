import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Form.css';

function ViewEmployee() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [managerId, setManagerId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [photo, setPhoto] = useState();
    useEffect(() => {
        axios.get(`http://localhost:3001/employees/${id}`)
            .then(response => {
                const employee = response.data;
                setName(employee.name);
                setPosition(employee.position);
                setManagerId(employee.manager_id || '');
                setEmail(employee.email || '');
                setPhoto(employee.photo || '');
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

    return (
        <div style={{ alignItems: 'flex-start' }} className="form-container-view">

            <form>
                {photo ? <img src={photo} alt={name} className="employee-card-img" /> :
                    <img
                        src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                        alt={name}
                        className="employee-card-img"
                    />
                }
                <h2>{name}</h2>
                <label>
                    Cargo: {position}
                </label>
                <label>E-mail: {email}</label>
                <label>
                    Gerenciador: {employees.filter(f => f.id === managerId).map(employee => (employee.name))}

                </label>
            </form>
        </div>
    );
}

export default ViewEmployee;
