const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/user')
const appointmentRoutes = require('./routes/appointment')

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/api/users',userRoutes);
app.use('/api/appointments', appointmentRoutes);

sequelize.sync()
    .then(()=>{
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
        });
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err.message)
    });