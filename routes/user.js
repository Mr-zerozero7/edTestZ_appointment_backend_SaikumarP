const {Router} = require('express');
const {createUser, loginUser} = require('../controllers/userController');
// const {authenticateJWT} = require('../middleware/auth')

const router = Router();

router.post('/signup', createUser);
router.post('/login',loginUser);


module.exports = router;