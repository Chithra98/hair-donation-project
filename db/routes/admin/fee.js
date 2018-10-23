const express = require('express');
const router = express.Router();
var methods = require('../../methods')

router.get('/', function(req,res){
    res.status(200).send({"success": "true"})
    console.log('entered fee')
})
router.get('/enter', function(req,res){
 
    res.render('fee');
})
router.post('/enter', function(req,res) {
    console.log('ok')
var fe = {}
fe.Month_id = req.body.Month_id;
fe.Student_id = req.body.Student_id;
fe.lhadmno = req.body.lhadmno;

console.log(fe);

methods.feemethods.createtable(fe)
.then(() =>{
    console.log('inside fee methods');
    res.render('fee')
})
.catch((err) =>{
    console.log(err);
})

})
//router.use(('/authenticate'),require('./authentication'));
//router.use(('/admin'),require('./admin'));

module.exports = router;