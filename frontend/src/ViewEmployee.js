import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';
import PhotoUpload from './components/PhotoUpload';

function ViewEmployee() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [managerId, setManagerId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [photo, setPhoto] = useState();
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/employees/${id}`, {
                photo,
                name,
                position,
                email,
                manager_id: managerId ? parseInt(managerId) : null,
            });
            alert('Funcionário atualizado com sucesso');
            navigate('/');
        } catch (error) {
            alert('Falha ao atualizar funcionário');
            console.error(error);
        }
    };
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setEmployee({ ...employees.filter(f => f.id === id).map(), [name]: value });
    // };

    const handlePhotoUpload = (url) => {
        setPhoto(url)
    };
    return (
        <div style={{ alignItems: 'flex-start' }} className="form-container-view">

            <form onSubmit={handleSubmit}>
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
                    Gerenciador: {employees.filter(f => f.id == managerId).map(employee => (employee.name))}

                </label>
            </form>
        </div>
    );
}

export default ViewEmployee;
