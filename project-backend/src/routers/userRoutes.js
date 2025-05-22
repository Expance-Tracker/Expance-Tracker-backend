const express = require('express');
const { getBalance, updateProfile } = require('../controllers/userController');
const auth = require('../middlewares/auth'); 

const router = express.Router();

router.get('/balance', auth, getBalance);

router.patch('/profile', auth, updateProfile);

export default userRouter;
export default router;
