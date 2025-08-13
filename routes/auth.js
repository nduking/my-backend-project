const express=require('express');
const {register,login,getProfile}=require('../controllers/authController');
const auth=require('../middleware/auth');


const router=express.Router();

//Public routes (no authentication required)
router.post('/register',register);
router.post('/login',login);

//Protected routes (authentication required)
router.get('/profile',auth,getProfile);

module.exports=router;