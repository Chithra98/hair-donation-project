const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.status(200).json({
        message : "Success"
    });
})
router.get('/user', function(req,res){
    res.render('home');
})
router.get('/reg', function(req,res){
    res.render('signup');
})
router.get('/sig', function(req,res){
    res.render('signin');
})
router.get('/ad', function(req,res)
{
    res.render('admin');
})
router.use(('/authenticate'),require('./authentication'));
router.use(('/admin'),require('./admin'));

module.exports = router;