const express = require('express');
const router = express.Router();
var methods = require('../../methods')

router.get('/', function(req,res){
    res.status(200).send({"success": "true"})
    console.log('entered expense')
})
router.get('/enter', function(req,res){
 
    res.render('expense');
})
router.post('/enter', function(req,res) {
    console.log('ok')
var exp = {}
exp.Monthid = req.body.Monthid;
exp.Electricity = req.body.Electricity;
exp.Water = req.body.Water;
exp.Mess = req.body.Mess;
exp.Rent = req.body.Rent;
exp.CCF = req.body.CCF;
console.log(exp);

methods.expensemethods.createtable(exp)
.then(() =>{
    console.log('inside expense methods');
    res.render('expense')
})
.catch((err) =>{
    console.log(err);
})

})
//router.use(('/authenticate'),require('./authentication'));
//router.use(('/admin'),require('./admin'));

module.exports = router;