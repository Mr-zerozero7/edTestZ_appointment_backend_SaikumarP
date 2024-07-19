const Appointment = require('../models/Appointment');

const addNewAppointment = async (req, res) => {
    const {date,time,description,favourite} = req.body;
    const userId = req.user.id;
    // console.log(req.user)

    try {
        const newAppointment = await Appointment.create({date,time,description,favourite,userId});
        res.status(201).json({message: 'Appointment created Successfully'});
    } catch (error) {
        console.log('Error creating appointment:', error.message);
        res.status(400).json({errorMsg: error.message});
    }
};


const getAppointments = async (req,res) => {
    const userId = req.user.id;
    console.log(userId)
    try {
        const appointments = await Appointment.findAll({where: {userId}});
        res.status(200).json(appointments);
    } catch (error) {
        console.log('Error fetching appointments:', error.message );
        res.status(400).json({errorMsg: error.message});
    }
}

module.exports = {addNewAppointment, getAppointments}