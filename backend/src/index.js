const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('../knexfile').development);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/employees', async (req, res) => {
    try {
        const employees = await knex('employees');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/employees/:id', async (req, res) => {
    try {
        const employee = await knex('employees').where({ id: req.params.id }).first();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/employees', async (req, res) => {
    try {
        const [id] = await knex('employees').insert(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        await knex('employees').where({ id: req.params.id }).update(req.body);
        res.status(200).json({ message: 'Employee updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
