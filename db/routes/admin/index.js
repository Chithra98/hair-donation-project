const express = require('express');
const router = express.Router();
var methods = require('../../methods');
var models = require('../../models');

router.get('/', function(req,res)
{
    res.status(200).json({"message" : "success"});

})
router.post('/', function(req,res){
  var admin =
    {
     username : "theertha",
     password : "amala"
    }
    if(admin.username=req.body.username&&admin.password==req.body.password)
    {
        methods.usermethods.getAllUser()
        .then((user) => {
        var ret;
        console.log('entered');
        console.log(user);
            ret = user;
        res.render('table',{ret});
        })

    }
})
router.post('/verify/', function(req,res)
{
    console.log("inside verify");
    console.log(req.body.username);
    methods.usermethods.findByUsername(req.body.username).then((users) =>{
        console.log(users)
       
            methods.usermethods.getAllUser()
            .then((user) => {
            var ret;
            console.log('entered');
            console.log(user);
                ret = user;
            res.render('table',{ret});
            })
    
        
    })
    .catch((err) => {
        console.log("error : ", err);

    })

})
module.exports = router;
