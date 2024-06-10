const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const knex = require('knex')(require('../knexfile').development);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/employees', router)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
