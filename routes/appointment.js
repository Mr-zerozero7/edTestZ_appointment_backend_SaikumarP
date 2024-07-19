const {Router} = require('express');
const {addNewAppointment, getAppointments} = require('../controllers/appointmentController');
const authenticateJWT = require('../middleware/auth')

const router = Router();

router.post('/create',authenticateJWT, addNewAppointment);
router.get('/',authenticateJWT, getAppointments);

module.exports = router;