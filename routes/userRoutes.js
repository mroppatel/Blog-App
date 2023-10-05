const express = require('express');
const { getAllUsers, registerController, loginController, deleteUserController, updateUserController } = require('../controllers/userController');

//router object
const router = express.Router();

//GET All Users || GET
router.get('/all-users', getAllUsers );

// Create User || POST
router.post('/register', registerController );

//Login || POST
router.post('/login', loginController );

//DELETE || delete user
router.delete('/delete-user/:id', deleteUserController);

//DELETE || update user
router.put('/update-user/:id', updateUserController);


module.exports = router;