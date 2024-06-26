const knex = require('knex')(require('../../knexfile.js').development);
const cloudinary = require('../config/cloudinaryConfig.js');
const fs = require('fs');
// Adicione esta função no controlador de funcionários
exports.uploadPhoto = async (req, res) => {
    try {
        const file = req.file.path;
        const result = await cloudinary.uploader.upload(file, {
            folder: 'system/employee_photos'
        });
        fs.unlinkSync(file); // Remove file from local server after upload
        res.json({ url: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
};


exports.addEmployee = async (req, res) => {
    try {
        const [id] = await knex('employees').insert(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.updateEmployee = async (req, res) => {
    try {
        await knex('employees').where({ id: req.params.id }).update(req.body);
        res.status(200).json({ message: 'Employee updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await knex('employees').where({ id: req.params.id }).first();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await knex('employees');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await knex('employees').where({ id }).del();
        res.status(200).json({ message: 'Employee removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove employee', error });
    }
};

