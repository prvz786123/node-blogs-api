const router = require('express').Router();

//Middleware
const validate = require('../middleware/validate')

//Models
const user = require('../models/users')

router.post("/register", validate.validateNewUser, (req,res)=>{
    user.registerNewUser(req.body).then(data=>{
        if(data){
            res.send({success:true, message:"Registration Successfull"})
        }else{
            res.send({success:false, err:"Unable to Register"})
        }
    }).catch(err=>{
        res.send({success:false, err})
    })
})


router.get("/",(req,res)=>{
    user.getUsers().then(users=>{
        res.send({success:true,users})
    }).catch(err=>{
        res.send({success:false, err})
    })
})

module.exports = router;
