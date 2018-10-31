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
router.get('/pay', function(req,res) {

    methods.feemethods.getAllFee().then((values) =>{

        console.log(values)
        var ret = []
        ret = values;
        console.log(ret);
        res.render('getfee',{ret});
    })
    .catch((err) =>{
        console.log(err)
    })

})
router.post('/verify', function(req,res) {
    var info = {
        Month_id : req.body.Month_id,
        lhadmno : req.body.lhadmno
    }
    console.log(req.body.Month_id)
    methods.feemethods.setPaid(info).then((values) =>{
        console.log(values)
        res.redirect('/admin/fee/pay')
    })
    .catch((err) =>{
        console.log(err)
    })
})


router.post('/', function(req,res) {
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
router.post('/updfee', function(req,res){
    var info = {}
    info.Month_id = req.body.monthid,
    
    methods.feemethods.calculateFee()
})
//router.use(('/authenticate'),require('./authentication'));
//router.use(('/admin'),require('./admin'));

module.exports = router;