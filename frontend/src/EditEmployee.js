import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';
import PhotoUpload from './components/PhotoUpload';

function EditEmployee() {
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

    const handlePhotoUpload = (url) => {
        setPhoto(url)
    };
    return (
        <div className="form-container">
            <h2>Editar Funcionário</h2>
            <form onSubmit={handleSubmit}>
                {photo && <img src={photo} alt={name} className="employee-card-img" />}
                <PhotoUpload onUpload={handlePhotoUpload} />
                <label>
                    Nome:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Cargo:
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                </label>
                <label>
                    E-mail:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Gerenciador:
                    <select value={managerId} onChange={(e) => setManagerId(e.target.value)}>
                        <option value="">None</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Editar Funcionário</button>
            </form>
        </div>
    );
}

export default EditEmployee;
