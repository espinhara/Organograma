import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EmployeeCard.css';

const EmployeeCard = ({ employee, onRemove }) => {
    const handleRemove = async () => {
        const confirmRemove = window.confirm(`Você tem certeza que deseja remover ${employee.name}?`);
        if (confirmRemove) {
            try {
                await axios.delete(`http://localhost:3001/employees/${employee.id}`);
                alert('Funcionário removido com sucesso');
                onRemove(employee.id);
            } catch (error) {
                alert('Falha ao remover funcionário');
                console.error(error);
            }
        }
    };

    return (

        <div className="employee-card">
            {employee.photo ?
                <img
                    onClick={() => { window.location = `/employee/${employee.id}` }}
                    src={employee.photo}
                    alt={employee.name}
                    className="employee-card-img"
                /> :
                <img
                    onClick={() => { window.location = `/employee/${employee.id}` }}
                    src={`https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                    alt={employee.name}
                    className="employee-card-img"
                />
            }
            <h2>{employee.name}</h2>
            <p>{employee.position}</p>
            <p>{employee.email}</p>
            <Link to={`/edit/${employee.id}`} className="edit-button">Editar</Link>
            {employee.id != 1 && <button onClick={handleRemove}>Remover</button>}
        </div>
    );
};

export default EmployeeCard;
