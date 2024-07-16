const express = require('express');
const router = express.Router();

const { verifyUser,verifyAdmin } =require('../middlewars/verifyToken');



const usersController = require('../controllers/usersController');


router.get('/',verifyAdmin,usersController.getAllUsers);

router.get('/:id',verifyUser,usersController.getUser);

router.put('/:id',verifyUser,usersController.updateUser);

router.delete('/:id',verifyUser,usersController.deleteUser);

module.exports = router