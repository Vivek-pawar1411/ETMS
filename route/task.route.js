const express = require('express');
const { assign, getall,deletetask,updatetask } = require('../controller/task.controller');
const authtoken = require('../middleware/auth.middleware');
const roles = require('../middleware/roles.middleware');
const router = express.Router();

router.post('/asign', authtoken, roles(['admin']), assign);
router.get('/getall', getall);
router.delete('/deletetask/:id',authtoken, roles(['admin']), deletetask);
router.put('/updatetask/:id',authtoken, roles(['admin']), updatetask);



module.exports = router;