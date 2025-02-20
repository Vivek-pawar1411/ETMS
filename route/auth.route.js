const express=require('express');
const {register,login, getbyid, getall, deleteuser,uploadproof}=require('../controller/auth.controller');
const router=express.Router();
const authorise=require('../middleware/roles.middleware');
const authtoken=require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');


router.post('/register',register);
router.post('/login',login);
router.get('/search/:id',authtoken,getbyid);
router.get('/getall',authtoken,authorise(['admin','subadmin']),getall);
router.delete('/deleteuser/:id',authtoken,authorise(['admin']),deleteuser);
router.post('/upload',upload.single('proof'),uploadproof);

module.exports=router;