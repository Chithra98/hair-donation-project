const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.status(200).json({
        message : "Success"
    });
})
router.get('/user', function(req,res){
    res.render('index');
})
router.use(('/authenticate'),require('./authentication'));
module.exports = router;