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
var mon = {}
mon.Month_id = req.body.Month_id;
mon.Student_id = req.body.Student_id;
mon.lhadmno = req.body.lhadmno;
console.log(mon);

methods.feemethods.createtable(mon)
.then(() =>{
    console.log('inside fee methods');
    res.render('fee')
})
.catch((err) =>{
    console.log(err);
})

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
router.get('/fee', (req,res) =>{
    res.render('getfeebyval')
})
router.post('/pay', (req,res) =>{
    var info ={}
    info.monthid = req.body.monthid
    info.studentid = req.body.studentid
    console.log(info)
    methods.feemethods.calcFee(info.monthid,info.studentid).then((fee) =>{
        console.log('fee :', fee)
        methods.feemethods.getAllFee().then((values) =>{

            console.log(values)
            
            var ret = []
            ret[0]=fee
            ret[1]= values ;
            
            console.log(ret);
            res.render('home')
            //res.render('getfee',{ret});
        })
        .catch((err) =>{
            console.log(err)
        })
    })
    .catch((err) =>{
        console.log(err)
    })


})
router.post('/verify', function(req,res) {
    var info = {}
    info.Month_id=req.body.Month_id;
    info.lhadmno = req.body.lhadmno;
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
//router.use(('/authenticate'),require('./authentication'));
//router.use(('/admin'),require('./admin'));

module.exports = router;